import { Fragment, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import { useKitMotion } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Project = { title: string; date?: string; imageSrc: string; imageAlt?: string; href?: string };

type GalleryArchTrackProps = {
  title?: string;
  label?: string;
  items?: Project[];
  ariaLabel?: string;
  className?: string;
};

const TRAVEL = 0.12;
const SHIFT = (TRAVEL / (1 + 2 * TRAVEL)) * 100;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
const pad = (value: number) => String(value).padStart(2, "0");

const TINTS = ["bg-tint-1", "bg-tint-2", "bg-tint-3"];

const DEFAULT_ITEMS: Project[] = [
  { title: "Kroma", date: "_11.25", imageSrc: px(11535793) },
  { title: "Asterisk", date: "_09.25", imageSrc: px(16982897) },
  { title: "Zypher®", date: "_06.25", imageSrc: px(34179816) },
  { title: "Grotesks", date: "_03.25", imageSrc: px(12336392) },
];

const Photo = ({ item, drift, className }: { item: Project; drift?: MotionValue<string>; className: string }) => (
  <div className={cn("relative overflow-hidden rounded-[var(--radius-image)]", className)}>
    <MotionMedia
      src={item.imageSrc}
      alt={item.imageAlt ?? ""}
      loading="lazy"
      decoding="async"
      style={drift ? { x: drift, left: `${-TRAVEL * 100}%`, width: `${(1 + 2 * TRAVEL) * 100}%` } : undefined}
      className="absolute inset-y-0 left-0 h-full w-full max-w-none object-cover will-change-transform"
    />
  </div>
);

const Linked = ({ item, className, children }: { item: Project; className?: string; children: ReactNode }) =>
  item.href ? (
    <a href={item.href} className={cn("block", className)}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const TrackCard = ({ item, index, drift }: { item: Project; index: number; drift?: MotionValue<string> }) => {
  const shape = index % 3;
  if (shape === 0)
    return (
      <Linked item={item} className="w-[30svh]">
        <div className="mb-[0.75rem] flex items-baseline justify-between gap-4 px-[0.25rem]">
          <p aria-hidden="true" className="text-[length:var(--text-label)] leading-none text-muted-foreground [font-family:var(--font-label)]">{pad(index + 1)}</p>
          {item.date && <p className="whitespace-nowrap text-[length:var(--text-label)] leading-none text-muted-foreground [font-family:var(--font-label)]">{item.date}</p>}
        </div>
        <Photo item={item} drift={drift} className="h-[46svh] w-full" />
        <h3 className="mt-[0.875rem] px-[0.25rem] text-[length:var(--text-h3)] font-medium uppercase leading-[1.05] tracking-[-0.01em] [overflow-wrap:anywhere]">{item.title}</h3>
      </Linked>
    );
  if (shape === 1)
    return (
      <Linked item={item} className="mt-[14svh] w-[min(54svh,78vw)]">
        <Photo item={item} drift={drift} className="h-[36svh] w-full" />
        <div className="mt-[0.875rem] flex items-baseline justify-between gap-4 px-[0.75rem]">
          {item.date && <p className="shrink-0 whitespace-nowrap text-[length:var(--text-label)] leading-none text-muted-foreground [font-family:var(--font-label)]">{item.date}</p>}
          <h3 className="min-w-0 text-right text-[length:var(--text-small)] font-medium uppercase leading-[1.2] tracking-[0.01em] [overflow-wrap:anywhere]">{item.title}</h3>
        </div>
      </Linked>
    );
  return (
    <Linked item={item} className="mt-[4svh] flex items-end gap-[0.875rem]">
      <Photo item={item} drift={drift} className="h-[32svh] w-[32svh]" />
      <div className="flex rotate-180 items-baseline gap-[0.75rem] pb-[0.25rem] [writing-mode:vertical-rl]">
        <h3 className="whitespace-nowrap text-[length:var(--text-small)] font-medium uppercase leading-[1.2] tracking-[0.01em]">{item.title}</h3>
        {item.date && <p className="whitespace-nowrap text-[length:var(--text-label)] leading-none text-muted-foreground [font-family:var(--font-label)]">{item.date}</p>}
      </div>
    </Linked>
  );
};

const TintField = ({ index, total }: { index: number; total: number }) => (
  <div aria-hidden="true" className={cn("mt-[22svh] flex h-[24svh] w-[18svh] flex-col justify-between rounded-[var(--radius-card)] p-[1rem] pt-[2.5svh] text-foreground", TINTS[index % TINTS.length])}>
    <p aria-hidden="true" className="text-center text-[length:var(--text-h2)] leading-none tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]">{pad(index)}</p>
    <p aria-hidden="true" className="text-center text-[length:var(--text-label)] leading-none [font-family:var(--font-label)]">/{pad(total)}</p>
  </div>
);

const Heading = ({ title, label, reduce, className }: { title: string; label?: string; reduce: boolean; className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const kit = useKitMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const shown = reduce || inView;
  const words = title.split(/\s+/).filter(Boolean);
  return (
    <div className={cn("flex flex-col-reverse items-start gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6", className)}>
      <h2 ref={ref} className="max-w-[6em] text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
        <p className="sr-only">{title}</p>
        <div aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={index}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: kit.distance }}
                animate={shown ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: kit.base, ease: kit.ease, delay: index * 0.04 }}
                className="inline-block pb-[0.08em]"
              >
                {word}
              </motion.div>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </div>
      </h2>
      {label && <p className="flex shrink-0 items-center gap-2 whitespace-nowrap lg:pb-[0.6em] text-[length:var(--text-small)] font-medium leading-none text-muted-foreground before:h-3 before:w-2.5 before:shrink-0 before:rounded-t-full before:bg-tint-3 before:content-['']">{label.replace(/^\(\s*|\s*\)$/g, "")}</p>}
    </div>
  );
};

const GalleryArchTrack = ({ title = "Latest Projects.", label = "©2026", items = DEFAULT_ITEMS, ariaLabel, className }: GalleryArchTrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const drift = useTransform(scrollYProgress, (p) => `${-SHIFT + clamp01(p) * 2 * SHIFT}%`);

  const track = items.flatMap((item, index) => {
    const card = <TrackCard key={`c${index}`} item={item} index={index} drift={reduce ? undefined : drift} />;
    return index % 2 === 1 && index < items.length - 1 ? [card, <TintField key={`t${index}`} index={index + 2} total={items.length} />] : [card];
  });

  return (
    <section data-scene aria-label={ariaLabel ?? title} className={cn("relative bg-background text-foreground", reduce ? "pb-[var(--section-space)]" : "-mb-[14svh] lg:mb-0 lg:pb-[var(--section-space)]", className)}>
      <div ref={trackRef}>
        <HorizontalScrollSection
          progress={false}
          header={<Heading title={title} label={label} reduce={reduce} className="ml-[calc(50%-min(100vw-2*var(--gutter),var(--max-w))/2)] w-[min(100vw-2*var(--gutter),var(--max-w))] pt-[clamp(1.5rem,8svh,5rem)]" />}
          trackClassName="mt-[clamp(1.5rem,3vw,3rem)] self-start items-start gap-[clamp(2rem,4vw,4.5rem)] px-[calc((100vw-min(100vw-2*var(--gutter),var(--max-w)))/2)]"
        >
          {track}
        </HorizontalScrollSection>
      </div>
    </section>
  );
};

export default GalleryArchTrack;
