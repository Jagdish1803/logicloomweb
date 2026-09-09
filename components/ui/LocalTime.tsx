"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

/**
 * Live clock in the studio's timezone, shown in the footer.
 *
 * The ticking clock is an external data source, so it is read through
 * `useSyncExternalStore`: the server snapshot renders a stable placeholder
 * (no hydration mismatch) and the client subscribes to a one-second tick.
 */

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

/** Cached so `getSnapshot` returns a referentially stable value between ticks. */
let snapshot = formatter.format(new Date());

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(() => {
    const next = formatter.format(new Date());
    if (next !== snapshot) {
      snapshot = next;
      onStoreChange();
    }
  }, 1000);

  return () => window.clearInterval(id);
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => "--:--:--";

export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  );
}
