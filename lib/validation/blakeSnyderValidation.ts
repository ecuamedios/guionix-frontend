// lib/validation/blakeSnyderValidation.ts (AVANZADO)
// filepath: lib/validation/blakeSnyderValidation.ts
const blakeSnyderBeats = [
  "Opening Image",
  "Theme Stated",
  "Set-Up",
  "Catalyst",
  "Debate",
  "Break Into Two",
  "B Story",
  "Fun and Games",
  "Midpoint",
  "Bad Guys Close In",
  "All Is Lost",
  "Dark Night of the Soul",
  "Break Into Three",
  "Finale",
  "Final Image",
];

export function validateBlakeSnyderStructure(beats: string[]): { valid: boolean; missing: string[] } {
  const missing = blakeSnyderBeats.filter((beat) => !beats.includes(beat));
  return { valid: missing.length === 0, missing };
}

export { blakeSnyderBeats };