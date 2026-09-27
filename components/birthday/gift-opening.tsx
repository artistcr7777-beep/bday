"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { birthday } from "@/lib/birthday";
import { Atmosphere, LeafMark } from "./primitives";
import { Envelope } from "./envelope";
import { GiftLetter } from "./gift-letter";
import { useAmbientAudio } from "./use-ambient-audio";

type GiftStage = "cta" | "envelope" | "opening" | "letter" | "departing";

export function GiftOpening({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const { enabled, toggle, playCue } = useAmbientAudio();
  const [stage, setStage] = useState<GiftStage>("cta");
  const [pressed, setPressed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      timers.current.forEach(id => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (stage !== "envelope") return;
    document.querySelector<HTMLButtonElement>(".gift-envelope")?.focus();
  }, [stage]);

  function later(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, reduced ? Math.min(ms, 180) : ms);
    timers.current.push(id);
  }

  function showGift() {
    if (stage !== "cta") return;
    setPressed(true);
    playCue("gift");
    later(() => setStage("envelope"), reduced ? 160 : 720);
    later(() => playCue("envelope"), reduced ? 160 : 780);
  }

  function openEnvelope() {
    if (stage !== "envelope") return;
    playCue("seal");
    setStage("opening");
    later(() => playCue("letter"), reduced ? 120 : 900);
    later(() => setStage("letter"), reduced ? 200 : 1600);
  }

  function continueMission() {
    if (stage !== "letter") return;
    playCue("continue");
    setStage("departing");
    later(onComplete, reduced ? 280 : 2100);
  }

  const denseParticles = stage === "opening" || stage === "letter" || stage === "departing";

  return (
    <MotionConfig reducedMotion="user">
    <section
      className="gift-opening"
      data-stage={stage}
      data-pressed={pressed ? "true" : "false"}
      aria-label="Birthday gift opening"
    >
      <div className="gift-opening-veil" aria-hidden="true" />
      <Atmosphere dense={denseParticles} />
      <button
        type="button"
        className="gift-sound"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      >
        {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>SOUND {enabled ? "ON" : "OFF"}</span>
      </button>

      <AnimatePresence mode="wait">
        {stage === "cta" && (
          <motion.div
            key="cta"
            className="gift-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: reduced ? 0.25 : 0.7 }}
          >
            <LeafMark className="gift-cta-mark" />
            <p className="gift-kicker">A SEALED BIRTHDAY MISSION</p>
            <h1>Something arrived<br /><em>for {birthday.name}.</em></h1>
            <p className="gift-cta-copy">A handwritten message. Open it when you’re ready.</p>
            <Button type="button" size="cinematic" className="gift-show-button" onClick={showGift} aria-label="Show your gift">
              SHOW YOUR GIFT
            </Button>
          </motion.div>
        )}

        {(stage === "envelope" || stage === "opening") && (
          <motion.div
            key="mail"
            className="gift-mail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.55 }}
          >
            <Envelope stage={stage} onOpen={openEnvelope} />
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            className="gift-letter-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0.25 : 0.7 }}
          >
            <GiftLetter visible onContinue={continueMission} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "departing" && (
          <motion.div
            className="gift-departure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          >
            <motion.div
              className="gift-departure-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.2 : 0.45 }}
            />
            {!reduced && (
              <>
                {Array.from({ length: 10 }, (_, i) => (
                  <motion.span
                    key={i}
                    className="gift-gather"
                    initial={{ opacity: 0.7, x: (i - 5) * 42, y: ((i % 4) - 1.5) * 70, scale: 1 }}
                    animate={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                    transition={{ duration: 0.85, delay: i * 0.03 }}
                  />
                ))}
                <motion.span
                  className="gift-seal-burst"
                  initial={{ scale: 0.15, opacity: 0.85 }}
                  animate={{ scale: 22, opacity: 0 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                />
                {[0, 1, 2, 3].map(i => (
                  <motion.span
                    key={`leaf-${i}`}
                    className="gift-cross-leaf"
                    initial={{ x: -180, y: 40 + i * 36, rotate: -20, opacity: 0 }}
                    animate={{ x: 220, y: -30 + i * 18, rotate: 130, opacity: [0, 0.75, 0] }}
                    transition={{ duration: 1.1, delay: 0.45 + i * 0.08 }}
                  >
                    <LeafMark />
                  </motion.span>
                ))}
                <motion.div
                  className="gift-flash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.55, 0] }}
                  transition={{ duration: 0.7, delay: 1.15 }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </MotionConfig>
  );
}
