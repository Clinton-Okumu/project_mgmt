package project

import "time"

// CreateRequest defines input for creating a project
type CreateRequest struct {
	Name          string    `json:"name" binding:"required,min=3,max=100"`
	Description   string    `json:"description" binding:"max=500"`
	OwnerID       string    `json:"owner_id,omitempty"`
	IsTeamProject bool      `json:"is_team_project"`
	LaunchDate    time.Time `json:"launch_date"`
}

// UpdateRequest defines input for updating a project
type UpdateRequest struct {
	Name          string    `json:"name" binding:"omitempty,min=3,max=100"`
	Description   string    `json:"description" binding:"omitempty,max=500"`
	IsTeamProject *bool     `json:"is_team_project"`
	LaunchDate    time.Time `json:"launch_date,omitempty"`
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
