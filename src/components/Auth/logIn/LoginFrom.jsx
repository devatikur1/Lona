import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../Header";
import LoginTool from "./Part/LoginTool";
import Footer from "../Footer";
import LoginMainFrom from "./LoginMainFrom";

export default function LoginFrom({ method }) {
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
    <motion.div
      ref={loginFrom}
      style={{ minWidth: loginFromWidth }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col"
    >
      <header className="min-h-[8vh] max-h-[8vh] w-[100%] flex justify-center items-center px-4">
        <Header />
      </header>
      <main className="min-h-[78vh] lg:min-h-[70vh] w-full flex items-center py-[15%] justify-center">
        {method === "email" ? <LoginMainFrom /> : <LoginTool />}
      </main>
      <footer className="h-full flex justify-center items-end">
        <Footer />
      </footer>
    </motion.div>
  );
}
