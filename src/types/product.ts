export interface Product {
  id: string;
  title: string;
  image: string;
  category: ProductCategories;
}
export type ProductCategories = "top" | "exclusive" | "recent";
