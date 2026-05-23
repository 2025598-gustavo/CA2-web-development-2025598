CREATE DATABASE dublin_dog_walkers;

USE dublin_dog_walkers;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO 
products (name, description, price) 
VALUES
('30 Minute Walk', 'Perfect for quick daily exercise.', 10.00),
('1 Hour Walk', 'Longer walk for energetic dogs.', 18.00),
('Group Walk', 'Social walks with other dogs.', 15.00),
('Pet Sitting', 'Care for your dog while you are away.', 45.00);