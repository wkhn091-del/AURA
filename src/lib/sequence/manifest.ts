import type { Product } from "@/content/product";

export function frameUrl(
  basePath: string,
  index: number,
  pad: number,
): string {
  return `${basePath}${String(index).padStart(pad, "0")}.webp`;
}

export function pickSequence(product: Product, isMobile: boolean) {
  return isMobile ? product.sequenceMobile : product.sequenceDesktop;
}
