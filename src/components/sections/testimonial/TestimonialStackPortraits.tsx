import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCoverNext } from "@/components/kit/sectionNeighbour";
import { useKitMotion } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = { quote: string; name: string; role?: string; imageSrc?: string; imageAlt?: string };

type TestimonialStackPortraitsProps = {
  label?: string;
  items?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=1200`;

const defaultItems: Testimonial[] = [
  { quote: "They found the idea we could not put into words, then made it look obvious.", name: "Priya Nair", role: "Founder, Field Notes", imageSrc: photo(7006690) },
  { quote: "Clear process, honest feedback and a brand our whole team is proud of.", name: "Jonas Reid", role: "CEO, Northbound", imageSrc: photo(8327756) },
];

const STEP = 6;

const pad = (value: number) => String(value).padStart(2, "0");

const TestimonialStackPortraits = ({ label = "Kind words", items = defaultItems, ariaLabel, className }: TestimonialStackPortraitsProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const count = items.length;
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);
  useCoverNext(section);
  const { scrollYProgress: held } = useScroll({ target: section, offset: ["start start", "end start"] });
  const shade = useTransform(held, (p) => Math.min(1, Math.max(0, p / 0.5)) * 0.45);
  const hasPhotos = items.some((item) => item.imageSrc);
  const current = items[active] ?? items[0];
  const words = current ? `“${current.quote}”`.split(/\s+/) : [];

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), STEP * 1000);
    return () => window.clearTimeout(id);
  }, [reduce, paused, count, active, cycle]);

  const go = (index: number) => {
    setActive(((index % count) + count) % count);
    setCycle((c) => c + 1);
  };

  if (!count || !current) return null;

  return (
    <section
      ref={section}
      aria-label={ariaLabel ?? label ?? "Testimonials"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn("relative -mb-[100svh] h-[200svh] bg-background text-foreground", className)}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pb-[clamp(1rem,3svh,1.5rem)] pt-[4.5rem] lg:py-[clamp(1.5rem,6svh,4.5rem)]">
        <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[3] bg-black" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: "2rem" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: kit.base, ease: kit.ease }}
          className={cn("kit-card mx-auto grid h-full w-[var(--container)] grid-cols-1 overflow-hidden", hasPhotos && "grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-2 lg:grid-rows-1")}
        >
          {hasPhotos && (
            <div className="relative h-full min-h-0 w-full overflow-hidden">
              {items.map((item, index) => {
                if (!item.imageSrc) return null;
                const on = index === active;
                return (
                  <motion.div
                    key={`${index}-${item.imageSrc}`}
                    initial={false}
                    animate={reduce ? { opacity: on ? 1 : 0 } : { y: on ? "0%" : "100%" }}
                    transition={{ duration: on ? 1.1 : 0, delay: on ? 0 : 1.1, ease: kit.easeInOut }}
                    style={{ zIndex: on ? 2 : 1 }}
                    className="absolute inset-0 overflow-hidden rounded-[var(--radius-card)]"
                  >
                    <MotionMedia
                      src={item.imageSrc}
                      alt={on ? item.imageAlt ?? item.name : ""}
                      aria-hidden={!on}
                      loading="lazy"
                      decoding="async"
                      initial={false}
                      animate={reduce ? undefined : { scale: on ? 1 : 1.08 }}
                      transition={{ duration: on ? 1.3 : 0, delay: on ? 0 : 1.1, ease: kit.ease }}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="flex min-w-0 flex-col justify-between gap-6 p-[clamp(1.25rem,4vw,3.5rem)] lg:gap-10">
            <div className="flex items-center justify-between gap-6">
              {label && <p className="flex items-center gap-2 text-[length:var(--text-small)] font-medium leading-none text-muted-foreground before:h-3 before:w-2.5 before:shrink-0 before:rounded-t-full before:bg-tint-3 before:content-['']">{label.replace(/^\(\s*|\s*\)$/g, "")}</p>}
              <p className="ml-auto shrink-0 font-mono text-[length:var(--text-label)] tabular-nums leading-none">
                {pad(active + 1)}/{pad(count)}
              </p>
            </div>

            <div className="grid">
              <div aria-hidden="true" className="invisible col-start-1 row-start-1 grid">
                {items.map((item, index) => (
                  <div key={index} className="col-start-1 row-start-1 flex flex-col gap-[clamp(2rem,5svh,3.5rem)]">
                    <p className="text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere]">{`“${item.quote}”`}</p>
                    <div className="flex flex-col gap-1 text-[length:var(--text-small)] leading-[1.3]">
                      <p>{item.name}</p>
                      {item.role && <p>{item.role}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div aria-live="polite" className="col-start-1 row-start-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={active}
                    initial={reduce ? false : "enter"}
                    animate="show"
                    exit="leave"
                    variants={{ leave: { opacity: 0, transition: { duration: kit.fast } } }}
                    className="flex flex-col gap-[clamp(2rem,5svh,3.5rem)]"
                  >
                    <blockquote className="text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere]">
                      <p className="sr-only">{current.quote}</p>
                      {words.map((word, i) => (
                        <Fragment key={i}>
                          <motion.div
                            aria-hidden="true"
                            variants={{
                              enter: { opacity: 0, y: "0.5em" },
                              show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: i * 0.04 } },
                            }}
                            className="inline-block"
                          >
                            {word}
                          </motion.div>
                          {i < words.length - 1 && " "}
                        </Fragment>
                      ))}
                    </blockquote>
                    <figcaption className="flex flex-col gap-1 text-[length:var(--text-small)] leading-[1.3]">
                      <motion.p
                        variants={{ enter: { opacity: 0, y: "0.5em" }, show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: 0.25 } } }}
                        className="font-medium"
                      >
                        {current.name}
                      </motion.p>
                      {current.role && (
                        <motion.p
                          variants={{ enter: { opacity: 0, y: "0.5em" }, show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: 0.32 } } }}
                          className="text-muted-foreground"
                        >
                          {current.role}
                        </motion.p>
                      )}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            {count > 1 ? (
              <div className="flex w-full max-w-[24rem] gap-3">
                {items.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show testimonial ${index + 1} from ${item.name}`}
                    aria-current={index === active}
                    onClick={() => go(index)}
                    className="relative h-6 flex-1 cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-foreground/20" />
                    {index === active && (
                      <motion.div
                        key={`${active}-${cycle}-${paused}`}
                        initial={{ scaleX: reduce || paused ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: reduce || paused ? 0 : STEP, ease: "linear" }}
                        className="absolute inset-x-0 top-1/2 -mt-px h-[2px] origin-left rounded-full bg-foreground"
                      />
                    )}
                    {index < active && <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-foreground" />}
                  </button>
                ))}
              </div>
            ) : (
              <div aria-hidden="true" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialStackPortraits;
