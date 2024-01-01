import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const ForgetPassword: React.FC = () => {
  const [ email, setEmail ] = useState("");

  function handleForgetPassword() {
    console.log("forgetPassword")
  }

  return (
    <form>
      <label
        className="block px-2 py-1 mt-1 text-sm font-medium"
        htmlFor="email">
        E-mail:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          placeholder="exemplo@email.com"
          onChange={i => setEmail(i.target.value)}
          value={email}
          autoComplete="current-email"
        />
      </div>

      <Button className="w-full mt-2 mb-1 bg-green-400" onClick={handleForgetPassword}>
        Recuperar senha
      </Button>
      <Link to="/" className="block w-full text-center my-1 mx-auto text-sm bg-white">
        Cancelar
      </Link>
      <p className="text-sm px-2 pb-1 mt-2">
        <Link className="text-purple-800 underline" to="/auth/login">Acessar minha conta</Link><br /> 
        Ainda não possui uma conta? <Link className="text-purple-800 underline" to="/auth/register">Registre-se</Link>
      </p>
    </form>
  );
}

export default ForgetPassword;