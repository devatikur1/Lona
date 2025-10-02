
import React from "react";
import UserMsg from "./Chat/UserMsg";

export default function ChatView({ chatBoxHeight, msgs }) {
  return (
    <main
      style={{ marginBottom: `${chatBoxHeight}px` }}
      className="pt-5 w-full flex justify-end items-end overflow-x-hidden touch-pan-y overflow-y-auto"
    >
      <section className="w-[50%] px-8 h-auto flex flex-col gap-10">
        {msgs.map((msg, index) => (
          <>
            <UserMsg msg={msg.prompt} />
            <UserMsg msg={msg.prompt} />
          </>
        ))}
      </section>
    </main>
  );
}
