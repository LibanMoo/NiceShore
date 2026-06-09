package seeders

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"gorm.io/gorm"
)

func SeedRolePermissions(db *gorm.DB) error {
	// Define role-permission associations

	rolePermissions := map[string][]string{
		"user": {
			"create_report",
			"edit_own_report",
			"delete_own_report",
		},
		"moderator": {
			"edit_any_report",
			"delete_any_report",
		},
		"admin": {
			"create_report",
			"edit_own_report",
			"delete_own_report",
			"edit_any_report",
			"delete_any_report",
			"manage_users",
			"ban_users",
			"manage_roles",
			"manage_permissions",
		},
		"super_admin": {
			"create_report",
			"edit_own_report",
			"delete_own_report",
			"edit_any_report",
			"delete_any_report",
			"manage_users",
			"ban_users",
			"manage_roles",
			"manage_permissions",
		},
	}

	for role, permissions := range rolePermissions {

		var roleModel models.Role
		if err := db.Where("name = ?", role).First(&roleModel).Error; err != nil {
			return err
		}

		for _, permission := range permissions {

			var permissionModel models.Permission
			if err := db.Where("name = ?", permission).
				First(&permissionModel).Error; err != nil {
				return err
			}

			rolePermission := models.RolePermission{
				RoleID:       roleModel.ID,
				PermissionID: permissionModel.ID,
			}

			if err := db.
				Where(
					"role_id = ? AND permission_id = ?",
					roleModel.ID,
					permissionModel.ID,
				).
				FirstOrCreate(&rolePermission).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
