import React from "react";
import Icon from "../Icon";
import { Product } from "../../models/product.model";
import { Cart } from "../../models/cart.models";


interface Props {
  products: Product[];
  cart: Cart | null;
  reload(cart: Cart): void
}

const Slider: React.FC<Props> = ({
  products, cart, reload
}) => {
  function handleSetProd(prod: Product) {
    if(!cart) return;

    if(cart.isThere(prod.getId())) cart.removeProduct(prod.getId());
    else cart.addProduct(prod);

    reload(cart);
  }
  return (
    <section id="slider" className={"pb-2 bg-[url('/gradient.svg')] grow flex flex-col justify-center items-center"}>
      <h2 className={
        `relative after:absolute after:content-[' '] after:w-1/3 after:h-0.5 after:bg-gray-200
        after:right-2/4 after:top-0 before:absolute before:bottom-0 before:content-[' ']
        before:w-1/3 before:h-0.5 before:bg-green-300 before:left-1/2
        font-regular text-2xl text-center mt-2 pt-2 pb-3`
      }>
        ESCOLHA <b className="font-extrabold text-purple-700">A</b> <b className="font-extrabold text-purple-700">COMP</b>OSIÇÃO PERFEITA
      </h2>
      <ul className="px-12 flex lg:flex-row flex-col slider-list ">
        {
          (products || [])
          .filter(({}, i) => i < 3)
          .map((prod) => (
            <li
              className={`group/slider relative flex justify-center items-center flex-1 m-3 h-20 lg:h-120`}
              key={prod.getId()}>
              <button
                type="button"
                onClick={() => handleSetProd(prod)}
                className="relative overflow-hidden flex justify-center items-center flex-1 m-3 h-60 lg:h-120 shadow-xl">
                <img
                  className={`min-h-full min-w-full cursor-pointer`}
                  src={prod.getImg()}
                  alt={prod.getName()}
                  draggable={false} />
                <Icon className="icon absolute top-5 right-5 bg-green-600 lg:bg-green-900 p-2 rounded-full transition ease-in-out delay-150 text-white group-hover/slider:bg-green-600">
                  {(cart && cart?.isThere(prod.getId())) ? "check_circle" : "add_shopping_cart"}
                </Icon>
                <div
                  className={
                   `absolute left bottom-5 w-3/4 pb-1 pt-1 px-1
                    flex flex-row justify-center items-center shadow-sm max-w-full text-black bg-green-300
                    rounded-tr-xl rounded-tl-xl border-b-4 border-whtie group-hover/slider:border-purple-600`}>
                  <h3 className="px-2 py-1 grow font-medium text-left text-ellipsis truncate">
                    {prod.getName()}
                  </h3>
                  {
                    prod.getPromo() ?
                      <div className="pr-2 font-bold block text-right">
                        <p className="text-sm font-medium"><s>{
                          prod.toCurrency("price")
                        }</s></p>
                        <p>{prod.toCurrency("promo")}</p>
                      </div>
                      : <p className="pr-2 font-bold text-right">{
                          prod.toCurrency("price")
                        }</p>
                  }
                </div>
              </button>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Slider;