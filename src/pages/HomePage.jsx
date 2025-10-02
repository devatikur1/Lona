import React, { useContext } from "react";
import LoggedUserHome from "../components/Home/LoggedUserHome";
import { AppContext } from "../context/AppContext";
import GuestUserHome from "../components/GuestHome/GuestUserHome";

export default function HomePage() {
  const { logged } = useContext(AppContext);
  return (
    <>
      {logged === true && <LoggedUserHome />}
      {logged === false && <GuestUserHome />}
    </>
  );
}
