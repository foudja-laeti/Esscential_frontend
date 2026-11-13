export interface Product {
  id: number;
  name: string;
  priceCents: number;
  stock: number;
}

export interface ProductList {
  data: Product[];
  meta: { page: number; limit: number; total: number };
}

export interface ProductInput {
  name: string;
  priceCents: number;
  stock: number;
}
