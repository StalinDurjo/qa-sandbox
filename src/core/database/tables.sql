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

-- Person Table
CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT,
    country_alpha2 TEXT NOT NULL,
    nationality TEXT NOT NULL,
    ssn TEXT,
    national_id TEXT,
    date_of_birth DATE NOT NULL,
    age INTEGER,
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    blood_type TEXT,
    eye_color TEXT,
    hair_color TEXT,
    gender TEXT CHECK(gender IN ('male', 'female')),
    FOREIGN KEY (country_alpha2) REFERENCES country(alpha2)
);

-- Employment Data table
CREATE TABLE IF NOT EXISTS employment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    occcupation TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current_job BOOLEAN DEFAULT 1
);

-- Bank table
CREATE TABLE IF NOT EXISTS bank (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    swift_code TEXT,
    bic TEXT,
    country_alpha2 TEXT NOT NULL,
    FOREIGN KEY (country_alpha2) REFERENCES country(alpha2),
    UNIQUE(name, country_alpha2)
);

-- Bank Account table
CREATE TABLE IF NOT EXISTS bank_account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bank_id INTEGER NOT NULL,
    account_type TEXT NOT NULL,
    currency TEXT NOT NULL,
    account_number TEXT,
    iban TEXT,
    routing_number TEXT,
    sort_code TEXT,
    bsb_number TEXT,
    is_primary BOOLEAN DEFAULT 0,
    FOREIGN KEY (bank_id) REFERENCES bank(id)
);

-- Counter table
CREATE TABLE IF NOT EXISTS counter (
    value INTEGER DEFAULT 0
);

-- Dependency Version Tracker table
CREATE TABLE IF NOT EXISTS dependency_version_tracker (
    scraper_name TEXT NOT NULL,
    dependency_name TEXT NOT NULL,
    target_url TEXT NOT NULL,
    stored_data TEXT DEFAULT '',
    compare_data TEXT DEFAULT '',
    is_searchable INTEGER DEFAULT 1
);

-- Options table
CREATE TABLE IF NOT EXISTS options (
    action_project_base_url TEXT
);
