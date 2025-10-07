import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image } from "lucide-react";
import ModelIcon from "../../others/ModelIcon";

const ChatBotOption = ({
  optionRef,
  showOption,
  chatBoxHeieht,
  setModelInfo,
  setShowOption,
}) => {
  return (
    <AnimatePresence>
      {showOption === true && (
        <section
          style={{ bottom: chatBoxHeieht }}
          className="fixed w-full flex flex-col justify-center items-center"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ borderRadius: "28px" }}
            className="w-[98%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-1 px-1 md:px-1.5 md:py-2 mb-3"
          >
            <motion.div
              ref={optionRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bottom-0 right-4 bg-[#121212] shadow-lg border border-[#212123] rounded-xl w-48 z-50 overflow-hidden"
            >
              <ul className="w-full flex flex-col gap-1 py-2 px-2">
                <li
                  onClick={() => {
                    setModelInfo({
                      title: "Auto",
                      icon: <ModelIcon size={16} />,
                    });
                    setShowOption(false);
                  }}
                  className="flex items-center gap-2 hover:bg-[#1f1f22] px-4 py-1.5 rounded-xl text-white cursor-pointer"
                >
                  <ModelIcon size={16} />
                  <span className="text-sm">Auto</span>
                </li>

                <li
                  onClick={() => {
                    setModelInfo({
                      title: "Images",
                      icon: <Image size={16} />,
                    });
                    setShowOption(false);
                  }}
                  className="flex items-center gap-2 hover:bg-[#1f1f22] px-4 py-1.5 rounded-xl text-white cursor-pointer"
                >
                  <Image size={16} />
                  <span className="truncate text-sm">Create image...</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
};

export default ChatBotOption;
