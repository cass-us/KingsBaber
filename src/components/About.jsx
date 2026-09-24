import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const barbers = [
  {
    name: 'Marcus "The Razor" Vance',
    role: 'Master Barber & Founder',
    experience: '12+ Years Experience',
    specialty: 'Precision Fades & Hot Towel Shaves',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', // photo-SoVpY7e4D5A
    bio: 'Crafting sharp looks and timeless cuts since day one. Dedicated to perfection with every blade stroke.',
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Hair Stylist',
    experience: '8 Years Experience',
    specialty: 'Modern Texturized Cuts & Beard Sculpting',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', // photo-2EGNqazbAMk
    bio: 'Combining modern styling trends with classic barbering techniques for effortless everyday looks.',
  },
  {
    name: 'David "D-Cut" Miller',
    role: 'Beard & Detail Specialist',
    experience: '6 Years Experience',
    specialty: 'Beard Grooming, Line-ups & Hair Art',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', // photo-L10hUomGyO0
    bio: 'Specializing in intricate lineup detailing and custom beard care to elevate your personal style.',
  },
];

function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade-in and Up Hero Elements
      gsap.from('.about-hero > *', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // 2. Scroll Triggered Animation for Story and Showroom Image
      gsap.from('.about-story-text', {
        scrollTrigger: {
          trigger: '.about-story-section',
          start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from('.about-story-img', {
        scrollTrigger: {
          trigger: '.about-story-section',
          start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: 'power2.out',
      });

      // 3. Scroll Triggered Cards Reveal
      gsap.from('.barber-card', {
        scrollTrigger: {
          trigger: '.barbers-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.2)',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-zinc-950 text-zinc-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans"
    >
      {/* Background Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Hero Header */}
      <div className="about-hero max-w-4xl mx-auto text-center mb-24 relative z-10">
        {/* <h2 className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-3">
          Welcome to KingsBaber
        </h2>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
          Where Craftsmanship Meets Comfort
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
          More than just a haircut—KingsBaber is a sanctuary for refinement, precision, and community. We preserve traditional barbering traditions while embracing modern grooming aesthetic standards.
        </p> */}
      </div>

      {/* Shop Story & Interior Preview */}
      <div className="about-story-section max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28 relative z-10">
        <div className="about-story-text space-y-6">
          <h3 className="text-3xl font-bold text-white tracking-tight">Our Heritage & Promise</h3>
          <p className="text-zinc-300 leading-relaxed text-base">
            Founded with a passion for uncompromised grooming quality, KingsBaber delivers tailored cuts and premium beard care in a relaxed, classic barbershop setting.
          </p>
          <p className="text-zinc-400 leading-relaxed text-base">
            Every appointment begins with a detailed consultation to understand your hair texture, head shape, and personal routine, ensuring you walk out looking and feeling confident.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800 text-center">
            <div>
              <p className="text-4xl font-extrabold text-amber-500">10k+</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1.5 font-semibold">Cuts Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-amber-500">15+</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1.5 font-semibold">Awards Won</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-amber-500">4.9★</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1.5 font-semibold">Client Rating</p>
            </div>
          </div>
        </div>

        <div className="about-story-img rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 relative group min-h-[384px] bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80"
            alt="KingsBaber Shop Interior"
            className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Meet the Barbers Team Section */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Meet Our Master Barbers</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-base">
            Our skilled team of artists brings years of dedication, precision techniques, and passion to every chair.
          </p>
        </div>

        <div className="barbers-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={index}
              className="barber-card bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group shadow-lg hover:shadow-amber-500/5"
            >
              <div className="h-72 overflow-hidden relative bg-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 z-10 pointer-events-none" />
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute bottom-4 left-4 bg-amber-500 text-zinc-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md z-20 shadow-md">
                  {barber.experience}
                </span>
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between relative z-20">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors duration-200">
                    {barber.name}
                  </h3>
                  <p className="text-amber-500 text-sm font-semibold mb-4 tracking-wide uppercase">
                    {barber.role}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {barber.bio}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/65 text-xs text-zinc-400 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-300 block mb-0.5">Specialty</span>
                    {barber.specialty}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;