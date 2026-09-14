package dto

type BeachRequestDTO struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	Longitude   string `json:"longitude" binding:"required"`
	Latitude    string `json:"latitude" binding:"required"`
	CreatedBy   string `json:"created_by" binding:"required"`
	UpdatedBy   string `json:"updated_by" binding:"required"`
}
