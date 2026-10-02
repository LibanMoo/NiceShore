-- +goose Up

ALTER TABLE beaches
ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'open';

-- +goose Down

ALTER TABLE beaches
DROP COLUMN status;