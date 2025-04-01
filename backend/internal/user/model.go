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
