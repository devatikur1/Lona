import React, { useState } from "react";
import { Link } from "react-router-dom";
import Email from "../AuthPart/Email";
import PassAndChechBox from "../AuthPart/PassAndChechBox";
import { AnimatePresence } from "motion/react";
import Btn from "../AuthPart/Btn";
import GoBack from "../AuthPart/GoBack";

export default function LoginMainFrom() {
  const [pass, setPass] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailIsUniceq, setEmailIsUniceq] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);

  function CheckEmailIsUniceq() {
    setEmailChecking(true);

    let emailIsValid =
      email !== "" && email.includes("@") && email.includes(".com");

    if (emailIsValid) {
      setEmailErr(false);
      setEmailValid(true);
      setEmailIsUniceq(true);
    } else {
      setEmailErr(true);
      setEmailValid(false);
      setEmailIsUniceq(false);
    }

    setEmailChecking(false);
  }

  function emailvalidation(e) {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setEmailIsUniceq(false);
  }

  function LoginHandaler(e) {
    e.prevenDefault();
    console.log("Free");
    
  }

  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Log in with your email
        </h1>
      </section>

      <form
        onSubmit={(e) => LoginHandaler(e)}
        className="w-[80%] lg:w-[85%] xl:w-[95%] 2xl:w-[80%] flex flex-col gap-7"
      >
        <article className="flex flex-col gap-2 items-center justify-center">
          <Email
            email={email}
            // validatin value
            emailErr={emailErr}
            emailValid={emailValid}
            emailChecking={emailChecking}
            // validation funtion
            emailvalidation={emailvalidation}
          />
          <AnimatePresence>
            {emailIsUniceq && <PassAndChechBox />}
          </AnimatePresence>
        </article>

        <article className="flex flex-col items-center gap-3 justify-center">
          <Btn
            CheckEmailIsUniceq={CheckEmailIsUniceq}
            emailIsUniceq={emailIsUniceq}
          />
          <GoBack />
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
