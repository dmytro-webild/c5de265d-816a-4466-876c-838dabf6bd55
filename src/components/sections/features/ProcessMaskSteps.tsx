import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import StickyChapters from "@/components/library/scenes/scroll/StickyChapters";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Step = { title: string; description?: string; imageSrc?: string; imageAlt?: string };

type ProcessMaskStepsProps = {
  label?: string;
  title?: string;
  description?: string;
  items?: Step[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=1200`;

const defaultItems: Step[] = [
  { title: "Listen", description: "We start with conversations, not slides, to find what makes you different.", imageSrc: photo(3184465) },
  { title: "Shape", description: "Ideas turn into sketches, systems and a clear direction you can react to.", imageSrc: photo(4219134) },
  { title: "Build", description: "We design and ship every piece, from the mark to the live website.", imageSrc: photo(1181467) },
  { title: "Launch", description: "We go live together and stay close while it finds its feet.", imageSrc: photo(3184291) },
];

const TINTS = ["bg-tint-1", "bg-tint-2", "bg-tint-3"];

const ProcessMaskSteps = ({ label = "Process", title = "How we work", description, items = defaultItems, ariaLabel, className }: ProcessMaskStepsProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const words = title ? title.split(/\s+/) : [];
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const lockRef = useRef<number | null>(null);
  const unlockRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = sceneRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const step = Number((entry.target as HTMLElement).dataset.step);
          if (lockRef.current !== null && step !== lockRef.current) return;
          setActive(step);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    root.querySelectorAll("[data-step]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const select = (index: number) => {
    const chapter = sceneRef.current?.querySelector(`[data-step="${index}"]`)?.parentElement;
    const wrapper = chapter?.offsetParent;
    setActive(index);
    if (!chapter || !(wrapper instanceof HTMLElement)) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY + chapter.offsetTop + chapter.offsetHeight / 2 - window.innerHeight / 2;
    lockRef.current = index;
    window.clearTimeout(unlockRef.current);
    const unlock = () => {
      lockRef.current = null;
    };
    if (lenis) {
      lenis.scrollTo(top, { immediate: reduce, force: true, onComplete: unlock });
      unlockRef.current = window.setTimeout(unlock, 2500);
    } else {
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      unlockRef.current = window.setTimeout(unlock, 1200);
    }
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: "1.5rem" },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  if (!items.length) return null;

  return (
    <section aria-label={ariaLabel ?? title ?? label ?? "Process"} className={cn("relative overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-[clamp(2.5rem,5vw,5rem)]">
        <div className="lg:relative">
          <div className="flex flex-col gap-[clamp(1rem,1.6vw,1.5rem)] lg:sticky lg:top-[clamp(6rem,9vw,8rem)]">
            {title && (
              <h2 className="max-w-[12em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
                {words.map((word, i) => (
                  <Fragment key={i}>
                    <motion.div {...rise(0.05 + i * 0.04)} className="inline-block">
                      {word}
                    </motion.div>
                    {i < words.length - 1 && " "}
                  </Fragment>
                ))}
              </h2>
            )}
            {description && (
              <motion.p {...rise(0.2)} className="max-w-[30em] text-balance text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground">
                {description}
              </motion.p>
            )}
            <motion.ol {...rise(0.25)} className="mt-[clamp(1rem,2vw,2rem)] hidden flex-col border-t border-border lg:flex">
              {items.map((item, index) => (
                <li key={index} className="border-b border-border">
                  <button
                    type="button"
                    aria-current={index === active ? "step" : undefined}
                    onClick={() => select(index)}
                    className="flex w-full cursor-pointer items-center gap-[clamp(0.875rem,1.4vw,1.25rem)] py-[clamp(0.75rem,1.2vw,1rem)] text-left"
                  >
                    <p
                      aria-hidden="true"
                      className={cn(
                        "flex size-[2.25em] shrink-0 items-center justify-center rounded-full border text-[length:var(--text-label)] font-medium leading-none tabular-nums transition-colors duration-300",
                        index === active ? cn("border-transparent text-deep", TINTS[index % TINTS.length]) : "border-border text-muted-foreground",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={cn("text-[length:var(--text-h3)] font-normal leading-[1.1] tracking-[var(--heading-tracking)] transition-colors duration-300", index === active ? "text-foreground" : "text-muted-foreground")}>
                      {item.title}
                    </p>
                  </button>
                  {item.description && (
                    <div
                      aria-hidden={index !== active}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)] motion-reduce:transition-none",
                        index === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="w-[min(100%,26rem)] pb-[clamp(0.875rem,1.4vw,1.25rem)] pl-[calc(2.25*var(--text-label)+clamp(0.875rem,1.4vw,1.25rem))] text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </motion.ol>
          </div>
        </div>

        <div ref={sceneRef}>
          <StickyChapters
            images={items.map((item) => ({ imageSrc: item.imageSrc ?? "", imageAlt: item.imageAlt ?? item.title }))}
            className="w-full px-0 py-[clamp(2rem,6vw,6rem)]"
            chapterClassName="aspect-auto rounded-[var(--radius-card)]"
            renderChapter={(index) => {
              const item = items[index];
              return (
                <div data-step={index} className={cn("flex flex-col gap-[clamp(0.875rem,1.4vw,1.25rem)] p-[clamp(0.5rem,1vw,0.875rem)]", TINTS[index % TINTS.length])}>
                  {item.imageSrc && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[max(0px,calc(var(--radius-card)-clamp(0.5rem,1vw,0.875rem)))] lg:aspect-[5/4]">
                      <Media src={item.imageSrc} alt={item.imageAlt ?? item.title} loading={index < 2 ? "eager" : "lazy"} decoding="async" className="absolute inset-0 size-full object-cover" />
                    </div>
                  )}
                  <h3 className="px-[clamp(0.25rem,0.8vw,0.75rem)] text-[length:var(--text-h3)] leading-[1.15] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere] lg:hidden">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="-mt-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(0.25rem,0.8vw,0.75rem)] pb-[clamp(0.25rem,0.8vw,0.75rem)] text-[length:var(--text-body)] leading-[1.5] opacity-75 lg:hidden">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessMaskSteps;
