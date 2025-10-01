import React from 'react'
import { Link } from 'react-router-dom';

export default function GoBack({ link }) {
  return (
    <Link
      to={link}
      className="w-full bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center"
    >
      <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
        <span className="text-[#fff]">Go back</span>
      </div>
    </Link>
  );
}
