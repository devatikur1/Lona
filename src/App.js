import React from "react";
import Header from "./components/Home/Header";
import Sidebar from "./components/Home/Sidebar";

export default function App() {
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
      </section>
    </aside>
  );
}
