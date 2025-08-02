import React from "react";
import Link from "next/link";
import { api } from "~/trpc/server";
import WordList from "~/app/_components/list/wordList";

export default async function Words({
  searchParams,
}: {
  searchParams: Promise<{
    tab: string | null | undefined;
    alpha: string | null | undefined;
    search: string | null | undefined;
    id: string | null | undefined;
  }>;
}) {
  const params = await searchParams;
  const dictData = await api.dictonary.getWordList({
    alpha: params.alpha ?? null,
    search: params.search ?? null,
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl p-6">
          <div className="flex flex-row flex-nowrap justify-between">
            <header className="font-aref-ruqaa mb-8 text-2xl font-bold md:text-4xl">
              Browse Dictionary
            </header>
            {/* <div className="flex flex-row flex-nowrap items-center gap-2">
              <TabSwitch />
            </div> */}
          </div>
          <div className="justify-left flex flex-wrap justify-center gap-2 lg:justify-normal">
            <Link
              href={`/koraga/words?alpha=all&tab=list`}
              className="flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-slate-300 font-bold text-black shadow transition-colors duration-200 hover:bg-slate-400 hover:shadow-lg"
            >
              All
            </Link>
            <Link
              href={`/koraga/words?alpha=special&tab=list`}
              className="flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-slate-300 font-bold text-black shadow transition-colors duration-200 hover:bg-slate-400 hover:shadow-lg"
            >
              #
            </Link>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((alpha, idx) => (
              <Link
                key={idx}
                href={`/koraga/words?alpha=${alpha.toLowerCase()}&tab=list`}
                className="flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-slate-300 font-bold text-black shadow transition-colors duration-200 hover:bg-slate-400 hover:shadow-lg"
                aria-label={`Browse words starting with ${alpha}`}
              >
                {alpha}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-full max-w-7xl px-4">
          <WordList data={dictData.data} split={5000} params={params} />
        </div>
      </div>
    </>
  );
}
