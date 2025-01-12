import { Product, ProductCategories } from "@/types/product";
import ApiService from "./api.service";
import { API_CONFIG } from "./config";

class ProductService extends ApiService {
  constructor() {
    super(API_CONFIG.baseURL);
  }

  async getProducts(
    category: ProductCategories,
    offset: number,
    limit: number
  ): Promise<Product[]> {
    return this.get<Product[]>(
      `/products/${category}?offset=${offset}&limit=${limit}`
    );
  }

  async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`/product?id=${id}`);
  }
}

export const productService = new ProductService();
