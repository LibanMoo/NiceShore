-- +goose Up

ALTER TABLE saved_beaches
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- +goose Down

ALTER TABLE saved_beaches
DROP COLUMN created_at,
DROP COLUMN updated_at;