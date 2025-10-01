// Removed duplicate import of motion
import React from "react";
import { EyesOff, EyesOn } from "../../../others/Eyes";
import clsx from "clsx";
import { motion } from "motion/react";

const rules = [
  (pass) => pass.length >= 8,
  (pass) => /[A-Z]/.test(pass),
  (pass) => /[a-z]/.test(pass),
  (pass) => /[0-9]/.test(pass),
  (pass) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
  (pass) => pass.length > 4, // max length (optional)
];

export default function RegisterPass({
  pass,
  isShowPass,
  setIsShowPass,
  passErr,
  passValid,
  passValidation,
  passMsg
}) {
  const validCount = rules.filter((rule) => rule(pass)).length;

  let color = "#474747";
  if (validCount >= 2 && validCount < 4) color = "#7f1d1d";
  else if (validCount >= 4 && validCount < rules.length) color = "#facc15";
  else if (validCount === rules.length) color = "#22c55e";

  const radius = 11;
  const circumference = 2 * Math.PI * radius;
  const progress = (validCount / rules.length) * circumference;

  return (
    <motion.div
      initial={{
        height: "0px",
        opacity: 0,
      }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{
        height: "0px",
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <label htmlFor="password">Password</label>
      </div>
      <div className="relative">
        <input
          className={clsx(
            !passErr && "input",
            passErr && "inputErr",
            "w-full padding_right_52"
          )}
          id="password"
          type={isShowPass ? "text" : "password"}
          value={pass}
          onChange={passValidation}
        />

        <div className="absolute right-2 top-0 h-full flex justify-center items-center gap-2 cursor-pointer">
          <div className="flex-shrink-0 overflow-visible size-4">
            <svg
              viewBox="0 0 24 24"
              className="h-[16px] w-[16px] -rotate-90 transform overflow-visible"
            >
              {/* Background Circle */}
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="none"
                stroke="#474747"
                strokeWidth="4"
              />
              {/* Progress Circle */}
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                style={{ transition: "stroke 0.3s, stroke-dashoffset 0.3s" }}
              />
            </svg>
          </div>
          <div className="w-full h-ful flex justify-center items-center">
            {isShowPass ? (
              <span onClick={() => setIsShowPass(false)}>
                <EyesOn />
              </span>
            ) : (
              <span onClick={() => setIsShowPass(true)}>
                <EyesOff />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      <span
        className={clsx(
          "text-[#7f1d1d] text-xs transition-opacity duration-200",
          passErr ? "opacity-100" : "opacity-0"
        )}
      >
        {passMsg}
      </span>
    </motion.div>
  );
}
