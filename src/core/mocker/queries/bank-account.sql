-- Insert bank_account data
INSERT INTO bank_account (bank_id, account_type, currency, account_number, iban, routing_number, sort_code, bsb_number, is_primary) VALUES
((SELECT id FROM bank WHERE name = 'Bank of America'), 'Checking', 'USD', '1234567890', 'US29 NWBK 6016 3847 3947 47', '026009593', '495837', '383938', 1),
((SELECT id FROM bank WHERE name = 'Bank of America'), 'Savings', 'USD', '9876543210', 'US29 NWBK 6016 3647 3947 47', '026009593', '345434', '029283', 0),
((SELECT id FROM bank WHERE name = 'Wells Fargo'), 'Checking', 'USD', '2468135790', 'US29 NWBK 3949 3847 3947 47', '121000248', '746546', '484738', 1),
((SELECT id FROM bank WHERE name = 'JPMorgan Chase'), 'Checking', 'USD', '1357924680', 'US29 NWBK 2936 3847 3947 47', '021000021', '975753', '394849', 1),
((SELECT id FROM bank WHERE name = 'JPMorgan Chase'), 'Savings', 'USD', '8642097531', 'US29 NWBK 2937 3847 3947 47', '021000021', '235642', '474837', 0);