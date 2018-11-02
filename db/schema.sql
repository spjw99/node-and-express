DROP DATABASE IF EXISTS notes_db;
CREATE DATABASE notes_db;
USE notes_db;

-- Create the tables table
DROP TABLE IF EXISTS notes;
CREATE TABLE notes
(
  idx INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (255) NOT NULL,
  content text NOT NULL,
  search_ts INT (11) NOT NULL DEFAULT 0,
  del_flag VARCHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY(idx)
);

