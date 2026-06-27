-- Migration number: 0001 	 2026-06-27T03:40:31.221Z

CREATE TABLE members (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE auth_tokens (
  token TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER,
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE company_profiles (
  id TEXT PRIMARY KEY,
  member_id TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  contact_email TEXT,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
