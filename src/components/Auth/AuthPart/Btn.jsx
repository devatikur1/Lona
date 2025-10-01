import { Loader2 } from "lucide-react";
import React from "react";

export default function Btn({ IsEmailAlredyExits, IsCheckEmailAlredyExits, formStatus }) {
  return (
    <>
      {!IsEmailAlredyExits && (
        <button
          onClick={IsCheckEmailAlredyExits}
          className="w-full opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center"
          type="button"
        >
          <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
            <span className="text-[#080808]">Next</span>
          </div>
        </button>
      )}

      {IsEmailAlredyExits && (
        <button
          disabled={formStatus === "sending"}
          type="submit"
          className="w-full opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center disabled:opacity-75"
        >
          <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
            {formStatus === "sending" && (
              <span className="text-[#080808] animate-spin">
                <Loader2 size={23} color={"#080808"} />
              </span>
            )}
            {formStatus === "sended" && (
              <span className="text-[#080808]">Login</span>
            )}
            {formStatus === "error" && (
              <span className="text-[#080808]">Login</span>
            )}
          </div>
        </button>
      )}
    </>
  );
}
