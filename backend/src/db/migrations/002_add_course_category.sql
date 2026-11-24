-- 100-track expansion: catalog groups for the course list filter.
-- v1 tracks are all 'languages'; new tracks carry their group.
ALTER TABLE courses ADD COLUMN category TEXT NOT NULL DEFAULT 'languages';
UPDATE courses SET category = 'languages' WHERE category IS NULL OR category = '';
