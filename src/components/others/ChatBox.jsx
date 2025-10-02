import { ChevronDown } from "lucide-react";
import React from "react";

export default function ChatBox({ text = "d", seText }) {
  return (
    <div className="absolute w-[100vw] bottom-0 overflow-x-hidden flex justify-center items-center">
      <div className="h-full w-[50%] bg-[#161619]">
        <form className="h-full w-full flex items-center">
          <article>
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none text-fg-primary hover:bg-button-ghost-hover disabled:hover:bg-transparent border border-transparent h-10 w-10 rounded-full group/attach-button"
              type="button"
              aria-label="Attach"
              tabindex="0"
              id="radix-_r_ja_"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-[2] text-primary transition-colors duration-100"
              >
                <path
                  d="M10 9V15C10 16.1046 10.8954 17 12 17V17C13.1046 17 14 16.1046 14 15V7C14 4.79086 12.2091 3 10 3V3C7.79086 3 6 4.79086 6 7V15C6 18.3137 8.68629 21 12 21V21C15.3137 21 18 18.3137 18 15V8"
                  stroke="currentColor"
                ></path>
              </svg>
            </button>
          </article>
          <article className="w-full h-[20px]">
            <textarea
              className="h-full w-full resize-none text-black scrollCustom border-transparent"
              seText={(e) => seText(e.target.value)}
              dir="auto"
              name=""
              id=""
              placeholder="Ask Lonas anything"
            ></textarea>
          </article>
          <article className="px-2">
            <div
              className="px-2 py-1 rounded-xl 
                        border-transparent bg-[#121212]
                        transition-colors duration-300 ease-in-out flex items-center gap-2"
            >
              <span>Model</span>
              <ChevronDown size={15} />
            </div>
          </article>
        </form>
      </div>
    </div>
  );
}
