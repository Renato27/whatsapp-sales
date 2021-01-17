export interface Category {
  id?: number;
  name: string;
  readonly slug?: string;
  active:boolean;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number
  readonly slug?: string;
  active:boolean;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export interface ProductCategory {
  product: Product;
  categories: Category[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
