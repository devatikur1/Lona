import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LoggedUserHome() {
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
      <section className="w-full h-full">
        <Header />
        
      </section>
    </aside>
  );
}
