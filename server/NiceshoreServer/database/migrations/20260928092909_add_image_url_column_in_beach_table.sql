-- +goose Up
SELECT 'up SQL query';

alter table beaches add column image_url varchar(255);
-- +goose Down
ALTER TABLE beaches DROP COLUMN image_url;
