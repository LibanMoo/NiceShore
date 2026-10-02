-- +goose Up
SELECT 'up SQL query';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
create table users (
    id uuid primary key default gen_random_uuid(),
    full_name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    dob date,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);  
-- +goose Down
SELECT 'down SQL query';
drop table if exists users;
