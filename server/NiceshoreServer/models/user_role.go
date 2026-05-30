package models

import (
	"github.com/google/uuid"
)

type UserRole struct {
	BaseModel

	ID     uuid.UUID `gorm:"type:uuid;primaryKey;"`
	RoleID int
	Role   Role `gorm:"foreignKey:RoleID;references:ID"`
}
