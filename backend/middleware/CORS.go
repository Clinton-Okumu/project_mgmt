package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware returns a Gin middleware function that handles CORS headers.
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Dynamically check the origin for security
		origin := strings.ToLower(c.Request.Header.Get("Origin"))
		allowedOrigins := []string{"http://localhost:5173", "https://yourproductionurl.com"} // Add your allowed origins here
		allowed := false

		// Set the allowed origin based on the incoming request's Origin header
		for _, allowedOrigin := range allowedOrigins {
			if origin == strings.ToLower(allowedOrigin) {
				c.Writer.Header().Set("Access-Control-Allow-Origin", c.Request.Header.Get("Origin")) // Use the original case
				allowed = true
				break
			}
		}

		// If the origin is not allowed, don't set the CORS headers further
		if !allowed && origin != "" {
			c.Next() // Still process the request, but the browser will likely block the response
			return
		}

		// Set other CORS headers
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle OPTIONS requests (preflight requests)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		// Continue processing the request
		c.Next()
	}
}
