import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import LoginModal from "@/features/authentication/login-modal";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
      <LoginModal />
    </>
  );
}
