import React, { useEffect, useRef } from "react";
import UserMsg from "./Chat/UserMsg";
import AiMsg from "./Chat/AiMsg";
import { Toaster } from "react-hot-toast";

export default function ChatView({ setLodingMsg, chatBoxHeight, msgs }) {
  const endRef = useRef(null);
  // Auto scroll to bottom whenever msgs update
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);
  return (
    <main
      style={{ height: `calc(100vh - ${chatBoxHeight + 60}px)` }}
      className="flex w-full min-h-[100vh] pt-20 pb-40 justify-center items-start overflow-x-hidden overflow-y-auto max-w-[100vw]"
    >
      <section className="w-full px-3 h-auto flex flex-col gap-10 max-w-[99vw] md:max-w-[90vw] lg:max-w-[70vw] xl:max-w-[50vw] 2xl:w-[50vw]">
        {msgs.map((msg, index) => {
          if (msg.type === "user") {
            return <UserMsg key={index} msg={msg.prompt} />;
          } else if (msg.type === "ai") {
            return (
              <AiMsg setLodingMsg={setLodingMsg} key={index} msg={msg.prompt} />
            );
          }
          return null;
        })}
        {/* Scroll target */}
        <div ref={endRef} />
      </section>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
