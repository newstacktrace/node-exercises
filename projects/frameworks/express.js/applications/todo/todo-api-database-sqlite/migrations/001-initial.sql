-- Reference: https://github.com/kriasoft/node-sqlite/tree/master/migrations
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE todo (
    id INTEGER PRIMARY KEY,
    todo VARCHAR,
    completed BOOLEAN NOT NULL CHECK (completed IN (0,1)),
    user_id INTEGER
);
INSERT INTO todo VALUES ( 1, "Do something nice for someone I care about", 0, 1);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE todo;