import React, { useContext, useState } from "react";
import GuestHeader from "./GuestHeader";
import GuestMain from "./GuestMain";
import ChatBox from "../others/ChatBox";
import { AppContext } from "../../context/AppContext";
import Footer from "../others/Footer";

export default function GuestUserHome() {
  const {text, setText} = useContext(AppContext);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  let megs = [0];
  return (
    <aside className="relative w-full h-screen flex flex-col justify-start items-start touch-none overflow-hidden">
      <GuestHeader />
      {megs.length === 0 && <GuestMain chatBoxHeieht={chatBoxHeieht} />}
      <ChatBox
        text={text}
        setText={setText}
        setChatBoxHeieht={setChatBoxHeieht}
      />
    </aside>
  );
}
