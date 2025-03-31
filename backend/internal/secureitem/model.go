package secureitem

import (
	"time"

	"gorm.io/gorm"
)

type SecureItem struct {
	ID             uint   `gorm:"primaryKey"`
	Name           string `gorm:"type:varchar(100);not null"` // e.g. "GitHub API Key"
	Type           string `gorm:"type:varchar(50);not null"`  // e.g. "token", "api_key"
	ValueEncrypted string `gorm:"type:text;not null"`         // Encrypted version of the secret
	ProjectID      uint   `gorm:"not null"`                   // FK to Project
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}
