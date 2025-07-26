import React from "react";
// import { headers } from "next/headers";
import { Separator } from "~/components/ui/separator";
import { links } from "~/lib/constants";
import { navItems } from "../navbar/navitems";
import Link from "next/link";
import NitteLogo from "../logo/nitteLogo";

export default async function Footer() {
  // const pathname = (await headers()).get("x-nextjs-page") ?? "/";
  const year = new Date().getFullYear();

  return (
    <>
      <div
        className={`to-primary h-10 bg-gradient-to-b from-transparent`}
      ></div>
      <footer className="non-drawer flex w-full flex-col items-center">
        <div className="bg-primary text-background h-auto w-full py-5">
          <div className="my-5 flex w-full flex-col items-center justify-around gap-8 lg:flex-row lg:items-start lg:gap-0">
            <div>
              <span className="hidden text-2xl font-semibold lg:block">
                Quick Links
              </span>
              <ul className="mt-6 flex flex-row flex-wrap justify-center gap-x-8 gap-y-3 px-6 font-semibold lg:flex-col lg:gap-3 lg:px-0 lg:font-normal">
                {navItems.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://nitte.edu.in/"
                    target="_blank"
                    rel="external"
                    referrerPolicy="no-referrer"
                  >
                    Nitte University
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <span className="hidden text-2xl font-semibold lg:block">
                Social Media{" "}
              </span>
              <ul className="mt-6 flex flex-row gap-x-6 lg:gap-3">
                <Link
                  href={links.facebook}
                  target="_blank"
                  rel="external"
                  referrerPolicy="no-referrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M23 2v20h-1v1h-8v-8h2v-1h1v-2h-3V9h1V8h2V5h-4v1h-2v2h-1v4H7v3h3v8H2v-1H1V2h1V1h20v1z"
                    />
                  </svg>
                </Link>
                <Link
                  href={links.twitter}
                  target="_blank"
                  rel="external"
                  referrerPolicy="no-referrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
                    />
                  </svg>
                </Link>
                <Link
                  href={links.whatsapp}
                  target="_blank"
                  rel="external"
                  referrerPolicy="no-referrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                    />
                  </svg>
                </Link>
              </ul>
            </div>
            <div>
              <span className="hidden pl-2 text-2xl font-semibold lg:block">
                Contact us
              </span>
              <div className="flex flex-row pt-6">
                <NitteLogo
                  fill="white"
                  className="mt-1 hidden size-20 sm:block"
                />
                <address className="flex flex-col items-center pl-2 text-center leading-5 text-nowrap sm:block sm:text-left">
                  6th Floor, University Enclave,
                  <br />
                  Medical Sciences Complex,
                  <br />
                  Deralakatte, Mangaluru - 575018
                  <br />
                  Karnataka, India
                  <br />
                  <Link
                    href={`tel:${links.phone}`}
                    className="flex justify-start gap-1 align-middle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"
                      />
                    </svg>
                    {links.phone}
                  </Link>
                </address>
              </div>
            </div>
          </div>
          <div className="px-4">
            <Separator className="mx-auto mt-10 w-auto max-w-xl" />
          </div>
          <div className="pt-3 text-center leading-5 font-[0.8rem] text-wrap opacity-70">
            © {year} Koraga Dictionary | Made with <span>&#10084;</span> by
            Nitte Students
          </div>
        </div>
      </footer>
    </>
  );
}
