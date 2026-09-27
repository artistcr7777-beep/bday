export const birthday = {
  name: "Ocean",
  sender: "a fellow shinobi",
  subtitle: "To one of the coolest people I somehow got lucky enough to meet on Discord.",
  specialAbility: "Annoying me while somehow always being right.",
  giftMessage: {
    greeting: "Hey Ocean,",
    prelude: "Before you enter the actual mission, there's one thing I wanted to say...",
    lines: [
      "It's honestly kind of crazy to think that we met through Discord, of all places, and somehow a random online friendship turned into something I genuinely value so much.",
      "You have this ridiculous talent for turning a completely normal day into something I'll still be laughing about three weeks later. Unfair, honestly.",
      "Looking back, it's the small stuff that stuck — the dumb jokes, the random conversations, the unexpected talks, and all those little moments that somehow became memories.",
      "I'm really glad Discord decided to throw us into the same corner of the internet. Out of all the people I could've met there, somehow I ended up with a sister-like friend who makes things a little more fun.",
      "So yeah... thank you for being you. Happy birthday, Ocean.",
      "May this year bring you more happiness than plot twists, more laughs than headaches, and a mission list that actually treats you well.",
    ],
    closing: "Now go on, shinobi. The rest of the mission is waiting.",
  },
  letter: [
    "Somewhere between the random Discord messages, the dumb jokes, and the very necessary reality checks, you went from a random online friend to someone who feels like an older sister I never had.",
    "You've given advice, tolerated my nonsense, roasted me when it was absolutely needed, and somehow always had the wisdom ready before I even finished explaining the problem. Honestly, a little suspicious.",
    "I'm really glad we ended up in the same corner of the internet that day. Out of everyone I could've crossed paths with, I got someone who's actually been a solid presence — and that's not nothing.",
    "I hope this year brings you peace, happiness, success, ridiculously good memories, and way fewer problems than the last one. You deserve good things that don't come with a plot twist.",
    "Keep being you. The world's better with you in it.",
  ],
};

export const birthdayConfig = birthday;

export const stats = [
  { name: "Kindness", value: 100, detail: "The kind that shows up in the little things. Every single time." },
  { name: "Patience", value: 82, detail: "The missing 18%? I'm probably responsible for that." },
  { name: "Chaos", value: 91, detail: "A perfectly normal conversation never stood a chance." },
  { name: "Wisdom", value: 97, detail: "Somehow, the advice is ready before I even finish explaining the problem." },
  { name: "Roasting ability", value: 100, detail: "No hand signs needed. Just one look and it's over." },
  { name: "Legendary aura", value: 999, detail: "The measuring equipment broke. We're calling this one legendary." },
];

export const arcs = [
  { number: "01", title: "The beginning", text: "Somehow, two completely different people ended up becoming close — via Discord, of all places.", label: "A VERY GOOD PLOT TWIST" },
  { number: "02", title: "The chaos era", text: "Random conversations. Dumb jokes. Unnecessary arguments. Legendary moments.", label: "ABSOLUTELY NO FILLER" },
  { number: "03", title: "The turning point", text: "Somewhere along the way, the ordinary days started to matter more than they first seemed to.", label: "THE CHARACTER DEVELOPMENT" },
  { number: "04", title: "The current season", text: "Still chaotic. Still memorable. Still the best Discord plot twist.", label: "OUR FAVORITE SEASON YET" },
  { number: "?", title: "The next chapter", text: "Whatever comes next, I hope life gives you a ridiculous amount of reasons to smile.", label: "FUTURE ARC · LOADING…" },
];

export type Memory = {
  id: number;
  image: string;
  alt: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  placeholder?: boolean;
};

export const memories: Memory[] = [
  { id: 1, image: "/images/naruto-baby-sleep.jpg", alt: "Kid Naruto doing shadow clone jutsu with clones popping everywhere in the Hidden Leaf village", title: "First shadow clone jutsu, dattebayo!", caption: "The moment a 4-year-old accidentally broke the laws of ninjutsu. No hand signs were prepared for this." },
  { id: 2, image: "/images/naruto-birthday-party.jpg", alt: "Naruto holding a birthday cake surrounded by the whole squad celebrating", title: "HAPPY BIRTHDAY — BELIEVE IT!", caption: "When Naruto throws a birthday party, the whole village shows up. No exceptions." },
  { id: 3, image: "/images/naruto-sasuke-ramen.jpg", alt: "Kid Naruto and kid Hinata sitting on a bench eating dango together in the Hidden Leaf village park", title: "Naruto & Hinata, before it was cool", caption: "Just two kids, a bench, some dango, and absolutely zero idea what the next arc had planned for them." },
];


export const jutsu = [
  { name: "Kindness jutsu", type: "HEART NATURE", description: "Some people make a room brighter just by being there. You're one of them.", unlocked: "Passive ability. Always active. Makes everyone's day a little better." },
  { name: "Chaos jutsu", type: "FIRE NATURE", description: "For turning completely normal conversations into absolute nonsense.", unlocked: "Critical hit! A normal conversation has evolved into an inside joke." },
  { name: "Wisdom jutsu", type: "LIGHTNING NATURE", description: "For somehow giving advice that annoyingly turns out to be correct.", unlocked: "Prediction confirmed. She was right. Again. Please don't tell her." },
  { name: "Guard jutsu", type: "LEGENDARY NATURE", description: "Someone who can roast you, guide you, and still have your back.", unlocked: "Legendary protection activated. Chaos: tolerated. Loyalty: locked in." },
];

export const wishes = ["More reasons to laugh.", "More adventures.", "More well-deserved success.", "More quiet, everyday peace.", "Less unnecessary stress.", "Main-character energy: MAX."];

export const easterEggs = {
  leaf: { title: "The Will of Fire", description: "Turns out it's not just a ninja thing. It's looking out for your people. You've mastered that." },
  ramen: { title: "Ichiraku-level priorities", description: "Even an S-rank shinobi deserves a ramen break. Birthday calories are classified." },
  kunai: { title: "Kakashi's official excuse", description: "If this birthday wish is late, I got lost on the path of life. Obviously." },
  seal: { title: "Believe it!", description: "A little reminder: you make more of a difference than you realize. That's your ninja way." },
  footer: { title: "S-rank mission complete", description: "Objective: remind Ocean they're appreciated. Reward: hopefully one smile." },
};
export type EasterEgg = keyof typeof easterEggs;
export type DiscoverEgg = (egg: EasterEgg) => void;

export const GIFT_SESSION_KEY = "birthday-gift-opened";
