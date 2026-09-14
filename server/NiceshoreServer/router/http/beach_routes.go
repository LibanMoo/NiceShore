package http

import (
	"log"

	Controller "github.com/LibanMoo/NiceShore/server/NiceshoreServer/logic/controller"
	"github.com/gin-gonic/gin"
)

func BeachRoutes(api *gin.RouterGroup) {
	log.Println("reached beach routes")
	BeachGroup := api.Group("/beaches")
	{
		BeachGroup.POST("/create", Controller.CreateBeach)
	}

}
