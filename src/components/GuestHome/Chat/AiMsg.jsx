import React from "react";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AiMsg({ msg }) {
  return (
    <article className="max-w-[100%] flex flex-col justify-center items-start">
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="w-auto px-1 py-2 rounded-[15px] rounded-es-[0px] prose prose-invert ">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
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
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-[#121212] px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {msg}
          </ReactMarkdown>
        </div>
        <span
          onClick={() => navigator.clipboard.writeText(msg)}
          className="pl-2"
        >
          <Copy size={13} />
        </span>
      </div>
    </article>
  );
}
