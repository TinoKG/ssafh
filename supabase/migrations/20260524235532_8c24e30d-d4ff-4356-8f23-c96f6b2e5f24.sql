
-- Fix mutable search_path on touch_updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict has_role execution to internal RLS usage
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO postgres, service_role;

-- Tighten inquiry insert: basic length validation, no overly-permissive shape
DROP POLICY IF EXISTS "anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "anyone can submit inquiry" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND (email IS NULL OR length(email) <= 320)
    AND (phone IS NULL OR length(phone) <= 40)
    AND (message IS NULL OR length(message) <= 4000)
    AND kind IN ('contact','tour','room','admissions')
    AND handled = false
  );
