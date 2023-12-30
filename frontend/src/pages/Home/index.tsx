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
    getData()
  }, [])

  async function getData() {
    try {
      /* 
        {
          "name": "Notebook Gamer",
          "img": "/notebook_1.jpg",
          "price": 150000
        }
        {
          "name": "Kit Gamer",
          "img": "/kit.jpg",
          "price": 50000,
          "promo": 30000
        }
        {
          "name": "Fone Gamer",
          "img": "/fones_1_1.jpg",
          "price": 30000,
          "promo": 15000
        }
       */
      const prodList = await (
        await fetch("http://localhost:8080/products", {
          method: 'GET',
          headers: { 'content-type': 'application/json' }
        })
      ).json() as ProductModel[];
      
      const prods = prodList.map(p => new Product(p));
      const cart = new Cart({
        id: "strijt",
        owner: "ausdiahsdi",
        createAt: Date.now(),
        products: []
      });
  
      setCart(cart);
      setProd(prods);  
    } catch (error) {
      console.log(error)
    }
  }

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