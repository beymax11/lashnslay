"use client";

import React from "react";
import { ReservationWithClient } from "../admin-dashboard";

interface AnalyticsTabProps {
  appointments: ReservationWithClient[];
  metrics: {
    totalBookings: number;
    revenue: number;
    pendingCount: number;
    completedCount: number;
  };
}

export default function AnalyticsTab({ appointments, metrics }: AnalyticsTabProps) {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="border-b border-luxury-light-gray dark:border-neutral-800 pb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          METRIC DASHBOARD
        </span>
        <h2 className="font-serif text-3xl font-light uppercase tracking-wider text-luxury-black dark:text-white mt-1">
          Salon Performance
        </h2>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800 relative transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute top-3 right-4 text-[9px] font-serif text-neutral-300 dark:text-neutral-700 italic">
            I
          </div>
          <h4 className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-semibold">
            Total Bookings
          </h4>
          <p className="font-serif text-4xl xl:text-5xl font-light tracking-wide mt-4 text-luxury-black dark:text-white">
            {metrics.totalBookings}
          </p>
          <div className="text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-550 uppercase mt-3 font-light">
            All Salon Bookings
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800 relative transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute top-3 right-4 text-[9px] font-serif text-neutral-300 dark:text-neutral-700 italic">
            II
          </div>
          <h4 className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-semibold">
            Projected Revenue
          </h4>
          <p className="font-serif text-4xl xl:text-5xl font-light tracking-wide mt-4 text-luxury-black dark:text-white">
            ${metrics.revenue}
          </p>
          <div className="text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-550 uppercase mt-3 font-light">
            Confirmed & Completed
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800 relative transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute top-3 right-4 text-[9px] font-serif text-neutral-300 dark:text-neutral-700 italic">
            III
          </div>
          <h4 className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-semibold">
            Pending Review
          </h4>
          <p className="font-serif text-4xl xl:text-5xl font-light tracking-wide mt-4 text-luxury-black dark:text-white">
            {metrics.pendingCount}
          </p>
          <div className="text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-550 uppercase mt-3 font-light">
            Awaiting Admin Action
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800 relative transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute top-3 right-4 text-[9px] font-serif text-neutral-300 dark:text-neutral-700 italic">
            IV
          </div>
          <h4 className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-semibold">
            Fulfilled Designs
          </h4>
          <p className="font-serif text-4xl xl:text-5xl font-light tracking-wide mt-4 text-luxury-black dark:text-white">
            {metrics.completedCount}
          </p>
          <div className="text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-550 uppercase mt-3 font-light">
            Completed Appointments
          </div>
        </div>
      </div>

      {/* Graphic charts substitute using beautiful layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Services list */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800">
          <h3 className="font-serif text-lg tracking-[0.15em] uppercase border-b border-luxury-light-gray dark:border-neutral-800 pb-3 mb-5 text-luxury-black dark:text-white">
            Popular Services
          </h3>
          <div className="space-y-5">
            {[
              {
                name: "Cashmere Volume Custom Set",
                share: "45%",
                count: appointments.filter((a) =>
                  a.serviceName.includes("Cashmere Volume")
                ).length,
              },
              {
                name: "Classic Silk Custom Set",
                share: "25%",
                count: appointments.filter((a) =>
                  a.serviceName.includes("Classic Silk")
                ).length,
              },
              {
                name: "Couture Hybrid Set",
                share: "20%",
                count: appointments.filter((a) =>
                  a.serviceName.includes("Couture Hybrid")
                ).length,
              },
              {
                name: "Lash Lift & Tint",
                share: "10%",
                count: appointments.filter((a) =>
                  a.serviceName.includes("Lash Lift")
                ).length,
              },
            ].map((srv, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <p className="font-semibold uppercase tracking-wider text-neutral-855 dark:text-neutral-200">
                    {srv.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light">
                    {srv.count} appointment(s)
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-mono text-luxury-black dark:text-white font-semibold">
                    {srv.share}
                  </span>
                  <div className="w-16 h-[2px] bg-luxury-light-gray dark:bg-neutral-800 mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-luxury-black dark:bg-white"
                      style={{ width: srv.share }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Stylists List */}
        <div className="bg-luxury-white dark:bg-neutral-900 p-6 border border-luxury-light-gray dark:border-neutral-800">
          <h3 className="font-serif text-lg tracking-[0.15em] uppercase border-b border-luxury-light-gray dark:border-neutral-800 pb-3 mb-5 text-luxury-black dark:text-white">
            Stylist Workload
          </h3>
          <div className="space-y-5">
            {[
              {
                name: "Isabella Thorne",
                role: "Master Lash Stylist",
                count: appointments.filter((a) => a.stylistName === "Isabella Thorne")
                  .length,
              },
              {
                name: "Sophia Martinez",
                role: "Elite Volume Artisan",
                count: appointments.filter((a) => a.stylistName === "Sophia Martinez")
                  .length,
              },
              {
                name: "Genevieve Dubois",
                role: "Classic & Lash Lift Specialist",
                count: appointments.filter((a) => a.stylistName === "Genevieve Dubois")
                  .length,
              },
            ].map((stylist, idx) => {
              const totalAppts = appointments.length || 1;
              const percentage = Math.round((stylist.count / totalAppts) * 100);
              return (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <p className="font-semibold uppercase tracking-wider text-neutral-855 dark:text-neutral-200">
                      {stylist.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light">
                      {stylist.role}
                    </p>
                  </div>
                  <div className="text-right font-light text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-luxury-black dark:text-white">
                      {stylist.count} Booking(s)
                    </span>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">
                      {percentage}% workload
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
