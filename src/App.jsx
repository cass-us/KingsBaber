import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingModal from "./components/BookingModal";

export default function App() {
  // State to manage whether the modal is open (true) or closed (false)
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // State to track if the user has pre-selected a specific service card
  const [selectedService, setSelectedService] = useState(null);

  // Trigger to open the booking modal
  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  // Trigger to close the booking modal
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  // Handler for selecting a specific service (like clicking "More Info" or "Book Appointment" in Services)
  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsBookingOpen(true); // Automatically open modal when a service is selected
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Navigation Bar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onSelectService={handleSelectService}
      />

      {/* Services Section */}
      <Services
        onOpenBooking={handleOpenBooking}
        onSelectService={handleSelectService}
      />

      {/* Interactive Booking Modal Overlay */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedService={selectedService}
      />
    </div>
  );
}