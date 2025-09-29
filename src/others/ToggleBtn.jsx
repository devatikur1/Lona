import React from "react";

export default function ToggleBtn({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevrons-right rotate-180 transition-transform duration-200 ${className}`}
    >
      <path d="m6 17 5-5-5-5"></path>
      <path d="m13 17 5-5-5-5"></path>
    </svg>
  );
}
