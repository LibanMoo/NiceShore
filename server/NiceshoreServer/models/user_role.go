package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRole struct {
	BaseModel

	UserID uuid.UUID `gorm:"type:uuid;primaryKey"`
	User   User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`

	RoleID uuid.UUID `gorm:"type:uuid;primaryKey"`
	Role   Role      `gorm:"foreignKey:RoleID;constraint:OnDelete:CASCADE"`
}

func GetRoleIDByName(db *gorm.DB, roleName string) (uuid.UUID, error) {
	var role Role

	err := db.Where("name = ?", roleName).First(&role).Error
	if err != nil {
		return uuid.Nil, err
	}

	return role.ID, nil
}
