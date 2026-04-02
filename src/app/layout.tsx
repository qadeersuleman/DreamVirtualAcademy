import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dreams Virtual Academy | The Elite Digital Future",
  description: "Join the elite online learning platform for modern technologies, design, and digital entrepreneurship.",
  keywords: "online academy, digital learning, web development, graphic design, entrepreneurship, virtual school",
  icons: {
    icon: "/images/logo.jpg",
  },
  openGraph: {
    title: "Dreams Virtual Academy",
    description: "Your dream career starts here.",
    type: "website",
    locale: "en_US",
    url: "https://dreamsvirtualacademy.edu",
    siteName: "Dreams Virtual Academy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
