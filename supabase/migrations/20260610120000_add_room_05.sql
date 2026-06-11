-- Add Room 05 to the rooms table
INSERT INTO public.rooms (slug, name, description, sqft, amenities, photos, status, sort_order) VALUES
  ('room-05', 'Room 05', 'Private bedroom with natural light and comfortable furnishings.', NULL, '[]'::jsonb, '[]'::jsonb, 'available', 5);
