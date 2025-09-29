import React from "react";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import { Outlet } from "react-router-dom";

export default function loggedUiLayout() {
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
      <section className="w-full">
        <Header />
        <Outlet />
      </section>
    </aside>
  );
}
