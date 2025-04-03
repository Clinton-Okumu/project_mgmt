package secureitem

import (
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(secureItem *SecureItem) error {
	return r.db.Create(secureItem).Error
}

func (r *Repository) GetByID(id uint) (*SecureItem, error) {
	var secureItem SecureItem
	err := r.db.First(&secureItem, id).Error
	if err != nil {
		return nil, err
	}
	return &secureItem, nil
}

func (r *Repository) Update(secureItem *SecureItem) error {
	return r.db.Save(secureItem).Error
}

func (r *Repository) Delete(id uint) error {
	return r.db.Delete(&SecureItem{}, id).Error
}

func (r *Repository) GetByProjectID(projectID uint) ([]*SecureItem, error) {
	var secureItems []*SecureItem
	err := r.db.Where("project_id = ?", projectID).Find(&secureItems).Error
	if err != nil {
		return nil, err
	}
	return secureItems, nil
}
