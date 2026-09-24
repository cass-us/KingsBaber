import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star, Clock, MapPin, Scissors, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const Hero = ({ onOpenBooking, onSelectService }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a smooth staggering entrance sequence
      gsap.from(".gsap-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".gsap-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".gsap-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".gsap-buttons", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".gsap-stats", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".gsap-card", {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBookNow = () => {
    if (onSelectService) {
      onSelectService({ id: "classic-cut", title: "The Classic Cut", price: "$45" });
    }
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section ref={containerRef} className="relative isolate min-h-screen overflow-hidden bg-zinc-950 px-6 py-20 sm:px-8 lg:px-12">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Kings Barber Shop Interior"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-zinc-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-zinc-950/90" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-12">

          {/* Main Content */}
          <div className="space-y-6 text-center md:col-span-8 md:text-left">

            {/* Badge */}
            <div className="gsap-badge inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              Premier Grooming Experience
            </div>

            {/* Typography Heavy Heading */}
            <h1 className="gsap-title font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Precision Cuts.
              <br />
              <span className="font-sans font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Timeless Style.
              </span>
            </h1>

            {/* Description */}
            <p className="gsap-desc mx-auto max-w-xl text-sm leading-7 text-zinc-300 sm:text-base md:mx-0 lg:text-lg font-light">
              Welcome to{" "}
              <span className="font-semibold text-white tracking-wide">
                Kings Barber
              </span>
              . Where classic barbering techniques meet modern luxury.
              Experience top-tier fades, beard sculpts, and premium hot towel
              treatments.
            </p>

            {/* Call-to-action Buttons - Reduced padding & font sizes for sm and md screens */}
            <div className="gsap-buttons flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row md:justify-start">
              <button
                type="button"
                onClick={handleBookNow}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-zinc-950 shadow-xl transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] sm:w-auto sm:px-5 sm:py-2.5 sm:text-xs lg:px-7 lg:py-3.5 lg:text-sm"
              >
                <span>Book Appointment</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 lg:h-4 lg:w-4" />
              </button>

              <a
                href="#services"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-5 py-2.5 text-center text-xs font-medium tracking-wide text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800/80 sm:w-auto sm:px-5 sm:py-2.5 sm:text-xs lg:px-7 lg:py-3.5 lg:text-sm"
              >
                <Scissors className="h-3.5 w-3.5 text-zinc-400 lg:h-4 lg:w-4" />
                <span>Explore Services</span>
              </a>
            </div>

            {/* Interactive Stats */}
            <div className="gsap-stats mx-auto grid max-w-xl grid-cols-3 gap-4 border-t border-zinc-800/80 pt-6 md:mx-0">
              <div>
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-white sm:justify-start sm:text-2xl">
                  4.9 <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                  Client Rating
                </p>
              </div>

              <div className="border-x border-zinc-800 px-3">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  10+
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                  Master Barbers
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">
                  500+
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Shop Details Glass Card */}
          <div className="hidden md:col-span-4 md:block">
            <div className="gsap-card rounded-2xl border border-zinc-800/90 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl">

              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">
                  Shop Details
                </h3>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  Open Today
                </span>
              </div>

              <div className="space-y-5 py-5 text-xs sm:text-sm">

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Opening Hours
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      Mon - Sat: 8:00 AM - 7:00 PM
                    </p>
                    <p className="text-zinc-400">
                      Sunday: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Location
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      124 Main Street, Suite 4B
                    </p>
                    <p className="text-zinc-400">
                      Downtown District
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300">
                    <Scissors className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Walk-ins Welcome
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      Appointments get priority seating
                    </p>
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={handleBookNow}
                className="w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 lg:py-3.5"
              >
                Reserve Your Chair
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;