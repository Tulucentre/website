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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

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
          className="border-secondary bg-primary fill-primary fixed top-[40vh] right-0 size-14 rounded-l-3xl border-2 stroke-white p-3 pr-2 drop-shadow-xl md:size-16"
        >
          Feedback
        </MessageCircleHeart>
      </DialogTrigger>
      <DialogContent
        // close="size-10 rounded-xl stroke-white hover:bg-primary bg-black"
        className="bg-secondary rounded-xl md:max-w-[40rem] lg:max-w-[50rem] xl:max-w-[80rem]"
      >
        <DialogHeader>
          <DialogTitle className="font-aref-ruqaa text-primary mx-auto w-full max-w-5xl text-4xl font-extrabold md:text-5xl">
            Feedback
          </DialogTitle>
          <DialogDescription>
            <p className="mx-auto my-4 max-w-4xl text-center text-lg font-semibold text-black lg:px-10 lg:text-2xl">
              We try to keep our dictionary up to date and accurate. If you have
              any suggestions, we are pleased to accept them.
            </p>
            <form
              method="POST"
              action="/?/globalFeedback"
              className="mx-auto h-full max-w-5xl space-y-3"
              // use:enhance
            >
              <div className="flex flex-col">
                <Label htmlFor="name" className="text-md text-left md:text-xl">
                  Name
                </Label>
                <Input
                  name="name"
                  placeholder="Name"
                  // bind:value={$formData.name}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="email" className="text-md text-left md:text-xl">
                  Email
                </Label>
                <Input
                  name="email"
                  placeholder="xyz@gmail.com"
                  // bind:value={$formData.email}
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="message"
                  className="text-md text-left md:text-xl"
                >
                  Message
                </Label>
                <Textarea
                  name="message"
                  placeholder="Type your feedback here"
                  // bind:value={$formData.message}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
