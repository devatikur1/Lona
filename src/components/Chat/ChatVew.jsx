import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Logo from "../../others/Logo";
import UserMsg from "./UserMsg";
import AiMsg from "./AiMsg";
import { Loader2 } from "lucide-react";
export default function ChatView({
  setLodingMsg,
  chatBoxHeight,
  msgs,
  AiMsgLoading,
  AiImageLoading,
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
      style={{ minHeight: `calc(100vh - ${window.innerHeight - 70}px)` }}
      className="flex w-full pt-8 pb-[50vh] justify-center items-start overflow-x-hidden overflow-y-auto max-w-[100vw] chat-scroll"
    >
      <section className="w-full px-4 lg:px-6 h-auto flex flex-col gap-6 max-w-[99vw] md:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[65vw] 2xl:w-[60vw]">
        {/* Chat Messages */}
        {msgs &&
          msgs.map((msg, index) => {
            if (msg.type === "user") {
              return <UserMsg key={index} src={msg.imgLink} msg={msg.text} />;
            } else if (msg.type === "ai") {
              return (
                <AiMsg
                  key={index}
                  endRef={endRef}
                  setLodingMsg={setLodingMsg}
                  msg={msg}
                />
              );
            }
            return null;
          })}

        {/* AI Loading State */}
        {AiMsgLoading === true && (
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

        {AiImageLoading === true && (
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
              <div className="bg-[#161619] border-[#212123] w-full max-w-[250px] h-full min-h-[250px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] rounded-2xl flex justify-center items-center">
                <div class="w-full h-full flex flex-col justify-center items-center gap-2">
                  <div class="">
                    <Loader2
                      color={"#c084fc"}
                      size={40}
                      className="animate-spin"
                    />
                  </div>
                  <p className="text-purple-400">Generating...</p>
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
