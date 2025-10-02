import { ChevronDown } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import AttachIcon from "../../others/AttachIcon";
import { motion } from "motion/react";
import ModelIcon from "../../others/ModelIcon";
import Send from "../../others/Send";
import clsx from "clsx";
import Footer from "./Footer";
import GenLoading from "../../others/GenLoading";

export default function ChatBox({
  text = "",
  setText,
  lodingMsg,
  onSend,
  setChatBoxHeieht,
}) {
  const [formHeight, setFormHeight] = useState(36);
  const textareaRef = useRef(null);
  const fromref = useRef(null);
  const chatBoxRef = useRef(null);

  // Auto grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.maxHeight = "180px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    setFormHeight(fromref.current.offsetHeight);
    setChatBoxHeieht(chatBoxRef.current.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend?.(text); // parent থেকে send function call হবে
    setText(""); // clear input
  };

  return (
    <section
      ref={chatBoxRef}
      className="fixed w-full bottom-0 flex flex-col justify-center items-center"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: "28px" }}
        className="bg-[#161619] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-1 px-1.5 md:px-1.5 md:py-2 border border-[#212123] mb-3"
      >
        <form
          ref={fromref}
          onSubmit={handleSubmit}
          className={clsx(
            "flex gap-2 max-h-[180px]",
            formHeight <= 36 && "items-center",
            formHeight > 36 && "items-end"
          )}
        >
          {/* Attach Button */}
          <button
            type="button"
            className="bg-transparent hover:bg-[#2d2d2d] transition-colors duration-200 flex items-center justify-center p-2 rounded-full"
          >
            <AttachIcon size={20} />
          </button>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 mb-0.5 bg-transparent text-[0.8rem] md:text-[0.95rem] lg:text-[1rem] resize-none border-none outline-none text-white placeholder:text-[#acaaaa] focus:ring-0 h-full overflow-y-auto"
            rows={1}
          />

          {/* Model select */}
          <button
            type="button"
            className="bg-[#2d2d2d] hover:bg-[#3a3a3a] transition-colors duration-200 rounded-full px-3 py-1.5 flex items-center gap-2"
          >
            <ModelIcon size={16} />
            {text === "" && (
              <span className="hidden md:flex md:text-[0.95rem] lg:text-[1rem]">
                Model
              </span>
            )}
            {text === "" && <ChevronDown size={18} />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() || lodingMsg}
            className="bg-white hover:bg-gray-200 transition-colors duration-200 rounded-full p-2 flex items-center gap-2 disabled:opacity-65 disabled:pointer-events-none"
          >
            {!lodingMsg && <Send color={"#161619"} size={20} />}
            {lodingMsg && <GenLoading color={"#161619"} size={20} />}
          </button>
        </form>
      </motion.div>
      <Footer />
    </section>
  );
}
