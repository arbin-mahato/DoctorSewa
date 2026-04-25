import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/shared/Navbar";
import { PageTransition } from "@/components/shared/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DoctorSewa — Book Doctor Appointments Online",
    template: "%s | DoctorSewa",
  },
  description:
    "Nepal's trusted online doctor appointment platform. Book consultations, video calls, and get prescriptions — all in one place.",
  keywords: [
    "doctor appointment",
    "telemedicine",
    "book doctor",
    "online consultation",
    "DoctorSewa",
    "Nepal healthcare",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </SessionProvider>
      </body>
    </html>
  );
}
