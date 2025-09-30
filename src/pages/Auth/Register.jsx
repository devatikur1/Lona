import ImagePart from "../../components/Auth/ImagePart";
import RegisterFrom from "../../components/Auth/register/RegisterFrom";

export default function Register() {
  return (
    <aside className="flex w-screen min-h-screen overflow-x-hidden overscroll-y-auto scrollCustom scrollVeiwNone *:select-none">
      {/* Left part (form) */}
      <section className="bg-[#080808] w-screen lg:w-1/2 flex">
        <RegisterFrom />
      </section>

      {/* Right part (image / gradient) */}
      <div className="hidden lg:flex w-1/2 overflow-hidden">
        <ImagePart />
      </div>
    </aside>
  );
}
