package main

import (
	"log"
	"os"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/config"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/console/cmd"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/migrations"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/router/http"

	// "github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres/migrations"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	postgres.DBconn()
	migrations.Migrate()

	// Handle seed command
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		if err := cmd.Seed(postgres.DB); err != nil {
			log.Fatal(err)
		}
		return
	}

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Beach safe API is running succefully",
		})
	})
	http.AuthRoutes(r)
	r.Run(":8080")
}
