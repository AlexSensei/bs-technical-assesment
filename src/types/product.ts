export interface Product {
  id: string;
  title: string;
  image: string;
  category: ProductCategories;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export type ProductCategories = "top" | "exclusive" | "recent";
