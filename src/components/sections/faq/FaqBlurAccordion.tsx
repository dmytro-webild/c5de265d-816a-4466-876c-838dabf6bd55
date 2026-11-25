import { Fragment, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Faq = { title: string; description: string };

type FaqBlurAccordionProps = {
  title?: string;
  description?: string;
  items?: Faq[];
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Faq[] = [
  { title: "How long does a project take?", description: "Most brand projects run six to ten weeks. Websites add four to eight weeks depending on scope." },
  { title: "Do you offer support after launch?", description: "Yes. We offer a monthly plan for updates, new pages and fresh brand assets." },
  { title: "How do payments work?", description: "Half up front to book the slot, the rest split across agreed milestones." },
];

const FaqBlurAccordion = ({
  title = "Questions, answered.",
  description = "Everything clients usually ask before we start. Still curious? Write to us.",
  items = defaultItems,
  ariaLabel,
  className,
}: FaqBlurAccordionProps) => {
  const reduce = !!useReducedMotion();
  const kit = useKitMotion();
  const [open, setOpen] = useState<number[]>([]);
  const words = title.split(/\s+/).filter(Boolean);
  const toggle = (index: number) => setOpen((list) => (list.includes(index) ? list.filter((i) => i !== index) : [...list, index]));
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: "1.5rem" },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-[clamp(2rem,5vw,3rem)] lg:grid-cols-12">
        <div className="flex flex-col gap-[clamp(1rem,1.6vw,1.5rem)] lg:sticky lg:top-[clamp(5rem,8vw,7rem)] lg:col-span-5 lg:self-start">
          <h2
            aria-label={title}
            className="max-w-[12em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
          >
            {words.map((word, index) => (
              <Fragment key={index}>
                <motion.div aria-hidden="true" {...rise(index * 0.04)} className="inline-block">
                  {word}
                </motion.div>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          {description && (
            <motion.p {...rise(0.15)} className="max-w-[32ch] text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground">
              {description}
            </motion.p>
          )}
        </div>
        <ul className="border-t border-border lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          {items.map((item, index) => {
            const isOpen = open.includes(index);
            return (
              <motion.li key={index} {...rise(Math.min(index, 8) * 0.05)} className="border-b border-border">
                <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggle(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[var(--gap)] py-[clamp(1rem,1.6vw,1.25rem)] text-left"
                >
                  <p className="min-w-0 text-[length:var(--text-body)] font-medium leading-[1.35] tracking-normal [font-family:var(--font-body)] [overflow-wrap:anywhere]">{item.title}</p>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className={cn("h-4 w-4 shrink-0 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]", isOpen && "rotate-180")}
                  >
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: "auto" }}
                      exit={reduce ? undefined : { height: 0 }}
                      transition={{ duration: kit.base * 0.6, ease: kit.easeInOut }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={reduce ? false : { opacity: 0, y: "1rem" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 }}
                        className="max-w-[46ch] pb-[clamp(1.25rem,2vw,1.5rem)] pr-8 text-[length:var(--text-body)] leading-[1.55] text-muted-foreground [overflow-wrap:anywhere]"
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqBlurAccordion;
