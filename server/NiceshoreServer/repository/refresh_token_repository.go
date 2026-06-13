package repository

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
)

func CreateRefreshToken(token *models.RefreshToken) error {
	return postgres.DB.Create(token).Error
}

func GetRefreshToken(token string) (*models.RefreshToken, error) {
	var refreshToken models.RefreshToken
	if err := postgres.DB.Where("token = ?", token).First(&refreshToken).Error; err != nil {
		return nil, err
	}
	return &refreshToken, nil
}

func DeleteRefreshToken(token string) error {
	return postgres.DB.Where("token = ?", token).Delete(&models.RefreshToken{}).Error
}
