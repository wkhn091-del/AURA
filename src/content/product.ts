export const SKU = "AURA-PRO-01" as const;

export type ProductStatus = "preorder_open" | "preorder_sold_out" | "waitlist";

export type Product = {
  title: string;
  sku: typeof SKU;
  colorName: string;
  priceCents: number;
  currency: "usd";
  status: ProductStatus;
  preorderShipNote: string;
  isSimulationImagery: boolean;
  heroPosterSrc: string;
  heroPosterMobileSrc: string;
  lifestyleSrc: string;
  colorLineupSrc: string;
  colorSeriesVideoSrc: string;
  gallery: { src: string; alt: string }[];
  sequenceDesktop: { basePath: string; frameCount: number; pad: number };
  sequenceMobile: { basePath: string; frameCount: number; pad: number };
};

export const product: Product = {
  title: "Aura Pro",
  sku: SKU,
  colorName: "Titanium Black",
  priceCents: 34900,
  currency: "usd",
  status: "preorder_open",
  preorderShipNote:
    "Pre-order · Ships within 30 business days after production begins shipping",
  isSimulationImagery: false,
  heroPosterSrc: "/hero/end-frame.jpg",
  heroPosterMobileSrc: "/hero/end-frame-portrait.png",
  lifestyleSrc: "/lifestyle/city-street.png",
  colorLineupSrc: "/lifestyle/color-lineup.png",
  colorSeriesVideoSrc: "/video/aura-color-series.mp4",
  gallery: [
    {
      src: "/lifestyle/city-street.png",
      alt: "Aura Pro on a crowded city street",
    },
    {
      src: "/lifestyle/mall-crew.png",
      alt: "Friends wearing Aura Pro in the mall",
    },
    {
      src: "/lifestyle/park-focus.jpg",
      alt: "Aura Pro in the park — focus mode",
    },
  ],
  sequenceDesktop: {
    basePath: "/sequence/desktop/frame_",
    frameCount: 0,
    pad: 3,
  },
  sequenceMobile: {
    basePath: "/sequence/mobile/frame_",
    frameCount: 0,
    pad: 3,
  },
};

export const site = {
  brandName: "Aura Audio",
  wordmark: "AURA",
  slogan: "BEYOND SOUND",
  supportEmail: "support@auraaudio.com",
  legalEmail: "legal@auraaudio.com",
  ordersEmail: "orders@auraaudio.com",
  phone: "+972 50-396-7230",
  legalEntityName: "Aura Audio Ltd.",
  companyNumber: "516000000",
  companyNumberIsSimulation: true,
  registeredAddress: "Ha-Galil St 12, Tiberias, Israel",
  studioCreditLabel: "Developed by Studio Omek",
  studioCreditUrl: "https://omek-studio.vercel.app",
  freeShipping: true,
} as const;

export const copy = {
  heroH1: "40 hours of silence you can wear.",
  heroH2:
    "AI-driven ANC that adapts to your city — traffic, trains, and open workspaces. Premium sound, without the generic markup.",
  heroCta: "Pre-order Now",
  heroReassurance:
    "Free worldwide shipping · Ships within 30 business days · Guest checkout",
  lifestyleH2: "Built for streets that never quiet down.",
  lifestyleBody:
    "Adaptive ANC reads the room — traffic, trains, open offices — and reshapes the quiet around you. Titanium drivers keep bass deep and midrange clean. One charge: up to 40 hours of playback.",
  lifestyleCta: "See the tech",
  colorsEyebrow: "Color series",
  colorsH2: "Your sound. Your color.",
  colorsBody:
    "Elevate your everyday with the all-new color series. Launch SKU is Titanium Black — companion finishes preview the line.",
  galleryH2: "Every angle. Same instrument.",
  checkoutH2: "Own the quiet.",
  priceLine: "$349 · Free worldwide shipping",
  taxNote: "Taxes calculated at checkout",
  primaryCta: "Pre-order Now",
  floatingCta: "Order Now",
  soldOut: "Pre-order sold out",
  waitlistCta: "Join the waitlist",
  waitlistSuccess:
    "You’re on the list. We’ll email you when pre-order reopens.",
} as const;

export const features = [
  {
    title: "Adaptive ANC",
    description:
      "Listens to the environment and retunes cancellation so city noise stays outside the mix.",
    mono: "ANC",
  },
  {
    title: "Titanium drivers",
    description:
      "Rigid diaphragms for deep, clean bass and highs that don’t smear.",
    mono: "Ti",
  },
  {
    title: "40-hour battery",
    description:
      "All-day listening, then another day — without hunting an outlet.",
    mono: "40 hr",
  },
] as const;
