import { HydrateClient } from "~/trpc/server";
import Navbar from "../navbar/navbar";
import { ReactScan } from "../reactscan";
import Feedback from "../feedback/feedback";
import Footer from "../footer/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HydrateClient>
        <ReactScan />
        <Navbar />
        <Feedback />
        <main className="min-h-screen min-w-screen">{children}</main>
        <Footer />
      </HydrateClient>
    </>
  );
}
