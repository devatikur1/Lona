import React, { useState, useContext, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ChatBox from "./ChatBox";
import GuestMain from "../GuestHome/GuestMain";
import { AppContext } from "../../context/AppContext";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "../../context/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Chat/LoadingComponent";
import ChatBotOption from "../Chat/ChatBotOption";
import ModelIcon from "../../others/ModelIcon";

export default function LoggedUserHome() {
  const [text, setText] = useState("");
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [loading, setLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState({
    title: "Auto",
    icon: <ModelIcon size={16} />,
  });

  const { userData } = useContext(AppContext);

  // router
  let navigate = useNavigate();

  // firebase
  const fireStore = getFirestore(app);

  // some
  const optionRef = useRef(null);
  const [showOption, setShowOption] = useState(false);

  function generateUniqueId() {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }
    return (
      Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9)
    );
  }

  // 🔹 Full async function to handle sending a message
  async function onSend(text) {
    setLoading(true);
    if (!userData) return; 
    try {
      const userRef = doc(fireStore, "chats", userData.id);
      const userSnap = await getDoc(userRef);

      // 1️⃣ Create user doc if not exists
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: userData.id,
          name: userData.name || "",
          email: userData.email || "",
          createdAt: Timestamp.now(),
        });
        console.log("New user doc created ✅");
      }

      // 2️⃣ Generate new chat session id
      let newChatId = generateUniqueId();
      const chatDataRef = doc(userRef, "msg", newChatId);

      // 3️⃣ Initial chat object
      const chatObject = {
        title: "New Chat",
        createdAt: Timestamp.now(),
        chats: [
          {
            type: "user",
            text,
            model: modelInfo.title,
            createdAt: Timestamp.now(),
            imgLink: "",
          },
        ],
        id: newChatId,
      };

      // 4️⃣ Save the document
      await setDoc(chatDataRef, chatObject);

      // 5️⃣ Navigate to the new chat
      navigate(`/c/${newChatId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setLoading(false);
    }
  }

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="flex">
      <section
        style={{
          borderRight: "0.124rem solid #212123",
        }}
        className="h-screen"
      >
        <Sidebar />
      </section>
      <section className="relative w-full h-screen flex flex-col justify-start items-start touch-none overflow-hidden">
        <Header />
        {!loading && <GuestMain chatBoxHeieht={chatBoxHeieht} />}
        {loading && <LoadingComponent chatBoxHeieht={chatBoxHeieht} />}
        <ChatBotOption
          optionRef={optionRef}
          chatBoxHeieht={chatBoxHeieht}
          showOption={showOption}
          setModelInfo={setModelInfo}
          setShowOption={setShowOption}
        />
        <ChatBox
          text={text}
          setText={setText}
          modelInfo={modelInfo}
          setChatBoxHeieht={setChatBoxHeieht}
          onSend={onSend}
          loading={loading}
          setShowOption={setShowOption}
          showOption={showOption}
        />
      </section>
    </aside>
  );
}
