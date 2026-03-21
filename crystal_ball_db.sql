-- SQL schema for Crystal Ball application


-- CREATE TABLE users (
--     id int PRIMARY KEY,
--     username varchar(255) NOT NULL,
-- );

create table messages (
  id int primary key,
  board_id int not null references boards (id),
  content text not null,
  created_at timestamp not null default CURRENT_TIMESTAMP
);

-- v01: Boards table to store different discussion boards 
-- v01: messages are linked to boards with a 1-to-many relationship (one board can have many messages)
-- v01: ommitted a foreign key to link the board to the user who created it
create table boards (
  id int primary key,
  name varchar(255) not null,
  description text not null,
  created_at timestamp not null default CURRENT_TIMESTAMP
);