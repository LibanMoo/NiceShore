-- +goose Up
SELECT 'up SQL query';
create table countries (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    created_by uuid references users(id) on delete set null,
    updated_by uuid references users(id) on delete set null
);
-- +goose Down
SELECT 'down SQL query';
Drop table if exists countries;
