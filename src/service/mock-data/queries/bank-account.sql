-- Insert bank_account data
INSERT INTO bank_account (user_id, bank_id, account_type, currency, account_number, routing_number, is_primary) VALUES
((SELECT id FROM person WHERE email = 'john.doe@example.com'), (SELECT id FROM bank WHERE name = 'Bank of America'), 'Checking', 'USD', '1234567890', '026009593', 1),
((SELECT id FROM person WHERE email = 'john.doe@example.com'), (SELECT id FROM bank WHERE name = 'Bank of America'), 'Savings', 'USD', '9876543210', '026009593', 0),
((SELECT id FROM person WHERE email = 'jane.smith@example.com'), (SELECT id FROM bank WHERE name = 'Wells Fargo'), 'Checking', 'USD', '2468135790', '121000248', 1),
((SELECT id FROM person WHERE email = 'michael.johnson@example.com'), (SELECT id FROM bank WHERE name = 'JPMorgan Chase'), 'Checking', 'USD', '1357924680', '021000021', 1),
((SELECT id FROM person WHERE email = 'michael.johnson@example.com'), (SELECT id FROM bank WHERE name = 'JPMorgan Chase'), 'Savings', 'USD', '8642097531', '021000021', 0);