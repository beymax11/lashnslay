"use client";

import { useAuth } from "@/context/auth-context";
import AdminLogin from "@/components/admin/admin-login";
import AdminDashboard from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const { isLoggedIn, isAdmin, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="font-serif text-lg tracking-[0.25em] text-neutral-400 animate-pulse uppercase">
          LASH & SLAY
        </div>
      </div>
    );
  }

  // Render Login view if user is not logged in or is not an administrator
  if (!isLoggedIn || !isAdmin) {
    return <AdminLogin />;
  }

  // Otherwise, render Dashboard
  return <AdminDashboard />;
}
