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
