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
