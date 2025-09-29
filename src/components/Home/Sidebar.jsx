import React, { useContext, useEffect, useState } from "react";
import Logo from "../../others/Logo";
import { EllipsisVertical, History, Search, Settings } from "lucide-react";
import NewChat from "../../others/NewChat";
import clsx from "clsx";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import ToggleBtn from "../../others/ToggleBtn";
import MobileSideBar from "./sidebar/MobileSideBar";

export default function Sidebar() {
  const { showHeader, setShowHeader } = useContext(AppContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // sample history items with unique ids
  const historyItems = [
    { id: "h1", title: "React SVG Component Syntax Correction", date: "Today" },
    { id: "h2", title: "New conversation", date: "Today", disabled: true },
    { id: "h3", title: "Vercel Domain Change React Project", date: "Today" },
    { id: "h4", title: "React Image Feed Component Issues", date: "September" },
    { id: "h5", title: "React Image Upload Component", date: "September" },
  ];

  // group items by date
  const groupedItems = historyItems.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseSidebarClasses =
    "fixed z-50 md:relative min-h-screen max-h-screen flex flex-col border-r border-[#212123] bg-[#080808]";

  return (
    <>
      <AnimatePresence>
        {/* Mobile Sidebar */}
        {showHeader && windowWidth < 768 && (
          <MobileSideBar
            groupedItems={groupedItems}
            setShowHeader={setShowHeader}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <AnimatePresence>
        {windowWidth >= 768 && (
          <motion.section
            initial={{ width: showHeader ? "auto" : 70 }}
            animate={{ width: showHeader ? "auto" : 70 }}
            transition={{ duration: 0.3 }}
            className={baseSidebarClasses}
          >
            <div className="px-3 py-3">
              {/* Logo + Toggle */}
              <article className="flex justify-between items-center px-2 pb-3 pt-3 mb-3">
                <Logo size={30} />
                <div onClick={() => setShowHeader(false)}>
                  <ToggleBtn />
                </div>
              </article>

              {/* Search */}
              <div
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
              <div className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between px-4 py-2 rounded-lg mb-2">
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
              <div className="newChatOption bg-[#121212] hover:bg-[#1f1f22] flex items-center justify-between px-4 py-2 rounded-lg">
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
            <div className="scrollCustom flex-1 overflow-y-auto px-3 pb-3 mb-3">
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

            {/* Profile */}
            <div className="w-full flex items-center justify-between px-3 py-3 bg-transparent border-t border-[#212123]">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="profile"
                />
                <span className="text-sm md:text-base truncate font-medium">
                  Atikur Rahman
                </span>
              </div>
              <div className="cursor-pointer">
                <Settings color={"#a3a3a3"} size={20} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
