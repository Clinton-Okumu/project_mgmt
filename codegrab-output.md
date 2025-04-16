# Project Structure

```
./
└── backend/
    ├── cmd/
    │   └── server/
    │       └── main.go
    ├── config/
    │   └── config.go
    ├── internal/
    │   ├── db/
    │   │   ├── database.go
    │   │   └── migrate.go
    │   ├── milestone/
    │   │   └── model.go
    │   ├── project/
    │   │   ├── dto.go
    │   │   ├── handler.go
    │   │   ├── model.go
    │   │   ├── repository.go
    │   │   └── service.go
    │   ├── secureitem/
    │   │   └── model.go
    │   ├── task/
    │   │   ├── dto.go
    │   │   ├── handler.go
    │   │   ├── model.go
    │   │   ├── repository.go
    │   │   └── service.go
    │   └── user/
    │       ├── dto.go
    │       ├── handler.go
    │       ├── model.go
    │       ├── repository.go
    │       └── service.go
    ├── .gitignore
    ├── go.mod
    └── go.sum
```

# Project Files

## File: `backend/cmd/server/main.go`

```go
package main

import (
	"backend/config"
	"backend/internal/db"
	"backend/internal/task"
	"backend/internal/user"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load environment variables
	cfg := config.Load()

	// Connect to the database
	database := db.Connect(cfg)

	// Run auto migrations
	db.Migrate(database)

	// Initialize Gin router
	router := gin.Default()

	// User Routes
	userRepo := user.NewRepository(database)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)
	userRoutes := router.Group("/api")
	userHandler.RegisterRoutes(userRoutes)

	// Task Routes
	taskRepo := task.NewRepository(database)
	taskService := task.NewService(taskRepo)
	taskHandler := task.NewHandler(taskService)
	taskRoutes := router.Group("/api")
	taskHandler.RegisterRoutes(taskRoutes)

	// Define a simple welcome route
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the Project Management API!",
		})
	})

	// Log the server URL
	log.Printf("✅ Server running at http://localhost%s\n", cfg.AppPort)

	// Start the server
	if err := router.Run(cfg.AppPort); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}

```

## File: `backend/config/config.go`

```go
package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
	AppPort    string
	JWTSecret  string
}

func Load() *Config {
	_ = godotenv.Load()

	cfg := &Config{
		DBHost:     os.Getenv("DB_HOST"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASS"),
		DBName:     os.Getenv("DB_NAME"),
		DBPort:     os.Getenv("DB_PORT"),
		AppPort:    os.Getenv("PORT"),
		JWTSecret:  os.Getenv("JWT_SECRET"),
	}

	if cfg.DBHost == "" || cfg.DBUser == "" || cfg.DBPassword == "" || cfg.DBName == "" || cfg.DBPort == "" {
		log.Fatal("❌ Missing one or more required database environment variables")
	}

	return cfg
}

```

## File: `backend/internal/db/database.go`

```go
package db

import (
	"backend/config"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Failed to connect to DB: %v", err)
	}

	log.Println("✅ Database connected")
	return db
}

```

## File: `backend/internal/db/migrate.go`

```go
package db

import (
	"backend/internal/milestone"
	"backend/internal/project"
	"backend/internal/secureitem"
	"backend/internal/task"
	"backend/internal/user"
	"log"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&user.User{},
		&task.Task{},
		&project.Project{},
		&milestone.Milestone{},
		&secureitem.SecureItem{},
	)
	if err != nil {
		log.Fatalf("❌ Migration failed: %v", err)
	}

	log.Println("✅ Database migrated successfully")
}

```

## File: `backend/internal/milestone/model.go`

```go
package milestone

import (
	"time"

	"gorm.io/gorm"
)

type Milestone struct {
	ID          uint       `gorm:"primaryKey"`
	Title       string     `gorm:"type:varchar(100);not null"`
	Description string     `gorm:"type:text"`
	DueDate     *time.Time // Optional date for when milestone should be hit
	ProjectID   uint       `gorm:"not null"` // FK to Project
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

```

## File: `backend/internal/project/dto.go`

```go
package project

import "time"

// CreateRequest defines input for creating a project
type CreateRequest struct {
	Name          string `json:"name" binding:"required,min=3,max=100"`
	Description   string `json:"description" binding:"max=500"`
	OwnerID       string `json:"owner_id" binding:"required"`
	IsTeamProject bool   `json:"is_team_project"`
}

// UpdateRequest defines input for updating a project
type UpdateRequest struct {
	Name          string `json:"name" binding:"omitempty,min=3,max=100"`
	Description   string `json:"description" binding:"omitempty,max=500"`
	IsTeamProject *bool  `json:"is_team_project"` // Pointer to distinguish between false and not-provided
}

// Response defines the API response format
type Response struct {
	ID            uint      `json:"id"`
	Name          string    `json:"name"`
	Description   string    `json:"description"`
	OwnerID       string    `json:"owner_id"`
	IsTeamProject bool      `json:"is_team_project"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

```

## File: `backend/internal/project/handler.go`

```go
package project

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers struct {
	service *Service
}

func NewHandlers(service *Service) *Handlers {
	return &Handlers{service: service}
}

