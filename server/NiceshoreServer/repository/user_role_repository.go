package repository

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/google/uuid"
)

func CreateUserRole(userRole *models.UserRole) error {
	return postgres.DB.Create(userRole).Error
}

func GetUserRoleByID(id uuid.UUID) (*models.UserRole, error) {
	var userRole models.UserRole
	err := postgres.DB.First(&userRole, id).Error
	return &userRole, err
}

func UpdateUserRole(userRole *models.UserRole) error {
	return postgres.DB.Save(userRole).Error
}

func DeleteUserRole(id uuid.UUID) error {
	return postgres.DB.Delete(&models.UserRole{}, id).Error
}
