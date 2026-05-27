import { createFileRoute, redirect } from "@tanstack/react-router";

// Canonical homepage = /heritage. The design chooser lives at /preview.
// Redirecting consolidates SEO signals onto a single home URL.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/heritage", replace: true });
  },
});
