package cmd

import (
	"log"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/seeders"
	"gorm.io/gorm"
)

func Seed(db *gorm.DB) error {

	if err := seeders.SeedPermissions(db); err != nil {
		log.Fatal("Failed to seed permissions: ", err)
	}

	if err := seeders.SeedRoles(db); err != nil {
		log.Fatal("Failed to seed roles: ", err)
	}

	log.Println("Database seeding completed")
	return nil
}
