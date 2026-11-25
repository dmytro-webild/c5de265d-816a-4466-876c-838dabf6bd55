import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkles, Clock, Calendar } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type PackageTier = {
  name: string;
  badge?: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  delivery: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
};

const defaultTiers: PackageTier[] = [
  {
    name: "Essential Single-Page",
    badge: "Quick Launch",
    price: "2,500",
    currency: "AED",
    period: "one-time",
    description: "Ideal for local cafes, repair shops, and single-location service businesses needing a crisp online presence fast.",
    delivery: "1 to 2 Weeks",
    popular: false,
    features: [
      "Custom single-page responsive website",
      "Digital menu or service pricing list",
      "Direct WhatsApp & one-tap call buttons",
      "Google Maps location setup & link",
      "Basic local search setup (SEO)",
      "Mobile speed & touch optimization",
      "Full client handover guide"
    ],
    ctaText: "Book Free Review",
    ctaHref: "#contact-arch-window"
  },
  {
    name: "Standard Multi-Page",
    badge: "Most Popular",
    price: "5,000",
    currency: "AED",
    period: "one-time",
    description: "Our complete business build for restaurants, salons, and clinics looking for maximum local customer conversion.",
    delivery: "2 to 3 Weeks",
    popular: true,
    features: [
      "Full multi-page custom web design",
      "Interactive menu / treatment catalog",
      "Table reservation or appointment booking link",
      "Google Maps & reviews integration",
      "WhatsApp chat & direct phone conversion",
      "Basic search setup & social link alignment",
      "Complete editing handover session",
      "1 month post-launch support included"
    ],
    ctaText: "Choose Standard",
    ctaHref: "#contact-arch-window"
  },
  {
    name: "Custom Business Suite",
    badge: "Tailored Scope",
    price: "8,500+",
    currency: "AED",
    period: "starting from",
    description: "For multi-location brands, high-volume dining venues, and businesses requiring dual language (English & Arabic) setup.",
    delivery: "3 to 4 Weeks",
    popular: false,
    features: [
      "Multi-location support & branch selector",
      "English–Arabic dual language layout",
      "Advanced booking or online ordering connections",
      "Custom photo & brand asset formatting",
      "Ongoing updates & priority maintenance plan",
      "Dedicated WhatsApp account setup",
      "Priority launch & team handover"
    ],
    ctaText: "Request Scope Quote",
    ctaHref: "#contact-arch-window"
  }
];

type PackagesSectionProps = {
  label?: string;
  title?: string;
  description?: string;
  scopeDisclaimer?: string;
  tiers?: PackageTier[];
  ariaLabel?: string;
  className?: string;
};

export default function PackagesSection({
  label = "Transparent Pricing",
  title = "Three packages built for local UAE businesses",
  description = "No hidden fees or unexpected costs. Select a plan or request a custom scope tailored to your business needs.",
  scopeDisclaimer = "MECLIN confirms the exact scope, deliverable list, and fixed timeline in writing before starting any project.",
  tiers = defaultTiers,
  ariaLabel,
  className
}: PackagesSectionProps) {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: "1.5rem" },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay }
  });

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn("relative bg-background py-[var(--section-space)] text-foreground border-b border-border", className)}
    >
      <div className="mx-auto w-[var(--container)]">
        {/* Header */}
        <div className="mb-[clamp(2.5rem,5vw,4rem)] text-center max-w-3xl mx-auto">
          {label && (
            <motion.p
              {...rise(0)}
              className="inline-flex items-center gap-2 text-[length:var(--text-small)] font-medium text-muted-foreground before:size-2 before:shrink-0 before:rounded-full before:bg-tint-3 before:content-[''] mb-4"
            >
              {label}
            </motion.p>
          )}
          <motion.h2
            {...rise(0.08)}
            className="text-[length:var(--text-h1)] font-normal leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] text-balance"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              {...rise(0.16)}
              className="mt-4 text-[length:var(--text-body-lg)] text-muted-foreground text-balance"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              {...rise(0.1 + index * 0.08)}
              className={cn(
                "relative flex flex-col justify-between rounded-[var(--radius-card)] p-6 md:p-8 transition-all duration-300",
                tier.popular
                  ? "bg-deep text-deep-foreground shadow-2xl ring-2 ring-accent scale-[1.02]"
                  : "bg-card text-foreground border border-border"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1 text-xs font-mono font-bold text-accent-foreground shadow-md">
                  <Sparkles className="size-3.5" />
                  <span>{tier.badge ?? "Most Popular"}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-[length:var(--text-h3)] font-medium leading-tight">
                    {tier.name}
                  </h3>
                  {!tier.popular && tier.badge && (
                    <span className="rounded-full bg-background/80 border border-border px-3 py-1 text-xs font-mono text-muted-foreground">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className={cn("text-xs leading-relaxed mb-6", tier.popular ? "text-deep-foreground/80" : "text-muted-foreground")}>
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-current/15">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-mono font-semibold opacity-75">{tier.currency}</span>
                    <span className="text-4xl md:text-5xl font-bold font-mono tracking-tight">{tier.price}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs font-mono opacity-80">
                    <span>{tier.period}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {tier.delivery}
                    </span>
                  </div>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8 text-xs font-mono">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className={cn("size-4 shrink-0 mt-0.5", tier.popular ? "text-accent" : "text-emerald-600")} />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href={tier.ctaHref}
                  className={cn(
                    "w-full btn-primary text-center justify-center py-3.5 text-xs font-mono uppercase tracking-wider transition-transform active:scale-98",
                    tier.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""
                  )}
                >
                  {tier.ctaText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scope Confirmation Disclaimer */}
        <motion.div
          {...rise(0.3)}
          className="rounded-2xl bg-tint-1/40 border border-border p-5 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-foreground">
            <Calendar className="size-4 text-accent-foreground" />
            <span>{scopeDisclaimer}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
