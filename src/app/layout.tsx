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
  title: "Dreams Virtual Academy | Science & Academic Excellence",
  description: "Join the elite online learning platform for science, physics, chemistry, mathematics, and academic preparation.",
  keywords: "online academy, science academy, physics, chemistry, biology, mathematics, academic preparation, FPSC, CSS, virtual school",
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
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/923018183624"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.861-4.422 9.864-9.864.001-2.637-1.03-5.114-2.905-6.99C16.48 1.876 14.004.844 11.37.844 5.926.844 1.502 5.267 1.5 10.711c-.001 1.636.43 3.226 1.248 4.637L1.76 19.86l4.887-1.283zm13.11-5.733c-.266-.134-1.579-.78-1.823-.867-.243-.088-.419-.133-.596.134-.176.266-.681.867-.835 1.044-.154.177-.308.2-.574.067-.266-.134-1.127-.415-2.147-1.326-.79-.706-1.325-1.577-1.48-1.844-.155-.267-.017-.411.116-.544.12-.12.267-.311.4-.467.13-.156.177-.267.266-.445.09-.178.044-.334-.022-.467-.067-.134-.596-1.436-.816-1.97-.216-.519-.454-.447-.624-.456-.162-.008-.348-.01-.534-.01-.186 0-.49.07-.746.347-.256.278-.979.957-.979 2.335 0 1.378 1.002 2.71 1.142 2.898.14.188 1.972 3.012 4.777 4.22.667.288 1.189.46 1.597.59.67.213 1.28.183 1.761.11.536-.08 1.58-.646 1.8-.1.22-.547.22-1.01.154-1.077-.066-.067-.243-.134-.51-.268z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
