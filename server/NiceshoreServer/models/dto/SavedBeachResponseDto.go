package dto

type SavedBeachResponseDTO struct {
	ID             string             `json:"id"`
	Name           string             `json:"name"`
	Description    string             `json:"description"`
	Latitude       string             `json:"latitude"`
	Longitude      string             `json:"longitude"`
	Status         string             `json:"status"`
	CurrentTide    *CurrentTideDTO    `json:"current_tide"`
	TidePrediction *TidePredictionDTO `json:"tide_prediction"`
}
