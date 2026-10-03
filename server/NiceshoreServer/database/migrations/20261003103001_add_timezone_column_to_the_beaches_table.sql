-- +goose Up
SELECT 'up SQL query';

alter table beaches add column timezone varchar(255);
-- +goose Down
alter table beaches drop column timezone;
SELECT 'down SQL query';
