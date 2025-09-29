import React, { use, useContext, useEffect, useState } from "react";
import Logo from "../../others/Logo";
import { EllipsisVertical, History, Search, Settings } from "lucide-react";
import NewChat from "../../others/NewChat";
import clsx from "clsx";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import ToggleBtn from "../../others/ToggleBtn";

export default function Sidebar() {
  const { showHeader, setShowHeader } = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState(0);

  const historyItems = [
    {
      id: "7f74e12b-45b9-4f8f-af09-730a3664b475",
      title: "React SVG Component Syntax Correction",
      date: "Today",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
    {
      id: "optimistic_conversation_cmg3w85tw0003356y3fn60htz",
      title: "New conversation",
      date: "Today",
      disabled: true,
    },
    {
      id: "02912469-3b0e-4c1f-bd9b-cc8564ba0f9c",
      title: "Vercel Domain Change React Project",
      date: "Today",
    },
    {
      id: "2df0d0ee-7fb9-4c7f-b4f6-5f2dacaa9dcd",
      title: "React Image Feed Component Issues",
      date: "September",
    },
    {
      id: "3b34dcaa-75a4-4135-bc71-8a6753fbef01",
      title: "React Image Upload Component",
      date: "September",
    },
    {
      id: "26978d82-9ed0-4743-b6c0-f9455d1f2288",
      title: "Firebase Authentication Code Analysis",
      date: "September",
    },
    {
      id: "0549fcf7-5e59-4445-a14e-a853a8a97376",
      title: "Free AI API Options 2025",
      date: "September",
    },
    {
      id: "ed810f26-d96d-4576-8063-3100e6e77f09",
      title: "Exam Syllabus and Study Guide",
      date: "September",
    },
    {
      id: "fd1b1235-0183-4522-bdf6-d54827be5666",
      title: "Friendly greeting",
      date: "September",
    },
    {
      id: "1465fc98-5e06-45c6-802b-edacff518a0a",
      title: "Traffic Jam and Water Pollution Solutions",
      date: "September",
    },
  ];

  // ডেট অনুসারে গ্রুপ করা
  const groupedItems = historyItems.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  function getWindowSize() {
    setWindowWidth(window.innerWidth);
  }

  window.addEventListener("resize", getWindowSize);

  useEffect(() => {
    getWindowSize();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showHeader && windowWidth < 768 && (
          <motion.section
            initial={{
              opacity: 0,
              x: -1000,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed z-40 w-screen h-screen overflow-hidden bg-[#080808]/10 backdrop-blur-xl"
          ></motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showHeader && windowWidth < 768 && (
          <motion.section
            initial={{
              opacity: 0,
              x: -500,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -500,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={clsx(
              "fixed z-50 md:relative min-h-screen max-h-screen md:w-[260px] lg:w-[287.5px] flex flex-col border-r border-[#212123] bg-[#080808]"
            )}
          >
            {/* Header (logo + search + newchat + history header) */}
            <div className="px-3 py-3">
              {/* Logo */}
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

            {/* Scrollable History Area */}
            <div className="scrollCustom flex-1 overflow-y-auto px-3 pb-3 mb-3">
              <ul
                style={{
                  borderLeft: "0.124rem solid #212123",
                }}
                className="flex flex-col gap-2 ml-4 mt-2 pl-2"
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

            {/* Bottom Profile Section */}
            <div className="w-full flex items-center justify-between px-3 py-3 bg-[#0d0d0d] border-t border-[#212123]">
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

      {windowWidth >=768 && (
          <section
            className={clsx(
              "fixed z-50 md:flex md:relative min-h-screen max-h-screen md:w-[260px] lg:w-[287.5px] flex flex-col border-r border-[#212123] bg-[#080808]"
            )}
          >
            {/* Header (logo + search + newchat + history header) */}
            <div className="px-3 py-3">
              {/* Logo */}
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

            {/* Scrollable History Area */}
            <div className="scrollCustom flex-1 overflow-y-auto px-3 pb-3 mb-3">
              <ul
                style={{
                  borderLeft: "0.124rem solid #212123",
                }}
                className="flex flex-col gap-2 ml-4 mt-2 pl-2"
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

            {/* Bottom Profile Section */}
            <div className="w-full flex items-center justify-between px-3 py-3 bg-[#0d0d0d] border-t border-[#212123]">
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
          </section>
        )}
    </>
  );
}
