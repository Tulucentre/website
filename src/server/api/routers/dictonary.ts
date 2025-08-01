import { getDictionaryCache, getUniqueNumber } from "~/server/utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { CacheKeys, getCache, setCache } from "~/lib/cache";
import { type Word, type WordOfTheDay } from "~/lib/types";
import { z } from "zod";
import { filterUniqueWords } from "~/lib/utils";

export const dictonaryRouter = createTRPCRouter({
  getWordOfTheDay: publicProcedure.query(async () => {
    const vocab = await getDictionaryCache();
    const previousWOTD = getCache<WordOfTheDay>(CacheKeys.WORD_OF_THE_DAY);

    if (vocab === null || vocab.length === 0) {
      return {
        code: "NOT_FOUND",
        message: "No vocabulary data found",
      };
    }

    if (previousWOTD === null || previousWOTD.values.length === 0) {
      const wotdIndex = getUniqueNumber([], vocab.length);
      const word = vocab[wotdIndex];
      setCache(
        CacheKeys.WORD_OF_THE_DAY,
        {
          word: word,
          days: 30,
          values: [wotdIndex],
        },
        14 * 24 * 60 * 60 * 1000,
      );
    } else if (previousWOTD.days === 0) {
      const wotdIndex = getUniqueNumber(previousWOTD.values, vocab.length);
      const word = vocab[wotdIndex];
      setCache(
        CacheKeys.WORD_OF_THE_DAY,
        {
          word: word,
          days: 30,
          values: [wotdIndex],
        },
        14 * 24 * 60 * 60 * 1000,
      );
    }

    const word = getCache<WordOfTheDay>(CacheKeys.WORD_OF_THE_DAY);

    if (word === null) {
      return {
        code: "NOT_FOUND",
        message: "Word of the day not found",
      };
    }

    return {
      code: "SUCCESS",
      data: word.word,
      message: "Word of the day retrieved successfully",
    };
  }),

  popularSearch: publicProcedure.query(async ({ ctx }) => {
    try {
      const activeSnap = await ctx.db.snapshot.findFirst({
        where: {
          status: true,
        },
      });

      if (activeSnap === null) {
        return {
          code: "NOT_FOUND",
          message: "No active snapshot found",
          data: [],
        };
      }

      const dbData = await ctx.db.word.findMany({
        take: 10,
        where: {
          snapshotId: activeSnap?.id,
        },
        orderBy: {
          count: "desc",
        },
      });

      return {
        code: "SUCCESS",
        message: "Popular search retrieved successfully",
        data: dbData as Array<Word>,
      };
    } catch (error) {
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch popular search",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  getWordList: publicProcedure
    .input(
      z.object({
        alpha: z.string().nullable(),
        search: z.string().nullable(),
      }),
    )
    .query(
      async ({
        input,
      }): Promise<{
        code: "SUCCESS" | "NOT_FOUND" | "FAILED";
        message: string;
        data: Array<{
          name: string;
          id: string;
          word: Word;
        }>;
      }> => {
        const vocab = await getDictionaryCache();

        if (vocab === null || vocab.length === 0) {
          return {
            code: "NOT_FOUND",
            message: "No vocabulary data found",
            data: [],
          };
        }

        const data = filterUniqueWords(vocab).sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        if (input.search) {
          const searchTerm = input.search.toLowerCase();
          const filteredData = data.filter((word) =>
            word.name.toLowerCase().includes(searchTerm),
          );

          if (filteredData.length === 0) {
            return {
              code: "NOT_FOUND",
              message: "No matching words found",
              data: [],
            };
          }

          return {
            code: "SUCCESS",
            message: "Vocabulary data retrieved successfully",
            data: data.filter((word) =>
              word.name.toLowerCase().includes(searchTerm),
            ),
          };
        }

        if (input.alpha === null || input.alpha === "all") {
          return {
            code: "SUCCESS",
            message: "Vocabulary data retrieved successfully",
            data: data,
          };
        }

        if (input.alpha === "special") {
          const specialWords = data.filter((word) => {
            return /^[^a-zA-Z]/.test(word.name);
          });

          if (specialWords.length === 0) {
            return {
              code: "NOT_FOUND",
              message: "No special words found",
              data: [],
            };
          }
          return {
            code: "SUCCESS",
            message: "Vocabulary data retrieved successfully",
            data: specialWords,
          };
        }

        const filteredData = data.filter((word) => {
          return input.alpha !== null
            ? word.name.toLowerCase().startsWith(input.alpha.toLowerCase())
            : false;
        });

        if (filteredData.length > 0) {
          return {
            code: "SUCCESS",
            message: "Vocabulary data retrieved successfully",
            data: filteredData,
          };
        }

        return {
          code: "NOT_FOUND",
          message: "No matching words found",
          data: [],
        };
      },
    ),
});
