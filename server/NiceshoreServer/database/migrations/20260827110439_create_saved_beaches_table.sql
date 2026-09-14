-- +goose Up

CREATE TABLE saved_beaches (
    user_id uuid NOT NULL,
    beach_id uuid NOT NULL,

    PRIMARY KEY (user_id, beach_id),

    CONSTRAINT fk_saved_beaches_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_saved_beaches_beach
        FOREIGN KEY (beach_id)
        REFERENCES beaches(id)
        ON DELETE CASCADE,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- +goose Down

DROP TABLE IF EXISTS saved_beaches;