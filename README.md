# 🤖 Lona - AI Chat Application

> একটি আধুনিক এবং সুন্দর AI চ্যাট অ্যাপ্লিকেশন যা React এবং Firebase দিয়ে তৈরি

---

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [📱 Website Pages Overview](#-website-pages-overview)
- [🔧 Available Scripts](#-available-scripts)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Features](#-features)

---

## 🚀 Getting Started

এই প্রজেক্টটি [Create React App](https://github.com/facebook/create-react-app) দিয়ে তৈরি করা হয়েছে।

### Prerequisites

- Node.js (v14 বা তার উপরে)
- npm বা yarn
- Firebase account

### Installation

```bash
npm install
```

---

## 📱 Website Pages Overview

### 🏠 **HomePage** (`/`)

**Route:** `src/pages/HomePage.jsx`

এটি অ্যাপ্লিকেশনের মূল পেজ। ব্যবহারকারীর লগইন স্ট্যাটাস অনুযায়ী দুটি ভিন্ন ভিউ দেখায়:

#### 🔐 **Logged User Home**

- যখন ব্যবহারকারী লগইন থাকে
- সম্পূর্ণ চ্যাট ইন্টারফেস
- সাইডবার, হেডার এবং চ্যাট বক্স
- নতুন চ্যাট শুরু করার অপশন

#### 👤 **Guest User Home**

- যখন ব্যবহারকারী লগইন থাকে না
- লিমিটেড চ্যাট ফিচার
- রেজিস্টার/লগইন বাটন
- গেস্ট হিসেবে চ্যাট করার সুবিধা

---

### 💬 **ChatPage** (`/c/:chatId`)

**Route:** `src/pages/ChatPage.jsx`

এটি অ্যাপ্লিকেশনের মূল চ্যাট পেজ যেখানে AI এর সাথে কথোপকথন হয়।

#### 🎯 **Key Features:**

- **AI Models:** Auto (Gemini) এবং Image Generation
- **Real-time Chat:** Firebase Firestore ব্যবহার করে
- **Message History:** পূর্বের কথোপকথন সংরক্ষণ
- **Model Selection:** Auto বা Images মডেল বেছে নেওয়ার সুবিধা
- **Responsive Design:** মোবাইল এবং ডেস্কটপে সমানভাবে কাজ করে

#### 🔄 **Chat Flow:**

1. ব্যবহারকারী মেসেজ টাইপ করে
2. মেসেজ Firebase এ সংরক্ষিত হয়
3. AI রেসপন্স তৈরি করে
4. AI রেসপন্স ইউজারকে দেখানো হয়
5. পুরো কথোপকথন সংরক্ষিত থাকে

---

### 🔐 **Authentication Pages**

#### 📝 **Login Page** (`/account/sign-in`)

**Route:** `src/pages/Auth/LogIn.jsx`

- **Email/Password Login:** সাধারণ লগইন
- **Google Authentication:** Google OAuth সুবিধা
- **Responsive Layout:** ডেস্কটপে ইমেজ সেকশন, মোবাইলে শুধু ফর্ম
- **Auto Redirect:** লগইন থাকলে হোম পেজে রিডাইরেক্ট

#### 📋 **Register Page** (`/account/sign-up`)

**Route:** `src/pages/Auth/Register.jsx`

- **Multi-step Registration:** ধাপে ধাপে রেজিস্ট্রেশন
- **Form Validation:** ইমেইল এবং পাসওয়ার্ড ভ্যালিডেশন
- **Profile Setup:** নাম, ইমেইল, পাসওয়ার্ড সেটআপ
- **Email Verification:** ইমেইল ভেরিফিকেশন প্রসেস

---

## 🏗️ Project Structure

```
src/
├── pages/                    # 🏠 Main Application Pages
│   ├── HomePage.jsx         # Main landing page
│   ├── ChatPage.jsx         # AI chat interface
│   ├── AccountPage.jsx      # Account management
│   └── Auth/               # 🔐 Authentication Pages
│       ├── LogIn.jsx       # User login
│       └── Register.jsx    # User registration
├── components/              # 🧩 Reusable Components
│   ├── Auth/               # Authentication components
│   ├── Chat/               # Chat interface components
│   ├── Home/               # Home page components
│   └── GuestHome/          # Guest user components
├── context/                # 🔄 React Context
│   ├── AppContext.jsx      # Main app state
│   └── firebase/           # Firebase configuration
├── hooks/                  # 🎣 Custom Hooks
└── utils/                  # 🛠️ Utility Functions
```

---

## 💬 Chat Logic & Architecture

### 🔄 **Complete Chat Flow**

#### 1. **Message Input Process**

```javascript
// User types message in ChatBox component
const handleSubmit = (e) => {
  e.preventDefault();
  if (!text.trim()) return;
  onSend(text); // Calls ChatPage's onSend function
};
```

#### 2. **Message Processing in ChatPage**

```javascript
// ChatPage.jsx - Main chat logic
function onSend(text) {
  // 1. Save user message to Firebase
  const userChat = {
    type: "user",
    text: text.trim(),
    model: modelInfo.title, // "Auto" or "Images"
    createdAt: Timestamp.now(),
    imgLink: ""
  };

  // 2. Update Firestore with user message
  await updateDoc(chatDataRef, {
    chats: arrayUnion(userChat)
  });

  // 3. Generate AI response based on model
  if (modelInfo.title === "Auto") {
    // Text generation using Gemini AI
    const aiResponse = await AI.geminiText(prompt, contextMsgs);
  } else if (modelInfo.title === "Images") {
    // Image generation using AI
    const aiResponse = await AI.genImage(text);
  }
}
```

### 🤖 **AI Integration Details**

#### **Gemini Text Generation** (`AI.geminiText`)

```javascript
// src/context/AI.js
geminiText: async (prompt, msgs = []) => {
  const chat = ai.chats.create({
    name: "Lonas",
    model: "gemini-2.5-flash", // Google's latest model
    history: [...msgs], // Conversation context
  });

  const response = await chat.sendMessage({ message: prompt });
  return {
    type: "data",
    role: "model",
    content: response.text,
  };
};
```

#### **Image Generation** (`AI.genImage`)

```javascript
// Uses external API for image generation
genImage: async (prompt) => {
  const imgURL = `https://api.a0.dev/assets/image?text=${encodeURIComponent(
    prompt
  )}&aspect=1:1&seed=${Date.now()}`;

  const res = await fetch(imgURL);
  return {
    type: "data",
    role: "model",
    link: res.url,
  };
};
```

### 🗄️ **Firebase Database Structure**

#### **Chat Collection Schema**

```javascript
// Firestore Structure
chats/
  {userId}/
    msg/
      {chatId}/
        - title: "Chat title (first 30 chars)"
        - chats: [
            {
              type: "user" | "ai",
              text: "message content",
              model: "Auto" | "Images",
              createdAt: Timestamp,
              imgLink: "image URL or empty string"
            }
          ]
```

### 🎨 **UI Components Architecture**

#### **ChatBox Component**

- **Auto-growing textarea:** Dynamically adjusts height based on content
- **Model selector:** Dropdown for choosing AI model (Auto/Images)
- **Send button:** Disabled during AI processing
- **Responsive design:** Adapts to different screen sizes

#### **ChatView Component**

- **Message rendering:** Displays user and AI messages differently
- **Auto-scroll:** Automatically scrolls to latest message
- **Loading states:** Shows different loading animations for text/image generation

#### **AiMsg Component**

- **Typewriter effect:** Text appears word by word for better UX
- **Markdown support:** Full markdown rendering with syntax highlighting
- **Copy functionality:** Users can copy AI responses
- **Image display:** Shows generated images with download option

#### **UserMsg Component**

- **Right-aligned:** User messages appear on the right side
- **Image support:** Can display attached images
- **Copy functionality:** Users can copy their own messages

### 🔧 **State Management**

#### **ChatPage State Variables**

```javascript
const [text, setText] = useState(""); // Current input text
const [msgs, setmsgs] = useState([]); // All messages in chat
const [lodingMsg, setLodingMsg] = useState(false); // Loading state
const [AiMsgLoading, setAiMsgLoading] = useState(false); // AI text loading
const [AiImageLoading, setAiImageLoading] = useState(false); // AI image loading
const [modelInfo, setModelInfo] = useState({
  title: "Auto",
  icon: <ModelIcon size={16} />,
}); // Selected AI model
```

### 🚀 **Performance Optimizations**

#### **Message Loading Strategy**

1. **Lazy loading:** Messages loaded only when chat is accessed
2. **Context preservation:** AI maintains conversation context
3. **Error handling:** Graceful fallbacks for API failures
4. **Loading indicators:** Clear feedback during AI processing

#### **Real-time Updates**

- **Firebase listeners:** Automatic UI updates when messages change
- **Optimistic updates:** UI updates immediately, then syncs with database
- **Auto-scroll management:** Smooth scrolling to new messages

### 🎯 **Model Selection Logic**

#### **Auto Model (Gemini)**

- **Use case:** General conversations, questions, text generation
- **Features:** Context-aware responses, code generation, explanations
- **Processing:** Text-based input/output

#### **Images Model**

- **Use case:** Image generation from text descriptions
- **Features:** Creative image creation, visual content
- **Processing:** Text input → Image output

### 🔐 **Security & Error Handling**

#### **Input Validation**

- **Text sanitization:** Prevents XSS attacks
- **Length limits:** Prevents excessive API usage
- **Rate limiting:** Built-in protection against spam

#### **Error Recovery**

- **API fallbacks:** Alternative responses when AI fails
- **User notifications:** Clear error messages via toast
- **Graceful degradation:** App continues working even if some features fail

---

## ⚡ Features

### 🤖 **AI Integration**

- **Gemini AI:** Google's Gemini model for text generation
- **Image Generation:** AI-powered image creation
- **Auto Model Selection:** Intelligent model switching

### 🔥 **Firebase Integration**

- **Authentication:** Google Auth + Email/Password
- **Firestore Database:** Real-time chat storage
- **User Management:** Profile and chat history

### 🎨 **Modern UI/UX**

- **Dark Theme:** Beautiful dark mode interface
- **Responsive Design:** Works on all devices
- **Smooth Animations:** Enhanced user experience
- **Toast Notifications:** Real-time feedback

### 🔐 **Security Features**

- **Route Protection:** Authenticated routes
- **Input Validation:** Secure form handling
- **Error Handling:** Graceful error management

---

## 🌟 Technology Stack

- **Frontend:** React 18, React Router v6
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **AI:** Google Gemini API
- **State Management:** React Context API
- **Icons:** Custom SVG Components

---

_Made with ❤️ using React and Firebase_
