import { Copy } from "lucide-react";
import React from "react";

export default function UserMsg({ msg }) {
  return (
    <article className="w-full flex flex-col justify-center items-end">
      <div className="flex flex-col justify-end items-end gap-2 w-[50%]">
        <div className="w-auto bg-[#161619] border-[#212123] px-4 py-2 rounded-[15px] rounded-ee-[0px] ">
          <span>{msg}</span>
        </div>
        <span
          onClick={() => navigator.clipboard.writeText(msg)}
          className="pr-2"
        >
          <Copy size={15} />
        </span>
      </div>
    </article>
  );
}
