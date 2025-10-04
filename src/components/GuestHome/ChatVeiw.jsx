import React, { useEffect, useRef } from "react";
import UserMsg from "./Chat/UserMsg";
import AiMsg from "./Chat/AiMsg";
import { Toaster } from "react-hot-toast";
import { Bot, Sparkles } from "lucide-react";

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
      className="flex w-full min-h-[100vh] pt-8 pb-40 justify-center items-start overflow-x-hidden overflow-y-auto max-w-[100vw] bg-gradient-to-b from-gray-900/20 to-transparent chat-scroll"
    >
      <section className="w-full px-4 lg:px-6 h-auto flex flex-col gap-6 max-w-[99vw] md:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[65vw] 2xl:w-[60vw]">
        {/* Welcome Message for Empty Chat */}
        {msgs.length === 0 && !AiMsgLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
              <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome to AI Chat</h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Start a conversation with our AI assistant. Ask questions, get help with coding, or explore any topic you're curious about.
            </p>
          </div>
        )}

        {/* Chat Messages */}
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

        {/* AI Loading State */}
        {AiMsgLoading && (
          <article className="w-full max-w-full flex flex-col justify-center items-start mb-6">
            <div className="flex flex-col justify-start items-start gap-3 w-full">
              {/* AI Avatar and Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300">AI Assistant</span>
              </div>

              {/* Loading Message */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl rounded-tl-md shadow-xl w-full max-w-[95%] lg:max-w-full">
                <div className="p-4 lg:p-6">
                  <div className="flex items-center justify-start gap-3 mb-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    </div>
                    <span className="font-medium text-purple-400">
                      AI is thinking...
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Generating a thoughtful response for you...
                  </p>
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
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </main>
  );
}
