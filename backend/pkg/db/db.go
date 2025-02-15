package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var Instance DB

type DB interface {
	Ping() error
	PingContext(ctx context.Context) error
	InsertEmail(email string) error
}

type PostgresDB struct {
	db *sql.DB
}

func (p *PostgresDB) Ping() error {
	return p.db.Ping()
}

func (p *PostgresDB) PingContext(ctx context.Context) error {
	return p.db.PingContext(ctx)
}

func connectDB(connStr string) (*PostgresDB, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}
	return &PostgresDB{db: db}, nil
}

func getConnStr() string {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	return fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", user, password, host, dbName)
}

func InitDB() error {
	var err error
	connStr := getConnStr()
	fmt.Printf("connStr: %s\n", connStr)
	Instance, err = connectDB(connStr)
	return err
}
