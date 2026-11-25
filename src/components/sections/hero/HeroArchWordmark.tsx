import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCoverNext } from "@/components/kit/sectionNeighbour";
import { useKitMotion } from "@/components/kit/kitMotion";
import WordSwapHeadline from "@/components/animation/WordSwapHeadline";
import { MotionMedia } from "@/components/kit/Media";

type ArchImage = { imageSrc: string; imageAlt?: string };
type Geo = { w: number; gap: number };

type Cta = { text: string; href?: string };

export type ArchHeroHeadProps = {
  label?: string;
  title?: string;
  description?: string;
  rotatingWords?: string[];
  rotateIn?: "title" | "label" | "middle";
  primaryButton?: Cta;
  secondaryButton?: Cta;
  brand?: string;
  mark?: string;
  tagline?: string;
  taglineWords?: string[];
};

type HeroArchWordmarkProps = ArchHeroHeadProps & {
  items?: ArchImage[];
  featureImageSrc?: string;
  featureImageAlt?: string;
  introDelay?: number;
  handoff?: boolean;
  ariaLabel?: string;
};

const DESKTOP: Geo = { w: 17.5, gap: 1 };
const MOBILE: Geo = { w: 48, gap: 3 };
const LOOP_SECONDS = 3.6;
const HANDOFF_LEAD = 0.5;
const SWAP_EASE = [0.77, 0, 0.175, 1] as const;
const LEAVE_EASE = [0.7, 0, 0.84, 0] as const;

