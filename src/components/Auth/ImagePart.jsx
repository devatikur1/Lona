import React from "react";
import AuthLogo from "../../others/AuthLogo"; // তোমার SVG Component
import { AnimatePresence, motion } from "motion/react";

export default function ImagePart() {
  return (
    <div className="hidden h-full w-full max-w-lg flex-grow lg:block xl:max-w-5xl 2xl:max-w-5xl">
      <div className="relative flex h-full w-[50vw] items-center justify-center overflow-hidden bg-black text-white">
        {/* Left side SVG / Logo */}
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            animate={{
              opacity: 0.5,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-y-0 left-0 flex items-center justify-start"
            style={{ transform: "none" }}
          >
            {/* SVG component */}
            <AuthLogo />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradients */}
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="absolute -inset-y-[30%] -right-24 flex w-[100vw] flex-col xl:-right-6 xl:w-[1200px]"
            style={{
              maskImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
              opacity: 0.75,
              transform: "none",
            }}
          >
            <div className="flex h-full w-full flex-col">
              {/* Top conic gradient */}
              <div
                className="grow"
                style={{
                  background:
                    "conic-gradient(from 180deg at 99% 40% in lab, rgb(255, 255, 255) 18deg, rgb(255, 208, 134) 36deg, rgba(17, 17, 17, 0) 90deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)",
                }}
              />

              {/* Bottom conic gradient */}
              <div
                className="grow"
                style={{
                  background:
                    "conic-gradient(from 0deg at 99% 60% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 270deg, rgb(255, 208, 134) 324deg, rgb(255, 255, 255) 342deg)",
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
