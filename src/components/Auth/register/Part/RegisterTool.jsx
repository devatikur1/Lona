/* eslint-disable eqeqeq */
import { Github, Loader2, Mail, Twitter } from "lucide-react";
import React, { useContext, useState } from "react";
import GoogleIcon from "../../../../others/GoogleIcon";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

export default function RegisterTool() {
  // sign in mathor
  const [googleAuthStutas, setGoogleAuthStutas] = useState("normal");
  const [gihubAuthStutas, setGihubAuthStutas] = useState("normal");
  const [XAuthStutas, setXAuthStutas] = useState("normal");

  // sign box dis
  const [IsXAuthDis, setIsXAuthDis] = useState(false);
  const [IsGoogleAuthDis, setIsGoogleAuthDis] = useState(false);
  const [IsGihubAuthSDis, setIsGihubAuthSDis] = useState(false);

  //context
  const { userAuth } = useContext(AppContext);

  async function getFullLocationDetails() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      if (!response.ok) {
        return {
          latitude,
          longitude,
          address: {},
          displayName: "Unknown Location",
        };
      }

      const data = await response.json();
      return {
        latitude,
        longitude,
        address: data.address || {},
        displayName: data.display_name || "Unknown Location",
      };
    } catch (err) {
      console.error("Location fetch error:", err.message);
      return {
        latitude: null,
        longitude: null,
        address: {},
        displayName: "Unknown Location",
      };
    }
  }

  async function googleAuthSignIn() {
    setIsGoogleAuthDis(true);
    setGoogleAuthStutas("loading");
    try {
      const loc = await getFullLocationDetails();
      console.log(loc);
      const app = await userAuth.googleSign(loc);
      console.log(app);
      setGoogleAuthStutas(app.type === "data" ? "normal" : "error");
    } catch (err) {
      setGoogleAuthStutas("error");
    } finally {
      setIsGoogleAuthDis(false);
    }
  }

  async function githubAuthSignIn() {
    setIsGihubAuthSDis(true);
    setGihubAuthStutas("loading");
    try {
      const loc = await getFullLocationDetails();
      console.log(loc);
      const app = await userAuth.gihubSignIn(loc);
      console.log(app);
      setGihubAuthStutas(app.type === "data" ? "normal" : "error");
    } catch (err) {
      setGihubAuthStutas("error");
    } finally {
      setIsGihubAuthSDis(false);
    }
  }

  async function XAuthSignIn() {
    setIsXAuthDis(true);
    setXAuthStutas("loading");
    try {
      const loc = await getFullLocationDetails();
      console.log(loc);
      const app = await userAuth.XSignIn(loc);
      console.log(app);
      setXAuthStutas(app.type === "data" ? "normal" : "error");
    } catch (err) {
      setXAuthStutas("error");
    } finally {
      setIsXAuthDis(false);
    }
  }

  return (
    <div className="w-[100%] sm:w-[80%] md:w-[53%] lg:w-[80%] xl:w-[55%] flex mx-auto flex-col">
      <div className="flex justify-center items-center pb-9 pt-5 md:pt-0 md:pb-14">
        <h1 className="text-[1.5rem] text-center lg:text-[1.55rem] xl:text-[2rem]">
          Create your account
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <Link
          to={"/account/sign-up?method=email"}
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

        <button
          onClick={XAuthSignIn}
          disabled={IsXAuthDis}
          className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center disabled:opacity-80"
        >
          <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
            {(XAuthStutas === "normal" || XAuthStutas === "error") && (
              <>
                <span>
                  <Twitter color="#fff" size={19} />
                </span>

                {XAuthStutas === "normal" && (
                  <span className="text-[#fff]">Login with X</span>
                )}
                {XAuthStutas === "error" && (
                  <span className="text-[#fff]">Login with X</span>
                )}
              </>
            )}
            {XAuthStutas === "loading" && (
              <span className="text-[#7f1d1d] animate-spin">
                <Loader2 />
              </span>
            )}
          </div>
        </button>

        <button
          disabled={IsGoogleAuthDis}
          onClick={googleAuthSignIn}
          className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center disabled:opacity-80"
        >
          <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
            {(googleAuthStutas === "normal" ||
              googleAuthStutas === "error") && (
              <>
                <span>
                  <GoogleIcon size={18} />
                </span>

                {googleAuthStutas === "normal" && (
                  <span className="text-[#fff]">Login with Google</span>
                )}
                {googleAuthStutas === "error" && (
                  <span className="text-[#fff]">Login with Google</span>
                )}
              </>
            )}

            {googleAuthStutas === "loading" && (
              <span className="text-[#7f1d1d] animate-spin">
                <Loader2 />
              </span>
            )}
          </div>
        </button>

        <button
          disabled={IsGihubAuthSDis}
          onClick={githubAuthSignIn}
          className="w-[85%] lg:w-[75%] bg-[#080808] transition-all duration-500 hover:bg-[#1f1f22] border border-[#212123] rounded-3xl flex justify-center items-center disabled:opacity-80"
        >
          <div className="flex items-center gap-3 py-[0.45rem] md:py-[0.5rem]">
            {(gihubAuthStutas === "normal" || gihubAuthStutas === "error") && (
              <>
                <span>
                  <Github color="#fff" size={19} />
                </span>

                {gihubAuthStutas === "normal" && (
                  <span className="text-[#fff]">Login with Github</span>
                )}
                {gihubAuthStutas === "error" && (
                  <span className="text-[#fff]">Login with Github</span>
                )}
              </>
            )}

            {gihubAuthStutas === "loading" && (
              <span className="text-[#7f1d1d] animate-spin">
                <Loader2 />
              </span>
            )}
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
