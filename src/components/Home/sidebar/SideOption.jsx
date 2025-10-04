import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Trash2 } from "lucide-react";
import NewChat from "../../../others/NewChat";

const SideOption = ({ showOption, x, y }) => {
  // Accept number (treated as px) or string (used as-is).
  const style = {};
  if (x !== undefined && x !== null) {
    style.left = typeof x === "number" ? `${x}px` : x;
  }
  if (y !== undefined && y !== null) {
    // If y is number, subtract a vertical offset so the menu appears above the click point.
    style.top = typeof y === "number" ? `${y - 120}px` : y;
    style.bottom = "auto";
  }

  return (
    <AnimatePresence>
      {showOption && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          // keep original utility classes as defaults; inline style will override when x/y provided
          className="fixed left-12 bottom-10 right-4 bg-[#121212] shadow-lg border border-[#212123] rounded-xl w-48 z-50 overflow-hidden"
          style={style}
        >
          <ul className="w-full flex flex-col gap-1 py-2 px-2">
            <li className="flex items-center gap-2 hover:bg-[#1f1f22] px-5 py-2 rounded-xl text-white cursor-pointer">
              <NewChat size={20} />
              <span className="text-sm">New Chat</span>
            </li>
            <li className="flex items-center gap-2 hover:bg-[#1f1f22] px-5 py-2 rounded-xl text-white cursor-pointer">
              <Info size={20} />
              <span className="text-sm">Info</span>
            </li>
            <hr className="w-[90%] mx-auto my-1.5 h-[1.5px] rounded-full bg-[#252525] border-none ring-0 outline-none" />
            <li className="flex items-center gap-2 hover:bg-[#160305] px-5 py-2 rounded-xl *:text-[#e83b46] cursor-pointer">
              <Trash2 color="#e83b46" size={18} />
              <span className="text-sm">Delete</span>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideOption;
