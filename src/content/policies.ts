export type PolicySlug =
  | "privacy"
  | "terms"
  | "shipping"
  | "returns"
  | "cookies";

export const policies: Record<
  PolicySlug,
  { title: string; body: string[] }
> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "Aura Audio Ltd. processes account, order, and support data to fulfill pre-orders and provide customer service.",
      "Payment data is handled by Stripe. We do not store full card numbers on our servers.",
      "Analytics (GA4, Meta Pixel, Microsoft Clarity) may process usage data when enabled. Contact legal@auraaudio.com for requests.",
      "Contact: legal@auraaudio.com · Ha-Galil St 12, Tiberias, Israel.",
    ],
  },
  terms: {
    title: "Terms of Sale",
    body: [
      "By pre-ordering Aura Pro you agree to purchase from Aura Audio Ltd. at the displayed base price plus taxes calculated at checkout.",
      "Pre-orders ship within an estimated 30 business days after production begins shipping. Dates may shift; material delays will be communicated by email.",
      "Where required by law (including Israel consumer protection and EU distance-selling rules), you have a 14-day cooling-off right from receipt or disclosure, in addition to our 30-day returns policy.",
      "Governing entity: Aura Audio Ltd., Tiberias, Israel.",
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      "Worldwide shipping is free on Aura Pro pre-orders.",
      "Estimated dispatch: within 30 business days after production begins shipping.",
      "Duties or import taxes outside the calculated Stripe Tax amount may apply depending on destination law.",
    ],
  },
  returns: {
    title: "Returns & Cooling-off",
    body: [
      "30-day returns from delivery for Aura Pro in resalable condition.",
      "Customer pays return shipping unless the product arrived defective.",
      "Statutory 14-day distance-selling / cooling-off rights apply where required, in addition to the 30-day policy.",
      "Start a return: support@auraaudio.com",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    body: [
      "Essential cookies keep checkout and security working.",
      "When configured, analytics cookies/scripts (GA4, Meta Pixel, Clarity) help us measure pre-order conversion and improve the site.",
      "You can control cookies via your browser settings. Questions: legal@auraaudio.com",
    ],
  },
};
