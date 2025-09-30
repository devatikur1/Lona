import { Outlet, useSearchParams } from "react-router-dom";
import ImagePart from "../../components/Auth/ImagePart";
import LoginFrom from "../../components/Auth/logIn/LoginFrom";
import LoginMainFrom from "../../components/Auth/logIn/LoginMainFrom";

export default function LogIn() {
  const [searchParams] = useSearchParams();
  
  const method = searchParams.get("method");
  return (
    <aside className="flex w-screen min-h-screen overflow-x-hidden overscroll-y-auto scrollCustom scrollVeiwNone *:select-none">
      {/* Left part (form) */}
      <section className="bg-[#080808] w-screen lg:w-1/2 flex">
        <LoginFrom method={method} />
      </section>

      {/* Right part (image / gradient) */}
      <div className="hidden lg:flex w-1/2 overflow-hidden">
        <ImagePart />
      </div>
    </aside>
  );
}
