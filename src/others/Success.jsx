import React from "react";

export default function Success({ className = "w-12 h-12" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      role="img"
      aria-label="Success"
    >
      <style>
        {`
          .circle {
            fill: none;
            stroke: #10B981;
            stroke-width: 2.8;
            stroke-linecap: round;
            stroke-linejoin: round;
            transform-origin: 24px 24px;
            animation: pop 0.28s ease-out both;
          }
          .tick {
            fill: none;
            stroke: #047857;
            stroke-width: 3.6;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 30;
            stroke-dashoffset: 30;
            animation: draw 0.45s 0.12s ease-out forwards;
          }
          @keyframes draw { to { stroke-dashoffset: 0; } }
          @keyframes pop { 
            0% { transform: scale(0.8); opacity: 0 } 
            60% { transform: scale(1.05); opacity: 1 } 
            100% { transform: scale(1); } 
          }
        `}
      </style>

      {/* circular border */}
      <circle className="circle" cx="24" cy="24" r="14.2"></circle>
      {/* check mark */}
      <path className="tick" d="M17 24.5l4.2 4.2L31 18"></path>
    </svg>
  );
}
