import { Copy } from "lucide-react";
import React from "react";

export default function UserMsg({ key, msg }) {
  return (
    <article key={key} className="max-w-[100%] w-full flex flex-col justify-center items-end">
      <div className="flex flex-col justify-end items-end gap-4">
        <div className="max-w-[50%] w-auto bg-[#161619] border-[#212123] px-5 py-2 rounded-[15px] rounded-ee-[0px] flex justify-center items-center">
          <span>{msg}</span>
        </div>
        <span
          onClick={() => navigator.clipboard.writeText(msg)}
          className="pr-1"
        >
          <Copy size={13} />
        </span>
      </div>
    </article>
  );
}
