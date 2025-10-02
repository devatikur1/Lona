import React from 'react'

export default function Footer() {
  return (
    <div className="flex w-full h-[10px] justify-center items-center mb-1">
      <div class="pb-3">
        <p>
          <span class="text-[#acaaaa] text-[0.45rem] md:text-[0.5rem] xl:text-xs">
            By continuing, you agree to Lona's and
          </span>{" "}
          <span class="text-[0.45rem] md:text-[0.5rem] xl:text-xs underline">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
