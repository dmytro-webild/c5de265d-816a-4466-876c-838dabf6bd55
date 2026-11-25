import { motion } from "motion/react";
import { Clock, MapPin, Phone, MessageSquare, Utensils, Sparkles, ChevronRight, Check } from "lucide-react";

export type CustomerQuestionsSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
};

export default function CustomerQuestionsSection({
  eyebrow = "Customer Questions",
  heading = "Give customers the answers they came for.",
  description = "When a local UAE customer searches for your business, they want instant answers. Here is how MECLIN turns quick lookups into paying customers.",
}: CustomerQuestionsSectionProps) {
  const cards = [
    {
      id: "open",
      question: "“Are you open?”",
      featureTitle: "Live Opening Hours & Instant Directions",
      featureDesc: "Clear opening status, current hours, Google Maps directions, and direct phone links right on the landing hero.",
      icon: Clock,
      mockupType: "hours",
      highlights: [
        "Live Open/Closed status indicator",
        "Google Maps 1-tap navigation link",
        "Direct phone call button for quick inquiries"
      ]
    },
    {
      id: "offer",
      question: "“What do you offer?”",
      featureTitle: "Phone-Scannable Digital Menus & Price Sheets",
      featureDesc: "No more forcing diners to download 20MB PDF menus. Fast, mobile-first visual menus and clear service pricing.",
      icon: Utensils,
      mockupType: "menu",
      highlights: [
        "Loads instantly on any Dubai smartphone",
        "Categorized tabs (Starters, Mains, Drinks)",
        "High-res dish photos and item prices"
      ]
    },
    {
      id: "book",
      question: "“How do I book?”",
      featureTitle: "Direct 1-Tap WhatsApp & Booking Routes",
      featureDesc: "Zero-friction reservation pathways connecting prospects straight to your team on WhatsApp or online booking.",
      icon: MessageSquare,
      mockupType: "booking",
      highlights: [
        "Pre-filled WhatsApp message generator",
        "Fast table & appointment booking widget",
        "Zero copy-pasting numbers or hidden footers"
      ]
    }
  ];

  return (
    <section id="customer-questions" className="py-20 lg:py-28 bg-background border-b border-border">
      <div className="w-[min(100%-2*var(--gutter),var(--max-w))] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[length:var(--text-h1)] font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-6"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="kit-card border border-border/80 rounded-(--radius-card) p-6 lg:p-8 flex flex-col justify-between hover:border-primary/40 transition-all shadow-sm hover:shadow-md group bg-card"
              >
                <div>
                  {/* Real Question Badge */}
                  <div className="inline-block px-3 py-1 rounded-md bg-accent/20 text-accent-foreground font-heading text-sm font-semibold mb-6">
                    {card.question}
                  </div>

                  {/* Feature Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[length:var(--text-h3)] font-heading font-semibold text-foreground leading-snug">
                      {card.featureTitle}
                    </h3>
                  </div>

                  {/* Feature Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {card.featureDesc}
                  </p>

                  {/* Mockup Preview Element */}
                  <div className="bg-background border border-border/60 rounded-xl p-4 mb-6 text-xs shadow-inner">
                    {card.mockupType === "hours" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Open Now • Closes 11 PM</span>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground">Mon - Sun</span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground pt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span>Al Serkal Avenue, Dubai</span>
                          </div>
                          <span className="text-[10px] bg-accent/20 px-1.5 py-0.5 rounded text-foreground font-mono">1.2 km</span>
                        </div>
                      </div>
                    )}

                    {card.mockupType === "menu" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-border pb-1.5 text-[11px] font-mono">
                          <span className="text-primary font-bold border-b-2 border-accent pb-0.5">Popular Dishes</span>
                          <span className="text-muted-foreground">Drinks</span>
                          <span className="text-muted-foreground">Desserts</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-medium text-foreground">Saffron Lamb Kebab</span>
                          <span className="font-mono text-accent font-bold">AED 85</span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="font-medium">Truffle Hummus Dip</span>
                          <span className="font-mono text-accent font-bold">AED 42</span>
                        </div>
                      </div>
                    )}

                    {card.mockupType === "booking" && (
                      <div className="space-y-2">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg flex items-center justify-between font-medium">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Book Table via WhatsApp</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                          <span>Instant Confirmation</span>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-primary" />
                            <span>04 340 0000</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-4">
                    {card.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
