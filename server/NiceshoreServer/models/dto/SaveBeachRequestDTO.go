package dto

type SaveBeachRequestDTO struct {
	UserID  string `json:"user_id" binding:"required"`
	BeachID string `json:"beach_id" binding:"required"`
}
