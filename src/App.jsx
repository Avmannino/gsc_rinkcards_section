import { useEffect } from "react";
import "./App.css";

const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const CENTER_ICE_LOGO_SRC = `${import.meta.env.BASE_URL}gsc-logo.png`;
const RINKCARD_IMAGE_BASE = `${import.meta.env.BASE_URL}rinkcards/`;
const RINKCARDS_BACKGROUND_SRC = `${import.meta.env.BASE_URL}gsc-background.jpg`;

const navigationLinks = [
  {
    title: "Programs",
    description: "See what’s happening on the ice.",
    href: `${SITE_BASE_URL}/programs`,
    image: `${RINKCARD_IMAGE_BASE}programs.jpg`,
    position: "65% center",
    layout: "crossbar",
  },
  {
    title: "Crossbar Login",
    description: "Log in to the GSC Crossbar Portal.",
    href: "https://www.greenwichskatingclub.org/login",
    image: `${RINKCARD_IMAGE_BASE}crossbar-login.png`,
    position: "center center",
    layout: "billing",
  },
  {
    title: "Membership",
    description: "Learn about memberships.",
    href: `${SITE_BASE_URL}/membership`,
    image: `${RINKCARD_IMAGE_BASE}membership.jpg`,
    position: "center 100%",
    layout: "membership",
  },
  {
    title: "Member Billing",
    description: "Manage your membership billing.",
    href: "https://members.greenwichskatingclub.org/",
    image: `${RINKCARD_IMAGE_BASE}member-billing.jpg`,
    position: "center center",
    layout: "contact",
  },
  {
    title: "Contact Us",
    description: "Get in touch with us.",
    href: `${SITE_BASE_URL}/contact`,
    image: `${RINKCARD_IMAGE_BASE}contact.png`,
    position: "35% center",
    layout: "programs",
  },
  {
    title: "Directions",
    description: "Get directions to the club.",
    href: `${SITE_BASE_URL}/directions`,
    image: `${RINKCARD_IMAGE_BASE}directions.jpg`,
    position: "center center",
    layout: "directions",
  },
];

const exploreGroups = [
  {
    title: "About GSC",
    href: `${SITE_BASE_URL}/about-gsc`,
    links: [
      {
        label: "Club History",
        href: `${SITE_BASE_URL}/club-history`,
      },
      {
        label: "Board of Governors",
        href: `${SITE_BASE_URL}/board-of-governors`,
      },
      {
        label: "GSC Alumni",
        href: `${SITE_BASE_URL}/gsc-alumni`,
      },
    ],
  },
  {
    title: "Membership",
    href: `${SITE_BASE_URL}/membership`,
    links: [
      {
        label: "Admissions Process",
        href: `${SITE_BASE_URL}/admissions-process`,
      },
    ],
  },
  {
    title: "Programs",
    href: `${SITE_BASE_URL}/programs`,
    links: [
      {
        label: "Learn to Skate",
        href: `${SITE_BASE_URL}/learn-to-skate`,
      },
      {
        label: "Mini Mites",
        href: `${SITE_BASE_URL}/mini-mites`,
      },
      {
        label: "Youth Travel Hockey",
        href: `${SITE_BASE_URL}/youth-travel-hockey`,
      },
      {
        label: "Stateline Girls",
        href: `${SITE_BASE_URL}/stateline-girls`,
      },
      {
        label: "Figure Skating",
        href: `${SITE_BASE_URL}/figure-skating`,
      },
      {
        label: "Adult Hockey",
        href: `${SITE_BASE_URL}/adult-hockey`,
      },
    ],
  },
  {
    title: "Contact",
    href: `${SITE_BASE_URL}/contact`,
    links: [
      {
        label: "Map & Directions",
        href: `${SITE_BASE_URL}/directions`,
      },
      {
        label: "Contact Form",
        href: `${SITE_BASE_URL}/contact-form`,
      },
    ],
  },
];

function CardArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 3 6 7-6 7" />
    </svg>
  );
}

function RinkMarkings() {
  return (
    <svg
      className="rinkcards-rink__markings"
      viewBox="0 0 200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2="90" className="rinkcards-rink__goal-line" />
      <line x1="188" y1="0" x2="188" y2="90" className="rinkcards-rink__goal-line" />
      <line x1="70" y1="0" x2="70" y2="90" className="rinkcards-rink__blue-line" />
      <line x1="130" y1="0" x2="130" y2="90" className="rinkcards-rink__blue-line" />
      <line x1="100" y1="0" x2="100" y2="90" className="rinkcards-rink__center-line" />

      <circle cx="100" cy="45" r="14" className="rinkcards-rink__circle" />
      <circle cx="48" cy="26" r="10" className="rinkcards-rink__circle" />
      <circle cx="48" cy="64" r="10" className="rinkcards-rink__circle" />
      <circle cx="152" cy="26" r="10" className="rinkcards-rink__circle" />
      <circle cx="152" cy="64" r="10" className="rinkcards-rink__circle" />

      <circle cx="100" cy="45" r="1.35" className="rinkcards-rink__dot" />
      <circle cx="48" cy="26" r="1.15" className="rinkcards-rink__dot" />
      <circle cx="48" cy="64" r="1.15" className="rinkcards-rink__dot" />
      <circle cx="152" cy="26" r="1.15" className="rinkcards-rink__dot" />
      <circle cx="152" cy="64" r="1.15" className="rinkcards-rink__dot" />

      <path d="M 12 40 A 5 5 0 0 1 12 50 Z" className="rinkcards-rink__crease" />
      <path d="M 188 40 A 5 5 0 0 0 188 50 Z" className="rinkcards-rink__crease" />

      <image
        href={CENTER_ICE_LOGO_SRC}
        x="87"
        y="32"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        className="rinkcards-rink__logo"
      />
    </svg>
  );
}

