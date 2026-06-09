package utils

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func AssignRole(db *gorm.DB, userID uuid.UUID, roleName string) error {
	roleID, err := models.GetRoleIDByName(db, roleName)
	if err != nil {
		return err
	}

	defaultRole := &models.UserRole{
		RoleID: roleID,
		UserID: userID,
	}

	return db.Create(defaultRole).Error
}
