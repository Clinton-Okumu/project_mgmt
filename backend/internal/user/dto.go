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
