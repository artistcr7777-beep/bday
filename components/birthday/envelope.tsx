"use client";

import { motion, useReducedMotion } from "motion/react";
import { birthday } from "@/lib/birthday";

export function Envelope({
  stage,
  onOpen,
}: {
  stage: "envelope" | "opening" | "letter";
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const opened = stage === "opening" || stage === "letter";
  const letterPeek = opened;
  const interactive = stage === "envelope";

  return (
    <div className={`gift-envelope-scene ${opened ? "is-open" : ""} ${stage === "letter" ? "is-letter" : ""}`}>
      <p className="gift-kicker">A MESSAGE HAS ARRIVED</p>
      <p className="gift-for">FOR {birthday.name.toUpperCase()}</p>

      <motion.div
        className="gift-envelope-wrap"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: -8 }}
        transition={{ duration: reduced ? 0.35 : 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="gift-envelope-shadow" aria-hidden="true" />
        <button
          type="button"
          className="gift-envelope"
          onClick={interactive ? onOpen : undefined}
          disabled={!interactive}
          aria-label="Open the message"
          aria-expanded={opened}
        >
          <span className="gift-envelope-pocket" aria-hidden="true">
            <span className={`gift-letter-peek ${letterPeek ? "is-visible" : ""}`}>
              <span className="gift-letter-peek-lines" />
            </span>
          </span>
          <span className={`gift-envelope-flap ${opened ? "is-open" : ""}`} aria-hidden="true">
            <span className="gift-flap-inner" />
          </span>
          <span className={`gift-wax-seal ${opened ? "is-cracked" : ""}`} aria-hidden="true">
            <span className="gift-wax-mark">火</span>
          </span>
        </button>
      </motion.div>

      {interactive && <p className="gift-open-hint">OPEN THE MESSAGE</p>}
    </div>
  );
}
