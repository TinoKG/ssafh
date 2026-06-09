import { Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "@/lib/site-data";
import { Leaf, Phone, MapPin, Mail, Menu } from "lucide-react";
import { useState } from "react";

function NavLink({
  to,
  label,
  exact,
}: {
  to: string;
  label: string;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      className="text-sm font-medium text-stone-600 hover:text-[var(--h-ink)] transition-colors"
      activeProps={{ className: "text-[var(--h-primary)]" }}
      activeOptions={{ exact }}
    >
      {label}
    </Link>
  );
}

function Header() {
  const { data: s } = useQuery(settingsQueryOptions());
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(250,250,249,0.85)", borderBottom: "1px solid var(--h-border)" }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/heritage" className="flex items-center gap-2">
          <span className="grid place-items-center size-9 rounded-full" style={{ background: "var(--h-primary-soft)" }}>
            <Leaf className="size-5" style={{ color: "var(--h-primary)" }} aria-hidden />
          </span>
          <span className="font-display text-xl font-semibold">{s?.business_name ?? "Senior Services Adult Family Home"}</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <NavLink to="/heritage/about" label="About" />
          <NavLink to="/heritage/rooms" label="Rooms" />
          <NavLink to="/heritage/services" label="Services" />
          <NavLink to="/heritage/admissions" label="Admissions" />
          <NavLink to="/heritage/resources" label="Resources" />
          <NavLink to="/heritage/contact" label="Contact" />
          <Link
            to="/heritage/tour"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium hover:brightness-110 transition"
            style={{ background: "var(--h-primary)" }}
          >
            Schedule a Tour
          </Link>
        </nav>
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="size-6" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-stone-200 px-6 py-4 flex flex-col gap-3 bg-white">
          {[
            ["/heritage/about", "About"],
            ["/heritage/rooms", "Rooms"],
            ["/heritage/services", "Services"],
            ["/heritage/admissions", "Admissions"],
            ["/heritage/resources", "Resources"],
            ["/heritage/contact", "Contact"],
            ["/heritage/tour", "Schedule a Tour"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="py-2 text-base" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--h-border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center size-7 rounded-full" style={{ background: "var(--h-primary-soft)" }}>
              <Leaf className="size-4" style={{ color: "var(--h-primary)" }} aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">{s?.business_name}</span>
          </div>
          <p className="text-stone-600 max-w-md">
            A licensed adult family home in Mount Vernon, WA. Dignified residential care for our community's seniors.
          </p>
          <p className="mt-4 text-xs text-stone-500">
            This website does not provide medical advice.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3">Visit</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="size-4 mt-1 shrink-0" aria-hidden />{s?.address_line}, {s?.city}, {s?.state} {s?.zip}</li>
            <li className="flex gap-2"><Phone className="size-4 mt-1 shrink-0" aria-hidden /><a href={`tel:${s?.phone}`}>{s?.phone}</a></li>
            <li className="flex gap-2"><Mail className="size-4 mt-1 shrink-0" aria-hidden /><a href={`mailto:${s?.email}`}>{s?.email}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3">Site</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/heritage/rooms">Rooms</Link></li>
            <li><Link to="/heritage/services">Services</Link></li>
            <li><Link to="/heritage/admissions">Admissions</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--h-border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500">
          <span>&copy; {new Date().getFullYear()} {s?.business_name}. All rights reserved.</span>
          <span>Licensed Adult Family Home · {s?.dshs_license}</span>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-white p-3 grid grid-cols-2 gap-2" style={{ borderColor: "var(--h-border)" }}>
      <a
        href={`tel:${s?.phone ?? ""}`}
        className="min-h-[44px] flex items-center justify-center gap-2 rounded-md border text-sm font-medium"
        style={{ borderColor: "var(--h-border)" }}
      >
        <Phone className="size-4" /> Call
      </a>
      <Link
        to="/heritage/tour"
        className="min-h-[44px] flex items-center justify-center gap-2 rounded-md text-white text-sm font-medium"
        style={{ background: "var(--h-primary)" }}
      >
        Book a Tour
      </Link>
    </div>
  );
}

export function HeritageLayout() {
  return (
    <div className="design-heritage min-h-screen pb-20 lg:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-2 focus:rounded">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}