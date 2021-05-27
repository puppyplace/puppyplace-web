export interface Product {
    title: string,
    description: string,
    image: string,
    categories: string[],
    especifications: Especification[],
    variant: Variant[],
    details: string[]
  }
  
  interface Especification {
    title: string,
    description: string
  }
  
  interface Variant {
    unit: string,
    price: number,
    amount: number,
    percent_promotional?: number,
    price_promotional?: number,
    isbn_code: string
  }
