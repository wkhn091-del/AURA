import { site } from "@/content/product";
import { AuraLogo } from "@/components/site/AuraLogo";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] w-full border-t border-white/10 bg-[#0a0b0d] text-start">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:px-12 md:py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-20">
        <div className="max-w-xs shrink-0 space-y-4">
          <AuraLogo />
          <p className="text-sm leading-relaxed text-[#A1A1A6]">
            Adaptive quiet for cities that never sleep. Guest checkout. Free
            worldwide shipping.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
              Support
            </p>
            <ul className="space-y-2 text-sm text-[#A1A1A6]">
              <li>
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="transition-colors hover:text-white"
                >
                  <bdi>{site.supportEmail}</bdi>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  <bdi>{site.phone}</bdi>
                </a>
              </li>
              <li className="text-xs text-[#86868B]">
                Mon–Fri · 09:00–18:00 IST
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
              Shop
            </p>
            <ul className="space-y-2 text-sm text-[#A1A1A6]">
              <li>
                <a href="#preorder" className="transition-colors hover:text-white">
                  Pre-order
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-white">
                  Tech
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-3 sm:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
              Legal
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#A1A1A6] sm:flex-col sm:gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-[#86868B] md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
          <p className="leading-relaxed">
            {site.legalEntityName}
            {site.companyNumberIsSimulation
              ? " · Company no. pending"
              : ` · ${site.companyNumber}`}
            <span className="mx-2 text-white/20">·</span>
            {site.registeredAddress}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={site.studioCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1A6] transition-colors hover:text-white"
            >
              {site.studioCreditLabel}
            </a>
            <span className="text-white/20">·</span>
            <p>
              © {year} {site.brandName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
