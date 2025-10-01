import React from "react";

export default function RegisterBtn() {
  return (
    <button
      className="w-full opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center"
      type="submit"
    >
      <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
        <span className="text-[#080808]">Register</span>
      </div>
    </button>
  );
}
