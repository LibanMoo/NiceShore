package repository

import (
	"errors"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SaveBeach(savedBeach *models.SavedBeach) error {
	return postgres.DB.Create(savedBeach).Error
}

func IsBeachSaved(userID, beachID uuid.UUID) (bool, error) {
	var savedBeach models.SavedBeach

	err := postgres.DB.
		Where("user_id = ? AND beach_id = ?", userID, beachID).
		First(&savedBeach).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, nil
	}

	if err != nil {
		return false, err
	}

	return true, nil
}

func GetSavedBeaches(userID uuid.UUID) ([]models.Beach, error) {
	var beaches []models.Beach

	err := postgres.DB.
		Table("beaches").
		Joins("JOIN saved_beaches ON saved_beaches.beach_id = beaches.id").
		Where("saved_beaches.user_id = ?", userID).
		Find(&beaches).Error

	return beaches, err
}

func RemoveSavedBeach(userID, beachID uuid.UUID) error {
	return postgres.DB.
		Where("user_id = ? AND beach_id = ?", userID, beachID).
		Delete(&models.SavedBeach{}).Error
}
