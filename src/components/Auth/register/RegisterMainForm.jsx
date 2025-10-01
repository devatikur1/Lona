// RegisterMainForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import GoBack from "../AuthPart/GoBack";
import RegisterEmail from "../AuthPart/RegisterEmail";
import RegisterPass from "../AuthPart/RegisterPass";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../context/firebase/Firebase";
import CheackEmail from "./AuthPart/CheackEmail";
import { validateEmailFormat } from "../../../utils/emailValidation";

export default function RegisterMainForm() {
  // email state
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);

  // email state
  const [pass, setPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passErrMsgs, setPassErrMsgs] = useState([]);
  const [passValid, setPassValid] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const db = getFirestore(app);

  // Firebase + format check
  async function IsCheckEmailValidation() {
    setEmailLoading(true);
    setEmailErr(false);
    setEmailValid(false);

    // 1. Format validation
    const { isValid, message } = validateEmailFormat(email);
    if (!isValid) {
      setEmailErr(true);
      setEmailErrMsg(message);
      setEmailLoading(false);
      return;
    }

    // 2. Firestore check
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsEmailExists(true);
        setEmailErr(true);
        setEmailValid(false);
        setEmailErrMsg("The email address you entered is already in use.");
      } else {
        setIsEmailExists(false);
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

  // handle email typing
  function emailvalidation(e) {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setIsEmailExists(false);
  }

  // handle Pass typing
  function passValidation(e) {
    setPass(e.target.value);
  }

  return (
    <div className="w-full sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Sign up with your email
        </h1>
      </section>

      <form className="w-[80%] lg:w-[85%] xl:w-[95%] 2xl:w-[80%] flex flex-col gap-7">
        <article className="flex flex-col gap-2 items-center justify-center">
          <AnimatePresence>
            {!emailValid && (
              <RegisterEmail
                email={email}
                emailErrMsg={emailErrMsg}
                emailErr={emailErr}
                emailValid={emailValid}
                emailLoading={emailLoading}
                emailvalidation={emailvalidation}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isEmailExists && emailValid && (
              <RegisterPass
                pass={pass}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                passErrMsgs={passErrMsgs}
                passErr={passErr}
                passValid={passValid}
                passLoading={passLoading}
                passValidation={passValidation}
              />
            )}
          </AnimatePresence>
        </article>

        <article className="flex flex-col items-center gap-3 justify-center">
          {!emailValid && (
            <CheackEmail IsCheckEmailValidation={IsCheckEmailValidation} />
          )}
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
