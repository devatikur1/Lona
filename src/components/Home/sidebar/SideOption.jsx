import React, { useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const SideOption = ({ showOption, x, y }) => {
    const { userAuth } = useContext(AppContext);

  // Accept number
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
            <Link to={"account"}>
              <li className="flex items-center gap-2 hover:bg-[#1f1f22] px-4 py-1.5 rounded-xl text-white cursor-pointer">
                <User size={18} />
                <span className="text-sm">Account</span>
              </li>
            </Link>

            <Link>
              <li className="flex items-center gap-2 hover:bg-[#1f1f22] px-4 py-1.5 rounded-xl text-white cursor-pointer">
                <Settings size={15} />
                <span className="text-sm">Settings</span>
              </li>
            </Link>

            <hr className="w-[90%] mx-auto my-1.5 mb-1 h-[1.5px] rounded-full bg-[#252525] border-none ring-0 outline-none" />
            <li
              onClick={() => userAuth.logOut()}
              className="flex items-center gap-2 hover:bg-[#1f1f22] px-4 py-1.5 rounded-xl cursor-pointer"
            >
              <LogOut size={15} />
              <span className="text-sm">Log Out</span>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideOption;
