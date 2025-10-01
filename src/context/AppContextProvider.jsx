import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import userAuth from "./firebase/Auth/UserAuth";

export default function AppContextProvider({ children }) {
  const [showHeader, setShowHeader] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    let user = userAuth.detectedUser();
    console.log(user);
    if (user !== "No user found") {
      setLogged(true);
    } else {
      setLogged(false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{ showHeader, setShowHeader, userAuth, logged }}
    >
      {children}
    </AppContext.Provider>
  );
}
