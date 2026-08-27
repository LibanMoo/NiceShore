-- +goose Up
SELECT 'up SQL query';

create table beaches (
    id serial primary key,
    name varchar(255) not null,
    latitude varchar(255),
    longitude varchar(255),
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    created_by integer references users(id) on delete set null,
    updated_by integer references users(id) on delete set null
);

-- +goose Down
SELECT 'down SQL query';

drop table if exists beaches;
