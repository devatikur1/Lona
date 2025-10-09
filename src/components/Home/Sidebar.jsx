import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "motion/react";
import MobileSideBar from "./sidebar/MobileSideBar";
import DextopSidebar from "./sidebar/DextopSidebar";
import SideOption from "./sidebar/SideOption";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../context/firebase/Firebase";

export default function Sidebar() {
  const { showHeader, setShowHeader, userData, updateChats } =
    useContext(AppContext);
  const [showOption, setShowOption] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const optionRef = useRef(null);

  // firebase
  const fireStore = getFirestore(app);

  // chats
  const [chats, setChats] = useState([]);

  //  window width
  const getInitialWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const [windowWidth, setWindowWidth] = useState(getInitialWidth());

  // fetch user chats
  useEffect(() => {
    async function getUserChatData() {
      try {
        if (!userData?.id) return console.log("❌ User data is undefined!");

        // main user doc
        const userRef = doc(fireStore, "chats", userData.id);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return console.log("❌ User not found!");

        // subcollection "msg"
        const msgRef = collection(userRef, "msg");
        const msgSnap = await getDocs(msgRef);

        const messages = msgSnap.docs.map((d) => {
          const data = d.data();

          // 🔹 Timestamp → JS Date
          const createdAt = data.createdAt?.seconds
            ? new Date(data.createdAt.seconds * 1000)
            : new Date();

          // 🔹 Date difference বের করা
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);

          let dateLabel = "";
          if (createdAt.toDateString() === today.toDateString())
            dateLabel = "Today";
          else if (createdAt.toDateString() === yesterday.toDateString())
            dateLabel = "Yesterday";
          else
            dateLabel = createdAt.toLocaleString("default", { month: "long" });

          return {
            id: d.id,
            title: data.title || "New Chat",
            createdAt,
            date: dateLabel,
          };
        });

        // set chats state
        setChats(messages);
      } catch (err) {
        console.error("⚠️ Error fetching chat data:", err);
      }
    }

    getUserChatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChats, userData?.id]);

  // group chats by date
  const groupedItems = chats.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  // sort keys: Today > Yesterday > Month-wise (descending)
  const sortedKeys = Object.keys(groupedItems).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;

    // For month-wise: compare by first message date
    const aDate = groupedItems[a][0]?.createdAt;
    const bDate = groupedItems[b][0]?.createdAt;
    return bDate - aDate; // descending
  });

  const groupedSortedChats = {};
  sortedKeys.forEach((key) => {
    groupedSortedChats[key] = groupedItems[key];
  });

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
    setX(5);
    setY(e.target.y - 50);
    setShowOption((prev) => !prev);
  };

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <SideOption optionRef={optionRef} showOption={showOption} x={x} y={y} />
    </>
  );
}
