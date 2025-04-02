package project

import (
	"errors"
)

var (
	ErrProjectNotFound    = errors.New("project not found")
	ErrProjectNameExists  = errors.New("project name already exists for this owner")
	ErrInvalidOwner       = errors.New("invalid owner specified")
	ErrUnauthorizedAccess = errors.New("unauthorized access to project")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// CreateProject handles business logic for project creation
func (s *Service) CreateProject(req CreateRequest) (*Response, error) {
	// Check for existing project name
	exists, err := s.repo.ExistsWithName(req.Name, req.OwnerID)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, ErrProjectNameExists
	}

	project := &Project{
		Name:          req.Name,
		Description:   req.Description,
		OwnerID:       req.OwnerID,
		IsTeamProject: req.IsTeamProject,
	}

	if err := s.repo.Create(project); err != nil {
		return nil, err
	}

	return s.projectToResponse(project), nil
}

// GetProject retrieves a project by ID with ownership check
func (s *Service) GetProject(id uint, requestorID string) (*Response, error) {
	project, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrProjectNotFound
	}

	// Basic ownership check (expand for team projects)
	if project.OwnerID != requestorID {
		return nil, ErrUnauthorizedAccess
	}

	return s.projectToResponse(project), nil
}

// UpdateProject handles project updates with validation
func (s *Service) UpdateProject(id uint, req UpdateRequest, requestorID string) (*Response, error) {
	project, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrProjectNotFound
	}

	// Verify ownership
	if project.OwnerID != requestorID {
		return nil, ErrUnauthorizedAccess
	}

	// Apply updates
	if req.Name != "" {
		// Check if new name is available
		exists, err := s.repo.ExistsWithName(req.Name, requestorID)
		if err != nil {
			return nil, err
		}
		if exists && req.Name != project.Name {
			return nil, ErrProjectNameExists
		}
		project.Name = req.Name
	}

	if req.Description != "" {
		project.Description = req.Description
	}

	if req.IsTeamProject != nil {
		project.IsTeamProject = *req.IsTeamProject
	}

	if err := s.repo.Update(project); err != nil {
		return nil, err
	}

	return s.projectToResponse(project), nil
}

// Helper to convert DB model to API response
func (s *Service) projectToResponse(p *Project) *Response {
	return &Response{
		ID:            p.ID,
		Name:          p.Name,
		Description:   p.Description,
		OwnerID:       p.OwnerID,
		IsTeamProject: p.IsTeamProject,
		CreatedAt:     p.CreatedAt,
		UpdatedAt:     p.UpdatedAt,
	}
}
