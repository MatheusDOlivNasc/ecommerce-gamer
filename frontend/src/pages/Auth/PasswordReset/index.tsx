import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link, useParams } from "react-router-dom";
import { Authenticate } from "../../../services/Authenticate";
import Icon from "../../../components/Icon";

const PasswordReset: React.FC = () => {
  const { token } = useParams();
  const [ hide, setHide ] = useState(false);
  const [ data, setData ] = useState({
    password: "",
    repassword: "",
  });
  const [ {error, update, success}, setWarn ] = useState({
    error: "",
    update: "",
    success: ""
  })

  function handleForgetPassword() {
    newWarn("update", "Verificando dados");
    if(!data.password || !data.repassword) newWarn("error", "Preencha todos os campos solicitados");
    if(data.password == data.repassword) newWarn("error", "As senhas informadas não são iguais");

    Authenticate.resetPassword(token || "", data.password)
      .then(() => newWarn("success", "Salvo com sucesso"))
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
        Senha:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={hide && "password" || "text"}
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          placeholder="*********"
          onChange={i => setData(prev => ({...prev, password: i.target.value}))}
          value={data.password}
          autoComplete="current-password"
          readOnly={!!update}
        />
        
        <button
          type="button"
          className="absolute p-1 mt-1 inset-y-0 right-0 flex justify-center items-center"
          onClick={() => setHide(!hide)}>
          
          <span className="text-gray-500 sm:text-sm">
            <Icon>{hide && "visibility" || "visibility_off" }</Icon>
          </span>
        </button>
      </div>
      
      <label
        className="block px-2 py-1 mt-1 text-sm font-medium"
        htmlFor="email">
        Repetir senha:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={hide && "password" || "text"}
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          placeholder="*********"
          onChange={i => setData(prev => ({...prev, repassword: i.target.value}))}
          value={data.repassword}
          autoComplete="current-password"
          readOnly={!!update}
        />
        
        <button
          type="button"
          className="absolute p-1 mt-1 inset-y-0 right-0 flex justify-center items-center"
          onClick={() => setHide(!hide)}>
          
          <span className="text-gray-500 sm:text-sm">
            <Icon>{hide && "visibility" || "visibility_off" }</Icon>
          </span>
        </button>
      </div>
      <Button
        className="w-full mt-2 mb-1 bg-green-400"
        disabled={!!update}
        onClick={handleForgetPassword}>
        Alterar senha
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
      </p>
    </form>
  );
}

export default PasswordReset;