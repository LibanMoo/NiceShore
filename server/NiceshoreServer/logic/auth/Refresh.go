package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models/dto"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func Refresh(c *gin.Context) {

	var request dto.RefreshTokenRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	refreshRecord, err := repository.GetRefreshToken(request.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid refresh token",
		})
		return
	}

	if refreshRecord.ExpiresAt.Before(time.Now()) {
		repository.DeleteRefreshToken(request.RefreshToken)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Refresh token has expired",
		})
		return
	}

	claims, err := utils.ValidateRefreshToken(request.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid refresh token",
		})
		return
	}

	userIDstr := claims["user_id"].(string)

	userID, err := uuid.Parse(userIDstr)
	user, err := repository.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": fmt.Sprintf("User not found", user),
		})
		return
	}

	newAccessToken, err := utils.GenerateAccessToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate access token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": newAccessToken,
	})
}
