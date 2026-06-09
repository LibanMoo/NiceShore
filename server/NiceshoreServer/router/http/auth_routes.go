package http

import (
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/logic/auth"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/api/auth")
	{
		authGroup.POST("signup", auth.Signup)
		authGroup.POST("login", auth.Login)
	}
}
