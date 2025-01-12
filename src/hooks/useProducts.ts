import { getProducts } from "@/app/actions";
import { Product, ProductCategories } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_PER_PAGE = 6;

export function useProducts(
  category: ProductCategories,
  page = 0,
  initialData: Product[] = []
) {
  return useQuery({
    queryKey: ["products", category, page, PRODUCTS_PER_PAGE],
    initialData: initialData,

    queryFn: () => getProducts(category, page, PRODUCTS_PER_PAGE),
  });
}
