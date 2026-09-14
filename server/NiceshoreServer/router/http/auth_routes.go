package http

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/logic/auth"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(api *gin.RouterGroup) {
	authGroup := api.Group("/auth")
	{
		authGroup.POST("signup", auth.Signup)
		authGroup.POST("login", auth.Login)
		authGroup.POST("refresh", auth.Refresh)
	}
}
