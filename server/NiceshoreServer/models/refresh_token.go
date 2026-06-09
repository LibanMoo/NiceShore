package models

import (
	"time"

	"github.com/google/uuid"
)

type RefreshToken struct {
	BaseModel
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	UserID    uuid.UUID `gorm:"type:uuid;not null"`
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Token     string    `gorm:"not null"`
	ExpiresAt time.Time `gorm:"not null"`
}
