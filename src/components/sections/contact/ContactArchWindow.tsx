import { Fragment, useId, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ContactData = { name: string; email: string; projectType: string; message: string };

type ContactArchWindowProps = {
  title?: string;
  description?: string;
  email?: string;
  projectTypes?: string[];
  fields?: { name?: string; email?: string; projectType?: string; message?: string };
  submitText?: string;
  successTitle?: string;
  successDescription?: string;
  onSubmit?: (data: ContactData) => void;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactArchWindow = ({
  title = "Let's make something people remember",
  description = "Tell us a little about the project. We reply within two working days.",
  email,
  projectTypes = ["Brand identity", "Website", "Product design", "Something else"],
  fields,
  submitText = "Send message",
  successTitle = "Thanks, message received",
  successDescription = "We will get back to you within two working days.",
  onSubmit,
  imageSrc,
  imageAlt = "",
  ariaLabel,
  className,
}: ContactArchWindowProps) => {
  const [sent, setSent] = useState(false);
  const uid = useId();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const onPhoto = Boolean(imageSrc);
  const labels = { name: "Name", email: "Email", projectType: "Project type", message: "Message", ...fields };
  const words = title.split(/\s+/).filter(Boolean);

  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const clipPath = useTransform(enter, (p) => {
    const o = 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 2);
    const side = (1 - o) * 32;
    const radius = ((100 - side * 2) / 2) * (1 - o);
    const corner = (1 - o) * 1.5;
    return `inset(${(1 - o) * 12}% ${side}% ${(1 - o) * 4}% ${side}% round ${radius}vw ${radius}vw ${corner}rem ${corner}rem)`;
  });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(pass, (p) => `${(Math.min(1, Math.max(0, p)) * 2 - 1) * 8}%`);
  const innerScale = useTransform(enter, (p) => 1.12 - Math.min(1, Math.max(0, p)) * 0.12);

  const hidden = { opacity: 0, y: kit.distance };
  const shown = { opacity: 1, y: 0 };

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit?.({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setSent(true);
  };

  const inputClass = cn(
    "w-full min-w-0 rounded-[var(--radius)] border px-4 py-3 text-[length:var(--text-body)] leading-[1.3] outline-none transition-colors",
    onPhoto ? "border-white/25 bg-white/10 text-white placeholder:text-white/60 focus:border-white" : "border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-foreground",
  );
  const labelClass = cn("text-[length:var(--text-small)] font-medium leading-[1.2]", onPhoto ? "text-white/70" : "text-muted-foreground");

  const heading = (
    <div className="flex min-w-0 flex-col gap-5">
      <h2 aria-label={title} className="max-w-[12em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.div
              aria-hidden="true"
              initial={reduce ? false : hidden}
              whileInView={shown}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease, delay: i * 0.04 }}
              className="inline-block pb-[0.06em]"
            >
              {word}
            </motion.div>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </h2>
      {description && (
        <motion.p
          initial={reduce ? false : hidden}
          whileInView={shown}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
          className={cn("max-w-[32em] text-[length:var(--text-body-lg)] leading-[1.35]", onPhoto ? "text-white/80" : "text-muted-foreground")}
        >
          {description}
        </motion.p>
      )}
      {email && (
        <a href={`mailto:${email}`} className={cn("btn-link w-fit text-[length:var(--text-h3)] [overflow-wrap:anywhere]", onPhoto && "text-white")}>
          {email}
        </a>
      )}
    </div>
  );

  const form = sent ? (
    <div role="status" className="flex min-h-[18rem] flex-col justify-center gap-3">
      <h3 className="text-[length:var(--text-h2)] leading-[1.05] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]">{successTitle}</h3>
      <p className={cn("max-w-[36ch] text-[length:var(--text-body)] leading-[1.4]", onPhoto ? "text-white/75" : "text-muted-foreground")}>{successDescription}</p>
    </div>
  ) : (
    <form onSubmit={onSend} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label htmlFor={`${uid}-name`} className="flex min-w-0 flex-col gap-2">
          <p className={labelClass}>{labels.name}</p>
          <input id={`${uid}-name`} required name="name" autoComplete="name" className={inputClass} />
        </label>
        <label htmlFor={`${uid}-email`} className="flex min-w-0 flex-col gap-2">
          <p className={labelClass}>{labels.email}</p>
          <input id={`${uid}-email`} required type="email" name="email" autoComplete="email" className={inputClass} />
        </label>
      </div>
      {projectTypes.length > 0 && (
        <label htmlFor={`${uid}-type`} className="flex min-w-0 flex-col gap-2">
          <p className={labelClass}>{labels.projectType}</p>
          <select id={`${uid}-type`} name="projectType" defaultValue={projectTypes[0]} className={cn(inputClass, "cursor-pointer appearance-none")}>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-background text-foreground">
                {type}
              </option>
            ))}
          </select>
        </label>
      )}
      <label htmlFor={`${uid}-message`} className="flex min-w-0 flex-col gap-2">
        <p className={labelClass}>{labels.message}</p>
        <textarea id={`${uid}-message`} required name="message" rows={4} className={cn(inputClass, "resize-none")} />
      </label>
      <button type="submit" className={cn(onPhoto ? "btn-secondary" : "btn-primary", "mt-1 w-full")}>
        <p className="btn-label">{submitText}</p>
      </button>
    </form>
  );

  if (!onPhoto) {
    return (
      <section ref={ref} aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
        <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">{heading}</div>
          <div className="kit-card min-w-0 p-[clamp(1.25rem,2.4vw,2.5rem)] lg:col-span-6 xl:col-span-5 xl:col-start-8">{form}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={ariaLabel ?? title} className={cn("relative bg-background", className)}>
      <motion.div data-nav-dark style={reduce ? undefined : { clipPath }} className="relative flex min-h-svh items-center overflow-hidden bg-black py-[var(--section-space)] text-white will-change-[clip-path]">
        <motion.div aria-hidden={!imageAlt} style={reduce ? undefined : { scale: innerScale }} className="absolute inset-0 overflow-hidden">
          <MotionMedia
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { y: drift }}
            className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover will-change-transform"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto grid w-[var(--container)] grid-cols-1 items-center gap-x-[var(--gap)] gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">{heading}</div>
          <div className="min-w-0 rounded-[var(--radius-card)] border border-white/20 bg-black/40 p-[clamp(1.25rem,2.4vw,2.5rem)] lg:col-span-6 xl:col-span-5 xl:col-start-8">{form}</div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactArchWindow;
