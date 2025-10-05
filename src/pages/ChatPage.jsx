import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import ChatBox from "../components/Chat/ChatBox";
import ChatView from "../components/Chat/ChatVew";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../context/firebase/Firebase";
import { AppContext } from "../context/AppContext";
import LoadingComponent from "../components/Chat/LoadingComponent";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState({});
  const [msgs, setmsgs] = useState([]);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [lodingMsg, setLodingMsg] = useState(false);
  const [AiMsgLoading, setAiMsgLoading] = useState(false);

  // firebase
  const fireStore = getFirestore(app);

  // router
  const location = useLocation();
  const navigate = useNavigate();

  // context
  const { userData, logged } = useContext(AppContext);

  useEffect(() => {
    if (logged === false) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  useEffect(() => {
    console.log(userData);

    const fetchMessages = async () => {
      const subColId = location.pathname.split("/")[2];
      if (!subColId && !userData) return; // safety check

      try {
        const userRef = doc(fireStore, "chats", "aAGK5uzzT7YUlchKKJiUOKz8eUj2");
        const messagesRef = collection(userRef, subColId);
        const snapshot = await getDocs(messagesRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setmsgs(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  function onSend() {
    console.log("hhh");
  }

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
        {msgs.length !== 0 && (
          <ChatView
            msgs={msgs}
            AiMsgLoading={AiMsgLoading}
            setLodingMsg={setLodingMsg}
          />
        )}
        {msgs.length === 0 && (
          <LoadingComponent chatBoxHeieht={chatBoxHeieht} />
        )}
        <ChatBox
          text={text}
          setText={setText}
          file={file}
          setFile={setFile}
          lodingMsg={lodingMsg}
          setChatBoxHeieht={setChatBoxHeieht}
          onSend={onSend}
        />
      </section>
    </aside>
  );
}
