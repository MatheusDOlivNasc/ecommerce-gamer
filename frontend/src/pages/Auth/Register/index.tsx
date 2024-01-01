import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";

const Register: React.FC = () => {
  const [ hide, setHide ] = useState(true);
  const [ data, setData ] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleRegister() {
    console.log("register")
  }

  return (
    <form>
      <label
        className="block px-2 py-1 mt-1 text-sm font-medium"
        htmlFor="name">
        Nome:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          placeholder="Seu nome"
          onChange={i => setData(prev => ({...prev, name: i.target.value}))}
          value={data.name}
          autoComplete="current-name"
        />
      </div>
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

      <Button className="w-full mt-2 mb-1 bg-green-400" onClick={handleRegister}>
        Registrar
      </Button>
      <Link to="/" className="block w-full text-center my-1 mx-auto text-sm bg-white">
        Cancelar
      </Link>
      <p className="text-sm px-2 pb-1 mt-2">
        Já possui uma conta? <Link className="text-purple-800 underline" to="/auth/login">Entre</Link> <br />
      </p>
    </form>
  );
}

export default Register;