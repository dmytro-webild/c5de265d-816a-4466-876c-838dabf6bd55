import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { text: string; href?: string };

type FooterNewsletterRevealProps = {
  brand?: string;
  logoSrc?: string;
  socials?: Link[];
  message?: string;
  messageMuted?: string;
  email?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  submitText?: string;
  successText?: string;
  onSubscribe?: (data: { name: string; email: string }) => void;
  links?: Link[];
  privacyHref?: string;
  copyright?: string;
  ariaLabel?: string;
  className?: string;
};

const FooterNewsletterReveal = ({
  brand = "Studio",
  logoSrc,
  socials = [],
  message = "We would love to hear from you,",
  messageMuted = "whether you have a project in mind or just want to say hi.",
  email = "customerservice@meclin.store",
  newsletterTitle = "Join our newsletter",
  newsletterDescription = "A monthly note on design, type and the work.",
  namePlaceholder = "Name",
  emailPlaceholder = "Email",
  submitText = "Send",
  successText = "Thanks, you are on the list.",
  onSubscribe,
  links = [],
  privacyHref = "#privacy-notice",
  copyright,
  ariaLabel,
  className,
}: FooterNewsletterRevealProps) => {
  const [sent, setSent] = useState(false);
  const uid = useId();
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const hidden = { opacity: 0, y: kit.distance };
  const shown = { opacity: 1, y: 0 };

  // Keep unconfigured links hidden per requirements
  const activeSocials = socials.filter((s) => s.href && s.href !== "#" && s.href !== "");
  const activeLinks = links.filter((l) => l.href && l.href !== "");

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubscribe?.({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? "") });
    setSent(true);
  };

  return (
    <footer aria-label={ariaLabel ?? `${brand} footer`} className={cn("relative overflow-hidden bg-[#10111C] text-[#F7F4EE]", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col pt-[clamp(2rem,4vw,3rem)]">
        <div className="flex items-start justify-between gap-6">
          {logoSrc ? (
            <Media src={logoSrc} alt={brand} loading="lazy" decoding="async" className="h-10 w-auto" />
          ) : (
            <p className="text-[length:var(--text-h3)] leading-none tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]">{brand}</p>
          )}
          {activeSocials.length > 0 && (
            <ul className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-[length:var(--text-small)] font-medium leading-[1.2]">
              {activeSocials.map((social, index) => (
                <li key={index} className="flex items-center gap-3">
                  {index > 0 && <p aria-hidden="true" className="text-muted-foreground">/</p>}
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap transition-opacity duration-[var(--dur-fast)] hover:opacity-60">
                    {social.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-[clamp(2rem,5vw,4rem)] grid grid-cols-1 gap-x-[var(--gap)] gap-y-14 lg:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-[clamp(2rem,4vw,3.5rem)] lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={reduce ? false : hidden}
              whileInView={shown}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className="max-w-[18em] text-balance text-[length:var(--text-h3)] leading-[1.15] tracking-[-0.02em] [font-family:var(--font-heading)]"
            >
              <div className="inline">{message}</div>
              {messageMuted && <> <div className="inline not-italic text-muted-foreground">{messageMuted}</div></>}
            </motion.div>
            {email && (
              <motion.a
                href={`mailto:${email}`}
                initial={reduce ? false : hidden}
                whileInView={shown}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: kit.base, ease: kit.ease, delay: 0.1 }}
                className="btn-link w-fit text-[length:var(--text-h3)] text-card-foreground [overflow-wrap:anywhere]"
              >
                {email}
              </motion.a>
            )}
          </div>

          <div className="flex min-w-0 flex-col lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <motion.h2
              initial={reduce ? false : hidden}
              whileInView={shown}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.05 }}
              className="max-w-[8em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
            >
              {newsletterTitle}
            </motion.h2>
            {newsletterDescription && <p className="mt-3 text-[length:var(--text-small)] font-medium leading-[1.4] text-muted-foreground">{newsletterDescription}</p>}
            {sent ? (
              <p role="status" className="mt-8 text-[length:var(--text-body-lg)] leading-[1.35]">{successText}</p>
            ) : (
              <form onSubmit={onSend} className="mt-6 flex flex-col gap-4">
                <label htmlFor={`${uid}-name`} className="sr-only">{namePlaceholder}</label>
                <input id={`${uid}-name`} name="name" autoComplete="name" placeholder={namePlaceholder} className="w-full min-w-0 border-b border-foreground/40 bg-transparent py-3 text-[length:var(--text-body)] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground" />
                <label htmlFor={`${uid}-email`} className="sr-only">{emailPlaceholder}</label>
                <input id={`${uid}-email`} required type="email" name="email" autoComplete="email" placeholder={emailPlaceholder} className="w-full min-w-0 border-b border-foreground/40 bg-transparent py-3 text-[length:var(--text-body)] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground" />
                <button type="submit" className="btn-primary mt-2 w-full uppercase">
                  <p className="btn-label">{submitText}</p>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-[clamp(4rem,9vw,8rem)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[length:var(--text-body)]">
              {activeLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="whitespace-nowrap transition-opacity duration-[var(--dur-fast)] hover:opacity-60">
                    {link.text}
                  </a>
                </li>
              ))}
              {privacyHref && (
                <li>
                  <a href={privacyHref} className="whitespace-nowrap text-muted-foreground transition-opacity duration-[var(--dur-fast)] hover:opacity-60">
                    Privacy Policy
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <p className="text-[length:var(--text-small)] text-muted-foreground">{copyright ?? `© ${new Date().getFullYear()} ${brand}`}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNewsletterReveal;
