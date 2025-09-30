import { Github, Mail, Twitter } from "lucide-react";
import React from "react";
import GoogleIcon from "../../../../others/GoogleIcon";
import { Link } from "react-router-dom";

export default function RegisterTool() {
  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex mx-auto flex-col">
      <div className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Create your account
        </h1>
      </div>

        <div className="flex flex-col items-center justify-center gap-5">
          <Link
            to={"/account/sign-in?method=email"}
            className="w-[85%] lg:w-[75%] opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center"
          >
            <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
              <span>
                <Mail color="#080808" size={19} />
              </span>
              <span className="text-[#080808]">Login with email</span>
            </div>
          </Link>
  
          <div className="w-full max-w-[80%] px-7 py-2.5">
            <hr className="h-[1px] bg-[#303030]/80 border-none w-full" />
          </div>
  
          <button className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center">
            <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
              <span>
                <Twitter color="#fff" size={19} />
              </span>
              <span className="text-[#fff]">Login with X</span>
            </div>
          </button>
  
          <button className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center">
            <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
              <span>
                <GoogleIcon size={18} />
              </span>
              <span className="text-[#fff]">Login with Google</span>
            </div>
          </button>
  
          <button className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center">
            <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
              <span>
                <Github color="#fff" size={19} />
              </span>
              <span className="text-[#fff]">Login with Github</span>
            </div>
          </button>
        </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <span className="text-[0.82rem] lg:text-[0.9rem] xl:text-[1rem] text-[#acaaaa] text-center">
          Already have an account?
        </span>
        <Link to={"/account/sign-in"}>
          <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-white text-center">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
}
