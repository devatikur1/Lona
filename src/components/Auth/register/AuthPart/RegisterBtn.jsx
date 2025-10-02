import { Loader2 } from "lucide-react";
import React from "react";

export default function RegisterBtn({ fromStatus }) {
  return (
    <button
      disabled={fromStatus === "loading"}
      className="w-full opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center"
      type="submit"
    >
      <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
        {fromStatus === "sending" && (
          <span className="text-[#080808] animate-spin">
            <Loader2 size={23} color={"#080808"} />
          </span>
        )}
        {fromStatus === "sended" && (
          <span className="text-[#080808]">Register</span>
        )}
        {fromStatus === "error" && (
          <span className="text-[#080808]">Register</span>
        )}
      </div>
    </button>
  );
}
