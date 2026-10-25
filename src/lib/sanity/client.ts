import "server-only";

import { createClient, type SanityClient } from "@sanity/client";
import { env } from "@/lib/env";

export function getSanityClient(): SanityClient | null {
  if (!env.sanityProjectId) return null;
  return createClient({
    projectId: env.sanityProjectId,
    dataset: env.sanityDataset,
    apiVersion: "2025-10-01",
    useCdn: true,
    token: env.sanityApiToken,
  });
}

/** Parameterized GROQ only — never concatenate user input into the query string. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch<T>(query, params);
}
