package db

import (
	"backend/internal/milestone"
	"backend/internal/project"
	"backend/internal/secureitem"
	"backend/internal/task"
	"backend/internal/user"
	"log"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&user.User{},
		&task.Task{},
		&project.Project{},
		&milestone.Milestone{},
		&secureitem.SecureItem{},
	)
	if err != nil {
		log.Fatalf("❌ Migration failed: %v", err)
	}

	log.Println("✅ Database migrated successfully")
}
