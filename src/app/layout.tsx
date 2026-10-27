import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreams Virtual Academy | Science & Academic Excellence (سنڌي / English)",
  description: "Dreams Virtual Academy - Master Science, Physics, Chemistry, Math and prepare for STS / JST tests in simple Sindhi and English.",
  keywords: "dreams virtual academy, science academy sindh, physics in sindhi, stbb science notes, sts iba sukkur test, jst preparation, dilshad murtaza",
  icons: {
    icon: "/images/logo-variants/12_app_icon_light.png",
    shortcut: "/images/logo-variants/14_favicon_light.png",
    apple: "/images/logo-variants/11_app_icon_dark.png",
  },
  openGraph: {
    title: "Dreams Virtual Academy",
    description: "Learn Science, Math & Test Prep in Sindhi - Dreams Virtual Academy",
    type: "website",
    locale: "en_PK",
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
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
