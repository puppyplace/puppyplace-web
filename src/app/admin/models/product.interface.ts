export interface Product {
  id: string,
  description: string,
  title: string,
  price: number,
  stock: number,
  specifications: string,
  unit: string,
  promotional_price: number,
  avatar_url: string,
  id_categories: Array<string>,
  product_code: string,
  isbn_code: string
}
