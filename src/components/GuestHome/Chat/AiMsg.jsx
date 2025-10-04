import React, { useEffect, useState } from "react";
import { Copy, Bot, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import Logo from "../../../others/Logo";

export default function AiMsg({ setLodingMsg, msg }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const words = msg.split(" ");
    let i = 0;

    const totalDuration = 2500;
    const delay = Math.max(totalDuration / words.length, 30);

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + (i === 0 ? words[i] : " " + words[i]));
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setLodingMsg(false);
      }
    }, delay);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <article className="max-w-full flex flex-col justify-center items-start mb-6">
      <div className="flex flex-col justify-start items-start gap-0 w-full">
        {/* AI Avatar and Header */}
        <div className="flex items-center gap-1 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br rounded-full flex items-center justify-center shadow-lg">
            <Logo size={22} />
          </div>
          <span className="text-sm font-medium text-gray-300">Lonas</span>
        </div>

        {/* Message Content */}
        <div className="w-full max-w-[95%] lg:max-w-full">
          <div className="p-4 lg:p-6">
            <div className="prose prose-invert prose-sm lg:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "12px",
                          padding: "16px",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          overflow: "auto",
                          margin: "16px 0",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="bg-gray-800/80 px-2 py-1 rounded-md text-sm font-mono border border-gray-700/50"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => (
                    <p className="text-gray-100 leading-relaxed mb-3 last:mb-0">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold text-white mb-4 mt-6 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-white mb-3 mt-5 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold text-white mb-2 mt-4 first:mt-0">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-100 mb-3 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-100 mb-3 space-y-1">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-4">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-gray-600 bg-gray-800/50 rounded-lg shadow-lg">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-700/80">{children}</thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-gray-600">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-gray-600 bg-gray-700/60">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-sm text-gray-200 border-b border-gray-600/50">
                      {children}
                    </td>
                  ),
                  hr: ({ children }) => <hr className="bg-[#303030] w-full h-[2px]" />,
                }}
              >
                {displayedText}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 ml-2"
        >
          {isCopied ? (
            <>
              <CheckCircle size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
