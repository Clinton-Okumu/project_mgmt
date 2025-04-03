package secureitem

type CreateRequest struct {
	Name      string `json:"name" binding:"required"`
	Type      string `json:"type" binding:"required"`
	Value     string `json:"value" binding:"required"` // The unencrypted value
	ProjectID uint   `json:"project_id" binding:"required"`
}

type UpdateRequest struct {
	Name      string `json:"name"`
	Type      string `json:"type"`
	Value     string `json:"value"` // The unencrypted value
	ProjectID uint   `json:"project_id"`
}

type Response struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Type      string `json:"type"`
	ProjectID uint   `json:"project_id"`
}

type DecryptedResponse struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Type      string `json:"type"`
	Value     string `json:"value"` // Decrypted value
	ProjectID uint   `json:"project_id"`
}
