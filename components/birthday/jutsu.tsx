"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Flame, Leaf, Wind, Zap, Plus } from "lucide-react";
import { jutsu } from "@/lib/birthday";
import { Reveal, SectionHeading } from "./primitives";

const icons = [Leaf, Flame, Zap, Wind];
export function JutsuCollection({ playChime }: { playChime: () => void }) {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const reduced = useReducedMotion();
  return <section id="jutsu" className="jutsu-section section-space"><div className="page-width"><SectionHeading number="04" eyebrow="SOME ABILITIES CAN’T BE TAUGHT" title="Signature" emphasis="jutsu." description="No secret training. No ancient scrolls. Just you, being you." centered /><div className="jutsu-grid">{jutsu.map((item, i) => { const Icon = icons[i]; const isUnlocked = unlocked.includes(i); return <Reveal key={item.name} delay={i * 0.07}><button className={`jutsu-card jutsu-${i} ${isUnlocked ? "is-unlocked" : ""}`} aria-pressed={isUnlocked} onClick={() => { setUnlocked(current => isUnlocked ? current.filter(id => id !== i) : [...current, i]); if (!isUnlocked) playChime(); }}><div className="jutsu-top"><span className="jutsu-icon"><Icon /></span><span className="jutsu-number">0{i + 1}</span></div><span className="jutsu-type">{item.type}</span><h3>{item.name}</h3><p>{isUnlocked ? item.unlocked : item.description}</p><span className="jutsu-action">{isUnlocked ? "TECHNIQUE UNLOCKED" : "TAP TO ACTIVATE"}{isUnlocked ? <Check size={14} /> : <Plus size={14} />}</span><AnimatePresence>{isUnlocked && !reduced && <motion.span key="burst" className="jutsu-burst" initial={{ scale: 0, opacity: 0.55 }} animate={{ scale: 5, opacity: 0 }} transition={{ duration: 0.8 }} />}</AnimatePresence></button></Reveal>; })}</div></div></section>;
}
