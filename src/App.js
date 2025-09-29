import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoggedUiLayout from "./layout/LoggedUiLayout";
import GuestLayout from "./layout/GuestLayout"; // guest user এর জন্য আলাদা layout

export default function App() {
  const logged = false;

  const router = createBrowserRouter(
    createRoutesFromElements(
      logged ? (
        // Logged in user layout
        <Route path="/" element={<LoggedUiLayout />}>
          <Route index element={<HomePage />} />
          {/* logged user এর অন্য routes */}
        </Route>
      ) : (
        // Guest user layout
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<HomePage />} />
          {/* guest user routes */}
        </Route>
      )
    )
  );

  return <RouterProvider router={router} />;
}
