-- Run this in your database to create the required table.--

create DATABASE user_records;
USE user_records;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone BIGINT NOT NULL
);

--DUMMY VALUES TO INITIATE THE TABLE--

INSERT INTO users ( user_name, email, phone)
VALUES
('John Doe','john_doe@example.com', '0123456789'),
('Brock Lead', 'borck_lead@example.com', '9876543210');

