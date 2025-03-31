package main

import (
	"backend/config"
	"backend/internal/db"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load environment variables
	cfg := config.Load()

	// Connect to the database
	database := db.Connect(cfg)

	// Run auto migrations
	db.Migrate(database)

	// Initialize Gin router
	router := gin.Default()

	// Define a simple welcome route
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the Project Management API!",
		})
	})

	// Log the server URL
	log.Printf("✅ Server running at http://localhost%s\n", cfg.AppPort)

	// Start the server
	if err := router.Run(cfg.AppPort); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}
