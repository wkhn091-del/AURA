"use client";

import { useEffect, useState } from "react";
import { site, copy } from "@/content/product";
import { Magnetic } from "@/components/motion";
import { easings } from "@/components/motion/config";

const nav = [
  { href: "#features", label: "Tech" },
  { href: "#gallery", label: "Gallery" },
  { href: "#trust", label: "Why Aura" },
  { href: "#faq", label: "FAQ" },
  { href: "#preorder", label: "Pre-order" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="aura-header" data-scrolled={scrolled ? "" : undefined}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <div className="px-3 pt-3 md:px-6 md:pt-4">
        <div className="aura-header__glass mx-auto flex h-12 max-w-5xl items-center justify-between gap-3 px-3 md:h-14 md:px-4">
          <Magnetic strength={0.18}>
            <a
              href="/"
              className="shrink-0 px-2 font-sans text-[0.9rem] font-semibold tracking-[-0.07em] text-white md:text-[1rem]"
              aria-label={`${site.brandName} home`}
            >
              {site.wordmark}
            </a>
          </Magnetic>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="aura-nav-link relative rounded-full px-3 py-1.5 text-[12px] font-medium tracking-wide text-white/80 transition-colors duration-400 hover:text-white"
                style={{ transitionTimingFunction: easings.premiumOut }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Magnetic strength={0.3}>
            <a
              href="#preorder"
              className="aura-btn-live inline-flex shrink-0 items-center justify-center rounded-full bg-white px-3.5 py-2 text-[11px] font-bold text-black md:px-4 md:text-[12px]"
            >
              {copy.heroCta}
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
