import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const GSC_PHONE_NUMBER = "(203) 622-9583";

const CENTER_ICE_LOGO_SRC =
  `${import.meta.env.BASE_URL}gsc-logo.png`;

const SCOREBOARD_IMAGE_SRC =
  `${import.meta.env.BASE_URL}scoreboard.png`;

const GO_BACK_ICON_SRC =
  `${import.meta.env.BASE_URL}go-back.png`;

const RINKCARD_IMAGE_BASE =
  `${import.meta.env.BASE_URL}rinkcards/`;

const RINKCARDS_BACKGROUND_SRC =
  `${import.meta.env.BASE_URL}gsc-background.jpg`;

const NET_IMAGE_SRC =
  `${import.meta.env.BASE_URL}net.png`;

// Matches the crease diameter (radius 5, spanning 10 rink units).
const NET_MOUTH_WIDTH = 10;
// Scaled from NET_MOUTH_WIDTH using net.png's cropped aspect ratio (535x1023).
const NET_DEPTH = 5.23;
// Small standoff so the net's red goal bar sits just behind the crease's
// flat edge instead of flush against it (~2px at typical rink render widths).
const NET_GAP = 0.35;

const RINK_RESIZE_DURATION = 720;

const RINK_RESIZE_EASING =
  "cubic-bezier(0.22, 1, 0.36, 1)";

const navigationLinks = [
  {
    title: "Programs",
    description: "See what’s happening on the ice",
    image: `${RINKCARD_IMAGE_BASE}programs.jpg`,
    position: "65% center",
    layout: "crossbar",
    isProgramsToggle: true,
  },
  {
    title: "Crossbar Login",
    description: "Log in to the GSC Crossbar Portal",
    href: "https://www.greenwichskatingclub.org/login",
    image: `${RINKCARD_IMAGE_BASE}crossbar-login.png`,
    position: "center center",
    layout: "billing",
  },
  {
    title: "Membership",
    description: "Apply to become a member",
    href: `${SITE_BASE_URL}/admissions`,
    image: `${RINKCARD_IMAGE_BASE}membership.jpg`,
    position: "center 100%",
    layout: "membership",
  },
  {
    title: "Member Billing",
    description: "Manage your membership billing",
    href: "https://members.greenwichskatingclub.org/",
    image: `${RINKCARD_IMAGE_BASE}member-billing.jpg`,
    position: "center center",
    layout: "contact",
  },
  {
    title: "Contact Us",
    description: "Get in touch with us",
    href: `${SITE_BASE_URL}/contact`,
    image: `${RINKCARD_IMAGE_BASE}contact.png`,
    position: "35% center",
    layout: "programs",
  },
  {
    title: "Directions",
    description: "How to find us",
    href: `${SITE_BASE_URL}/directions`,
    image: `${RINKCARD_IMAGE_BASE}directions.jpg`,
    position: "center center",
    layout: "directions",
  },
];

const programLinks = [
  {
    title: "Learn to Skate",
    description: "Learn more about Learn to Skate",
    href: `${SITE_BASE_URL}/learn-to-skate`,
    image: `${RINKCARD_IMAGE_BASE}learn-to-skate.jpg`,
    position: "center center",
    layout: "program-item",
  },
  {
    title: "Mini Mites",
    description: "Learn more about Mini Mites",
    href: `${SITE_BASE_URL}/mini-mites`,
    image: `${RINKCARD_IMAGE_BASE}mini-mites.jpg`,
    position: "center center",
    layout: "program-item",
  },
  {
    title: "Youth Travel Hockey",
    description: "Learn more about Youth Travel Hockey",
    href: `${SITE_BASE_URL}/youth-travel-hockey`,
    image: `${RINKCARD_IMAGE_BASE}youth-travel-hockey.jpg`,
    position: "center center",
    layout: "program-item",
  },
  {
    title: "Stateline Girls Hockey",
    description: "Learn more about Stateline Girls Hockey",
    href: `${SITE_BASE_URL}/stateline-girls-hockey`,
    image: `${RINKCARD_IMAGE_BASE}stateline-girls-hockey.jpg`,
    position: "center center",
    layout: "program-item",
  },
  {
    title: "Figure Skating",
    description: "Learn more about Figure Skating",
    href: `${SITE_BASE_URL}/figure-skating`,
    image: `${RINKCARD_IMAGE_BASE}figure-skating.jpg`,
    position: "center center",
    layout: "program-item",
  },
  {
    title: "Adult Hockey",
    description: "Learn more about Adult Hockey",
    href: `${SITE_BASE_URL}/adult-hockey`,
    image: `${RINKCARD_IMAGE_BASE}adult-hockey.jpeg`,
    position: "center center",
    layout: "program-item",
  },
];

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
        label: "Contact Form",
        href: `${SITE_BASE_URL}/contact`,
      },
    ],
  },
];

