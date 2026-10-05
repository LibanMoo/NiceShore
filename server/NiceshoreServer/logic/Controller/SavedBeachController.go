package Controller

import (
	"net/http"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models/dto"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func SaveBeach(c *gin.Context) {

	fmt.Println("reached save beach controller")

	var request dto.SaveBeachRequestDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID, err := uuid.Parse(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	beachID, err := uuid.Parse(request.BeachID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid beach ID",
		})
		return
	}

	// Check if already saved
	saved, err := repository.IsBeachSaved(userID, beachID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to check saved beach",
		})
		return
	}

	if saved {
		c.JSON(http.StatusConflict, gin.H{
			"error": "Beach is already saved",
		})
		return
	}

	savedBeach := &models.SavedBeach{
		UserID:  userID,
		BeachID: beachID,
	}

	if err := repository.SaveBeach(savedBeach); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save beach",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":     "Beach saved successfully",
		"saved_beach": savedBeach,
	})
}

func GetSavedBeaches(c *gin.Context) {

	userIDString := c.Param("userId")

	userID, err := uuid.Parse(userIDString)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	beaches, err := repository.GetSavedBeaches(userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve saved beaches",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"beaches": beaches,
	})
}

func RemoveSavedBeach(c *gin.Context) {

	userIDString := c.Param("userId")
	beachIDString := c.Param("beachId")

	userID, err := uuid.Parse(userIDString)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	beachID, err := uuid.Parse(beachIDString)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid beach ID",
		})
		return
	}

	err = repository.RemoveSavedBeach(userID, beachID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to remove saved beach",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Beach removed from saved beaches",
	})
}
