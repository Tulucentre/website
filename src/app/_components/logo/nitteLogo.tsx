import React from "react";
import { cn } from "~/lib/utils";

export default function NitteLogo({
  className,
  fill,
}: {
  className: string | null;
  fill: string;
}) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlSpace="preserve"
        className={cn("z-10", className)}
      >
        <g transform="matrix(1.26 0 0 1.26 289.73 300.17)">
          <g style={{}}>
            <g transform="matrix(6.89 0 0 6.89 8.84 0.03)">
              <polygon
                fill={fill}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fillRule: "evenodd",
                  opacity: 1,
                }}
                points="-15.1,-17.05 -8.2,-17.05 7.7,3.95 7.7,-17.05 15.1,-17.05 15.1,17.05 10.2,16.95 "
              />
            </g>
            <g transform="matrix(6.89 0 0 6.89 -70.05 29.65)">
              <polygon
                fill={fill}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fillRule: "evenodd",
                  opacity: 1,
                }}
                points="3.65,-2.75 3.65,12.75 -3.65,12.75 -3.65,-12.75 "
              />
            </g>
            <g transform="matrix(6.89 0 0 6.89 -43.52 23.8)">
              <path
                fill={fill}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fillRule: "evenodd",
                  opacity: 1,
                }}
                transform=" translate(-21.4, -37.8)"
                d="M 39.4 60.4 c -3.2 1.6 -6.7 2.5 -10.5 2.5 c -13 0 -23.5 -10.5 -23.5 -23.5 v -25 L 0 7 v 32.7 c 0 16 12.9 28.9 28.9 28.9 c 5 0 9.8 -1.3 13.9 -3.6 L 39.4 60.4 z"
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(6.89 0 0 6.89 12.64 -22.37)">
              <path
                fill={fill}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fillRule: "evenodd",
                  opacity: 1,
                }}
                transform=" translate(-29.55, -31.1)"
                d="M 1.3 0 l 4.2 5.8 h 46.8 v 33.6 c 0 7.3 -3.4 13.9 -8.6 18.2 l 3.4 4.6 c 6.5 -5.3 10.7 -13.4 10.7 -22.4 V 0 H 1.3 z"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
