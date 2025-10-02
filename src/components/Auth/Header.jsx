import React from "react";
import Logo from "../../others/Logo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to={"/"} className="w-full h-full flex items-center justify-start gap-2">
      <Logo size={25} />
      <span className="text-xl font-medium">lonas</span>
    </Link>
  );
}
