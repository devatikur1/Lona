import { useNavigate, useSearchParams } from "react-router-dom";
import ImagePart from "../../components/Auth/ImagePart";
import RegisterFrom from "../../components/Auth/register/RegisterFrom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

export default function Register() {
  const { logged } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const method = searchParams.get("method");
  let navigate = useNavigate();

  useEffect(() => {
    if (logged === true) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);
  return (
    <aside className="flex w-screen min-h-screen overflow-x-hidden overscroll-y-auto scrollCustom scrollVeiwNone *:select-none">
      {/* Left part (form) */}
      <section className="bg-[#080808] w-screen lg:w-1/2 flex">
        <RegisterFrom method={method} />
      </section>

      {/* Right part (image / gradient) */}
      <div className="hidden lg:flex w-1/2 overflow-hidden">
        <ImagePart />
      </div>
    </aside>
  );
}
