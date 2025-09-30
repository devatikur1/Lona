import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";

export default function LoginMainFrom() {
  let emailIsUniceq = true;
  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Log in with your email
        </h1>
      </section>

      <form className="flex flex-col gap-12">
        <article className="flex flex-col gap-5 items-center justify-center">
          <div className="w-[85%] lg:w-[75%] flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="inputEmail" id="email" type="email" />
          </div>
          <div className="w-[85%] lg:w-[75%] flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="email">Password</label>
              <Link className="forgetBtn text-[#acaaaa] text-xs">
                Forgot your password?
              </Link>
            </div>
            <div>
              <input className="w-full inputEmail" id="email" type="email" />
            </div>
          </div>
          <div className="w-[85%] lg:w-[75%] flex justify-start" >
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-black border-gray-600 rounded focus:ring-transparent focus:ring-2 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-white select-none">
                Remember Me
              </label>
            </div>
          </div>
        </article>
        <article className="flex flex-col items-center gap-3 justify-center">
          {!emailIsUniceq && (
            <button className="w-[85%] lg:w-[75%] opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center">
              <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
                <span className="text-[#080808]">Next</span>
              </div>
            </button>
          )}
          {emailIsUniceq && (
            <button className="w-[85%] lg:w-[75%] opacity-[0.8] transition-all duration-500 hover:opacity-[1] bg-white text-[#080808] rounded-3xl flex justify-center items-center">
              <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
                <span className="text-[#080808]">Login</span>
              </div>
            </button>
          )}
          <Link
            to={"/account/sign-in"}
            className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center"
          >
            <div className="flex items-center gap-3 py-1.5 md:py-[0.5rem]">
              <span className="text-[#fff]">Go back</span>
            </div>
          </Link>
        </article>
      </form>

      <section className="flex justify-center items-center mt-6 gap-2">
        <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-[#acaaaa] text-center">
          Don't have an account?
        </span>
        <Link to={"/account/sign-up"}>
          <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-white text-center">
            Sign up
          </span>
        </Link>
      </section>
    </div>
  );
}
