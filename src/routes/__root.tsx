import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Senior Services Adult Family Home — Adult Family Home in Mount Vernon, WA" },
      { name: "description", content: "Senior Services Adult Family Home is a licensed adult family home in Mount Vernon, WA serving Skagit County — Burlington, Sedro-Woolley, Anacortes, and surrounding Washington communities. Private bedrooms, 24-hour care, dementia-friendly support." },
      { name: "author", content: "Senior Services Adult Family Home" },
      { name: "keywords", content: "adult family home Mount Vernon WA, senior care Mount Vernon, adult care home Skagit County, assisted living Burlington WA, dementia care Sedro-Woolley, elderly care Anacortes, Washington adult family home, senior living Mount Vernon, memory care Skagit Valley" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "geo.region", content: "US-WA" },
      { name: "geo.placename", content: "Mount Vernon, Washington" },
      { property: "og:title", content: "Senior Services Adult Family Home — Mount Vernon, WA" },
      { property: "og:description", content: "Licensed adult family home in Mount Vernon, WA serving Skagit County. Personalized senior care, private bedrooms, dementia support." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Senior Services Adult Family Home" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Senior Services Adult Family Home — Mount Vernon, WA" },
      { name: "twitter:description", content: "Licensed adult family home in Mount Vernon, WA serving Skagit County." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "ResidentialCare"],
              "@id": "https://ssafh.lovable.app/#business",
              name: "Senior Services Adult Family Home",
              alternateName: "Senior Services AFH",
              description: "Licensed adult family home in Mount Vernon, WA providing personalized 24-hour senior care, private bedrooms, dementia support, and a true residential setting for up to six residents.",
              url: "https://ssafh.lovable.app",
              telephone: "+13607706434",
              email: "seniorservicesafh@gmail.com",
              image: "https://ssafh.lovable.app/og-home.jpg",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3707 Trumpeter Ct",
                addressLocality: "Mount Vernon",
                addressRegion: "WA",
                postalCode: "98273",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "City", name: "Mount Vernon, WA" },
                { "@type": "City", name: "Burlington, WA" },
                { "@type": "City", name: "Sedro-Woolley, WA" },
                { "@type": "City", name: "Anacortes, WA" },
                { "@type": "City", name: "La Conner, WA" },
                { "@type": "AdministrativeArea", name: "Skagit County, WA" },
                { "@type": "State", name: "Washington" },
              ],
              serviceType: [
                "Adult Family Home",
                "Senior Care",
                "Assisted Living Alternative",
                "Dementia Care",
                "Memory Care",
                "24-Hour Personal Care",
                "Medication Management",
                "Respite Care",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Senior Care Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Bedroom Adult Family Home Care" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dementia & Memory Care" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medication Management" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "24-Hour Supervision" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Respite Care" } },
                ],
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://ssafh.lovable.app/#website",
              url: "https://ssafh.lovable.app",
              name: "Senior Services Adult Family Home",
              publisher: { "@id": "https://ssafh.lovable.app/#business" },
              inLanguage: "en-US",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
