import React from 'react'

export default function Error() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Error"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`.circle{fill:none;stroke:#F87171;stroke-width:2.5;transform-origin:24px 24px;animation:shake 0.42s ease-in-out both}.cross{fill:none;stroke:#DC2626;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30;animation:drawX 0.36s ease-out forwards;animation-delay:0.06s}@keyframes drawX{to{stroke-dashoffset:0}}@keyframes shake{0%{transform:scale(.95);opacity:0}60%{transform:scale(1.03);opacity:1}100%{transform:scale(1)}}`}</style>
      {/* <rect x="0" y="0" width="48" height="48" rx="12" fill="#FEF2F2" /> */}
      <circle className="circle" cx="24" cy="24" r="14.2" />
      <g className="cross">
        <path d="M18.5 18.5L29.5 29.5" />
        <path d="M29.5 18.5L18.5 29.5" />
      </g>
    </svg>
  );
}
