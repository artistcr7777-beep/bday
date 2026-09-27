"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Menu, Volume2, VolumeX, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { birthday, easterEggs, type EasterEgg } from "@/lib/birthday";
import { Hero } from "./hero";
import { ShinobiProfile, StoryArcs } from "./story";
import { MemoryScroll } from "./memories";
import { JutsuCollection } from "./jutsu";
import { ChakraGame } from "./chakra-game";
import { FinalScene, NextArcWishes } from "./closing";
import { Atmosphere, LeafMark } from "./primitives";
import { useAmbientAudio } from "./use-ambient-audio";

const navigation = [{ name: "The story", href: "#story" }, { name: "Memory scroll", href: "#memories" }, { name: "Your jutsu", href: "#jutsu" }];

export function BirthdayExperience({ skipCinematicIntro = false }: { skipCinematicIntro?: boolean }) {
  const [intro, setIntro] = useState(!skipCinematicIntro);
  const [accepted, setAccepted] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [found, setFound] = useState<EasterEgg[]>([]);
  const [flash, setFlash] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const reduced = useReducedMotion();
  const { enabled, toggle, playChime } = useAmbientAudio();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIntro(false), reduced ? 100 : 2300);
    return () => clearTimeout(timeout);
  }, [replayKey, reduced]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (!mobileMenu) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileMenu(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileMenu]);

  const discover = useCallback((egg: EasterEgg) => {
    const content = easterEggs[egg];
    setFound(current => current.includes(egg) ? current : [...current, egg]);
    toast(content.title, { description: content.description, duration: 5500, icon: <LeafMark className="toast-leaf" /> });
    playChime();
  }, [playChime]);

  function accept(scroll = true) {
    setIntro(false);
    setAccepted(true);
    playChime();
    if (!reduced) { setFlash(true); timer.current = setTimeout(() => setFlash(false), 700); }
    if (scroll) document.getElementById("profile")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }

  function replay() {
    toast.dismiss();
    setAccepted(false);
    setFound([]);
    setMissionComplete(false);
    setIntro(true);
    setMobileMenu(false);
    setReplayKey(current => current + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return <MotionConfig reducedMotion="user"><div className="birthday-experience" data-ready="true" onPointerMove={event => { if (event.pointerType === "mouse" && !reduced) { pointerX.set(event.clientX - 180); pointerY.set(event.clientY - 180); } }}>
    <a href="#profile" className="skip-link">Skip to the birthday story</a>
    <motion.div className="reading-progress" style={{ scaleX: progress }} />
    <header className="site-header"><div className="header-inner page-width"><a href="#home" className="brand" aria-label={`${birthday.name} birthday chronicle, home`}><LeafMark /><span>{birthday.name.toUpperCase()}<small>A BIRTHDAY CHRONICLE</small></span></a><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.href} href={item.href}>{item.name}</a>)}</nav><div className="header-actions"><button className="sound-toggle" onClick={toggle} aria-pressed={enabled} aria-label={enabled ? "Turn sound off" : "Turn sound on"}>{enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>SOUND {enabled ? "ON" : "OFF"}</span></button><a className="header-mission" href="#mission">Your mission <ArrowRight size={14} /></a><button className="mobile-menu-toggle" aria-label={mobileMenu ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenu} aria-controls="mobile-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={21} /> : <Menu size={21} />}</button></div></div>{mobileMenu && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{[...navigation, { name: "Your mission", href: "#mission" }].map(item => <a key={item.href} href={item.href} onClick={() => setMobileMenu(false)}>{item.name}<ArrowRight size={15} /></a>)}</nav>}</header>
    <main key={replayKey}><Hero accepted={accepted} onAccept={() => accept()} discover={discover} /><ShinobiProfile discover={discover} /><StoryArcs /><MemoryScroll discover={discover} /><JutsuCollection playChime={playChime} /><ChakraGame playChime={playChime} onComplete={() => { setMissionComplete(true); setAccepted(true); }} /><NextArcWishes /><FinalScene onReplay={replay} discover={discover} found={found.length} /></main>
    <span className="mission-status-floating"><span className="live-dot" />{missionComplete ? "MISSION COMPLETE" : accepted ? "MISSION IN PROGRESS" : "YOUR NEXT ARC AWAITS"}</span>
    {!reduced && <motion.div className="cursor-glow" aria-hidden="true" style={{ x: pointerX, y: pointerY }} />}
    <AnimatePresence>{intro && <motion.div className="cinematic-intro" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: reduced ? "none" : "blur(8px)" }} transition={{ duration: 0.75 }}><Atmosphere /><LeafMark className="intro-mark" /><p className="eyebrow">A SPECIAL MISSION HAS BEEN ASSIGNED…</p><h2>Some people deserve<br /><em>a whole adventure.</em></h2><p>Mission: celebrate {birthday.name}&apos;s birthday.</p><Button size="cinematic" onClick={() => accept(false)}>Accept mission<ArrowRight data-icon="inline-end" /></Button><button className="skip-intro" onClick={() => setIntro(false)}>Skip intro</button></motion.div>}</AnimatePresence>
    <AnimatePresence>{flash && <motion.div className="mission-transition" aria-hidden="true" initial={{ opacity: 0.3, scaleX: 0 }} animate={{ opacity: 0, scaleX: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} />}</AnimatePresence>
    <Toaster position="bottom-right" closeButton richColors />
  </div></MotionConfig>;
}
