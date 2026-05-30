package models

import (
	"github.com/google/uuid"
)

type Permission struct {
	BaseModel

	ID   uuid.UUID `gorm:"type:uuid;primaryKey;"`
	Name string    `gorm:"not null"`
}
