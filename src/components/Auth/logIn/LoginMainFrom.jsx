import React, { useState } from "react";
import { Link } from "react-router-dom";
import Email from "../AuthPart/Email";
import PassAndChechBox from "../AuthPart/PassAndChechBox";
import { AnimatePresence } from "motion/react";
import Btn from "../AuthPart/Btn";
import GoBack from "../AuthPart/GoBack";

export default function LoginMainFrom() {
  // chechbox
  const [isChecked, setIsChecked] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailAlredyAse, setEmailAlredyAse] = useState(false);

  // pass
  const [pass, setPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [passChecking, setPassChecking] = useState(false);

  function CheckemailAlredyAse() {
    setEmailChecking(true);

    let emailIsValid = validateEmail(email);

    if (emailIsValid) {
      setEmailErr(false);
      setEmailValid(true);
      setEmailAlredyAse(true);
    } else {
      setEmailErr(true);
      setEmailValid(false);
      setEmailAlredyAse(false);
    }

    setEmailChecking(false);
  }

  // email validation
  function emailvalidation(e) {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setEmailAlredyAse(false);
  }

  // pass validation
  function passwordvalidation(e) {
    setPass(e.target.value);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(pass) {
    return pass.length >= 8;
  }

  function LoginHandler(e) {
    e.preventDefault();

    setEmailChecking(true);
    setPassChecking(true);

    const emailIsValid = validateEmail(email);
    const passIsValid = validatePassword(pass);

    setEmailErr(!emailIsValid);
    setEmailValid(emailIsValid);
    setEmailAlredyAse(emailIsValid); // For demo, pretend we check server

    setPassErr(!passIsValid);
    setPassValid(passIsValid);

    if (emailIsValid && passIsValid && isChecked) {
      // login logic
      console.log(email, pass);
      
      console.log("Login success!");
    }
    
    setEmailChecking(false);
    setPassChecking(false);
  }


  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Log in with your email
        </h1>
      </section>

      <form
        onSubmit={(e) => LoginHandler(e)}
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
            {emailAlredyAse && (
              <PassAndChechBox
                // pass
                pass={pass}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                // pass validation
                passErr={passErr}
                passValid={passValid}
                passChecking={passChecking}
                passwordvalidation={passwordvalidation}
                // cheackBox
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            )}
          </AnimatePresence>
        </article>

        <article className="flex flex-col items-center gap-3 justify-center">
          <Btn
            CheckemailAlredyAse={CheckemailAlredyAse}
            emailAlredyAse={emailAlredyAse}
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
