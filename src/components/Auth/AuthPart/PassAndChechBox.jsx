import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";
import { EyesOff, EyesOn } from "../../../others/Eyes";

export default function PassAndChechBox() {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col gap-5 "
    >
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link className="forgetBtn text-[#acaaaa] text-xs">
            Forgot your password?
          </Link>
        </div>
        <div>
          <input className="w-full inputEmail" id="password" type="password" />
          <div>
            <EyesOff />
            <EyesOn />
          </div>
        </div>
        <div>

        </div>
      </div>

      <div className="w-full flex justify-start">
        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-black border-gray-600 rounded focus:ring-transparent focus:ring-2 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-white select-none">
            Remember Me
          </label>
        </div>
      </div>
    </motion.div>
  );
}
