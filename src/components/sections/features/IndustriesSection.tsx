import { motion, useReducedMotion } from "motion/react";
import { Utensils, Coffee, Stethoscope, Wrench, Scissors, Dumbbell, Store, ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type IndustryItem = {
  icon: typeof Utensils;
  title: string;
  badge: string;
  action: string;
  description: string;
};

const defaultIndustries: IndustryItem[] = [
  {
    icon: Utensils,
    title: "Restaurants",
    badge: "Hospitality",
    action: "Browse menu & book a table",
    description: "Browse the visual digital menu, reserve a dining table in seconds, or open a direct online ordering link without downloading heavy PDFs."
  },
  {
    icon: Coffee,
    title: "Coffee Shops & Cafés",
    badge: "Café & Bakery",
    action: "See drinks, hours & branches",
    description: "See specialty drink menus, check live opening hours, and open one-tap Google Maps directions to the nearest branch."
  },
  {
    icon: Stethoscope,
    title: "Clinics & Medical",
    badge: "Healthcare",
    action: "Browse services & book appointments",
    description: "Browse medical services and clear treatment lists, then reach the clinic's instant appointment booking system or direct WhatsApp desk."
  },
  {
    icon: Wrench,
    title: "Plumbers & Repair",
    badge: "Home Services",
    action: "Check service area & request quote",
    description: "Check covered neighborhoods in Dubai and the UAE, view common repair rates, and submit rapid quote requests or emergency callouts."
  },
  {
    icon: Scissors,
    title: "Salons & Spas",
    badge: "Beauty & Wellness",
    action: "Compare treatments & prices",
    description: "Compare treatment packages, view haircut and spa service pricing upfront, and tap directly into online reservation platforms."
  },
  {
    icon: Dumbbell,
    title: "Gyms & Fitness",
    badge: "Sports & Fitness",
    action: "View class schedules & claim trial",
    description: "View daily group class timetables, explore trainer profiles, and claim a free day pass or trial session with a single tap."
  },
  {
    icon: Store,
    title: "Other Local Businesses",
    badge: "Services & Retail",
    action: "Understand offer & contact fast",
    description: "Understand your core offer within 5 seconds of landing, find your exact location, and connect directly via phone call or WhatsApp."
  }
];

type IndustriesSectionProps = {
  label?: string;
  title?: string;
  description?: string;
  industries?: IndustryItem[];
  ariaLabel?: string;
  className?: string;
};

export default function IndustriesSection({
  label = "Sectors & Outcomes",
  title = "What should your customers be able to do?",
  description = "Every local business type requires a frictionless customer journey. We build targeted features so your visitors take immediate action.",
  industries = defaultIndustries,
  ariaLabel,
  className
}: IndustriesSectionProps) {
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
        <div className="mb-[clamp(2.5rem,5vw,4rem)] max-w-3xl">
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
              className="mt-4 text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground text-balance"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                {...rise(0.1 + index * 0.05)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-[var(--radius-card)] bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-lg border border-border/50 hover:border-primary/20",
                  index === industries.length - 1 && "md:col-span-2 lg:col-span-3 bg-tint-2/20"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-6 stroke-[1.75]" />
                    </div>
                    <span className="rounded-full bg-background/80 border border-border px-3 py-1 text-xs font-mono text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-[length:var(--text-h3)] font-medium leading-[1.2] text-foreground mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-foreground font-semibold bg-accent/20 px-2.5 py-1 rounded-md mb-3">
                    <span>{item.action}</span>
                  </div>

                  <p className="text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Optimized journey</span>
                  <ArrowUpRight className="size-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
