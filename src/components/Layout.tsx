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
              name: "Work",
              href: "#interactive-portfolio"
            },
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Process",
              href: "#process-mask-steps"
            },
            {
              name: "Pricing",
              href: "#packages"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          contactLabel="customerservice@meclin.store"
          contactHref="mailto:customerservice@meclin.store"
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
              href: "https://wa.me/971508520527"
            }
          ]}
          introDelay={1.2}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="default" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer" className="relative z-10 flex min-h-svh flex-col justify-end bg-[#1B1D1A] text-[#FAF9F5] pt-[clamp(4rem,9svh,6rem)]">
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
              href: "https://wa.me/971508520527"
            }
          ]}
          message="Make it easy for customers to choose you,"
          messageMuted="whether you run a local restaurant, café, salon, clinic or service business in Dubai & UAE."
          email="customerservice@meclin.store"
          newsletterTitle="Get local web tips"
          newsletterDescription="Practical insights on converting online visitors into booked calls and direct visits."
          submitText="Subscribe"
          links={[
            {
              text: "Work",
              href: "#interactive-portfolio"
            },
            {
              text: "Services",
              href: "#services"
            },
            {
              text: "Process",
              href: "#process-mask-steps"
            },
            {
              text: "Pricing",
              href: "#packages"
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
          copyright="© 2026 MECLIN."
        />
      </footer>
    </div>
  );
}
