import { Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function UserMsg({ src, msg }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(msg);
    toast.success("Copied successfully!");
  };

  return (
    <article className="max-w-[100%] w-full h-auto flex flex-col justify-center items-end">
      <div className="h-auto flex flex-col justify-center items-end gap-4">
        {src && (
          <div className="w-[100px] h-[100px] object-cover border-4 border-[#161619]">
            <img className="w-full h-full" src={src} alt="" />
          </div>
        )}
        <div className="max-w-[90%] md:max-w-[80%] h-auto w-auto bg-[#161619] border-[#212123] px-5 py-2 rounded-[15px] rounded-ee-[0px] flex justify-center items-center break-words whitespace-pre-wrap">
          <span className="">{msg}</span>
        </div>

        <span onClick={handleCopy} className="pr-1 cursor-pointer">
          <Copy size={13} />
        </span>
      </div>
    </article>
  );
}
