import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

const barbers = [
  {
    name: 'Marcus "The Razor" Vance',
    role: 'Master Barber & Founder',
    experience: '12+ Years Experience',
    specialty: 'Precision Fades & Hot Towel Shaves',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Crafting sharp looks and timeless cuts since day one. Dedicated to perfection with every blade stroke.',
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Hair Stylist',
    experience: '8 Years Experience',
    specialty: 'Modern Texturized Cuts & Beard Sculpting',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Combining modern styling trends with classic barbering techniques for effortless everyday looks.',
  },
  {
    name: 'David "D-Cut" Miller',
    role: 'Beard & Detail Specialist',
    experience: '6 Years Experience',
    specialty: 'Beard Grooming, Line-ups & Hair Art',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    bio: 'Specializing in intricate lineup detailing and custom beard care to elevate your personal style.',
  },
];

function About() {
  return (
    <section
      id="about"
      className="bg-white text-zinc-900 min-h-screen py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden font-sans border-t border-slate-100"
    >
      {/* Background Creative Ambient Accents */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Shop Story & Interior Preview */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 relative z-10">
        
        {/* Left Story Text */}
        <div className="space-y-6 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Our Heritage & Promise
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Where Craftsmanship Meets <span className="text-amber-600">Modern Luxury</span>
          </h2>

          <p className="text-zinc-600 leading-relaxed text-base font-light">
            Founded with a passion for uncompromised grooming quality, Kings Barber delivers tailored cuts and premium beard care in a relaxed, sophisticated setting.
          </p>

          <p className="text-zinc-600 leading-relaxed text-base font-light">
            Every appointment begins with a detailed consultation to understand your hair texture, face shape, and personal routine, ensuring you walk out looking and feeling extraordinary.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-center">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <p className="text-3xl font-black text-amber-600">10k+</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1 font-semibold">Cuts Delivered</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <p className="text-3xl font-black text-amber-600">15+</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1 font-semibold">Awards Won</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <p className="text-3xl font-black text-amber-600">4.9★</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1 font-semibold">Client Rating</p>
            </div>
          </div>
        </div>

        {/* Right Showroom Image Showcase */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-200 relative group min-h-[420px] bg-slate-100 lg:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80"
            alt="Kings Barber Shop Interior"
            className="w-full h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md px-5 py-3.5 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">State of the Art</p>
                <p className="text-[11px] text-zinc-500">Equipped for ultimate comfort</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Meet the Barbers Team Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Meet Our <span className="text-amber-600">Master Barbers</span>
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-light">
            Our skilled team of artists brings years of dedication, precision techniques, and passion to every single chair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col group shadow-md"
            >
              <div className="h-80 overflow-hidden relative bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 z-10 pointer-events-none" />
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <span className="absolute bottom-4 left-4 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full z-20 shadow-md">
                  {barber.experience}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between relative z-20 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors duration-200">
                    {barber.name}
                  </h3>
                  <p className="text-amber-600 text-xs font-semibold tracking-wider uppercase">
                    {barber.role}
                  </p>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-light pt-2">
                    {barber.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-700 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-900 block mb-0.5 text-[11px] uppercase tracking-wider">Specialty</span>
                    <span className="font-light text-zinc-600">{barber.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
