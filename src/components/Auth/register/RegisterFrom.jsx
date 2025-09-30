import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../Header";
import RegisterTool from "./Part/RegisterTool";
import Footer from "../Footer";

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
    <motion.div
      ref={RegisterFrom}
      style={{ minWidth: registerFromWidth }}
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col"
    >
      <header className="min-h-[8vh] max-h-[8vh] w-[100%] flex justify-center items-center px-4">
        <Header />
      </header>
      <main className="h-[70vh] w-full flex items-center py-[15%] justify-center">
        <RegisterTool />
      </main>
      <footer className="h-full flex justify-center items-end">
        <Footer />
      </footer>
    </motion.div>
  );
}
