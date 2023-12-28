import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import { Product, ProductModel } from "../../models/product.model";
import { Cart } from "../../models/cart.models";


const Home: React.FC = () => {
  const [prod, setProd] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const prodList: ProductModel[] = [
      {
        id: "4a6s4d5", name: "Fone Gamer", img: "/fones_1_1.jpg",
        price: 20000, promo: 12500
      },
      {
        id: "5a667d5", name: "Kit Gamer", img: "/kit.jpg",
        price: 30000, promo: 20000
      },
      {
        id: "4a61415", name: "Notebook Gamer", img: "/notebook_1.jpg",
        price: 150000
      }
    ];

    const prods = prodList.map(p => new Product(p));
    const cart = new Cart({
      id: "strijt",
      owner: "ausdiahsdi",
      createAt: Date.now(),
      products: []
    });

    setCart(cart);
    setProd(prods);
  }, [])


  return (
    <div id="home" className="flex flex-col min-h-dvh">
      <NavBar
        cart={cart}
        reload={(cart) => setCart(new Cart(cart.toData()))}
        />
      <Slider
        cart={cart}
        products={prod}
        reload={(cart) => setCart(new Cart(cart.toData()))}
        />
      <Footer />
    </div>
  );
}

export default Home;