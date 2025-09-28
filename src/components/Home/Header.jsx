import React, { useEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import Option from "./header/Option";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const buttonRef = useRef(null);
  const optionRef = useRef(null);

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
    <header className="w-full relative select-none">
      <nav className="flex justify-between items-center px-4 py-2 cursor-pointer">
        {/* Website name */}
        <div
          className="px-4 py-1.5 rounded-xl 
                        bg-transparent border border-transparent 
                        hover:bg-[#0d0d0d] hover:border-[#252525] 
                        transition-colors duration-300 ease-in-out"
        >
          <span className="text-[2.2rem] leading-none font-medium">Lona</span>
        </div>

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
