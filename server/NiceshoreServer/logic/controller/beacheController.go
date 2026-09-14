package Controller

import (
	"net/http"

	"fmt"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models/dto"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateBeach(c *gin.Context) {
	var request dto.BeachRequestDTO
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}
	CreatedBy, err := uuid.Parse(request.CreatedBy)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid CreatedBy UUID",
		})
		return
	}
	UpdatedBy, err := uuid.Parse(request.UpdatedBy)
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
		CreatedBy:   CreatedBy,
		UpdatedBy:   UpdatedBy,
	}
	fmt.Println("Beach to be created:", beach)

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
