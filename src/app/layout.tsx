import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreams Virtual Academy | Science & Academic Excellence (سنڌي / English)",
  description: "Dreams Virtual Academy - Master Science, Physics, Chemistry, Math and prepare for STS / JST tests in simple Sindhi and English.",
  keywords: "dreams virtual academy, science academy sindh, physics in sindhi, stbb science notes, sts iba sukkur test, jst preparation, dilshad murtaza",
  icons: {
    icon: "/images/logo-yellow.png",
    shortcut: "/images/logo-yellow.png",
    apple: "/images/logo-yellow.png",
  },
  openGraph: {
    title: "Dreams Virtual Academy",
    description: "Learn Science, Math & Test Prep in Sindhi - Dreams Virtual Academy",
    type: "website",
    locale: "en_PK",
    url: "https://www.dreamsacademy.online",
    siteName: "Dreams Virtual Academy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google AdSense Verification & Script */}
        <meta name="google-adsense-account" content="ca-pub-9494184033509881" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9494184033509881"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <Navbar />
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
