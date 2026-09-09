/**
 * Avatars.
 *
 * Real portrait photos (downloaded to `/public/images/avatar-*.jpg`), cycled
 * deterministically by seed so the same person always appears in the same
 * slot. The `initials` prop is kept for API compatibility and used as the
 * image alt text where an author is named.
 */

import Image from "next/image";

const AVATAR_COUNT = 5;

export function Avatar({
  seed,
  initials,
  size = 32,
  className = "",
}: {
  seed: number;
  initials?: string;
  size?: number;
  className?: string;
}) {
  const src = `/images/avatar-${((seed % AVATAR_COUNT) + AVATAR_COUNT) % AVATAR_COUNT}.jpg`;
  const decorative = !initials;

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-night ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt={initials ? `Portrait of ${initials}` : ""}
        width={size}
        height={size}
        className="size-full object-cover"
      />
    </span>
  );
}

/** Overlapping row of avatars used in the hero's social-proof cluster. */
export function AvatarStack({ count = 5 }: { count?: number }) {
  return (
    <div className="flex -space-x-2.5">
      {Array.from({ length: count }).map((_, index) => (
        <Avatar
          key={index}
          seed={index}
          size={32}
          className="ring-2 ring-canvas"
        />
      ))}
    </div>
  );
}
