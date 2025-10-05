import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import ChatBox from "../components/Chat/ChatBox";
import ChatView from "../components/Chat/ChatVew";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { app } from "../context/firebase/Firebase";
import { AppContext } from "../context/AppContext";
import LoadingComponent from "../components/Chat/LoadingComponent";
import AI from "../context/AI";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState({});
  const [msgs, setmsgs] = useState([]);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [lodingMsg, setLodingMsg] = useState(false);
  const [AiMsgLoading, setAiMsgLoading] = useState(false);

  const [updateData, setUpdateData] = useState(0);

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
    const fetchMessages = async () => {
      const subColId = location.pathname.split("/")[2];
      if (!subColId || !userData?.id) return;

      try {
        const userRef = doc(fireStore, "chats", userData.id);
        const chatDataRef = doc(userRef, subColId, "data");

        const snapshot = await getDoc(chatDataRef);

        if (!snapshot.exists()) {
          console.log("No messages found");
          setmsgs([]);
          return;
        }

        const data = snapshot.data().chats || [];
        console.log("Messages:", data);
        setmsgs(data);

        // AI response if only one user message exists
        if (data.length === 1 && data[0].type === "user") {
          const contextMsgs = data.map((m) => ({
            role: m.type === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          }));

          setAiMsgLoading(true);

          const aiResponse = await AI.geminiText(data[0].text, contextMsgs);
          const aiChat = {
            type: "ai",
            text: aiResponse.content,
            createdAt: Timestamp.now(),
            imgLink: "",
          };

          // Update Firestore with AI message
          await updateDoc(chatDataRef, {
            chats: arrayUnion(aiChat),
          });
          setUpdateData((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setAiMsgLoading(false);
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, location.pathname]);

  useEffect(() => {
    async function updateDataFuntion() {
      const subColId = location.pathname.split("/")[2];
      if (!subColId || !userData?.id) return;

      try {
        const userRef = doc(fireStore, "chats", userData.id);
        const chatDataRef = doc(userRef, subColId, "data");

        const snapshot = await getDoc(chatDataRef);

        if (!snapshot.exists()) {
          console.log("No messages found");
          setmsgs([]);
          return;
        }

        const data = snapshot.data().chats || [];
        setmsgs(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    updateDataFuntion();
  }, [updateData]);

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
