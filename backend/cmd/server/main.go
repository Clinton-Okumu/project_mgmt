package main

import (
	"backend/config"
	"backend/internal/auth"
	"backend/internal/db"
	"backend/internal/milestone"
	"backend/internal/project"
	"backend/internal/task"
	"backend/internal/user"
	"backend/middleware"
	"log"
	"net/http"

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

	// Apply CORS middleware globally (for the actual POST request later)
	router.Use(middleware.CORSMiddleware())

	router.StaticFile("/favicon.ico", "./static/favicon.ico")

	api := router.Group("/api")
	{
		// User Routes (Register and user related routes)
		userRepo := user.NewRepository(database)
		userService := user.NewService(userRepo)
		userHandler := user.NewHandler(userService)
		userRoutes := api.Group("/users")
		userHandler.RegisterRoutes(userRoutes)

		// Authentication Routes (Login)
		authHandler := auth.NewHandler(userService, cfg)
		api.POST("/login", authHandler.Login)
		api.POST("/register", authHandler.Register)

		// Explicitly handle OPTIONS for /api/login
		api.OPTIONS("/login", func(c *gin.Context) {
			c.Status(http.StatusNoContent)
		})
	}

	// Protected routes
	protected := api.Group("/")
	protected.Use(auth.AuthMiddleware(cfg))
	{
		// Task Routes (Protected)
		taskRepo := task.NewRepository(database)
		taskService := task.NewService(taskRepo)
		taskHandler := task.NewHandler(taskService)
		taskRoutes := protected.Group("/tasks")
		taskHandler.RegisterRoutes(taskRoutes)

		// Milestone Routes (Protected)
		milestoneRepo := milestone.NewRepository(database)
		milestoneService := milestone.NewService(milestoneRepo)
		milestoneHandler := milestone.NewHandler(milestoneService)
		milestoneRoutes := protected.Group("/milestones")
		milestoneHandler.RegisterRoutes(milestoneRoutes)

		// project routes(protected)
		projectRepo := project.NewRepository(database)
		projectService := project.NewService(projectRepo)
		projectHandler := project.NewHandler(projectService)
		projectRoutes := protected.Group("/projects")
		projectHandler.RegisterRoutes(projectRoutes)
	}

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
