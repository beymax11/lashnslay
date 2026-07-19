"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

interface Service {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description: string;
}

interface Stylist {
  id: string;
  name: string;
  role: string;
}

const services: Service[] = [
  {
    id: "package-1",
    name: "Package 1",
    price: 499,
    description: "Eyelash Lift/Perm & Brow Lamination combo.",
  },
  {
    id: "package-2",
    name: "Package 2",
    price: 799,
    description: "Eyelash Extensions & Brow Lamination combo.",
  },
  {
    id: "package-3",
    name: "Package 3 (2 Heads)",
    price: 1299,
    description: "Eyelash Extensions & Brow Lamination combo for 2 Heads.",
  },
];

const stylists: Stylist[] = [
  { id: "isabella", name: "Isabella Thorne", role: "Master Lash Stylist" },
  { id: "marcello", name: "Marcello Dupont", role: "Senior Lash Architect" },
];

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

export default function ReservePage() {
  const { isLoggedIn, user, addReservation, openLoginModal } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(stylists[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    memberCode: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  useEffect(() => {
    if (user) {
      setClientInfo({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        memberCode: user.memberCode ? user.memberCode.replace("•••• ", "") : "",
        notes: "",
      });
    } else {
      setClientInfo({
        name: "",
        email: "",
        phone: "",
        memberCode: "",
        notes: "",
      });
    }
  }, [user]);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Helper: number of days in viewMonth
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Helper: first day of viewMonth (0 = Sunday, 1 = Monday...)
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const isPrevMonthDisabled = viewYear <= today.getFullYear() && viewMonth <= today.getMonth();

  const prevMonth = () => {
    if (isPrevMonthDisabled) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  const getTodayDateOnly = () => {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isDateInPast = (day: number) => {
    const checkDate = new Date(viewYear, viewMonth, day);
    const todayZero = getTodayDateOnly();
    return checkDate < todayZero;
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleNext = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) return;
    if (step === 2 && !selectedService) return;
    if (step === 3 && (!clientInfo.name || !clientInfo.email || !clientInfo.phone)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randCode = `RES-${(Math.random() * 100000).toFixed(0)}-2026`;
      setReservationCode(randCode);
      setBookingConfirmed(true);

      if (isLoggedIn && selectedService && selectedStylist) {
        addReservation({
          serviceName: selectedService.name,
          stylistName: selectedStylist.name,
          date: selectedDate,
          time: selectedTime,
          price: finalPrice,
        });
      }
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(stylists[0]);
    setSelectedDate("");
    setSelectedTime("");
    setClientInfo({
      name: "",
      email: "",
      phone: "",
      memberCode: "",
      notes: "",
    });
    setReservationCode("");
    setBookingConfirmed(false);
  };

  const isVoucherApplied =
    clientInfo.memberCode.trim().toUpperCase() === "COUTURE-REFILL-750" ||
    clientInfo.memberCode.trim().toUpperCase() === "LASH-BATH-250" ||
    clientInfo.memberCode.trim().toUpperCase() === "NANO-SEAL-500" ||
    clientInfo.memberCode.trim().toUpperCase() === "FULL-SET-1000";

  const discountAmount = isVoucherApplied
    ? clientInfo.memberCode.trim().toUpperCase() === "COUTURE-REFILL-750"
      ? selectedService?.price || 0
      : clientInfo.memberCode.trim().toUpperCase() === "FULL-SET-1000"
      ? selectedService?.price || 0
      : clientInfo.memberCode.trim().toUpperCase() === "LASH-BATH-250"
      ? 25
      : 30
    : 0;

  const finalPrice = Math.max(0, (selectedService?.price || 0) - discountAmount);

  // Generate calendar days including empty slots
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 bg-luxury-soft-white flex-1 flex flex-col justify-center items-center">
      <div className="bg-luxury-white text-luxury-black w-full max-w-2xl border border-luxury-light-gray shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-luxury-light-gray flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-light">
              Lash & Slay Reservations
            </span>
            <h1 className="font-serif text-xl tracking-[0.1em] mt-0.5">
              {bookingConfirmed ? "Couture Styling Confirmed" : "Book Custom Appointment"}
            </h1>
          </div>
          {!bookingConfirmed && (
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-luxury-black transition-colors"
            >
              Cancel
            </Link>
          )}
        </div>

        {/* Step Indicators */}
        {!bookingConfirmed && (
          <div className="px-8 py-3 bg-luxury-soft-white border-b border-luxury-light-gray flex justify-between text-[10px] tracking-[0.15em] uppercase font-light text-neutral-400">
            <span className={step === 1 ? "text-luxury-black font-semibold" : ""}>1. Schedule</span>
            <span className={step === 2 ? "text-luxury-black font-semibold" : ""}>2. Experience</span>
            <span className={step === 3 ? "text-luxury-black font-semibold" : ""}>3. Credentials</span>
            <span className={step === 4 ? "text-luxury-black font-semibold" : ""}>4. Checkout</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-8">
          {bookingConfirmed ? (
            /* Success screen */
            <div className="flex flex-col items-center text-center py-6 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full border border-luxury-black flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-luxury-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-light tracking-[0.1em] mb-2">
                Your Couture Session is Secured
              </h2>
              <p className="text-sm font-mono tracking-widest text-neutral-400 uppercase mb-6">
                Reservation Code: {reservationCode}
              </p>

              {(() => {
                const earnRate = user?.tier === "Gold Elite" ? 12 : user?.tier === "Platinum Signature" ? 15 : 10;
                const pointsEarned = selectedService ? Math.floor(finalPrice / 10) * earnRate : 0;
                return isLoggedIn && pointsEarned > 0 ? (
                  <div className="bg-luxury-black text-luxury-white px-4 py-2 border border-luxury-black text-[9px] uppercase tracking-[0.25em] font-medium mb-6 animate-pulse">
                    +{pointsEarned} Couture Points Accumulated
                  </div>
                ) : null;
              })()}

              <div className="w-full max-w-md border border-neutral-100 bg-luxury-soft-white p-6 text-left text-xs space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider">Experience</span>
                  <span className="font-medium text-right">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider">Lash Artist</span>
                  <span className="font-medium">{selectedStylist?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider">Date & Time</span>
                  <span className="font-medium text-right">
                    {formatFriendlyDate(selectedDate)} at {selectedTime}
                  </span>
                </div>
                {isVoucherApplied && (
                  <div className="flex justify-between text-neutral-500">
                    <span className="uppercase tracking-wider">Voucher Applied</span>
                    <span>-{discountAmount > 0 ? `₱${discountAmount}` : "Complimentary"}</span>
                  </div>
                )}
                <div className="border-t border-neutral-200/80 pt-3 flex justify-between text-sm">
                  <span className="font-serif tracking-wide">Total Investment</span>
                  <span className="font-bold text-base text-luxury-black">₱{finalPrice}</span>
                </div>
              </div>

              <div className="max-w-md text-xs text-neutral-500 space-y-2 leading-relaxed mb-6">
                <p>
                  <strong>Preparation Protocol:</strong> Please ensure your eyes are free of mascara, makeup, and oils prior to arrival. Avoid caffeine 2 hours before your appointment.
                </p>
                <p>
                  <strong>Cancellation Window:</strong> Reservations can be modified up to 24 hours in advance via your member account.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium"
                >
                  Book Another Session
                </button>
                <Link
                  href="/"
                  className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-300 font-medium text-center flex items-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Multi-step Form Content */
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Custom Calendar */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-light mb-3">
                      Select Appointment Date:
                    </p>
                    <div className="border border-luxury-light-gray bg-luxury-white p-4">
                      {/* Calendar Month Header */}
                      <div className="flex items-center justify-between mb-4 border-b border-luxury-light-gray pb-3">
                        <button
                          type="button"
                          onClick={prevMonth}
                          disabled={isPrevMonthDisabled}
                          className="p-1 px-2 text-sm hover:bg-luxury-light-gray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ←
                        </button>
                        <h3 className="font-serif text-sm tracking-[0.2em] font-light">
                          {months[viewMonth]} {viewYear}
                        </h3>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-1 px-2 text-sm hover:bg-neutral-100 transition-colors"
                        >
                          →
                        </button>
                      </div>

                      {/* Weekdays Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {weekdays.map((day) => (
                          <div key={day} className="text-[10px] tracking-wider text-neutral-400 font-light py-1">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {calendarDays.map((day, idx) => {
                          if (day === null) {
                            return <div key={`empty-${idx}`} />;
                          }

                          const dateStr = formatDateString(viewYear, viewMonth, day);
                          const isSelected = selectedDate === dateStr;
                          const isDisabled = isDateInPast(day);

                          return (
                            <button
                              type="button"
                              key={`day-${day}`}
                              disabled={isDisabled}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`aspect-square flex items-center justify-center text-xs font-light transition-all duration-300 ${
                                isSelected
                                  ? "bg-luxury-black text-luxury-white"
                                  : isDisabled
                                  ? "text-luxury-black/30 cursor-not-allowed"
                                  : "hover:bg-luxury-light-gray cursor-pointer text-luxury-black"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Select Time */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs uppercase tracking-widest text-neutral-400 font-light">
                        Select Time:
                      </p>
                      {selectedDate && (
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-light">
                          Selected: {formatFriendlyDate(selectedDate)}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-[10px] border transition-all duration-300 font-light ${
                            selectedTime === time
                              ? "border-luxury-black bg-luxury-black text-luxury-white"
                              : "border-luxury-light-gray bg-luxury-white hover:border-luxury-black"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Select Service */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-light mb-4">
                      Select your tailored lash look:
                    </p>
                    <div className="space-y-3">
                      {services.map((svc) => (
                        <label
                          key={svc.id}
                          className={`flex flex-col p-5 border cursor-pointer transition-all duration-300 ${
                            selectedService?.id === svc.id
                              ? "border-luxury-black bg-luxury-soft-white"
                              : "border-luxury-light-gray bg-luxury-white hover:border-luxury-black/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="service"
                                checked={selectedService?.id === svc.id}
                                onChange={() => setSelectedService(svc)}
                                className="accent-luxury-black w-4 h-4 cursor-pointer"
                              />
                              <span className="font-serif text-sm md:text-base font-light tracking-wide">
                                {svc.name}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-luxury-black tracking-wider">
                              ₱{svc.price}
                            </span>
                          </div>
                          <p className="text-[11px] font-light text-luxury-black/60 ml-7 mt-1 max-w-lg leading-relaxed">
                            {svc.description}
                          </p>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in-up">
                  {!isLoggedIn ? (
                    <div className="border border-luxury-black p-4 bg-luxury-soft-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-luxury-black">
                          Book faster & earn loyalty rewards
                        </p>
                        <p className="text-[9px] text-neutral-500 font-light mt-0.5 uppercase tracking-wide leading-relaxed">
                          Sign in to accumulate membership points on this booking.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={openLoginModal}
                        className="text-[9px] uppercase tracking-widest bg-luxury-black text-luxury-white py-2 px-4 border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all cursor-pointer font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                  ) : (
                    <div className="bg-neutral-50 p-4 border border-luxury-light-gray flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Logged In Member</p>
                        <p className="text-[11px] uppercase tracking-wide font-medium text-luxury-black mt-0.5">
                          {user?.name} ({user?.tier})
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{user?.memberCode}</span>
                    </div>
                  )}

                  <p className="text-xs uppercase tracking-widest text-neutral-400 font-light mb-2">
                    Enter Personal Credentials:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] uppercase tracking-[0.2em] text-luxury-black/60 font-light block mb-1">
                        Full Guest Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Eleanor Vane"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="w-full p-3 border border-luxury-light-gray bg-transparent focus:border-luxury-black focus:outline-none text-xs font-light text-luxury-black placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] text-luxury-black/60 font-light block mb-1">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="eleanor@domain.com"
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                          className="w-full p-3 border border-luxury-light-gray bg-transparent focus:border-luxury-black focus:outline-none text-xs font-light text-luxury-black placeholder:text-neutral-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] text-luxury-black/60 font-light block mb-1">
                          Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                          className="w-full p-3 border border-luxury-light-gray bg-transparent focus:border-luxury-black focus:outline-none text-xs font-light text-luxury-black placeholder:text-neutral-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-[0.2em] text-luxury-black/60 font-light block mb-1">
                        Voucher / Membership Reward Code (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="E.g., COUTURE-REFILL-750"
                        value={clientInfo.memberCode}
                        onChange={(e) => setClientInfo({ ...clientInfo, memberCode: e.target.value })}
                        className="w-full p-3 border border-luxury-light-gray bg-transparent focus:border-luxury-black focus:outline-none text-xs font-mono uppercase tracking-wider text-luxury-black placeholder:text-neutral-400"
                      />
                      {isVoucherApplied && (
                        <p className="text-[10px] text-green-700 font-light mt-1">
                          ✓ Premium Reward Code verified. Discount of ${discountAmount} will be applied!
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-[0.2em] text-luxury-black/60 font-light block mb-1">
                        Styling preferences or Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Natural look, specific styling notes, or sensitivities..."
                        value={clientInfo.notes}
                        onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                        className="w-full p-3 border border-luxury-light-gray bg-transparent focus:border-luxury-black focus:outline-none text-xs font-light text-luxury-black placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-fade-in-up">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 font-light mb-2">
                    Review and Confirm Reservation:
                  </p>

                  <div className="border border-luxury-light-gray bg-luxury-soft-white p-6 space-y-4 text-xs">
                    <div className="border-b border-luxury-light-gray pb-3 flex justify-between">
                      <div>
                        <p className="font-serif text-sm tracking-wide">{selectedService?.name}</p>
                      </div>
                      <span className="font-semibold text-sm">₱{selectedService?.price}</span>
                    </div>

                    <div className="space-y-2 border-b border-luxury-light-gray pb-3">
                      <div className="flex justify-between">
                        <span className="text-luxury-black/60 uppercase tracking-wider">Lash Stylist</span>
                        <span className="font-medium">{selectedStylist?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-luxury-black/60 uppercase tracking-wider">Date & Time</span>
                        <span className="font-medium text-right">
                          {formatFriendlyDate(selectedDate)} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 border-b border-luxury-light-gray pb-3">
                      <div className="flex justify-between">
                        <span className="text-luxury-black/60 uppercase tracking-wider">Guest Name</span>
                        <span className="font-medium">{clientInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-luxury-black/60 uppercase tracking-wider">Contact</span>
                        <span className="font-medium">{clientInfo.phone}</span>
                      </div>
                    </div>

                    {isVoucherApplied && (
                      <div className="flex justify-between text-luxury-black/70">
                        <span className="uppercase tracking-wider">Voucher applied ({clientInfo.memberCode.toUpperCase()})</span>
                        <span>-₱{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm pt-1">
                      <span className="font-serif tracking-wide font-medium">Estimated Investment</span>
                      <span className="font-bold text-lg text-luxury-black">₱{finalPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer controls */}
        {!bookingConfirmed && (
          <div className="px-8 py-5 border-t border-luxury-light-gray flex items-center justify-between bg-luxury-soft-white">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`text-xs uppercase tracking-[0.2em] py-2 transition-all font-light ${
                step === 1 ? "opacity-0 cursor-default" : "text-luxury-black/60 hover:text-luxury-black"
              }`}
            >
              ← Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && (!selectedDate || !selectedTime)) ||
                  (step === 2 && !selectedService) ||
                  (step === 3 && (!clientInfo.name || !clientInfo.email || !clientInfo.phone))
                }
                className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium disabled:opacity-40 disabled:hover:bg-luxury-black disabled:hover:text-luxury-white disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Securing Appointment..." : "Confirm Reservation"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
