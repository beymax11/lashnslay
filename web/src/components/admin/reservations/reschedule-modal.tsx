"use client";

import React, { useState } from "react";
import { ReservationWithClient } from "@/components/admin/dashboard/admin-dashboard";

interface RescheduleModalProps {
  appt: ReservationWithClient;
  onClose: () => void;
  onSave: (date: string, time: string, stylist: string) => void;
}

export default function RescheduleModal({
  appt,
  onClose,
  onSave,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState(appt.date);
  const [newTime, setNewTime] = useState(appt.time);
  const [newStylist, setNewStylist] = useState(appt.stylistName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newDate, newTime, newStylist);
  };

  return (
    <div className="fixed inset-0 bg-luxury-black/45 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md bg-luxury-white dark:bg-neutral-900 border border-luxury-light-gray dark:border-neutral-800 p-8 shadow-2xl relative">
        {/* Frame border */}
        <div className="absolute inset-2 border border-luxury-light-gray/60 dark:border-neutral-800/60 pointer-events-none" />

        <h3 className="font-serif text-xl tracking-[0.15em] uppercase border-b border-luxury-light-gray dark:border-neutral-800 pb-3 mb-6 text-luxury-black dark:text-white">
          Reschedule Appointment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs relative z-10">
          <div className="p-4 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 font-light">
            <span className="font-semibold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block text-[9px] mb-1">
              CLIENT
            </span>
            <span className="uppercase font-semibold text-luxury-black dark:text-white">
              {appt.userName}
            </span>
            <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 uppercase tracking-wider">
              {appt.serviceName} (${appt.price})
            </span>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              New Booking Date
            </label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:outline-none text-xs text-luxury-black dark:text-white focus:border-luxury-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              New Time Slot
            </label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              required
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:outline-none text-xs text-luxury-black dark:text-white focus:border-luxury-black dark:focus:border-white transition-all duration-300"
            >
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:30 PM">1:30 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>

          {/* Stylist */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Assigned Lash Stylist
            </label>
            <select
              value={newStylist}
              onChange={(e) => setNewStylist(e.target.value)}
              required
              className="w-full px-4 py-3 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 focus:outline-none text-xs text-luxury-black dark:text-white focus:border-luxury-black dark:focus:border-white transition-all duration-300"
            >
              <option value="Isabella Thorne">Isabella Thorne</option>
              <option value="Sophia Martinez">Sophia Martinez</option>
              <option value="Genevieve Dubois">Genevieve Dubois</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-luxury-black dark:bg-white dark:text-neutral-900 text-luxury-white border border-luxury-black dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-luxury-black dark:hover:text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 cursor-pointer focus:outline-none"
            >
              Save Schedule
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-luxury-light-gray dark:border-neutral-700 text-neutral-400 hover:text-luxury-black dark:hover:text-white hover:border-luxury-black dark:hover:border-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 cursor-pointer focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
