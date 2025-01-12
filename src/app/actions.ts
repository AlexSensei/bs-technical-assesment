"use server";

import { productService } from "@/services/product.service";
import { Product, ProductCategories } from "@/types/product";

export async function getProducts(
  category: ProductCategories,
  page: number,
  limit: number
): Promise<Product[]> {
  const offset = page * limit;
  return productService.getProducts(category, offset, limit);
}

export async function getProduct(id: string): Promise<Product> {
  return productService.getProductById(id);
}

export async function getComments(id: string): Promise<string[]> {
  return productService.getComments(id);
}

export async function getFavorites(): Promise<string[]> {
  return productService.getFavorites();
}
