import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "motion/react";
import MobileSideBar from "./sidebar/MobileSideBar";
import DextopSidebar from "./sidebar/DextopSidebar";
import SideOption from "./sidebar/SideOption";

export default function Sidebar() {
  const { showHeader, setShowHeader, userData } = useContext(AppContext);
  const [showOption, setShowOption] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //  window width
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

  // resize listener
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseSidebarClasses =
    "fixed z-50 md:relative min-h-screen max-h-screen flex flex-col border-r border-[#212123] bg-[#080808] overflow-hidden";

  const handleShowSideOption = (e) => {
    console.log(e);
    setX(5);
    setY(e.target.y - 50);
    setShowOption((prev) => !prev);
  };

  return (
    <>
      {/* Mobile: render MobileSideBar when showHeader true and viewport narrow */}
      <AnimatePresence>
        {showHeader && windowWidth < 768 && (
          <MobileSideBar
            groupedItems={groupedItems}
            setShowHeader={setShowHeader}
            userData={userData}
            handleShowSideOption={handleShowSideOption}
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
            userData={userData}
            handleShowSideOption={handleShowSideOption}
          />
        )}
      </AnimatePresence>

      {/* Dropdown Option Box */}
      <SideOption showOption={showOption} x={x} y={y} />
    </>
  );
}
