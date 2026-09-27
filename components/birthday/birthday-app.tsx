"use client";

import { useEffect, useState } from "react";
import { BirthdayExperience } from "./experience";
import { GiftOpening } from "./gift-opening";
import { GIFT_SESSION_KEY } from "@/lib/birthday";

export function BirthdayApp() {
  const [hydrated, setHydrated] = useState(false);
  const [showGift, setShowGift] = useState(true);

  useEffect(() => {
    setShowGift(sessionStorage.getItem(GIFT_SESSION_KEY) !== "1");
    setHydrated(true);
  }, []);

  function completeGift() {
    sessionStorage.setItem(GIFT_SESSION_KEY, "1");
    setShowGift(false);
  }

  if (!hydrated) {
    return <div className="gift-opening gift-opening-boot" aria-hidden="true" />;
  }

  if (showGift) {
    return <GiftOpening onComplete={completeGift} />;
  }

  return <BirthdayExperience skipCinematicIntro />;
}
