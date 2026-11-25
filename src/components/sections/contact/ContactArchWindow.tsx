import { Fragment, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, MessageSquare, Mail, CheckCircle2, AlertCircle, ExternalLink, Loader2, Sparkles, Send } from "lucide-react";
import { useKitMotion } from "@/components/kit/kitMotion";
import { MECLIN_CONFIG } from "@/config/meclin";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type ContactFormData = {
  name: string;
  projectType: string;
  phone: string;
  email: string;
  existingLink?: string;
  helpDetails?: string;
};

type ContactArchWindowProps = {
  title?: string;
  description?: string;
  email?: string;
  calendarUrl?: string;
  whatsAppNumber?: string;
  whatsAppMessage?: string;
  formDestinationUrl?: string;
  projectTypes?: string[];
  fields?: {
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    existingLink?: string;
    helpDetails?: string;
  };
  submitText?: string;
  successTitle?: string;
  successDescription?: string;
  onSubmit?: (data: ContactFormData) => Promise<boolean> | boolean | void;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactArchWindow = ({
  title = "Book a free 15-minute website review",
  description = "Bring your website, Google Maps listing, or Instagram link. We will share one practical change to get more customer bookings.",
  email = MECLIN_CONFIG.contactEmail,
  calendarUrl = MECLIN_CONFIG.calendarUrl,
  whatsAppNumber = MECLIN_CONFIG.whatsAppNumber,
  whatsAppMessage = MECLIN_CONFIG.whatsAppMessage,
  formDestinationUrl = MECLIN_CONFIG.formDestinationUrl,
  projectTypes = [
    "Restaurant or Café",
    "Salon or Spa",
    "Clinic or Medical",
    "Plumbing / Repair Service",
    "Gym or Fitness",
    "Other Local Business"
  ],
  submitText = "Book Your Free Call",
  successTitle = "Review request received",
  successDescription = "We will contact you shortly via WhatsApp or phone to confirm your free 15-minute website review session.",
  onSubmit,
  imageSrc,
  ariaLabel,
  className,
}: ContactArchWindowProps) => {
  const [activeTab, setActiveTab] = useState<"form" | "calendar" | "whatsapp">("form");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    projectType: projectTypes[0] || "Restaurant or Café",
    phone: "",
    email: "",
    existingLink: "",
    helpDetails: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const uid = useId();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const onPhoto = Boolean(imageSrc);

  const hidden = { opacity: 0, y: kit.distance };
  const shown = { opacity: 1, y: 0 };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name or business owner name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a valid phone or WhatsApp number.";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a complete contact phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      if (onSubmit) {
        const result = await onSubmit(formData);
        if (result === false) {
          throw new Error("Submission was rejected by custom handler.");
        }
      }

      if (formDestinationUrl && formDestinationUrl.trim() !== "") {
        const response = await fetch(formDestinationUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }
        setSubmissionState("success");
      } else {
        setErrorMessage("Form destination is currently unconfigured. Please reach us via WhatsApp or Email below.");
        setSubmissionState("error");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send request. Please try again or WhatsApp us directly.";
      setErrorMessage(msg);
      setSubmissionState("error");
    }
  };

  const encodedWhatsAppUrl = `https://wa.me/${whatsAppNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsAppMessage)}`;

  const inputClass = (fieldName: string) =>
    cn(
      "w-full min-w-0 rounded-lg border px-4 py-3 text-sm transition-colors outline-none",
      onPhoto
        ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white focus:bg-white/15"
        : "border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground",
      errors[fieldName] && "border-red-500 focus:border-red-500 focus:ring-red-500"
    );

  const labelClass = cn("text-xs font-semibold uppercase tracking-wider", onPhoto ? "text-white/80" : "text-foreground/80");

  const words = title.split(/\s+/).filter(Boolean);

  const heading = (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 w-fit">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Direct Access · Dubai & UAE</span>
      </div>

      <h2 aria-label={title} className="max-w-[14em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
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
          className={cn("max-w-[34em] text-[length:var(--text-body)] leading-relaxed", onPhoto ? "text-white/80" : "text-muted-foreground")}
        >
          {description}
        </motion.p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        {email && (
          <a
            href={`mailto:${email}`}
            className={cn("inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80", onPhoto ? "text-white" : "text-foreground")}
          >
            <Mail className="h-4 w-4 text-emerald-500" />
            <span>{email}</span>
          </a>
        )}
        {whatsAppNumber && (
          <a
            href={encodedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80", onPhoto ? "text-emerald-400" : "text-emerald-600")}
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp: +{whatsAppNumber}</span>
          </a>
        )}
      </div>

      {/* Feature summary bullet points */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span>No commitment or pushy sales pitch</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span>Focused 15-minute breakdown</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span>Tailored for Dubai & UAE local market</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span>Instant WhatsApp message option</span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={ref} id="contact-section" aria-label={ariaLabel ?? title} className={cn("relative bg-[#10111C] py-[var(--section-space)] text-[#F7F4EE] border-t border-[#232538]", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-5">{heading}</div>

        <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-xl lg:col-span-7 xl:col-span-7">
          {/* Action Tabs */}
          <div className="flex border-b border-border mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={cn(
                "flex-1 pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer",
                activeTab === "form" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Send className="h-4 w-4" />
              <span>Callback Form</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("whatsapp")}
              className={cn(
                "flex-1 pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer",
                activeTab === "whatsapp" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Direct</span>
            </button>

            {calendarUrl && (
              <button
                type="button"
                onClick={() => setActiveTab("calendar")}
                className={cn(
                  "flex-1 pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer",
                  activeTab === "calendar" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendar Embed</span>
              </button>
            )}
          </div>

          {/* TAB 1: CALLBACK FORM */}
          {activeTab === "form" && (
            <div>
              {!formDestinationUrl && (
                <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>Form preview mode active:</strong> Submissions are processed and confirmed instantly. (Set <code>formDestinationUrl</code> in configuration for direct API integration).
                  </span>
                </div>
              )}

              {submissionState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-[length:var(--text-h2)] font-bold">{successTitle}</h3>
                  <p className="max-w-md text-sm text-muted-foreground leading-relaxed">{successDescription}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionState("idle");
                      setFormData({
                        name: "",
                        projectType: projectTypes[0] || "Restaurant or Café",
                        phone: "",
                        email: "",
                        existingLink: "",
                        helpDetails: "",
                      });
                    }}
                    className="btn-secondary text-xs mt-4 px-6 py-2 cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
                  {submissionState === "error" && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Submission Error:</strong> {errorMessage}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${uid}-name`} className={labelClass}>
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`${uid}-name`}
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Mansoor"
                        className={inputClass("name")}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    {/* Phone or WhatsApp */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${uid}-phone`} className={labelClass}>
                        Phone or WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`${uid}-phone`}
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 852 0527"
                        className={inputClass("phone")}
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${uid}-email`} className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="owner@mybusiness.ae"
                        className={inputClass("email")}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Business Type */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${uid}-projectType`} className={labelClass}>
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id={`${uid}-projectType`}
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={cn(inputClass("projectType"), "cursor-pointer appearance-none bg-no-repeat bg-right")}
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-background text-foreground">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Existing Website, Instagram or Maps link (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${uid}-existingLink`} className={labelClass}>
                      Existing Website, Instagram, or Google Maps link <span className="text-muted-foreground font-normal text-[10px] lowercase">(optional)</span>
                    </label>
                    <input
                      id={`${uid}-existingLink`}
                      name="existingLink"
                      type="url"
                      value={formData.existingLink}
                      onChange={handleChange}
                      placeholder="https://instagram.com/mybusiness or Google Maps link"
                      className={inputClass("existingLink")}
                    />
                  </div>

                  {/* What the owner would like help with (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${uid}-helpDetails`} className={labelClass}>
                      What would you like help with? <span className="text-muted-foreground font-normal text-[10px] lowercase">(optional)</span>
                    </label>
                    <textarea
                      id={`${uid}-helpDetails`}
                      name="helpDetails"
                      rows={3}
                      value={formData.helpDetails}
                      onChange={handleChange}
                      placeholder="e.g. We need a digital menu on WhatsApp, direct online table reservations, and Google Maps location alignment."
                      className={cn(inputClass("helpDetails"), "resize-none")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submissionState === "submitting"}
                    className="btn-primary mt-2 w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {submissionState === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>{submitText}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground mt-1">
                    Free 15-minute call · No obligation · Privacy guaranteed
                  </p>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: WHATSAPP DIRECT */}
          {activeTab === "whatsapp" && (
            <div className="flex flex-col items-center text-center py-6 px-2 space-y-6">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <MessageSquare className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Message MECLIN on WhatsApp</h3>
                <p className="text-xs text-muted-foreground max-w-sm mt-1">
                  Start an immediate conversation with our Dubai design team directly from your phone or desktop.
                </p>
              </div>

              <div className="w-full max-w-md rounded-xl bg-muted/50 p-4 border border-border text-left">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prefilled Message Preview:</p>
                <div className="rounded-lg bg-background p-3 text-xs font-mono text-foreground border border-border">
                  "{whatsAppMessage}"
                </div>
              </div>

              <a
                href={encodedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="h-5 w-5 fill-current" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>

              <p className="text-xs text-muted-foreground">
                Typically responds in under 15 minutes during UAE business hours (GST).
              </p>
            </div>
          )}

          {/* TAB 3: CALENDAR EMBED */}
          {activeTab === "calendar" && calendarUrl && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Select an available 15-minute time slot:</span>
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                >
                  <span>Open in new tab</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="relative min-h-[420px] w-full rounded-xl border border-border bg-background overflow-hidden">
                <iframe
                  src={calendarUrl}
                  title="MECLIN Booking Calendar"
                  className="h-[480px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactArchWindow;
