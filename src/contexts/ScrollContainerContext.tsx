"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";

type ScrollContainerRef = RefObject<HTMLElement | null>;

const ScrollContainerContext = createContext<ScrollContainerRef | null>(null);

export function ScrollContainerProvider({
  containerRef,
  children,
}: {
  containerRef: ScrollContainerRef;
  children: ReactNode;
}) {
  return (
    <ScrollContainerContext.Provider value={containerRef}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}
