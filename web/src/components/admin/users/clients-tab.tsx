"use client";

import React from "react";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
}

interface ClientsTabProps {
  clientDirectory: ClientData[];
}

export default function ClientsTab({ clientDirectory }: ClientsTabProps) {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="border-b border-luxury-light-gray dark:border-neutral-800 pb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          MEMBER REGISTER
        </span>
        <h2 className="font-serif text-3xl font-light uppercase tracking-wider text-luxury-black dark:text-white mt-1">
          Client Directory
        </h2>
      </div>

      {clientDirectory.length === 0 ? (
        <div className="border border-luxury-light-gray dark:border-neutral-800 bg-luxury-white dark:bg-neutral-900 p-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-light">
            No salon clients found in the system yet.
          </span>
        </div>
      ) : (
        <div className="border border-luxury-light-gray dark:border-neutral-800 bg-luxury-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-luxury-light-gray dark:border-neutral-800 bg-luxury-soft-white dark:bg-neutral-850 uppercase tracking-[0.25em] font-semibold text-[9px] text-neutral-400 dark:text-neutral-500">
                  <th className="py-4.5 px-6">Client Name</th>
                  <th className="py-4.5 px-6">Email Address</th>
                  <th className="py-4.5 px-6">Contact Phone</th>
                  <th className="py-4.5 px-6 text-center">Total Bookings</th>
                  <th className="py-4.5 px-6 text-right">Est. Lifetime Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-light-gray dark:divide-neutral-800">
                {clientDirectory.map((client, idx) => (
                  <tr key={idx} className="hover:bg-luxury-soft-white/40 dark:hover:bg-neutral-800/20 transition-colors">
                    <td className="py-5 px-6 font-semibold text-luxury-black dark:text-white uppercase tracking-wider">
                      {client.name}
                    </td>
                    <td className="py-5 px-6 font-mono text-neutral-600 dark:text-neutral-400">
                      {client.email}
                    </td>
                    <td className="py-5 px-6 font-light text-neutral-500 dark:text-neutral-400">
                      {client.phone}
                    </td>
                    <td className="py-5 px-6 text-center font-semibold text-neutral-700 dark:text-neutral-300">
                      {client.totalBookings}
                    </td>
                    <td className="py-5 px-6 text-right font-mono font-semibold text-luxury-black dark:text-white">
                      ₱{client.totalSpent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
