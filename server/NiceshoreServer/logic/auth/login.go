package auth

import (
	"net/http"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models/dto"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/utils"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {

	var request dto.LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	user, err := repository.GetUserByEmail(request.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	valid := utils.CheckPasswordHash(request.Password, user.Password)
	if !valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid password",
		})
		return
	}

	accessToken, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate access token",
		})
		return
	}

	refreshToken, err := utils.GenerateRefreshToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate refresh token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"user_id":       user.ID,
	})

}
