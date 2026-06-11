DELETE FROM public.rooms;
INSERT INTO public.rooms (slug, name, description, sqft, amenities, photos, status, sort_order) VALUES
  ('room-01', 'Room 01', 'Private bedroom with natural light and comfortable furnishings.', NULL, '[]'::jsonb, '[]'::jsonb, 'available', 1),
  ('room-02', 'Room 02', 'Private bedroom with natural light and comfortable furnishings.', NULL, '[]'::jsonb, '[]'::jsonb, 'available', 2),
  ('room-03', 'Room 03', 'Private bedroom with natural light and comfortable furnishings.', NULL, '[]'::jsonb, '[]'::jsonb, 'available', 3),
  ('room-04', 'Room 04', 'Private bedroom with natural light and comfortable furnishings.', NULL, '[]'::jsonb, '[]'::jsonb, 'available', 4);
