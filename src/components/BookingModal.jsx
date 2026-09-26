import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { CheckCircle2, X, Sparkles, AlertCircle, User, Mail, Phone, Calendar } from "lucide-react";

const BookingModal = ({ isOpen, onClose, service = { title: "The Classic Cut", price: "R145" } }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setErrorMsg("");

      // Automatically set the appointment for tomorrow at 10:00 AM (or adjust as needed)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(10, 0, 0, 0);

      const endDate = new Date(startDate.getTime() + 45 * 60000); // 45-minute session

      try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: `Kings Barber: ${service.title}`,
            location: "124 Main Street, Suite 4B, Downtown District",
            description: `Client: ${clientName} (${clientEmail}, ${clientPhone})\nService: ${service.title} (${service.price})`,
            start: { dateTime: startDate.toISOString() },
            end: { dateTime: endDate.toISOString() },
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
    setConfirmed(false);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-amber-500 animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-serif">Appointment Confirmed!</h3>
            <p className="text-sm text-zinc-300 max-w-xs mx-auto">
              Thank you, <span className="font-semibold text-white">{clientName}</span>! Your session for <span className="text-amber-500">{service.title}</span> has been successfully synced to your Google Calendar.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 w-full rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-400 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                Quick Booking
              </div>
              <h2 className="mt-2 text-xl font-bold text-white font-serif">
                Book Your Appointment
              </h2>
              <p className="text-xs text-zinc-400">
                {service.title} — <span className="text-amber-500 font-semibold">{service.price}</span>
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <User className="h-3.5 w-3.5 text-amber-500" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <Mail className="h-3.5 w-3.5 text-amber-500" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <Phone className="h-3.5 w-3.5 text-amber-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+27 82 123 4567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-amber-400 disabled:opacity-40 mt-2"
              >
                <Calendar className="h-4 w-4" />
                <span>{loading ? "Approving & Syncing..." : "Book & Add to Calendar"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
