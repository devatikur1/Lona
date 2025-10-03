import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";

export default function AiMsg({ setLodingMsg, msg }) {
  const [displayedText, setDisplayedText] = useState("");

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

  return (
    <article className="max-w-full flex flex-col justify-center items-start">
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="aiChat w-[95%] lg:w-full flex flex-col gap-2 px-1 py-2 rounded-[15px] rounded-es-[0px] prose prose-invert *:text-[0.9rem] *:md:text-sm">
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
                      padding: "14px",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      overflow: "auto"
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-[#121212] px-1 py-0.5 rounded text-sm w-[80vw] overflow-auto"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {displayedText}
          </ReactMarkdown>
        </div>
        <span
          onClick={() => {
            navigator.clipboard.writeText(msg);
            toast.success("copy successfully");
          }}
          className="pl-2 cursor-pointer"
        >
          <Copy size={13} />
        </span>
      </div>
    </article>
  );
}
