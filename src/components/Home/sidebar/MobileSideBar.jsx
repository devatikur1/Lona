import { EllipsisVertical, History, Search } from "lucide-react";
import React from "react";
import NewChat from "../../../others/NewChat";
import ToggleBtn from "../../../others/ToggleBtn";
import Logo from "../../../others/Logo";
import { motion } from "motion/react";
import emptyProfile from "../../../assets/blank_profile_picture.svg";

export default function MobileSideBar({
  setShowHeader,
  groupedItems,
  userData,
  handleShowSideOption,
}) {
  return (
    <>
      {/* Overlay */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowHeader(false)}
        className="fixed z-40 w-screen h-screen overflow-hidden bg-[#080808]/10 backdrop-blur-xl"
      />

      {/* Sidebar */}
      <motion.section
        key="sidebar"
        initial={{ x: -350, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -350, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed z-50 top-0 left-0 h-[90vh] w-[80vw] max-w-[335px] flex flex-col border-r border-b border-[#212123] bg-[#080808] *:select-none"
        onClick={() => setShowHeader((prev) => !prev)}
      >
        <main className="flex flex-col justify-between h-full">
          {/* -------------------top part------------------- */}
          <section>
            {/* Header */}
            <div onClick={(e) => e.stopPropagation()} className="px-3 py-3">
              <article className="flex justify-between items-center px-2 pb-3 pt-3 mb-3">
                <Logo size={30} />
                <div onClick={() => setShowHeader(false)}>
                  <ToggleBtn />
                </div>
              </article>

              {/* Search */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderRadius: "28px",
                  border: "0.124rem solid #222327",
                }}
                className="bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between px-4 py-2 mb-2"
              >
                <div className="flex items-center">
                  <Search size={19} className="mr-2" />
                  <span className="truncate text-sm md:text-base leading-none">
                    Search
                  </span>
                </div>
                <span
                  style={{ color: "hsl(0 0% 63.9%)" }}
                  className="leading-none text-xs hidden sm:block"
                >
                  Ctrl+k
                </span>
              </div>

              {/* New Chat */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between px-4 py-2 rounded-lg mb-2"
              >
                <div className="flex items-center">
                  <NewChat size={20} className="mr-2" />
                  <span className="truncate text-sm md:text-base leading-none">
                    New Chat
                  </span>
                </div>
                <span
                  style={{ color: "hsl(0 0% 63.9%)" }}
                  className="newChatKeyWord leading-none text-xs hidden sm:block"
                >
                  Ctrl+N
                </span>
              </div>

              {/* History Header */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between px-4 py-2 rounded-lg"
              >
                <div className="flex items-center">
                  <History size={20} className="mr-2" />
                  <span className="truncate text-sm md:text-base leading-none">
                    History
                  </span>
                </div>
                <span
                  style={{ color: "hsl(0 0% 63.9%)" }}
                  className="newChatKeyWord leading-none text-xs hidden sm:block"
                >
                  Ctrl+H
                </span>
              </div>
            </div>

            {/* Scrollable History */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="scrollCustom flex-1 overflow-y-auto px-3 pb-3 mb-3"
            >
              <ul
                style={{ borderLeft: "0.124rem solid #212123" }}
                className="flex flex-col gap-2 ml-7 mt-0 pl-3"
              >
                {groupedItems &&
                  Object.keys(groupedItems).map((date) => (
                    <aside key={date}>
                      <div className="py-1 pl-1 text-[0.8rem] md:text-[0.9rem] font-thin text-gray-400 sticky top-0 bg-[#080808] z-20">
                        {date}
                      </div>
                      <section className="flex flex-col gap-1">
                        {groupedItems[date].map((item) => (
                          <article key={item.id}>
                            <a href={`c/${item.id}`}>
                              <div className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between gap-3 px-3 py-1.5 rounded-md">
                                <span className="truncate text-xs md:text-[0.85rem] leading-none">
                                  {item.title}
                                </span>
                                <span
                                  style={{ color: "hsl(0 0% 63.9%)" }}
                                  className="newChatKeyWord leading-none text-xs"
                                >
                                  <EllipsisVertical size={16} />
                                </span>
                              </div>
                            </a>
                          </article>
                        ))}
                      </section>
                    </aside>
                  ))}
              </ul>
            </div>
          </section>

          {/* --------------bottom part-------------- */}
          <section>
            {/* Profile */}
            <div className="w-full flex items-center justify-start px-3 py-3 bg-transparent border-t border-[#212123]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowSideOption?.(e);
                }}
                className="flex items-center gap-2 overflow-hidden"
              >
                {userData && (
                  <img
                    loading="lazy"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                    src={userData.profileImgUrl || emptyProfile}
                    alt="profile"
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      </motion.section>
    </>
  );
}
