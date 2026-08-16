package models

type Beach struct {
	BaseModel
	ID          string `gorm:"primaryKey;not null"`
	Name        string
	Description string
	Country     string
	City        string
	Location    string
}
