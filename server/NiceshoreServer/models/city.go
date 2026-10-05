package models

import (
	"time"

	"github.com/google/uuid"
)

type City struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	Name      string    `gorm:"not null"`
	CountryID uuid.UUID `gorm:"type:uuid;not null"`
	CreatedAt time.Time `gorm:"default:current_timestamp"`
	UpdatedAt time.Time `gorm:"default:current_timestamp"`
	CreatedBy uuid.UUID `gorm:"type:uuid;not null"`
	UpdatedBy uuid.UUID `gorm:"type:uuid;not null"`
}
