import React from "react";
import WordSearch from "../_components/wordSearch/wordSearch";
import WordOfTheDay from "../_components/wotd/wordOfTheDay";
import { api } from "~/trpc/server";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <div className="h-full w-full bg-[url(/images/background.svg)] pt-14">
        <HeadingAndSearch />
        <About />
        <BrowseMore />
      </div>
    </section>
  );
}

async function HeadingAndSearch() {
  const wordOfTheDay = await api.dictonary.getWordOfTheDay();

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

function About() {
  return (
    <div className="relative mt-4 flex flex-col pb-10">
      {/* Top decorative element */}
      <div className="to-secondary ml-auto h-10 w-1/2 rounded-bl-full bg-gradient-to-l from-transparent md:h-14 lg:h-16"></div>

      <div className="mb-6 flex flex-row flex-nowrap">
        {/* Left decorative bar */}
        <div className="to-primary from-secondary h-full min-h-96 w-8 rounded-tr-full rounded-br-full bg-gradient-to-b to-[50%] md:w-10 lg:w-14"></div>

        {/* Main content area */}
        <div className="grid w-full grid-cols-1 justify-around gap-8 p-4 md:flex-row md:items-center lg:grid-cols-2">
          {/* Text content */}
          <div className="flex-1 px-4 pl-10">
            <header className="text-primary mb-8 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-2xl font-bold md:text-4xl">
              About Us
            </header>
            <p className="max-w-3xl text-justify leading-relaxed text-gray-700 md:text-lg">
              Welcome to the{" "}
              <span className="font-semibold text-blue-700">
                Koraga Dictionary
              </span>
              , your go-to resource for exploring the rich and diverse
              vocabulary of the Tulu language. Our mission is to provide an
              accurate and comprehensive dictionary that helps you understand
              and appreciate the beauty of Tulu words and their meanings.
              Whether you are a native speaker, a language enthusiast, or a
              curious learner, our dictionary is designed to cater to your
              needs. We continuously update our database to ensure that you have
              access to the most current and relevant information. Join us in
              preserving and promoting the Tulu language by sharing your
              feedback and suggestions. Together, we can keep this linguistic
              heritage alive for future generations.
            </p>
          </div>

          {/* Enhanced image section */}
          <div className="relative mx-auto mt-4 w-full max-w-md md:mt-0 md:max-w-lg lg:max-w-xl">
            {/* Decorative background elements */}
            <div className="from-primary to-secondary absolute -inset-4 rounded-2xl bg-gradient-to-br opacity-30 blur-sm"></div>
            <div className="from-secondary to-primary absolute -inset-2 rounded-xl bg-gradient-to-tr opacity-20"></div>

            {/* Image container with enhanced styling */}
            <div className="group relative">
              <div className="from-primary to-secondary absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
              <Image
                src="/images/about-images/img1.jpg"
                width={480}
                height={320}
                className="relative z-10 h-auto w-full rounded-xl border-4 border-white object-cover shadow-2xl transition-transform duration-300"
                alt="Tulucentre Team"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                priority
              />

              {/* Decorative corner elements */}
              <div className="bg-secondary absolute -top-2 -left-2 h-6 w-6 rounded-full opacity-80"></div>
              <div className="bg-primary absolute -right-2 -bottom-2 h-4 w-4 rounded-full opacity-80"></div>
              <div className="bg-scondary absolute top-4 -right-3 h-3 w-3 rounded-full opacity-60"></div>
            </div>

            {/* Image caption/label */}
            <div className="mt-4 text-center">
              <p className="text-primary inline-block rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm font-medium">
                Our Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mr-auto h-8 w-1/3 rounded-tr-full bg-gradient-to-r from-transparent to-blue-200 md:h-10 lg:h-12"></div>
    </div>
  );
}

function BrowseMore() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-aref-ruqaa text-primary mb-12 text-center text-3xl font-bold md:text-4xl">
          Browse Dictionary
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {"#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((alpha, idx) => (
            <Link
              key={idx}
              href={`/words?alpha=${alpha === "#" ? "all" : alpha.toLowerCase()}`}
              className="border-primary text-primary hover:bg-primary flex size-12 items-center justify-center rounded-full border-2 bg-white font-bold shadow transition-colors duration-200 hover:text-white hover:shadow-lg"
              aria-label={`Browse words starting with ${alpha === "#" ? "all letters" : alpha}`}
              style={{ aspectRatio: "1 / 1" }}
            >
              {alpha}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
