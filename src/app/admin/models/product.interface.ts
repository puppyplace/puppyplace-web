export interface Product {
  description: string,
  title: string,
  specifications: Array<ProductSpecification>,
  variants: Array<ProductVariant>,
  details: Array<ProductDetail>,
  avatar_url: string,
  id_categories: Array<string>,
  product_code: string,
  id?: string,
}

export interface ProductSpecification {
  title: string,
  description: string,
}

export interface ProductDetail {
  description: string
}

export interface ProductVariant {
  price: number,
  unit: string,
  stock: number,
  percent_promotional: number,
  price_promotional: number,
  isbn_code: string,
  id?: string,
}
