import React from "react";
import UserMsg from "./Chat/UserMsg";
import AiMsg from "./Chat/AiMsg";

export default function ChatView({ chatBoxHeieht, msgs }) {
  return (
    <main
      style={{ marginBottom: `${chatBoxHeieht}px` }}
      className="pt-5 flex w-full justify-center items-center overflow-x-hidden touch-pan-y overflow-y-auto max-w-[100vw]"
    >
      <section className="w-full px-8 h-auto flex flex-col gap-10 max-w-[60vw]">
        {msgs.map((msg, index) => {
          if (msg.type === "user") {
            return <UserMsg key={index} msg={msg.prompt} />;
          } else if (msg.type === "ai") {
            return <AiMsg key={index} msg={msg.prompt} />;
          }
          return null;
        })}
      </section>
    </main>
  );
}
