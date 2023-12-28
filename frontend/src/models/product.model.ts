

export interface ProductModel {
  id: string;
  name: string;
  img: string;
  price: number;
  promo?: number;
};

export class Product implements ProductModel {
  id: string;
  name: string;
  img: string;
  price: number;
  promo: number | undefined;
  
  constructor(data: ProductModel) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.img = data.img;
      this.price = data.price;
      this.promo = data.promo;  
    } catch (error) {
      this.id = "";
      this.name = "";
      this.img = "";
      this.price = 0;
    }
  }

  setId(id: string) {
    this.id = id;
  }
  setName(name: string) {
    this.name = name;
  }
  setImg(img: string) {
    this.img = img;
  }
  setPrice(price: number) {
    this.price = price;
  }
  setPromo(promo: number) {
    this.promo = promo;
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getImg(): string {
    return this.img;
  }
  getPrice(): number {
    return this.price;
  }
  getPromo(): number | undefined {
    return this.promo;
  }

  getValue(): number {
    if(this.promo && this.promo < this.price) {
      return this.promo;
    } else {
      return this.price;
    }
  }
  getValueCurrency(): string {
    return Product.numberToPrice(this.getValue());
  }
  toData(): ProductModel {
    return {
      id: this.getId(),
      name: this.getName(),
      img: this.getImg(),
      price: this.getPrice(),
      promo: this.getPromo(),
    }
  }

  static numberToPrice(v: number): string {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v / 100);
  }

  toCurrency(value: "promo" | "price"): string {
    return Product.numberToPrice(this?.[value] || 100000);
  }
}
