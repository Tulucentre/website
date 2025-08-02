import React from "react";

export default function RootPage() {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center px-4 text-center">
        <span className="text-xl font-semibold">
          The entire website has moved to{" "}
          <a href="/koraga" className="text-blue-600 underline">
            /koraga
          </a>
          .
        </span>
      </div>
    </div>
  );
}
