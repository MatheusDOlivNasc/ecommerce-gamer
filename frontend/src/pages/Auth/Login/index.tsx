import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";

const Login: React.FC = () => {
  const [ hide, setHide ] = useState(true);
  const [ {error, update, success}, setWarn ] = useState({
    error: "",
    update: "",
    success: ""
  });
  const [ data, setData ] = useState({
    email: "",
    password: ""
  });

  async function handleLogin() {
    try {
      newWarn("update", "Verificando dados...");
      console.log(data)

      const req = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          login: data.email,
          password: data.password
        })
      });

      if(req.ok !== true) throw await req.json();

      console.log(await req.json());
      newWarn("success", "Deu!");
    } catch (error: any) {
      newWarn("error", JSON.stringify(error?.message || error));
    }
  }

  function newWarn(command: "update" | "error" | "success", message?: string) {
    setWarn({
      update: (command == "update" ? message || "" : ""),
      error: (command == "error" ? message || "" : ""),
      success: (command == "success" ? message || "" : "")
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
          onChange={i => setData(prev => ({...prev, email: i.target.value}))}
          value={data.email}
          autoComplete="current-email"
          readOnly={!!update}
        />
      </div>
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

      <Button
        disabled={!!update}
        className="w-full mt-2 mb-1 bg-green-400"
        onClick={handleLogin}>

        Entrar
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
        Ainda não possui uma conta? <Link className="text-purple-800 underline" to="/auth/register">Registre-se</Link> <br />
        <Link className="text-purple-800 underline" to="/auth/forgetpassword">Esqueci minha senha</Link>
      </p>
    </form>
  );
}

export default Login;