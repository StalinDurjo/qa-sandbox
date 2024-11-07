SELECT * FROM country;
SELECT * FROM division;
SELECT * FROM subdivision;
SELECT * FROM post_code;
SELECT * FROM address;
SELECT * FROM counter;
SELECT * FROM dependency_update_notifier;

SELECT * FROM dependency_version_tracker;
SELECT * FROM options;

-- DROP TABLE division;
-- DROP TABLE country;
-- DROP TABLE counter;


-- UPDATE dependency_version_tracker SET is_searchable = 1 WHERE dependency_name = 'WooCommerce';

-- UPDATE dependency_version_tracker SET compare_data = null WHERE dependency_name = 'WooCommerce';

-- WooCommerce
-- Contact Form 7