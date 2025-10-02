import React, { useContext, useState } from "react";
import GuestHeader from "./GuestHeader";
import GuestMain from "./GuestMain";
import ChatBox from "../others/ChatBox";
import { AppContext } from "../../context/AppContext";
import ChatVeiw from "./ChatVeiw";
import AI from "../../context/AI";

export default function GuestUserHome() {
  const { text, setText } = useContext(AppContext);
  const [msgs, setmsgs] = useState([]);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [lodingMsg, setLodingMsg] = useState(false);

  async function onSend() {
    if (!text.trim()) return;
    setLodingMsg(true);

    const newChat = {
      type: "user",
      prompt: text,
      atSendTime: new Date(),
    };
    setmsgs((prev) => [...prev, newChat]);
    setText("");

    const aiResponse = await AI.geminiText(
      text,
      msgs.map((m) => ({
        role: m.type === "user" ? "user" : "model",
        parts: [{ text: m.prompt }],
      }))
    );
    console.log(aiResponse);
    

    const aiChat = {
      type: "ai",
      prompt: aiResponse.text,
      atSendTime: new Date(),
    };
    setmsgs((prev) => [...prev, aiChat]);
    setLodingMsg(false);
  }

  return (
    <aside className="relative w-full h-screen flex flex-col justify-start items-start touch-none overflow-hidden">
      <GuestHeader />
      {msgs.length === 0 && <GuestMain chatBoxHeieht={chatBoxHeieht} />}
      {msgs.length !== 0 && (
        <ChatVeiw msgs={msgs} chatBoxHeieht={chatBoxHeieht} />
      )}
      <ChatBox
        text={text}
        setText={setText}
        lodingMsg={lodingMsg}
        onSend={onSend}
        setChatBoxHeieht={setChatBoxHeieht}
      />
    </aside>
  );
}
