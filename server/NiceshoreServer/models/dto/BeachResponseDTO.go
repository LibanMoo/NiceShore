package dto

import "time"

type CurrentTideDTO struct {
	Date   time.Time `json:"date"`
	Height float64   `json:"height"`
}

type TidePredictionDTO struct {
	Direction      string    `json:"direction"`
	CurrentHeight  float64   `json:"current_height"`
	CurrentTime    time.Time `json:"current_time"`
	UpcomingHeight float64   `json:"upcoming_height"`
	UpcomingTime   time.Time `json:"upcoming_time"`
	Change         float64   `json:"change"`
}

type BeachResponseDTO struct {
	ID             string             `json:"id"`
	Name           string             `json:"name"`
	Description    string             `json:"description"`
	Latitude       string             `json:"latitude"`
	Longitude      string             `json:"longitude"`
	Status         string             `json:"status"`
	CurrentTide    *CurrentTideDTO    `json:"current_tide"`
	TidePrediction *TidePredictionDTO `json:"tide_prediction"`
}
