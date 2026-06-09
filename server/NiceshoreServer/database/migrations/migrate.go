package migrations

import (
	"log"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
)

func Migrate() {
	err := postgres.DB.AutoMigrate(
		&models.User{},
		&models.Role{},
		&models.Permission{},
		&models.UserRole{},
		&models.RolePermission{},
		&models.RefreshToken{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}

	log.Println("Database successfully migrated")
}
