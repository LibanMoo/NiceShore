package models

import (
	"github.com/google/uuid"
)

type RolePermission struct {
	BaseModel

	RoleID uuid.UUID `gorm:"type:uuid;primaryKey"`
	Role   Role      `gorm:"foreignKey:RoleID;constraint:OnDelete:CASCADE"`

	PermissionID uuid.UUID  `gorm:"type:uuid;primaryKey"`
	Permission   Permission `gorm:"foreignKey:PermissionID;constraint:OnDelete:CASCADE"`
}
