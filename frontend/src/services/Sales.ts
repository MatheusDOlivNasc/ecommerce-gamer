import { Cart } from "../models/cart.models";
import { Authenticate } from "./Authenticate";

class Sales {
  static newSale(cart: Cart): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        const token = Authenticate.getToken();
        if(!token) throw { message: "Erro de autenticação, faça login em sua conta" };

        const req = await fetch(Authenticate.url + "cart/new-cart", {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
          }),
          body: JSON.stringify({
            ...cart.toData()
          })
        });

        if(!req.ok) throw await req.json();
 
        res();  
      } catch (error) {
        rej(error || "Erro ao salvar")
      }
    })
  }
}

export default Sales;