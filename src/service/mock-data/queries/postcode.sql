-- Insert post_code data
INSERT OR IGNORE INTO post_code (code, subdivision_id) VALUES
('90001', (SELECT id FROM subdivision WHERE name = 'Los Angeles County')),
('10001', (SELECT id FROM subdivision WHERE name = 'New York County')),
('77001', (SELECT id FROM subdivision WHERE name = 'Harris County'));