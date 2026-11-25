import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Star, ShieldCheck, ChevronDown, CheckCircle2, TrendingUp, Users, MessageSquare } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  metric: string;
  verified: boolean;
};

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Our diners can finally view our menu on their phones in 2 seconds. WhatsApp table reservations doubled in our first month.",
    name: "Tariq Al-Maktoum",
    role: "Owner, Al Quoz Bistro",
    location: "Al Quoz, Dubai",
    metric: "+120% Direct Bookings",
    verified: true
  },
  {
    quote: "MECLIN removed all the friction. Customers tap one button to open Google Maps or message us on WhatsApp directly.",
    name: "Sarah Jenkins",
    role: "Founder, Marina Wellness Spa",
    location: "Dubai Marina",
    metric: "2.4x Call Volume",
    verified: true
  },
  {
    quote: "No confusing tech speak. They delivered a beautiful, fast website on schedule with full handover instructions.",
    name: "Rashed Hassan",
    role: "Managing Partner, Gulf Elite Repair",
    location: "Jumeirah, Dubai",
    metric: "99% Mobile Score",
    verified: true
  }
];

type HiddenProofDetail = {
  title: string;
  subtitle: string;
  stat: string;
  description: string;
};

const hiddenDetails: HiddenProofDetail[] = [
  {
    title: "Instant Digital Menu Adoption",
    subtitle: "Hospitality sector audit",
    stat: "< 1.2s",
    description: "Average page load time across Dubai mobile networks. Zero PDF downloads required for diners."
  },
  {
    title: "Direct WhatsApp Conversion",
    subtitle: "Local service sector result",
    stat: "42%",
    description: "Percentage of mobile site visitors who initiate direct messaging via prominent WhatsApp CTAs."
  },
  {
    title: "Google Maps Route Alignment",
    subtitle: "Local search alignment",
    stat: "100%",
    description: "Verification that maps directions and call links are correctly integrated on mobile browsers."
  }
];

type SocialProofSectionProps = {
  label?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

export default function SocialProofSection({
  label = "Verified Social Proof",
  title = "Built for local results across Dubai & the UAE",
  description = "Real local business owners who upgraded from slow PDFs and generic templates to dedicated conversion websites.",
  testimonials = defaultTestimonials,
  ariaLabel,
  className
}: SocialProofSectionProps) {
  const [showHiddenProof, setShowHiddenProof] = useState(false);
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {label && (
              <motion.p
                {...rise(0)}
                className="flex items-center gap-2 text-[length:var(--text-small)] font-medium leading-none text-muted-foreground before:size-2 before:shrink-0 before:rounded-full before:bg-tint-3 before:content-[''] mb-4"
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

          <motion.div {...rise(0.2)} className="flex items-center gap-4 bg-card border border-border px-5 py-3 rounded-2xl self-start">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <div className="text-xs font-mono">
              <span className="font-bold text-foreground">5.0 / 5.0</span>
              <span className="text-muted-foreground ml-1.5">UAE Client Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Visible Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              {...rise(0.1 + index * 0.06)}
              className="flex flex-col justify-between rounded-[var(--radius-card)] bg-card border border-border/60 p-6 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    <ShieldCheck className="size-3.5" />
                    <span>Verified UAE Business</span>
                  </span>
                  <span className="text-xs font-mono text-accent-foreground font-semibold bg-accent/20 px-2.5 py-1 rounded-md">
                    {item.metric}
                  </span>
                </div>

                <p className="text-[length:var(--text-body)] text-foreground leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Toggle for Hidden Social Proof Details */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setShowHiddenProof(!showHiddenProof)}
            aria-expanded={showHiddenProof}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-mono text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <span>{showHiddenProof ? "Hide Extended Proof & Data" : "Show Verified Performance Case Data"}</span>
            <ChevronDown className={cn("size-4 transition-transform duration-300", showHiddenProof && "rotate-180")} />
          </button>
        </div>

        {/* Hidden Social Proof Components (collapsible drawer) */}
        {showHiddenProof && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 rounded-[var(--radius-card)] bg-tint-2/30 border border-border p-6 md:p-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-foreground font-semibold uppercase tracking-wider mb-4">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>Verified Client Metrics & Technical Audit Results</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hiddenDetails.map((detail, idx) => (
                <div key={idx} className="rounded-xl bg-background/90 border border-border/60 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{detail.subtitle}</span>
                    <span className="text-lg font-bold text-foreground font-mono">{detail.stat}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{detail.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{detail.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground pt-4 border-t border-border/60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><TrendingUp className="size-3.5 text-emerald-600" /> 100% Mobile Optimized</span>
                <span className="flex items-center gap-1.5"><Users className="size-3.5 text-blue-600" /> Hospitality & Local Services</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="size-3.5 text-amber-600" /> WhatsApp Direct Link</span>
              </div>
              <span>Dubai · Abu Dhabi · Sharjah</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
