import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, X, Sparkles, ExternalLink } from "lucide-react";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"
];

const BookingModal = ({ isOpen, onClose, service = { title: "The Classic Cut", price: "$45" } }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Helper to format dates into Google Calendar URL format (YYYYMMDDTHHmmssZ)
  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return "#";

    const [timeStr, modifier] = selectedTime.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0);

    const endDate = new Date(startDate.getTime() + 45 * 60000); // 45-min appointment duration

    const formatISO = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const title = encodeURIComponent(`Kings Barber - ${service.title}`);
    const details = encodeURIComponent(`Premier Grooming Experience at Kings Barber. Price: ${service.price}`);
    const location = encodeURIComponent("124 Main Street, Suite 4B, Downtown District");
    const dates = `${formatISO(startDate)}/${formatISO(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setConfirmed(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => { setConfirmed(false); onClose(); }}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-serif">Appointment Confirmed!</h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Your spot for <span className="font-semibold text-white">{service.title}</span> is set for{" "}
              <span className="text-emerald-400">{selectedDate}</span> at <span className="text-emerald-400">{selectedTime}</span>.
            </p>

            <div className="pt-4 space-y-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-200"
              >
                <span>Add to Google Calendar</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                onClick={() => { setConfirmed(false); onClose(); }}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Kings Barber Reservation
              </div>
              <h2 className="mt-2 text-xl font-bold text-white font-serif">Select Date & Time</h2>
              <p className="text-xs text-zinc-400">
                {service.title} — <span className="text-emerald-400 font-semibold">{service.price}</span>
              </p>
            </div>

            {/* Date Input */}
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

            {/* Time Slot Grid */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Clock className="h-3.5 w-3.5 text-emerald-400" /> Available Slots
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
