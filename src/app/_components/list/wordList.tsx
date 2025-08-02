"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import type { Word } from "~/lib/types";
import WordCard from "../card/wordCard";

export default function WordList({
  data,
  split,
  params,
}: {
  data: {
    name: string;
    id: string;
    word: Word;
  }[];
  split: number;
  params: {
    tab: string | null | undefined;
    alpha: string | null | undefined;
    search: string | null | undefined;
    id: string | null | undefined;
  };
}) {
  const [selectedPage, setSelectedPage] = useState(1);
  const totalpages = Math.ceil(data.length / split);
  const [selectedWord, setSelectedWord] = useState<{
    title: string;
    word: Word;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const displayData = useMemo(() => {
    return data.slice((selectedPage - 1) * split, selectedPage * split);
  }, [selectedPage, data, split]);

  useEffect(() => {
    if (params.id !== null && params.id !== undefined) {
      const word = data.find((w) => w.id === params.id);
      if (word) {
        setSelectedWord({
          title: word.name,
          word: word.word,
        });
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.length === 0) {
    return (
      <p className="mt-8 w-full text-center text-xl">
        No words found for this alphabet
      </p>
    );
  }

  return (
    <>
      <div className="bg-secondary/60 flex flex-row flex-nowrap justify-between rounded-md p-2">
        <ChevronLeft
          onClick={() => {
            setSelectedPage((prev) => Math.max(prev - 1, 1));
          }}
          className={`size-10 cursor-pointer fill-transparent stroke-black ${selectedPage === 1 ? "disabled cursor-not-allowed opacity-40" : ""}`}
        />
        <p className="my-auto text-center text-lg font-bold">
          <input
            type="number"
            min="1"
            value={selectedPage}
            max={totalpages}
            className="w-16 rounded bg-white text-center"
            onChange={(e) => {
              const val = Math.max(
                1,
                Math.min(Number(e.target.value), totalpages),
              );
              setSelectedPage(val);
            }}
          />
          <span className="pl-2 font-normal">of</span> {totalpages}
        </p>
        <ChevronRight
          onClick={() => {
            setSelectedPage((prev) => Math.min(prev + 1, totalpages));
          }}
          className={`size-10 cursor-pointer fill-transparent stroke-black ${selectedPage === totalpages ? "disabled cursor-not-allowed opacity-40" : ""}`}
        />
      </div>
      <div className="mb-12 w-full p-8 pb-0">
        <ul
          style={{ listStyleType: "disc" }}
          className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {displayData.map((word, idx) => {
            return (
              <li key={idx}>
                <button
                  onClick={() => {
                    setSelectedWord({
                      word: word.word,
                      title: word.name,
                    });
                    setOpen(true);
                  }}
                  className="w-full cursor-pointer truncate overflow-hidden text-left break-words text-blue-600 underline"
                >
                  {word.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {open && selectedWord && (
        <WordCard
          open={open}
          word={selectedWord.word}
          title={selectedWord.title}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}
