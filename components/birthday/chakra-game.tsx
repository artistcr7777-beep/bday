"use client";

import { useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, Check, LockKeyhole, Sparkles, Wind } from "lucide-react";
import { birthday } from "@/lib/birthday";
import { Atmosphere, LeafMark, Reveal, SectionHeading } from "./primitives";

const initialOrbs = [
  { id: 0, x: 12, y: 26, kind: "wind" }, { id: 1, x: 35, y: 17, kind: "fire" },
  { id: 2, x: 58, y: 29, kind: "wind" }, { id: 3, x: 85, y: 20, kind: "lightning" },
  { id: 4, x: 19, y: 57, kind: "fire" }, { id: 5, x: 46, y: 52, kind: "lightning" },
  { id: 6, x: 77, y: 49, kind: "wind" }, { id: 7, x: 10, y: 83, kind: "wind" },
  { id: 8, x: 43, y: 81, kind: "fire" }, { id: 9, x: 81, y: 82, kind: "lightning" },
];

export function ChakraGame({ playChime, onComplete }: { playChime: () => void; onComplete: () => void }) {
  const [collected, setCollected] = useState<number[]>([]);
  const [orbs, setOrbs] = useState(initialOrbs);
  const collectedRef = useRef(new Set<number>());
  const reduced = useReducedMotion();
  const progress = collected.length * 10;
  const complete = progress === 100;

  function collect(id: number, fromKeyboard: boolean) {
    if (collectedRef.current.has(id)) return;
    collectedRef.current.add(id);
    const ids = [...collectedRef.current];
    setCollected(ids);
    playChime();
    setOrbs(current => current.map(orb => ids.includes(orb.id) ? orb : { ...orb, x: Math.max(9, Math.min(89, orb.x + (Math.random() - 0.5) * 8)), y: Math.max(15, Math.min(83, orb.y + (Math.random() - 0.5) * 6)) }));
    if (ids.length === 10) {
      onComplete();
      if (!reduced) void import("canvas-confetti").then(({ default: confetti }) => {
        confetti({ particleCount: 85, spread: 100, origin: { y: 0.65 }, colors: ["#eb955c", "#a8b388", "#ead6ae", "#f5eee3"], disableForReducedMotion: true, ticks: 180, gravity: 0.8 });
      });
    }
    if (fromKeyboard) requestAnimationFrame(() => {
      const next = document.querySelector<HTMLButtonElement>(".chakra-orb:not([data-collected])");
      if (next) next.focus();
      else document.querySelector<HTMLAnchorElement>(".read-scroll-link")?.focus();
    });
  }

  return <section id="mission" className="game-section section-space page-width"><div className="game-grid"><Reveal className="game-copy"><SectionHeading number="05" eyebrow="A LITTLE MISSION, JUST FOR YOU" title="Gather a little chakra." emphasis="Unlock something good." /><p>There&apos;s one last message in this scroll. Collect the glowing orbs to break the seal. Consider it the easiest S-rank mission of your life.</p><div className="chakra-progress-label"><span><Wind size={14} /> CHAKRA COLLECTED</span><strong aria-live="polite">{progress}<small> / 100</small></strong></div><div className="chakra-progress" role="progressbar" aria-label="Chakra collected" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div><p className="game-hint">{complete ? <><Check size={13} /> Seal broken. Your scroll is ready.</> : <><Sparkles size={13} /> Tap the orbs. Each one is worth 10 chakra.</>}</p></Reveal><Reveal className={`chakra-arena ${complete ? "complete" : ""}`}><Atmosphere /><span className="arena-label">TRAINING GROUND NO. 07</span><div className="arena-seal" aria-hidden="true"><LeafMark /></div><AnimatePresence>{!complete && orbs.filter(orb => !collected.includes(orb.id)).map(orb => <motion.button key={orb.id} className={`chakra-orb orb-${orb.kind}`} style={{ left: `${orb.x}%`, top: `${orb.y}%`, "--orb-delay": `${orb.id * -0.7}s` } as CSSProperties} initial={false} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : 2.2 }} transition={{ duration: 0.25 }} onClick={event => { event.currentTarget.dataset.collected = "true"; event.currentTarget.disabled = true; collect(orb.id, event.detail === 0); }} aria-label={`Collect ${orb.kind} chakra orb ${orb.id + 1}`}><span /></motion.button>)}</AnimatePresence><AnimatePresence>{complete && <motion.div className="game-victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="victory-icon"><LeafMark /></span><span className="eyebrow">SECRET TECHNIQUE UNLOCKED</span><h3>Some words,<br /><em>just for you.</em></h3><a href="#last-scroll" className="read-scroll-link">Open your scroll <ArrowDown size={15} /></a></motion.div>}</AnimatePresence><span className="arena-bottom">{complete ? "MISSION COMPLETE" : "NO TIMER. NO PRESSURE. JUST GOOD ENERGY."}</span>{complete && !reduced && <span className="chakra-flash" />}</Reveal></div><AnimatePresence>{complete ? <motion.article id="last-scroll" className="birthday-letter" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}><div className="letter-heading"><LeafMark /><span>FOR {birthday.name.toUpperCase()} · FROM THE HEART</span><span>S-RANK</span></div><h2>One last <em>scroll…</em></h2><p className="letter-greeting">Hey, {birthday.name}.</p>{birthday.letter.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<p className="letter-birthday">Happy Birthday, {birthday.name}.</p><p className="letter-signature">— {birthday.sender}</p><span className="letter-stamp"><LeafMark /><small>GRATEFUL, ALWAYS.</small></span></motion.article> : <Reveal className="locked-scroll"><LockKeyhole size={19} /><div><span>ONE LAST SCROLL</span><p>A few things I probably don&apos;t say enough.</p></div><span className="locked-label">SEALED UNTIL 100 CHAKRA</span></Reveal>}</AnimatePresence></section>;
}
