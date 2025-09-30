import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";
import { EyesOff, EyesOn } from "../../../others/Eyes";
import clsx from "clsx";
import error from "../../../assets/error.png";
import Success from "../../../others/Success";

export default function PassAndChechBox({
  //pass
  pass,
  isShowPass,
  setIsShowPass,
  // pass validation
  passErr,
  passValid,
  passChecking,

  passwordvalidation,

  // cheackBox
  setIsChecked,
  isChecked,
}) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col gap-5 "
    >
      {/* password */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link className="forgetBtn text-[#acaaaa] text-xs">
            Forgot your password?
          </Link>
        </div>
        <div className="relative">
          <input
            className={clsx(
              !passErr && "input",
              passErr && "inputErr",
              "w-full padding_right_32"
            )}
            id="password"
            type={isShowPass ? "text" : "password"}
            value={pass}
            onChange={passwordvalidation}
          />

          <div className="absolute right-2 top-0 h-full flex justify-center items-center cursor-pointer">
            <div className="w-full h-ful flex justify-center items-center">
              {passErr && <img className="w-[16px]" src={error} alt="error" />}
              {!passErr && passValid && <Success className="w-[25px]" />}
              {passChecking && (
                <img
                  className="w-[16px]"
                  src="data:image/svg+xml;utf8,%3C!--%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F--%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%2024%2024%22%20role%3D%22img%22%20aria-label%3D%22Loading%22%3E%0A%20%20%3Ctitle%3ELoading%3C%2Ftitle%3E%0A%0A%20%20%3Cstyle%3E%0A%20%20%20%20%2F*%20rotate%20the%20whole%20SVG%20group%20*%2F%0A%20%20%20%20%40keyframes%20spin%20%7B%0A%20%20%20%20%20%200%25%20%20%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20rotate(360deg)%3B%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20%2F*%20animate%20the%20dashoffset%20for%20a%20smooth%20%22stroke%20sweep%22%20*%2F%0A%20%20%20%20%40keyframes%20dash%20%7B%0A%20%20%20%20%20%200%25%20%7B%0A%20%20%20%20%20%20%20%20stroke-dasharray%3A%201%2C%2069.115%3B%0A%20%20%20%20%20%20%20%20stroke-dashoffset%3A%200%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%2050%25%20%7B%0A%20%20%20%20%20%20%20%20stroke-dasharray%3A%2040%2C%2069.115%3B%0A%20%20%20%20%20%20%20%20stroke-dashoffset%3A%20-10%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20100%25%20%7B%0A%20%20%20%20%20%20%20%20stroke-dasharray%3A%201%2C%2069.115%3B%0A%20%20%20%20%20%20%20%20stroke-dashoffset%3A%20-69.115%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20.spinner-group%20%7B%0A%20%20%20%20%20%20transform-origin%3A%2012px%2012px%3B%20%2F*%20center%20of%20viewBox%20*%2F%0A%20%20%20%20%20%20animation%3A%20spin%201.4s%20linear%20infinite%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20.track%20%7B%0A%20%20%20%20%20%20stroke%3A%20rgba(34%2C197%2C94%2C0.18)%3B%20%2F*%20green-400%20at%2020%25%20opacity%20*%2F%0A%20%20%20%20%20%20stroke-width%3A%202.5%3B%0A%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20.arc%20%7B%0A%20%20%20%20%20%20stroke%3A%20%2322c55e%3B%20%2F*%20green-400%20*%2F%0A%20%20%20%20%20%20stroke-width%3A%202.5%3B%0A%20%20%20%20%20%20stroke-linecap%3A%20round%3B%0A%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%2F*%20circle%20perimeter%20~%202%CF%80r%20-%26gt%3B%20for%20r%3D11%20%3D%26gt%3B%20~69.115%20*%2F%0A%20%20%20%20%20%20stroke-dasharray%3A%2069.115%3B%0A%20%20%20%20%20%20stroke-dashoffset%3A%200%3B%0A%20%20%20%20%20%20animation%3A%20dash%201.6s%20ease-in-out%20infinite%3B%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%0A%0A%20%20%3C!--%20group%20rotates%20--%3E%0A%20%20%3Cg%20class%3D%22spinner-group%22%3E%0A%20%20%20%20%3C!--%20background%20track%20--%3E%0A%20%20%20%20%3Ccircle%20class%3D%22track%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%3C!--%20animated%20arc%20--%3E%0A%20%20%20%20%3Ccircle%20class%3D%22arc%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"
                  alt=""
                />
              )}
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
          Please enter a valid email
        </span>
      </div>

      {/* Remember Me */}
      <div className="w-full flex justify-start">
        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked((prev) => !prev)}
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
