package milestone

import (
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(milestone *Milestone) error {
	return r.db.Create(milestone).Error
}

func (r *Repository) GetByID(id uint) (*Milestone, error) {
	var milestone Milestone
	err := r.db.First(&milestone, id).Error
	if err != nil {
		return nil, err
	}
	return &milestone, nil
}

func (r *Repository) Update(milestone *Milestone) error {
	return r.db.Save(milestone).Error
}

func (r *Repository) Delete(id uint) error {
	return r.db.Delete(&Milestone{}, id).Error
}

func (r *Repository) GetByProjectID(projectID uint) ([]*Milestone, error) {
	var milestones []*Milestone
	err := r.db.Where("project_id = ?", projectID).Find(&milestones).Error
	if err != nil {
		return nil, err
	}
	return milestones, nil
}
