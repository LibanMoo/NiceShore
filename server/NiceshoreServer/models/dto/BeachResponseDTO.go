package dto

import "time"

type CurrentTideDTO struct {
	Date   time.Time `json:"date"`
	Height float64   `json:"height"`
}

type BeachResponseDTO struct {
	ID          string          `json:"id"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Latitude    string          `json:"latitude"`
	Longitude   string          `json:"longitude"`
	Status      string          `json:"status"`
	CurrentTide *CurrentTideDTO `json:"current_tide"`
}
