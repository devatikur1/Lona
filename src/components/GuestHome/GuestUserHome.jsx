import React from "react";
import GuestHeader from "./GuestHeader";
import GuestMain from "./GuestMain";
import ChatBox from "../others/ChatBox";

export default function GuestUserHome() {
  return (
    <aside className="relative w-full h-screen flex flex-col justify-start items-start">
      <GuestHeader />
      <GuestMain />
      <ChatBox />
    </aside>
  );
}
