import Link from "next/link";
import { site } from "@/content/product";

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-[color:var(--text)]">
      <header className="border-b border-white/10 px-6 py-5">
        <Link href="/" className="text-sm tracking-[-0.04em]">
          {site.wordmark}
        </Link>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-16">{children}</div>
    </div>
  );
}
