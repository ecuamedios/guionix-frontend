import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GUIONIX Dashboard - Plataforma de Creación de Guiones con IA",
  description: "Dashboard unificado para crear guiones profesionales con inteligencia artificial. X.AI, ChatGPT-4, Claude integrados.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 