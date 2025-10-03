import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import userAuth from "./firebase/Auth/UserAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/Firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function AppContextProvider({ children }) {
  const [showHeader, setShowHeader] = useState(false);
  const [logged, setLogged] = useState(null);
  const [userData, setUserData] = useState({});
  const [userDataUpdate, setUserDataUpdate] = useState(0);

  const [text, setText] = useState("");

  // firebase
  const auth = getAuth(app);
  const fireStore = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLogged(true);
        const docRef = doc(fireStore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } else {
        setLogged(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataUpdate]);

  
  return (
    <AppContext.Provider
      value={{
        showHeader,
        setShowHeader,
        userData,
        setUserDataUpdate,
        logged,
        userAuth,
        text,
        setText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
