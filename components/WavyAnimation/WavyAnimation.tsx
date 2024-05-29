import React, { useMemo } from "react";
import "./WavyAnimation.scss";

export const WavyAnimation: React.FC = () => {
  const svgContent = useMemo(
    () => (
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 172, 193, 0.3)" />
            <stop offset="100%" stopColor="rgba(84, 58, 183, 0.3)" />
          </linearGradient>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(0, 172, 193, 0.3)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(0, 172, 193, 0.1)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="url(#bottomGradient)"
          />
        </g>
      </svg>
    ),
    []
  );

  return svgContent;
};
