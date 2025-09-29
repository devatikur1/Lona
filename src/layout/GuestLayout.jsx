import React from 'react'
import { Outlet } from "react-router-dom";
import GuestHeader from '../components/GuestHome/GuestHeader';

export default function GuestLayout() {
  return (
    <aside className="flex w-full">
      <GuestHeader />
      <Outlet />
    </aside>
  );
}
