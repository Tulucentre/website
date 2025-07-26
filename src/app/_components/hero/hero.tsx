import { api } from "~/trpc/server";
import WordSearch from "../wordSearch/wordSearch";
import WordOfTheDay from "../wotd/wordOfTheDay";

export async function HeadingAndSearch() {
  const wordOfTheDay = await api.dictonary.getWordOfTheDay();

  return (
    <div className="z-0 flex min-h-screen flex-col pt-14">
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
        {wordOfTheDay.code === "SUCCESS" && wordOfTheDay.data ? (
          <>
            <WordOfTheDay wotd={wordOfTheDay.data} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-red-300 bg-red-50 p-6 shadow-md">
            <svg
              className="mb-2 h-8 w-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            <p className="text-center text-lg font-semibold text-red-600">
              Word of the Day not available
            </p>
            <span className="mt-2 text-sm text-red-400">
              Please try again later.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
