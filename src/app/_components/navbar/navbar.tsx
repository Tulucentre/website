"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { navItems } from "./navitems";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollUp = () => {
    const fontSize = window.innerWidth >= 1024 ? "1.25rem" : "1.042rem";
    const navHeight =
      window.innerWidth >= 1024
        ? "5rem"
        : window.innerWidth >= 768
          ? "4.5rem"
          : window.innerWidth >= 640
            ? "4rem"
            : "3.5rem";
    const logoHeight =
      window.innerWidth >= 1024
        ? "2.5rem"
        : window.innerWidth >= 768
          ? "2.1875rem"
          : window.innerWidth >= 640
            ? "1.875rem"
            : "1.5625rem";

    gsap.to("nav", {
      height: navHeight,
      backgroundColor: "hsla(46 93% 47% 0.5)",
    });
    gsap.to("#logo", { height: logoHeight });
    gsap.to("#nav-items > li", { fontSize: fontSize });

    const nav = document.getElementsByTagName("nav")[0];
    if (nav) {
      nav.classList.add("backdrop-blur-3xl");
    }
  };

  const scrollDown = () => {
    const fontSize = window.innerWidth >= 1024 ? "1.5rem" : "1.25rem";
    const navHeight =
      window.innerWidth >= 1024
        ? "10rem"
        : window.innerWidth >= 768
          ? "9rem"
          : window.innerWidth >= 640
            ? "8rem"
            : "7rem";
    const logoHeight =
      window.innerWidth >= 1024
        ? "4rem"
        : window.innerWidth >= 768
          ? "3.5rem"
          : window.innerWidth >= 640
            ? "3rem"
            : "2.5rem";

    gsap.to("nav", {
      height: navHeight,
      backgroundColor: "rgba(255 255 255 0)",
    });
    gsap.to("#logo", { height: logoHeight });
    gsap.to("#nav-items > li", { fontSize: fontSize });

    const nav = document.getElementsByTagName("nav")[0];
    if (nav) {
      nav.classList.remove("backdrop-blur-3xl");
    }
  };

  useEffect(() => {
    setIsScrolled(window.scrollY > 50);
    window.onscroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      if (isScrolled) scrollUp();
      else scrollDown();
    } else {
      scrollUp();
    }
  }, [pathname, isScrolled]);

  useEffect(() => {
    if (isSidebarOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex h-auto w-full justify-center px-4">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/nitte-university.svg"}
              className="h-10 w-fit sm:h-12 md:h-14 lg:h-16"
              id="logo"
              height={400}
              width={400}
              alt="Nitte Deemed to be University"
            />
          </Link>
          <ul
            id="nav-items"
            className="text-primary hidden flex-row gap-5 text-xl font-semibold lg:flex"
          >
            {navItems.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`rounded-3xl border-2 px-2 transition-colors duration-500 ease-in-out md:text-xl lg:text-2xl ${isScrolled ? "hover:border-primary border-none" : "hover:border-primary hover:bg-secondary hover:text-primary border-none"}`}
                >
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            })}
            <li
              className={`bg-primary text-secondary hover:bg-secondary hover:border-primary hover:text-primary rounded-3xl border-2 border-transparent px-4 pb-0.5 transition-colors duration-500 ease-in-out md:text-xl lg:text-2xl`}
            >
              - Koraga -
            </li>
          </ul>
          {isSidebarOpen ? (
            <></>
          ) : (
            <Menu
              onClick={() => setIsSidebarOpen((val) => !val)}
              className="stroke-primary size-8 lg:hidden"
            />
          )}
        </div>
      </nav>
      <SideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      {/* Space top */}
      <div className="h-20 md:h-24 lg:h-28"></div>
    </>
  );
}

function SideBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`bg-primary fixed top-0 right-0 z-50 h-screen w-72 transform border-l-2 border-none transition-transform duration-500 ease-in-out md:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      onBlur={() => setOpen(false)}
    >
      <div className="flex h-full flex-col items-end">
        <X
          className="stroke-secondary absolute top-6 right-6 size-7"
          onClick={() => setOpen(false)}
        />
        <ul className="mt-20 flex h-auto min-h-[30rem] w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-white">
          {/* {#each navItems as item}
				<li><a href={item.link} onclick={toggleDrawer}>{item.name}</a></li>
			{/each} */}
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.link} onClick={() => setOpen(false)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
