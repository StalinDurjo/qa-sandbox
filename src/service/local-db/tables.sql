-- Country table
CREATE TABLE IF NOT EXISTS country (
    alpha2 TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    alpha3 TEXT NOT NULL UNIQUE,
    numeric TEXT NOT NULL UNIQUE
);

-- Division table (e.g., states, provinces)
CREATE TABLE IF NOT EXISTS division (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country_alpha2 TEXT NOT NULL,
    FOREIGN KEY (country_alpha2) REFERENCES country(alpha2),
    UNIQUE(name, country_alpha2)
);

-- Subdivision table (e.g., counties, districts)
CREATE TABLE IF NOT EXISTS subdivision (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    division_id INTEGER NOT NULL,
    FOREIGN KEY (division_id) REFERENCES division(id),
    UNIQUE(name, division_id)
);

-- Post code table
CREATE TABLE IF NOT EXISTS post_code (
    code TEXT PRIMARY KEY,
    subdivision_id INTEGER NOT NULL,
    FOREIGN KEY (subdivision_id) REFERENCES subdivision(id)
);

-- Address table
CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    post_code TEXT NOT NULL,
    subdivision_id INTEGER NOT NULL,
    division_id INTEGER NOT NULL,
    country_alpha2 TEXT NOT NULL,
    FOREIGN KEY (post_code) REFERENCES post_code(code),
    FOREIGN KEY (subdivision_id) REFERENCES subdivision(id),
    FOREIGN KEY (division_id) REFERENCES division(id),
    FOREIGN KEY (country_alpha2) REFERENCES country(alpha2)
);