import { motion } from "motion/react";
import React from "react";
import Logo from "../../../others/Logo";
import ToggleBtn from "../../../others/ToggleBtn";
import { EllipsisVertical, History, Search } from "lucide-react";
import NewChat from "../../../others/NewChat";
import clsx from "clsx";
import emptyProfile from "../../../assets/blank_profile_picture.svg";

export default function DextopSidebar({
  showHeader,
  setShowHeader,
  baseSidebarClasses,
  groupedItems,
  userData,
  handleShowSideOption,
}) {
  return (
    <>
      <motion.main
        initial={{ width: showHeader ? 300 : 50 }}
        animate={{ width: showHeader ? 300 : 60 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className={clsx(baseSidebarClasses, "*:select-none")}
        onClick={() => setShowHeader((prev) => !prev)}
      >
        {/* when expanded show full view, when collapsed show compact view */}
        {showHeader ? (
          <section className="flex flex-col justify-between h-screen">
            <section>
              <div className="px-3 py-3">
                {/* Logo + toggle */}
                <article
                  onClick={(e) => e.stopPropagation()}
                  className="flex justify-between items-center px-2 pb-3 pt-3 mb-3"
                >
                  <Logo size={30} />
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
                  {Object.keys(groupedItems).map((date) => (
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

            {/* Profile */}
            <div className="w-full flex items-center justify-between px-3 py-3 bg-transparent border-t border-[#212123]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowSideOption?.(e);
                }}
                className="flex items-center gap-2 overflow-hidden"
              >
                {!userData || userData.profileImgUrl === null ? (
                  <img
                    loading="lazy"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                    src={emptyProfile}
                    alt="profile"
                  />
                ) : (
                  <img
                    loading="lazy"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                    src={userData.profileImgUrl}
                    alt="profile"
                  />
                )}
              </div>
              <div className="hover:bg-[#1f1f22] transition-all duration-200 p-2.5 rounded-full flex justify-center items-center">
                <ToggleBtn />
              </div>
            </div>
          </section>
        ) : (
          // Collapsed (icon-only) view
          <section className="flex flex-col justify-between h-screen">
            <section>
              <div className="px-1 py-3 flex flex-col gap-2">
                <article
                  onClick={(e) => e.stopPropagation()}
                  className="flex justify-center items-center p-2 mb-3"
                >
                  <div>
                    <Logo size={30} />
                  </div>
                </article>

                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: "28px",
                    border: "0.124rem solid #222327",
                  }}
                  className="bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-center p-2 mb-2"
                >
                  <div className="w-full flex items-center justify-center">
                    <Search size={20} />
                  </div>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-center p-2 rounded-lg mb-2"
                >
                  <div className="flex items-center justify-center">
                    <NewChat size={20} />
                  </div>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-center p-2 rounded-lg"
                >
                  <div className="flex items-center justify-center">
                    <History size={20} />
                  </div>
                </div>
              </div>
            </section>

            {/* bottom compact profile */}
            <section>
              <div className="w-full flex flex-col items-center justify-center gap-5 px-3 py-3 bg-transparent border-t border-[#212123]">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowSideOption?.(e);
                  }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  {!userData || userData.profileImgUrl === null ? (
                    <img
                      loading="lazy"
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      src={emptyProfile}
                      alt="profile"
                    />
                  ) : (
                    <img
                      loading="lazy"
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      src={userData.profileImgUrl}
                      alt="profile"
                    />
                  )}
                </div>
                <div className="hover:bg-[#1f1f22] transition-all duration-200 p-2.5 rounded-full flex justify-center items-center">
                  <ToggleBtn />
                </div>
              </div>
            </section>
          </section>
        )}
      </motion.main>
    </>
  );
}
