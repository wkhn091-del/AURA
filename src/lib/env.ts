import "server-only";

function optional(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  stripeSecretKey: optional("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: optional("STRIPE_WEBHOOK_SECRET"),
  resendApiKey: optional("RESEND_API_KEY"),
  turnstileSecret: optional("TURNSTILE_SECRET_KEY"),
  sanityProjectId: optional("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  sanityDataset: optional("NEXT_PUBLIC_SANITY_DATASET") ?? "production",
  sanityApiToken: optional("SANITY_API_TOKEN"),
  siteUrl: optional("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  ordersFromEmail: optional("ORDERS_FROM_EMAIL") ?? "orders@auraaudio.com",
};

export function stripeConfigured(): boolean {
  return Boolean(env.stripeSecretKey);
}
