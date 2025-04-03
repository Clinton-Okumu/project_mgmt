package milestone

import (
	"errors"
)

var (
	ErrMilestoneNotFound = errors.New("milestone not found")
	ErrInvalidInput      = errors.New("invalid input")
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	milestone := &Milestone{
		Title:       req.Title,
		Description: req.Description,
		DueDate:     req.DueDate,
		ProjectID:   req.ProjectID,
	}

	if err := s.repo.Create(milestone); err != nil {
		return nil, err
	}

	return s.milestoneToResponse(milestone), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	milestone, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrMilestoneNotFound
	}

	return s.milestoneToResponse(milestone), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	milestone, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrMilestoneNotFound
	}

	if req.Title != "" {
		milestone.Title = req.Title
	}

	if req.Description != "" {
		milestone.Description = req.Description
	}

	if req.DueDate != nil {
		milestone.DueDate = req.DueDate
	}

	if req.ProjectID != 0 {
		milestone.ProjectID = req.ProjectID
	}

	if err := s.repo.Update(milestone); err != nil {
		return nil, err
	}

	return s.milestoneToResponse(milestone), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) GetByProjectID(projectID uint) ([]*Response, error) {
	milestones, err := s.repo.GetByProjectID(projectID)
	if err != nil {
		return nil, err
	}

	var responses []*Response
	for _, milestone := range milestones {
		responses = append(responses, s.milestoneToResponse(milestone))
	}

	return responses, nil
}

func (s *Service) milestoneToResponse(m *Milestone) *Response {
	return &Response{
		ID:          m.ID,
		Title:       m.Title,
		Description: m.Description,
		DueDate:     m.DueDate,
		ProjectID:   m.ProjectID,
		CreatedAt:   m.CreatedAt,
		UpdatedAt:   m.UpdatedAt,
	}
}
