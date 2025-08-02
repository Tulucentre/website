"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import type { Word } from "~/lib/types";
// import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { columns, getColumn, parseDate, parseDelimiter } from "~/lib/utils";
import WordCard from "../card/wordCard";

export default function WordOfTheDay({ wotd }: { wotd: Word }) {
  //   const activeSnapshotQuery = api.snapshot.getActiveSnapshot.useQuery();
  //   TODO: update it
  //   const columns = activeSnapshotQuery.data as Array<Column>;

  const cardRef = useRef<HTMLDivElement>(null);
  const cardTitleRef = useRef<HTMLDivElement>(null);
  const mouseCircleRef = useRef<HTMLDivElement>(null);

  // const xToRef = useRef<gsap.QuickToFunc>(null);
  // const yToRef = useRef<gsap.QuickToFunc>(null);

  // const [isHovering, setIsHovering] = useState(false);
  // const [animationRunning, setAnimationRunning] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (mouseCircleRef.current) {
  //     xToRef.current = gsap.quickTo(mouseCircleRef.current, "x", {
  //       duration: 0.6,
  //       ease: "power2",
  //     });
  //     yToRef.current = gsap.quickTo(mouseCircleRef.current, "y", {
  //       duration: 0.6,
  //       ease: "power2",
  //     });
  //   }
  // }, []);

  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  //   setAnimationRunning(true);
  //   if (cardTitleRef.current) {
  //     gsap.to(Array.from(cardTitleRef.current.children), {
  //       y: -60,
  //       opacity: 1,
  //       duration: 0.5,
  //       ease: "back.out",
  //       stagger: 0.1,
  //       onComplete: () => setAnimationRunning(false),
  //     });
  //   }
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  //   const animateOut = () => {
  //     if (cardTitleRef.current) {
  //       gsap.to(Array.from(cardTitleRef.current.children).reverse(), {
  //         y: 0,
  //         opacity: 0,
  //         duration: 0.3,
  //         ease: "power2.in",
  //         stagger: 0.1,
  //         onComplete: () => setAnimationRunning(false),
  //       });
  //     }
  //   };
  //   if (animationRunning) {
  //     setTimeout(() => {
  //       setAnimationRunning(true);
  //       animateOut();
  //     }, 500);
  //   } else {
  //     setAnimationRunning(true);
  //     animateOut();
  //   }
  //   setTimeout(() => {
  //     if (mouseCircleRef.current) {
  //       gsap.to(mouseCircleRef.current, {
  //         x: 0,
  //         y: 0,
  //         duration: 0.5,
  //         ease: "linear",
  //       });
  //     }
  //   }, 100);
  // };

  // const handleMouseHover = (event: React.MouseEvent) => {
  //   if (!cardRef.current || !mouseCircleRef.current) return;
  //   const rect = cardRef.current.getBoundingClientRect();
  //   const x = event.pageX - rect.right + mouseCircleRef.current.offsetWidth;
  //   const y = event.pageY - rect.top - mouseCircleRef.current.offsetHeight;
  //   if (isHovering && xToRef.current && yToRef.current) {
  //     xToRef.current(x);
  //     yToRef.current(y);
  //   }
  // };

  const date = parseDate(new Date());
  // Replace with your actual data source
  // const wotd = ...;
  // const columns = ...;

  // Heading logic
  const words = parseDelimiter(
    (getColumn("d1", columns)?.required ? wotd.d1 : "") +
      ";" +
      (getColumn("d2", columns)?.required ? wotd.d2 : "") +
      ";" +
      (getColumn("d3", columns)?.required ? wotd.d3 : "") +
      ";" +
      (getColumn("d4", columns)?.required ? wotd.d4 : "") +
      ";",
  );

  return (
    <>
      <div
        className="relative z-10 flex h-fit max-w-4xl flex-row flex-wrap justify-self-center drop-shadow-lg sm:m-2 sm:w-[70%] sm:justify-self-end md:mt-10 lg:m-3"
        role="contentinfo"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onMouseMove={handleMouseHover}
      >
        <div
          ref={cardTitleRef}
          className="text-primary absolute z-[1] flex w-full justify-center text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl"
        >
          <p>Word</p>&nbsp;<p>of</p>&nbsp;<p>the</p>&nbsp;<p>day</p>
        </div>
        <div
          ref={cardRef}
          className="bg-secondary relative flex h-auto w-full flex-col justify-between rounded-xl px-2 py-2 sm:px-4 sm:py-4 md:rounded-2xl md:px-10 md:py-8 lg:rounded-3xl lg:px-16 lg:py-10"
        >
          <div className="p-2">
            <p className="z-40 mb-2 text-xl font-semibold sm:text-2xl md:mb-3 md:text-3xl lg:mb-4 lg:text-4xl">
              {words.length > 0 ? words[0] : ""}
            </p>
            <p className="text-md z-40 w-full text-pretty sm:line-clamp-2 md:line-clamp-3 md:text-lg lg:line-clamp-4 lg:text-xl">
              {parseDelimiter(wotd.english_meaning).length > 0
                ? parseDelimiter(wotd.english_meaning)[0]
                : ""}
            </p>
          </div>
          <div className="mt-2 flex flex-row flex-nowrap items-center justify-between px-1">
            <p className="text-sm text-slate-800 uppercase sm:w-2/3 md:text-xl">
              {date.dayStr},&nbsp;{date.monthStr}&nbsp;{date.date},&nbsp;
              {date.year}
            </p>
            <Button
              className="z-30 rounded-xl hover:bg-blue-800 md:text-lg"
              onClick={() => setOpen(true)}
            >
              View More
            </Button>
          </div>
          <div
            ref={mouseCircleRef}
            className="bg-primary from-secondary via-primary to-secondary absolute top-2 right-2 z-10 h-4 w-4 rounded-full bg-gradient-to-br md:top-3 md:right-3 md:h-5 md:w-5 lg:top-4 lg:right-4 lg:h-7 lg:w-7"
          ></div>
        </div>
      </div>
      <WordCard
        word={wotd}
        open={open}
        onOpenChange={setOpen}
        title="Word of the Day"
      />
    </>
  );
}
