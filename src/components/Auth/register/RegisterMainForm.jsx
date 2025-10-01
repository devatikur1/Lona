import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import GoBack from "../AuthPart/GoBack";
import Btn from "../AuthPart/Btn";
import RegisterEmail from "../AuthPart/RegisterEmail";
import RegisterPass from "../AuthPart/RegisterPass";

import passvalidation from "../../../hooks/usePassValidation";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../../context/firebase/Firebase";

export default function RegisterMainForm() {
  // form
  const [formStatus, setformStatus] = useState("sended"); // sending || error || sended

  // email
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [IsEmailAlredyExits, setIsEmailAlredyExits] = useState(false);

  // pass
  const [pass, setPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passErrs, setPassErrs] = useState([]);
  const [passValid, setPassValid] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const db = getFirestore(app);

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Firebase check function
  async function IsCheckEmailAlredyExits(email) {
    setEmailLoading(true);

    if (email === "") {
      setEmailErr(true);
      setEmailValid(false);
      setIsEmailAlredyExits(false);
      setEmailErrMsg("You must provide an email address.");
      setEmailLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailErr(true);
      setEmailValid(false);
      setIsEmailAlredyExits(false);
      setEmailErrMsg("Invalid email format.");
      setEmailLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsEmailAlredyExits(true);
        setEmailErr(true);
        setEmailValid(false);
        setEmailErrMsg("The email address you entered is already in use.");
      } else {
        setIsEmailAlredyExits(false);
        setEmailErr(false);
        setEmailValid(true);
        setEmailErrMsg("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailErr(true);
      setEmailValid(false);
      setEmailErrMsg("Something went wrong. Try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  // email validation
  function emailvalidation(e) {
    setEmail(e.target.value);
    IsCheckEmailAlredyExits(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setIsEmailAlredyExits(false);
  }

  // Password validation function
  function passvalidation(e) {
    setPassLoading(true);
    setPass(e.target.value);
    let { isValid, errors } = passvalidation(e.target.value);
    console.log(errors);

    setPassErr(!isValid);
    setPassValid(isValid);
    setPassErrs(errors);
    setPassLoading(false);
  }

  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Sign up with your email
        </h1>
      </section>

      <form className="w-[80%] lg:w-[85%] xl:w-[95%] 2xl:w-[80%] flex flex-col gap-7">
        <article className="flex flex-col gap-2 items-center justify-center">
          <RegisterEmail
            email={email}
            emailErrMsg={emailErrMsg}
            // validatin value
            emailErr={emailErr}
            emailValid={emailValid}
            emailLoading={emailLoading}
            // validation funtion
            emailvalidation={emailvalidation}
          />
          <AnimatePresence>
            {IsEmailAlredyExits && (
              <RegisterPass
                // pass
                pass={pass}
                passvalidation={passvalidation}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                // pass validation
                passErr={passErr}
                passValid={passValid}
                passLoading={passLoading}

                // passErrs
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
