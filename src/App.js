import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoggedUiLayout from "./layout/LoggedUiLayout";
import AuthRootLayout from "./layout/AuthRootLayout";
import LogIn from "./pages/Auth/LogIn";
import Register from "./pages/Auth/Register";
import AccountPage from "./pages/AccountPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LoggedUiLayout />}>
        <Route index element={<HomePage />} />
        <Route path="c/:id" element={<ChatPage />} />
        <Route path="account" element={<AuthRootLayout />}>
        <Route index element={<AccountPage />} />
          <Route path="sign-in" element={<LogIn />} />
          <Route path="sign-up" element={<Register />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
