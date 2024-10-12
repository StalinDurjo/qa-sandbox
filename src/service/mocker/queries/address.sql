-- Insert address data
INSERT OR IGNORE INTO address (street_address, city, post_code, subdivision_id, division_id, country_alpha2) VALUES
('123 Hollywood Blvd', 'Los Angeles', '90001', 
 (SELECT id FROM subdivision WHERE name = 'Los Angeles County'),
 (SELECT id FROM division WHERE name = 'California'),
 'US'),
('456 Broadway', 'New York', '10001', 
 (SELECT id FROM subdivision WHERE name = 'New York County'),
 (SELECT id FROM division WHERE name = 'New York'),
 'US'),
('789 Main St', 'Houston', '77001', 
 (SELECT id FROM subdivision WHERE name = 'Harris County'),
 (SELECT id FROM division WHERE name = 'Texas'),
 'US');