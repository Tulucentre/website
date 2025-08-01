import Navbar from "./_components/navbar/navbar";
import Feedback from "./_components/feedback/feedback";
import Footer from "./_components/footer/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Feedback />
      <main className="min-h-screen min-w-screen">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
          <p className="mb-6 text-lg">
            The page you are looking for does not exist.
          </p>
          <a href="/koraga" className="text-blue-500 hover:underline">
            Go back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
