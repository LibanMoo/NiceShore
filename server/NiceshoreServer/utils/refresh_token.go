package utils

import (
	"log"
	"os"
	"time"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/models"
	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func GenerateRefreshToken(userID uuid.UUID) (string, error) {
	refreshTokenTime := time.Now().Add(time.Hour * 24 * 30) // 30 days
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     refreshTokenTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	log.Printf("Generating refresh token for user ID: %s", userID)

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET_KEY")))
	if err != nil {
		return "", err
	}

	// Store the refresh token in the database
	refreshToken := &models.RefreshToken{
		Token:     tokenString,
		UserID:    userID,
		ExpiresAt: refreshTokenTime,
	}
	err = repository.CreateRefreshToken(refreshToken)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
