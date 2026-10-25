"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SKU } from "@/content/product";

type CartState = {
  sku: typeof SKU;
  qty: number;
  setQty: (qty: number) => void;
  reset: () => void;
};

/** Client cart stores identifiers + quantities only — never price or PII. */
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      sku: SKU,
      qty: 1,
      setQty: (qty) => set({ qty: Math.min(5, Math.max(1, Math.floor(qty))) }),
      reset: () => set({ sku: SKU, qty: 1 }),
    }),
    { name: "aura-cart", partialize: (s) => ({ sku: s.sku, qty: s.qty }) },
  ),
);
