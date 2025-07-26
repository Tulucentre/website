"use client";
import React, { useEffect, useState } from "react";
import type { Word } from "~/lib/types";
import gsap from "gsap";
import WordCard from "../card/wordCard";

export default function PopularListClient({ words }: { words: Word[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Word | null>(null);

  const handleHoverEffectIn = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, { scale: 1.1, duration: 0.5, ease: "bounce.out" });
  };

  const handleHoverEffectOut = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, { scale: 1, duration: 0.5, ease: "bounce.out" });
  };

  useEffect(() => {
    gsap.fromTo(
      ".grid-item",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: ".grid-item",
      },
    );
  }, []);

  return (
    <>
      {words.map((word, idx) => {
        return (
          <div
            key={idx}
            className="grid-item bg-secondary z-10 cursor-pointer rounded-lg p-4 shadow-md hover:drop-shadow-2xl"
            role="button"
            tabIndex={0}
            onMouseEnter={handleHoverEffectIn}
            onMouseLeave={handleHoverEffectOut}
            onClick={() => {
              setSelected(word);
              setOpen(true);
            }}
          >
            <p className="text-md md:text-xl">
              {idx + 1}.{" "}
              <span className="font-medium underline">{word.tulu_meaning}</span>
            </p>
            <div className="mt-2 grid grid-cols-1">
              <p className="font-kannada text-sm font-medium md:text-lg">
                {word.kannada_meaning}
              </p>
              <p className="mt-1 text-sm md:text-lg">{word.english_meaning}</p>
            </div>
          </div>
        );
      })}
      {open && selected && (
        <WordCard
          open={open}
          onOpenChange={setOpen}
          word={selected}
          title="Popular Word"
          key={selected.id}
        />
      )}
    </>
  );
}
