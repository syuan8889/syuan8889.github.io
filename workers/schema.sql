CREATE TABLE IF NOT EXISTS site_counters (
    site_key TEXT PRIMARY KEY,
    total_visits INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS visitor_identities (
    site_key TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    first_country_code TEXT,
    first_country_name TEXT,
    first_region_name TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (site_key, visitor_id)
);

CREATE TABLE IF NOT EXISTS visitor_regions (
    site_key TEXT NOT NULL,
    region_key TEXT NOT NULL,
    country_code TEXT NOT NULL,
    country_name TEXT NOT NULL,
    province_name TEXT,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (site_key, region_key)
);
