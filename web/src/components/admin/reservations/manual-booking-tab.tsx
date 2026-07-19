"use client";

import React, { useState, useEffect } from "react";

interface ManualBookingTabProps {
  onBookingCreated: () => void;
}

export default function ManualBookingTab({ onBookingCreated }: ManualBookingTabProps) {
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newService, setNewService] = useState("Package 1");
  const [newPrice, setNewPrice] = useState(499);
  const [blockoutDate, setBlockoutDate] = useState("");
  const [blockoutTime, setBlockoutTime] = useState("");
  const [blockoutStylist, setBlockoutStylist] = useState("Isabella Thorne");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Adjust price based on service
  useEffect(() => {
    if (newService.includes("Package 1")) setNewPrice(499);
    else if (newService.includes("Package 2")) setNewPrice(799);
    else if (newService.includes("Package 3")) setNewPrice(1299);
  }, [newService]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientEmail || !newClientName || !blockoutDate || !blockoutTime) return;

    try {
      const allUsersStr = localStorage.getItem("lashnslay_all_users");
      const parsedUsers = allUsersStr ? JSON.parse(allUsersStr) : {};
      const normalizedEmail = newClientEmail.trim().toLowerCase();

      // Check if user exists, otherwise create
      if (!parsedUsers[normalizedEmail]) {
        parsedUsers[normalizedEmail] = {
          name: newClientName,
          email: normalizedEmail,
          phone: newClientPhone || "+1 555-010-0000",
          memberCode: `•••• ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(
            1000 + Math.random() * 9000
          )}`,
          points: 0,
          tier: "Silver Essential",
          reservations: [],
          password: "password123",
        };
      }

      const newId = `res-${Math.floor(100000 + Math.random() * 900000)}`;
      const randCode = `RES-${Math.floor(10000 + Math.random() * 90000)}-2026`;

      const newReservation = {
        id: newId,
        serviceName: newService,
        stylistName: blockoutStylist,
        date: blockoutDate,
        time: blockoutTime,
        price: newPrice,
        code: randCode,
        status: "confirmed",
      };

      parsedUsers[normalizedEmail].reservations.unshift(newReservation);
      localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));

      // Reset Form
      setNewClientName("");
      setNewClientEmail("");
      setNewClientPhone("");
      setBlockoutDate("");
      setBlockoutTime("");
      setIsSubmitSuccess(true);
      setTimeout(() => setIsSubmitSuccess(false), 3000);

      onBookingCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-2xl">
      <div className="border-b border-luxury-light-gray dark:border-neutral-800 pb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          NEW APPOINTMENT
        </span>
        <h2 className="font-serif text-3xl font-light uppercase tracking-wider text-luxury-black dark:text-white mt-1">
          Manual Reservation
        </h2>
      </div>

      {isSubmitSuccess && (
        <div className="p-4 bg-neutral-55 dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-750 text-xs text-luxury-black dark:text-white uppercase tracking-[0.2em] font-semibold text-center animate-fade-in">
          ✓ Booking successfully created and added to the client schedule!
        </div>
      )}

      <form
        onSubmit={handleCreateBooking}
        className="space-y-8 bg-luxury-white dark:bg-neutral-900 p-8 border border-luxury-light-gray dark:border-neutral-800 relative"
      >
        {/* Frame border */}
        <div className="absolute inset-2 border border-luxury-light-gray/60 dark:border-neutral-800/60 pointer-events-none" />

        <h3 className="font-serif text-lg tracking-[0.15em] uppercase border-b border-luxury-light-gray dark:border-neutral-800 pb-3 mb-6 text-luxury-black dark:text-white">
          Reservation Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Client Full Name *
            </label>
            <input
              type="text"
              required
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="e.g. Jean Patou"
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs tracking-wide font-light text-luxury-black dark:text-white transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Client Email *
            </label>
            <input
              type="email"
              required
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
              placeholder="e.g. jean@paris.com"
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs tracking-wide font-light text-luxury-black dark:text-white transition-all duration-300"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Client Phone
            </label>
            <input
              type="text"
              value={newClientPhone}
              onChange={(e) => setNewClientPhone(e.target.value)}
              placeholder="e.g. +1 555-888-9999"
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs tracking-wide font-light text-luxury-black dark:text-white transition-all duration-300"
            />
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Select Service *
            </label>
            <select
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs tracking-wide transition-all duration-300 uppercase text-luxury-black dark:text-white"
            >
              <option value="Package 1">
                Package 1 (₱499)
              </option>
              <option value="Package 2">
                Package 2 (₱799)
              </option>
              <option value="Package 3 (2 Heads)">
                Package 3 (2 Heads) (₱1299)
              </option>
            </select>
          </div>

          {/* Stylist */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Assigned Lash Stylist *
            </label>
            <select
              value={blockoutStylist}
              onChange={(e) => setBlockoutStylist(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs tracking-wide transition-all duration-300 text-luxury-black dark:text-white"
            >
              <option value="Isabella Thorne">Isabella Thorne (Master)</option>
              <option value="Sophia Martinez">Sophia Martinez (Elite Volume)</option>
              <option value="Genevieve Dubois">
                Genevieve Dubois (Classic Specialist)
              </option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Price (₱) *
            </label>
            <input
              type="number"
              required
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs font-mono font-semibold text-luxury-black dark:text-white"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Date *
            </label>
            <input
              type="date"
              required
              value={blockoutDate}
              onChange={(e) => setBlockoutDate(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs text-luxury-black dark:text-white"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Time Slot *
            </label>
            <select
              value={blockoutTime}
              onChange={(e) => setBlockoutTime(e.target.value)}
              required
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:border-luxury-black dark:focus:border-white focus:outline-none text-xs text-luxury-black dark:text-white"
            >
              <option value="">Select Time...</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:30 PM">1:30 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>
        </div>

        <div className="pt-4 relative z-10">
          <button
            type="submit"
            className="px-8 py-4 bg-luxury-black dark:bg-white dark:text-neutral-900 text-luxury-white border border-luxury-black dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-luxury-black dark:hover:text-white text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-400 shadow-sm cursor-pointer focus:outline-none"
          >
            Confirm Booking Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
