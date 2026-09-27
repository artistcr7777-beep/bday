"use client";

import Image from "next/image";
import { ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { birthday, wishes, type DiscoverEgg } from "@/lib/birthday";
import { Atmosphere, LeafMark, Reveal, SectionHeading } from "./primitives";

export function NextArcWishes() {
  return <section className="wishes-section section-space page-width" id="wishes"><SectionHeading number="06" eyebrow="NEW SEASON. BETTER SIDE QUESTS." title="Wishes for your" emphasis="next arc." description="Your mission list for the year ahead. All highly recommended. None optional." centered /><div className="wishes-grid">{wishes.map((wish, i) => <Reveal key={wish} delay={i * 0.08}><div className="wish-card"><span className="wish-index">0{i + 1}</span><div><span className="wish-label">MISSION #00{i + 1}</span><h3>{wish}</h3></div><ArrowUpRight size={17} /></div></Reveal>)}</div><p className="wish-postscript"><Sparkles size={13} />And all the good things you haven&apos;t even thought to wish for yet.</p></section>;
}

export function FinalScene({ onReplay, discover, found }: { onReplay: () => void; discover: DiscoverEgg; found: number }) {
  return <><section className="final-scene"><Image src="/images/hidden-leaf-sunset.webp" alt="The sun setting over the village at the end of a beautiful day" fill sizes="100vw" /><div className="final-shade" /><Atmosphere /><Reveal className="final-copy"><span className="eyebrow">TO BE CONTINUED. IN THE BEST POSSIBLE WAY.</span><p className="final-prelude">Every shinobi has their own path.</p><p className="final-wish">I hope yours is filled with amazing people,<br className="desktop-break" /> unforgettable memories, and a lot of happiness.</p><h2>Happy Birthday, <em>{birthday.name}.</em></h2><p className="final-signature">— From {birthday.sender}</p><Button variant="outline" size="cinematic" onClick={onReplay}><RotateCcw data-icon="inline-start" />Replay the mission</Button></Reveal><div className="final-bottom page-width"><span>END OF THIS CHAPTER. NOT THE STORY.</span><LeafMark /><span>THE BEST IS STILL AHEAD.</span></div></section><footer className="site-footer page-width"><a href="#home" className="footer-brand">{birthday.name.toUpperCase()}<span>A BIRTHDAY CHRONICLE</span></a><p>Made with a ridiculous amount of appreciation.</p><button className="footer-easter-egg" onClick={() => discover("footer")} aria-label="Discover the final S-rank mission"><LeafMark /><span>{found}/5 LITTLE SECRETS FOUND</span></button></footer></>;
}
