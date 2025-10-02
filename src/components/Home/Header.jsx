import React, { useContext, useEffect, useRef, useState } from "react";
import { Ellipsis, MenuIcon } from "lucide-react";
import Option from "./header/Option";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const buttonRef = useRef(null);
  const optionRef = useRef(null);

  const { setShowHeader } = useContext(AppContext);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      style={{ filter: "drop-shadow(0 2px 2px #080808)" }}
      className="w-full select-none h-[70px] bg-[#080808]"
    >
      <nav className="relative w-full flex justify-between items-center px-2 py-2 cursor-pointer h-full">
        {/* Website name */}
        <section className="flex items-center px-3 gap-1.5">
          <div
            className="flex md:hidden"
            onClick={() => setShowHeader((prev) => !prev)}
          >
            <MenuIcon size={23} />
          </div>
          <Link to={"/"}>
            <div
              className="px-4 py-1.5 rounded-xl 
                        bg-transparent border border-transparent 
                        hover:bg-[#0d0d0d]
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
        <div
          className="px-2 py-1 rounded-xl 
                        bg-transparent border border-transparent 
                        hover:bg-[#0d0d0d] hover:border-[#252525]
                        transition-colors duration-300 ease-in-out"
        >
          <span onClick={() => setShowOption((prev) => !prev)} ref={buttonRef}>
            <Ellipsis size={23} />
          </span>
        </div>

        {/* Dropdown Option Box */}
        <Option showOption={showOption} optionRef={optionRef} />
      </nav>
    </header>
  );
}
