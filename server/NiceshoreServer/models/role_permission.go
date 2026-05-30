package models

import (
	"github.com/google/uuid"
)

type RolePermission struct {
	BaseModel

	ID           uuid.UUID `gorm:"type:uuid;primaryKey:"`
	PermissionID int
	Permission   Permission `gorm:"foreignKey:PermissionID;references:ID"`
}
