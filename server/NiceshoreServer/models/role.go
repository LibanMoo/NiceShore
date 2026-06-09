package models

import (
	"github.com/google/uuid"
)

type Role struct {
	BaseModel

	ID   uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	Name string    `gorm:"not null"`
}
