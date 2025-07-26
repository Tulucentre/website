import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import PublicLayout from "../../_components/layouts/RootLayout";

export const metadata: Metadata = {
  title: "Tulucentre",
  description: "A comprehensive Tulu language resource",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <PublicLayout>{children}</PublicLayout>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
