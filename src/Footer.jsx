import {
  useRef,
  useState,
} from "react";
import "./Footer.css";

const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const MEMBERS_SITE_URL =
  "https://members.greenwichskatingclub.org";

const exploreGroups = [
  {
    title: "About",
    links: [
      {
        label: "About GSC",
        href: `${SITE_BASE_URL}/about-gsc`,
      },
      {
        label: "Club History",
        href: `${SITE_BASE_URL}/history`,
      },
      {
        label: "Board of Governors",
        href: `${SITE_BASE_URL}/board`,
      },
      {
        label: "GSC Alumni",
        href: `${SITE_BASE_URL}/alumni`,
      },
    ],
  },
  {
    title: "Membership",
    links: [
      {
        label: "Admissions Process",
        href: `${SITE_BASE_URL}/admissions`,
      },
    ],
  },
  {
    title: "Programs",
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
        label: "Stateline Girls Hockey",
        href: `${SITE_BASE_URL}/stateline-girls-hockey`,
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
    links: [
      {
        label: "Map & Directions",
        href: `${SITE_BASE_URL}/directions`,
      },
      {
        label: "Contact Us",
        href: `${SITE_BASE_URL}/contact`,
      },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
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
        src={`${
          import.meta.env.BASE_URL
        }gsc-logo.png`}
        alt="Greenwich Skating Club"
      />
    </a>
  );
}

function ExploreMenu() {
  const [openGroups, setOpenGroups] =
    useState(() => new Set());

  const [panelHeights, setPanelHeights] =
    useState({});

  const panelRefs = useRef(new Map());

  /*
   * Measure the panel's natural content height on toggle.
   * scrollHeight is unaffected by the wrapper's own collapsed
   * max-height, so the animation transitions between two known
   * pixel values instead of guessing a large max-height, which
   * avoids the "long pause at the end" artifact.
   */
  const toggleGroup = (title) => {
    const node = panelRefs.current.get(title);

    if (node) {
      setPanelHeights((current) => ({
        ...current,
        [title]: node.scrollHeight,
      }));
    }

    setOpenGroups((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <nav
      className="footer-menu"
      aria-label="Footer navigation"
    >
      <h2>Explore</h2>

      <div className="footer-menu__groups">
        {exploreGroups.map(
          (group) => {
            const isOpen = openGroups.has(
              group.title,
            );

            const measuredHeight =
              panelHeights[group.title];

            return (
              <div
                className="footer-menu__group"
                key={group.title}
              >
                <button
                  type="button"
                  className="footer-menu__group-title"
                  onClick={() =>
                    toggleGroup(group.title)
                  }
                  aria-expanded={isOpen}
                >
                  <span>
                    {group.title}
                  </span>

                  <span
                    className={
                      `footer-menu__group-arrow${
                        isOpen
                          ? " footer-menu__group-arrow--open"
                          : ""
                      }`
                    }
                    aria-hidden="true"
                  >
                    <ArrowIcon />
                  </span>
                </button>

                <div
                  className={
                    `footer-menu__group-panel${
                      isOpen
                        ? " footer-menu__group-panel--open"
                        : ""
                    }`
                  }
                  style={{
                    maxHeight: isOpen
                      ? `${measuredHeight ?? 600}px`
                      : "0px",
                  }}
                >
                  <ul
                    ref={(node) => {
                      if (node) {
                        panelRefs.current.set(
                          group.title,
                          node,
                        );
                      } else {
                        panelRefs.current.delete(
                          group.title,
                        );
                      }
                    }}
                  >
                    {group.links.map(
                      (link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_top"
                          >
                            <span>
                              {link.label}
                            </span>

                            <ArrowIcon />
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            );
          },
        )}
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

        <div className="footer-connect__details">
          <a
            href={`${SITE_BASE_URL}/directions`}
            target="_top"
          >
            <PinIcon />

            <span>
              9 Cardinal Road · Greenwich, CT 06830
            </span>
          </a>
        </div>

        <div className="footer-connect__buttons">
          <a
            className="member-button"
            href={MEMBER_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              Crossbar
            </span>

            <ArrowIcon />
          </a>

          <a
            className="member-button member-button--outline"
            href={MEMBERS_SITE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              Member Billing
            </span>

            <ArrowIcon />
          </a>
        </div>

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

export default SiteFooter;
