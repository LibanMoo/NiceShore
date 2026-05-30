package models

import (
	"github.com/google/uuid"
)

type User struct {
	BaseModel

	ID         uuid.UUID `gorm:"type:uuid;primaryKey;"`
	Username   string    `gorm:"unique;not null"`
	FullName   string    `gorm:"not null"`
	Email      string    `gorm:"unique;not null"`
	Password   string    `gorm:"not null"`
	AvatarURL  string
	Reputation string
	IsActive   bool `gorm:"default:false"`
}
