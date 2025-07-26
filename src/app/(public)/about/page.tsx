"use client";

import { useRef } from "react";
import Image from "next/image";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import config from "~/lib/about.json";

export default function AboutPage() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-2" : ""}>
          {paragraph}
        </p>
      ));
    }
    return <p>{content}</p>;
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-primary font-aref-ruqaa mb-6 text-5xl font-bold md:text-6xl">
            {config.content.title}
          </h1>
          <div className="bg-primary mx-auto mb-8 h-1 w-24"></div>
        </div>

        {/* Introduction */}
        <div className="relative mb-16">
          <div className="relative z-10 rounded-lg bg-white px-8 sm:px-20 lg:px-28 xl:px-40">
            <p className="z-10 text-justify text-lg leading-relaxed font-semibold text-gray-900 lg:text-center">
              {config.content.introduction.paragraph1}
            </p>
            <p className="mt-4 text-justify text-lg leading-relaxed font-semibold text-gray-700 lg:text-center">
              {config.content.introduction.paragraph2}
            </p>
          </div>

          {/* Decorative Images */}
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute -top-[45px] -right-[550px] z-0 mt-8 hidden w-full scale-[0.2] rotate-90 xl:block"
          />
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute -top-[45px] -left-[550px] z-0 mt-8 hidden w-full scale-[0.2] -rotate-90 xl:block"
          />
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute -top-[290px] -right-[510px] z-0 mt-8 hidden w-full scale-[0.1] rotate-90 xl:block"
          />
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute -top-[290px] -left-[510px] z-0 mt-8 hidden w-full scale-[0.1] -rotate-90 xl:block"
          />
        </div>

        {/* Dr. K. R. Shetty Centre Section */}
        <div className="border-primary mb-16 rounded-lg border-[1px] bg-white p-8 shadow-2xl">
          <h2 className="text-primary font-aref-ruqaa mb-6 text-4xl font-bold">
            Dr. K. R. Shetty Centre for Tulu Studies
          </h2>
          <p className="mb-6 text-justify text-lg leading-relaxed text-gray-700">
            Nitte DU renamed it&apos;s Centre for Tulu studies as the Dr. K. R.
            Shetty Centre for Tulu Studies, in honour of late Dr. K. R. Shetty,
            a renowned neurologist from Mangalore who envisioned the creation of
            Tulu Studies at the university. The centre&apos;s mission is to
            contribute to the academic growth of Nitte DU and to serve as a
            cultural hub dedicated to preserving and celebrating the rich
            heritage of the Tulu-speaking community. The centre aims to promote
            and safeguard the Tulu language and culture, advance research,
            celebrate Tulu festivals, foster cultural exchanges, and offer
            academic programs at various levels.
          </p>
        </div>

        {/* Objectives Section */}
        <div className="mb-16">
          <h3 className="text-primary font-aref-ruqaa mb-12 ml-10 text-4xl font-bold">
            Objectives
          </h3>
          <Accordion type="single" collapsible>
            {config.content.objectives.map((objective) => (
              <AccordionItem key={objective.id} value={objective.id}>
                <AccordionTrigger>{objective.title}</AccordionTrigger>
                <AccordionContent>
                  {renderContent(objective.content)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Publications Section */}
        <div className="mx-10 mb-16">
          <h2 className="text-primary font-aref-ruqaa mb-8 text-4xl font-bold">
            Publications
          </h2>
          <div className="grid gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {config.content.publications.map((pub, index) => (
              <div
                key={index}
                className="border-primary rounded-lg border-2 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <h3 className="text-primary mb-2 text-xl font-semibold">
                  {pub.title}
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Published: {pub.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Human Resources Section */}
        <div className="border-primary mb-16 rounded-lg border-[1px] bg-white p-8 shadow-2xl">
          <h2 className="text-primary font-aref-ruqaa mb-6 text-4xl font-bold">
            Human Resources at Dr. K. R. Shetty Centre for Tulu Studies
          </h2>
          <p className="mb-6 text-justify text-lg leading-relaxed text-gray-700">
            The centre is staffed by a full-time coordinator, an expert in Tulu
            language, history, and cultural studies, who holds a Ph.D. in Tulu.
            Additionally, a project assistant is employed for the Kodava
            Project. A team of translators trained at this centre is working on
            Tamil to Tulu Translation projects with commitment and passion.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="relative mx-10 w-full">
          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-6 z-10 -translate-y-1/2 transform"
          >
            <SquareChevronRight className="h-10 w-10 scale-125 text-white transition-all duration-100 hover:scale-[1.4]" />
          </button>

          {/* Scrollable Image Container */}
          <div
            ref={scrollContainer}
            className="scrollbar-hide flex h-[380px] w-full gap-x-7 overflow-x-auto pt-5 pb-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Object.entries(config.images.aboutImages).map(([key, src]) => (
              <Image
                key={key}
                src={src || "/placeholder.svg"}
                alt="Tulucentre Team"
                width={300}
                height={350}
                className="mb-4 w-auto rounded-lg shadow-md transition-all duration-500 ease-in-out hover:scale-110"
              />
            ))}
          </div>

          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -left-12 z-10 -translate-y-1/2 transform"
          >
            <SquareChevronLeft className="text-primary h-10 w-10 scale-125 transition-all duration-100 hover:scale-[1.4]" />
          </button>
        </div>

        {/* Facilities Section */}
        <div className="mb-16 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-primary font-aref-ruqaa mb-6 text-4xl font-bold">
            Facilities
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {config.content.facilities.map((facility, index) => (
              <div key={index} className="rounded-lg bg-gray-100 p-6">
                <h3 className="mb-2 text-xl font-semibold">{facility.title}</h3>
                <p className="text-gray-700">{facility.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 font-semibold text-gray-500">
            <p>
              Students, researchers and interested people from both within and
              outside the university and the university guests visit the centre
              to explore its collections and receive expert guidance.
            </p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="relative">
          <p className="text-primary relative z-10 mx-8 text-center text-lg font-bold lg:mx-20 lg:text-2xl">
            In conclusion, the Dr. K. R. Shetty Centre for Tulu Studies is a
            vital institution in preserving and promoting Tulu and other local
            languages, culture, and heritage. Through its initiatives in
            research, education, and cultural exchange, the centre plays an
            essential role in the academic and cultural landscape of Nitte DU
            and beyond.
          </p>
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute -right-[570px] bottom-[35px] z-0 mt-8 hidden w-full scale-[0.1] rotate-90 xl:block"
          />
          <Image
            src={config.images.design || "/placeholder.svg"}
            alt="Design"
            width={500}
            height={500}
            className="absolute bottom-[35px] -left-[570px] z-0 mt-8 hidden w-full scale-[0.1] -rotate-90 xl:block"
          />
        </div>
      </div>

      <style jsx>{`
        .font-aref-ruqaa {
          font-family: "Aref Ruqaa", serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
          .text-4xl {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
