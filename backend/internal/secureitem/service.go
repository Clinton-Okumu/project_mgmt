package secureitem

import (
	"errors"
	// your encryption/decryption package import here, for example:
	// "yourmodule/encryption"
)

var (
	ErrSecureItemNotFound = errors.New("secure item not found")
	ErrInvalidInput       = errors.New("invalid input")
	ErrDecryptionFailed   = errors.New("decryption failed")
)

type Service struct {
	repo *Repository
	// Add encryption/decryption key or handler here
	// encryptionKey []byte
}

func NewService(repo *Repository /*, encryptionKey []byte */) *Service {
	return &Service{repo: repo /*, encryptionKey: encryptionKey */}
}

func (s *Service) Create(req CreateRequest) (*Response, error) {
	// Encrypt the value
	encryptedValue, err := s.encryptValue(req.Value) // implement encryptValue below
	if err != nil {
		return nil, err
	}
	secureItem := &SecureItem{
		Name:           req.Name,
		Type:           req.Type,
		ValueEncrypted: encryptedValue,
		ProjectID:      req.ProjectID,
	}

	if err := s.repo.Create(secureItem); err != nil {
		return nil, err
	}

	return s.secureItemToResponse(secureItem), nil
}

func (s *Service) GetByID(id uint) (*Response, error) {
	secureItem, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrSecureItemNotFound
	}

	return s.secureItemToResponse(secureItem), nil
}

func (s *Service) Update(id uint, req UpdateRequest) (*Response, error) {
	secureItem, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrSecureItemNotFound
	}

	if req.Name != "" {
		secureItem.Name = req.Name
	}

	if req.Type != "" {
		secureItem.Type = req.Type
	}

	if req.Value != "" {
		encryptedValue, err := s.encryptValue(req.Value)
		if err != nil {
			return nil, err
		}
		secureItem.ValueEncrypted = encryptedValue
	}

	if req.ProjectID != 0 {
		secureItem.ProjectID = req.ProjectID
	}

	if err := s.repo.Update(secureItem); err != nil {
		return nil, err
	}

	return s.secureItemToResponse(secureItem), nil
}

func (s *Service) Delete(id uint) error {
	return s.repo.Delete(id)
}

func (s *Service) GetByProjectID(projectID uint) ([]*Response, error) {
	secureItems, err := s.repo.GetByProjectID(projectID)
	if err != nil {
		return nil, err
	}

	var responses []*Response
	for _, secureItem := range secureItems {
		responses = append(responses, s.secureItemToResponse(secureItem))
	}

	return responses, nil
}

func (s *Service) GetDecryptedByID(id uint) (*DecryptedResponse, error) {
	secureItem, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrSecureItemNotFound
	}

	// Decrypt the value
	decryptedValue, err := s.decryptValue(secureItem.ValueEncrypted)
	if err != nil {
		return nil, ErrDecryptionFailed
	}

	return &DecryptedResponse{
		ID:        secureItem.ID,
		Name:      secureItem.Name,
		Type:      secureItem.Type,
		Value:     decryptedValue,
		ProjectID: secureItem.ProjectID,
	}, nil
}

func (s *Service) secureItemToResponse(si *SecureItem) *Response {
	return &Response{
		ID:        si.ID,
		Name:      si.Name,
		Type:      si.Type,
		ProjectID: si.ProjectID,
	}
}

func (s *Service) encryptValue(value string) (string, error) {
	// Implement your encryption logic here.
	// use s.encryptionKey or other key management.
	// return encrypted value and error.
	// Example:
	// encrypted, err := encryption.Encrypt(value, s.encryptionKey)
	// return encrypted, err
	return value, errors.New("encryptValue not implemented") // replace with your encryption logic
}

func (s *Service) decryptValue(encryptedValue string) (string, error) {
	// Implement your decryption logic here.
	// use s.encryptionKey or other key management.
	// return decrypted value and error.
	// Example:
	// decrypted, err := encryption.Decrypt(encryptedValue, s.encryptionKey)
	// return decrypted, err
	return encryptedValue, errors.New("decryptValue not implemented") // replace with your decryption logic
}
