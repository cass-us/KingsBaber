import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Calendar, Clock, CheckCircle2, X, Sparkles, AlertCircle, User, Mail, Phone, Scissors, ArrowRight, ArrowLeft } from "lucide-react";

// Dynamically generates time slots based on opening/closing hours and duration
const generateTimeSlots = (openHour = 9, closeHour = 17, intervalMinutes = 45) => {
  const slots = [];
  let currentMinutes = openHour * 60;
  const endMinutes = closeHour * 60;

  while (currentMinutes + intervalMinutes <= endMinutes) {
    const hours24 = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    
    const modifier = hours24 >= 12 ? "PM" : "AM";
    let hours12 = hours24 % 12;
    hours12 = hours12 ? hours12 : 12;
    
    const formattedHours = hours12 < 10 ? `0${hours12}` : hours12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    slots.push(`${formattedHours}:${formattedMinutes} ${modifier}`);

    currentMinutes += intervalMinutes;
  }
  return slots;
};

const timeSlots = generateTimeSlots(9, 17, 45);

const masterBarbers = [
  { id: "marcus", name: "Marcus Vance", role: "Master Fade Specialist" },
  { id: "elena", name: "Elena Rostova", role: "Beard & Hot Towel Expert" },
  { id: "david", name: "David 'Blade' King", role: "Classic & Modern Stylist" }
];

const BookingModal = ({ isOpen, onClose, service = { title: "The Classic Cut", price: "$45" } }) => {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedBarber, setSelectedBarber] = useState(masterBarbers[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getEventDateTimes = () => {
    if (!selectedDate || !selectedTime) return { startISO: "", endISO: "" };

    const [timeStr, modifier] = selectedTime.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0);

    const endDate = new Date(startDate.getTime() + 45 * 60000);

    return {
      startISO: startDate.toISOString(),
      endISO: endDate.toISOString(),
    };
  };

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setErrorMsg("");

      const { startISO, endISO } = getEventDateTimes();

      try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: `Kings Barber: ${service.title} with ${selectedBarber.name}`,
            location: "124 Main Street, Suite 4B, Downtown District",
            description: `Client: ${clientName} (${clientEmail}, ${clientPhone})\nBarber: ${selectedBarber.name}\nService: ${service.title} (${service.price})`,
            start: { dateTime: startISO },
            end: { dateTime: endISO },
            attendees: clientEmail ? [{ email: clientEmail }] : [],
          }),
        });

        if (response.ok) {
          setConfirmed(true);
        } else {
          const errData = await response.json();
          setErrorMsg(errData.error?.message || "Failed to add event to calendar.");
        }
      } catch (err) {
        setErrorMsg("Network error connecting to Google Calendar.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErrorMsg("Google Authentication was canceled or failed."),
  });

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmed(false);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setSelectedDate("");
    setSelectedTime("");
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-serif">Appointment Confirmed!</h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-white">{clientName}</span>! Your session for <span className="text-emerald-400">{service.title}</span> with <span className="text-white font-semibold">{selectedBarber.name}</span> on <span className="text-emerald-400">{selectedDate}</span> at <span className="text-emerald-400">{selectedTime}</span> has been synced to your calendar.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Kings Barber Reservation (Step {step} of 2)
              </div>
              <h2 className="mt-2 text-xl font-bold text-white font-serif">
                {step === 1 ? "Client Details & Barber" : "Select Date & Time"}
              </h2>
              <p className="text-xs text-zinc-400">
                {service.title} — <span className="text-emerald-400 font-semibold">{service.price}</span>
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <User className="h-3.5 w-3.5 text-emerald-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Mail className="h-3.5 w-3.5 text-emerald-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 82 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Scissors className="h-3.5 w-3.5 text-emerald-400" /> Choose Barber
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {masterBarbers.map((barber) => (
                      <button
                        key={barber.id}
                        type="button"
                        onClick={() => setSelectedBarber(barber)}
                        className={`rounded-xl border p-2.5 text-left transition-all ${
                          selectedBarber.id === barber.id
                            ? "border-emerald-500 bg-emerald-500/20 text-white shadow-lg shadow-emerald-500/10"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{barber.name}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{barber.role}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!clientName || !clientEmail || !clientPhone}
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 mt-2"
                >
                  <span>Next: Choose Date & Time</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 text-emerald-400" /> Choose Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" /> Available Slots with {selectedBarber.name}
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 max-h-48 overflow-y-auto pr-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                          selectedTime === slot
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10"
                            : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  <button
                    type="button"
                    disabled={!selectedDate || !selectedTime || loading}
                    onClick={() => login()}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500"
                  >
                    {loading ? "Syncing Calendar..." : "Confirm & Sync to Google Calendar"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;