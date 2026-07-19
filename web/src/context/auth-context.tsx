"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Reservation {
  id: string;
  serviceName: string;
  stylistName: string;
  date: string;
  time: string;
  price: number;
  code: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface User {
  name: string;
  email: string;
  phone: string;
  memberCode: string;
  points: number;
  tier: "Silver Essential" | "Gold Elite" | "Platinum Signature";
  reservations: Reservation[];
  password?: string;
  role?: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  isLoaded: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  addReservation: (reservation: Omit<Reservation, "id" | "code">) => Reservation;
  cancelReservation: (id: string) => void;
  isAdmin: boolean;
  getAllReservations: () => (Reservation & { userEmail: string; userName: string; userPhone: string })[];
  updateReservationStatus: (userEmail: string, resId: string, updated: Partial<Reservation> | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  name: "Eleanor Vane",
  email: "eleanor@luxury.com",
  phone: "+1 555-019-8009",
  memberCode: "•••• 8009 5112",
  points: 750,
  tier: "Gold Elite",
  reservations: [
    {
      id: "res-1",
      serviceName: "Package 2",
      stylistName: "Isabella Thorne",
      date: "2026-07-25",
      time: "2:30 PM",
      price: 799,
      code: "RES-84920-2026",
    },
  ],
  password: "eleanor123",
};

const DEFAULT_ADMIN: User = {
  name: "Salon Administrator",
  email: "admin@lashnslay.com",
  phone: "+1 555-999-0000",
  memberCode: "ADMIN-001",
  points: 9999,
  tier: "Platinum Signature",
  reservations: [],
  password: "admin123",
  role: "admin",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage on client-side mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("lashnslay_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error loading user from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const saveUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("lashnslay_user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("lashnslay_user");
    }
  };

  const login = (email: string, password: string): boolean => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) return false;

    if (normalized === "admin@lashnslay.com") {
      if (password !== "admin123") {
        return false;
      }
      saveUser(DEFAULT_ADMIN);
      return true;
    }

    if (normalized === "eleanor@luxury.com") {
      if (password !== "eleanor123") {
        return false;
      }
      try {
        const allUsers = localStorage.getItem("lashnslay_all_users");
        const parsedUsers: Record<string, User> = allUsers ? JSON.parse(allUsers) : {};
        if (parsedUsers[normalized]) {
          saveUser(parsedUsers[normalized]);
        } else {
          saveUser(DEFAULT_USER);
          parsedUsers[normalized] = DEFAULT_USER;
          localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));
        }
      } catch {
        saveUser(DEFAULT_USER);
      }
      return true;
    }

    try {
      const allUsers = localStorage.getItem("lashnslay_all_users");
      const parsedUsers: Record<string, User> = allUsers ? JSON.parse(allUsers) : {};
      
      const foundUser = parsedUsers[normalized];
      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          return false;
        }
        saveUser(foundUser);
        return true;
      }
      return false; // User not found
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const register = (name: string, email: string, phone: string, password: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) return false;

    const cardNo = `•••• ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser: User = {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      memberCode: cardNo,
      points: 0,
      tier: "Silver Essential",
      reservations: [],
      password: password,
    };

    try {
      const allUsers = localStorage.getItem("lashnslay_all_users");
      const parsedUsers: Record<string, User> = allUsers ? JSON.parse(allUsers) : {};
      parsedUsers[normalizedEmail] = newUser;
      localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));
      saveUser(newUser);
      return true;
    } catch (e) {
      console.error(e);
      saveUser(newUser);
      return true;
    }
  };

  const logout = () => {
    saveUser(null);
  };

  const determineTier = (points: number): User["tier"] => {
    if (points >= 1500) return "Platinum Signature";
    if (points >= 500) return "Gold Elite";
    return "Silver Essential";
  };

  const addReservation = (
    reservation: Omit<Reservation, "id" | "code">
  ): Reservation => {
    const newId = `res-${Math.floor(100000 + Math.random() * 900000)}`;
    const randCode = `RES-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const fullReservation: Reservation = {
      ...reservation,
      id: newId,
      code: randCode,
      status: "pending",
    };

    if (user) {
      const price = reservation.price;
      let earnRate = 10; 
      if (user.tier === "Gold Elite") earnRate = 12; 
      if (user.tier === "Platinum Signature") earnRate = 15; 

      const pointsEarned = Math.floor(price / 10) * earnRate;
      const updatedPoints = user.points + pointsEarned;
      const updatedTier = determineTier(updatedPoints);

      const updatedUser: User = {
        ...user,
        points: updatedPoints,
        tier: updatedTier,
        reservations: [fullReservation, ...user.reservations],
      };

      saveUser(updatedUser);

      try {
        const allUsers = localStorage.getItem("lashnslay_all_users");
        const parsedUsers: Record<string, User> = allUsers ? JSON.parse(allUsers) : {};
        parsedUsers[user.email.toLowerCase()] = updatedUser;
        localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));
      } catch (e) {
        console.error(e);
      }
    }

    return fullReservation;
  };

  const cancelReservation = (id: string) => {
    if (!user) return;

    const reservationToCancel = user.reservations.find((r) => r.id === id);
    if (!reservationToCancel) return;

    const price = reservationToCancel.price;
    let earnRate = 10;
    if (user.tier === "Gold Elite") earnRate = 12;
    if (user.tier === "Platinum Signature") earnRate = 15;

    const pointsDeducted = Math.floor(price / 10) * earnRate;
    const updatedPoints = Math.max(0, user.points - pointsDeducted);
    const updatedTier = determineTier(updatedPoints);

    const updatedUser: User = {
      ...user,
      points: updatedPoints,
      tier: updatedTier,
      reservations: user.reservations.filter((r) => r.id !== id),
    };

    saveUser(updatedUser);

    try {
      const allUsers = localStorage.getItem("lashnslay_all_users");
      const parsedUsers: Record<string, User> = allUsers ? JSON.parse(allUsers) : {};
      parsedUsers[user.email.toLowerCase()] = updatedUser;
      localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));
    } catch (e) {
      console.error(e);
    }
  };

  const isAdmin = user?.role === "admin";

  const getAllReservations = () => {
    try {
      const allUsersStr = localStorage.getItem("lashnslay_all_users");
      const parsedUsers: Record<string, User> = allUsersStr ? JSON.parse(allUsersStr) : {};
      
      if (!parsedUsers["eleanor@luxury.com"]) {
        parsedUsers["eleanor@luxury.com"] = DEFAULT_USER;
      }

      const list: (Reservation & { userEmail: string; userName: string; userPhone: string })[] = [];
      Object.values(parsedUsers).forEach((usr) => {
        if (usr.reservations && usr.role !== "admin") {
          usr.reservations.forEach((res) => {
            list.push({
              ...res,
              userEmail: usr.email,
              userName: usr.name,
              userPhone: usr.phone,
            });
          });
        }
      });
      return list;
    } catch (e) {
      console.error("Error fetching all reservations", e);
      return [];
    }
  };

  const updateReservationStatus = (userEmail: string, resId: string, updated: Partial<Reservation> | null) => {
    try {
      const normalized = userEmail.trim().toLowerCase();
      const allUsersStr = localStorage.getItem("lashnslay_all_users");
      const parsedUsers: Record<string, User> = allUsersStr ? JSON.parse(allUsersStr) : {};

      if (normalized === "eleanor@luxury.com" && !parsedUsers[normalized]) {
        parsedUsers[normalized] = DEFAULT_USER;
      }

      const targetUser = parsedUsers[normalized];
      if (!targetUser) return;

      if (updated === null) {
        targetUser.reservations = targetUser.reservations.filter((r) => r.id !== resId);
      } else {
        targetUser.reservations = targetUser.reservations.map((r) => {
          if (r.id === resId) {
            return { ...r, ...updated };
          }
          return r;
        });
      }

      parsedUsers[normalized] = targetUser;
      localStorage.setItem("lashnslay_all_users", JSON.stringify(parsedUsers));

      if (user && user.email.toLowerCase() === normalized) {
        setUser({ ...targetUser });
        localStorage.setItem("lashnslay_user", JSON.stringify(targetUser));
      }
    } catch (e) {
      console.error("Error updating user reservation", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoginModalOpen,
        isLoaded,
        openLoginModal,
        closeLoginModal,
        login,
        register,
        logout,
        addReservation,
        cancelReservation,
        isAdmin,
        getAllReservations,
        updateReservationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
