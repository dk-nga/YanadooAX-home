"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = "contact" | "diagnosis";

type ContactWidgetContextValue = {
  isOpen: boolean;
  modalType: ModalType;
  openContactWidget: () => void;
  openDiagnosisModal: () => void;
  closeContactWidget: () => void;
  toggleContactWidget: () => void;
};

const ContactWidgetContext = createContext<ContactWidgetContextValue | undefined>(undefined);

export function ContactWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("contact");

  const openContactWidget = () => {
    setModalType("contact");
    setIsOpen(true);
  };

  const openDiagnosisModal = () => {
    setModalType("diagnosis");
    setIsOpen(true);
  };

  const closeContactWidget = () => setIsOpen(false);
  const toggleContactWidget = () => setIsOpen((current) => !current);

  return (
    <ContactWidgetContext.Provider
      value={{
        isOpen,
        modalType,
        openContactWidget,
        openDiagnosisModal,
        closeContactWidget,
        toggleContactWidget,
      }}
    >
      {children}
    </ContactWidgetContext.Provider>
  );
}

export function useContactWidget() {
  const context = useContext(ContactWidgetContext);

  if (!context) {
    throw new Error("useContactWidget must be used within a ContactWidgetProvider");
  }

  return context;
}
