import React, { useEffect, useRef } from "react";
import UserMsg from "./Chat/UserMsg";
import AiMsg from "./Chat/AiMsg";
import { Toaster } from "react-hot-toast";
import { Bot, Sparkles } from "lucide-react";
import Logo from "../../others/Logo";

export default function ChatView({
  setLodingMsg,
  chatBoxHeight,
  msgs,
  AiMsgLoading,
}) {
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
      className="flex w-full min-h-[100vh] pt-8 pb-[350px] justify-center items-start overflow-x-hidden overflow-y-auto max-w-[100vw] bg-gradient-to-b from-gray-900/20 to-transparent chat-scroll"
    >
      <section className="w-full px-4 lg:px-6 h-auto flex flex-col gap-6 max-w-[99vw] md:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[65vw] 2xl:w-[60vw]">
        {/* Chat Messages */}
        {msgs.map((msg, index) => {
          if (msg.type === "user") {
            return <UserMsg key={index} msg={msg.prompt} />;
          } else if (msg.type === "ai") {
            return (
              <AiMsg endRef={endRef} setLodingMsg={setLodingMsg} key={index} msg={msg.prompt} />
            );
          }
          return null;
        })}

        {/* AI Loading State */}
        {AiMsgLoading && (
          <article className="w-full max-w-full flex flex-col justify-center items-start mb-6">
            <div className="flex flex-col justify-start items-start gap-0 w-full">
              {/* AI Avatar and Header */}
              <div className="flex items-center gap-1 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br rounded-full flex items-center justify-center shadow-lg">
                  <Logo size={22} />
                </div>
                <span className="text-sm font-medium text-gray-300">Lonas</span>
              </div>

              {/* Loading Message */}
              <div>
                <div className="p-4 lg:p-6">
                    <span className="font-medium text-purple-400">
                      AI is thinking...
                    </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Scroll target */}
        <div ref={endRef} />
      </section>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
    </main>
  );
}
