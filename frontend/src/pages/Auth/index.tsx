import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [on, setOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOn(true);
    }, 100)
  }, [])

  return (
    <section
      id="auth"
      onClick={s => {
        const c = s.target as HTMLDivElement;
        if(c.id === "auth") navigate("/");
      }}
      className={`fixed top-0 left-0 w-full h-full bg-gray-700 transition-all ease-in-out duration-150 ${on && "bg-opacity-70" || "bg-opacity-0"}`}>
      <div className={`w-5/6 max-w-[300px] h-300 bg-white mx-auto my-5 rounded px-1 overflow-hidden transition-all ease-in-out duration-300 ${on && "max-h-vdh py-1" || "max-h-0"}`}>
        <div className="bg-purple-600 rounded">
          <img className="mx-auto p-2" src="/logo.png" alt="logo Acomp" />
        </div>
        <Outlet />
      </div>
    </section>
  );
}

export default Auth;