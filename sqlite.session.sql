SELECT * FROM country;
SELECT * FROM division;
SELECT * FROM subdivision;
SELECT * FROM post_code;
SELECT * FROM address;
SELECT * FROM counter;

-- DROP TABLE division;
-- DROP TABLE country;
-- DROP TABLE counter;

SELECT 
  address.street_address AS streetAddress,
  address.city,
  post_code.code AS postCode,
  subdivision.name AS subdivision,
  division.name AS division,
  country.name AS country
FROM
  address
JOIN
  post_code ON address.post_code = post_code.code
JOIN
  subdivision ON address.subdivision_id = subdivision.id
JOIN
  division ON address.division_id = division.id
JOIN
  country ON address.country_alpha2 = country.alpha2;
