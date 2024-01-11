import React, { useContext, useState } from "react";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import { Cart } from "../../models/cart.models";
import { AuthContext, AuthContextModel } from "../../contexts/AuthContext";
import Sales from "../../services/Sales";

interface Props {
  cart: Cart | null;
  reload(cart: Cart): void;
}

const NavBar: React.FC<Props> = ({
  cart, reload
}) => {
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(false);
  const [{ error, update, success }, setWarn] = useState({
    error: "",
    update: "",
    success: "",
  });
  const { user, logout } = useContext(AuthContext) as AuthContextModel;

  function handleRemoveItem(id: string) {
    if (!cart) return;
    cart.removeProduct(id);
    reload(cart);
  }
  async function handleFinish() {
    try {
      newWarn("update", "Verificando dados");

      if (!cart) throw { message: "Ocorreu um erro ao gerar seu carrinho" };

      await Sales.newSale(cart)

      newWarn("success", "Pedido finalizado");
    } catch (error: any) {
      newWarn("error", error?.message || "Ocorreu um erro");
    }
  }
  function updateShow() {
    newWarn();
    let r = !show;
    const time = 100;

    if (r === true) {
      setOn(r);
      setTimeout(() => {

        setShow(r);
      }, time)
    } else {
      setShow(r);
      setTimeout(() => {
        setOn(r);
      }, time)
    }

    if(success) handleCloseCart();
  }
  function handleCloseCart() {
    reload(new Cart({
      id: "",
      owner: user || "",
      createAt: Date.now(),
      products: []
    }));
  }

  function newWarn(command?: "error" | "update" | "success", message: string = "") {
    setWarn({
      error: (command === "error" ? message : ""),
      update: (command === "update" ? message : ""),
      success: (command === "success" ? message : ""),
    })
  }

  return (
    <header className={`flex flex-row h-16 bg-black px-5`}>
      <Link to="/" id="logo" className="grow flex items-center">
        <img src={"/logo.png"} alt="Logo loja virtual" />
      </Link>
      <nav className="flex-none">
        <ul className="flex flex-center h-full text-white">
          {
            !user && (
              <li className="justify-center items-center pr-1 hidden sm:flex max-w-52 h-full">
                <Link
                  className="flex h-full w-full justify-center items-center gap-x-1.5 px-3 py-2 rounded-tr-lg rounded-tl-lg text-sm font-semibold shadow-sm ring-inset text-white lg:hover:bg-gray-800 lg:group-hover/cart:bg-gray-800 border-b-4 border-white/0 lg:hover:border-white lg:group-hover/cart:border-white transition-all ease-in-out duration-300"
                  to="/auth/login">Entrar</Link>
              </li>
            )
          }
          {
            !user && (
              <li className="justify-center items-center pr-1 hidden sm:flex max-w-52 h-full">
                <Link
                  className="flex h-full w-full justify-center items-center gap-x-1.5 px-3 py-2 rounded-tr-lg rounded-tl-lg text-sm font-semibold shadow-sm ring-inset text-white lg:hover:bg-gray-800 lg:group-hover/cart:bg-gray-800 border-b-4 border-white/0 lg:hover:border-white lg:group-hover/cart:border-white transition-all ease-in-out duration-300"
                  to="/auth/register">Registrar</Link>
              </li>
            )
          }
          {
            user && (
              <li className="justify-center items-center pr-1 hidden sm:flex max-w-52 h-full">
                <button
                  className="flex h-full w-full justify-center items-center gap-x-1.5 px-3 py-2 rounded-tr-lg rounded-tl-lg text-sm font-semibold shadow-sm ring-inset text-white lg:hover:bg-gray-800 lg:group-hover/cart:bg-gray-800 border-b-4 border-white/0 lg:hover:border-white lg:group-hover/cart:border-white transition-all ease-in-out duration-300"
                  onClick={() => logout()}>
                  Sair
                </button>
              </li>
            )
          }

          <li className="relative inline-block text-left group/cart">
            <div className="flex justify-center align-middle h-full ">
              <button
                type="button"
                className="flex w-full justify-center items-center gap-x-1.5 px-3 py-2 rounded-tr-lg rounded-tl-lg text-sm font-semibold shadow-sm ring-inset text-white lg:hover:bg-gray-800 lg:group-hover/cart:bg-gray-800 border-b-4 border-white/0 lg:hover:border-white lg:group-hover/cart:border-white transition-all ease-in-out delay-150 cursor-pointer"
                id="menu-button"
                onClick={updateShow}
                aria-expanded="true"
                aria-haspopup="true">
                <div className="text-right pr-2">
                  <p className="font-light">{cart?.getLength() || ""}</p>
                  <p>{cart?.getTotal() || ""}</p>
                </div>
                <Icon>shopping_cart</Icon>
              </button>
            </div>
            <div
              className={`relative z-10 ` + (!on && "hidden" || "block")}
              aria-labelledby="slide-over-title"
              role="dialog"
              aria-modal={`${show}`}>
              <div
                className={
                  `fixed inset-0 bg-gray-700
                  ${show ? "bg-opacity-70" : "bg-opacity-0"} transition ease-in-out delay-100`}
              />

              <div className="fixed inset-0 overflow-hidden">
                <div
                  id="screen"
                  onClick={s => {
                    const c = s.target as HTMLDivElement;
                    if (c.id === "screen") updateShow();
                  }}
                  className="absolute inset-0 overflow-hidden" >
                  <div className={
                    `pointer-events-none fixed inset-y-0 flex max-w-full pl-10
                      transition-right ease-in-out duration-500 ${show && "right-0" || "right-100"}`
                  }>
                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-hidden bg-white shadow-xl">
                        <div className="px-4 pt-6 pb-1 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrinho</h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button type="button" onClick={updateShow} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Fechar painel</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 h-1 px-4 py-0 sm:px-6 overflow-auto">
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {
                                  cart?.getProducts()?.map(prod => (
                                    <li key={prod.getId() || crypto.randomUUID()} className="flex py-6">
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          src={prod.getImg()}
                                          alt={prod.getName()}
                                          className="h-full w-full object-cover object-center" />
                                      </div>
                                      <div className="ml-4 flex flex-1 flex-col">

                                        <div>
                                          <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                              <a href="#">{prod.getName()}</a>
                                            </h3>
                                            <p className="ml-4">{prod.getValueCurrency()}</p>
                                          </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                          <p className="text-gray-500">Qntt. 1</p>

                                          <div className="flex">
                                            <button
                                              type="button"
                                              className="font-medium text-gray-700 hover:text-purple-600"
                                              onClick={() => handleRemoveItem(prod.getId())}>
                                              Remover
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Sub-total</p>
                            <p>{cart?.getTotal()}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Frete e taxas serão calculadas no pagamento.
                          </p>
                          <div className="mt-6">
                            {
                              error ? <div className="py-2 px-3 mt-2 bg-red-200 rounded text-black text-center">{error}</div> :
                                update ? <div className="py-2 px-3 mt-2 bg-gray-100 rounded text-black text-center">{update}</div> :
                                  success ? <div className="py-2 px-3 mt-2 bg-gray-100 rounded text-black text-center">{success}</div>
                                    : null
                            }
                            <button
                              type="button"
                              disabled={!cart || cart.getProducts().length == 0}
                              onClick={
                                success ? updateShow :
                                handleFinish
                              }
                              className="flex items-center w-full justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 disabled:opacity-30 transition-all ease-in-out duration-300 delay-150">
                              {
                                success ? "Fechar" :
                                "Finalizar compra"
                              }
                            </button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              ou <button
                                type="button"
                                onClick={updateShow}
                                className="font-medium text-green-600 hover:text-green-500">
                                Continue comprando
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header >
  );
}

export default NavBar;