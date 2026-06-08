package auth

import (
	"net/http"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/database/postgres"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/utils"
	"github.com/gin-gonic/gin"
)

type SignupRequest struct {
	Username string
	Email    string
	Password string
}

func Signup(c *gin.Context) {

	var request SignupRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Check if the email is already registered
	existingUser, _ := repository.GetUserByEmail(request.Email)

	if existingUser != nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": "Email is already registered",
		})
		return
	}

	hashedPassword, err := utils.HashPassword(request.Password)
	if err != nil {
		return
	}

	user := models.User{
		Username: request.Username,
		Email:    request.Email,
		Password: hashedPassword,
	}

	err = repository.CreateUser(&user)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create User",
		})
		return
	}
	postgres.DBconn()

	db := postgres.DB

	err = utils.AssignRole(db, user.ID, "user")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to assign default role",
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

	accessToken, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate access token",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":       "user created sucessfully",
		"user_id":       user.ID,
		"refresh_token": refreshToken,
		"access_token":  accessToken,
	})
}
