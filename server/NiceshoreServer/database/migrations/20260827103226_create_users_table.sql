-- +goose Up
SELECT 'up SQL query';

create table users (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);  
-- +goose Down
SELECT 'down SQL query';
drop table if exists users;
