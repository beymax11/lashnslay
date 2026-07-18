"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth, Reservation } from "@/context/auth-context";

// Import sub-components
import AppointmentsTab from "./tabs/appointments-tab";
import AnalyticsTab from "./tabs/analytics-tab";
import ClientsTab from "./tabs/clients-tab";
import ManualBookingTab from "./tabs/manual-booking-tab";
import RescheduleModal from "./tabs/reschedule-modal";
import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";
import BookingDetailsModal from "./tabs/booking-details-modal";

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

  // Selected Booking Details states
  const [selectedAppt, setSelectedAppt] = useState<ReservationWithClient | null>(null);

  // Sidebar states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
      
      <AdminHeader
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onLogout={logout}
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col lg:flex-row">
        
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Content Area */}
        <section className="flex-1 min-w-0 px-6 py-10 md:px-12 md:py-16 max-w-7xl mx-auto w-full">
          
          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={appointments}
              onUpdateStatus={handleUpdateStatus}
              onStartReschedule={startReschedule}
              onCancelBooking={handleCancelBooking}
              onSelectAppointment={setSelectedAppt}
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

      {/* Booking Details Overlay Modal */}
      {selectedAppt && (
        <BookingDetailsModal
          appt={selectedAppt}
          onClose={() => setSelectedAppt(null)}
        />
      )}

    </div>
  );
}
