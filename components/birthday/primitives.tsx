"use client";

import { motion, useReducedMotion } from "motion/react";
import { Leaf } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-35px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function LeafMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M30 12c-3-6-14-6-18 1-4 7 0 16 8 16 7 0 11-7 7-12-3-4-9-2-9 2 0 3 4 4 5 1M11 13 6 7l-2 15 8 3M28 27l7 6-1-12" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SectionHeading({ number, eyebrow, title, emphasis, description, centered = false }: { number: string; eyebrow: string; title: string; emphasis?: string; description?: string; centered?: boolean }) {
  return <Reveal className={cn("section-heading", centered && "is-centered")}><div className="eyebrow"><span className="section-number">{number}</span>{eyebrow}</div><h2>{title} {emphasis && <em>{emphasis}</em>}</h2>{description && <p>{description}</p>}</Reveal>;
}

export function Atmosphere({ dense = false }: { dense?: boolean }) {
  return <div className="atmosphere" aria-hidden="true">{Array.from({ length: dense ? 17 : 8 }, (_, i) => <span key={i} className="ember" style={{ "--x": `${(i * 37 + 7) % 100}%`, "--y": `${(i * 23 + 12) % 100}%`, "--delay": `${-i * 1.8}s`, "--duration": `${9 + i % 6}s` } as CSSProperties} />)}{[0, 1, 2].map(i => <Leaf key={`leaf-${i}`} className="drifting-leaf" style={{ "--x": `${20 + i * 31}%`, "--y": `${20 + i * 24}%`, "--delay": `${-i * 5}s`, "--duration": `${18 + i * 4}s` } as CSSProperties} />)}</div>;
}
