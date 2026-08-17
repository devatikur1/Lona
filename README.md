# 🤖 Lona - AI Chat Application

> A modern and beautiful AI chat application built with React and Firebase.

---

## 📋 Table of Contents

* [🚀 Getting Started](#-getting-started)
* [📱 Website Pages Overview](#-website-pages-overview)
* [🔧 Available Scripts](#-available-scripts)
* [🏗️ Project Structure](#️-project-structure)
* [⚡ Features](#-features)

---

## 🚀 Getting Started

This project was created using [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* Firebase account

### Installation

```bash
npm install
```

---

## 📱 Website Pages Overview

### 🏠 **HomePage** (`/`)

**Route:** `src/pages/HomePage.jsx`

This is the main page of the application. It displays two different views based on the user's login status.

#### 🔐 **Logged User Home**

* Available when the user is logged in
* Full chat interface
* Sidebar, header, and chat box
* Option to start a new chat

#### 👤 **Guest User Home**

* Available when the user is not logged in
* Limited chat features
* Register/Login buttons
* Option to chat as a guest

---

### 💬 **ChatPage** (`/c/:chatId`)

**Route:** `src/pages/ChatPage.jsx`

This is the main chat page where users interact with the AI.

#### 🎯 **Key Features**

* **AI Models:** Auto (Gemini) and Image Generation
* **Real-time Chat:** Uses Firebase Firestore
* **Message History:** Stores previous conversations
* **Model Selection:** Choose between Auto and Images
* **Responsive Design:** Works seamlessly on mobile and desktop

#### 🔄 **Chat Flow**

1. The user types a message
2. The message is saved to Firebase
3. The AI generates a response
4. The AI response is displayed to the user
5. The complete conversation is stored

---

### 🔐 **Authentication Pages**

#### 📝 **Login Page** (`/account/sign-in`)

**Route:** `src/pages/Auth/LogIn.jsx`

* **Email/Password Login:** Standard email and password authentication
* **Google Authentication:** Google OAuth support
* **Responsive Layout:** Image section on desktop, form-only layout on mobile
* **Auto Redirect:** Redirects logged-in users to the home page

#### 📋 **Register Page** (`/account/sign-up`)

**Route:** `src/pages/Auth/Register.jsx`

* **Multi-step Registration:** Step-by-step registration process
* **Form Validation:** Email and password validation
* **Profile Setup:** Name, email, and password setup
* **Email Verification:** Email verification process

---

## 🏗️ Project Structure

```text
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
// User types a message in the ChatBox component
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

  // 3. Generate AI response based on the selected model
  if (modelInfo.title === "Auto") {
    // Text generation using Gemini AI
    const aiResponse = await AI.geminiText(prompt, contextMsgs);
  } else if (modelInfo.title === "Images") {
    // Image generation using AI
    const aiResponse = await AI.genImage(text);
  }
}
```

---

## 🤖 AI Integration Details

### **Gemini Text Generation** (`AI.geminiText`)

```javascript
// src/context/AI.js
geminiText: async (prompt, msgs = []) => {
  const chat = ai.chats.create({
    name: "Lonas",
    model: "gemini-2.5-flash",
    history: [...msgs],
  });

  const response = await chat.sendMessage({ message: prompt });

  return {
    type: "data",
    role: "model",
    content: response.text,
  };
};
```

### **Image Generation** (`AI.genImage`)

```javascript
// Uses an external API for image generation
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

---

## 🗄️ Firebase Database Structure

### **Chat Collection Schema**

```text
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

---

## 🎨 UI Components Architecture

### **ChatBox Component**

* **Auto-growing textarea:** Dynamically adjusts its height based on content
* **Model selector:** Dropdown for selecting an AI model (Auto/Images)
* **Send button:** Disabled while the AI is processing
* **Responsive design:** Adapts to different screen sizes

### **ChatView Component**

* **Message rendering:** Displays user and AI messages differently
* **Auto-scroll:** Automatically scrolls to the latest message
* **Loading states:** Shows different loading animations for text/image generation

### **AiMsg Component**

* **Typewriter effect:** Displays text word by word for a better UX
* **Markdown support:** Full Markdown rendering with syntax highlighting
* **Copy functionality:** Allows users to copy AI responses
* **Image display:** Displays generated images with a download option

### **UserMsg Component**

* **Right-aligned:** User messages appear on the right side
* **Image support:** Supports displaying attached images
* **Copy functionality:** Allows users to copy their own messages

---

## 🔧 State Management

### **ChatPage State Variables**

```javascript
const [text, setText] = useState(""); // Current input text
const [msgs, setmsgs] = useState([]); // All messages in the chat
const [lodingMsg, setLodingMsg] = useState(false); // Loading state
const [AiMsgLoading, setAiMsgLoading] = useState(false); // AI text loading
const [AiImageLoading, setAiImageLoading] = useState(false); // AI image loading

const [modelInfo, setModelInfo] = useState({
  title: "Auto",
  icon: <ModelIcon size={16} />,
}); // Selected AI model
```

---

## 🚀 Performance Optimizations

### **Message Loading Strategy**

1. **Lazy loading:** Messages are loaded only when the chat is accessed
2. **Context preservation:** AI maintains the conversation context
3. **Error handling:** Provides graceful fallbacks for API failures
4. **Loading indicators:** Provides clear feedback during AI processing

### **Real-time Updates**

* **Firebase listeners:** Automatically updates the UI when messages change
* **Optimistic updates:** UI updates immediately and then syncs with the database
* **Auto-scroll management:** Smoothly scrolls to new messages

---

## 🎯 Model Selection Logic

### **Auto Model (Gemini)**

* **Use case:** General conversations, questions, text generation
* **Features:** Context-aware responses, code generation, and explanations
* **Processing:** Text-based input and output

### **Images Model**

* **Use case:** Image generation from text descriptions
* **Features:** Creative image generation and visual content creation
* **Processing:** Text input → Image output

---

## 🔐 Security & Error Handling

### **Input Validation**

* **Text sanitization:** Helps prevent XSS attacks
* **Length limits:** Helps prevent excessive API usage
* **Rate limiting:** Provides built-in protection against spam

### **Error Recovery**

* **API fallbacks:** Provides alternative responses when the AI service fails
* **User notifications:** Displays clear error messages using toast notifications
* **Graceful degradation:** Keeps the application functional even when some features fail

---

## ⚡ Features

### 🤖 **AI Integration**

* **Gemini AI:** Google's Gemini model for text generation
* **Image Generation:** AI-powered image creation
* **Auto Model Selection:** Intelligent model switching

### 🔥 **Firebase Integration**

* **Authentication:** Google Auth + Email/Password
* **Firestore Database:** Real-time chat storage
* **User Management:** Profile and chat history

### 🎨 **Modern UI/UX**

* **Dark Theme:** Beautiful dark mode interface
* **Responsive Design:** Works across all devices
* **Smooth Animations:** Enhanced user experience
* **Toast Notifications:** Real-time feedback

### 🔐 **Security Features**

* **Route Protection:** Protects authenticated routes
* **Input Validation:** Secure form handling
* **Error Handling:** Graceful error management

---

## 🌟 Technology Stack

* **Frontend:** React 18, React Router v6
* **Styling:** Tailwind CSS
* **Backend:** Firebase (Auth, Firestore)
* **AI:** Google Gemini API
* **State Management:** React Context API
* **Icons:** Custom SVG Components

---

*Made with ❤️ using React and Firebase*
