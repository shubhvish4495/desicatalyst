CREATE TABLE IF NOT EXISTS signup_email (
                                            id SERIAL PRIMARY KEY,
                                            email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
