-- Insert subdivision data
INSERT OR IGNORE INTO subdivision (name, division_id) VALUES
('Los Angeles County', (SELECT id FROM division WHERE name = 'California')),
('New York County', (SELECT id FROM division WHERE name = 'New York')),
('Harris County', (SELECT id FROM division WHERE name = 'Texas'));