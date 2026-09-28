package Controller

import (
	"net/http"

	"fmt"

	"os"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/config"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models/dto"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateBeach(c *gin.Context) {
	var request dto.BeachRequestDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	createdBy, err := uuid.Parse(request.CreatedBy)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid CreatedBy UUID",
		})
		return
	}

	updatedBy, err := uuid.Parse(request.UpdatedBy)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid UpdatedBy UUID",
		})
		return
	}

	beach := &models.Beach{
		Name:        request.Name,
		Description: request.Description,
		Longitude:   request.Longitude,
		Latitude:    request.Latitude,
		Status:      request.Status,
		ImageURL:    request.ImageURL,
		CreatedBy:   createdBy,
		UpdatedBy:   updatedBy,
	}

	if err := repository.CreateBeach(beach); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create beach",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"beach": beach,
	})
}

func GetBeachInfo(c *gin.Context) {

	fmt.Println("reached GetBeachInfo func")

	beachID := c.Param("id")

	id, err := uuid.Parse(beachID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid beach ID",
		})
		return
	}

	fmt.Println("Parsed beach ID:", id)

	beach, err := repository.GetBeach(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Beach not found",
		})
		return
	}

	fmt.Println("Retrieved beach:", beach)

	config.LoadEnv()

	worldTidesApiKey := os.Getenv("WORLD_TIDES_API_KEY")

	if worldTidesApiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "WorldTides API key is not configured",
		})
		return
	}

	fmt.Println("Beach latitude:", beach.Latitude)
	fmt.Println("Beach longitude:", beach.Longitude)
	fmt.Println("WorldTides key exists:", worldTidesApiKey != "")

	tides, err := services.GetTides(
		beach.Latitude,
		beach.Longitude,
		worldTidesApiKey,
	)

	if err != nil {
		fmt.Println("WorldTides error:", err)

		c.JSON(http.StatusBadGateway, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"beach": beach,
		"tides": tides,
	})
}

func GetAllBeaches(c *gin.Context) {

}
