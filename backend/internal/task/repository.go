package task

import "gorm.io/gorm"

type Repository interface {
	Create(task *Task) error
	GetByID(id uint) (*Task, error)
	Update(task *Task) error
	Delete(id uint) error
	ListByProjectID(projectID uint) ([]*Task, error)
	ListByAssigneeID(assigneeID uint) ([]*Task, error)
}

type gormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

func (r *gormRepository) Create(task *Task) error {
	return r.db.Create(task).Error
}

func (r *gormRepository) GetByID(id uint) (*Task, error) {
	var task Task
	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *gormRepository) Update(task *Task) error {
	return r.db.Save(task).Error
}

func (r *gormRepository) Delete(id uint) error {
	return r.db.Delete(&Task{}, id).Error
}

func (r *gormRepository) ListByProjectID(projectID uint) ([]*Task, error) {
	var tasks []*Task
	if err := r.db.Where("project_id = ?", projectID).Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *gormRepository) ListByAssigneeID(assigneeID uint) ([]*Task, error) {
	var tasks []*Task
	if err := r.db.Where("assignee_id = ?", assigneeID).Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}
