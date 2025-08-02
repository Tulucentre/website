"use client";
import React from "react";
import gsap from "gsap";

import { MessageCircleHeart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import FeedbackForm from "./feedbackFrom";

export default function Feedback() {
  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircleHeart
          onMouseEnter={(event: React.MouseEvent<SVGSVGElement>) => {
            gsap.to(event.currentTarget, {
              scale: "1.25",
              x: -10,
              duration: 0.5,
            });
          }}
          onMouseLeave={(event: React.MouseEvent<SVGSVGElement>) => {
            gsap.to(event.currentTarget, {
              scale: "1",
              x: 0,
              duration: 0.5,
            });
          }}
          className="border-secondary bg-primary fill-primary fixed top-[40vh] right-0 z-30 size-14 rounded-l-3xl border-2 stroke-white p-3 pr-2 drop-shadow-xl md:size-16"
        >
          Feedback
        </MessageCircleHeart>
      </DialogTrigger>
      <DialogContent className="bg-secondary border-primary mx-auto w-full max-w-xl rounded-xl border px-4 py-6 shadow-2xl md:max-w-2xl md:px-8 md:py-10 lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-aref-ruqaa text-primary mx-auto flex w-full max-w-5xl items-center gap-3 text-center text-3xl font-extrabold md:text-4xl lg:text-5xl">
            <MessageCircleHeart className="stroke-primary inline-block size-8 md:size-10" />
            Feedback
          </DialogTitle>
          <div>
            <div className="mx-auto my-4 max-w-3xl text-center text-lg font-semibold text-black/80 lg:px-10 lg:text-2xl">
              Help us improve! Share your suggestions, corrections, or ideas for
              our dictionary.
            </div>
            <div className="my-4">
              <FeedbackForm />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
