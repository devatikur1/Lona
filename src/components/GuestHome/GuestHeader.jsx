import { User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function GuestHeader() {
  return (
    <header
      style={{ filter: "drop-shadow(0 2px 2px #080808)" }}
      className="w-full relative select-none h-[70px] bg-[#080808]"
    >
      <nav className="w-full flex justify-between items-center px-2 py-1 cursor-pointer h-full">
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
              <span className="text-[1.7rem] md:text-[1.8rem] lg:text-[2rem] leading-none font-medium">
                lonas
              </span>
            </div>
          </Link>
        </section>

        {/* Dropdown show/unshow btn */}
        <div className="flex gap-3">
          <Link
            to={"/account/sign-up"}
            style={{ padding: "4px 9px" }}
            className="flex justify-center items-center gap-1 rounded-full bg-[#f9f8f6] border-[#252525]"
          >
            <User color="#252525" size={17} />
            <span className="text-[.8rem] md:text-[0.98rem] text-[#252525] font-light leading-none">
              Sign up
            </span>
          </Link>

          <Link
            to={"/account/sign-in"}
            style={{ padding: "5px 12px" }}
            className="hidden md:flex justify-center items-center gap-1 rounded-full bg-[#0d0d0d] border border-[#252525] "
          >
            <span className="text-[0.98rem] font-light leading-none">
              Sign in
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
