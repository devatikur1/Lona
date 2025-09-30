import React from "react";

export default function Loader() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Loading"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}} .g{transform-origin:12px 12px;animation:spin 1.4s linear infinite}.track{stroke:rgba(34,197,94,0.18);stroke-width:2.5;fill:none}.arc{stroke:#22c55e;stroke-width:2.5;stroke-linecap:round;fill:none;}`}</style>
      <g className="g">
        <circle className="track" cx="12" cy="12" r="11" />
        <circle
          className="arc"
          cx="12"
          cy="12"
          r="11"
          strokeDasharray="69.115"
        />
      </g>
    </svg>
  );
}
