import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import LoginTool from "./Part/LoginTool";

export default function LoginFrom() {
  const loginFrom = useRef(null);
  const [loginFromWidth, setLoginFromWidth] = useState(null);
  // resize listener

  function handleResize() {
    setLoginFromWidth(loginFrom.current.parentNode.offsetWidth);
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={loginFrom}
      style={{ minWidth: loginFromWidth }}
      className="flex flex-col"
    >
      <header className="h-[8vh] w-[100%] flex py-6 px-4">
        <Header />
      </header>
      <main className="h-[70vh] w-full flex items-center py-[15%] justify-center">
        <LoginTool />
      </main>
    </div>
  );
}
