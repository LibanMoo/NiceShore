package models

import (
	"time"

	"github.com/google/uuid"
)

type Beach struct {
	ID          string `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	Name        string
	Description string
	Longitude   string
	Latitude    string
	CreatedAt   time.Time `gorm:"autoCreateTime;"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime;"`
	CreatedBy   uuid.UUID `gorm:"type:uuid;not null"`
	UpdatedBy   uuid.UUID `gorm:"type:uuid;not null"`
}
