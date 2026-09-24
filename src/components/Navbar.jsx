import React, { useState } from "react";
import { Scissors, Menu, X, Phone } from "lucide-react";

const Navbar = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Barbers", href: "#barbers" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all duration-300">
            <Scissors className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-white uppercase leading-none">
              Kings <span className="text-amber-400">Barber</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase mt-1 font-medium">
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
              className="text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors duration-200 px-3 py-2"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span>(555) 019-2834</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition-all duration-200 shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20"
          >
            Book Chair
          </button>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-xs font-semibold text-zinc-400 py-1"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>(555) 019-2834</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full rounded-xl bg-amber-400 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition-all"
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