import Link from "next/link";
import { site } from "@/content/product";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-[color:var(--text)]">
      <p className="mb-3 font-sans text-sm tracking-[-0.04em] text-white/80">
        {site.wordmark}
      </p>
      <h1 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">
        You’re on the list.
      </h1>
      <p className="mt-4 max-w-md text-[#A1A1A6]">
        Your Aura Pro pre-order is confirmed
        {sessionId ? " and a receipt is on its way." : "."} We’ll ship within 30
        business days after production begins shipping.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-white px-8 py-3 font-bold text-black hover:scale-105"
      >
        Back to Aura
      </Link>
    </main>
  );
}
