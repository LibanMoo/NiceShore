package http

import (
	"fmt"

	Controller "github.com/LibanMoo/NiceShore/server/NiceshoreServer/logic/Controller"
	"github.com/gin-gonic/gin"
)

func SavedBeachRoutes(api *gin.RouterGroup) {
	fmt.Println("reached saved beach routes")
	savedBeachGroup := api.Group("/saved-beaches")
	{
		savedBeachGroup.POST("/create", Controller.SaveBeach)
		savedBeachGroup.GET("/:userId", Controller.GetSavedBeaches)
		savedBeachGroup.DELETE("/:userId/:beachId", Controller.RemoveSavedBeach)
	}
}
