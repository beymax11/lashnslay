"use client";

import React from "react";
import { ReservationWithClient } from "@/components/admin/dashboard/admin-dashboard";

interface BookingDetailsModalProps {
  appt: ReservationWithClient;
  onClose: () => void;
}

export default function BookingDetailsModal({
  appt,
  onClose,
}: BookingDetailsModalProps) {
  const status = appt.status || "pending";

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md bg-luxury-white dark:bg-neutral-900 border border-luxury-light-gray dark:border-neutral-800 p-8 shadow-2xl relative">
        {/* Frame border */}
        <div className="absolute inset-2 border border-luxury-light-gray/60 dark:border-neutral-800/60 pointer-events-none" />

        {/* Close Button on top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:opacity-70 transition-opacity focus:outline-none cursor-pointer text-luxury-black dark:text-neutral-200"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-serif text-xl tracking-[0.15em] uppercase border-b border-luxury-light-gray dark:border-neutral-800 pb-3 mb-6 text-luxury-black dark:text-white">
          Booking Details
        </h3>

        <div className="space-y-6 text-xs relative z-10">
          {/* Booking Code */}
          <div className="flex justify-between items-center p-4 bg-luxury-soft-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 font-mono text-xs uppercase tracking-wide">
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">Booking Code</span>
            <span className="text-luxury-black dark:text-white font-bold">{appt.code}</span>
          </div>

          {/* Client Profile */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 border-b border-luxury-light-gray/40 dark:border-neutral-800 pb-1">Client Profile</h4>
            <div className="text-xs space-y-2 mt-2">
              <div className="flex justify-between"><span className="text-neutral-400">Name:</span> <span className="font-semibold uppercase tracking-wider text-luxury-black dark:text-white">{appt.userName}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Email:</span> <span className="text-neutral-600 dark:text-neutral-300 font-light">{appt.userEmail}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Phone:</span> <span className="text-neutral-600 dark:text-neutral-300 font-light">{appt.userPhone}</span></div>
            </div>
          </div>

          {/* Service & Stylist */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 border-b border-luxury-light-gray/40 dark:border-neutral-800 pb-1">Service & Stylist</h4>
            <div className="text-xs space-y-2 mt-2">
              <div className="flex justify-between"><span className="text-neutral-400">Service:</span> <span className="font-semibold uppercase text-luxury-black dark:text-white">{appt.serviceName}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Stylist:</span> <span className="text-luxury-black dark:text-white font-light">{appt.stylistName}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Price:</span> <span className="font-semibold font-mono text-luxury-black dark:text-white">₱{appt.price}</span></div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 border-b border-luxury-light-gray/40 dark:border-neutral-800 pb-1">Schedule</h4>
            <div className="text-xs space-y-2 mt-2">
              <div className="flex justify-between"><span className="text-neutral-400">Date:</span> <span className="text-luxury-black dark:text-white font-light">{appt.date}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Time:</span> <span className="text-luxury-black dark:text-white font-light">{appt.time}</span></div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 border-b border-luxury-light-gray/40 dark:border-neutral-800 pb-1">Status</h4>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-neutral-400">Current Status:</span>
              <span className={`inline-block px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-semibold border ${
                status === "pending" ? "border-neutral-300 dark:border-neutral-700 text-neutral-400 bg-transparent" :
                status === "confirmed" ? "border-luxury-black dark:border-neutral-300 text-luxury-black dark:text-neutral-300 bg-transparent" :
                status === "completed" ? "border-luxury-black dark:border-white bg-luxury-black dark:bg-white text-luxury-white dark:text-neutral-900" :
                "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-600 line-through bg-transparent"
              }`}>
                {status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full py-4 bg-luxury-black dark:bg-white dark:text-neutral-900 text-luxury-white border border-luxury-black dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-luxury-black dark:hover:text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 cursor-pointer focus:outline-none"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