// CreateProjectHandler handles POST /projects
func (h *Handlers) CreateProjectHandler(c *gin.Context) {
	var req CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get owner from auth middleware
	ownerID := c.GetString("user_id")
	req.OwnerID = ownerID

	response, err := h.service.CreateProject(req)
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrProjectNameExists {
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, response)
}

// GetProjectHandler handles GET /projects/:id
func (h *Handlers) GetProjectHandler(c *gin.Context) {
	id, err := parseID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid project ID"})
		return
	}

	// Get requestor from auth middleware
	requestorID := c.GetString("user_id")

	response, err := h.service.GetProject(id, requestorID)
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrProjectNotFound {
			status = http.StatusNotFound
		} else if err == ErrUnauthorizedAccess {
			status = http.StatusForbidden
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// UpdateProjectHandler handles PATCH /projects/:id
func (h *Handlers) UpdateProjectHandler(c *gin.Context) {
	id, err := parseID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid project ID"})
		return
	}

	var req UpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get requestor from auth middleware
	requestorID := c.GetString("user_id")

	response, err := h.service.UpdateProject(id, req, requestorID)
	if err != nil {
		status := http.StatusInternalServerError
		switch err {
		case ErrProjectNotFound:
			status = http.StatusNotFound
		case ErrUnauthorizedAccess:
			status = http.StatusForbidden
		case ErrProjectNameExists:
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// Helper function to parse ID from URL params
func parseID(idParam string) (uint, error) {
	// You'll need to implement proper ID parsing
	// This is a simplified version
	var id uint
	_, err := fmt.Sscanf(idParam, "%d", &id)
	return id, err
}

```

## File: `backend/internal/project/model.go`

```go
package project

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"type:varchar(100);not null"`
	Description   string `gorm:"type:text"`
	OwnerID       string `gorm:"not null"`
	IsTeamProject bool   `gorm:"default:false"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     gorm.DeletedAt
}

```

## File: `backend/internal/project/repository.go`

```go
package project

import "gorm.io/gorm"

type Repository interface {
	Create(project *Project) error
	GetByID(id uint) (*Project, error)
	GetByOwner(ownerID string) ([]Project, error)
	Update(project *Project) error
	Delete(id uint) error
	ExistsWithName(name string, ownerID string) (bool, error)
}

type gormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

func (r *gormRepository) Create(project *Project) error {
	return r.db.Create(project).Error
}

func (r *gormRepository) GetByID(id uint) (*Project, error) {
	var project Project
	if err := r.db.First(&project, id).Error; err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *gormRepository) GetByOwner(ownerID string) ([]Project, error) {
	var projects []Project
	if err := r.db.Where("owner_id = ?", ownerID).Find(&projects).Error; err != nil {
		return nil, err
	}
	return projects, nil
}

func (r *gormRepository) Update(project *Project) error {
	return r.db.Save(project).Error
}

func (r *gormRepository) Delete(id uint) error {
	return r.db.Delete(&Project{}, id).Error
}

func (r *gormRepository) ExistsWithName(name string, ownerID string) (bool, error) {
	var count int64
	err := r.db.Model(&Project{}).
		Where("name = ? AND owner_id = ?", name, ownerID).
		Count(&count).
		Error
	return count > 0, err
}

```

## File: `backend/internal/project/service.go`

```go
package project

import (
	"errors"
)

var (
	ErrProjectNotFound    = errors.New("project not found")
	ErrProjectNameExists  = errors.New("project name already exists for this owner")
	ErrInvalidOwner       = errors.New("invalid owner specified")
	ErrUnauthorizedAccess = errors.New("unauthorized access to project")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// CreateProject handles business logic for project creation
func (s *Service) CreateProject(req CreateRequest) (*Response, error) {
	// Check for existing project name
	exists, err := s.repo.ExistsWithName(req.Name, req.OwnerID)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, ErrProjectNameExists
	}

	project := &Project{
		Name:          req.Name,
		Description:   req.Description,
		OwnerID:       req.OwnerID,
		IsTeamProject: req.IsTeamProject,
	}

	if err := s.repo.Create(project); err != nil {
		return nil, err
	}

	return s.projectToResponse(project), nil
}

// GetProject retrieves a project by ID with ownership check
func (s *Service) GetProject(id uint, requestorID string) (*Response, error) {
	project, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrProjectNotFound
	}

	// Basic ownership check (expand for team projects)
	if project.OwnerID != requestorID {
		return nil, ErrUnauthorizedAccess
	}

	return s.projectToResponse(project), nil
}

// UpdateProject handles project updates with validation
func (s *Service) UpdateProject(id uint, req UpdateRequest, requestorID string) (*Response, error) {
	project, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrProjectNotFound
	}

	// Verify ownership
	if project.OwnerID != requestorID {
		return nil, ErrUnauthorizedAccess
	}

	// Apply updates
	if req.Name != "" {
		// Check if new name is available
		exists, err := s.repo.ExistsWithName(req.Name, requestorID)
		if err != nil {
			return nil, err
		}
		if exists && req.Name != project.Name {
			return nil, ErrProjectNameExists
		}
		project.Name = req.Name
	}

	if req.Description != "" {
		project.Description = req.Description
	}

	if req.IsTeamProject != nil {
		project.IsTeamProject = *req.IsTeamProject
	}

	if err := s.repo.Update(project); err != nil {
		return nil, err
	}

	return s.projectToResponse(project), nil
}

