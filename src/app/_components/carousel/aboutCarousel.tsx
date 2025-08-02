"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Image from "next/image";

export default function AboutCarousel({
  images,
}: {
  images: Record<string, string>;
}) {
  return (
    <div className="mb-16">
      <h2 className="text-primary font-aref-ruqaa mb-8 text-center text-4xl font-bold">
        Gallery
      </h2>
      <Carousel
        className="mx-auto w-full"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Object.entries(images).map(([key, src]) => (
            <CarouselItem
              key={key}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md">
                <Image
                  src={
                    src ||
                    "/placeholder.svg?height=320&width=240&query=Tulu Centre Team"
                  }
                  alt="Tulu Centre Team"
                  width={400}
                  height={320}
                  className="h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
