import React, { useState, useEffect } from "react";
import { Scissors, Menu, X, Phone, Clock } from "lucide-react";

const Navbar = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smart feature: Detect scroll for dynamic shadow & border enhancement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/50 border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100 py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
            <Scissors className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-zinc-900 uppercase leading-none">
              Kings <span className="text-amber-600">Barber</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-1 font-semibold">
              Grooming & Co.
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-zinc-600 hover:text-amber-600 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTION BUTTONS & SMART STATUS */}
        <div className="hidden md:flex items-center gap-6">
          {/* Smart Badge: Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Today</span>
          </div>

          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors duration-200 px-2 py-1"
          >
            <Phone className="h-3.5 w-3.5 text-amber-600" />
            <span>(555) 019-2834</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-600 transition-all duration-200 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-0.5"
          >
            Book Chair
          </button>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-200 p-2 text-zinc-600 hover:bg-slate-100 hover:text-zinc-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-b border-slate-200 bg-white/95 backdrop-blur-xl px-6 pt-5 pb-8 space-y-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Navigation</span>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Now</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-amber-600 transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3.5">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2.5 text-xs font-semibold text-zinc-600 py-1"
            >
              <Phone className="h-4 w-4 text-amber-600" />
              <span>(555) 019-2834</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full rounded-2xl bg-amber-500 py-3 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-600 transition-all shadow-md shadow-amber-500/20"
            >
              Book Chair
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;