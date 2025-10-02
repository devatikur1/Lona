import React, { useContext } from "react";
import GuestHeader from "./GuestHeader";
import GuestMain from "./GuestMain";
import ChatBox from "../others/ChatBox";
import { AppContext } from "../../context/AppContext";

export default function GuestUserHome() {
  const {text, setText} = useContext(AppContext)
  return (
    <aside className="relative w-full h-screen flex flex-col justify-start items-start overflow-hidden">
      <GuestHeader />
      <GuestMain />
      <ChatBox text={text} setText={setText} />
    </aside>
  );
}
