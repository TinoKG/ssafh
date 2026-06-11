import { Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import brandLogo from "@/assets/brand/logo.jpg";
import { settingsQueryOptions } from "@/lib/site-data";
import { Phone, Menu } from "lucide-react";
import { useState, useEffect } from "react";

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to as never}
      className="text-sm text-[var(--hl-ink)] hover:opacity-60 transition"
      activeProps={{ className: "underline underline-offset-4" }}
    >
      {label}
    </Link>
  );
}

function Header() {
  const { data: s } = useQuery(settingsQueryOptions());
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        background: "var(--hl-bg)",
        borderBottom: "1px solid var(--hl-border)",
        boxShadow: isScrolled ? "0 4px 20px -2px rgba(45, 42, 38, 0.08)" : "none",
      }}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-20" : "h-24 sm:h-28"}`}
      >
        <Link to="/heirloom" className={`heirloom-brand-link ${isScrolled ? "" : "is-large"}`}>
          <img
            src={brandLogo}
            alt=""
            className={`heirloom-brand-logo ${isScrolled ? "" : "is-large"}`}
            width={1087}
            height={1125}
            aria-hidden
          />
          <div className="flex flex-col min-w-0">
            <span className="italic leading-none">
              {s?.business_name ?? "Senior Services Adult Family Home"}
            </span>
            <span
              className={`text-xs text-[var(--hl-muted)] not-italic font-sans transition-all duration-300 origin-left ${
                isScrolled
                  ? "max-h-0 opacity-0 overflow-hidden mt-0 scale-95"
                  : "max-h-10 opacity-100 mt-1 scale-100"
              }`}
            >
              {s?.tagline ?? "Gentle Hands. Caring Hearts. A Place to Belong."}
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <NavLink to="/heirloom/about" label="About" />
          <NavLink to="/heirloom/rooms" label="Rooms" />
          <NavLink to="/heirloom/services" label="Services" />
          <NavLink to="/heirloom/admissions" label="Admissions" />
          <NavLink to="/heirloom/resources" label="Resources" />
          <NavLink to="/heirloom/contact" label="Contact" />
          <Link
            to={"/heirloom/tour" as never}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-mono uppercase tracking-widest hover:brightness-110"
            style={{ background: "var(--hl-ink)" }}
          >
            Book a tour
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
        <div
          className="lg:hidden px-6 py-4 flex flex-col gap-3"
          style={{ borderTop: "1px solid var(--hl-border)", background: "var(--hl-bg)" }}
        >
          {[
            ["/heirloom/about", "About"],
            ["/heirloom/rooms", "Rooms"],
            ["/heirloom/services", "Services"],
            ["/heirloom/admissions", "Admissions"],
            ["/heirloom/resources", "Resources"],
            ["/heirloom/contact", "Contact"],
            ["/heirloom/tour", "Book a tour"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to as never}
              className="py-2 text-base"
              onClick={() => setOpen(false)}
            >
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
    <footer className="mt-24" style={{ borderTop: "1px solid var(--hl-border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="heirloom-footer-brand" style={{ alignItems: "flex-start" }}>
            <img
              src={brandLogo}
              alt=""
              className="heirloom-footer-logo mt-1"
              width={1087}
              height={1125}
              aria-hidden
            />
            <div className="flex flex-col">
              <p className="font-serif text-2xl italic leading-tight">
                {s?.business_name ?? "Senior Services Adult Family Home"}
              </p>
              <p className="text-xs text-[var(--hl-muted)] not-italic font-sans mt-1">
                {s?.tagline ?? "Gentle Hands. Caring Hearts. A Place to Belong."}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[var(--hl-muted)] max-w-md">
            A licensed adult family home in {s?.city ?? "Mount Vernon"}, {s?.state}. Six rooms. Real
            home. Real care.
          </p>
          <p className="mt-4 text-xs text-[var(--hl-muted)]">
            This website does not provide medical advice.
          </p>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--hl-muted)] mb-3">
            Visit
          </p>
          <p className="text-sm">
            {s?.address_line}
            <br />
            {s?.city}, {s?.state} {s?.zip}
          </p>
          <p className="text-sm mt-3">
            <a href={`tel:${s?.phone}`}>{s?.phone}</a>
          </p>
          <p className="text-sm">
            <a href={`mailto:${s?.email}`}>{s?.email}</a>
          </p>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--hl-muted)] mb-3">
            Site
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/heirloom/rooms" as never}>Rooms</Link>
            </li>
            <li>
              <Link to={"/heirloom/services" as never}>Services</Link>
            </li>
            <li>
              <Link to={"/heirloom/admissions" as never}>Admissions</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--hl-border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-[var(--hl-muted)] font-mono">
          <span>
            &copy; {new Date().getFullYear()} {s?.business_name}
          </span>
          <span>DSHS Licensed · {s?.dshs_license}</span>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-3"
      style={{ background: "var(--hl-bg)", borderTop: "1px solid var(--hl-border)" }}
    >
      <a
        href={`tel:${s?.phone ?? ""}`}
        className="min-h-[44px] flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest"
        style={{ border: "1px solid var(--hl-border)" }}
      >
        <Phone className="size-4" /> Call
      </a>
      <Link
        to={"/heirloom/tour" as never}
        className="min-h-[44px] flex items-center justify-center text-white text-sm font-mono uppercase tracking-widest"
        style={{ background: "var(--hl-ink)" }}
      >
        Book a tour
      </Link>
    </div>
  );
}

export function HeirloomLayout() {
  return (
    <div className="design-heirloom min-h-screen pb-20 lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