const DEFAULT_ITEMS: ArchImage[] = [
  { imageSrc: "https://images.pexels.com/photos/11535790/pexels-photo-11535790.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
  { imageSrc: "https://images.pexels.com/photos/15483629/pexels-photo-15483629.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
  { imageSrc: "https://images.pexels.com/photos/16982921/pexels-photo-16982921.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
  { imageSrc: "https://images.pexels.com/photos/8498414/pexels-photo-8498414.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
  { imageSrc: "https://images.pexels.com/photos/34179816/pexels-photo-34179816.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
  { imageSrc: "https://images.pexels.com/photos/25752283/pexels-photo-25752283.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "" },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const mod = (v: number, m: number) => ((v % m) + m) % m;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const tileCount = (length: number, geo: Geo) => Math.max(length, Math.ceil((101 + geo.w) / (geo.w + geo.gap)));

const placeTile = (slot: number, x: number, geo: Geo, n: number) => {
  const pitch = geo.w + geo.gap;
  const left = 50 - geo.w / 2;
  const a = -(left + geo.w);
  return left + mod(slot * pitch + x - a, n * pitch) + a;
};

const useDesktop = () => {
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 880px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 880px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
};

type TileProps = {
  item: ArchImage;
  index: number;
  n: number;
  geo: Geo;
  x: MotionValue<number>;
  animateIn: boolean;
  delay: number;
  duration: number;
  ease: [number, number, number, number];
};

const Tile = ({ item, index, n, geo, x, animateIn, delay, duration, ease }: TileProps) => {
  const slot = index - Math.floor(n / 2);
  const tx = useTransform(x, (xv) => `${placeTile(slot, xv, geo, n)}cqw`);

  return (
    <motion.div
      style={{ x: tx, width: `${geo.w}cqw` }}
      initial={animateIn ? { y: "110%" } : false}
      animate={{ y: "0%" }}
      transition={{ duration: duration + 0.2, ease, delay }}
      className="absolute inset-y-0 left-0 overflow-hidden rounded-t-full bg-card will-change-transform"
    >
      <div className="absolute inset-0">
        <MotionMedia
          src={item.imageSrc}
          alt={item.imageAlt ?? ""}
          aria-hidden={!item.imageAlt}
          loading="eager"
          decoding="async"
          initial={animateIn ? { scale: 1.12 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: duration + 0.3, ease, delay }}
          className="size-full object-cover"
        />
      </div>
    </motion.div>
  );
};

type SwapProps = { words: string[]; startAt: number; block?: boolean };

const SwapWord = ({ words, startAt, block = false }: SwapProps) => {
  const [step, setStep] = useState(0);
  const index = step % words.length;
  const previous = (index - 1 + words.length) % words.length;

  useEffect(() => {
    let timer = 0;
    const wait = window.setTimeout(() => {
      setStep((s) => s + 1);
      timer = window.setInterval(() => setStep((s) => s + 1), 2200);
    }, Math.max(startAt, 0) * 1000 + 1200);
    return () => {
      window.clearTimeout(wait);
      window.clearInterval(timer);
    };
  }, [words.length, startAt]);

  return (
    <div aria-hidden="true" className={`${block ? "grid" : "inline-grid align-bottom"} justify-items-center overflow-clip pb-[0.15em] -mb-[0.15em]`}>
      {words.map((word, i) => (
        <motion.div
          key={word}
          initial={{ y: i === 0 ? "0%" : "115%" }}
          animate={
            i === index
              ? { y: "0%", transition: { duration: 0.7, ease: SWAP_EASE, delay: step > 0 ? 0.12 : 0 } }
              : i === previous && step > 0
                ? { y: "-115%", transition: { duration: 0.35, ease: LEAVE_EASE } }
                : { y: "115%", transition: { duration: 0 } }
          }
          className="whitespace-nowrap [grid-area:1/1]"
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
};

type Rise = (delay: number) => object;

type ArchHeroHeadOwnProps = ArchHeroHeadProps & { rise: Rise; delay: number; startAt: number; reduce: boolean };

const swapList = (first: string, extra: string[]) => [first, ...extra.filter((w) => w && w !== first)];

export const ArchHeroHead = ({ label, title, rotatingWords, rotateIn = "title", primaryButton, secondaryButton, brand, rise, delay, startAt, reduce }: ArchHeroHeadOwnProps) => {
  const raw = title || brand || "Work people remember";
  const heading = raw.replace(/\s+/g, " ").trim();
  const words = reduce ? [] : (rotatingWords?.filter(Boolean) ?? []);
  const [first = "", ...restWords] = heading.trim().split(/\s+/);
  const rest = restWords.join(" ");
  const titleWords = rotateIn === "title" && rest ? swapList(first, words) : [];
  const [labelFirst = "", ...labelRest] = (label ?? "").trim().split(/\s+/);
  const labelWords = rotateIn === "label" && label ? swapList(labelFirst, words) : [];
  const stacked = titleWords.length > 1;
  const swapAt = rotateIn === "middle" && words.length > 1 ? heading.indexOf(words[0]) : -1;
  const before = swapAt >= 0 ? heading.slice(0, swapAt).trim() : "";
  const after = swapAt >= 0 ? heading.slice(swapAt + words[0].length).trim() : "";
  const middleWords = swapAt >= 0 ? swapList(words[0], words) : [];
  const longest = Math.max(...heading.split(/\s+/).map((w) => w.length), ...titleWords.map((w) => w.length), ...middleWords.map((w) => w.length));
  const middle = middleWords.length > 1;
  const lineOne = (before ? before.length + 1 : 0) + Math.max(0, ...middleWords.map((w) => w.length)) + 0.6;
  const fixedChars = Math.max(lineOne, after.length);
  const fixed = middle;
  const perLine = stacked ? Math.max(longest, rest.length <= 18 ? rest.length : Math.ceil(rest.length / 2)) : Math.max(longest, heading.length <= 14 ? heading.length : Math.ceil(heading.length / 2), 6);
  const fontSize = fixed ? `min(calc(${(88 / (Math.max(fixedChars, 6) * 0.58)).toFixed(2)}cqw * var(--hero-fit)), 10svh, var(--text-display))` : `clamp(var(--text-h2), min(calc(${(96 / perLine).toFixed(2)}cqw * var(--hero-fit)), 10svh), var(--text-display))`;

  return (
    <>
      {label &&
        (labelWords.length > 1 ? (
          <motion.div {...rise(delay)} className="mb-[clamp(0.75rem,2svh,1.25rem)] font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] text-muted-foreground">
            <p className="sr-only">{label}</p>
            <SwapWord words={labelWords} startAt={startAt} />
            {labelRest.length > 0 && <div aria-hidden="true" className="inline">{` ${labelRest.join(" ")}`}</div>}
          </motion.div>
        ) : (
          <motion.p {...rise(delay)} className="mb-[clamp(0.75rem,2svh,1.25rem)] font-mono text-[length:var(--text-label)] uppercase leading-none tracking-[var(--label-tracking)] text-muted-foreground">
            {label}
          </motion.p>
        ))}
      <div className="@container flex w-full justify-center">
        <motion.h1
          {...rise(delay + 0.05)}
          aria-label={middle ? undefined : heading}
          style={{ fontSize }}
          className={`${fixed ? "w-full" : "max-w-[86cqw] text-balance"} text-center [--hero-fit:1.1] lg:[--hero-fit:1] leading-[1.02] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]`}
        >
          {middle ? (
            <>
              <div className="sr-only">{heading}</div>
              <div aria-hidden="true" className="contents">
              <WordSwapHeadline
                as="div"
                before={before}
                words={middleWords}
                interval={2.2}
                delay={startAt + 1.2}
                className="whitespace-nowrap text-[length:inherit] md:text-[length:inherit] leading-[1.02] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]"
                wordClassName="rounded-[0.18em] bg-tint-1 px-[0.14em] text-deep"
              />
              {after && <div aria-hidden="true" className="whitespace-nowrap">{after}</div>}
              </div>
            </>
          ) : stacked ? (
            <>
              <SwapWord words={titleWords} startAt={startAt} block />
              <div aria-hidden="true" className="block">{rest}</div>
            </>
          ) : (
            <div aria-hidden="true" className="inline">{heading}</div>
          )}
        </motion.h1>
      </div>
      {(primaryButton || secondaryButton) && (
        <motion.div {...rise(delay + 0.2)} className="mt-[clamp(1.25rem,3svh,2rem)] flex flex-wrap items-center justify-center gap-[0.6rem]">
          {primaryButton && (
            <a href={primaryButton.href ?? "#"} className="btn-primary min-h-[2.5rem] px-[1rem] py-[0.5rem]">
              <p className="btn-label">{primaryButton.text}</p>
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButton.href ?? "#"} className="btn-secondary min-h-[2.5rem] px-[1rem] py-[0.5rem]">
              <p className="btn-label">{secondaryButton.text}</p>
            </a>
          )}
        </motion.div>
      )}
    </>
  );
};

const HeroArchWordmark = ({
  label,
  title,
  rotatingWords,
  rotateIn,
  primaryButton,
  secondaryButton,
  brand,
  items = DEFAULT_ITEMS,
  introDelay = 0,
  handoff = false,
  ariaLabel,
}: HeroArchWordmarkProps) => {
  const ref = useRef<HTMLElement>(null);
  useCoverNext(ref);
  const reduce = !!useReducedMotion();
  const desktop = useDesktop();
  const kit = useKitMotion();
  const geo = desktop ? DESKTOP : MOBILE;
  const geoRef = useRef(geo);
  useEffect(() => {
    geoRef.current = geo;
  });
  const list = items.length ? items : DEFAULT_ITEMS;
  const n = tileCount(list.length, geo);
  const tiles = Array.from({ length: n }, (_, i) => list[i % list.length]);
  const live = !reduce;
  const animateIn = !reduce && !handoff;

  const { scrollYProgress: pin } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lift = useTransform(pin, (v) => (live ? easeOut(clamp01(v / 0.6)) : 0));
  const headY = useTransform(lift, (v) => `${-v * 8}rem`);
  const headOpacity = useTransform(lift, (v) => 1 - v);
  const stripY = useTransform(pin, (v) => (live ? `${-clamp01(v) * 7}svh` : "0svh"));
  const shade = useTransform(pin, (v) => (live ? clamp01(v) * 0.45 : 0));
  const headStyle = live ? { y: headY, opacity: headOpacity } : undefined;

  const x = useMotionValue(0);
  const startAt = (handoff ? Math.max(introDelay - HANDOFF_LEAD, 0) : introDelay + (animateIn ? 1.4 : 0)) * 1000;
  const coverAt = useRef(Infinity);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      coverAt.current = el ? el.getBoundingClientRect().top + window.scrollY + window.innerHeight : Infinity;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useAnimationFrame((t, delta) => {
    if (reduce || t < startAt || window.scrollY >= coverAt.current) return;
    const pitch = geoRef.current.w + geoRef.current.gap;
    x.set(mod(x.get() - (delta / 1000) * (pitch / LOOP_SECONDS), n * pitch));
  });

  const rise = (delay: number) =>
    animateIn
      ? {
          initial: { opacity: 0, y: "1.5rem" },
          animate: { opacity: 1, y: "0rem" },
          transition: { duration: kit.base, ease: kit.ease, delay },
        }
      : {};

  return (
    <section
      ref={ref}
      aria-label={ariaLabel || "Hero section"}
      className={`relative ${reduce ? "h-svh" : "-mb-[calc(100svh+clamp(8rem,22vw,20rem))] h-[calc(200svh+clamp(8rem,22vw,20rem))]"}`}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-background text-foreground">
        <motion.div style={headStyle} className="relative z-[1] flex flex-col items-center px-[var(--gutter)] pb-[clamp(7rem,17svh,10rem)] pt-[clamp(7rem,17svh,10rem)] text-center lg:pb-0 lg:pt-[clamp(5.5rem,13svh,9rem)]">
          <ArchHeroHead
            label={label}
            title={title}
            rotatingWords={rotatingWords}
            rotateIn={rotateIn}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
            brand={brand}
            rise={rise}
            delay={introDelay}
            startAt={introDelay}
            reduce={reduce}
          />
        </motion.div>

        <motion.div style={{ y: stripY }} className="relative min-h-[12rem] flex-1 lg:mt-[clamp(1.5rem,6svh,4rem)]">
          <div className="@container absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]">
            {tiles.map((item, i) => (
              <Tile
                key={`${geo.w}-${n}-${i}`}
                item={item}
                index={i}
                n={n}
                geo={geo}
                x={x}
                animateIn={animateIn}
                delay={introDelay + 0.15 + i * 0.06}
                duration={kit.base}
                ease={kit.ease}
              />
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-linear-to-t from-background to-transparent" />
        </motion.div>

        {live && <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[3] bg-black" />}
      </div>
    </section>
  );
};

export default HeroArchWordmark;
