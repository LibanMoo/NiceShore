package models

import (
	"time"

	"github.com/google/uuid"
)

type BaseModel struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time `gorm:"index"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
