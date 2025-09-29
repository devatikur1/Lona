import React from "react";
import { Link } from "react-router-dom";

export default function GuestHeader() {

  return (
    <header
      style={{ filter: "drop-shadow(0 2px 2px #080808)" }}
      className="w-full relative select-none h-[70px] bg-[#080808]"
    >
      <nav className="w-full flex justify-between items-center px-2 py-2 cursor-pointer h-full">
        {/* Website name */}
        <section className="flex items-center px-3 gap-1.5">
          <Link to={"/"}>
            <div
              className="px-4 py-1.5 rounded-xl 
                        bg-transparent border border-transparent 
                        hover:bg-[#0d0d0d] hover:border-[#252525] 
                        transition-colors duration-300 ease-in-out
                        flex items-center gap-3"
            >
              <span className="text-[1.7rem] md:text-[2rem] lg:text-[2.3rem] leading-none font-medium">
                lonas
              </span>
            </div>
          </Link>
        </section>

        {/* Dropdown show/unshow btn */}
        <div
          className="px-2 py-1 rounded-xl 
                        bg-transparent border border-transparent 
                        hover:bg-[#0d0d0d] hover:border-[#252525]
                        transition-colors duration-300 ease-in-out"
        ></div>
      </nav>
    </header>
  );
}
