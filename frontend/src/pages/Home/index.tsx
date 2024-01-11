import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import { Product } from "../../models/product.model";
import { Cart } from "../../models/cart.models";
import { Outlet } from "react-router-dom";
import Store from "../../services/Store";
import { AuthContext, AuthContextModel } from "../../contexts/AuthContext";


const Home: React.FC = () => {
  const [prod, setProd] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const {user} = useContext(AuthContext) as AuthContextModel;

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(!cart || !user) return;

    cart.setOwner(user);
    setCart(new Cart(cart.toData()));
  }, [user])

  async function getData() {
    try {
      const prods = await Store.getProducts();
      const cart = new Cart({
        id: "",
        owner: "",
        createAt: Date.now(),
        products: []
      });
  
      setCart(cart);
      setProd(prods);  
    } catch (error) {}
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
      <Outlet />
    </div>
  );
}

export default Home;