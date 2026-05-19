package main

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/config"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	postgres.DBconn()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Beach safe API is running succefully",
		})
	})

	r.Run(":8080")
}
