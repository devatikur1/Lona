import React from 'react'
import Sidebar from '../components/Home/Sidebar';
import Header from '../components/Home/Header';

export default function HomePage() {
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
        j
      </section>
    </aside>
  );
}
