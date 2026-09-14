package repository

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/google/uuid"
)

func CreateBeach(beach *models.Beach) error {
	return postgres.DB.Create(beach).Error
}

func GetBeachByID(id uuid.UUID) (*models.Beach, error) {
	var beach models.Beach
	if err := postgres.DB.First(&beach, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &beach, nil
}
