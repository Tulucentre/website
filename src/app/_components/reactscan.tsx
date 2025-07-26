"use client";
// react-scan must be imported before react
import { scan } from "react-scan";
import { type JSX, useEffect } from "react";
import { env } from "~/env";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: env.NEXT_PUBLIC_PRODUCTION !== "production",
    });
  }, []);

  return <></>;
}
