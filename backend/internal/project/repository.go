package project

import "gorm.io/gorm"

type Repository interface {
	Create(project *Project) error
	GetByID(id uint) (*Project, error)
	GetByOwner(ownerID string) ([]Project, error)
	Update(project *Project) error
	Delete(id uint) error
	ExistsWithName(name string, ownerID string) (bool, error)
}

type gormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

func (r *gormRepository) Create(project *Project) error {
	return r.db.Create(project).Error
}

func (r *gormRepository) GetByID(id uint) (*Project, error) {
	var project Project
	if err := r.db.First(&project, id).Error; err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *gormRepository) GetByOwner(ownerID string) ([]Project, error) {
	var projects []Project
	if err := r.db.Where("owner_id = ?", ownerID).Find(&projects).Error; err != nil {
		return nil, err
	}
	return projects, nil
}

func (r *gormRepository) Update(project *Project) error {
	return r.db.Save(project).Error
}

func (r *gormRepository) Delete(id uint) error {
	return r.db.Delete(&Project{}, id).Error
}

func (r *gormRepository) ExistsWithName(name string, ownerID string) (bool, error) {
	var count int64
	err := r.db.Model(&Project{}).
		Where("name = ? AND owner_id = ?", name, ownerID).
		Count(&count).
		Error
	return count > 0, err
}
