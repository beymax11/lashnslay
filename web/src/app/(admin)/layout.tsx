import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LASH & SLAY | Admin Portal",
  description: "Couture Lash Salon appointment and booking administrative console.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full min-h-screen bg-luxury-white text-luxury-black dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {children}
    </div>
  );
}
