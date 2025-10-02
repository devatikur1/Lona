import { Github, Loader2, Mail, Twitter } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GoogleIcon from "../../../../others/GoogleIcon";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import { getOS } from "../../../../hooks/useGetOs";
import { getGeoLocation } from "../../../../hooks/useGetGeoLocation";
import { getData } from "../../../../hooks/useGetData";

export default function LoginTool() {  // some
  const [loc, setLoc] = useState({});

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

  useEffect(() => {
    async function fetchLocation() {
      try {
        const location = await getLocationInfo();
        setLoc(location);
      } catch (err) {
        console.warn("User blocked location on mount:", err);
      }
    }

    fetchLocation();
  }, []);

  async function googleAuthSignIn() {
    setIsGoogleAuthDis(true);
    setGoogleAuthStutas("loading");
    try {
      const app = await userAuth.googleSign(loc);
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
      const app = await userAuth.gihubSignIn(loc);
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
      const app = await userAuth.XSignIn(loc);
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
          Log into your account
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
        <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-[#acaaaa] text-center">
          Don't have an account?
        </span>
        <Link to={"/account/sign-up"}>
          <span className="text-sm lg:text-[0.9rem] xl:text-[1rem] text-white text-center">
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}
