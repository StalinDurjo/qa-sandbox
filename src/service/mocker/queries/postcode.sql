-- Insert post_code data
INSERT OR IGNORE INTO post_code (code, subdivision_id) VALUES
-- United States
('90001', (SELECT id FROM subdivision WHERE name = 'Los Angeles County')),
('92656', (SELECT id FROM subdivision WHERE name = 'Orange County')),
('92101', (SELECT id FROM subdivision WHERE name = 'San Diego County')),
('94102', (SELECT id FROM subdivision WHERE name = 'San Francisco County')),
('95050', (SELECT id FROM subdivision WHERE name = 'Santa Clara County')),

('10001', (SELECT id FROM subdivision WHERE name = 'New York County')),
('11201', (SELECT id FROM subdivision WHERE name = 'Kings County')),
('11101', (SELECT id FROM subdivision WHERE name = 'Queens County')),
('10451', (SELECT id FROM subdivision WHERE name = 'Bronx County')),
('10301', (SELECT id FROM subdivision WHERE name = 'Richmond County')),

-- Canada
('M5H', (SELECT id FROM subdivision WHERE name = 'Toronto')),
('K1P', (SELECT id FROM subdivision WHERE name = 'Ottawa')),
('L8P', (SELECT id FROM subdivision WHERE name = 'Hamilton')),
('N2G', (SELECT id FROM subdivision WHERE name = 'Kitchener')),
('N6A', (SELECT id FROM subdivision WHERE name = 'London')),

('H2X', (SELECT id FROM subdivision WHERE name = 'Montreal')),
('G1R', (SELECT id FROM subdivision WHERE name = 'Quebec City')),
('H7V', (SELECT id FROM subdivision WHERE name = 'Laval')),
('J8X', (SELECT id FROM subdivision WHERE name = 'Gatineau')),
('J4K', (SELECT id FROM subdivision WHERE name = 'Longueuil')),

-- France
('75001', (SELECT id FROM subdivision WHERE name = 'Paris')),
('92100', (SELECT id FROM subdivision WHERE name = 'Boulogne-Billancourt')),
('93200', (SELECT id FROM subdivision WHERE name = 'Saint-Denis')),
('78000', (SELECT id FROM subdivision WHERE name = 'Versailles')),
('95100', (SELECT id FROM subdivision WHERE name = 'Argenteuil')),

('13001', (SELECT id FROM subdivision WHERE name = 'Marseille')),
('06000', (SELECT id FROM subdivision WHERE name = 'Nice')),
('83000', (SELECT id FROM subdivision WHERE name = 'Toulon')),
('13100', (SELECT id FROM subdivision WHERE name = 'Aix-en-Provence')),
('84000', (SELECT id FROM subdivision WHERE name = 'Avignon')),

-- United Kingdom
('SW1A', (SELECT id FROM subdivision WHERE name = 'Greater London')),
('B1', (SELECT id FROM subdivision WHERE name = 'Birmingham')),
('M1', (SELECT id FROM subdivision WHERE name = 'Manchester')),
('LS1', (SELECT id FROM subdivision WHERE name = 'Leeds')),
('L1', (SELECT id FROM subdivision WHERE name = 'Liverpool')),

('G1', (SELECT id FROM subdivision WHERE name = 'Glasgow')),
('EH1', (SELECT id FROM subdivision WHERE name = 'Edinburgh')),
('AB10', (SELECT id FROM subdivision WHERE name = 'Aberdeen')),
('DD1', (SELECT id FROM subdivision WHERE name = 'Dundee')),
('IV1', (SELECT id FROM subdivision WHERE name = 'Inverness')),

-- India
('400001', (SELECT id FROM subdivision WHERE name = 'Mumbai')),
('411001', (SELECT id FROM subdivision WHERE name = 'Pune')),
('440001', (SELECT id FROM subdivision WHERE name = 'Nagpur')),
('422001', (SELECT id FROM subdivision WHERE name = 'Nashik')),
('431001', (SELECT id FROM subdivision WHERE name = 'Aurangabad')),

('110001', (SELECT id FROM subdivision WHERE name = 'New Delhi')),
('110084', (SELECT id FROM subdivision WHERE name = 'North Delhi')),
('110062', (SELECT id FROM subdivision WHERE name = 'South Delhi')),
('110092', (SELECT id FROM subdivision WHERE name = 'East Delhi')),
('110015', (SELECT id FROM subdivision WHERE name = 'West Delhi')),

-- Bangladesh
('1000', (SELECT id FROM subdivision WHERE name = 'Dhaka City')),
('1700', (SELECT id FROM subdivision WHERE name = 'Gazipur')),
('1400', (SELECT id FROM subdivision WHERE name = 'Narayanganj')),
('1900', (SELECT id FROM subdivision WHERE name = 'Tangail')),
('7800', (SELECT id FROM subdivision WHERE name = 'Faridpur')),

('4000', (SELECT id FROM subdivision WHERE name = 'Chittagong City')),
('4700', (SELECT id FROM subdivision WHERE name = 'Cox''s Bazar')),
('3500', (SELECT id FROM subdivision WHERE name = 'Comilla')),
('3600', (SELECT id FROM subdivision WHERE name = 'Chandpur')),
('4500', (SELECT id FROM subdivision WHERE name = 'Rangamati')),

-- Saudi Arabia
('12611', (SELECT id FROM subdivision WHERE name = 'Riyadh')),
('16278', (SELECT id FROM subdivision WHERE name = 'Al-Kharj')),
('11911', (SELECT id FROM subdivision WHERE name = 'Ad-Diriyah')),
('11952', (SELECT id FROM subdivision WHERE name = 'Al-Majma''ah')),
('11911', (SELECT id FROM subdivision WHERE name = 'Ad-Dawadimi')),

('24231', (SELECT id FROM subdivision WHERE name = 'Mecca')),
('23511', (SELECT id FROM subdivision WHERE name = 'Jeddah')),
('26513', (SELECT id FROM subdivision WHERE name = 'Taif')),
('41912', (SELECT id FROM subdivision WHERE name = 'Yanbu')),
('21911', (SELECT id FROM subdivision WHERE name = 'Rabigh')),

-- Japan
('160-0022', (SELECT id FROM subdivision WHERE name = 'Shinjuku')),
('150-8010', (SELECT id FROM subdivision WHERE name = 'Shibuya')),
('105-8511', (SELECT id FROM subdivision WHERE name = 'Minato')),
('100-8111', (SELECT id FROM subdivision WHERE name = 'Chiyoda')),
('104-8301', (SELECT id FROM subdivision WHERE name = 'Chuo')),

('540-8570', (SELECT id FROM subdivision WHERE name = 'Osaka City')),
('590-0078', (SELECT id FROM subdivision WHERE name = 'Sakai')),
('577-8521', (SELECT id FROM subdivision WHERE name = 'Higashiosaka')),
('569-0067', (SELECT id FROM subdivision WHERE name = 'Takatsuki')),
('567-8505', (SELECT id FROM subdivision WHERE name = 'Ibaraki'));