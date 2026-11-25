import HeroMockupComposition from "@/components/sections/hero/HeroMockupComposition";
import CustomerQuestionsSection from "@/components/sections/features/CustomerQuestionsSection";
import InteractivePortfolioSection from "@/components/sections/gallery/InteractivePortfolioSection";
import IndustriesSection from "@/components/sections/features/IndustriesSection";
import ServicesStackCards from "@/components/sections/features/ServicesStackCards";
import ProcessMaskSteps from "@/components/sections/features/ProcessMaskSteps";
import SocialProofSection from "@/components/sections/testimonial/SocialProofSection";
import PackagesSection from "@/components/sections/pricing/PackagesSection";
import FaqBlurAccordion from "@/components/sections/faq/FaqBlurAccordion";
import StatementDarkCta from "@/components/sections/statement/StatementDarkCta";
import ContactArchWindow from "@/components/sections/contact/ContactArchWindow";
import LoaderArchRise from "@/components/loaders/LoaderArchRise";

export default function HomePage() {
  return (
    <>
      <LoaderArchRise label="MECLIN Web Design, Dubai" />

      {/* 1. HERO */}
      <div id="hero" data-webild-section="HeroMockupComposition" data-webild-section-id="HeroMockupComposition-1" data-section="hero" data-scene>
        <HeroMockupComposition
          eyebrow="Website design for Dubai & the UAE"
          headline="Make it easy for customers to choose you."
          subheadline="MECLIN builds websites for restaurants, cafés and local businesses. Give customers one place to see what you offer, find you and book or message you."
          primaryCtaText="Book a Free Call"
          primaryCtaHref="#contact-arch-window"
          secondaryCtaText="Explore the Demos"
          secondaryCtaHref="#interactive-portfolio"
          microcopy="Free 15-minute call · No obligation"
        />
      </div>

      {/* 2. CUSTOMER QUESTIONS */}
      <div id="customer-questions" data-webild-section="CustomerQuestionsSection" data-webild-section-id="CustomerQuestionsSection-1" data-section="customer-questions">
        <CustomerQuestionsSection
          eyebrow="Customer Questions"
          heading="Give customers the answers they came for."
          description="When a local UAE customer searches for your business, they want instant answers. Here is how MECLIN turns quick lookups into paying customers."
        />
      </div>

      {/* 3. INTERACTIVE PORTFOLIO */}
      <div id="interactive-portfolio" data-webild-section="InteractivePortfolioSection" data-webild-section-id="InteractivePortfolioSection-1" data-section="interactive-portfolio">
        <InteractivePortfolioSection />
      </div>

      {/* 4. INDUSTRIES SECTION */}
      <div id="industries" data-webild-section="IndustriesSection" data-webild-section-id="IndustriesSection-1" data-section="industries">
        <IndustriesSection
          label="Sectors & Outcomes"
          title="What should your customers be able to do?"
          description="Show clear, sector-specific outcomes so every visitor takes action instantly on mobile."
        />
      </div>

      {/* 5. SERVICES SECTION */}
      <div id="services" data-webild-section="ServicesStackCards" data-webild-section-id="ServicesStackCards-1" data-section="services" data-scene>
        <ServicesStackCards
          title="A website you can use from day one."
          subtitle="Complete design, local discovery, and customer conversion tools built specifically for Dubai & UAE businesses."
          cta={{
            text: "Book a Free Call",
            href: "#contact-arch-window"
          }}
          items={[
            {
              title: "Custom & Mobile Design",
              description: "Tailored visual design and mobile-friendly layouts built for fast-loading performance on all smartphones.",
              tags: ["Custom Design", "Mobile First", "Fast Loading"],
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-delicious-pie-with-strawberries-macarons-cup-tea-blue-surface-cake-biscuit-sweet-candy-pie-cookie_140725-66726.jpg",
              imageAlt: "Digital menu preview"
            },
            {
              title: "Local Search & Discovery",
              description: "Basic search setup, Google Maps directions, and direct links to your existing Google customer reviews.",
              tags: ["Google Maps", "Basic Search Setup", "Reviews Link"],
              imageSrc: "https://img.b2bpic.net/free-photo/we-re-back-now-open-cafe-sign-after-covid-19-pandemic_53876-165460.jpg",
              imageAlt: "Google Maps and location setup"
            },
            {
              title: "Direct Conversion Actions",
              description: "Prominent WhatsApp chat buttons, tap-to-call actions, and connections to booking or ordering platforms where suitable.",
              tags: ["WhatsApp", "Tap-To-Call", "Bookings"],
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-hands-holding-smartphone_23-2150671567.jpg",
              imageAlt: "WhatsApp and direct call"
            }
          ]}
          scopeNotice={{
            title: "Flexible Scope & Handover Process",
            text: "Hosting, ongoing updates, extra pages, multi-location support, and English–Arabic dual language layouts can be quoted based on scope. Where you manage edits, we provide a full handover guide explaining how to update key details.",
            details: [
              "Hosting & ongoing updates option",
              "Multi-location support available",
              "English–Arabic layout on request",
              "Step-by-step editing handover guide"
            ]
          }}
        />
      </div>

      {/* 6. FOUR-STEP PROCESS TIMELINE */}
      <div id="process-mask-steps" data-webild-section="ProcessMaskSteps" data-webild-section-id="ProcessMaskSteps-1" data-section="process-mask-steps">
        <ProcessMaskSteps
          label="Simple 4-Step Timeline"
          title="From first call to live website"
          description="MECLIN confirms the exact scope, deliverable list, and timeline in writing before starting."
          items={[
            {
              title: "1. Book a call",
              description: "We review how customers find you and what you want them to do during a focused 15-minute call.",
              imageSrc: "https://img.b2bpic.net/free-photo/handsome-model-african-young-man-working-laptop-computer-outside-terrace-european-city-coffee-shop_496169-1892.jpg",
              imageAlt: "Book a call"
            },
            {
              title: "2. We design",
              description: "You share your logo, photos, business details and any menu or services list while we craft your custom pages.",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-two-dads-looking-baby-ultrasounds_23-2149184731.jpg",
              imageAlt: "We design"
            },
            {
              title: "3. You approve",
              description: "Review the live draft directly on your phone, test every link, and share feedback before launch.",
              imageSrc: "https://img.b2bpic.net/free-photo/young-guy-with-beard-works-cafe-freelancer-uses-laptop-does-project_1296-732.jpg",
              imageAlt: "You approve"
            },
            {
              title: "4. We launch",
              description: "We test key links, connect your domain, and walk you through the site and its accounts with a full handover.",
              imageSrc: "https://img.b2bpic.net/free-photo/pretty-woman-making-coffee-cafe_23-2147775855.jpg",
              imageAlt: "We launch"
            }
          ]}
        />
      </div>

      {/* 7. HIDDEN SOCIAL PROOF COMPONENTS */}
      <div id="social-proof" data-webild-section="SocialProofSection" data-webild-section-id="SocialProofSection-1" data-section="social-proof">
        <SocialProofSection
          label="Verified Social Proof"
          title="Trusted by local businesses across Dubai & UAE"
          description="Real local business owners who upgraded to dedicated conversion websites."
        />
      </div>

      {/* 8. THREE-TIER PACKAGES SECTION */}
      <div id="packages" data-webild-section="PackagesSection" data-webild-section-id="PackagesSection-1" data-section="packages">
        <PackagesSection
          label="Transparent Packages"
          title="Three packages built for local UAE businesses"
          description="Clear pricing placeholders in AED with confirmed scope before work begins."
        />
      </div>

      {/* 9. FAQ ACCORDION */}
      <div id="faq" data-webild-section="FaqBlurAccordion" data-webild-section-id="FaqBlurAccordion-1" data-section="faq">
        <FaqBlurAccordion
          title="Before you book"
          description="Common questions about our web design process, packages, and handover."
          items={[
            {
              title: "What happens during the 15-minute call?",
              description: "We review how customers find you, evaluate your current site or Google listing, and spot immediate conversion fixes."
            },
            {
              title: "How fast can our new website launch?",
              description: "Most local business sites launch within 2 to 4 weeks once menu, photos, and business details are received."
            },
            {
              title: "What do I need to prepare before starting?",
              description: "Just share your logo, photos, business details, and any menu or service list. MECLIN handles the rest."
            },
            {
              title: "What are your package prices?",
              description: "Packages start at AED 2,500 for single-page sites and AED 5,000 for full multi-page builds, with scope confirmed before starting."
            },
            {
              title: "Do you help align our Google Maps profile?",
              description: "Yes. We make sure your Google Maps listing links directly to your website so customers find your phone number and location instantly."
            },
            {
              title: "What about hosting and updates after launch?",
              description: "Hosting, ongoing updates, extra pages, multi-location support, and English–Arabic layouts are available and quoted based on scope, along with a full handover guide."
            }
          ]}
        />
      </div>

      {/* 10. DARK NAVY FINAL CTA SECTION */}
      <div id="final-cta" data-webild-section="StatementDarkCta" data-webild-section-id="StatementDarkCta-1" data-section="final-cta">
        <StatementDarkCta
          label="Ready to grow?"
          title="Make it easy for customers to choose you"
          primaryButton={{
            text: "Book a Free Call",
            href: "#contact-arch-window"
          }}
          secondaryButton={{
            text: "Explore Demos",
            href: "#interactive-portfolio"
          }}
        />
      </div>

      {/* CONTACT FORM */}
      <div id="contact-arch-window" data-webild-section="ContactArchWindow" data-webild-section-id="ContactArchWindow-1" data-section="contact-arch-window">
        <ContactArchWindow
          title="Book a free 15-minute website review"
          description="Bring your website, Google Maps listing, or Instagram link. We will share one practical change to get more customer bookings."
          projectTypes={[
            "Restaurant or Café",
            "Salon or Spa",
            "Clinic or Medical",
            "Local Service Business"
          ]}
          submitText="Book Your Call"
          successTitle="Review request received"
          successDescription="We will contact you shortly to confirm your free 15-minute website review session."
          fields={{
            name: "Your name",
            email: "Business email",
            projectType: "Business type",
            existingLink: "Website or Instagram link",
            helpDetails: "What would you like help with?"
          }}
        />
      </div>
    </>
  );
}
