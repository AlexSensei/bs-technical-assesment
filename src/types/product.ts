export interface Product {
  id: string;
  title: string;
  image: number;
  category: string;
}

export type ProductCategories = "top" | "exclusive" | "recent";
