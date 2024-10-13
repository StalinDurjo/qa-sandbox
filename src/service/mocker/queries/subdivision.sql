-- Insert subdivision data
INSERT OR IGNORE INTO subdivision (name, division_id) VALUES
-- United States
('Los Angeles County', (SELECT id FROM division WHERE name = 'California')),
('Orange County', (SELECT id FROM division WHERE name = 'California')),
('San Diego County', (SELECT id FROM division WHERE name = 'California')),
('San Francisco County', (SELECT id FROM division WHERE name = 'California')),
('Santa Clara County', (SELECT id FROM division WHERE name = 'California')),

('New York County', (SELECT id FROM division WHERE name = 'New York')),
('Kings County', (SELECT id FROM division WHERE name = 'New York')),
('Queens County', (SELECT id FROM division WHERE name = 'New York')),
('Bronx County', (SELECT id FROM division WHERE name = 'New York')),
('Richmond County', (SELECT id FROM division WHERE name = 'New York')),

-- Canada
('Toronto', (SELECT id FROM division WHERE name = 'Ontario')),
('Ottawa', (SELECT id FROM division WHERE name = 'Ontario')),
('Hamilton', (SELECT id FROM division WHERE name = 'Ontario')),
('Kitchener', (SELECT id FROM division WHERE name = 'Ontario')),
('London', (SELECT id FROM division WHERE name = 'Ontario')),

('Montreal', (SELECT id FROM division WHERE name = 'Quebec')),
('Quebec City', (SELECT id FROM division WHERE name = 'Quebec')),
('Laval', (SELECT id FROM division WHERE name = 'Quebec')),
('Gatineau', (SELECT id FROM division WHERE name = 'Quebec')),
('Longueuil', (SELECT id FROM division WHERE name = 'Quebec')),

-- France
('Paris', (SELECT id FROM division WHERE name = 'Île-de-France')),
('Boulogne-Billancourt', (SELECT id FROM division WHERE name = 'Île-de-France')),
('Saint-Denis', (SELECT id FROM division WHERE name = 'Île-de-France')),
('Versailles', (SELECT id FROM division WHERE name = 'Île-de-France')),
('Argenteuil', (SELECT id FROM division WHERE name = 'Île-de-France')),

('Marseille', (SELECT id FROM division WHERE name = 'Provence-Alpes-Côte d''Azur')),
('Nice', (SELECT id FROM division WHERE name = 'Provence-Alpes-Côte d''Azur')),
('Toulon', (SELECT id FROM division WHERE name = 'Provence-Alpes-Côte d''Azur')),
('Aix-en-Provence', (SELECT id FROM division WHERE name = 'Provence-Alpes-Côte d''Azur')),
('Avignon', (SELECT id FROM division WHERE name = 'Provence-Alpes-Côte d''Azur')),

-- United Kingdom
('Greater London', (SELECT id FROM division WHERE name = 'England')),
('Birmingham', (SELECT id FROM division WHERE name = 'England')),
('Manchester', (SELECT id FROM division WHERE name = 'England')),
('Leeds', (SELECT id FROM division WHERE name = 'England')),
('Liverpool', (SELECT id FROM division WHERE name = 'England')),

('Glasgow', (SELECT id FROM division WHERE name = 'Scotland')),
('Edinburgh', (SELECT id FROM division WHERE name = 'Scotland')),
('Aberdeen', (SELECT id FROM division WHERE name = 'Scotland')),
('Dundee', (SELECT id FROM division WHERE name = 'Scotland')),
('Inverness', (SELECT id FROM division WHERE name = 'Scotland')),

-- India
('Mumbai', (SELECT id FROM division WHERE name = 'Maharashtra')),
('Pune', (SELECT id FROM division WHERE name = 'Maharashtra')),
('Nagpur', (SELECT id FROM division WHERE name = 'Maharashtra')),
('Nashik', (SELECT id FROM division WHERE name = 'Maharashtra')),
('Aurangabad', (SELECT id FROM division WHERE name = 'Maharashtra')),

('New Delhi', (SELECT id FROM division WHERE name = 'Delhi')),
('North Delhi', (SELECT id FROM division WHERE name = 'Delhi')),
('South Delhi', (SELECT id FROM division WHERE name = 'Delhi')),
('East Delhi', (SELECT id FROM division WHERE name = 'Delhi')),
('West Delhi', (SELECT id FROM division WHERE name = 'Delhi')),

-- Bangladesh
('Dhaka City', (SELECT id FROM division WHERE name = 'Dhaka')),
('Gazipur', (SELECT id FROM division WHERE name = 'Dhaka')),
('Narayanganj', (SELECT id FROM division WHERE name = 'Dhaka')),
('Tangail', (SELECT id FROM division WHERE name = 'Dhaka')),
('Faridpur', (SELECT id FROM division WHERE name = 'Dhaka')),

('Chittagong City', (SELECT id FROM division WHERE name = 'Chittagong')),
('Cox''s Bazar', (SELECT id FROM division WHERE name = 'Chittagong')),
('Comilla', (SELECT id FROM division WHERE name = 'Chittagong')),
('Chandpur', (SELECT id FROM division WHERE name = 'Chittagong')),
('Rangamati', (SELECT id FROM division WHERE name = 'Chittagong')),

-- Saudi Arabia
('Riyadh', (SELECT id FROM division WHERE name = 'Riyadh Region')),
('Al-Kharj', (SELECT id FROM division WHERE name = 'Riyadh Region')),
('Ad-Diriyah', (SELECT id FROM division WHERE name = 'Riyadh Region')),
('Al-Majma''ah', (SELECT id FROM division WHERE name = 'Riyadh Region')),
('Ad-Dawadimi', (SELECT id FROM division WHERE name = 'Riyadh Region')),

('Mecca', (SELECT id FROM division WHERE name = 'Makkah Region')),
('Jeddah', (SELECT id FROM division WHERE name = 'Makkah Region')),
('Taif', (SELECT id FROM division WHERE name = 'Makkah Region')),
('Yanbu', (SELECT id FROM division WHERE name = 'Makkah Region')),
('Rabigh', (SELECT id FROM division WHERE name = 'Makkah Region')),

-- Japan
('Shinjuku', (SELECT id FROM division WHERE name = 'Tokyo')),
('Shibuya', (SELECT id FROM division WHERE name = 'Tokyo')),
('Minato', (SELECT id FROM division WHERE name = 'Tokyo')),
('Chiyoda', (SELECT id FROM division WHERE name = 'Tokyo')),
('Chuo', (SELECT id FROM division WHERE name = 'Tokyo')),

('Osaka City', (SELECT id FROM division WHERE name = 'Osaka')),
('Sakai', (SELECT id FROM division WHERE name = 'Osaka')),
('Higashiosaka', (SELECT id FROM division WHERE name = 'Osaka')),
('Takatsuki', (SELECT id FROM division WHERE name = 'Osaka')),
('Ibaraki', (SELECT id FROM division WHERE name = 'Osaka'));