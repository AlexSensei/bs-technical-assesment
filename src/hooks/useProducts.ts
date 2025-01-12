import { productService } from "@/services/product.service";
import { ProductCategories } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_PER_PAGE = 6;

export function useProducts(category: ProductCategories) {
  return useQuery({
    queryKey: ["products", category, 1, PRODUCTS_PER_PAGE],
    queryFn: () => productService.getProducts(category, 0, PRODUCTS_PER_PAGE),
  });
}
