-- +goose Up
SELECT 'up SQL query';

create table beaches (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    latitude varchar(255),
    longitude varchar(255),
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    created_by uuid references users(id) on delete set null,
    updated_by uuid references users(id) on delete set null
);

-- +goose Down
SELECT 'down SQL query';

drop table if exists beaches;
