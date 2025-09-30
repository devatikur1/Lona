import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import RegisterTool from "./Part/RegisterTool";

export default function RegisterFrom() {
  const RegisterFrom = useRef(null);
  const [registerFromWidth, setRegisterFromWidth] = useState(null);

  // resize listener
  function handleResize() {
    setRegisterFromWidth(RegisterFrom.current.parentNode.offsetWidth);
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
      ref={RegisterFrom}
      style={{ minWidth: registerFromWidth }}
      className="flex flex-col"
    >
      <header className="h-[8vh] w-[100%] flex justify-center items-center px-4">
        <Header />
      </header>
      <main className="h-[70vh] w-full flex items-center py-[15%] justify-center">
        <RegisterTool />
      </main>
    </div>
  );
}
