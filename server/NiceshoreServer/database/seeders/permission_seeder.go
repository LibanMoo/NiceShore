package seeders

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"gorm.io/gorm"
)

func SeedPermissions(db *gorm.DB) error {
	permissions := []models.Permission{
		{Name: "create_report"},
		{Name: "edit_own_report"},
		{Name: "delete_own_report"},
		{Name: "edit_any_report"},
		{Name: "delete_any_report"},
		{Name: "manage_users"},
		{Name: "ban_users"},
		{Name: "manage_roles"},
		{Name: "manage_permissions"},
	}

	for _, permission := range permissions {

		postgres.DB.Where("name = ?", permission.Name).FirstOrCreate(&permission)
	}
	return nil
}
