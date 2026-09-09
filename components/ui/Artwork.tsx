/**
 * Card artwork.
 *
 * Every card, cover, pill and portrait renders a real royalty-free photograph
 * (Lorem Picsum / Unsplash-licensed, downloaded to `/public/images`), wrapped
 * in a shared <Photo> frame. The frame adds a soft bottom scrim so overlaid
 * badges stay legible and a faint grain so the photos sit cohesively against
 * the brand's dark surfaces.
 *
 * Component APIs are unchanged — callers pass the same props as before, so the
 * whole site swaps from vector placeholders to photography with no page edits.
 */

import Image from "next/image";

type ArtProps = { className?: string };

/* ------------------------------------------------------------------ */
/*  Shared frame                                                       */
/* ------------------------------------------------------------------ */

function Grain({ opacity = 0.14 }: { opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{
        opacity,
        backgroundImage: "url(/textures/grain.svg)",
        backgroundSize: "160px 160px",
      }}
    />
  );
}

function Photo({
  src,
  alt = "",
  sizes = "100vw",
  priority = false,
  scrim = true,
}: {
  src: string;
  /** Empty string marks the image decorative (hidden from assistive tech). */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  scrim?: boolean;
}) {
  const decorative = alt === "";

  return (
    <div
      className="relative size-full overflow-hidden bg-night"
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {scrim ? (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-night/10 to-transparent" />
      ) : null}
      <Grain />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project artwork                                                    */
/* ------------------------------------------------------------------ */

const projectImages = {
  archin: "/images/work-archin.jpg",
  vntnr: "/images/work-vntnr.jpg",
  aeorim: "/images/work-aeorim.jpg",
} as const;

export function ProjectArt({
  variant,
  className = "",
}: {
  variant: keyof typeof projectImages;
  className?: string;
}) {
  return (
    <div className={className}>
      <Photo
        src={projectImages[variant]}
        sizes="(max-width: 810px) 100vw, 60vw"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Service artwork                                                    */
/* ------------------------------------------------------------------ */

const serviceImages = {
  web: "/images/service-web.jpg",
  fix: "/images/service-fix.jpg",
  seo: "/images/service-seo.jpg",
  cms: "/images/service-cms.jpg",
} as const;

export function ServiceArt({
  variant,
  className = "",
}: {
  variant: keyof typeof serviceImages;
  className?: string;
}) {
  return (
    <div className={className}>
      <Photo
        src={serviceImages[variant]}
        sizes="(max-width: 810px) 100vw, 50vw"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Editorial / blog artwork                                           */
/* ------------------------------------------------------------------ */

/** Blog cover — six photos cycled deterministically by seed. */
export function EditorialArt({
  seed,
  className = "",
}: {
  seed: number;
  className?: string;
}) {
  const src = `/images/blog-${seed % 6}.jpg`;

  return (
    <div className={className}>
      <Photo src={src} sizes="(max-width: 810px) 100vw, 33vw" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portrait (founder)                                                 */
/* ------------------------------------------------------------------ */

export function PortraitArt({ className = "" }: ArtProps) {
  return (
    <div className={className}>
      <Photo
        src="/images/founder.jpg"
        sizes="(max-width: 810px) 100vw, 40vw"
        scrim={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero inline media (the pills embedded in the headline)             */
/* ------------------------------------------------------------------ */

export function HeroPill({
  seed,
  className = "",
}: {
  seed: number;
  className?: string;
}) {
  const src = `/images/pill-${(seed % 3) + 1}.jpg`;

  return (
    <span
      aria-hidden="true"
      className={`relative inline-block overflow-hidden rounded-[999px] align-middle shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${className}`}
    >
      <Image src={src} alt="" fill sizes="120px" className="object-cover" />
    </span>
  );
}
