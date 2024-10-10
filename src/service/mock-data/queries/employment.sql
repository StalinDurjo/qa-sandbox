-- Insert employment data
INSERT INTO employment (user_id, company, job_title, occcupation, start_date, end_date, is_current_job) VALUES
((SELECT id FROM person WHERE email = 'john.doe@example.com'), 'Tech Innovations Inc.', 'Senior Software Engineer', 'Software Developer', '2018-05-01', '2024-05-01', 1),
((SELECT id FROM person WHERE email = 'jane.smith@example.com'), 'Global Marketing Group', 'Marketing Manager', 'Marketing Professional', '2019-03-15', '2020-10-01', 1),
((SELECT id FROM person WHERE email = 'jane.smith@example.com'), 'Local Ad Agency', 'Junior Marketing Associate', 'Marketing Professional', '2015-09-01', '2019-03-14', 0),
((SELECT id FROM person WHERE email = 'michael.johnson@example.com'), 'City Hospital', 'Head Nurse', 'Registered Nurse', '2010-12-01', NULL, 1);