function CardArrowIcon({
  direction = "right",
}) {
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
      {direction === "left" ? (
        <path d="m13 3-6 7 6 7" />
      ) : (
        <path d="m7 3 6 7-6 7" />
      )}
    </svg>
  );
}

function LandscapeRinkMarkings() {
  return (
    <svg
      className="rinkcards-rink__markings rinkcards-rink__markings--landscape"
      viewBox="0 0 200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="90"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="188"
        y1="0"
        x2="188"
        y2="90"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="70"
        y1="0"
        x2="70"
        y2="90"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="130"
        y1="0"
        x2="130"
        y2="90"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="100"
        y1="0"
        x2="100"
        y2="90"
        className="rinkcards-rink__center-line"
      />

      <circle
        cx="100"
        cy="45"
        r="14"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="48"
        cy="26"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="48"
        cy="64"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="152"
        cy="26"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="152"
        cy="64"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="100"
        cy="45"
        r="1.35"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="48"
        cy="26"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="48"
        cy="64"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="152"
        cy="26"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="152"
        cy="64"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <path
        d="M 12 40 A 5 5 0 0 1 12 50 Z"
        className="rinkcards-rink__crease"
      />

      <path
        d="M 188 40 A 5 5 0 0 0 188 50 Z"
        className="rinkcards-rink__crease"
      />

      <image
        href={NET_IMAGE_SRC}
        x={12 - NET_GAP - NET_DEPTH}
        y={45 - NET_MOUTH_WIDTH / 2}
        width={NET_DEPTH}
        height={NET_MOUTH_WIDTH}
        preserveAspectRatio="xMidYMid meet"
        className="rinkcards-rink__net"
      />

      <g transform={`translate(${188 + NET_GAP + NET_DEPTH}, 0) scale(-1, 1)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={45 - NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

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

function PortraitRinkMarkings() {
  return (
    <svg
      className="rinkcards-rink__markings rinkcards-rink__markings--portrait"
      viewBox="0 0 90 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Goal lines — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="12"
        x2="90"
        y2="12"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="0"
        y1="188"
        x2="90"
        y2="188"
        className="rinkcards-rink__goal-line"
      />

      {/* Blue lines — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="70"
        x2="90"
        y2="70"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="0"
        y1="130"
        x2="90"
        y2="130"
        className="rinkcards-rink__blue-line"
      />

      {/* Center red line — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="100"
        x2="90"
        y2="100"
        className="rinkcards-rink__center-line"
      />

      <circle
        cx="45"
        cy="100"
        r="14"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="26"
        cy="48"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="64"
        cy="48"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="26"
        cy="152"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="64"
        cy="152"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="45"
        cy="100"
        r="1.35"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="26"
        cy="48"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="64"
        cy="48"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="26"
        cy="152"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="64"
        cy="152"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      {/* Top crease */}
      <path
        d="M 40 12 A 5 5 0 0 1 50 12 Z"
        className="rinkcards-rink__crease"
      />

      {/* Bottom crease */}
      <path
        d="M 40 188 A 5 5 0 0 0 50 188 Z"
        className="rinkcards-rink__crease"
      />

      <g transform={`translate(45, ${12 - NET_GAP - NET_DEPTH}) rotate(90)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={-NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

      <g transform={`translate(45, ${188 + NET_GAP + NET_DEPTH}) rotate(-90)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={-NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

      <image
        href={CENTER_ICE_LOGO_SRC}
        x="32"
        y="87"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        transform="rotate(90 45 100)"
        className="rinkcards-rink__logo"
      />
    </svg>
  );
}

function RinkMarkings() {
  return (
    <>
      <LandscapeRinkMarkings />
      <PortraitRinkMarkings />
    </>
  );
}

function RinkCard({
  link,
  onClick,
  animationIndex = 0,
  arrowDirection = "right",
  isPressed,
  shouldAnimate = false,
}) {
  const className =
    `rink-card rink-card--${link.layout}` +
    `${onClick ? " rink-card--button" : ""}` +
    `${isPressed ? " rink-card--toggle-active" : ""}` +
    `${shouldAnimate ? " rink-card--entrance" : ""}`;

  const cardStyle = {
    "--card-index": animationIndex,
  };

  const cardContents = (
    <>
      <span
        className="rink-card__media"
        style={{
          backgroundImage:
            `url("${link.image}")`,
          backgroundPosition:
            link.position,
        }}
        aria-hidden="true"
      />

      <span
        className="rink-card__shade"
        aria-hidden="true"
      />

      <span className="rink-card__content">
        <span className="rink-card__title-row">
          <span className="rink-card__title">
            {link.title}
          </span>

          <span
            className="rink-card__arrow rink-card__arrow--inline"
            aria-hidden="true"
          >
            {isPressed ? (
              <img
                className="rink-card__arrow-icon"
                src={GO_BACK_ICON_SRC}
                alt=""
              />
            ) : (
              <CardArrowIcon
                direction={arrowDirection}
              />
            )}
          </span>
        </span>

        {link.layout !== "program-item" && (
          <span className="rink-card__description">
            {link.description}
          </span>
        )}

        <span
          className="rink-card__rule"
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        style={cardStyle}
        aria-pressed={isPressed}
        aria-label={
          isPressed
            ? "Return to the Rinkside Guide"
            : "Show Greenwich Skating Club programs"
        }
      >
        {cardContents}
      </button>
    );
  }

  return (
    <a
      className={className}
      href={link.href}
      target="_top"
      style={cardStyle}
      aria-label={`${link.title}: ${link.description}`}
    >
      {cardContents}
    </a>
  );
}

function RinkCardsSection() {
  const [showPrograms, setShowPrograms] =
    useState(false);

  const [
    hasEnteredViewport,
    setHasEnteredViewport,
  ] = useState(false);

  const sectionRef = useRef(null);
  const rinkRef = useRef(null);

  const resizeStartHeightRef =
    useRef(null);

  const rinkHeightAnimationRef =
    useRef(null);

  /*
   * The initial card entrance does not begin until
   * the Rinkside Guide actually reaches the viewport.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      hasEnteredViewport
    ) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      setHasEnteredViewport(true);

      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          setHasEnteredViewport(true);
          observer.disconnect();
        },
        {
          threshold: 0.16,
          rootMargin:
            "0px 0px -6% 0px",
        },
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredViewport]);

  /*
   * Before React changes the card layout:
   *
   * 1. Read the EXACT currently rendered rink height.
   * 2. Put that height inline.
   * 3. Cancel any existing rink-height animation.
   * 4. Store the exact starting height for the next layout.
   *
   * Importantly, the current height is captured BEFORE an
   * existing animation is cancelled. That means rapid clicks
   * continue smoothly from the rink's exact visual position
   * instead of snapping back to an old start/end height.
   */
  const handleProgramsToggle = () => {
    const rink = rinkRef.current;

    if (rink) {
      const currentHeight =
        rink.getBoundingClientRect().height;

      /*
       * Disable the CSS height transition while we lock
       * the current rendered height.
       */
      rink.classList.add(
        "rinkcards-rink--measuring",
      );

      rink.style.willChange = "height";
      rink.style.height =
        `${currentHeight}px`;

      /*
       * If a Web Animation is already controlling height,
       * the inline pixel value above is waiting underneath
       * it. Cancelling now reveals the exact same height,
       * so there is no jump.
       */
      if (
        rinkHeightAnimationRef.current
      ) {
        rinkHeightAnimationRef.current.cancel();
        rinkHeightAnimationRef.current =
          null;
      }

      /*
       * Commit the exact current height before React
       * swaps the grid contents.
       */
      void rink.offsetHeight;

      resizeStartHeightRef.current =
        currentHeight;
    }

    setShowPrograms(
      (current) => !current,
    );
  };

  /*
   * This runs synchronously after React has rendered the
   * new card state but BEFORE the browser paints it.
   *
   * We briefly allow the rink to calculate its natural
   * target height while CSS height transitions are disabled.
   * We immediately restore the old pixel height and then use
   * the Web Animations API to animate between the two exact
   * pixel values.
   *
   * This avoids relying on the browser to detect a transition
   * from "auto" to pixels, and it avoids the first-click race
   * that can happen when style changes are batched together.
   */
  useLayoutEffect(() => {
    const rink = rinkRef.current;

    const startHeight =
      resizeStartHeightRef.current;

    if (
      !rink ||
      startHeight === null
    ) {
      return undefined;
    }

    resizeStartHeightRef.current =
      null;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    /*
     * Keep CSS transitions off for the entire measuring /
     * JS animation sequence. The height animation below is
     * controlled explicitly by Element.animate().
     */
    rink.classList.add(
      "rinkcards-rink--measuring",
    );

    rink.style.willChange = "height";

    /*
     * Measure the new card layout at its true natural height.
     *
     * Because useLayoutEffect runs before paint, the user
     * never sees this temporary auto-height state.
     */
    rink.style.height = "auto";

    void rink.offsetHeight;

    const targetHeight =
      rink.getBoundingClientRect().height;

    /*
     * Restore the old visual height before anything is
     * painted to screen.
     */
    rink.style.height =
      `${startHeight}px`;

    void rink.offsetHeight;

    if (
      prefersReducedMotion ||
      Math.abs(
        targetHeight -
          startHeight,
      ) < 0.5
    ) {
      rink.style.height = "auto";

      rink.style.removeProperty(
        "will-change",
      );

      rink.classList.remove(
        "rinkcards-rink--measuring",
      );

      return undefined;
    }

    /*
     * Explicit px → px animation.
     *
     * Unlike the old CSS transition approach, this does not
     * depend on two separate browser style frames being
     * recognized correctly. The browser receives the complete
     * animation in one command.
     */
    const heightAnimation =
      rink.animate(
        [
          {
            height:
              `${startHeight}px`,
          },
          {
            height:
              `${targetHeight}px`,
          },
        ],
        {
          duration:
            RINK_RESIZE_DURATION,
          easing:
            RINK_RESIZE_EASING,
          fill: "forwards",
        },
      );

    rinkHeightAnimationRef.current =
      heightAnimation;

    const finishResize = () => {
      /*
       * Ignore an old animation if it was replaced by a
       * newer Programs / Go Back interaction.
       */
      if (
        rinkHeightAnimationRef.current !==
        heightAnimation
      ) {
        return;
      }

      /*
       * First establish the final pixel height underneath the
       * Web Animation. Then cancel the finished animation.
       */
      rink.style.height =
        `${targetHeight}px`;

      heightAnimation.cancel();

      rinkHeightAnimationRef.current =
        null;

      /*
       * With the measuring class still applied, release the
       * rink back to natural responsive height. Because the
       * computed height is already the same target size, this
       * produces no visible jump.
       */
      rink.style.height = "auto";

      rink.style.removeProperty(
        "will-change",
      );

      rink.classList.remove(
        "rinkcards-rink--measuring",
      );
    };

    heightAnimation.addEventListener(
      "finish",
      finishResize,
      {
        once: true,
      },
    );

    return () => {
      heightAnimation.removeEventListener(
        "finish",
        finishResize,
      );

      /*
       * Normally a new click will already have frozen the
       * current rendered height and cancelled the animation
       * inside handleProgramsToggle().
       *
       * This branch mainly protects component teardown or
       * an unexpected state change.
       */
      if (
        rinkHeightAnimationRef.current ===
        heightAnimation
      ) {
        heightAnimation.cancel();

        rinkHeightAnimationRef.current =
          null;
      }
    };
  }, [showPrograms]);

  /*
   * Final cleanup if this section ever unmounts while a
   * height animation is still active.
   */
  useEffect(() => {
    return () => {
      if (
        rinkHeightAnimationRef.current
      ) {
        rinkHeightAnimationRef.current.cancel();

        rinkHeightAnimationRef.current =
          null;
      }
    };
  }, []);

  const programsToggleCard =
    showPrograms
      ? {
          ...navigationLinks[0],
          title: "Go Back",
          description:
            "Return to Rinkside Guide",
        }
      : navigationLinks[0];

  const surroundingLinks =
    showPrograms
      ? programLinks
      : navigationLinks.slice(1);

  return (
    <section
      ref={sectionRef}
      className="rinkcards-section"
      aria-labelledby="rinkcards-section-title"
      style={{
        backgroundImage:
          `radial-gradient(
            ellipse at 50% -18%,
            rgba(87, 135, 205, 0.28) 0%,
            rgba(35, 77, 135, 0.12) 38%,
            transparent 66%
          ),
          linear-gradient(
            180deg,
            rgba(10, 32, 63, 0.8) 0%,
            rgba(7, 27, 53, 0.78) 47%,
            rgba(11, 39, 74, 0.8) 100%
          ),
          url("${RINKCARDS_BACKGROUND_SRC}")`,
      }}
    >
      <div
        className="rinkcards-section__ambient"
        aria-hidden="true"
      />

      <div className="rinkcards-section__inner">
        <header className="rinkcards-heading">
          <h1 id="rinkcards-section-title">
            Rinkside Guide
          </h1>

          <span aria-hidden="true" />
        </header>

        <div className="rinkcards-rink-wrap">
          <img
            className="rinkcards-scoreboard"
            src={SCOREBOARD_IMAGE_SRC}
            alt=""
            aria-hidden="true"
          />

          <div
            ref={rinkRef}
            className="rinkcards-rink"
          >
            <RinkMarkings />

            <nav
              className={
                `rinkcards-grid ${
                  showPrograms
                    ? "rinkcards-grid--programs"
                    : "rinkcards-grid--guide"
                }`
              }
              aria-label={
                showPrograms
                  ? "Greenwich Skating Club programs"
                  : "Greenwich Skating Club pages"
              }
            >
              <RinkCard
                link={programsToggleCard}
                onClick={
                  handleProgramsToggle
                }
                animationIndex={0}
                arrowDirection={
                  showPrograms
                    ? "left"
                    : "right"
                }
                isPressed={showPrograms}
                shouldAnimate={
                  hasEnteredViewport &&
                  !showPrograms
                }
              />

              {surroundingLinks.map(
                (link, index) => (
                  <RinkCard
                    key={
                      `${
                        showPrograms
                          ? "program"
                          : "guide"
                      }-${link.title}`
                    }
                    link={link}
                    animationIndex={
                      index + 1
                    }
                    shouldAnimate={
                      showPrograms ||
                      hasEnteredViewport
                    }
                  />
                ),
              )}
            </nav>

            <span
              className="sr-only"
              aria-live="polite"
            >
              {showPrograms
                ? "Program cards are now displayed."
                : "Rinkside Guide cards are now displayed."}
            </span>
          </div>
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
      <path d="m9 5 7 7-7 7" />
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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.6 21.1 2.9 13.4 2.9 3.7c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
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
  const [openGroups, setOpenGroups] =
    useState(() => new Set());

  const toggleGroup = (title) => {
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
                >
                  <ul>
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

          <a
            href={`tel:${GSC_PHONE_NUMBER.replace(
              /[^\d+]/g,
              "",
            )}`}
          >
            <PhoneIcon />

            <span>
              Phone: {GSC_PHONE_NUMBER}
            </span>
          </a>
        </div>

        <a
          className="member-button"
          href={MEMBER_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            Member Login
          </span>

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
    const handlePageShow = (
      event,
    ) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener(
      "pageshow",
      handlePageShow,
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow,
      );
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