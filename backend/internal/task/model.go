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
