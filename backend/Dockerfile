# Stage 1: Build the Go application
FROM golang:1.21-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download Go modules
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o project-mgmt-api ./cmd/api

# Stage 2: Create a minimal runtime image
FROM alpine:latest

# Set the working directory for the runtime
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/project-mgmt-api .

# Expose the port your backend listens on (replace 8080 if different)
EXPOSE 8080

# Command to run the backend application
CMD ["./project-mgmt-api"]
