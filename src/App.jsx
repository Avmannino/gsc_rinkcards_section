import {
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import SiteFooter from "./Footer";

const SITE_BASE_URL =
  "https://www.greenwichskatingclub.com";

const CENTER_ICE_LOGO_SRC =
  `${import.meta.env.BASE_URL}gsc-logo.png`;

const SCOREBOARD_IMAGE_SRC =
  `${import.meta.env.BASE_URL}scoreboard.png`;

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

const PROGRAMS_HEADER_CARD = {
  title: "Around the Rink",
  description: "Explore our programs at the skating club",
  image: `${RINKCARD_IMAGE_BASE}programs.jpg`,
  position: "65% center",
  layout: "crossbar",
};

const programLinks = [
  {
    title: "Learn to Skate",
    description: "Learn more about Learn to Skate",
    href: `${SITE_BASE_URL}/learn-to-skate`,
    image: `${RINKCARD_IMAGE_BASE}learn-to-skate.jpg`,
    position: "center center",
    layout: "program-item",
    compactTitle: true,
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
    compactTitle: true,
    wideArrowGap: true,
  },
  {
    title: "Stateline Girls Hockey",
    description: "Learn more about Stateline Girls Hockey",
    href: `${SITE_BASE_URL}/stateline-girls-hockey`,
    image: `${RINKCARD_IMAGE_BASE}stateline-girls-hockey.jpg`,
    position: "center center",
    layout: "program-item",
    compactTitle: true,
    wideArrowGap: true,
  },
  {
    title: "Figure Skating",
    description: "Learn more about Figure Skating",
    href: `${SITE_BASE_URL}/figure-skating`,
    image: `${RINKCARD_IMAGE_BASE}figure-skating.jpg`,
    position: "center center",
    layout: "program-item",
    compactTitle: true,
    tightTitleGap: true,
  },
  {
    title: "Adult Hockey",
    description: "Learn more about Adult Hockey",
    href: `${SITE_BASE_URL}/adult-hockey`,
    image: `${RINKCARD_IMAGE_BASE}adult-hockey.jpg`,
    position: "center center",
    layout: "program-item",
    compactTitle: true,
    tightTitleGap: true,
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
        x1="75"
        y1="0"
        x2="75"
        y2="90"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="125"
        y1="0"
        x2="125"
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

// Corner faceoff circle centers (landscape), as % of the rink container —
// positioned to match the final rink layout used across the GSC projects.
const FACEOFF_CIRCLE_CENTERS = [
  { left: 15.5, top: 20.56 },
  { left: 15.5, top: 79.44 },
  { left: 84.5, top: 20.56 },
  { left: 84.5, top: 79.44 },
];

// The four small L brackets around each end-zone faceoff dot.
// These sit inside the faceoff circle and do not affect the circle itself.
const FACEOFF_L_OFFSET_CQW = 1.55;

// Curling house dimensions are based on the rink container width so the
// rings remain true circles on the landscape rink. The center offset leaves
// a small visible gap between each hockey faceoff circle and curling house.
const CURLING_HOUSE_SIZE_CQW = 5.6;
const CURLING_HOUSE_CENTER_OFFSET_CQW = 9.4;

function FaceoffLBrackets() {
  const corners = [
    { x: -1, y: -1, className: "top-left" },
    { x: 1, y: -1, className: "top-right" },
    { x: -1, y: 1, className: "bottom-left" },
    { x: 1, y: 1, className: "bottom-right" },
  ];

  return FACEOFF_CIRCLE_CENTERS.flatMap(({ left, top }, circleIndex) =>
    corners.map(({ x, y, className }) => (
      <span
        key={`${circleIndex}-${className}`}
        className={`rinkcards-rink__faceoff-l rinkcards-rink__faceoff-l--${className}`}
        style={{
          left: `calc(${left}% + ${x * FACEOFF_L_OFFSET_CQW}cqw)`,
          top: `calc(${top}% + ${y * FACEOFF_L_OFFSET_CQW}cqw)`,
        }}
      />
    )),
  );
}

function CurlingHouse({ left, top }) {
  return (
    <span
      className="rinkcards-rink__curling-house"
      style={{
        left,
        top,
        width: `${CURLING_HOUSE_SIZE_CQW}cqw`,
      }}
    >
      <span className="rinkcards-rink__curling-house-ring rinkcards-rink__curling-house-ring--middle" />
      <span className="rinkcards-rink__curling-house-ring rinkcards-rink__curling-house-ring--inner" />
      <span className="rinkcards-rink__curling-house-button" />
    </span>
  );
}

function LandscapeRinkCircles() {
  return (
    <div
      className="rinkcards-rink__circles"
      aria-hidden="true"
    >
      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "50%", top: "50%", width: "14%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "15.5%", top: "20.56%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "15.5%", top: "79.44%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "84.5%", top: "20.56%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "84.5%", top: "79.44%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "50%", top: "50%", width: "1.35%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "15.5%", top: "20.56%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "15.5%", top: "79.44%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "84.5%", top: "20.56%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "84.5%", top: "79.44%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "40%", top: "20.56%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "40%", top: "79.44%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "60%", top: "20.56%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "60%", top: "79.44%", width: "1.3%" }}
      />

      <FaceoffLBrackets />

      <CurlingHouse
        left={`calc(15.5% + ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="20.56%"
      />
      <CurlingHouse
        left={`calc(15.5% + ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="79.44%"
      />
      <CurlingHouse
        left={`calc(84.5% - ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="20.56%"
      />
      <CurlingHouse
        left={`calc(84.5% - ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="79.44%"
      />
    </div>
  );
}

const PORTRAIT_FACEOFF_CENTERS = [
  { x: 21, y: 43 },
  { x: 69, y: 43 },
  { x: 21, y: 157 },
  { x: 69, y: 157 },
];

function PortraitFaceoffLBrackets() {
  return PORTRAIT_FACEOFF_CENTERS.map(({ x, y }) => (
    <g key={`portrait-l-${x}-${y}`}>
      {/* Top-left: corner sits nearest the dot; both arms extend outward. */}
      <path
        d={`M ${x - 3.0} ${y - 1.15} H ${x - 1.15} V ${y - 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Top-right */}
      <path
        d={`M ${x + 1.15} ${y - 3.0} V ${y - 1.15} H ${x + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Bottom-left */}
      <path
        d={`M ${x - 3.0} ${y + 1.15} H ${x - 1.15} V ${y + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Bottom-right */}
      <path
        d={`M ${x + 1.15} ${y + 3.0} V ${y + 1.15} H ${x + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />
    </g>
  ));
}

function PortraitCurlingHouses() {
  return PORTRAIT_FACEOFF_CENTERS.map(({ x, y }) => {
    const direction = y < 100 ? 1 : -1;
    const houseY = y + direction * 18.2;

    return (
      <g
        key={`portrait-house-${x}-${y}`}
        className="rinkcards-rink__curling-house-svg"
      >
        <circle
          cx={x}
          cy={houseY}
          r="5.4"
          className="rinkcards-rink__curling-house-svg-outer"
        />
        <circle
          cx={x}
          cy={houseY}
          r="3.55"
          className="rinkcards-rink__curling-house-svg-middle"
        />
        <circle
          cx={x}
          cy={houseY}
          r="1.75"
          className="rinkcards-rink__curling-house-svg-inner"
        />
        <circle
          cx={x}
          cy={houseY}
          r="0.48"
          className="rinkcards-rink__curling-house-svg-button"
        />
      </g>
    );
  });
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
        cx="21"
        cy="43"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="69"
        cy="43"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="21"
        cy="157"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="69"
        cy="157"
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
        cx="21"
        cy="43"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="69"
        cy="43"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="21"
        cy="157"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="69"
        cy="157"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      {/* Neutral-zone faceoff dots — no L brackets around these. */}
      <circle
        cx="18.5"
        cy="80"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="71.5"
        cy="80"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="18.5"
        cy="120"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="71.5"
        cy="120"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <PortraitFaceoffLBrackets />
      <PortraitCurlingHouses />

      {/* Top crease */}
      <path
        d="M 40 12 A 5 5 0 0 0 50 12 Z"
        className="rinkcards-rink__crease"
      />

      {/* Bottom crease */}
      <path
        d="M 40 188 A 5 5 0 0 1 50 188 Z"
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
      <LandscapeRinkCircles />
      <PortraitRinkMarkings />
    </>
  );
}

function RinkCard({
  link,
  animationIndex = 0,
  shouldAnimate = false,
}) {
  const className =
    `rink-card rink-card--${link.layout}` +
    `${shouldAnimate ? " rink-card--entrance" : ""}` +
    `${link.compactTitle ? " rink-card--compact-title" : ""}` +
    `${link.wideArrowGap ? " rink-card--wide-arrow-gap" : ""}` +
    `${link.tightTitleGap ? " rink-card--tight-title-gap" : ""}`;

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

          {link.href && (
            <span
              className="rink-card__arrow rink-card__arrow--inline"
              aria-hidden="true"
            >
              <CardArrowIcon />
            </span>
          )}
        </span>

        {link.layout !== "program-item" && (
          <>
            <span
              className="rink-card__title-divider"
              aria-hidden="true"
            />

            <span className="rink-card__description">
              {link.description}
            </span>
          </>
        )}

        <span
          className="rink-card__rule"
          aria-hidden="true"
        />
      </span>

      {link.layout === "program-item" && (
        <span
          className="rink-card__arrow rink-card__arrow--corner"
          aria-hidden="true"
        >
          <CardArrowIcon />
        </span>
      )}
    </>
  );

  if (!link.href) {
    return (
      <div
        className={className}
        style={cardStyle}
      >
        {cardContents}
      </div>
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
  const [
    hasEnteredViewport,
    setHasEnteredViewport,
  ] = useState(false);

  const sectionRef = useRef(null);

  /*
   * The initial card entrance does not begin until
   * the section actually reaches the viewport.
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

  return (
    <section
      ref={sectionRef}
      className="rinkcards-section"
      aria-label="Around the Rink"
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
        className="rinkcards-section__accent"
        aria-hidden="true"
      >
        <span />
        <span />
      </div>

      <div
        className="rinkcards-section__ambient"
        aria-hidden="true"
      />

      <div className="rinkcards-section__inner">
        <div className="rinkcards-rink-wrap">
          <img
            className="rinkcards-scoreboard"
            src={SCOREBOARD_IMAGE_SRC}
            alt=""
            aria-hidden="true"
          />

          <div className="rinkcards-rink">
            <RinkMarkings />

            <nav
              className="rinkcards-grid rinkcards-grid--programs"
              aria-label="Greenwich Skating Club programs"
            >
              <RinkCard
                link={PROGRAMS_HEADER_CARD}
                animationIndex={0}
                shouldAnimate={hasEnteredViewport}
              />

              {programLinks.map(
                (link, index) => (
                  <RinkCard
                    key={link.title}
                    link={link}
                    animationIndex={
                      index + 1
                    }
                    shouldAnimate={hasEnteredViewport}
                  />
                ),
              )}
            </nav>
          </div>
        </div>
      </div>
    </section>
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