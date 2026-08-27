package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/LibanMoo/NiceShore/server/NiceshoreServer/config"
	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)

func main() {
	config.LoadEnv()

	dbString := os.Getenv("GOOSE_DBSTRING")

	if dbString == "" {
		log.Fatal("GOOSE_DBSTRING is not set")
	}

	db, err := sql.Open("postgres", dbString)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	if err := goose.SetDialect("postgres"); err != nil {
		log.Fatal(err)
	}

	if err := goose.Up(db, "./database/migrations"); err != nil {
		log.Fatal(err)
	}
}
