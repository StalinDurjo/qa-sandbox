-- Insert person data
INSERT INTO person (first_name, last_name, email, phone_number, country_alpha2, nationality, ssn, date_of_birth, age, height_cm, weight_kg, blood_type, eye_color, hair_color, gender) VALUES
('John', 'Doe', 'john.doe@example.com', '+1-555-123-4567', (SELECT alpha2 FROM country WHERE name = 'United States'), 'USA', '123-45-6789', '1985-03-15', 39, 180.34, 80.5, 'A+', 'Brown', 'Black', 'male'),
('Jane', 'Smith', 'jane.smith@example.com', '+1-555-987-6543', (SELECT alpha2 FROM country WHERE name = 'United States'), 'USA', '987-65-4321', '1990-07-22', 34, 165.1, 60.2, 'O-', 'Blue', 'Blonde', 'female'),
('Michael', 'Johnson', 'michael.johnson@example.com', '+1-555-246-8135', (SELECT alpha2 FROM country WHERE name = 'United States'), 'USA', '456-78-9012', '1978-11-30', 46, 175.5, 75.0, 'B+', 'Green', 'Brown', 'male');
