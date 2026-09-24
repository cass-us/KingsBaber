import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Sparkles, Clock, Check, ChevronRight, UserCheck } from "lucide-react";

// Register scroll plugins for high-performance section triggering
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = ({ onOpenBooking, onSelectService }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const servicesList = [
    {
      id: "classic-cut",
      title: "The Classic Cut",
      price: "R145",
      duration: "30-40 mins",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop",
      description: "A precision haircut tailored to your style, completed with a hot lather neck shave and premium styling.",
      features: ["Personal consultation", "Hot lather neck shave", "Styling & product guide"],
      badge: null,
    },
    {
      id: "beard-grooming",
      title: "Royal Beard Grooming",
      price: "R135",
      duration: "25-35 mins",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
      description: "Beard trim, shaping, razor line-up, and nourishing beard oil, finished with a hot towel.",
      features: ["Natural oil massage", "Straight-razor line-up", "Hot towel finish"],
      badge: null,
    },
    {
      id: "hot-shave",
      title: "Traditional Hot Towel Shave",
      price: "R150",
      duration: "45 mins",
      image: "https://images.unsplash.com/photo-1593702295094-aea22597af65?q=80&w=600&auto=format&fit=crop",
      description: "The ultimate shave experience with pre-shave oil, rich lather, and straight-razor care.",
      features: ["Warm lather & oils", "Double hot towel", "Calming post-shave balm"],
      badge: null,
    },
    {
      id: "signature",
      title: "The Signature Package",
      price: "R290",
      duration: "75 mins",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop",
      description: "Our premier haircut and signature beard grooming, plus a facial massage and hot towel treatment.",
      features: ["Precision cut & style", "Complete beard groom", "Restorative hot towel & facial massage"],
      badge: "BEST VALUE",
      highlighted: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Entrance Stagger
      gsap.from(".gsap-services-header > *", {
        scrollTrigger: {
          trigger: ".gsap-services-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Cascade Card Entrance Animation (Staggered fade & rise)
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: ".gsap-services-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBookService = (service) => {
    onSelectService(service);
    onOpenBooking();
  };

  // Magnified Card Hover effects driven by GSAP
  const handleCardMouseEnter = (index) => {
    gsap.to(cardsRef.current[index], {
      y: -8,
      scale: 1.02,
      borderColor: servicesList[index].highlighted ? "#f59e0b" : "#4b5563",
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -5px rgba(245, 158, 11, 0.15)",
      duration: 0.4,
      ease: "power2.out",
    });
    // Magnify underlying image
    gsap.to(cardsRef.current[index].querySelector(".service-img"), {
      scale: 1.08,
      duration: 0.6,
      ease: "power1.out",
    });
  };

  const handleCardMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      y: 0,
      scale: 1,
      borderColor: servicesList[index].highlighted ? "#f59e0b" : "#27272a",
      boxShadow: servicesList[index].highlighted 
        ? "0 10px 15px -3px rgba(245, 158, 11, 0.08)" 
        : "none",
      duration: 0.4,
      ease: "power2.out",
    });
    // Reset underlying image
    gsap.to(cardsRef.current[index].querySelector(".service-img"), {
      scale: 1,
      duration: 0.6,
      ease: "power1.out",
    });
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative bg-zinc-950 px-6 py-24 sm:px-8 lg:px-12 border-t border-zinc-900"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="gsap-services-header text-center space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md">
            <Scissors className="h-3.5 w-3.5 text-emerald-400 animate-spin-slow" />
            Our Craft
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Signature Services
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-zinc-400 font-light">
            Expertly crafted cuts, detailed beard sculpting, and luxury treatments designed to keep you looking and feeling your absolute best.
          </p>
        </div>

        {/* Services Grid */}
        <div className="gsap-services-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-zinc-900/30 transition-shadow duration-300 ${
                service.highlighted
                  ? "border-amber-500/80 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20"
                  : "border-zinc-800"
              }`}
            >
              {service.badge && (
                <span className="absolute top-4 right-4 z-20 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-950 shadow-lg flex items-center gap-1">
                  <Sparkles className="h-3 w-3 fill-zinc-950" />
                  {service.badge}
                </span>
              )}

              <div className="space-y-5">
                {/* Image Showcase */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-img h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Subtle vignette layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />
                  
                  <span className="absolute bottom-4 left-4 rounded-xl bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    {service.duration}
                  </span>
                </div>

                {/* Info Container */}
                <div className="px-6 pb-2 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold text-white leading-snug">
                      {service.title}
                    </h3>
                    <span className="text-2xl font-black text-white shrink-0 tracking-tight">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-zinc-400 font-light">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 pt-4 border-t border-zinc-800/80">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <Check className="text-emerald-400 h-3.5 w-3.5 shrink-0" />
                        <span className="truncate font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 pt-4 mt-auto border-t border-zinc-800/85 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleBookService(service)}
                  className={`group relative flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    service.highlighted
                      ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:scale-[1.01]"
                      : "bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.01]"
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Book Appointment</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full rounded-xl py-2 text-center text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300"
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;