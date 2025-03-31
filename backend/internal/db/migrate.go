package db

import (
	"log"
	"project_mgmt/internal/task"
	"project_mgmt/internal/user"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&user.User{},
		&task.Task{},
	)
	if err != nil {
		log.Fatalf("❌ Migration failed: %v", err)
	}

	log.Println("✅ Database migrated successfully")
}
