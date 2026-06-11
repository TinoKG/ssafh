import { Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import brandLogo from "@/assets/brand/logo.jpg";
import { settingsQueryOptions } from "@/lib/site-data";
import { Phone, MapPin, Mail, Menu, ShieldCheck, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function NavLink({ to, label, exact }: { to: string; label: string; exact?: boolean }) {
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactStrip, setShowContactStrip] = useState(true);
  const [contactStripHeight, setContactStripHeight] = useState(0);
  const contactStripRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!contactStripRef.current) return;
    const element = contactStripRef.current;
    const observer = new ResizeObserver(() => {
      setContactStripHeight(element.offsetHeight);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        // Near the very top, always show it
        setShowContactStrip(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowContactStrip(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setShowContactStrip(true);
      }

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldTranslate = !showContactStrip && !open;
  const translateY = shouldTranslate
    ? `translateY(-${contactStripHeight || 40}px)`
    : "translateY(0)";

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{
        background: "rgba(250,250,249,0.9)",
        borderBottom: "1px solid var(--h-border)",
        boxShadow: isScrolled ? "0 4px 20px -2px rgba(28, 25, 23, 0.08)" : "none",
        transform: translateY,
      }}
    >
      <div ref={contactStripRef} className="heritage-contact-strip">
        <div className="wide-container flex flex-wrap items-center justify-between gap-x-5 gap-y-2 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {s?.phone && (
              <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5" aria-hidden />
                <span>{s.phone}</span>
              </a>
            )}
            {s?.email && (
              <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5">
                <Mail className="size-3.5" aria-hidden />
                <span>{s.email}</span>
              </a>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" aria-hidden />
              Licensed & Compliant Adult Family Home
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              24-hour care available
            </span>
            <Link to="/heritage/tour" className="heritage-strip-cta">
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`wide-container flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-20" : "h-24 sm:h-28"}`}
      >
        <Link to="/heritage" className="heritage-brand-link">
          <img
            src={brandLogo}
            alt=""
            className={`heritage-brand-logo ${isScrolled ? "" : "is-large"}`}
            width={1087}
            height={1125}
            aria-hidden
          />
          <div className="flex flex-col min-w-0">
            <span
              className={`font-display font-semibold transition-all duration-300 ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}
            >
              {s?.business_name ?? "Senior Services Adult Family Home"}
            </span>
            <span
              className={`text-xs text-stone-500 font-normal transition-all duration-300 origin-left ${
                isScrolled
                  ? "max-h-0 opacity-0 overflow-hidden mt-0 scale-95"
                  : "max-h-10 opacity-100 mt-0.5 scale-100"
              }`}
            >
              {s?.tagline ?? "Gentle Hands. Caring Hearts. A Place to Belong."}
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <NavLink to="/heritage" label="Home" exact />
          <NavLink to="/heritage/services" label="Services" />
          <NavLink to="/heritage/rooms" label="Bedrooms" />
          <NavLink to="/heritage/resources" label="Resources" />
          <NavLink to="/heritage/admissions" label="Admissions" />
          <NavLink to="/heritage/contact" label="Contact" />
          <NavLink to="/heritage/about" label="About" />
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
          <div
            className="mb-2 rounded-xl p-4 text-sm space-y-2"
            style={{ background: "var(--h-surface)", border: "1px solid var(--h-border)" }}
          >
            {s?.phone && (
              <a href={`tel:${s.phone}`} className="flex items-center gap-2">
                <Phone className="size-4" aria-hidden />
                {s.phone}
              </a>
            )}
            {s?.email && (
              <a href={`mailto:${s.email}`} className="flex items-center gap-2 break-all">
                <Mail className="size-4" aria-hidden />
                {s.email}
              </a>
            )}
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden />
              Licensed & Compliant Adult Family Home
            </p>
            <p className="flex items-center gap-2">
              <Clock className="size-4" aria-hidden />
              24-hour care available
            </p>
          </div>
          {[
            ["/heritage", "Home"],
            ["/heritage/services", "Services"],
            ["/heritage/rooms", "Bedrooms"],
            ["/heritage/resources", "Resources"],
            ["/heritage/admissions", "Admissions"],
            ["/heritage/contact", "Contact"],
            ["/heritage/about", "About"],
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
      <div className="wide-container py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-start gap-3 mb-4">
            <img
              src={brandLogo}
              alt=""
              className="heritage-footer-logo mt-1"
              width={1087}
              height={1125}
              aria-hidden
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold">
                {s?.business_name ?? "Senior Services Adult Family Home"}
              </span>
              <span className="text-xs text-stone-500 font-normal mt-0.5">
                {s?.tagline ?? "Gentle Hands. Caring Hearts. A Place to Belong."}
              </span>
            </div>
          </div>
          <p className="text-stone-600 max-w-md">
            A licensed adult family home in Mount Vernon, WA. Dignified residential care for our
            community's seniors.
          </p>
          <p className="mt-4 text-xs text-stone-500">
            This website does not provide medical advice.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3">
            Visit
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <MapPin className="size-4 mt-1 shrink-0" aria-hidden />
              {s?.address_line}, {s?.city}, {s?.state} {s?.zip}
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 mt-1 shrink-0" aria-hidden />
              <a href={`tel:${s?.phone}`}>{s?.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 mt-1 shrink-0" aria-hidden />
              <a href={`mailto:${s?.email}`}>{s?.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3">
            Site
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/heritage/rooms">Bedrooms</Link>
            </li>
            <li>
              <Link to="/heritage/services">Services</Link>
            </li>
            <li>
              <Link to="/heritage/admissions">Admissions</Link>
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
      <div className="border-t" style={{ borderColor: "var(--h-border)" }}>
        <div className="wide-container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500">
          <span>
            &copy; {new Date().getFullYear()} {s?.business_name}. All rights reserved.
          </span>
          <span>
            Washington State licensed adult family home · Documentation available upon request
            during admissions
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  const { data: s } = useQuery(settingsQueryOptions());
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-white p-3 grid grid-cols-2 gap-2"
      style={{ borderColor: "var(--h-border)" }}
    >
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-2 focus:rounded"
      >
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
