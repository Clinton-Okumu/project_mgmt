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
