package project

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"type:varchar(100);not null"`
	Description   string `gorm:"type:text"`
	OwnerID       string `gorm:"not null"`
	IsTeamProject bool   `gorm:"default:false"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     gorm.DeletedAt
}
