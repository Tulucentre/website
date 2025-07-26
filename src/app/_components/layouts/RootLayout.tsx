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
        {/* TODO: update min height */}
        <main className="min-h-[150vh] min-w-screen">
          <Navbar />
          <Feedback />
          {children}
          <Footer />
        </main>
      </HydrateClient>
    </>
  );
}
