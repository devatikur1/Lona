import React from "react";
import UserMsg from "./Chat/UserMsg";
import AiMsg from "./Chat/AiMsg";

export default function ChatView({ chatBoxHeieht, msgs }) {
  return (
    <main
      style={{ marginBottom: `${chatBoxHeieht}px` }}
      className="pt-5 flex w-full justify-center items-center overflow-x-hidden touch-pan-y overflow-y-auto max-w-[100vw]"
    >
      <section className="w-full px-3 h-auto flex flex-col gap-10 max-w-[99vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[50vw] 2xl:w-[50vw]">
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
