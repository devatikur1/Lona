import React from "react";
import clsx from "clsx";
import { motion } from "motion/react";

export default function RegisterFSName({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  firstNameErr,
  setFirstNameErr,
  lastNameErr,
  setLastNameErr,
}) {
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
      className="w-full flex gap-5"
    >
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="firstName">First name</label>
        <div className="w-full relative">
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value.trim());
              setFirstNameErr(false);
            }}
            className={clsx(
              !firstNameErr && "input",
              firstNameErr && "inputErr",
              "w-full padding_right_32"
            )}
            id="firstName"
            type="text"
          />
        </div>

        {/* Error message */}
        <span
          className={clsx(
            "text-[#7f1d1d] text-xs transition-opacity duration-200",
            firstNameErr ? "opacity-100" : "opacity-0"
          )}
        >
          {"You must provide an First name address."}
        </span>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="lastName">Last name</label>
        <div className="w-full relative">
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value.trim());
              setLastNameErr(false);
            }}
            className={clsx(
              !lastNameErr && "input",
              lastNameErr && "inputErr",
              "w-full padding_right_32"
            )}
            id="lastName"
            type="text"
          />
        </div>

        {/* Error message */}
        <span
          className={clsx(
            "text-[#7f1d1d] text-xs transition-opacity duration-200",
            lastNameErr ? "opacity-100" : "opacity-0"
          )}
        >
          You must provide an First name address.
        </span>
      </div>
    </motion.div>
  );
}
