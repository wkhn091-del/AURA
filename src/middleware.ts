import { NextResponse, type NextRequest } from "next/server";

function buildCsp(nonce: string, reportOnly: boolean): string {
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    isDev ? "'unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.stripe.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.stripe.com https://*.sanity.io https://cdn.sanity.io https://challenges.cloudflare.com https://*.sentry.io",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://checkout.stripe.com",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];

  if (!reportOnly) {
    // enforce mode — same directives
  }

  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const reportOnly = process.env.CSP_ENFORCE !== "1";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const csp = buildCsp(nonce, reportOnly);
  response.headers.set(
    reportOnly
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy",
    csp,
  );
  response.headers.set("x-nonce", nonce);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  const path = request.nextUrl.pathname;
  if (
    path.startsWith("/account") ||
    path.startsWith("/api/orders") ||
    path.startsWith("/success")
  ) {
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|hero/|lifestyle/|sequence/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
