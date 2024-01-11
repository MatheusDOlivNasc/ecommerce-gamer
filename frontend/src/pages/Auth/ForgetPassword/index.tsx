import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { Authenticate } from "../../../services/Authenticate";

const ForgetPassword: React.FC = () => {
  const [ email, setEmail ] = useState("");
  const [ {error, update, success}, setWarn ] = useState({
    error: "",
    update: "",
    success: ""
  })

  function handleForgetPassword() {
    newWarn("update", "Verificando dados");
    if(!email.includes("@") || !email) newWarn("error", "Verifique o e-mail cadastrado");

    Authenticate.forgetPassword(email)
      .then(() => newWarn("success", "Um link para redefinir sua senha foi enviado por e-mail."))
      .catch((error) => newWarn("error", error?.message || "Ocorreu um erro, tente novamente."));
  }

  function newWarn(command?: "error" | "update" | "success", message: string = "") {
    setWarn({
      error: (command == "error" ? message : ""),
      update: (command == "update" ? message : ""),
      success: (command == "success" ? message : "")
    })
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
          readOnly={!!update}
        />
      </div>
      <Button
        className="w-full mt-2 mb-1 bg-green-400"
        disabled={!!update}
        onClick={handleForgetPassword}>
        Recuperar senha
      </Button>
      <Link to="/" className="block w-full text-center my-1 mx-auto text-sm bg-white">
        Cancelar
      </Link>

      {
        error ? <div className="py-2 px-3 mt-2 bg-red-200 rounded">{error}</div> :
        update ? <div className="py-2 px-3 mt-2 bg-gray-100 rounded">{update}</div> :
        success ? <div className="py-2 px-3 mt-2 bg-gray-100 rounded">{success}</div>
        : null
      }

      <p className="text-sm px-2 pb-1 mt-2">
        <Link className="text-purple-800 underline" to="/auth/login">Acessar minha conta</Link><br /> 
        Ainda não possui uma conta? <Link className="text-purple-800 underline" to="/auth/register">Registre-se</Link>
      </p>
    </form>
  );
}

export default ForgetPassword;