"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import type { Word } from "~/lib/types";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function WordSearch({ className }: { className?: string }) {
  const router = useRouter();
  const apiUtils = api.useUtils();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<
    {
      name: string;
      id: string;
      word: Word;
    }[]
  >([]);

  const fetchResults = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return null;
    const res = await apiUtils.dictonary.getWordList.fetch({
      search: searchTerm,
      alpha: null,
    });
    setFilteredResults(res.data || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(e: React.InputEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLInputElement | null;

    if (target?.value) {
      setSearchString(target.value);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        void fetchResults(target.value)
          .then(() => {
            console.log("Fetched results for:", target.value);
          })
          .catch((err) => {
            console.log("Error fetching results:", err);
          });
      }, 300);
    } else {
      setSearchString("");
    }
  }

  function handleResultClick(id: string) {
    router.push(`/koraga/words?tab=list&id=${id}&search=${searchString}`);
  }

  return (
    <div className={cn("relative h-auto w-full", className)}>
      <div className="flex h-auto w-full">
        <input
          type="text"
          placeholder="Search for a word..."
          onInput={handleInput}
          value={searchString}
          className="border-secondary w-full rounded-l-full border-2 bg-white px-4 text-lg text-black md:text-xl lg:border-4"
        />
        <button
          className="bg-primary rounded-r-full p-2 pr-4"
          onClick={() => {
            // TODO: redirect logic
            router.push(`/koraga/words?tab=list&search=${searchString}`);
          }}
        >
          <Search className="size-8 stroke-white md:size-10" />
        </button>
      </div>

      {/* Dropdown */}
      {searchString && filteredResults.length > 0 && (
        <div className="border-secondary absolute z-30 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          <div className="p-2">
            <h3 className="text-muted-foreground mb-1 px-2 text-sm font-semibold">
              {filteredResults.length} results found
            </h3>
            <ul className="space-y-1">
              {/* TODO: search list */}
              {filteredResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleResultClick(result.id)}
                  className="hover:bg-muted cursor-pointer rounded-md px-3 py-2 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{result.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {result.word.english_meaning}
                      </p>
                    </div>
                    <span className="bg-secondary/20 text-secondary-foreground rounded-full px-2 py-1 text-xs">
                      {result.word.grammatical_form}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t p-2">
            {/* TODO: view all results */}
            <Link
              className="text-primary w-full py-2 text-center text-sm hover:underline"
              href={`/koraga/words?search=${searchString}`}
            >
              View all results
            </Link>
          </div>
        </div>
      )}

      {searchString && filteredResults.length === 0 && !timeoutRef.current && (
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
