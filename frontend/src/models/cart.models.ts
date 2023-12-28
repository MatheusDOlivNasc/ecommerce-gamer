import { Product, ProductModel } from "./product.model";

export interface CartModel {
  id: string;
  owner: string;
  createAt: number;
  products: ProductModel[];
}

export class Cart implements CartModel {
  id: string;
  owner: string;
  createAt: number;
  products: ProductModel[];
  productsData: Product[];

  constructor(cart: CartModel) {
    try {
      this.id = cart.id;
      this.owner = cart.owner;
      this.createAt = cart.createAt;
      this.products = cart.products;
      this.productsData = [];
      this.setProductsData(cart.products);  
    } catch (error) {
      this.id = cart.id || "";
      this.owner = cart.owner || "";
      this.createAt = cart.createAt || 0;
      this.products = cart.products || [];
      this.productsData = [];
      this.setProductsData(cart.products || []);
    }
  }

  getId(): string {
    return this.id;
  }
  getOwner(): string {
    return this.owner;
  }
  getCreateAt(): number {
    return this.createAt;
  }
  getProducts(): Product[] {
    return this.productsData;
  }
  addProduct(prod: Product) {
    this.productsData.push(prod);
    this.products.push(prod.toData());
  }
  removeProduct(id: string) {
    this.productsData = this.productsData.filter(p => p.getId() != id);
    this.products = this.products.filter(p => p.id != id);
  }
  getLength(): string {
    const length = this.getProducts().length;
    if(length == 1) return length + " item"
    return length + " itens";
  }
  getTotal(): string {
    let total = 0;

    this.getProducts().forEach(e => {
      total += e.getValue();
    });

    return Product.numberToPrice(total);
  }
  isThere(id: string): boolean {
    return !!this.getProducts().find(p => p.getId() == id);
  }
  private getProductsData(): ProductModel[] {
    return this.products;
  }
  toData(): CartModel {
    return {
      id: this.getId(),
      owner: this.getOwner(),
      createAt: this.getCreateAt(),
      products: this.getProductsData()
    }
  }
  setProductsData(p: ProductModel[]) {
    this.productsData = p.map(p => new Product(p));
  }
  setProducts(p: ProductModel[]) {
    this.products = p;
    this.setProductsData(p);
  }
}