function RinkCard({ link }) {
  return (
    <a
      className={`rink-card rink-card--${link.layout}`}
      href={link.href}
      target="_top"
      aria-label={`${link.title}: ${link.description}`}
    >
      <span
        className="rink-card__media"
        style={{
          backgroundImage: `url("${link.image}")`,
          backgroundPosition: link.position,
        }}
        aria-hidden="true"
      />

      <span className="rink-card__shade" aria-hidden="true" />

      <span className="rink-card__content">
        <span className="rink-card__title-row">
          <span className="rink-card__title">{link.title}</span>
          <span className="rink-card__arrow" aria-hidden="true">
            <CardArrowIcon />
          </span>
        </span>

        <span className="rink-card__description">
          {link.description}
        </span>

        <span className="rink-card__rule" aria-hidden="true" />
      </span>
    </a>
  );
}

function RinkCardsSection() {
  return (
    <section
      className="rinkcards-section"
      aria-labelledby="rinkcards-section-title"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% -18%, rgba(87, 135, 205, 0.48) 0%, rgba(35, 77, 135, 0.2) 38%, transparent 66%), linear-gradient(180deg, rgba(10, 32, 63, 0.8) 0%, rgba(7, 27, 53, 0.78) 47%, rgba(11, 39, 74, 0.8) 100%), url("${RINKCARDS_BACKGROUND_SRC}")`,
      }}
    >
      <div className="rinkcards-section__ambient" aria-hidden="true" />

      <div className="rinkcards-section__inner">
        <header className="rinkcards-heading">
          <h1 id="rinkcards-section-title">Around The Rink</h1>
          <span aria-hidden="true" />
        </header>

        <div className="rinkcards-rink">
          <RinkMarkings />

          <nav
            className="rinkcards-grid"
            aria-label="Greenwich Skating Club pages"
          >
            {navigationLinks.map((link) => (
              <RinkCard key={link.title} link={link} />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        className="icon-fill"
        cx="17.5"
        cy="6.5"
        r="1"
      />
    </svg>
  );
}

function FooterLogo() {
  return (
    <a
      className="footer-logo"
      href={`${SITE_BASE_URL}/`}
      target="_top"
      aria-label="Greenwich Skating Club home"
    >
      <img
        src={CENTER_ICE_LOGO_SRC}
        alt="Greenwich Skating Club"
      />
    </a>
  );
}

function ExploreMenu() {
  return (
    <nav
      className="footer-menu"
      aria-label="Footer navigation"
    >
      <h2>Explore</h2>

      <div className="footer-menu__groups">
        {exploreGroups.map((group) => (
          <div
            className="footer-menu__group"
            key={group.title}
          >
            <a
              className="footer-menu__group-title"
              href={group.href}
              target="_top"
            >
              <span>{group.title}</span>

              <ArrowIcon />
            </a>

            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_top"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ConnectPanel() {
  return (
    <section
      className="footer-connect"
      aria-labelledby="connect-title"
    >
      <div className="footer-connect__info">
        <h2 id="connect-title">
          Connect
        </h2>

        <p>
          Questions about joining Greenwich Skating
          Club or visiting the rink?
        </p>

        <div className="footer-connect__details">
          <a
            href={`${SITE_BASE_URL}/directions`}
            target="_top"
          >
            <PinIcon />

            <span>
              Cardinal Road · Greenwich, Connecticut
            </span>
          </a>

          <a href={`mailto:${ADMISSIONS_EMAIL}`}>
            <EmailIcon />

            <span>
              {ADMISSIONS_EMAIL}
            </span>
          </a>
        </div>

        <a
          className="member-button"
          href={MEMBER_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>Member Login</span>

          <ArrowIcon />
        </a>

        <a
          className="instagram-link"
          href="https://www.instagram.com/thegreenwichskatingclub/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />

          <span>
            Follow GSC on Instagram
          </span>
        </a>
      </div>

      <div className="footer-map">
        <iframe
          title="Greenwich Skating Club location"
          src="https://www.google.com/maps?q=Greenwich+Skating+Club,+Cardinal+Road,+Greenwich,+CT&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function SiteFooter() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div
        className="site-footer__accent"
        aria-hidden="true"
      >
        <span />
        <span />
      </div>

      <div
        className="site-footer__rings"
        aria-hidden="true"
      />

      <div className="footer-container site-footer__main">
        <section
          className="footer-brand"
          aria-label="Greenwich Skating Club"
        >
          <FooterLogo />
        </section>

        <ExploreMenu />

        <ConnectPanel />
      </div>

      <div className="site-footer__bottom">
        <div className="footer-container site-footer__bottom-inner">
          <p>
            © {currentYear} Greenwich Skating Club
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <>
      <main>
        <RinkCardsSection />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;