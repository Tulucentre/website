import React from "react";
import WordSearch from "../_components/wordSearch/wordSearch";
import WordOfTheDay from "../_components/wotd/wordOfTheDay";
import { api } from "~/trpc/server";

export default function Home() {
  return (
    <section>
      <div className="h-full w-full bg-[url(/images/background.svg)] pt-14">
        <HeadingAndSearch />
      </div>
    </section>
  );
}

async function HeadingAndSearch() {
  const wordOfTheDay = await api.dictonary.getWordOfTheDay();

  if (!wordOfTheDay.data) {
    return (
      <p className="text-center text-red-500">Word of the Day not available</p>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col">
      <h1 className="font-caprasimo text-gradient-to-b from-secondary to-primary m-2 bg-gradient-to-br to-[70%] bg-clip-text text-center text-3xl font-bold text-nowrap text-transparent md:m-4 md:text-5xl lg:text-6xl">
        Koraga Dictionary
      </h1>
      <p className="mx-auto text-xs font-medium opacity-70 md:text-base lg:text-xl">
        Browse Tulu words and their meanings
      </p>
      <div className="mt-10 flex w-full justify-center px-8">
        <WordSearch className="max-w-3xl" />
      </div>
      <div className="flex h-full w-full grow items-center justify-center">
        {wordOfTheDay?.data && <WordOfTheDay wotd={wordOfTheDay.data} />}
      </div>
    </div>
  );
}
