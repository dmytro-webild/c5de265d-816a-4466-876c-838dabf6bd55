import HeroMockupComposition from "@/components/sections/hero/HeroMockupComposition";
import CustomerQuestionsSection from "@/components/sections/features/CustomerQuestionsSection";
import InteractivePortfolioSection from "@/components/sections/gallery/InteractivePortfolioSection";
import ServicesStackCards from "@/components/sections/features/ServicesStackCards";
import GalleryArchTrack from "@/components/sections/gallery/GalleryArchTrack";
import ProcessMaskSteps from "@/components/sections/features/ProcessMaskSteps";
import StatementDarkCta from "@/components/sections/statement/StatementDarkCta";
import TestimonialStackPortraits from "@/components/sections/testimonial/TestimonialStackPortraits";
import FaqBlurAccordion from "@/components/sections/faq/FaqBlurAccordion";
import ContactArchWindow from "@/components/sections/contact/ContactArchWindow";
import LoaderArchRise from "@/components/loaders/LoaderArchRise";

export default function HomePage() {
  return (
    <>
      <LoaderArchRise label="MECLIN Web Design, Dubai" />

      {/* 2. HERO */}
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

      {/* 3. CUSTOMER QUESTIONS */}
      <div id="customer-questions" data-webild-section="CustomerQuestionsSection" data-webild-section-id="CustomerQuestionsSection-1" data-section="customer-questions">
        <CustomerQuestionsSection
          eyebrow="Customer Questions"
          heading="Give customers the answers they came for."
          description="When a local UAE customer searches for your business, they want instant answers. Here is how MECLIN turns quick lookups into paying customers."
        />
      </div>

      {/* 4. INTERACTIVE PORTFOLIO (Appears early on the page) */}
      <div id="interactive-portfolio" data-webild-section="InteractivePortfolioSection" data-webild-section-id="InteractivePortfolioSection-1" data-section="interactive-portfolio">
        <InteractivePortfolioSection />
      </div>

      {/* SERVICES & FEATURES */}
      <div id="services" data-webild-section="ServicesStackCards" data-webild-section-id="ServicesStackCards-1" data-section="services" data-scene>
        <ServicesStackCards
          title="Stop Losing Mobile Visitors"
          cta={{
            text: "Book a Call",
            href: "#contact-arch-window"
          }}
          items={[
            {
              title: "Instant Digital Menus",
              description: "Replace slow PDF downloads with crisp, mobile-friendly menus that load instantly on any smartphone in Dubai.",
              tags: [
                "Mobile First",
                "Fast Loading"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-delicious-pie-with-strawberries-macarons-cup-tea-blue-surface-cake-biscuit-sweet-candy-pie-cookie_140725-66726.jpg",
              imageAlt: "Front view delicious pie with strawberries macarons and cup of tea on blue surface cake biscuit sweet candy pie cookie"
            },
            {
              title: "One-Tap Direct Contact",
              description: "Connect visitors straight to your WhatsApp or phone line without making them copy numbers or hunt through footers.",
              tags: [
                "WhatsApp",
                "Click To Call"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-hands-holding-smartphone_23-2150671567.jpg",
              imageAlt: "High angle hands holding smartphone"
            },
            {
              title: "Clear Hours & Directions",
              description: "Put opening hours, map location, and parking details front and center so customers reach your front door effortlessly.",
              tags: [
                "Google Maps",
                "Location"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/we-re-back-now-open-cafe-sign-after-covid-19-pandemic_53876-165460.jpg",
              imageAlt: "‘We’re back, now open’ cafe sign after covid-19 pandemic"
            },
            {
              title: "Frictionless Table Booking",
              description: "Give diners a direct path to reserve tables or request quotes without navigating complex software or slow forms.",
              tags: [
                "Reservations",
                "Conversions"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-friends-posing-together_23-2149073438.jpg",
              imageAlt: "Medium shot friends posing together"
            }
          ]}
        />
      </div>

      {/* GALLERY & SAMPLES */}
      <div id="gallery" data-webild-section="GalleryArchTrack" data-webild-section-id="GalleryArchTrack-1" data-section="gallery" data-scene data-gallery>
        <GalleryArchTrack
          title="Mobile Ready Demos"
          label="Live Demos"
          items={[
            {
              title: "The Coffee Lab",
              date: "_01.26",
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-coffee-making-with-machine_23-2148865579.jpg",
              imageAlt: "High angle coffee making with machine",
              href: "#contact-arch-window"
            },
            {
              title: "Sunlight Spa",
              date: "_02.26",
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-eco-friendly-cleaning-products-set-with-soap-cotton-swabs_23-2148818490.jpg",
              imageAlt: "Front view of eco-friendly cleaning products set with soap and cotton swabs",
              href: "#contact-arch-window"
            },
            {
              title: "FitPulse Gym",
              date: "_03.26",
              imageSrc: "https://img.b2bpic.net/free-photo/still-life-foam-roller_23-2151817404.jpg",
              imageAlt: "Still life of foam roller",
              href: "#contact-arch-window"
            },
            {
              title: "Coastal Dental",
              date: "_04.26",
              imageSrc: "https://img.b2bpic.net/free-photo/closeup-dental-tooth-intruments-medical-stomatology-orthodontic-office_482257-12296.jpg",
              imageAlt: "Closeup of dental tooth intruments in medical stomatology orthodontic office",
              href: "#contact-arch-window"
            },
            {
              title: "Al Quoz Bistro",
              date: "_05.26",
              imageSrc: "https://img.b2bpic.net/free-photo/vegetable-stew-with-meat-corn-pieces-chili-pepper-vegetables-basilic-parsley-white-plate_114579-115.jpg",
              imageAlt: "Vegetable stew with meat, corn pieces, chili pepper and vegetables, basilic, parsley in white plate. ",
              href: "#contact-arch-window"
            },
            {
              title: "Repair Masters",
              date: "_06.26",
              imageSrc: "https://img.b2bpic.net/free-photo/closeup-shot-hummer-tools-stairs-house-construction_181624-28753.jpg",
              imageAlt: "Closeup shot of a hummer and tools on the stairs during the house construction",
              href: "#contact-arch-window"
            }
          ]}
        />
      </div>

      {/* PROCESS */}
      <div id="process-mask-steps" data-webild-section="ProcessMaskSteps" data-webild-section-id="ProcessMaskSteps-1" data-section="process-mask-steps">
        <ProcessMaskSteps
          label="Simple steps"
          title="From first call to live website"
          items={[
            {
              title: "15-minute review",
              description: "We look at your current website or social links to spot fast conversion fixes.",
              imageSrc: "https://img.b2bpic.net/free-photo/handsome-model-african-young-man-working-laptop-computer-outside-terrace-european-city-coffee-shop_496169-1892.jpg",
              imageAlt: "Handsome model, african young man working on laptop computer outside terrace in an european city coffee shop."
            },
            {
              title: "Clear outline & preview",
              description: "We design mobile-first pages showing your menu, hours, and direct booking actions.",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-two-dads-looking-baby-ultrasounds_23-2149184731.jpg",
              imageAlt: "Close up on two dads looking at baby ultrasounds"
            },
            {
              title: "Fast development",
              description: "We build fast, responsive layouts optimized for local searchers on smartphones.",
              imageSrc: "https://img.b2bpic.net/free-photo/young-guy-with-beard-works-cafe-freelancer-uses-laptop-does-project_1296-732.jpg",
              imageAlt: "young guy with a beard works in a cafe, freelancer uses a laptop, does a project"
            },
            {
              title: "Launch & guidance",
              description: "We test every direct call button, publish your site, and walk you through simple updates.",
              imageSrc: "https://img.b2bpic.net/free-photo/pretty-woman-making-coffee-cafe_23-2147775855.jpg",
              imageAlt: "Pretty woman making coffee in cafe"
            }
          ]}
        />
      </div>

      {/* STATEMENT CTA */}
      <div id="statement-dark-cta" data-webild-section="StatementDarkCta" data-webild-section-id="StatementDarkCta-1" data-section="statement-dark-cta">
        <StatementDarkCta
          label="Ready to grow?"
          title="Give UAE customers a clear way to book"
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

      {/* TESTIMONIALS */}
      <div id="testimonial" data-webild-section="TestimonialStackPortraits" data-webild-section-id="TestimonialStackPortraits-1" data-section="testimonial">
        <TestimonialStackPortraits
          label="Client reviews"
          items={[
            {
              quote: "Our customers finally find our menu instantly on mobile without downloading slow PDFs.",
              name: "Jordan Walsh",
              role: "Owner, Dubai Bistro",
              imageSrc: "https://img.b2bpic.net/free-photo/young-smiling-blonde-male-barber-uniform-stands-with-raised-hands-isolated-green-space-with-copy-space_141793-60124.jpg"
            },
            {
              quote: "WhatsApp inquiries doubled within two weeks of launching our clear new website.",
              name: "Leah Sullivan",
              role: "Manager, Marina Spa",
              imageSrc: "https://img.b2bpic.net/free-photo/beautiful-business-woman-portrait_23-2149280698.jpg"
            },
            {
              quote: "Clean, fast, and completely focused on getting UAE clients to call us directly.",
              name: "Kevin Reid",
              role: "Founder, Jumeirah Repair",
              imageSrc: "https://img.b2bpic.net/free-photo/thoughtful-bearded-project-manager-working-home_273609-20290.jpg"
            },
            {
              quote: "The free review call showed us exactly why visitors were leaving our old site.",
              name: "Hannah Graham",
              role: "Director, Al Quoz Fitness",
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-smiley-stewardess-posing_23-2150197260.jpg"
            }
          ]}
        />
      </div>

      {/* FAQ */}
      <div id="faq" data-webild-section="FaqBlurAccordion" data-webild-section-id="FaqBlurAccordion-1" data-section="faq">
        <FaqBlurAccordion
          title="Before you book"
          description="Common questions about our web design process."
          items={[
            {
              title: "What happens during the 15-minute call?",
              description: "Bring your current site, Google Maps listing, or Instagram profile. We share one practical fix to get more bookings."
            },
            {
              title: "How fast can our new website launch?",
              description: "Most local business sites are built and launched in two to four weeks."
            },
            {
              title: "What do I need to prepare before starting?",
              description: "Just bring your menu, logo, or service list. We handle the design layout and mobile setup."
            },
            {
              title: "What are your package prices?",
              description: "Our transparent packages start at AED 2,500 for single-page business sites and AED 5,000 for full multi-page builds."
            },
            {
              title: "Do you help align our Google Maps profile?",
              description: "Yes. We make sure your Google Maps listing links directly to your website so customers find your phone number and location instantly."
            },
            {
              title: "Do you offer support after launch?",
              description: "We ensure your contact details, opening hours, and menu stay accurate whenever your business updates them."
            }
          ]}
        />
      </div>

      {/* CONTACT */}
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
            message: "Website or Instagram link"
          }}
        />
      </div>
    </>
  );
}
