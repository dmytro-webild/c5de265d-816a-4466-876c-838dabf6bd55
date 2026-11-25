import { UtensilsCrossed } from "lucide-react";

export default function FounderNoteSection() {
  return (
    <section id="founder-note" className="py-16 lg:py-24 bg-card border-b border-border/60 text-foreground">
      <div className="w-[min(100%-2*var(--gutter),var(--max-w))] mx-auto max-w-4xl">
        <div className="relative rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm p-8 lg:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
            <div className="p-3.5 rounded-xl bg-primary/10 text-primary shrink-0">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-[length:var(--text-h3)] font-heading font-medium text-foreground tracking-tight">
                A Note from the Founder
              </h3>

              <blockquote className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed italic border-l-2 border-primary/40 pl-4 my-2">
                “Having worked in hospitality, I learned firsthand that guests want three simple things before visiting: clear opening hours, a fast mobile menu, and an effortless way to reserve or get in touch. That hospitality-first mindset shapes every website MECLIN builds—eliminating friction so your online visitors turn into paying guests from day one.”
              </blockquote>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border/40">
                <span>MECLIN Web Design • Dubai & UAE</span>
                <span className="font-semibold text-foreground">Hospitality-Driven Conversion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
