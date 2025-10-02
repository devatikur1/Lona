import { Copy } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function AiMsg({key, msg }) {
  return (
    <article
      key={key}
      className="max-w-[100%] flex flex-col justify-center items-start"
    >
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="w-auto px-4 py-2 prose prose-invert max-w-none">
          <ReactMarkdown>{msg}</ReactMarkdown>
        </div>
        <span
          onClick={() => navigator.clipboard.writeText(msg)}
          className="pl-2"
        >
          <Copy size={15} />
        </span>
      </div>
    </article>
  );
}
