import React from "react";
import Link from "next/link";
import TabSwitch from "~/app/_components/switch/tabSwitch";

export default async function Words({
  searchParams,
}: {
  searchParams: Promise<{ tab: string | null; alpha: string | null }>;
}) {
  const params = await searchParams;

  console.log(params);

  if (params.tab === "table") {
    return (
      <div>
        <TabSwitch />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[90rem] p-6">
          <div className="flex flex-row flex-nowrap justify-between">
            <header className="font-aref-ruqaa mb-8 text-2xl font-bold md:text-4xl">
              Browse Dictionary
            </header>
            <div className="flex flex-row flex-nowrap items-center gap-2">
              <TabSwitch />
            </div>
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
      {/* <WordList data={displayData} split={100} /> */}
    </>
  );
}
