package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
	AppPort    string
	JWTSecret  string
}

func Load() *Config {
	_ = godotenv.Load()

	cfg := &Config{
		DBHost:     os.Getenv("DB_HOST"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASS"),
		DBName:     os.Getenv("DB_NAME"),
		DBPort:     os.Getenv("DB_PORT"),
		AppPort:    os.Getenv("PORT"),
		JWTSecret:  os.Getenv("JWT_SECRET"),
	}

	if cfg.DBHost == "" || cfg.DBUser == "" || cfg.DBPassword == "" || cfg.DBName == "" || cfg.DBPort == "" {
		log.Fatal("❌ Missing one or more required database environment variables")
	}

	return cfg
}
