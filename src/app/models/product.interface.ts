export interface Product {
    title: string,
    description: string,
    image: string,
    quantity?: number,
    category: string[],
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
    percent_promotional?: number,
    isbn_code: string
  }
