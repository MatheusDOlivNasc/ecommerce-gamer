import React, { useState } from "react";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import { Cart } from "../../models/cart.models";
/* import Button from "../Button"; */

interface Props {
  cart: Cart | null;
  reload(cart: Cart): void;
}

const NavBar: React.FC<Props> = ({
  cart, reload
}) => {
  const [show, setShow] = useState(false);
  function handleRemoveItem(id: string) {
    if (!cart) return;
    cart.removeProduct(id);
    reload(cart);
  }
  return (
    <header className={`flex flex-row h-16 bg-black px-5`}>
      <Link to="/" id="logo" className="grow flex items-center">
        <img src={"/logo.png"} alt="Logo loja virtual" />
      </Link>
      <nav className="flex-none">
        <ul className="flex flex-center h-full text-white">
          <li className="justify-center items-center px-2 hidden sm:flex max-w-52 h-full">
            <p className="cursor-default text-ellipsis truncate">Olá, Matheus Nascimento</p>
          </li>
          <li className="relative inline-block text-left group/cart">
            <div className="flex justify-center align-middle h-full ">
              <button
                type="button"
                className="flex w-full justify-center items-center gap-x-1.5 px-3 py-2 rounded-tr-lg rounded-tl-lg text-sm font-semibold shadow-sm ring-inset text-white lg:hover:bg-gray-800 lg:group-hover/cart:bg-gray-800 border-b-4 border-white/0 lg:hover:border-white lg:group-hover/cart:border-white transition-all ease-in-out delay-150 cursor-pointer"
                id="menu-button"
                onClick={() => setShow(true)}
                aria-expanded="true"
                aria-haspopup="true">
                <div className="text-right pr-2">
                  <p className="font-light">{cart?.getLength() || ""}</p>
                  <p>{cart?.getTotal() || ""}</p>
                </div>
                <Icon>shopping_cart</Icon>
                {show === true ? "true" : "false"}
              </button>
            </div>
            <div
              className={`relative z-10 transition-all delay-1000 ` + (!show && "hidden" || "block")}
              aria-labelledby="slide-over-title"
              role="dialog"
              aria-modal={show === true ? "true" : "false"}>
              <div className={`fixed inset-0 bg-purple-100 ${!show && " hidden" || "" } ${show ? "bg-opacity-75" : "bg-opacity-0"} transition ease-in-out delay-100`}></div>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`pointer-events-none fixed inset-y-0 ${!show && "right-100" || "right-0" } flex max-w-full pl-10`}>
                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrinho</h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button type="button" onClick={() => setShow(!show)} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Fechar painel</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {
                                  cart?.getProducts()?.map(prod => (
                                    <li className="flex py-6">
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
                                            <button type="button" className="font-medium text-gray-700 hover:text-purple-600">
                                              Remove
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
                            <a 
                              href="#"
                              className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700">
                              Finalizar compra
                            </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              ou <button
                                type="button"
                                onClick={() => setShow(false)}
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
            {/* <div
              className={
                `absolute right-0 z-10 w-56 origin-top-right bg-white shadow-lg
                ring-1 ring-black ring-opacity-5 focus:outline-none  group-hover/cart:block
                hover:block rounded-b-xl hidden`
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}>
              <ul className="pb-2 pt-1 px-2" role="none">
                {
                  cart?.getProducts()?.map(p => (
                    <li
                      key={p.getId()}
                      className={
                        `text-gray-700 px-0 py-1 text-sm
                        flex flex-row justify-center items-center`
                      }
                      role="cartitem"
                      tabIndex={-1}
                      id="menu-item-2">
                      <div className="w-12 h-12 overflow-hidden flex justify-center items-center rounded">
                        <img
                          className="min-w-full min-h-full"
                          src={p.getImg()}
                          alt={p.getName()}
                        />
                      </div>
                      <div className="grow px-2">
                        <p className="text-ellipsis truncate">
                          {p.getName()}
                        </p>
                        <p>
                          {p.getValueCurrency()}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="h-12 w-7 text-gray-700 hover:text-purple-700 transition-all ease-in-out delay-150 flex justify-center items-center rounded"
                        onClick={() => handleRemoveItem(p.getId())}>
                        <Icon>delete</Icon>
                      </button>
                    </li>
                  ))
                }
                {
                  cart?.getProducts().length === 0 && (
                    <li className="text-black text-sm">
                      Nenhum item selecionado
                    </li>
                  )
                }
                <Button
                  type="button"
                  disabled={!cart || cart.getProducts().length === 0}
                  className="w-full mt-1">
                  Finalizar compra
                </Button>
              </ul>
            </div> */}
          </li>
        </ul>
      </nav>
    </header >
  );
}

export default NavBar;