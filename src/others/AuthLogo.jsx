import React from "react";

export default function AuthLogo() {
  return (
    <svg
      className="h-[700px] w-auto"
      width="664"
      height="752"
      viewBox="0 0 664 752"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Linear Gradient - Black to Gray */}
        <linearGradient
          id="paint0_linear_logo"
          x1="50"
          y1="376"
          x2="614"
          y2="376"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.42" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#666666" />
        </linearGradient>

        {/* Radial Gradient for Stroke - White Glow */}
        <radialGradient
          id="paint1_radial_logo"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(700 180) rotate(174.364) scale(763.771 576.251)"
        >
          <stop offset="0.0637346" stopColor="white" stopOpacity="0.9" />
          <stop offset="0.295223" stopColor="white" stopOpacity="0.120432" />
          <stop offset="0.728819" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Inner Shadow Filter */}
        <filter
          id="filter0_i_logo"
          x="0"
          y="0"
          width="664"
          height="752"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_logo"
          />
        </filter>
      </defs>

      {/* Filled paths */}
      <g filter="url(#filter0_i_logo)">
        <path
          fill="url(#paint0_linear_logo)"
          d="M31.48 502.68 273.68 395.68l139.4 80.24 28.16 263.32-171.8-1.4 25.36-183.08-29.6-16.88-145 112.68-88.72-147.88Z"
        />
        <path
          fill="url(#paint0_linear_logo)"
          d="M428.56 464.64l214.08 156.32 84.48-150.68-171.8-69v-33.8l171.8-70.4-84.48-149.28-214.08 156.32v160.52Z"
        />
        <path
          fill="url(#paint0_linear_logo)"
          d="M413.08 291.44l28.16-263.32-171.8 2.8 25.36 183.08-29.6 16.88-146.4-112.64L31.44 264.68l242.2 107.04 139.4-80.28Z"
        />
      </g>

      {/* Stroked paths */}
      <path
        d="M31.48 502.68 273.68 395.68l139.4 80.24 28.16 263.32-171.8-1.4 25.36-183.08-29.6-16.88-145 112.68-88.72-147.88Z"
        stroke="url(#paint1_radial_logo)"
        strokeOpacity="0.6"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M428.56 464.64l214.08 156.32 84.48-150.68-171.8-69v-33.8l171.8-70.4-84.48-149.28-214.08 156.32v160.52Z"
        stroke="url(#paint1_radial_logo)"
        strokeOpacity="0.6"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M413.08 291.44l28.16-263.32-171.8 2.8 25.36 183.08-29.6 16.88-146.4-112.64L31.44 264.68l242.2 107.04 139.4-80.28Z"
        stroke="url(#paint1_radial_logo)"
        strokeOpacity="0.6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
