export interface Product {
    title: string,
    description: string,
    avatar_url: string,
    categories: string[],
    especifications: Especification[],
    variant: Variant[],
    details: string[], 
    id?: string
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
