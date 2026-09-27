"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type AudioEngine = { context: AudioContext; master: GainNode; interval: ReturnType<typeof setInterval> };

function tone(context: AudioContext, output: GainNode, frequency: number, start: number, duration: number, volume: number) {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  envelope.gain.setValueAtTime(0, start);
  envelope.gain.linearRampToValueAtTime(volume, start + 0.08);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(envelope);
  envelope.connect(output);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.1);
  oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
}

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const engine = useRef<AudioEngine | null>(null);
  const enabledRef = useRef(false);
  const busy = useRef(false);

  const toggle = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      if (enabledRef.current && engine.current) {
        await engine.current.context.suspend();
        enabledRef.current = false;
        setEnabled(false);
        return;
      }
      if (!engine.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) throw new Error("Audio unavailable");
        const context = new AudioContextClass();
        const master = context.createGain();
        master.gain.value = 0.22;
        master.connect(context.destination);
        await context.resume();
        let step = 0;
        const melody = [261.63, 329.63, 392, 440, 392, 329.63, 293.66, 329.63];
        const play = () => {
          if (context.state !== "running") return;
          const now = context.currentTime;
          tone(context, master, melody[step % melody.length], now, 3, 0.2);
          if (step % 4 === 0) { tone(context, master, 130.81, now, 7, 0.12); tone(context, master, 196, now + 0.06, 7, 0.08); }
          step++;
        };
        const interval = setInterval(play, 1700);
        engine.current = { context, master, interval };
        play();
      } else await engine.current.context.resume();
      enabledRef.current = true;
      setEnabled(true);
    } catch {
      enabledRef.current = false;
      setEnabled(false);
      toast("Sound couldn’t start", { description: "You can still enjoy the whole mission without audio. Try the sound button again if you’d like." });
    } finally { busy.current = false; }
  }, []);

  const playChime = useCallback(() => {
    const audio = engine.current;
    if (!enabledRef.current || !audio || audio.context.state !== "running") return;
    tone(audio.context, audio.master, 659.25, audio.context.currentTime, 0.7, 0.25);
    tone(audio.context, audio.master, 987.77, audio.context.currentTime + 0.09, 0.85, 0.12);
  }, []);

  const playCue = useCallback((kind: "gift" | "envelope" | "seal" | "letter" | "continue") => {
    const audio = engine.current;
    if (!enabledRef.current || !audio || audio.context.state !== "running") return;
    const now = audio.context.currentTime;
    if (kind === "gift") {
      tone(audio.context, audio.master, 392, now, 0.45, 0.16);
      tone(audio.context, audio.master, 523.25, now + 0.1, 0.55, 0.11);
    } else if (kind === "envelope") {
      tone(audio.context, audio.master, 196, now, 0.55, 0.1);
      tone(audio.context, audio.master, 293.66, now + 0.14, 0.7, 0.08);
    } else if (kind === "seal") {
      tone(audio.context, audio.master, 174.61, now, 0.18, 0.14);
      tone(audio.context, audio.master, 130.81, now + 0.06, 0.28, 0.1);
    } else if (kind === "letter") {
      tone(audio.context, audio.master, 349.23, now, 0.7, 0.1);
      tone(audio.context, audio.master, 440, now + 0.16, 0.85, 0.08);
      tone(audio.context, audio.master, 523.25, now + 0.32, 1, 0.06);
    } else {
      tone(audio.context, audio.master, 523.25, now, 0.55, 0.14);
      tone(audio.context, audio.master, 659.25, now + 0.12, 0.7, 0.11);
      tone(audio.context, audio.master, 783.99, now + 0.24, 0.85, 0.08);
    }
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      const audio = engine.current;
      if (!audio) return;
      if (document.hidden) void audio.context.suspend();
      else if (enabledRef.current) void audio.context.resume().catch(() => { enabledRef.current = false; setEnabled(false); });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (engine.current) { clearInterval(engine.current.interval); void engine.current.context.close(); engine.current = null; }
    };
  }, []);

  return { enabled, toggle, playChime, playCue };
}
