TRUNCATE TABLE public.blog_posts,
  public.testimonials,
  public.rooms,
  public.site_settings,
  public.inquiries,
  public.user_roles
RESTART IDENTITY CASCADE;
