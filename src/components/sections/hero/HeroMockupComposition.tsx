import { motion } from "motion/react";
import { ArrowRight, PhoneCall, CheckCircle2, Clock, MapPin, Globe, Sparkles, Utensils } from "lucide-react";

export type HeroMockupCompositionProps = {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  microcopy?: string;
};

export default function HeroMockupComposition({
  eyebrow = "Website design for Dubai & the UAE",
  headline = "Make it easy for customers to choose you.",
  subheadline = "MECLIN builds websites for restaurants, cafés and local businesses. Give customers one place to see what you offer, find you and book or message you.",
  primaryCtaText = "Book a Free Call",
  primaryCtaHref = "#contact-arch-window",
  secondaryCtaText = "Explore the Demos",
  secondaryCtaHref = "#interactive-portfolio",
  microcopy = "Free 15-minute call · No obligation",
}: HeroMockupCompositionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-background border-b border-border">
      {/* Background Subtle Accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full" />
      </div>

      <div className="w-[min(100%-2*var(--gutter),var(--max-w))] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Calls to Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-foreground text-xs font-mono tracking-wide uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[length:var(--text-h1)] font-heading font-medium tracking-tight text-foreground leading-[1.08] mb-6"
            >
              {headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4"
            >
              <a
                href={primaryCtaHref}
                className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>{primaryCtaText}</span>
                <PhoneCall className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={secondaryCtaHref}
                className="btn-secondary px-7 py-3.5 text-base border border-border/80 hover:border-primary/40 transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>{secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Microcopy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 text-xs text-muted-foreground font-mono"
            >
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>{microcopy}</span>
            </motion.div>
          </div>

          {/* Right Column: Floating Browser & Phone Mockups Composition */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/3] max-w-xl mx-auto"
            >
              {/* Subtle Floating animation wrapper on desktop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full"
              >
                {/* Desktop Browser Window Mockup (Restaurant Website) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Browser Bar */}
                  <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 font-mono flex items-center gap-1.5 max-w-[240px] truncate">
                      <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">saffrontable.ae</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono hidden sm:block">Dubai &amp; UAE</div>
                  </div>

                  {/* Browser Content Preview */}
                  <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950">
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 text-white p-5 mb-4 aspect-[16/8] flex flex-col justify-end">
                      <img
                        src="https://img.b2bpic.net/free-photo/vegetable-stew-with-meat-corn-pieces-chili-pepper-vegetables-basilic-parsley-white-plate_114579-115.jpg"
                        alt="Saffron Table Restaurant"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                      <div className="relative z-10">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider mb-1">
                          Al Wasl, Dubai
                        </span>
                        <h3 className="text-xl font-bold font-heading">Saffron Table</h3>
                        <p className="text-xs text-slate-200 line-clamp-1">Contemporary Middle Eastern &amp; Grill</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">View Digital Menu</span>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">PDF-Free</span>
                      </div>
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-300" />
                          <span className="text-xs font-semibold">Reserve a Table</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Overlapping Phone Mockup 1: Daybreak Coffee */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 w-44 sm:w-52 bg-slate-900 border-4 border-slate-800 rounded-2xl shadow-xl p-3 z-20 text-white"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-300">Open Now</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Al Quoz 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-amber-900">
                    <img
                      src="https://img.b2bpic.net/free-photo/high-angle-coffee-making-with-machine_23-2148865579.jpg"
                      alt="Daybreak Coffee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">Daybreak Coffee</div>
                    <div className="text-[10px] text-slate-400">Specialty Roastery</div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px]">
                  <span className="text-slate-300">Cold Brew &amp; V60</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">1-Tap WA</span>
                </div>
              </motion.div>

              {/* Overlapping Phone Mockup 2: Palm Family Clinic */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-2 sm:-right-6 w-48 sm:w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-20 text-slate-900 dark:text-slate-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded font-medium">
                    Palm Clinic Jumeirah
                  </span>
                  <MapPin className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-xs font-semibold mb-1">Direct Appointment Booking</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">Pediatrics • Dental • Wellness</div>
                <div className="w-full bg-slate-900 text-white text-[10px] py-1.5 rounded text-center font-medium flex items-center justify-center gap-1">
                  <PhoneCall className="w-3 h-3 text-cyan-400" />
                  <span>Book Call / WhatsApp</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
