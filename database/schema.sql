DROP DATABASE IF EXISTS grade_tracker;

CREATE DATABASE grade_tracker;

USE grade_tracker;

CREATE TABLE courses (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE assignments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  weight INT NOT NULL,
  grade INT,
  course_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

--
-- INSERT INTO courses (id, name) VALUES (1, "Biology 101");
-- INSERT INTO courses (id, name) VALUES (2, "Spanish 101");
--
-- INSERT INTO assignments (id, name, weight, course_id) VALUES (1, "Final Paper", 20, 1);
-- INSERT INTO assignments (id, name, weight, course_id) VALUES (2, "Midterm Exam", 15, 1);
-- INSERT INTO assignments (id, name, weight, course_id) VALUES (3, "Disect frog", 65, 1);
-- INSERT INTO assignments (id, name, weight, course_id) VALUES (4, "Diga hola", 50, 2);
-- INSERT INTO assignments (id, name, weight, course_id) VALUES (5, "Pop quiz", 50, 2);
