package repository

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
)

func CreateUser(user *models.User) error {
	return postgres.DB.Create(user).Error
}

func GetUserByEmail(email string) (*models.User, error) {
	var user models.User

	err := postgres.DB.Where("email = ?", email).First(&user).Error

	if err != nil {
		return nil, err
	}
	return &user, nil
}
