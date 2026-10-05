package models

import (
	"time"

	"github.com/google/uuid"
)

type SavedBeach struct {
	UserID    uuid.UUID `gorm:"type:uuid;not null;primaryKey"`
	BeachID   uuid.UUID `gorm:"type:uuid;not null;primaryKey"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
