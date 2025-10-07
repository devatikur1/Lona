import React, { useState, useEffect, useContext, useRef } from "react";
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
import ChatBotOption from "../components/Chat/ChatBotOption";
import ModelIcon from "../others/ModelIcon";
// import { Image } from "lucide-react";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [msgs, setmsgs] = useState([]);
  const [chatBoxHeieht, setChatBoxHeieht] = useState(70);
  const [lodingMsg, setLodingMsg] = useState(false);
  const [AiMsgLoading, setAiMsgLoading] = useState(false);
  const [AiImageLoading, setAiImageLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState({
    title: "Auto",
    icon: <ModelIcon size={16} />,
  });

  // firebase
  const fireStore = getFirestore(app);

  // router
  const location = useLocation();
  const navigate = useNavigate();

  // context
  const { userData, logged } = useContext(AppContext);

  // ref
  const aiCalledRef = useRef(false);

  // some
  const optionRef = useRef(null);
  const [showOption, setShowOption] = useState(false);

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
        setLodingMsg(true);
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
        if (
          data.length === 1 &&
          data[0].type === "user" &&
          !aiCalledRef.current
        ) {
          aiCalledRef.current = true;
          if (data[0].model === "Auto") {
            setAiMsgLoading(true);
            const contextMsgs = data.map((m) => ({
              role: m.type === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            }));

            const aiResponse = await AI.geminiText(data[0].text, contextMsgs);
            const aiChat = {
              type: "ai",
              model: data[0].model,
              text: aiResponse.content,
              createdAt: Timestamp.now(),
              imgLink: "",
            };

            if (AiMsgLoading === false) {
              setmsgs((prev) => [...prev, aiChat]);
            }
            // Update Firestore with AI message
            await updateDoc(chatDataRef, {
              chats: arrayUnion(aiChat),
            });
          } else if (data[0].model === "Images") {
            setAiImageLoading(true);
            const aiResponse = await AI.genImage(data[0].text);
            const aiChat = {
              type: "ai",
              model: data[0].model,
              text: "",
              createdAt: Timestamp.now(),
              imgLink: aiResponse.link,
            };
            console.log(aiChat);

            if (AiMsgLoading === false) {
              setmsgs((prev) => [...prev, aiChat]);
            }
            // Update Firestore with AI message
            await updateDoc(chatDataRef, {
              chats: arrayUnion(aiChat),
            });
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLodingMsg(false);
        setAiMsgLoading(false);
        setAiImageLoading(false);
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, location.pathname]);

  function onSend(text) {
    async function fetchAIMag() {
      const subColId = location.pathname.split("/")[2];
      if (!subColId || !userData?.id) return;

      try {
        setLodingMsg(true);
        const userRef = doc(fireStore, "chats", userData.id);
        const chatDataRef = doc(userRef, subColId, "data");

        // AI response if only one user message exists
        if (text) {
          setLodingMsg(true);
          if (modelInfo.title === "Auto") {
            console.log(modelInfo.title);

            const userChat = {
              type: "user",
              text: text.trim(),
              model: modelInfo.title,
              createdAt: Timestamp.now(),
              imgLink: "",
            };

            setmsgs((prev) => [...prev, userChat]);

            await updateDoc(chatDataRef, {
              chats: arrayUnion(userChat),
            });

            const contextMsgs = msgs.map((m) => ({
              role: m.type === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            }));

            setAiMsgLoading(true);
            let prompt = text.trim();

            setText("");
            const aiResponse = await AI.geminiText(prompt, contextMsgs);
            const aiChat = {
              type: "ai",
              text: aiResponse.content,
              createdAt: Timestamp.now(),
              imgLink: "",
              model: modelInfo.title,
            };
            setAiMsgLoading(false);
            setmsgs((prev) => [...prev, aiChat]);

            // Update Firestore with AI message
            await updateDoc(chatDataRef, {
              chats: arrayUnion(aiChat),
            });
          } else if (modelInfo.title === "Images") {
            setAiImageLoading(true);
            console.log(modelInfo.title);
            const userChat = {
              type: "user",
              text: text.trim(),
              model: modelInfo.title,
              createdAt: Timestamp.now(),
              imgLink: "",
            };

            if (AiMsgLoading === false) {
              setmsgs((prev) => [...prev, userChat]);
            }

            await updateDoc(chatDataRef, {
              chats: arrayUnion(userChat),
            });
            setText("");
            const aiResponse = await AI.genImage(text);
            const aiChat = {
              type: "ai",
              model: modelInfo.title,
              text: "",
              createdAt: Timestamp.now(),
              imgLink: aiResponse.link,
            };
            setAiImageLoading(false);
            setmsgs((prev) => [...prev, aiChat]);
            // Update Firestore with AI message
            await updateDoc(chatDataRef, {
              chats: arrayUnion(aiChat),
            });
          }
          setLodingMsg(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchAIMag();
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
        {msgs.length !== 0 && (
          <ChatView
            msgs={msgs}
            AiMsgLoading={AiMsgLoading}
            AiImageLoading={AiImageLoading}
            setLodingMsg={setLodingMsg}
          />
        )}
        {msgs.length === 0 && (
          <LoadingComponent chatBoxHeieht={chatBoxHeieht} />
        )}
        <ChatBotOption
          optionRef={optionRef}
          chatBoxHeieht={chatBoxHeieht}
          showOption={showOption}
          setModelInfo={setModelInfo}
          setShowOption={setShowOption}
        />
        <ChatBox
          text={text}
          modelInfo={modelInfo}
          setText={setText}
          lodingMsg={lodingMsg}
          setChatBoxHeieht={setChatBoxHeieht}
          onSend={onSend}
          showOption={showOption}
          setShowOption={setShowOption}
        />
      </section>
    </aside>
  );
}