// Helper to convert DB model to API response
func (s *Service) projectToResponse(p *Project) *Response {
	return &Response{
		ID:            p.ID,
		Name:          p.Name,
		Description:   p.Description,
		OwnerID:       p.OwnerID,
		IsTeamProject: p.IsTeamProject,
		CreatedAt:     p.CreatedAt,
		UpdatedAt:     p.UpdatedAt,
	}
}

```

## File: `backend/internal/secureitem/model.go`

```go
package secureitem

import (
	"time"

	"gorm.io/gorm"
)

type SecureItem struct {
	ID             uint   `gorm:"primaryKey"`
	Name           string `gorm:"type:varchar(100);not null"` // e.g. "GitHub API Key"
	Type           string `gorm:"type:varchar(50);not null"`  // e.g. "token", "api_key"
	ValueEncrypted string `gorm:"type:text;not null"`         // Encrypted version of the secret
	ProjectID      uint   `gorm:"not null"`                   // FK to Project
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}

```

## File: `backend/internal/task/dto.go`

```go
package task

import "time"

type CreateRequest struct {
	Title       string     `json:"title" binding:"required,max=100"`
	Description string     `json:"description"`
	Status      string     `json:"status" binding:"omitempty,oneof=todo inprogress done"`
	Priority    string     `json:"priority" binding:"omitempty,oneof=low medium high"`
	DueDate     *time.Time `json:"due_date"`
	ProjectID   uint       `json:"project_id" binding:"required"`
	AssigneeID  *uint      `json:"assignee_id"`
}

type UpdateRequest struct {
	Title       string     `json:"title,omitempty" binding:"omitempty,max=100"`
	Description string     `json:"description,omitempty"`
	Status      string     `json:"status,omitempty" binding:"omitempty,oneof=todo inprogress done"`
	Priority    string     `json:"priority,omitempty" binding:"omitempty,oneof=low medium high"`
	DueDate     *time.Time `json:"due_date,omitempty"`
	AssigneeID  *uint      `json:"assignee_id,omitempty"`
}

type Response struct {
	ID          uint       `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Status      string     `json:"status"`
	Priority    string     `json:"priority"`
	DueDate     *time.Time `json:"due_date"`
	ProjectID   uint       `json:"project_id"`
	AssigneeID  *uint      `json:"assignee_id"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

```

## File: `backend/internal/task/handler.go`

```go
package task

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRoutes(router *gin.RouterGroup) {
	router.POST("/tasks", h.CreateTask)
	router.GET("/tasks/:id", h.GetTask)
	router.PUT("/tasks/:id", h.UpdateTask)
	router.DELETE("/tasks/:id", h.DeleteTask)
	router.GET("/projects/:projectID/tasks", h.ListTasksByProject)
	router.GET("/users/:userID/tasks", h.ListTasksByUser)
}

func (h *Handler) CreateTask(c *gin.Context) {
	var req CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrInvalidInput.Error()})
		return
	}

	res, err := h.service.Create(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, res)
}

