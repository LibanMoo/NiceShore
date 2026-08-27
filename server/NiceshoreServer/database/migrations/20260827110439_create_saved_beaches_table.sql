-- +goose Up

CREATE TABLE saved_beaches (
    user_id integer NOT NULL,
    beach_id integer NOT NULL,

    PRIMARY KEY (user_id, beach_id),

    CONSTRAINT fk_saved_beaches_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_saved_beaches_beach
        FOREIGN KEY (beach_id)
        REFERENCES beaches(id)
        ON DELETE CASCADE
);

-- +goose Down

DROP TABLE IF EXISTS saved_beaches;