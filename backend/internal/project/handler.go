package project

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers struct {
	service *Service
}

func NewHandler(service *Service) *Handlers {
	return &Handlers{service: service}
}

func (h *Handlers) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/", h.GetAllProjectsHandler)
	router.POST("/", h.CreateProjectHandler)
	router.GET("/:id", h.GetProjectHandler)
	router.PATCH("/:id", h.UpdateProjectHandler)
	router.DELETE("/:id", h.DeleteProjectHandler)
	router.GET("/myprojects", h.GetMyProjectsHandler)
}

func (h *Handlers) GetAllProjectsHandler(c *gin.Context) {
	projects, err := h.service.GetAllProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
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

// DeleteProjectHandler handles DELETE /projects/:id
func (h *Handlers) DeleteProjectHandler(c *gin.Context) {
	id, err := parseID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid project ID"})
		return
	}

	// Get requestor from auth middleware
	requestorID := c.GetString("user_id")

	err = h.service.DeleteProject(id, requestorID)
	if err != nil {
		status := http.StatusInternalServerError
		switch err {
		case ErrProjectNotFound:
			status = http.StatusNotFound
		case ErrUnauthorizedAccess:
			status = http.StatusForbidden
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{"message": "project deleted successfully"})
}

// Helper function to parse ID from URL params
func parseID(idParam string) (uint, error) {
	// You'll need to implement proper ID parsing
	// This is a simplified version
	var id uint
	_, err := fmt.Sscanf(idParam, "%d", &id)
	return id, err
}

func (h *Handlers) GetMyProjectsHandler(c *gin.Context) {
	requestorID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve user ID from context"})
		return
	}

	projects, err := h.service.GetProjectsByOwnerID(fmt.Sprintf("%v", requestorID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}
