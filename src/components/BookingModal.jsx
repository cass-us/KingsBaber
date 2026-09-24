import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  X, Check, User, Calendar, Clock, MapPin, 
  Scissors, Phone, Mail, ArrowRight, MessageSquare 
} from "lucide-react";

const BookingModal = ({ isOpen, onClose, selectedService }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: selectedService?.id || "",
    barber: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const modalRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const currentStepRef = useRef(null);
  const summaryRef = useRef(null);

  const services = [
    { id: "classic-cut", title: "The Classic Cut", price: "R145", duration: "30-40 mins" },
    { id: "beard-grooming", title: "Royal Beard Grooming", price: "R135", duration: "25-35 mins" },
    { id: "hot-shave", title: "Traditional Hot Towel Shave", price: "R150", duration: "45 mins" },
    { id: "signature", title: "The Signature Package", price: "R290", duration: "75 mins" },
  ];

  const barbers = [
    { id: "leo", name: "Leo", role: "Master Barber", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" },
    { id: "marcus", name: "Marcus", role: "Senior Stylist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
    { id: "jordan", name: "Jordan", role: "Beard Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
  ];

  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:30 PM", "01:30 PM", "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM"];

  // Initialize data selection when selectedService prop changes externally
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService.id }));
    }
  }, [selectedService]);

  // Entrance & Stagger animations when modal opens
  useEffect(() => {
    if (isOpen) {
      // Step resetting
      setStep(1);

      const ctx = gsap.context(() => {
        // Overlay fade
        gsap.fromTo(bgOverlayRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Modal entrance: Slide up and scale
        gsap.fromTo(modalRef.current,
          { y: 50, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
        );

        // Stagger list elements inside the modal
        gsap.from(".gsap-modal-stagger", {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out"
        });
      }, modalRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  // Trigger smooth timeline for step-changing animations
  const changeStep = (nextStep) => {
    const tl = gsap.timeline();
    tl.to(currentStepRef.current, {
      opacity: 0,
      x: nextStep > step ? -15 : 15,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setStep(nextStep);
      }
    });
    tl.fromTo(currentStepRef.current,
      { opacity: 0, x: nextStep > step ? 15 : -15 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    // Interactive card pop animation on click
    const element = document.getElementById(`select-${field}-${value}`);
    if (element) {
      gsap.fromTo(element, 
        { scale: 0.95 }, 
        { scale: 1, duration: 0.3, ease: "elastic.out(1.2)" }
      );
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Confirmed booking celebration
    const timeline = gsap.timeline();
    timeline.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        alert(`Appointment confirmed for ${formData.name}!`);
        onClose();
      }
    });
  };

  const selectedServiceDetails = services.find((s) => s.id === formData.service) || selectedService;
  const selectedBarberDetails = barbers.find((b) => b.id === formData.barber);

  return (
    <div 
      ref={bgOverlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-md"
    >
      {/* Background Ambience / Glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Main Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900 shadow-2xl"
      >
        
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-4.5 bg-zinc-950/30">
          <div className="space-y-0.5 gsap-modal-stagger">
            <h2 className="font-serif text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Scissors className="h-4 w-4 text-emerald-400 animate-pulse" />
              Reserve Your Chair
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Step {step} of 2 — <span className="text-emerald-400/90 font-medium">{step === 1 ? "Select barber & service" : "Verify scheduling"}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800/80 hover:text-white transition-all duration-200 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Main Interactive Forms (Stays left/center) */}
          <form 
            onSubmit={handleSubmit} 
            className="p-6 md:col-span-7 space-y-6 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          >
            <div ref={currentStepRef}>
              {step === 1 && (
                <div className="space-y-5">
                  {/* Step 1: Services Selection */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 gsap-modal-stagger">
                      <Scissors className="h-3 w-3" />
                      1. Choose Service
                    </label>
                    <div className="grid grid-cols-1 gap-2 gsap-modal-stagger">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          id={`select-service-${s.id}`}
                          type="button"
                          onClick={() => handleSelect("service", s.id)}
                          className={`group flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                            formData.service === s.id
                              ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]"
                              : "border-zinc-850 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className={`text-sm font-semibold transition-colors duration-200 ${formData.service === s.id ? "text-white" : "text-zinc-200"}`}>{s.title}</span>
                            <span className="text-[10px] text-zinc-500 mt-0.5">{s.duration}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-black text-emerald-400">{s.price}</span>
                            {formData.service === s.id && (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-zinc-950">
                                <Check className="h-3 w-3 stroke-[3px]" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Barber Choice */}
                  <div className="space-y-2.5 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 gsap-modal-stagger">
                      <User className="h-3 w-3" />
                      2. Select Barber
                    </label>
                    <div className="grid grid-cols-3 gap-3 gsap-modal-stagger">
                      {barbers.map((b) => (
                        <button
                          key={b.id}
                          id={`select-barber-${b.id}`}
                          type="button"
                          onClick={() => handleSelect("barber", b.id)}
                          className={`group relative flex flex-col items-center rounded-xl border p-3 text-center transition-all duration-300 ${
                            formData.barber === b.id
                              ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]"
                              : "border-zinc-850 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/40"
                          }`}
                        >
                          <div className="relative">
                            <img src={b.image} alt={b.name} className="h-11 w-11 rounded-full object-cover border border-zinc-800 transition-transform duration-300 group-hover:scale-105" />
                            {formData.barber === b.id && (
                              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-zinc-900">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className={`mt-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${formData.barber === b.id ? "text-white" : "text-zinc-200"}`}>{b.name}</span>
                          <span className="text-[9px] text-zinc-500 mt-0.5">{b.role}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  {/* Step 3: Schedule Date & Time */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      3. Select Date & Time
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 p-3 text-sm text-zinc-300 focus:border-emerald-500 focus:bg-zinc-950/60 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 max-h-32 overflow-y-auto border border-zinc-800/80 rounded-xl p-2 bg-zinc-950/20 scrollbar-thin scrollbar-thumb-zinc-800">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            id={`select-time-${time.replace(/[\s:]/g, '')}`}
                            type="button"
                            onClick={() => handleSelect("time", time)}
                            className={`rounded-lg py-2 text-[9px] font-semibold tracking-wide transition-all duration-200 ${
                              formData.time === time
                                ? "bg-emerald-500 text-zinc-950"
                                : "bg-zinc-850 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Profile Details */}
                  <div className="space-y-2.5 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      4. Personal Details
                    </label>
                    <div className="space-y-2.5">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 p-3 text-xs sm:text-sm text-zinc-300 focus:border-emerald-500 focus:outline-none focus:bg-zinc-950/60 transition-all duration-200"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="relative flex items-center">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 p-3 pl-8 text-xs sm:text-sm text-zinc-300 focus:border-emerald-500 focus:outline-none focus:bg-zinc-950/60 transition-all duration-200"
                          />
                          <Phone className="absolute left-3 h-3.5 w-3.5 text-zinc-500" />
                        </div>
                        <div className="relative flex items-center">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 p-3 pl-8 text-xs sm:text-sm text-zinc-200 focus:border-emerald-500 focus:outline-none focus:bg-zinc-950/60 transition-all duration-200"
                          />
                          <Mail className="absolute left-3 h-3.5 w-3.5 text-zinc-500" />
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <textarea
                          name="notes"
                          placeholder="Special instructions (fades, trim choices)..."
                          value={formData.notes}
                          onChange={handleChange}
                          rows="2"
                          className="w-full rounded-xl border border-zinc-855 bg-zinc-950/40 p-3 pl-8 text-xs sm:text-sm text-zinc-300 focus:border-emerald-500 focus:outline-none focus:bg-zinc-950/60 transition-all duration-200 resize-none"
                        />
                        <MessageSquare className="absolute left-3 top-3.5 h-3.5 w-3.5 text-zinc-500" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Action Controls */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-5">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => changeStep(1)}
                  className="rounded-xl border border-zinc-800 bg-transparent px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <div className="ml-auto">
                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!formData.service || !formData.barber}
                    onClick={() => changeStep(2)}
                    className="group flex items-center gap-1.5 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.date || !formData.time || !formData.name || !formData.phone || !formData.email}
                    className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Interactive Live Summary Section */}
          <div 
            ref={summaryRef}
            className="p-6 md:col-span-5 bg-zinc-950/40 border-t md:border-t-0 md:border-l border-zinc-800/80 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                Appointment Summary
              </h3>
              
              <div className="space-y-4 py-1">
                {/* Chosen Service card */}
                {selectedServiceDetails ? (
                  <div className="flex items-start justify-between gsap-modal-stagger">
                    <div>
                      <p className="text-sm font-semibold text-white tracking-wide">{selectedServiceDetails.title}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-light">Service</p>
                    </div>
                    <span className="text-sm font-black text-emerald-400">{selectedServiceDetails.price}</span>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-650 italic">No service selected</p>
                )}

                {/* Selected Barber Profile Card */}
                {selectedBarberDetails ? (
                  <div className="flex items-center gap-3 border-t border-zinc-900/60 pt-4.5 gsap-modal-stagger">
                    <img src={selectedBarberDetails.image} alt={selectedBarberDetails.name} className="h-9 w-9 rounded-full object-cover border border-zinc-850" />
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{selectedBarberDetails.name}</p>
                      <p className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-wider font-light">{selectedBarberDetails.role}</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-zinc-900/60 pt-4.5">
                    <p className="text-xs text-zinc-650 italic">No barber selected</p>
                  </div>
                )}

                {/* Calendar Schedule summary with user confirmation details */}
                {(formData.date || formData.time) && (
                  <div className="border-t border-zinc-900/60 pt-4.5 flex justify-between gsap-modal-stagger">
                    {formData.date && (
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">{formData.date}</p>
                        <p className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-wider font-light">Date</p>
                      </div>
                    )}
                    {formData.time && (
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">{formData.time}</p>
                        <p className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-wider font-light">Time</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Price confirmation banner */}
            {selectedServiceDetails && (
              <div className="border-t border-zinc-850 pt-5 mt-6 gsap-modal-stagger">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-light">Estimate to pay</span>
                  <span className="text-2xl font-black text-emerald-400">{selectedServiceDetails.price}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <p className="text-[9px] leading-relaxed text-zinc-400">
                    Settle details on site after service (124 Main Street, Suite 4B).
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default BookingModal;