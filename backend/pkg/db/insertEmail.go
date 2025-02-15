package db

func (p *PostgresDB) InsertEmail(email string) error {
	query := "INSERT INTO signup_email (email) VALUES ($1)"
	_, err := p.db.Exec(query, email)
	return err
}
