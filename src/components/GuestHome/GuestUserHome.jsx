import React, { useContext, useState } from "react";
import GuestHeader from "./GuestHeader";
import GuestMain from "./GuestMain";
import ChatBox from "./ChatBox";
import { AppContext } from "../../context/AppContext";
import ChatVeiw from "./ChatVeiw";
import AI from "../../context/AI";

export default function GuestUserHome() {
  const { text, setText } = useContext(AppContext);
  const [msgs, setmsgs] = useState([]);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [lodingMsg, setLodingMsg] = useState(false);
  const [AiMsgLoading, setAiMsgLoading] = useState(false);

  async function onSend() {
    let ChatCount = parseInt(localStorage.getItem("chat-count"));
    if (!text.trim() || ChatCount === 4) return;
    setLodingMsg(true);
    setAiMsgLoading(true);

    const newChat = {
      type: "user",
      prompt: text,
      atSendTime: new Date(),
    };

    setmsgs((prev) => [...prev, newChat]);
    setText("");

    const contextMsgs = [...msgs, newChat].map((m) => ({
      role: m.type === "user" ? "user" : "model",
      parts: [{ text: m.prompt }],
    }));

    const aiResponse = await AI.geminiText(text, contextMsgs);

    const aiChat = {
      type: "ai",
      prompt: aiResponse.content,
      atSendTime: new Date(),
    };
    localStorage.setItem("chat-count", ChatCount + 1);
    setmsgs((prev) => [...prev, aiChat]);
    setAiMsgLoading(false);
  }

  return (
    <aside className="relative w-full h-screen flex flex-col justify-start items-start touch-none overflow-hidden">
      <GuestHeader />
      {msgs.length === 0 && <GuestMain chatBoxHeieht={chatBoxHeieht} />}
      {msgs.length !== 0 && (
        <ChatVeiw
          setLodingMsg={setLodingMsg}
          msgs={msgs}
          chatBoxHeieht={chatBoxHeieht}
          AiMsgLoading={AiMsgLoading}
        />
      )}
      <ChatBox
        type={"gust"}
        text={text}
        setText={setText}
        lodingMsg={lodingMsg}
        onSend={onSend}
        setChatBoxHeieht={setChatBoxHeieht}
      />
    </aside>
  );
}
