// app/layout.tsx - Root layout for the application
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GUIONIX - Plataforma Profesional para Guionistas",
  description: "Crea, edita y produce guiones de cine y TV con IA avanzada. Plataforma colaborativa para equipos creativos.",
  keywords: ["guión", "cine", "TV", "escritura", "colaboración", "IA", "Blake Snyder"],
  authors: [{ name: "GUIONIX Team" }],
  creator: "GUIONIX",
  publisher: "GUIONIX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://guionix.com",
    siteName: "GUIONIX",
    title: "GUIONIX - Plataforma Profesional para Guionistas",
    description: "Crea, edita y produce guiones de cine y TV con IA avanzada.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GUIONIX - Plataforma Profesional para Guionistas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GUIONIX - Plataforma Profesional para Guionistas",
    description: "Crea, edita y produce guiones de cine y TV con IA avanzada.",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#facc15",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#facc15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
