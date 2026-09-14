package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID       uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;"`
	FullName string    `gorm:"not null"`
	Email    string    `gorm:"unique;not null"`
	Password string    `gorm:"not null"`
	Dob      time.Time `gorm:"type:date"`
}
