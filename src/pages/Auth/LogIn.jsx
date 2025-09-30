import ImagePart from "../../components/Auth/ImagePart";
import LoginFrom from "../../components/Auth/logIn/LoginFrom";

export default function LogIn() {
  return (
    <aside className="flex w-screen min-h-screen">
      {/* Left part (form) */}
      <section className="bg-[#080808] w-screen lg:w-1/2 flex">
        <LoginFrom />
      </section>

      {/* Right part (image / gradient) */}
      <div className="hidden lg:flex w-1/2 overflow-hidden">
        <ImagePart />
      </div>
    </aside>
  );
}
