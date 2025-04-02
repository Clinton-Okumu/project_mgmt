package task

import (
	"errors"
)

var (
	ErrNotFound     = errors.New("task not found")
	ErrInvalidInput = errors.New("invalid input data")
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	task := &Task{
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
		Priority:    req.Priority,
		DueDate:     req.DueDate,
		ProjectID:   req.ProjectID,
		AssigneeID:  req.AssigneeID,
	}

	if err := s.repo.Create(task); err != nil {
		return nil, err
	}

	return s.taskToResponse(task), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	return s.taskToResponse(task), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrNotFound
	}

	if req.Title != "" {
		task.Title = req.Title
	}
	if req.Description != "" {
		task.Description = req.Description
	}
	if req.Status != "" {
		task.Status = req.Status
	}
	if req.Priority != "" {
		task.Priority = req.Priority
	}
	if req.DueDate != nil {
		task.DueDate = req.DueDate
	}
	if req.AssigneeID != nil {
		task.AssigneeID = req.AssigneeID
	}

	if err := s.repo.Update(task); err != nil {
		return nil, err
	}

	return s.taskToResponse(task), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) ListByProjectID(projectID uint) ([]*Response, error) {
	tasks, err := s.repo.ListByProjectID(projectID)
	if err != nil {
		return nil, err
	}

	responses := make([]*Response, len(tasks))
	for i, task := range tasks {
		responses[i] = s.taskToResponse(task)
	}

	return responses, nil
}

func (s *Service) ListByAssigneeID(assigneeID uint) ([]*Response, error) {
	tasks, err := s.repo.ListByAssigneeID(assigneeID)
	if err != nil {
		return nil, err
	}

	responses := make([]*Response, len(tasks))
	for i, task := range tasks {
		responses[i] = s.taskToResponse(task)
	}

	return responses, nil
}

func (s *Service) taskToResponse(task *Task) *Response {
	return &Response{
		ID:          task.ID,
		Title:       task.Title,
		Description: task.Description,
		Status:      task.Status,
		Priority:    task.Priority,
		DueDate:     task.DueDate,
		ProjectID:   task.ProjectID,
		AssigneeID:  task.AssigneeID,
		CreatedAt:   task.CreatedAt,
		UpdatedAt:   task.UpdatedAt,
	}
}
