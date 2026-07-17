"use client";

import React, { useState } from "react";
import { Reservation } from "@/context/auth-context";
import { ReservationWithClient } from "../admin-dashboard";

interface AppointmentsTabProps {
  appointments: ReservationWithClient[];
  onUpdateStatus: (userEmail: string, resId: string, status: Reservation["status"]) => void;
  onStartReschedule: (appt: ReservationWithClient) => void;
  onCancelBooking: (userEmail: string, resId: string) => void;
}

export default function AppointmentsTab({
  appointments,
  onUpdateStatus,
  onStartReschedule,
  onCancelBooking,
}: AppointmentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtered Appointments
  const filteredAppointments = appointments.filter((appt) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      appt.userName.toLowerCase().includes(query) ||
      appt.userEmail.toLowerCase().includes(query) ||
      appt.serviceName.toLowerCase().includes(query) ||
      appt.code.toLowerCase().includes(query);
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "pending" && (!appt.status || appt.status === "pending")) ||
      appt.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-luxury-light-gray dark:border-neutral-800 pb-6">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
            SALON SCHEDULE
          </span>
          <h2 className="font-serif text-3xl font-light uppercase tracking-wider text-luxury-black dark:text-white mt-1">
            Bookings & Clients
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, service, code..."
            className="flex-1 md:w-60 px-4 py-2.5 text-xs border border-luxury-light-gray dark:border-neutral-700 bg-luxury-white dark:bg-neutral-800 focus:border-luxury-black dark:focus:border-white focus:outline-none text-luxury-black dark:text-white tracking-wide transition-all font-light"
          />

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-xs border border-luxury-light-gray dark:border-neutral-700 bg-luxury-white dark:bg-neutral-800 focus:border-luxury-black dark:focus:border-white focus:outline-none text-luxury-black dark:text-white tracking-widest uppercase transition-all font-light"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="border border-luxury-light-gray dark:border-neutral-800 bg-luxury-white dark:bg-neutral-900 p-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-light">
            No salon appointments found matching current filters.
          </span>
        </div>
      ) : (
        <div className="border border-luxury-light-gray dark:border-neutral-800 bg-luxury-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-luxury-light-gray dark:border-neutral-800 bg-luxury-soft-white dark:bg-neutral-850 uppercase tracking-[0.25em] font-semibold text-[9px] text-neutral-400 dark:text-neutral-500">
                  <th className="py-4.5 px-6">Code</th>
                  <th className="py-4.5 px-6">Client</th>
                  <th className="py-4.5 px-6">Service Details</th>
                  <th className="py-4.5 px-6">Stylist</th>
                  <th className="py-4.5 px-6">Date & Time</th>
                  <th className="py-4.5 px-6 text-right">Price</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-light-gray dark:divide-neutral-800">
                {filteredAppointments.map((appt) => {
                  const status = appt.status || "pending";
                  return (
                    <tr key={appt.id} className="hover:bg-luxury-soft-white/40 dark:hover:bg-neutral-800/20 transition-colors">
                      <td className="py-5 px-6 font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase">
                        {appt.code}
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-semibold text-luxury-black dark:text-white uppercase tracking-wider">
                          {appt.userName}
                        </div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-550 mt-1">
                          {appt.userEmail}
                        </div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-555">
                          {appt.userPhone}
                        </div>
                      </td>
                      <td className="py-5 px-6 uppercase tracking-wide text-neutral-800 dark:text-neutral-200 font-medium">
                        {appt.serviceName}
                      </td>
                      <td className="py-5 px-6 font-light text-neutral-500 dark:text-neutral-400">
                        {appt.stylistName}
                      </td>
                      <td className="py-5 px-6 font-semibold text-neutral-700 dark:text-neutral-300">
                        <div>{appt.date}</div>
                        <div className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500 mt-0.5">
                          {appt.time}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right font-mono font-semibold text-luxury-black dark:text-white">
                        ${appt.price}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-block px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-semibold border ${
                          status === "pending" ? "border-neutral-300 dark:border-neutral-700 text-neutral-400 bg-transparent" :
                          status === "confirmed" ? "border-luxury-black dark:border-neutral-300 text-luxury-black dark:text-neutral-300 bg-transparent" :
                          status === "completed" ? "border-luxury-black dark:border-white bg-luxury-black dark:bg-white text-luxury-white dark:text-neutral-900" :
                          "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-600 line-through bg-transparent"
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                          {status === "pending" && (
                            <button
                              onClick={() => onUpdateStatus(appt.userEmail, appt.id, "confirmed")}
                              className="w-full sm:w-auto px-3 py-1.5 bg-luxury-black dark:bg-white dark:text-neutral-900 text-luxury-white border border-luxury-black dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-luxury-black dark:hover:text-white text-[9px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 cursor-pointer focus:outline-none"
                            >
                              Confirm
                            </button>
                          )}
                          {status === "confirmed" && (
                            <button
                              onClick={() => onUpdateStatus(appt.userEmail, appt.id, "completed")}
                              className="w-full sm:w-auto px-3 py-1.5 bg-luxury-black dark:bg-white dark:text-neutral-900 text-luxury-white border border-luxury-black dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-luxury-black dark:hover:text-white text-[9px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 cursor-pointer focus:outline-none"
                            >
                              Complete
                            </button>
                          )}
                          {status !== "cancelled" && status !== "completed" && (
                            <button
                              onClick={() => onStartReschedule(appt)}
                              className="w-full sm:w-auto px-3 py-1.5 border border-luxury-light-gray dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 hover:text-luxury-black dark:hover:text-white hover:border-luxury-black dark:hover:border-white text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-400 cursor-pointer focus:outline-none"
                            >
                              Reschedule
                            </button>
                          )}
                          {status !== "cancelled" && (
                            <button
                              onClick={() => onCancelBooking(appt.userEmail, appt.id)}
                              className="w-full sm:w-auto px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-500 hover:text-red-650 hover:border-red-650 hover:text-red-600 hover:border-red-600 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-400 cursor-pointer focus:outline-none"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
