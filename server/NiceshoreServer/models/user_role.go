package models

import "github.com/google/uuid"

type UserRole struct {
	BaseModel

	UserID uuid.UUID `gorm:"type:uuid;primaryKey"`
	User   User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`

	RoleID uuid.UUID `gorm:"type:uuid;primaryKey"`
	Role   Role      `gorm:"foreignKey:RoleID;constraint:OnDelete:CASCADE"`
}
