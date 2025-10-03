import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import userAuth from "./firebase/Auth/UserAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/Firebase";

export default function AppContextProvider({ children }) {
  const [showHeader, setShowHeader] = useState(false);
  const [logged, setLogged] = useState(null);
  const [userData, setUserData] = useState(false);

  const [text, setText] = useState("");

  const auth = getAuth(app);
  useEffect(() => {
    console.log(logged);
    
  }, [logged])
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setLogged(true);
      } else {
        setLogged(false);
      }
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{ showHeader, setShowHeader, userAuth, logged, text, setText }}
    >
      {children}
    </AppContext.Provider>
  );
}
