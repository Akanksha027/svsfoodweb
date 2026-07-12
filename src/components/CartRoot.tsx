"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer, FloatingCartButton } from "@/components/CartDrawer";

export function CartRoot({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <FloatingCartButton />
    </CartProvider>
  );
}
