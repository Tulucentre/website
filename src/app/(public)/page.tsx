import React from "react";
import { HeadingAndSearch } from "~/app/_components/hero/hero";
import { AboutHome } from "~/app/_components/about/homeAbout";
import { BrowseMore } from "~/app/_components/filter/browseMore";
import PopularList from "~/app/_components/popular/popular";

export default function Home() {
  return (
    <section>
      <div className="h-full w-full bg-[url(/koraga/images/background.svg)]">
        <HeadingAndSearch />
        <PopularList />
      </div>
      <div>
        <AboutHome />
        <BrowseMore />
      </div>
    </section>
  );
}
