"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Check, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { birthday, type DiscoverEgg } from "@/lib/birthday";
import { Atmosphere, LeafMark } from "./primitives";

export function Hero({ accepted, onAccept, discover }: { accepted: boolean; onAccept: () => void; discover: DiscoverEgg }) {
  const [sealOpen, setSealOpen] = useState(false);
  const reduced = useReducedMotion();
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <Image src="/images/hidden-leaf-sunset.webp" alt="A Hidden Leaf-inspired village beneath a golden sunset" fill priority sizes="100vw" className="hero-art" />
    <div className="hero-shade" />
    <Atmosphere dense />
    <div className="hero-inner page-width">
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
        <div className="mission-label"><span className="live-dot" />{accepted ? "MISSION ACCEPTED · YOUR NEXT ARC BEGINS" : "AN S-RANK MISSION. AN EXTRAORDINARY HUMAN."}</div>
        <h1 id="hero-title">Happy Birthday,<br /><em>{birthday.name}.</em><Sparkles className="hero-star" aria-hidden="true" /></h1>
        <p className="hero-subtitle">{birthday.subtitle}</p>
        <p className="hero-note">A little chaos. A lot of gratitude. This one&apos;s for you.</p>
        <div className="hero-actions"><Button size="cinematic" onClick={onAccept}>{accepted ? "Explore your story" : "Accept mission"}{accepted ? <ArrowDown data-icon="inline-end" /> : <ArrowRight data-icon="inline-end" />}</Button><span className="hero-action-note">No training required.<br />Just be your legendary self.</span></div>
      </motion.div>
      <div className="hero-side">
        <span className="vertical-caption">KONOHAGAKURE · A NEW CHAPTER</span>
        <button className="hero-leaf" aria-label="Discover the hidden leaf" onClick={() => discover("leaf")}><Leaf /></button>
        <div className="shinobi-status"><div className="status-top"><LeafMark /><span>OFFICIAL SHINOBI RECORD</span><span className="live-dot" /></div><div className="status-rank"><span>YOUR RANK</span><strong>Elite shinobi.</strong><span className="rank-pill">S+</span></div><div className="status-details"><div><span>CHAKRA</span><strong>Maximum <i /></strong></div><div><span>AGE</span><strong>Classified, obviously.</strong></div></div><div className="status-bottom"><span>HIDDEN LEAF VILLAGE</span><Check size={13} /><span>ONE OF A KIND</span></div></div>
      </div>
    </div>
    <div className="hero-footer page-width"><a href="#profile"><span className="scroll-line" />SCROLL TO BEGIN THE ADVENTURE<ArrowDown size={13} /></a><span>A BIRTHDAY CHRONICLE <span className="footer-cross">+</span> MADE JUST FOR YOU</span></div>
    <span className="hero-watermark" aria-hidden="true">01 / THE BEGINNING</span>
    <div className="birthday-ribbon"><span>NOT JUST A FRIEND.</span><LeafMark /><span>A WHOLE LOT OF GOOD ENERGY.</span><LeafMark /><span>A ONE-OF-A-KIND HUMAN.</span><LeafMark /><span>AN S-RANK KIND OF PERSON.</span><LeafMark /></div>
    <div className="seal-interlude page-width">
      <div className="interlude-label"><Sparkles size={14} /><span>A SMALL REMINDER,<br />SEALED JUST FOR YOU.</span></div>
      <div className="interlude-message"><AnimatePresence mode="wait">{sealOpen ? <motion.p key="revealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Today isn&apos;t just another day. It&apos;s a reminder that the world got a little better <em>the day you were born.</em></motion.p> : <motion.p key="sealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Some people just make life feel<br /><em>a little more like home.</em></motion.p>}</AnimatePresence></div>
      <button className={`chakra-seal ${sealOpen ? "activated" : ""}`} onClick={() => { setSealOpen(!sealOpen); if (!sealOpen) discover("seal"); }} aria-label={sealOpen ? "Close the birthday seal" : "Activate the birthday seal"} aria-expanded={sealOpen}><span className="seal-ring" /><LeafMark /><span className="seal-caption">{sealOpen ? "SEAL RELEASED" : "TAP TO UNSEAL"}</span></button>
    </div>
  </section>;
}
