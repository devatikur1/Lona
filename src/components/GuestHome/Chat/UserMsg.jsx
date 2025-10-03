import { Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function UserMsg({ msg }) {
  return (
    <article className="max-w-[100%] w-full flex flex-col justify-center items-end">
      <div className="flex flex-col justify-end items-end gap-4">
        <div className="max-w-[80%] w-auto bg-[#161619] border-[#212123] px-5 py-2 rounded-[15px] rounded-ee-[0px] flex justify-center items-center">
          <span>{msg}</span>
        </div>
        <span
          onClick={() => {
            navigator.clipboard.writeText(msg);
            toast.success("copy Successfully!");
          }}
          className="pr-1"
        >
          <Copy size={13} />
        </span>
      </div>
    </article>
  );
}
