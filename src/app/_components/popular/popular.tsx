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
    <div className="flex h-screen w-full justify-center">
      <div className="mx-6 w-full max-w-7xl">
        <header className="text-primary mb-8 text-2xl font-bold md:text-4xl">
          Popular Searches
        </header>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <PopularListClient words={res.data} />
        </div>
      </div>
      <div className="bg-opacity-70 from-primary to-secondary absolute right-0 z-[0] h-[80%] w-10 rounded-tl-full rounded-bl-full bg-gradient-to-b from-[50%]"></div>
    </div>
  );
}
