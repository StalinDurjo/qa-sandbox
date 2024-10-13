-- Insert bank data
INSERT INTO bank (name, swift_code, bic, country_alpha2) VALUES
('Bank of America', 'BOFAUS3NXXX', 'BOFAUS3N', (SELECT alpha2 FROM country WHERE name = 'United States')),
('Wells Fargo', 'WFBIUS6SXXX', 'WFBIUS6S', (SELECT alpha2 FROM country WHERE name = 'United States')),
('JPMorgan Chase', 'CHASUS33XXX', 'CHASUS33', (SELECT alpha2 FROM country WHERE name = 'United States'));