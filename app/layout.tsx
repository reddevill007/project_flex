import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import SidebarPicker from "@/components/sidebar/SidebarPicker";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Project Flex",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Toaster richColors position="top-center" />
        <NextTopLoader color="#2299DD" />
        <AuthProvider>
          <SidebarPicker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
