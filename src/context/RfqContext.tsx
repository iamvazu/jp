'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RfqBasketItem } from '../types';

interface RfqContextType {
  basket: RfqBasketItem[];
  addItem: (item: RfqBasketItem) => void;
  removeItem: (id: string) => void;
  clearBasket: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const RfqContext = createContext<RfqContextType | undefined>(undefined);

export function RfqProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<RfqBasketItem[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jp_rfq_basket');
      if (stored) {
        setBasket(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load RFQ basket:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when basket changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('jp_rfq_basket', JSON.stringify(basket));
    } catch (e) {
      console.error('Failed to save RFQ basket:', e);
    }
  }, [basket, isLoaded]);

  const addItem = (item: RfqBasketItem) => {
    setBasket((prev) => {
      // Check if duplicate exists (matching exact specs)
      const exists = prev.some(
        (i) =>
          i.productName === item.productName &&
          i.specs.awgOrBore === item.specs.awgOrBore &&
          i.specs.voltageClass === item.specs.voltageClass &&
          i.specs.color === item.specs.color
      );
      if (exists) {
        // Open sidebar to show it's already there
        setSidebarOpen(true);
        return prev;
      }
      const updated = [...prev, item];
      // Open sidebar automatically when item is added
      setSidebarOpen(true);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <RfqContext.Provider
      value={{
        basket,
        addItem,
        removeItem,
        clearBasket,
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </RfqContext.Provider>
  );
}

export function useRfq() {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
}
