"use client";

import { ContactWidget } from "@/components/ContactWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";

type LegalPageProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <ContactWidgetProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-4xl px-4 py-24">
          <h1 className="mb-8 text-3xl font-bold text-foreground">{title}</h1>
          {children}
        </main>
        <Footer />
        <ContactWidget />
      </div>
    </ContactWidgetProvider>
  );
}
