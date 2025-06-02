// components/studio/WordCounter.tsx (AVANZADO)
// filepath: components/studio/WordCounter.tsx
"use client";
import { countWords } from "@/lib/utils/scriptUtils";

interface WordCounterProps {
  text: string;
}

export default function WordCounter({ text }: WordCounterProps) {
  const words = countWords(text || "");
  return (
    <div className="text-xs text-gray-400 mt-1">
      Palabras: <span className="font-bold text-yellow-400">{words}</span>
    </div>
  );
}