func (h *Handler) GetTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	res, err := h.service.GetByID(uint(id))
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrNotFound {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) UpdateTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var req UpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrInvalidInput.Error()})
		return
	}

	res, err := h.service.Update(uint(id), req)
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrNotFound {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) DeleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		status := http.StatusInternalServerError
		if err == ErrNotFound {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

func (h *Handler) ListTasksByProject(c *gin.Context) {
	projectID, err := strconv.Atoi(c.Param("projectID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Project ID"})
		return
	}

	res, err := h.service.ListByProjectID(uint(projectID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) ListTasksByUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("userID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	res, err := h.service.ListByAssigneeID(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

```

## File: `backend/internal/task/model.go`

```go
package task

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	ID          uint       `gorm:"primaryKey"`
	Title       string     `gorm:"type:varchar(100);not null"`
	Description string     `gorm:"type:text"`
	Status      string     `gorm:"type:varchar(50);default:'todo'"`
	Priority    string     `gorm:"type:varchar(20);default:'medium'"` // low, medium, high
	DueDate     *time.Time // Optional deadline
	ProjectID   uint       `gorm:"not null"` // Foreign key to Project
	AssigneeID  *uint      // Optional FK to User
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

```

## File: `backend/internal/task/repository.go`

```go
package task

import "gorm.io/gorm"

type Repository interface {
	Create(task *Task) error
	GetByID(id uint) (*Task, error)
	Update(task *Task) error
	Delete(id uint) error
	ListByProjectID(projectID uint) ([]*Task, error)
	ListByAssigneeID(assigneeID uint) ([]*Task, error)
}

type gormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

func (r *gormRepository) Create(task *Task) error {
	return r.db.Create(task).Error
}

func (r *gormRepository) GetByID(id uint) (*Task, error) {
	var task Task
	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *gormRepository) Update(task *Task) error {
	return r.db.Save(task).Error
}

func (r *gormRepository) Delete(id uint) error {
	return r.db.Delete(&Task{}, id).Error
}

func (r *gormRepository) ListByProjectID(projectID uint) ([]*Task, error) {
	var tasks []*Task
	if err := r.db.Where("project_id = ?", projectID).Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *gormRepository) ListByAssigneeID(assigneeID uint) ([]*Task, error) {
	var tasks []*Task
	if err := r.db.Where("assignee_id = ?", assigneeID).Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

```

## File: `backend/internal/task/service.go`

```go
package task

import (
	"errors"
)

var (
	ErrNotFound     = errors.New("task not found")
	ErrInvalidInput = errors.New("invalid input data")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	task := &Task{
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
		Priority:    req.Priority,
		DueDate:     req.DueDate,
		ProjectID:   req.ProjectID,
		AssigneeID:  req.AssigneeID,
	}

	if err := s.repo.Create(task); err != nil {
		return nil, err
	}

	return s.taskToResponse(task), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	return s.taskToResponse(task), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	if req.Title != "" {
		task.Title = req.Title
	}
	if req.Description != "" {
		task.Description = req.Description
	}
	if req.Status != "" {
		task.Status = req.Status
	}
	if req.Priority != "" {
		task.Priority = req.Priority
	}
	if req.DueDate != nil {
		task.DueDate = req.DueDate
	}
	if req.AssigneeID != nil {
		task.AssigneeID = req.AssigneeID
	}

	if err := s.repo.Update(task); err != nil {
		return nil, err
	}

	return s.taskToResponse(task), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) ListByProjectID(projectID uint) ([]*Response, error) {
	tasks, err := s.repo.ListByProjectID(projectID)
	if err != nil {
		return nil, err
	}

	responses := make([]*Response, len(tasks))
	for i, task := range tasks {
		responses[i] = s.taskToResponse(task)
	}

	return responses, nil
}

func (s *Service) ListByAssigneeID(assigneeID uint) ([]*Response, error) {
	tasks, err := s.repo.ListByAssigneeID(assigneeID)
	if err != nil {
		return nil, err
	}

	responses := make([]*Response, len(tasks))
	for i, task := range tasks {
		responses[i] = s.taskToResponse(task)
	}

	return responses, nil
}

func (s *Service) taskToResponse(task *Task) *Response {
	return &Response{
		ID:          task.ID,
		Title:       task.Title,
		Description: task.Description,
		Status:      task.Status,
		Priority:    task.Priority,
		DueDate:     task.DueDate,
		ProjectID:   task.ProjectID,
		AssigneeID:  task.AssigneeID,
		CreatedAt:   task.CreatedAt,
		UpdatedAt:   task.UpdatedAt,
	}
}

```

## File: `backend/internal/user/dto.go`

```go
package user

import "time"

// CreateRequest defines the input for creating a user
type CreateRequest struct {
	Name     string `json:"name" binding:"required,min=2,max=100"` // Validation rules
	Email    string `json:"email" binding:"required,email,max=100"`
	Password string `json:"password" binding:"required,min=8,max=72"`
}

// UpdateRequest defines the input for updating a user
type UpdateRequest struct {
	Name     string `json:"name,omitempty" binding:"omitempty,min=2,max=100"`
	Email    string `json:"email,omitempty" binding:"omitempty,email,max=100"`
	Password string `json:"password,omitempty" binding:"omitempty,min=8,max=72"`
}

// Response defines the output format for user data
type Response struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

```

## File: `backend/internal/user/handler.go`

```go
package user

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRoutes(router *gin.RouterGroup) {
	router.POST("/users", h.CreateUser)
	router.GET("/users/:id", h.GetUser)
	router.PUT("/users/:id", h.UpdateUser)
	router.DELETE("/users/:id", h.DeleteUser)
}

func (h *Handler) CreateUser(c *gin.Context) {
	var req CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrInvalidInput.Error()})
		return
	}

	res, err := h.service.Create(req)
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrEmailExists {
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, res)
}

func (h *Handler) GetUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	res, err := h.service.GetByID(uint(id))
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrNotFound {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) UpdateUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var req UpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrInvalidInput.Error()})
		return
	}

	res, err := h.service.Update(uint(id), req)
	if err != nil {
		status := http.StatusInternalServerError
		switch err {
		case ErrNotFound:
			status = http.StatusNotFound
		case ErrEmailExists:
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) DeleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		status := http.StatusInternalServerError
		if err == ErrNotFound {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

```

## File: `backend/internal/user/model.go`

```go
package user

import (
	"time"

	"gorm.io/gorm"
)

// User represents the database table structure
type User struct {
	ID        uint           `gorm:"primaryKey"`        // Auto-incrementing ID
	Name      string         `gorm:"size:100;not null"` // String with max length 100
	Email     string         `gorm:"size:100;uniqueIndex;not null"`
	Password  string         `gorm:"size:255;not null"` // Will store hashed passwords
	CreatedAt time.Time      `gorm:"autoCreateTime"`    // Auto-set on creation
	UpdatedAt time.Time      `gorm:"autoUpdateTime"`    // Auto-updated on changes
	DeletedAt gorm.DeletedAt `gorm:"index"`             // Soft delete field
}

```

## File: `backend/internal/user/repository.go`

```go
package user

import "gorm.io/gorm"

type Repository interface {
	Create(user *User) error
	GetByID(id uint) (*User, error)
	GetByEmail(email string) (*User, error)
	Update(user *User) error
	Delete(id uint) error
}

type gormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

func (r *gormRepository) Create(user *User) error {
	return r.db.Create(user).Error
}

func (r *gormRepository) GetByID(id uint) (*User, error) {
	var user User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *gormRepository) GetByEmail(email string) (*User, error) {
	var user User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *gormRepository) Update(user *User) error {
	return r.db.Save(user).Error
}

func (r *gormRepository) Delete(id uint) error {
	return r.db.Delete(&User{}, id).Error
}

```

## File: `backend/internal/user/service.go`

```go
package user

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrNotFound     = errors.New("user not found")
	ErrEmailExists  = errors.New("email already exists")
	ErrInvalidInput = errors.New("invalid input data")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	// Check email exists
	if _, err := s.repo.GetByEmail(req.Email); err == nil {
		return nil, ErrEmailExists
	}

	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, ErrInvalidInput
	}

	user := &User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashed),
	}

	if err := s.repo.Create(user); err != nil {
		return nil, err
	}

	return s.userToResponse(user), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}
	return s.userToResponse(user), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	if req.Name != "" {
		user.Name = req.Name
	}

	if req.Email != "" {
		if existing, _ := s.repo.GetByEmail(req.Email); existing != nil && existing.ID != id {
			return nil, ErrEmailExists
		}
		user.Email = req.Email
	}

	if req.Password != "" {
		hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, ErrInvalidInput
		}
		user.Password = string(hashed)
	}

	if err := s.repo.Update(user); err != nil {
		return nil, err
	}

	return s.userToResponse(user), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) userToResponse(user *User) *Response {
	return &Response{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}

```

## File: `backend/.gitignore`

```gitignore
.env

```

## File: `backend/go.mod`

```mod
module backend

go 1.23.7

require (
	github.com/gin-gonic/gin v1.10.0
	github.com/joho/godotenv v1.5.1
	gorm.io/driver/postgres v1.5.11
	gorm.io/gorm v1.25.12
)

require (
	github.com/bytedance/sonic v1.11.6 // indirect
	github.com/bytedance/sonic/loader v0.1.1 // indirect
	github.com/cloudwego/base64x v0.1.4 // indirect
	github.com/cloudwego/iasm v0.2.0 // indirect
	github.com/gabriel-vasile/mimetype v1.4.3 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.20.0 // indirect
	github.com/goccy/go-json v0.10.2 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	github.com/jackc/pgx/v5 v5.5.5 // indirect
	github.com/jackc/puddle/v2 v2.2.1 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/klauspost/cpuid/v2 v2.2.7 // indirect
	github.com/kr/text v0.2.0 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/pelletier/go-toml/v2 v2.2.2 // indirect
	github.com/rogpeppe/go-internal v1.14.1 // indirect
	github.com/twitchyliquid64/golang-asm v0.15.1 // indirect
	github.com/ugorji/go/codec v1.2.12 // indirect
	golang.org/x/arch v0.8.0 // indirect
	golang.org/x/crypto v0.23.0 // indirect
	golang.org/x/net v0.25.0 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/sys v0.26.0 // indirect
	golang.org/x/text v0.15.0 // indirect
	google.golang.org/protobuf v1.34.1 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

```

## File: `backend/go.sum`

```sum
github.com/bytedance/sonic v1.11.6 h1:oUp34TzMlL+OY1OUWxHqsdkgC/Zfc85zGqw9siXjrc0=
github.com/bytedance/sonic v1.11.6/go.mod h1:LysEHSvpvDySVdC2f87zGWf6CIKJcAvqab1ZaiQtds4=
github.com/bytedance/sonic/loader v0.1.1 h1:c+e5Pt1k/cy5wMveRDyk2X4B9hF4g7an8N3zCYjJFNM=
github.com/bytedance/sonic/loader v0.1.1/go.mod h1:ncP89zfokxS5LZrJxl5z0UJcsk4M4yY2JpfqGeCtNLU=
github.com/cloudwego/base64x v0.1.4 h1:jwCgWpFanWmN8xoIUHa2rtzmkd5J2plF/dnLS6Xd/0Y=
github.com/cloudwego/base64x v0.1.4/go.mod h1:0zlkT4Wn5C6NdauXdJRhSKRlJvmclQ1hhJgA0rcu/8w=
github.com/cloudwego/iasm v0.2.0 h1:1KNIy1I1H9hNNFEEH3DVnI4UujN+1zjpuk6gwHLTssg=
github.com/cloudwego/iasm v0.2.0/go.mod h1:8rXZaNYT2n95jn+zTI1sDr+IgcD2GVs0nlbbQPiEFhY=
github.com/creack/pty v1.1.9/go.mod h1:oKZEueFk5CKHvIhNR5MUki03XCEU+Q6VDXinZuGJ33E=
github.com/davecgh/go-spew v1.1.0/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.1 h1:vj9j/u1bqnvCEfJOwUhtlOARqs3+rkHYY13jYWTU97c=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/gabriel-vasile/mimetype v1.4.3 h1:in2uUcidCuFcDKtdcBxlR0rJ1+fsokWf+uqxgUFjbI0=
github.com/gabriel-vasile/mimetype v1.4.3/go.mod h1:d8uq/6HKRL6CGdk+aubisF/M5GcPfT7nKyLpA0lbSSk=
github.com/gin-contrib/sse v0.1.0 h1:Y/yl/+YNO8GZSjAhjMsSuLt29uWRFHdHYUb5lYOV9qE=
github.com/gin-contrib/sse v0.1.0/go.mod h1:RHrZQHXnP2xjPF+u1gW/2HnVO7nvIa9PG3Gm+fLHvGI=
github.com/gin-gonic/gin v1.10.0 h1:nTuyha1TYqgedzytsKYqna+DfLos46nTv2ygFy86HFU=
github.com/gin-gonic/gin v1.10.0/go.mod h1:4PMNQiOhvDRa013RKVbsiNwoyezlm2rm0uX/T7kzp5Y=
github.com/go-playground/assert/v2 v2.2.0 h1:JvknZsQTYeFEAhQwI4qEt9cyV5ONwRHC+lYKSsYSR8s=
github.com/go-playground/assert/v2 v2.2.0/go.mod h1:VDjEfimB/XKnb+ZQfWdccd7VUvScMdVu0Titje2rxJ4=
github.com/go-playground/locales v0.14.1 h1:EWaQ/wswjilfKLTECiXz7Rh+3BjFhfDFKv/oXslEjJA=
github.com/go-playground/locales v0.14.1/go.mod h1:hxrqLVvrK65+Rwrd5Fc6F2O76J/NuW9t0sjnWqG1slY=
github.com/go-playground/universal-translator v0.18.1 h1:Bcnm0ZwsGyWbCzImXv+pAJnYK9S473LQFuzCbDbfSFY=
github.com/go-playground/universal-translator v0.18.1/go.mod h1:xekY+UJKNuX9WP91TpwSH2VMlDf28Uj24BCp08ZFTUY=
github.com/go-playground/validator/v10 v10.20.0 h1:K9ISHbSaI0lyB2eWMPJo+kOS/FBExVwjEviJTixqxL8=
github.com/go-playground/validator/v10 v10.20.0/go.mod h1:dbuPbCMFw/DrkbEynArYaCwl3amGuJotoKCe95atGMM=
github.com/goccy/go-json v0.10.2 h1:CrxCmQqYDkv1z7lO7Wbh2HN93uovUHgrECaO5ZrCXAU=
github.com/goccy/go-json v0.10.2/go.mod h1:6MelG93GURQebXPDq3khkgXZkazVtN9CRI+MGFi0w8I=
github.com/google/go-cmp v0.5.5 h1:Khx7svrCpmxxtHBq5j2mp/xVjsi8hQMfNLvJFAlrGgU=
github.com/google/go-cmp v0.5.5/go.mod h1:v8dTdLbMG2kIc/vJvl+f65V22dbkXbowE6jgT/gNBxE=
github.com/google/gofuzz v1.0.0/go.mod h1:dBl0BpW6vV/+mYPU4Po3pmUjxk6FQPldtuIdl/M65Eg=
github.com/jackc/pgpassfile v1.0.0 h1:/6Hmqy13Ss2zCq62VdNG8tM1wchn8zjSGOBJ6icpsIM=
github.com/jackc/pgpassfile v1.0.0/go.mod h1:CEx0iS5ambNFdcRtxPj5JhEz+xB6uRky5eyVu/W2HEg=
github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a h1:bbPeKD0xmW/Y25WS6cokEszi5g+S0QxI/d45PkRi7Nk=
github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a/go.mod h1:5TJZWKEWniPve33vlWYSoGYefn3gLQRzjfDlhSJ9ZKM=
github.com/jackc/pgx/v5 v5.5.5 h1:amBjrZVmksIdNjxGW/IiIMzxMKZFelXbUoPNb+8sjQw=
github.com/jackc/pgx/v5 v5.5.5/go.mod h1:ez9gk+OAat140fv9ErkZDYFWmXLfV+++K0uAOiwgm1A=
github.com/jackc/puddle/v2 v2.2.1 h1:RhxXJtFG022u4ibrCSMSiu5aOq1i77R3OHKNJj77OAk=
github.com/jackc/puddle/v2 v2.2.1/go.mod h1:vriiEXHvEE654aYKXXjOvZM39qJ0q+azkZFrfEOc3H4=
github.com/jinzhu/inflection v1.0.0 h1:K317FqzuhWc8YvSVlFMCCUb36O/S9MCKRDI7QkRKD/E=
github.com/jinzhu/inflection v1.0.0/go.mod h1:h+uFLlag+Qp1Va5pdKtLDYj+kHp5pxUVkryuEj+Srlc=
github.com/jinzhu/now v1.1.5 h1:/o9tlHleP7gOFmsnYNz3RGnqzefHA47wQpKrrdTIwXQ=
github.com/jinzhu/now v1.1.5/go.mod h1:d3SSVoowX0Lcu0IBviAWJpolVfI5UJVZZ7cO71lE/z8=
github.com/joho/godotenv v1.5.1 h1:7eLL/+HRGLY0ldzfGMeQkb7vMd0as4CfYvUVzLqw0N0=
github.com/joho/godotenv v1.5.1/go.mod h1:f4LDr5Voq0i2e/R5DDNOoa2zzDfwtkZa6DnEwAbqwq4=
github.com/json-iterator/go v1.1.12 h1:PV8peI4a0ysnczrg+LtxykD8LfKY9ML6u2jnxaEnrnM=
github.com/json-iterator/go v1.1.12/go.mod h1:e30LSqwooZae/UwlEbR2852Gd8hjQvJoHmT4TnhNGBo=
github.com/klauspost/cpuid/v2 v2.0.9/go.mod h1:FInQzS24/EEf25PyTYn52gqo7WaD8xa0213Md/qVLRg=
github.com/klauspost/cpuid/v2 v2.2.7 h1:ZWSB3igEs+d0qvnxR/ZBzXVmxkgt8DdzP6m9pfuVLDM=
github.com/klauspost/cpuid/v2 v2.2.7/go.mod h1:Lcz8mBdAVJIBVzewtcLocK12l3Y+JytZYpaMropDUws=
github.com/knz/go-libedit v1.10.1/go.mod h1:MZTVkCWyz0oBc7JOWP3wNAzd002ZbM/5hgShxwh4x8M=
github.com/kr/pretty v0.3.0 h1:WgNl7dwNpEZ6jJ9k1snq4pZsg7DOEN8hP9Xw0Tsjwk0=
github.com/kr/pretty v0.3.0/go.mod h1:640gp4NfQd8pI5XOwp5fnNeVWj67G7CFk/SaSQn7NBk=
github.com/kr/text v0.2.0 h1:5Nx0Ya0ZqY2ygV366QzturHI13Jq95ApcVaJBhpS+AY=
github.com/kr/text v0.2.0/go.mod h1:eLer722TekiGuMkidMxC/pM04lWEeraHUUmBw8l2grE=
github.com/leodido/go-urn v1.4.0 h1:WT9HwE9SGECu3lg4d/dIA+jxlljEa1/ffXKmRjqdmIQ=
github.com/leodido/go-urn v1.4.0/go.mod h1:bvxc+MVxLKB4z00jd1z+Dvzr47oO32F/QSNjSBOlFxI=
github.com/mattn/go-isatty v0.0.20 h1:xfD0iDuEKnDkl03q4limB+vH+GxLEtL/jb4xVJSWWEY=
github.com/mattn/go-isatty v0.0.20/go.mod h1:W+V8PltTTMOvKvAeJH7IuucS94S2C6jfK/D7dTCTo3Y=
github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421/go.mod h1:6dJC0mAP4ikYIbvyc7fijjWJddQyLn8Ig3JB5CqoB9Q=
github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd h1:TRLaZ9cD/w8PVh93nsPXa1VrQ6jlwL5oN8l14QlcNfg=
github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd/go.mod h1:6dJC0mAP4ikYIbvyc7fijjWJddQyLn8Ig3JB5CqoB9Q=
github.com/modern-go/reflect2 v1.0.2 h1:xBagoLtFs94CBntxluKeaWgTMpvLxC4ur3nMaC9Gz0M=
github.com/modern-go/reflect2 v1.0.2/go.mod h1:yWuevngMOJpCy52FWWMvUC8ws7m/LJsjYzDa0/r8luk=
github.com/pelletier/go-toml/v2 v2.2.2 h1:aYUidT7k73Pcl9nb2gScu7NSrKCSHIDE89b3+6Wq+LM=
github.com/pelletier/go-toml/v2 v2.2.2/go.mod h1:1t835xjRzz80PqgE6HHgN2JOsmgYu/h4qDAS4n929Rs=
github.com/pmezard/go-difflib v1.0.0 h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/rogpeppe/go-internal v1.14.1 h1:UQB4HGPB6osV0SQTLymcB4TgvyWu6ZyliaW0tI/otEQ=
github.com/rogpeppe/go-internal v1.14.1/go.mod h1:MaRKkUm5W0goXpeCfT7UZI6fk/L7L7so1lCWt35ZSgc=
github.com/stretchr/objx v0.1.0/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/objx v0.4.0/go.mod h1:YvHI0jy2hoMjB+UWwv71VJQ9isScKT/TqJzVSSt89Yw=
github.com/stretchr/objx v0.5.0/go.mod h1:Yh+to48EsGEfYuaHDzXPcE3xhTkx73EhmCGUpEOglKo=
github.com/stretchr/objx v0.5.2/go.mod h1:FRsXN1f5AsAjCGJKqEizvkpNtU+EGNCLh3NxZ/8L+MA=
github.com/stretchr/testify v1.3.0/go.mod h1:M5WIy9Dh21IEIfnGCwXGc5bZfKNJtfHm1UVUgZn+9EI=
github.com/stretchr/testify v1.7.0/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.7.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.8.0/go.mod h1:yNjHg4UonilssWZ8iaSj1OCr/vHnekPRkoO+kdMU+MU=
github.com/stretchr/testify v1.8.1/go.mod h1:w2LPCIKwWwSfY2zedu0+kehJoqGctiVI29o6fzry7u4=
github.com/stretchr/testify v1.8.4/go.mod h1:sz/lmYIOXD/1dqDmKjjqLyZ2RngseejIcXlSw2iwfAo=
github.com/stretchr/testify v1.9.0 h1:HtqpIVDClZ4nwg75+f6Lvsy/wHu+3BoSGCbBAcpTsTg=
github.com/stretchr/testify v1.9.0/go.mod h1:r2ic/lqez/lEtzL7wO/rwa5dbSLXVDPFyf8C91i36aY=
github.com/twitchyliquid64/golang-asm v0.15.1 h1:SU5vSMR7hnwNxj24w34ZyCi/FmDZTkS4MhqMhdFk5YI=
github.com/twitchyliquid64/golang-asm v0.15.1/go.mod h1:a1lVb/DtPvCB8fslRZhAngC2+aY1QWCk3Cedj/Gdt08=
github.com/ugorji/go/codec v1.2.12 h1:9LC83zGrHhuUA9l16C9AHXAqEV/2wBQ4nkvumAE65EE=
github.com/ugorji/go/codec v1.2.12/go.mod h1:UNopzCgEMSXjBc6AOMqYvWC1ktqTAfzJZUZgYf6w6lg=
golang.org/x/arch v0.0.0-20210923205945-b76863e36670/go.mod h1:5om86z9Hs0C8fWVUuoMHwpExlXzs5Tkyp9hOrfG7pp8=
golang.org/x/arch v0.8.0 h1:3wRIsP3pM4yUptoR96otTUOXI367OS0+c9eeRi9doIc=
golang.org/x/arch v0.8.0/go.mod h1:FEVrYAQjsQXMVJ1nsMoVVXPZg6p2JE2mx8psSWTDQys=
golang.org/x/crypto v0.23.0 h1:dIJU/v2J8Mdglj/8rJ6UUOM3Zc9zLZxVZwwxMooUSAI=
golang.org/x/crypto v0.23.0/go.mod h1:CKFgDieR+mRhux2Lsu27y0fO304Db0wZe70UKqHu0v8=
golang.org/x/net v0.25.0 h1:d/OCCoBEUq33pjydKrGQhw7IlUPI2Oylr+8qLx49kac=
golang.org/x/net v0.25.0/go.mod h1:JkAGAh7GEvH74S6FOH42FLoXpXbE/aqXSrIQjXgsiwM=
golang.org/x/sync v0.1.0 h1:wsuoTGHzEhffawBOhz5CYhcrV4IdKZbEyZjBMuTp12o=
golang.org/x/sync v0.1.0/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sys v0.5.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.6.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.26.0 h1:KHjCJyddX0LoSTb3J+vWpupP9p0oznkqVk/IfjymZbo=
golang.org/x/sys v0.26.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/text v0.15.0 h1:h1V/4gjBv8v9cjcR6+AR5+/cIYK5N/WAgiv4xlsEtAk=
golang.org/x/text v0.15.0/go.mod h1:18ZOQIKpY8NJVqYksKHtTdi31H5itFRjB5/qKTNYzSU=
golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 h1:E7g+9GITq07hpfrRu66IVDexMakfv52eLZ2CXBWiKr4=
golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
google.golang.org/protobuf v1.34.1 h1:9ddQBjfCyZPOHPUiPxpYESBLc+T8P3E+Vo4IbKZgFWg=
google.golang.org/protobuf v1.34.1/go.mod h1:c6P6GXX6sHbq/GpV6MGZEdwhWPcYBgnhAHhKbcUYpos=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c h1:Hei/4ADfdWqJk1ZMxUNpqntNwaWcugrBjAiHlqqRiVk=
gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c/go.mod h1:JHkPIbrfpd72SG/EVd6muEfDQjcINNoR0C8j2r3qZ4Q=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gopkg.in/yaml.v3 v3.0.1 h1:fxVm/GzAzEWqLHuvctI91KS9hhNmmWOoWu0XTYJS7CA=
gopkg.in/yaml.v3 v3.0.1/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gorm.io/driver/postgres v1.5.11 h1:ubBVAfbKEUld/twyKZ0IYn9rSQh448EdelLYk9Mv314=
gorm.io/driver/postgres v1.5.11/go.mod h1:DX3GReXH+3FPWGrrgffdvCk3DQ1dwDPdmbenSkweRGI=
gorm.io/gorm v1.25.12 h1:I0u8i2hWQItBq1WfE0o2+WuL9+8L21K9e2HHSTE/0f8=
gorm.io/gorm v1.25.12/go.mod h1:xh7N7RHfYlNc5EmcI/El95gXusucDrQnHXe0+CgWcLQ=
nullprogram.com/x/optparse v1.0.0/go.mod h1:KdyPE+Igbe0jQUrVfMqDMeJQIJZEuyV7pjYmp6pbG50=
rsc.io/pdf v0.1.1/go.mod h1:n8OzWcQ6Sp37PL01nO98y4iUCRdTGarVfzxY20ICaU4=

```

