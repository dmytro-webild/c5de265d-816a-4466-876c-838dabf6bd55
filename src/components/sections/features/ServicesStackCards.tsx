import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const tints = ["bg-tint-1", "bg-tint-2", "bg-tint-3"];

type Service = { title: string; description?: string; tags?: string[]; imageSrc?: string; imageAlt?: string };

type ScopeNotice = { title: string; text: string; details?: string[] };

type ServicesStackCardsProps = {
  title?: string;
  subtitle?: string;
  cta?: { text: string; href: string };
  items?: Service[];
  scopeNotice?: ScopeNotice;
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Service[] = [
  { title: "Brand identity", description: "Names, marks and systems that hold up from a business card to a billboard.", tags: ["Strategy", "Logo", "Guidelines"] },
  { title: "Websites", description: "Fast, considered sites built to be easy to run after launch.", tags: ["Design", "Development", "CMS"] },
  { title: "Campaigns", description: "Launch work that gives a brand a clear voice in every channel.", tags: ["Art direction", "Copy", "Social"] },
];

type CardProps = { item: Service; index: number; last: boolean; reduce: boolean };

const ServiceCard = ({ item, index, last, reduce }: CardProps) => {
  const kit = useKitMotion();
  const sentinel = useRef<HTMLLIElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const inView = useInView(liRef, { once: true, amount: 0.2 });
  const ready = useImageReady(liRef, inView);
  const { scrollYProgress } = useScroll({ target: sentinel, offset: ["start end", "start start"] });
  const active = !reduce && !last;
  const scale = useTransform(scrollYProgress, (v) => (active ? 1 - clamp01(v) * 0.06 : 1));
  const dim = useTransform(scrollYProgress, (v) => (active ? clamp01(v) * 0.14 : 0));
  const tags = item.tags?.filter(Boolean) ?? [];
  const blur = {
    hidden: { opacity: 0, y: "1.5rem" },
    shown: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay } }),
  };
  const step = Math.min(index, 6);

  return (
    <>
      <motion.li
        ref={liRef}
        initial={reduce ? "shown" : "hidden"}
        animate={reduce || (inView && ready) ? "shown" : "hidden"}
        style={reduce ? undefined : { top: `calc(clamp(4.5rem, 3.4rem + 3vw, 6.5rem) + ${step} * clamp(0.5rem, 0.3rem + 0.6vw, 1rem))` }}
        className={cn("relative", !reduce && "sticky", index > 0 && "mt-[clamp(1rem,2vw,1.5rem)]")}
      >
        <motion.div
          style={{ scale }}
          className={cn("relative origin-top overflow-hidden rounded-[var(--radius-card)] text-deep", tints[index % tints.length])}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-[var(--gap)] gap-y-[clamp(1.5rem,3vw,2.5rem)] p-[clamp(1.25rem,2.6vw,2.5rem)] lg:min-h-[clamp(22rem,30vw,28rem)] lg:grid-cols-12">
            <motion.p
              aria-hidden="true"
              variants={blur}
              custom={0.05}
              className="col-start-1 row-start-1 whitespace-nowrap text-[length:var(--text-small)] font-medium leading-none tabular-nums opacity-70 lg:col-span-7"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.p>
            {item.imageSrc && (
              <div className="col-start-2 row-start-1 aspect-[3/4] w-[clamp(5rem,22vw,7rem)] overflow-hidden rounded-t-full rounded-b-[var(--radius-image)] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:aspect-auto lg:h-full lg:min-h-[clamp(16rem,24vw,22rem)] lg:w-full">
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                    shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: kit.slow, ease: kit.easeInOut, delay: 0.15 } },
                  }}
                  className="relative h-full w-full overflow-hidden"
                >
                  <MotionMedia
                    src={item.imageSrc}
                    alt={item.imageAlt ?? ""}
                    loading="lazy"
                    decoding="async"
                    variants={{ hidden: { scale: 1.12 }, shown: { scale: 1, transition: { duration: kit.slow, ease: kit.ease, delay: 0.15 } } }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            )}
            <div className="col-span-2 row-start-2 flex min-w-0 flex-col gap-[clamp(0.75rem,1.4vw,1.25rem)] self-end lg:col-span-7 lg:row-start-2">
              <motion.h3
                variants={blur}
                custom={0.1}
                className="max-w-[14em] text-balance text-[length:var(--text-h2)] leading-[1.05] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
              >
                {item.title}
              </motion.h3>
              {item.description && (
                <motion.p variants={blur} custom={0.18} className="max-w-[36ch] text-[length:var(--text-body)] leading-[1.45] opacity-80 [overflow-wrap:anywhere]">
                  {item.description}
                </motion.p>
              )}
              {tags.length > 0 && (
                <motion.div variants={blur} custom={0.26} className="mt-[clamp(0.25rem,0.8vw,0.75rem)] flex flex-wrap gap-2">
                  {tags.map((tag, tagIndex) => (
                    <p
                      key={tagIndex}
                      className="whitespace-nowrap rounded-full border border-current/20 px-3 py-[0.45rem] font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)]"
                    >
                      {tag}
                    </p>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
        </motion.div>
      </motion.li>
      <li ref={sentinel} aria-hidden="true" className="h-0 list-none" />
    </>
  );
};

const ServicesStackCards = ({
  title = "Services.",
  subtitle,
  cta = { text: "Get in touch", href: "#contact" },
  items = defaultItems,
  scopeNotice,
  ariaLabel,
  className,
}: ServicesStackCardsProps) => {
  const reduce = !!useReducedMotion();
  const kit = useKitMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef);
  const words = title.split(/\s+/).filter(Boolean);

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} data-scene className={cn("relative bg-background py-[var(--section-space)] text-foreground border-b border-border", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2
              aria-label={title}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-[14em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
            >
              {words.map((word, index) => (
                <Fragment key={index}>
                  <motion.div
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, y: "1.5rem" },
                      shown: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: index * 0.04 } },
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.div>
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </motion.h2>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-[length:var(--text-body-lg)] text-muted-foreground text-balance">
                {subtitle}
              </p>
            )}
          </div>
          {cta && (
            <a href={cta.href} className="btn-link shrink-0 self-start whitespace-nowrap lg:self-auto">
              {cta.text}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </a>
          )}
        </div>
        <ol className="mt-[clamp(1.5rem,3vw,3rem)]">
          {items.map((item, index) => (
            <ServiceCard key={index} item={item} index={index} last={index === items.length - 1} reduce={reduce} />
          ))}
        </ol>

        {scopeNotice && (
          <div className="mt-12 rounded-[var(--radius-card)] bg-card border border-border p-6 md:p-8">
            <h4 className="text-[length:var(--text-h3)] font-medium text-foreground mb-2">
              {scopeNotice.title}
            </h4>
            <p className="text-[length:var(--text-body)] text-muted-foreground max-w-3xl leading-relaxed mb-4">
              {scopeNotice.text}
            </p>
            {scopeNotice.details && scopeNotice.details.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {scopeNotice.details.map((detail, idx) => (
                  <span key={idx} className="rounded-full bg-background border border-border px-3 py-1 text-xs font-mono text-foreground">
                    ✓ {detail}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesStackCards;
