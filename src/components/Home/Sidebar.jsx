import React, { useContext, useEffect, useState } from "react";
import Logo from "../../others/Logo";
import { EllipsisVertical, History, Search, Settings } from "lucide-react";
import NewChat from "../../others/NewChat";
import clsx from "clsx";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import ToggleBtn from "../../others/ToggleBtn";
import MobileSideBar from "./sidebar/MobileSideBar";
import DextopSidebar from "./sidebar/DextopSidebar";

export default function Sidebar() {
  const { showHeader, setShowHeader } = useContext(AppContext);

  // 안전하게 초기 window width সেট করা (SSR safety)
  const getInitialWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const [windowWidth, setWindowWidth] = useState(getInitialWidth());

  // Sample history items (unique ids)
  const historyItems = [
    { id: "h1", title: "React SVG Component Syntax Correction", date: "Today" },
    { id: "h2", title: "New conversation", date: "Today", disabled: true },
    { id: "h3", title: "Vercel Domain Change React Project", date: "Today" },
    { id: "h4", title: "React Image Feed Component Issues", date: "September" },
    { id: "h5", title: "React Image Upload Component", date: "September" },
  ];

  // group by date
  const groupedItems = historyItems.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  // resize listener (clean up on unmount)
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseSidebarClasses =
    "fixed z-50 md:relative min-h-screen max-h-screen flex flex-col border-r border-[#212123] bg-[#080808] overflow-hidden";

  return (
    <>
      {/* Mobile: render MobileSideBar when showHeader true and viewport narrow */}
      <AnimatePresence>
        {showHeader && windowWidth < 768 && (
          <MobileSideBar
            groupedItems={groupedItems}
            setShowHeader={setShowHeader}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - animate width between collapsed/expanded */}
      <AnimatePresence>
        {windowWidth >= 768 && (
          <DextopSidebar
            windowWidth={windowWidth}
            showHeader={showHeader}
            setShowHeader={setShowHeader}
            baseSidebarClasses={baseSidebarClasses}
            groupedItems={groupedItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}
