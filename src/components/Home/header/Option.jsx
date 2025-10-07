import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Trash2 } from "lucide-react";
import NewChat from "../../../others/NewChat";
import { Link } from "react-router-dom";

const option = ({ showOption, optionRef }) => {
  return (
    <AnimatePresence>
      {showOption && (
        <motion.div
          ref={optionRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-14 right-4 bg-[#121212] shadow-lg border border-[#212123] rounded-xl w-48 z-50 overflow-hidden"
        >
          <ul className="w-full flex flex-col gap-1 py-2 px-2">
            <Link to={"/"} className="flex items-center gap-2 hover:bg-[#1f1f22] px-5 py-2 rounded-xl text-white cursor-pointer">
              <NewChat size={20} />
              <span className="text-sm">New Chat</span>
            </Link>
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

export default option;
