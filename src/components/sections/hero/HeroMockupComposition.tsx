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
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#10111C] text-[#F7F4EE] border-b border-[#23263B]">
      {/* Background Layered Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#7559BA]/25 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#FFB478]/20 blur-[120px] rounded-full" />
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7559BA]/20 border border-[#7559BA]/40 text-[#FFB478] text-xs font-semibold tracking-wide uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB478]" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* Headline: 72-84px on desktop, 40-48px on phones, weight 400, line-height 1.02, letter-spacing -0.045em */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] sm:text-6xl lg:text-[78px] font-normal tracking-[-0.045em] text-[#F7F4EE] leading-[1.02] mb-6 max-w-2xl"
            >
              {headline.includes("customers to choose") ? (
                <>
                  Make it easy for<br className="hidden sm:inline" /> customers to choose you.
                </>
              ) : (
                headline
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#A9A6B8] leading-relaxed mb-8 max-w-xl font-normal"
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
                className="px-7 py-3.5 text-base font-semibold bg-[#FFB478] text-[#10111C] rounded-full hover:bg-[#ffa760] shadow-lg shadow-[#FFB478]/15 transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>{primaryCtaText}</span>
                <PhoneCall className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={secondaryCtaHref}
                className="px-7 py-3.5 text-base font-semibold bg-[#EEEAF7] text-[#10111C] rounded-full hover:bg-[#e4deef] transition-all inline-flex items-center justify-center gap-2 group"
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
              className="flex items-center gap-2 text-xs text-[#A9A6B8]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FFB478] flex-shrink-0" />
              <span>{microcopy}</span>
            </motion.div>
          </div>

          {/* Right Column: Floating Browser & Phone Mockups Composition */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            {/* Soft Violet & Apricot Glow Layer behind Mockups */}
            <div className="pointer-events-none absolute -inset-6 sm:-inset-12 -z-10 flex items-center justify-center">
              <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#7559BA]/50 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#FFB478]/40 rounded-full blur-[100px]" />
            </div>

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
                <div className="bg-[#181926] border border-[#2D304B] rounded-2xl shadow-2xl overflow-hidden">
                  {/* Browser Bar */}
                  <div className="bg-[#12131F] px-4 py-3 border-b border-[#2D304B] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="bg-[#181926] px-3 py-1 rounded-md border border-[#2D304B] text-[11px] text-[#A9A6B8] flex items-center gap-1.5 max-w-[240px] truncate">
                      <Globe className="w-3 h-3 text-[#7559BA] flex-shrink-0" />
                      <span className="truncate">saffrontable.ae</span>
                    </div>
                    <div className="text-[10px] text-[#A9A6B8] hidden sm:block">Dubai &amp; UAE</div>
                  </div>

                  {/* Browser Content Preview */}
                  <div className="p-4 sm:p-6 bg-[#141522]">
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 text-white p-5 mb-4 aspect-[16/8] flex flex-col justify-end">
                      <img
                        src="https://img.b2bpic.net/free-photo/vegetable-stew-with-meat-corn-pieces-chili-pepper-vegetables-basilic-parsley-white-plate_114579-115.jpg"
                        alt="Saffron Table Restaurant"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="relative z-10">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFB478] text-[#10111C] text-[10px] font-bold uppercase tracking-wider mb-1">
                          Al Wasl, Dubai
                        </span>
                        <h3 className="text-xl font-bold font-heading text-white">Saffron Table</h3>
                        <p className="text-xs text-slate-200 line-clamp-1">Contemporary Middle Eastern &amp; Grill</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#1E2032] p-3 rounded-lg border border-[#2D304B] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-[#FFB478]" />
                          <span className="text-xs font-medium text-[#F7F4EE]">Digital Menu</span>
                        </div>
                        <span className="text-[10px] bg-[#7559BA]/20 text-[#EEEAF7] px-2 py-0.5 rounded">PDF-Free</span>
                      </div>
                      <div className="bg-[#FFB478] text-[#10111C] p-3 rounded-lg flex items-center justify-between shadow-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#10111C]" />
                          <span className="text-xs">Reserve Table</span>
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
                className="absolute -bottom-6 -left-4 sm:-left-8 w-44 sm:w-52 bg-[#181926] border-2 border-[#2D304B] rounded-2xl shadow-2xl p-3 z-20 text-[#F7F4EE]"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2D304B]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-300">Open Now</span>
                  </div>
                  <span className="text-[9px] text-[#A9A6B8]">Al Quoz 1</span>
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
                    <div className="text-[10px] text-[#A9A6B8]">Specialty Roastery</div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#2D304B] flex justify-between items-center text-[10px]">
                  <span className="text-[#A9A6B8]">Cold Brew &amp; V60</span>
                  <span className="bg-[#7559BA]/20 text-[#FFB478] px-1.5 py-0.5 rounded">1-Tap WA</span>
                </div>
              </motion.div>

              {/* Overlapping Phone Mockup 2: Palm Family Clinic */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-2 sm:-right-6 w-48 sm:w-56 bg-[#181926] border-2 border-[#2D304B] rounded-xl shadow-2xl p-3 z-20 text-[#F7F4EE]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#FFB478] bg-[#7559BA]/20 px-2 py-0.5 rounded font-medium">
                    Palm Clinic Jumeirah
                  </span>
                  <MapPin className="w-3 h-3 text-[#A9A6B8]" />
                </div>
                <div className="text-xs font-semibold mb-1">Direct Booking</div>
                <div className="text-[10px] text-[#A9A6B8] mb-2">Pediatrics • Dental • Wellness</div>
                <div className="w-full bg-[#FFB478] text-[#10111C] text-[10px] py-1.5 rounded-lg text-center font-semibold flex items-center justify-center gap-1">
                  <PhoneCall className="w-3 h-3 text-[#10111C]" />
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
