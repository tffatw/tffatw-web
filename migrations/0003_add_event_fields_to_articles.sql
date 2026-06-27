-- Migration number: 0003 	 2026-06-27T05:02:46.001Z

ALTER TABLE articles ADD COLUMN event_type TEXT;
ALTER TABLE articles ADD COLUMN event_date TEXT;
ALTER TABLE articles ADD COLUMN event_time TEXT;
ALTER TABLE articles ADD COLUMN location TEXT;
ALTER TABLE articles ADD COLUMN address TEXT;
ALTER TABLE articles ADD COLUMN images TEXT;
