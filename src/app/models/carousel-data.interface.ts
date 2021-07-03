import { ProductVariant } from "../admin/models/product.interface";

export interface ProductData {
  variant: ProductVariant,
  title: string,
  avatar_url: string,
  qtd?: number,
  id?: string,
  price?: number,
  total?: number,
  description?: string
}
