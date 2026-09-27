"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Info, Swords } from "lucide-react";
import { arcs, birthday, stats, type DiscoverEgg } from "@/lib/birthday";
import { LeafMark, Reveal, SectionHeading } from "./primitives";

export function ShinobiProfile({ discover }: { discover: DiscoverEgg }) {
  const [selected, setSelected] = useState(5);
  const reduced = useReducedMotion();
  return <section id="profile" className="profile-section section-space page-width">
    <SectionHeading number="01" eyebrow="THE PERSON. THE LEGEND." title="Not your average" emphasis="shinobi." description="Some people have a special ability. You apparently collected all of them." />
    <div className="profile-grid"><Reveal className="profile-portrait"><Image src="/images/forest-path.webp" alt="Golden light finding its way through a peaceful shinobi forest" fill sizes="(max-width: 760px) 90vw, 36vw" /><div className="portrait-shade" /><div className="portrait-top"><span>SHINOBI FILE Nº 001</span><button onClick={() => discover("kunai")} aria-label="Inspect the crossed kunai"><Swords size={22} /></button></div><div className="portrait-info"><span className="eyebrow">SHINOBI PROFILE</span><h3>{birthday.name}<BadgeCheck /></h3><p>Quiet legend. Main-character heart.</p><div className="portrait-tags"><span>HIDDEN LEAF</span><span>ONE OF ONE</span></div></div><span className="portrait-stamp">S<br /><small>RANK</small></span></Reveal>
      <Reveal className="stats-panel" delay={0.1}><div className="stats-title"><span>THE OFFICIAL STATS</span><span>VERIFIED. MOSTLY.</span></div><div className="stats-list">{stats.map((stat, i) => <button key={stat.name} className={`stat-row ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)} onMouseEnter={() => setSelected(i)} onFocus={() => setSelected(i)} aria-pressed={selected === i} aria-describedby="stat-description"><span className="stat-label">{stat.name}{stat.value === 999 && <span className="legendary-label">LEGENDARY</span>}</span><span className="stat-track"><motion.span initial={reduced ? { scaleX: Math.min(stat.value, 100) / 100 } : { scaleX: 0 }} whileInView={{ scaleX: Math.min(stat.value, 100) / 100 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.08 }} /></span><strong>{stat.value}<small>%</small></strong></button>)}</div><p className="stat-description" id="stat-description" aria-live="polite"><Info size={15} />{stats[selected].detail}</p><div className="special-ability"><LeafMark /><div><span>SPECIAL ABILITY</span><p>{birthday.specialAbility}</p></div></div></Reveal>
    </div>
  </section>;
}

export function StoryArcs() {
  const [active, setActive] = useState(0);
  return <section id="story" className="story-section section-space"><div className="page-width"><div className="section-topline"><SectionHeading number="02" eyebrow="EVERY GOOD FRIENDSHIP HAS LORE" title="The story" emphasis="so far." description="No filler episodes. Okay, maybe a few. But every arc was worth it." /><span className="small-aside">OUR VERY OWN<br />ONGOING SERIES <ArrowUpRight size={16} /></span></div><div className="arc-timeline">{arcs.map((arc, i) => <Reveal key={arc.number} delay={i * 0.06} className={`arc-item ${active === i ? "active" : ""}`}><button className="arc-button" onClick={() => setActive(i)} aria-pressed={active === i}><span className="arc-dot">{arc.number === "?" ? "+" : arc.number}</span><span className="arc-kicker">{i === 4 ? "FUTURE ARC" : `ARC ${arc.number}`}</span><h3>{arc.title}</h3><p>{arc.text}</p><span className="arc-label">{arc.label}</span></button></Reveal>)}</div></div></section>;
}
