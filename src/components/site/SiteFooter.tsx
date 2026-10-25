import { site } from "@/content/product";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 w-full border-t border-white/10 pt-10 text-sm text-[#86868B]">
      <div className="mx-auto grid max-w-6xl gap-10 px-2 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
        <div className="space-y-3 text-center md:text-start">
          <p className="font-sans text-base font-semibold tracking-[-0.05em] text-white">
            {site.wordmark}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {site.slogan}
          </p>
          <p className="max-w-xs text-xs leading-relaxed md:max-w-sm">
            Adaptive quiet for cities that never sleep. Guest checkout. Free
            worldwide shipping.
          </p>
        </div>

        <div className="space-y-3 text-center md:text-start">
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">
            Support
          </p>
          <p>
            <a
              href={`mailto:${site.supportEmail}`}
              className="hover:text-zinc-300"
            >
              <bdi>{site.supportEmail}</bdi>
            </a>
          </p>
          <p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="hover:text-zinc-300"
            >
              <bdi>{site.phone}</bdi>
            </a>
          </p>
          <p className="text-xs">Mon–Fri · 09:00 to 18:00 · Israel time</p>
        </div>

        <div className="space-y-3 text-center md:text-start">
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">
            Legal
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:flex-col md:justify-start">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-zinc-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl space-y-2 border-t border-white/5 px-2 pb-2 pt-6 text-center text-xs leading-relaxed">
        <p>
          {site.legalEntityName}
          {site.companyNumberIsSimulation
            ? " · Company no. pending"
            : ` · ${site.companyNumber}`}
        </p>
        <p>{site.registeredAddress}</p>
        <p>
          <a
            href={site.studioCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A1A1A6] hover:text-white"
          >
            {site.studioCreditLabel}
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} {site.brandName}
        </p>
      </div>
    </footer>
  );
}
