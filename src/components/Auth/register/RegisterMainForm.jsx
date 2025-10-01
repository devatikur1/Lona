import React from "react";
// import Email from "../AuthPart/Email";
import { Link } from "react-router-dom";

export default function RegisterMainForm() {
  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Log in with your email
        </h1>
      </section>

      <form className="w-[80%] lg:w-[85%] xl:w-[95%] 2xl:w-[80%] flex flex-col gap-7">
        {/* <article className="flex flex-col gap-2 items-center justify-center">
          <Email
            // email={email}
            // // validatin value
            // emailErr={emailErr}
            // emailValid={emailValid}
            // emailLoading={emailLoading}
            // // validation funtion
            // emailvalidation={emailvalidation}
          />
          <AnimatePresence>
            {IsEmailAlredyExits && (
              <PassAndChechBox
                // pass
                pass={pass}
                passvalidation={passvalidation}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                // pass validation
                passErr={passErr}
                passValid={passValid}
                passLoading={passLoading}
                // cheackBox
                isChecked={isChecked}
                checkBoxvalidation={checkBoxvalidation}
                checkBoxErr={checkBoxErr}
              />
            )}
          </AnimatePresence>
        </article> */}

        <article className="flex flex-col items-center gap-3 justify-center">
          {/* <Btn
            IsCheckEmailAlredyExits={IsCheckEmailAlredyExits}
            IsEmailAlredyExits={IsEmailAlredyExits}
            formStatus={formStatus}
          />
          <GoBack /> */}
        </article>
      </form>

      <section className="flex justify-center items-center mt-6 gap-2">
        <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-[#acaaaa] text-center">
          Don't have an account?
        </span>
        <Link to={"/account/sign-in"}>
          <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-white text-center">
            Sign up
          </span>
        </Link>
      </section>
    </div>
  );
}
