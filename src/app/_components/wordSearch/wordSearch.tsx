"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "~/lib/utils";

export default function WordSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>("");
  const filteredResults = [];

  function handleInput(e: React.InputEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLInputElement | null;

    if (target) {
      if (target.value) {
        setSearchString(target.value);
      } else {
        setSearchString("");
      }
    } else {
      setSearchString("");
    }
  }

  // function handleResultClick(word: string) {
  //   setSearchString(word);
  // }

  return (
    <div className={cn("relative h-auto w-full", className)}>
      <div className="flex h-auto w-full">
        <input
          type="text"
          placeholder="Search for a word..."
          onInput={handleInput}
          value={searchString}
          className="border-secondary w-full rounded-l-full border-2 bg-white px-4 text-xl text-black lg:border-4"
        />
        <button
          className="bg-primary rounded-r-full p-2 pr-4"
          onClick={() => {
            // TODO: redirect logic
            router.push("");
          }}
        >
          <Search className="size-10 stroke-white" />
        </button>
      </div>

      {/* Dropdown */}
      {searchString && filteredResults.length > 0 && (
        <div className="border-secondary absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          <div className="p-2">
            <h3 className="text-muted-foreground mb-1 px-2 text-sm font-semibold">
              {filteredResults.length} results found
            </h3>
            <ul className="space-y-1">
              {/* TODO: search list */}
              {/* {filteredResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleResultClick(result.word)}
                  className="hover:bg-muted cursor-pointer rounded-md px-3 py-2 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{result.word}</p>
                      <p className="text-muted-foreground text-sm">
                        {result.definition}
                      </p>
                    </div>
                    <span className="bg-secondary/20 text-secondary-foreground rounded-full px-2 py-1 text-xs">
                      {result.type}
                    </span>
                  </div>
                </li>
              ))} */}
            </ul>
          </div>
          <div className="border-t p-2">
            {/* TODO: view all results */}
            <button className="text-primary w-full py-2 text-center text-sm hover:underline">
              View all results
            </button>
          </div>
        </div>
      )}

      {searchString && filteredResults.length === 0 && (
        <div className="border-secondary absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              No results found for &quot;{searchString}&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
