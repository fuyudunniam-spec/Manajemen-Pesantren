
-- Insert active_theme key-value pair into website_settings
INSERT INTO website_settings (key, value)
VALUES ('active_theme', 'modern')
ON CONFLICT (key) DO NOTHING;
