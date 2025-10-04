// RegisterMainForm.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import GoBack from "../AuthPart/GoBack";
import RegisterEmail from "../AuthPart/RegisterEmail";
import RegisterPass from "../AuthPart/RegisterPass";
import RegisterFSName from "../AuthPart/RegisterFSName";
import RegisterBtn from "./AuthPart/RegisterBtn";
import CheackEmail from "./AuthPart/CheackEmail";
import CheackPass from "./AuthPart/CheackPass";
import { validateEmailFormat } from "../../../utils/emailValidation";
import { passIsValid } from "../../../utils/passIsValid";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../context/firebase/Firebase";
import { Mail } from "lucide-react";
import { getOS } from "../../../hooks/useGetOs";
import { getGeoLocation } from "../../../hooks/useGetGeoLocation";
import { getData } from "../../../hooks/useGetData";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

export default function RegisterMainForm() {
  // form
  const [fromStatus, setFromStatus] = useState("sended");

  // email state
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);

  // password state
  const [pass, setPass] = useState("");
  const [passMsg, setPassMsg] = useState(
    "You must provide an password address"
  );
  const [isShowPass, setIsShowPass] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passValid, setPassValid] = useState(false);

  // First name & Last name
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState(false);

  // constext
  const { userAuth } = useContext(AppContext);

  // router-dom
  const navigate = useNavigate();

  const db = getFirestore(app);

  // ---------------- Email Validation ----------------
  async function IsCheckEmailValidation() {
    setEmailLoading(true);
    setEmailErr(false);
    setEmailValid(false);

    const { isValid, message } = validateEmailFormat(email);
    if (!isValid) {
      setEmailErr(true);
      setEmailErrMsg(message);
      setEmailLoading(false);
      return;
    }

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

  function emailvalidation(e) {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValid(false);
    setIsEmailExists(false);
  }

  // ---------------- Password Validation ----------------
  function passValidation(e) {
    const value = e.target.value;
    setPass(value);
    setPassValid(false);
    setPassErr(false);
  }

  function checkPassword() {
    const { isValid } = passIsValid(pass);
    setPassValid(isValid);
    setPassErr(!isValid);
    if (pass === "") {
      setPassMsg("You must provide an password address");
    }
    if (pass !== "" && !isValid) {
      setPassMsg("Please completed the password rules.");
    }
  }

  // ---------------- Name Validation ----------------
  function checkName() {
    let valid = true;
    if (firstName.trim() === "") {
      setFirstNameErr(true);
      valid = false;
    } else setFirstNameErr(false);

    if (lastName.trim() === "") {
      setLastNameErr(true);
      valid = false;
    } else setLastNameErr(false);

    return valid;
  }

  // location funtion
  async function getLocationInfo() {
    let geo = { latitude: null, longitude: null };
    let data = {
      countryName: null,
      countryCode: null,
      continent: null,
      locality: null,
      city: null,
    };
    const OS = getOS();

    try {
      geo = await getGeoLocation();
    } catch (err) {
      console.log(`User denied location, continuing with null values ${err}`);
    }

    if (geo.latitude && geo.longitude) {
      try {
        data = await getData(geo.latitude, geo.longitude);
      } catch (err) {
        console.log(`Geo Data fetch failed, continuing with nulls ${err}`);
      }
    }

    // final loc object
    return {
      languages: navigator.languages,
      country: data.countryName || null,
      countryCode: data.countryCode || null,
      continent: data.continent || null,
      locality: data.locality || null,
      city: data.city || null,
      latitude: geo.latitude || null,
      longitude: geo.longitude || null,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      browser: navigator.userAgent,
      os: OS,
      deviceType: /Mobi|Android/i.test(navigator.userAgent)
        ? "Mobile"
        : "Desktop",
    };
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    let valid = checkName();
    if (!valid) return;
    setFromStatus("sending");
    let fullName = `${firstName} + " " + ${lastName}`;
    try {
      let location = await getLocationInfo();
      let app = await userAuth.signUp(email, pass, fullName, location);
      setFromStatus(app.type === "data" ? "sended" : "error");
      navigate("/account/sign-in");
      toast.success("Register Successfully");
    } catch (error) {
      setFromStatus("error");
      toast.error("Something problem");
    }
  }

  return (
    <div className="w-full sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex items-center mx-auto flex-col">
      {/* Step 1: Email */}
      {emailValid === false ? (
        <section className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
          <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
            Sign up with your email
          </h1>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center gap-3 pb-9 pt-5 md:pt-0 md:pb-14">
          <h1 className="text-center text-[2rem]">Complete your sign up</h1>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full border text-sm font-medium px-3 py-1 border-[#212123] bg-[#161619]">
              <Mail color={"#acaaaa"} size={15} />
              <span className="text-[0.8rem] font-thin">{email}</span>
            </div>
          </div>
        </section>
      )}

      <form
        onSubmit={HandleSubmit}
        className="w-[80%] lg:w-[85%] xl:w-[95%] 2xl:w-[80%] flex flex-col gap-7"
      >
        <article className="flex flex-col gap-2 items-center justify-center">
          {/* Email Step */}
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

          {/* Password Step */}
          <AnimatePresence>
            {!isEmailExists && emailValid && !passValid && (
              <RegisterPass
                pass={pass}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                passErr={passErr}
                passValid={passValid}
                passValidation={passValidation}
                passMsg={passMsg}
              />
            )}
          </AnimatePresence>

          {/* Name Step */}
          <AnimatePresence>
            {passValid && emailValid && (
              <RegisterFSName
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                firstNameErr={firstNameErr}
                setFirstNameErr={setFirstNameErr}
                lastNameErr={lastNameErr}
                setLastNameErr={setLastNameErr}
              />
            )}
          </AnimatePresence>
        </article>

        {/* Action Buttons */}
        <article className="flex flex-col items-center gap-3 justify-center">
          {!emailValid && (
            <CheackEmail IsCheckEmailValidation={IsCheckEmailValidation} />
          )}
          {!isEmailExists && emailValid && !passValid && (
            <CheackPass checkPassword={checkPassword} />
          )}
          {passValid && emailValid && <RegisterBtn fromStatus={fromStatus} />}
          <GoBack link={"/account/sign-up"} />
        </article>
      </form>

      <section className="flex justify-center items-center mt-6 gap-2">
        <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-[#acaaaa] text-center">
          Already have an account?
        </span>
        <Link to={"/account/sign-up"}>
          <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-white text-center">
            Sign in
          </span>
        </Link>
      </section>
    </div>
  );
}
