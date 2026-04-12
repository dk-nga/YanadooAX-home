"use client";

import { useRef, useState } from "react";
import { AXSystemSection } from "@/components/AXSystemSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";
import { ClientLogosSection } from "@/components/ClientLogosSection";
import { ContactWidget } from "@/components/ContactWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroAnimation } from "@/components/HeroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";
import { ScrollContainerProvider } from "@/contexts/ScrollContainerContext";

export function HomePageClient() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ContactWidgetProvider>
      <ScrollContainerProvider containerRef={scrollRef}>
        <div
          ref={scrollRef}
          className="h-[100dvh] overflow-y-auto scrollbar-hide bg-background"
        >
          {!animationComplete ? (
            <HeroAnimation onAnimationComplete={() => setAnimationComplete(true)} />
          ) : null}
          {animationComplete ? (
            <>
              <Header />
              <main>
                <section id="home" className="min-h-screen">
                  <AnimatedSection>
                    <HeroSection />
                  </AnimatedSection>
                </section>
                <ClientLogosSection />
                <div id="about" className="min-h-screen">
                  <AXSystemSection />
                </div>
                <section className="min-h-screen">
                  <AnimatedSection persistVisible>
                    <CTASection />
                  </AnimatedSection>
                </section>
              </main>
              <Footer />
              <ContactWidget />
            </>
          ) : null}
        </div>
      </ScrollContainerProvider>
    </ContactWidgetProvider>
  );
}
