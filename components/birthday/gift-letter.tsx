"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { birthday } from "@/lib/birthday";
import { LeafMark } from "./primitives";

export function GiftLetter({
  visible,
  onContinue,
}: {
  visible: boolean;
  onContinue: () => void;
}) {
  const reduced = useReducedMotion();
  const { giftMessage } = birthday;
  const [showButton, setShowButton] = useState(reduced ?? false);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setShowButton(true);
      return;
    }
    const delay = 900 + giftMessage.lines.length * 420 + 700;
    const timer = window.setTimeout(() => setShowButton(true), delay);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, giftMessage.lines.length]);

  if (!visible) return null;

  const fade = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25, delay: 0 } }
      : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <motion.article
      className="gift-letter"
      role="dialog"
      aria-labelledby="gift-letter-title"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.96 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(6px)" }}
      transition={{ duration: reduced ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="gift-letter-texture" aria-hidden="true" />
      <span className="gift-letter-marks" aria-hidden="true" />
      <header className="gift-letter-head">
        <LeafMark />
        <p id="gift-letter-title">A sealed note for {birthday.name}</p>
        <span className="gift-letter-wax" aria-hidden="true">火</span>
      </header>
      <motion.p className="gift-letter-greeting" {...fade(0.15)}>
        {giftMessage.greeting}
      </motion.p>
      <motion.p className="gift-letter-prelude" {...fade(0.45)}>
        {giftMessage.prelude}
      </motion.p>
      {giftMessage.lines.map((line, index) => (
        <motion.p key={line} className="gift-letter-line" {...fade(0.85 + index * 0.42)}>
          {line}
        </motion.p>
      ))}
      <motion.p className="gift-letter-closing" {...fade(0.85 + giftMessage.lines.length * 0.42)}>
        {giftMessage.closing}
      </motion.p>
      <p className="gift-letter-sign">— {birthday.sender}</p>
      {showButton && (
        <motion.div className="gift-letter-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0.2 : 0.6 }}>
          <Button type="button" size="cinematic" className="gift-continue" onClick={onContinue}>
            CONTINUE THE MISSION
            <ArrowRight data-icon="inline-end" />
          </Button>
        </motion.div>
      )}
    </motion.article>
  );
}
