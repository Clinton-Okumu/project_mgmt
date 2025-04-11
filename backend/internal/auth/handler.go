package auth

import (
	"backend/config"
	"backend/internal/user"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	userService *user.Service
	cfg         *config.Config
}

func NewHandler(userService *user.Service, cfg *config.Config) *Handler {
	return &Handler{userService: userService, cfg: cfg}
}

func (h *Handler) Register(c *gin.Context) {
	var req user.CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": user.ErrInvalidInput.Error()})
		return
	}

	_, err := h.userService.Create(req)
	if err != nil {
		status := http.StatusInternalServerError
		if err == user.ErrEmailExists {
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Registration successful"})
}

func (h *Handler) Login(c *gin.Context) {
	var loginReq struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": user.ErrInvalidInput.Error()})
		return
	}

	user, err := h.userService.Authenticate(loginReq.Email, loginReq.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, err := GenerateToken(user.ID, h.cfg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
