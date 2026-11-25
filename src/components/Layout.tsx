import { Outlet } from "react-router-dom";
import NavbarCrossMenu from "@/components/navbars/NavbarCrossMenu";
import FooterNewsletterReveal from "@/components/sections/footer/FooterNewsletterReveal";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="default" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarCrossMenu
          brand="MECLIN"
          navItems={[
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Work",
              href: "#gallery"
            },
            {
              name: "Process",
              href: "#process-mask-steps"
            },
            {
              name: "Pricing",
              href: "#contact-arch-window"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          contactLabel="hello@meclin.store"
          contactHref="mailto:hello@meclin.store"
          socials={[
            {
              label: "Instagram",
              href: "#"
            },
            {
              label: "LinkedIn",
              href: "#"
            },
            {
              label: "WhatsApp",
              href: "#"
            }
          ]}
          introDelay={1.2}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="default" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer" className="relative z-10 flex min-h-svh flex-col justify-end bg-card pt-[clamp(4rem,9svh,6rem)]">
        <FooterNewsletterReveal
          brand="MECLIN"
          socials={[
            {
              text: "Instagram",
              href: "#"
            },
            {
              text: "LinkedIn",
              href: "#"
            },
            {
              text: "WhatsApp",
              href: "https://wa.me/"
            }
          ]}
          message="Make it easy for customers to choose you,"
          messageMuted="whether you run a local restaurant, café, or service business in Dubai."
          email="hello@meclin.store"
          newsletterTitle="Get local web tips"
          newsletterDescription="Practical insights on converting online visitors into booked calls and direct visits."
          submitText="Subscribe"
          links={[
            {
              text: "Services",
              href: "#services"
            },
            {
              text: "Work",
              href: "#gallery"
            },
            {
              text: "Pricing",
              href: "#contact-arch-window"
            },
            {
              text: "FAQ",
              href: "#faq"
            },
            {
              text: "Book Call",
              href: "#contact-arch-window"
            }
          ]}
          copyright="© 2026 MECLIN. Al Serkal Avenue, Al Quoz, Dubai, UAE."
          namePlaceholder="Your name"
          emailPlaceholder="Your email address"
          successText="Thank you for subscribing. We will be in touch soon."
        />
      </footer>
    </div>
  );
}
