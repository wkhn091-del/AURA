import "server-only";

import { product, type Product } from "@/content/product";

/**
 * Server-side product truth. When Sanity credentials exist, swap this
 * implementation to GROQ (parameterized). Fallback keeps local content.
 */
export async function getProduct(): Promise<Product> {
  return product;
}
