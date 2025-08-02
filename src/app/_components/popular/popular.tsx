import React from "react";
import { api } from "~/trpc/server";
import PopularListClient from "./list";

export default async function PopularList() {
  const res = await api.dictonary.popularSearch();

  if (
    res.code !== "SUCCESS" ||
    res.data === undefined ||
    res.data.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center"
      id="popular"
    >
      <div className="from-secondary to-primary mb-20 h-10 w-[50%] self-start rounded-br-full bg-gradient-to-r md:h-14 md:w-[30%]"></div>
      <div className="w-full max-w-7xl px-6">
        <header className="text-primary mb-8 text-2xl font-bold md:text-4xl">
          Popular Searches
        </header>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <PopularListClient words={res.data} />
        </div>
      </div>
      <div className="bg-opacity-70 from-primary to-secondary pointer-events-none absolute top-8 right-0 z-0 h-[80%] w-10 rounded-tl-full rounded-bl-full bg-gradient-to-b from-[50%]"></div>
    </div>
  );
}
