import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Email from "../AuthPart/Email";
import PassAndChechBox from "../AuthPart/PassAndChechBox";
import { AnimatePresence } from "motion/react";
import Btn from "../AuthPart/Btn";
import GoBack from "../AuthPart/GoBack";
import { AppContext } from "../../../context/AppContext";

export default function LoginMainFrom() {
  // form
  const [formStatus, setformStatus] = useState("sended"); // sending || error || sended

  // chechbox
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxErr, setCheckBoxErr] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [IsEmailAlredyExits, setIsEmailAlredyExits] = useState(false);

  // pass
  const [pass, setPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  //context
  const { userAuth } = useContext(AppContext);

  // validateEmail
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // IsCheckEmailAlredyExits
  function IsCheckEmailAlredyExits() {
    setEmailLoading(true);

    let emailIsValid = validateEmail(email);

    if (emailIsValid) {
      setEmailErr(false);
      setEmailValid(true);
      setIsEmailAlredyExits(true);
    } else {
      setEmailErr(true);
      setEmailValid(false);
      setIsEmailAlredyExits(false);
    }

    setEmailLoading(false);
  }

  // email validation
  function emailvalidation(e) {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setIsEmailAlredyExits(false);
  }

  // pass validation
  function passvalidation(e) {
    setPass(e.target.value);
    setPassErr(false);
    setPassValid(false);
    setEmailLoading(false);
  }

  // cheack validation
  function checkBoxvalidation() {
    setIsChecked((prev) => !prev);
    setCheckBoxErr(false);
  }

  async function LoginHandler(e) {
    e.preventDefault();
    setPassLoading(true);

    // password validation
    if (pass.length < 8) {
      setPassErr(true);
      setPassValid(false);
      setPassLoading(false);
    } else {
      setPassErr(false);
      setPassValid(true);
      setPassLoading(false);
    }

    // checkbox validation
    if (!isChecked) {
      setCheckBoxErr(true);
      setPassLoading(false);
    }

    if (pass.length < 8 || !isChecked) {
      return;
    }

    setEmailErr(false);
    setEmailValid(false);
    setPassErr(false);
    setPassValid(false);
    setPassLoading(true);
    setEmailLoading(true);

    setformStatus("sending");

    let { type } = await userAuth.logIn(email, pass);

    if (type === "data") {
      setformStatus("sended");
      console.log("Login success!");
      setEmailValid(true);
      setPassValid(true);
    } else if (type === "error") {
      setformStatus("error");
      setEmailErr(true);
      setPassErr(true);
    }

    setEmailLoading(false);
    setPassLoading(false);
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
            emailLoading={emailLoading}
            // validation funtion
            emailvalidation={emailvalidation}
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
        </article>

        <article className="flex flex-col items-center gap-3 justify-center">
          <Btn
            IsCheckEmailAlredyExits={IsCheckEmailAlredyExits}
            IsEmailAlredyExits={IsEmailAlredyExits}
            formStatus={formStatus}
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
