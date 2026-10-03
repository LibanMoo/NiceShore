package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type WorldTidesResponse struct {
	Status int    `json:"status"`
	Error  string `json:"error"`

	Heights []struct {
		Date   WorldTidesTime `json:"date"`
		Height float64        `json:"height"`
	} `json:"heights"`

	Extremes []struct {
		Date   WorldTidesTime `json:"date"`
		Height float64        `json:"height"`
		Type   string         `json:"type"`
	} `json:"extremes"`
}

type WorldTidesTime struct {
	time.Time
}

func (t *WorldTidesTime) UnmarshalJSON(data []byte) error {
	value := strings.Trim(string(data), `"`)

	formats := []string{
		time.RFC3339,
		"2006-01-02T15:04-0700",
	}

	for _, format := range formats {
		parsed, err := time.Parse(format, value)
		if err == nil {
			t.Time = parsed
			return nil
		}
	}

	return fmt.Errorf("invalid WorldTides date: %s", value)
}

type CurrentTideResponse struct {
	Date   time.Time `json:"date"`
	Height float64   `json:"height"`
}

func GetTides(latitude, longitude, apiKey string) (*WorldTidesResponse, error) {

	params := url.Values{}

	params.Set("heights", "")
	params.Set("extremes", "")
	params.Set("lat", latitude)
	params.Set("lon", longitude)
	params.Set("datum", "CD")
	params.Set("key", apiKey)

	apiURL := "https://www.worldtides.info/api/v3?" + params.Encode()

	resp, err := http.Get(apiURL)
	if err != nil {
		return nil, fmt.Errorf(
			"failed to call WorldTides: %w",
			err,
		)
	}

	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf(
			"WorldTides HTTP error: %d",
			resp.StatusCode,
		)
	}

	var data WorldTidesResponse

	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf(
			"failed to decode WorldTides response: %w",
			err,
		)
	}

	if data.Status != 200 {
		return nil, fmt.Errorf(
			"WorldTides API error: %s",
			data.Error,
		)
	}

	return &data, nil
}

func GetCurrentTide(tides *WorldTidesResponse, timezone string) (*CurrentTideResponse, error) {
	if tides == nil || len(tides.Heights) == 0 {
		return nil, fmt.Errorf("no tide heights available")
	}
	loc, err := time.LoadLocation(timezone)
	if err != nil {
		return nil, fmt.Errorf("invalid timezone: %w", err)
	}

	// Get the current time in the beach's timezone.
	now := time.Now().In(loc)

	closestHeight := tides.Heights[0]
	smallestDifference := now.Sub(closestHeight.Date.Time).Abs()

	for _, height := range tides.Heights[1:] {
		difference := now.Sub(height.Date.Time).Abs()

		if difference < smallestDifference {
			smallestDifference = difference
			closestHeight = height
		}
	}

	return &CurrentTideResponse{
		Date:   closestHeight.Date.Time.In(loc),
		Height: closestHeight.Height,
	}, nil
}
