import { Product, ProductModel } from "../models/product.model";
import { Authenticate } from "./Authenticate";

class Store {
  static getProducts(): Promise<Product[]> {
    return new Promise(async (res, rej) => {
      try {
        const prodList = (await (
          await fetch(Authenticate.url + "products", {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
          })
        ).json() as ProductModel[]) || [];
        
        res(prodList.map(p => new Product(p)));  
      } catch (error) {
        rej("Erro")
      }
    })
  }
}

export default Store;