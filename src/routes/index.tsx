import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

// Canonical homepage = /heritage. We render a lightweight redirect page so
// the root URL returns HTTP 200 (crawlers + scanners follow the meta refresh
// and the canonical link), then hand off to the client router.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Senior Services Adult Family Home | Mount Vernon, WA" },
      {
        name: "description",
        content:
          "Licensed adult family home in Mount Vernon, WA serving Skagit County. Private bedrooms, 24-hour personalized senior care, and dementia support.",
      },
      { "http-equiv": "refresh", content: "0; url=/heritage" },
    ],
    links: [{ rel: "canonical", href: "https://ssafh.lovable.app/heritage" }],
  }),
  component: RootRedirect,
});

function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.navigate({ to: "/heritage", replace: true });
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">
        Redirecting to{" "}
        <Link to="/heritage" className="underline">
          Senior Services Adult Family Home
        </Link>
        …
      </p>
    </div>
  );
}
