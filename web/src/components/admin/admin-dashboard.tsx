"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth, Reservation } from "@/context/auth-context";

// Import sub-components
import AppointmentsTab from "./tabs/appointments-tab";
import AnalyticsTab from "./tabs/analytics-tab";
import ClientsTab from "./tabs/clients-tab";
import ManualBookingTab from "./tabs/manual-booking-tab";
import RescheduleModal from "./tabs/reschedule-modal";

export interface ReservationWithClient extends Reservation {
  userEmail: string;
  userName: string;
  userPhone: string;
}

export default function AdminDashboard() {
  const { logout, getAllReservations, updateReservationStatus } = useAuth();
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"appointments" | "analytics" | "clients" | "schedule">("appointments");
  
  // Local states for loaded data
  const [appointments, setAppointments] = useState<ReservationWithClient[]>([]);
  
  // Rescheduling states
  const [reschedulingAppt, setReschedulingAppt] = useState<ReservationWithClient | null>(null);

  // Theme helper
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Load sidebar collapse preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCollapsed = localStorage.getItem("admin_sidebar_collapsed");
      if (savedCollapsed === "true") {
        setIsSidebarCollapsed(true);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const nextVal = !prev;
      localStorage.setItem("admin_sidebar_collapsed", String(nextVal));
      return nextVal;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  // Fetch current reservations from localStorage
  const loadAppointments = () => {
    const list = getAllReservations();
    setAppointments(list as ReservationWithClient[]);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Unique clients
  const clientDirectory = useMemo(() => {
    const clientsMap: Record<string, { name: string; email: string; phone: string; totalBookings: number; totalSpent: number }> = {};
    appointments.forEach((appt) => {
      if (!clientsMap[appt.userEmail]) {
        clientsMap[appt.userEmail] = {
          name: appt.userName,
          email: appt.userEmail,
          phone: appt.userPhone,
          totalBookings: 0,
          totalSpent: 0
        };
      }
      clientsMap[appt.userEmail].totalBookings += 1;
      if (appt.status !== "cancelled") {
        clientsMap[appt.userEmail].totalSpent += appt.price;
      }
    });
    return Object.values(clientsMap);
  }, [appointments]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const active = appointments.filter(a => a.status !== "cancelled");
    const pending = appointments.filter(a => !a.status || a.status === "pending");
    const completed = appointments.filter(a => a.status === "completed");
    const confirmed = appointments.filter(a => a.status === "confirmed");
    const revenue = confirmed.reduce((sum, a) => sum + a.price, 0) + completed.reduce((sum, a) => sum + a.price, 0);

    return {
      totalBookings: appointments.length,
      revenue,
      pendingCount: pending.length,
      completedCount: completed.length,
      confirmedCount: confirmed.length,
    };
  }, [appointments]);

  // Handlers
  const handleUpdateStatus = (userEmail: string, resId: string, status: Reservation["status"]) => {
    updateReservationStatus(userEmail, resId, { status });
    loadAppointments();
  };

  const handleCancelBooking = (userEmail: string, resId: string) => {
    if (confirm("Are you sure you want to cancel this booking? This will remove the reservation from the system.")) {
      updateReservationStatus(userEmail, resId, null);
      loadAppointments();
    }
  };

  const startReschedule = (appt: ReservationWithClient) => {
    setReschedulingAppt(appt);
  };

  const handleSaveReschedule = (date: string, time: string, stylist: string) => {
    if (!reschedulingAppt) return;
    updateReservationStatus(reschedulingAppt.userEmail, reschedulingAppt.id, {
      date,
      time,
      stylistName: stylist,
      status: "confirmed"
    });
    setReschedulingAppt(null);
    loadAppointments();
  };

  return (
    <div className="w-full min-h-screen bg-luxury-soft-white text-luxury-black flex flex-col font-sans transition-colors duration-500">
      
      {/* Upper Navigation Bar */}
      <header className="border-b border-luxury-light-gray bg-luxury-white/95 dark:bg-neutral-900/95 dark:border-neutral-800 py-6 px-6 md:px-12 lg:px-16 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1.5 hover:opacity-75 transition-opacity cursor-pointer focus:outline-none text-luxury-black dark:text-neutral-200"
            aria-label="Open Mobile Navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </button>

          <span className="font-serif text-2xl tracking-[0.25em] font-bold uppercase dark:text-white">
            LASH & SLAY
          </span>
          <span className="text-[8px] tracking-[0.3em] uppercase border border-luxury-black/35 dark:border-neutral-700 px-2 py-0.5 font-semibold text-neutral-400 dark:text-neutral-500">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Light/Dark mode toggler */}
          <button
            onClick={toggleTheme}
            className="text-[10px] uppercase tracking-[0.2em] font-light hover:opacity-75 transition-opacity py-2 cursor-pointer focus:outline-none flex items-center gap-1.5 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            <span>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 border border-luxury-black dark:border-neutral-300 hover:bg-luxury-black hover:text-luxury-white dark:hover:bg-white dark:hover:text-neutral-900 dark:text-white transition-all duration-400 font-semibold cursor-pointer focus:outline-none"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col lg:flex-row gap-12">
        
        {/* Mobile Sidebar Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop overlay */}
            <div 
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-luxury-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
            />

            {/* Drawer side panel */}
            <aside className="relative flex flex-col w-64 max-w-xs bg-luxury-white dark:bg-neutral-900 border-r border-luxury-light-gray dark:border-neutral-800 h-full p-6 shadow-2xl z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between pb-6 border-b border-luxury-light-gray dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg tracking-[0.15em] font-bold uppercase dark:text-white">
                    LASH & SLAY
                  </span>
                  <span className="text-[7px] tracking-[0.2em] uppercase border border-luxury-black/35 dark:border-neutral-700 px-1.5 py-0.5 font-semibold text-neutral-400 dark:text-neutral-500">
                    Admin
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:opacity-75 transition-opacity focus:outline-none cursor-pointer text-luxury-black dark:text-neutral-200"
                  aria-label="Close Navigation Drawer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => { setActiveTab("appointments"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 text-left text-[11px] uppercase tracking-[0.25em] py-3.5 px-3 rounded-md transition-all duration-300 group focus:outline-none cursor-pointer relative ${
                    activeTab === "appointments" 
                      ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white" 
                      : "text-neutral-400 hover:text-luxury-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span>Appointments</span>
                  {activeTab === "appointments" && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab("analytics"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 text-left text-[11px] uppercase tracking-[0.25em] py-3.5 px-3 rounded-md transition-all duration-300 group focus:outline-none cursor-pointer relative ${
                    activeTab === "analytics" 
                      ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white" 
                      : "text-neutral-400 hover:text-luxury-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625C7.5 19.371 6.996 19.875 6.375 19.875h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  <span>Analytics</span>
                  {activeTab === "analytics" && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab("clients"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 text-left text-[11px] uppercase tracking-[0.25em] py-3.5 px-3 rounded-md transition-all duration-300 group focus:outline-none cursor-pointer relative ${
                    activeTab === "clients" 
                      ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white" 
                      : "text-neutral-400 hover:text-luxury-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span>Clients</span>
                  {activeTab === "clients" && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab("schedule"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 text-left text-[11px] uppercase tracking-[0.25em] py-3.5 px-3 rounded-md transition-all duration-300 group focus:outline-none cursor-pointer relative ${
                    activeTab === "schedule" 
                      ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white" 
                      : "text-neutral-400 hover:text-luxury-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Manual Booking</span>
                  {activeTab === "schedule" && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
                  )}
                </button>
              </nav>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar Navigation */}
        <aside className={`hidden lg:flex flex-col gap-3 pb-0 border-r border-luxury-light-gray dark:border-neutral-800 lg:pr-6 relative transition-all duration-300 ease-in-out shrink-0 select-none ${isSidebarCollapsed ? 'w-20' : 'w-60'}`}>
          {/* Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 -right-3.5 bg-luxury-white dark:bg-neutral-800 border border-luxury-light-gray dark:border-neutral-700 rounded-full p-1.5 shadow-md hover:scale-110 cursor-pointer z-50 text-luxury-black dark:text-neutral-200 transition-all duration-300 focus:outline-none"
            aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-3 h-3 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-4 text-left text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative py-3.5 px-3 group focus:outline-none cursor-pointer w-full rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 ${
              activeTab === "appointments"
                ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white"
                : "text-neutral-400 hover:text-luxury-black dark:hover:text-white"
            }`}
          >
            <div className="shrink-0 text-current transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            
            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'}`}>
              Appointments
            </span>

            {activeTab === "appointments" && (
              <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
            )}

            {/* Collapsed Tooltip */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-5 px-3.5 py-2.5 bg-luxury-black dark:bg-neutral-800 text-luxury-white dark:text-neutral-200 text-[9px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-neutral-800 dark:border-neutral-700">
                Appointments
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-4 text-left text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative py-3.5 px-3 group focus:outline-none cursor-pointer w-full rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 ${
              activeTab === "analytics"
                ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white"
                : "text-neutral-400 hover:text-luxury-black dark:hover:text-white"
            }`}
          >
            <div className="shrink-0 text-current transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625C7.5 19.371 6.996 19.875 6.375 19.875h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </div>
            
            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'}`}>
              Analytics
            </span>

            {activeTab === "analytics" && (
              <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
            )}

            {/* Collapsed Tooltip */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-5 px-3.5 py-2.5 bg-luxury-black dark:bg-neutral-800 text-luxury-white dark:text-neutral-200 text-[9px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-neutral-800 dark:border-neutral-700">
                Analytics
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-4 text-left text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative py-3.5 px-3 group focus:outline-none cursor-pointer w-full rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 ${
              activeTab === "clients"
                ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white"
                : "text-neutral-400 hover:text-luxury-black dark:hover:text-white"
            }`}
          >
            <div className="shrink-0 text-current transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            
            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'}`}>
              Clients
            </span>

            {activeTab === "clients" && (
              <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
            )}

            {/* Collapsed Tooltip */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-5 px-3.5 py-2.5 bg-luxury-black dark:bg-neutral-800 text-luxury-white dark:text-neutral-200 text-[9px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-neutral-800 dark:border-neutral-700">
                Clients
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center gap-4 text-left text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative py-3.5 px-3 group focus:outline-none cursor-pointer w-full rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 ${
              activeTab === "schedule"
                ? "text-luxury-black font-semibold bg-neutral-100 dark:bg-neutral-800/80 dark:text-white"
                : "text-neutral-400 hover:text-luxury-black dark:hover:text-white"
            }`}
          >
            <div className="shrink-0 text-current transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            
            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'}`}>
              Manual Booking
            </span>

            {activeTab === "schedule" && (
              <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-luxury-black dark:bg-white rounded-r" />
            )}

            {/* Collapsed Tooltip */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-5 px-3.5 py-2.5 bg-luxury-black dark:bg-neutral-800 text-luxury-white dark:text-neutral-200 text-[9px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-neutral-800 dark:border-neutral-700">
                Manual Booking
              </div>
            )}
          </button>
        </aside>

        {/* Content Area */}
        <section className="flex-1 min-w-0">
          
          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={appointments}
              onUpdateStatus={handleUpdateStatus}
              onStartReschedule={startReschedule}
              onCancelBooking={handleCancelBooking}
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsTab
              appointments={appointments}
              metrics={metrics}
            />
          )}

          {activeTab === "clients" && (
            <ClientsTab
              clientDirectory={clientDirectory}
            />
          )}

          {activeTab === "schedule" && (
            <ManualBookingTab
              onBookingCreated={loadAppointments}
            />
          )}

        </section>
      </main>

      {/* Reschedule Overlay Modal */}
      {reschedulingAppt && (
        <RescheduleModal
          appt={reschedulingAppt}
          onClose={() => setReschedulingAppt(null)}
          onSave={handleSaveReschedule}
        />
      )}

    </div>
  );
}
