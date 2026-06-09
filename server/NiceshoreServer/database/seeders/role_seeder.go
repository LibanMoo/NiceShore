package seeders

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"gorm.io/gorm"
)

func SeedRoles(db *gorm.DB) error {
	roles := []models.Role{
		{Name: "user"},
		{Name: "moderator"},
		{Name: "admin"},
		{Name: "super_admin"},
	}

	for _, role := range roles {
		postgres.DB.Where("name = ?", role.Name).FirstOrCreate(&role)
	}
	return nil
}
