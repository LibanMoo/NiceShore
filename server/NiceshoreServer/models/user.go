package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	BaseModel

	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	FullName  string    `gorm:"not null"`
	Email     string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
	AvatarURL string
	IsActive  bool      `gorm:"default:false"`
	Dob       time.Time `gorm:"type:date"`
}
