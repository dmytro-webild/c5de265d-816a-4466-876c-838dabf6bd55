import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { useCoverNext } from "@/components/kit/sectionNeighbour";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Cta = { text: string; href?: string };

type StatementDarkCtaProps = {
  label?: string;
  title?: string;
  primaryButton?: Cta;
  secondaryButton?: Cta;
  ariaLabel?: string;
  className?: string;
};

const StatementDarkCta = ({
  label = "Start a project",
  title = "Ideas worth building start here",
  primaryButton = { text: "Book a call", href: "#contact" },
  secondaryButton = { text: "See our work", href: "#work" },
  ariaLabel,
  className,
}: StatementDarkCtaProps) => {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  useCoverNext(section);
  const { scrollYProgress: held } = useScroll({ target: section, offset: ["start start", "end start"] });
  const shade = useTransform(held, (p) => Math.min(1, Math.max(0, p / 0.5)) * 0.45);
  const words = title.split(/\s+/).filter(Boolean);
  const longest = Math.max(4, ...words.map((word) => word.length));
  const hidden = { opacity: 0, y: kit.distance };
  const shown = { opacity: 1, y: 0 };

  return (
    <section
      ref={section}
      data-tone="deep"
      aria-label={ariaLabel ?? title}
      className={cn("relative -mb-[100svh] h-[200svh] bg-background text-foreground", className)}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-[var(--section-space)]">
        {!reduce && <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[3] bg-black" />}
        <div className="@container mx-auto flex w-[var(--container)] flex-col gap-[clamp(2rem,5svh,3.5rem)]">
          {label && (
            <motion.p
              initial={reduce ? false : hidden}
              whileInView={shown}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className="flex items-center gap-2 text-[length:var(--text-small)] font-medium leading-none text-muted-foreground before:h-3 before:w-2.5 before:shrink-0 before:rounded-t-full before:bg-tint-3 before:content-['']"
            >
              {label.replace(/^\(\s*|\s*\)$/g, "")}
            </motion.p>
          )}
          <h2
            aria-label={title}
            style={{ fontSize: `min(var(--text-display), 11cqw, 20svh, calc(100cqw / ${(longest * 0.6).toFixed(2)}))` }}
            className="max-w-[11em] text-balance leading-[0.95] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]"
          >
            {words.map((word, i) => (
              <Fragment key={i}>
                <motion.div
                  aria-hidden="true"
                  initial={reduce ? false : hidden}
                  whileInView={shown}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 + i * 0.04 }}
                  className="inline-block pb-[0.06em]"
                >
                  {word}
                </motion.div>
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </h2>
          {(primaryButton || secondaryButton) && (
            <motion.div
              initial={reduce ? false : hidden}
              whileInView={shown}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.1 + words.length * 0.04 }}
              className="flex flex-wrap gap-3"
            >
              {primaryButton && (
                <a href={primaryButton.href ?? "#"} className="btn-primary">
                  <p className="btn-label">{primaryButton.text}</p>
                </a>
              )}
              {secondaryButton && (
                <a href={secondaryButton.href ?? "#"} className="btn-secondary">
                  <p className="btn-label">{secondaryButton.text}</p>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatementDarkCta;
