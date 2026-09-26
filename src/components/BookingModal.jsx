import React from 'react';

const barbers = [
  {
    name: 'Marcus "The Razor" Vance',
    role: 'Master Barber & Founder',
    experience: '12+ Years Experience',
    specialty: 'Precision Fades & Hot Towel Shaves',
    image: 'image_agent_tag_4898397653752859994',
    bio: 'Crafting sharp looks and timeless cuts since day one. Dedicated to perfection with every blade stroke.',
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Hair Stylist',
    experience: '8 Years Experience',
    specialty: 'Modern Texturized Cuts & Beard Sculpting',
    image: 'image_agent_tag_4898397653752856809',
    bio: 'Combining modern styling trends with classic barbering techniques for effortless everyday looks.',
  },
  {
    name: 'David "D-Cut" Miller',
    role: 'Beard & Detail Specialist',
    experience: '6 Years Experience',
    specialty: 'Beard Grooming, Line-ups & Hair Art',
    image: 'image_agent_tag_4898397653752857720',
    bio: 'Specializing in intricate lineup detailing and custom beard care to elevate your personal style.',
  },
];

export default function About() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-2">
          Welcome to KingsBaber
        </h2>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Where Craftsmanship Meets Comfort
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          More than just a haircut—KingsBaber is a sanctuary for refinement, precision, and community. We preserve traditional barbering traditions while embracing modern grooming aesthetic standards.
        </p>
      </div>

      {/* Shop Story & Interior Preview */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Our Heritage & Promise</h3>
          <p className="text-slate-300 leading-relaxed">
            Founded with a passion for uncompromised grooming quality, KingsBaber delivers tailored cuts and premium beard care in a relaxed, classic barbershop setting.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Every appointment begins with a detailed consultation to understand your hair texture, head shape, and personal routine, ensuring you walk out looking and feeling confident.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-500">10k+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Cuts Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-500">15+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Awards Won</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-500">4.9★</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Client Rating</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          <img
            src="image_agent_tag_4898397653752858631"
            alt="KingsBaber Shop Interior"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
      </div>

      {/* Meet the Barbers Team Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Meet Our Master Barbers</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Our skilled team of artists brings years of dedication, precision techniques, and passion to every chair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded">
                  {barber.experience}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                  <p className="text-amber-500 text-sm font-medium mb-3">{barber.role}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{barber.bio}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Specialty: </span>
                  {barber.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export defaultBookingModal;
