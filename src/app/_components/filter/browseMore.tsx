import Link from "next/link";

export function BrowseMore() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-aref-ruqaa text-primary mb-12 text-center text-3xl font-bold md:text-4xl">
          Browse Dictionary
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/koraga/words?alpha=all`}
            className="border-primary text-primary hover:bg-primary flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-white font-bold shadow transition-colors duration-200 hover:text-white hover:shadow-lg"
          >
            All
          </Link>
          <Link
            href={`/koraga/words?alpha=special`}
            className="border-primary text-primary hover:bg-primary flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-white font-bold shadow transition-colors duration-200 hover:text-white hover:shadow-lg"
          >
            #
          </Link>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((alpha, idx) => (
            <Link
              key={idx}
              href={`/koraga/words?alpha=${alpha.toLowerCase()}`}
              className="border-primary text-primary hover:bg-primary flex aspect-square size-12 items-center justify-center rounded-full border-2 bg-white font-bold shadow transition-colors duration-200 hover:text-white hover:shadow-lg"
              aria-label={`Browse words starting with ${alpha}`}
            >
              {alpha}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
