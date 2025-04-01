package user

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrNotFound     = errors.New("user not found")
	ErrEmailExists  = errors.New("email already exists")
	ErrInvalidInput = errors.New("invalid input data")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	// Check email exists
	if _, err := s.repo.GetByEmail(req.Email); err == nil {
		return nil, ErrEmailExists
	}

	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, ErrInvalidInput
	}

	user := &User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashed),
	}

	if err := s.repo.Create(user); err != nil {
		return nil, err
	}

	return s.userToResponse(user), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}
	return s.userToResponse(user), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	if req.Name != "" {
		user.Name = req.Name
	}

	if req.Email != "" {
		if existing, _ := s.repo.GetByEmail(req.Email); existing != nil && existing.ID != id {
			return nil, ErrEmailExists
		}
		user.Email = req.Email
	}

	if req.Password != "" {
		hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, ErrInvalidInput
		}
		user.Password = string(hashed)
	}

	if err := s.repo.Update(user); err != nil {
		return nil, err
	}

	return s.userToResponse(user), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) userToResponse(user *User) *Response {
	return &Response{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}
