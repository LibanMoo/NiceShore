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

type TidePrediction struct {
	Direction      string    `json:"direction"`
	CurrentHeight  float64   `json:"current_height"`
	CurrentTime    time.Time `json:"current_time"`
	UpcomingHeight float64   `json:"upcoming_height"`
	UpcomingTime   time.Time `json:"upcoming_time"`
	Change         float64   `json:"change"`
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

func PredictTideDirection(
	tides *WorldTidesResponse,
	timezone string,
) (*TidePrediction, error) {

	if tides == nil || len(tides.Heights) < 2 {
		return nil, fmt.Errorf("not enough tide data")
	}

	loc, err := time.LoadLocation(timezone)
	if err != nil {
		return nil, fmt.Errorf("invalid timezone: %w", err)
	}

	now := time.Now().In(loc)

	// Find the latest tide measurement that has already happened.
	currentIndex := -1

	for i, height := range tides.Heights {
		tideTime := height.Date.Time.In(loc)

		if !tideTime.After(now) {
			currentIndex = i
		} else {
			break
		}
	}

	// We need a current measurement AND a future measurement.
	if currentIndex == -1 || currentIndex >= len(tides.Heights)-1 {
		return nil, fmt.Errorf("no upcoming tide data available")
	}

	current := tides.Heights[currentIndex]
	upcoming := tides.Heights[currentIndex+1]

	currentTime := current.Date.Time.In(loc)
	upcomingTime := upcoming.Date.Time.In(loc)

	change := upcoming.Height - current.Height

	// Difference in height.
	// Adjust this threshold depending on your WorldTides data interval.
	const slackThreshold = 0.03

	direction := "slack"

	if change > slackThreshold {
		direction = "rising"
	} else if change < -slackThreshold {
		direction = "falling"
	}

	return &TidePrediction{
		Direction:      direction,
		CurrentHeight:  current.Height,
		CurrentTime:    currentTime,
		UpcomingHeight: upcoming.Height,
		UpcomingTime:   upcomingTime,
		Change:         change,
	}, nil
}
