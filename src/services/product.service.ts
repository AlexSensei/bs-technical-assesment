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

  async getComments(id: string) {
    return this.get<string[]>(`/comments?id=${id}`);
  }

  async getFavorites() {
    return this.get<string[]>("/favorites", {
      headers: {
        // TODO: Move this to either env or give user chance to input his x-api-key
        "x-api-key": "secret-key-bitstarz",
      },
    });
  }

  async addToFavorites(productId: string) {
    return this.post<void>(
      "/favorites",
      {
        id: productId,
      },
      {
        headers: {
          "x-api-key": "secret-key-bitstarz",
        },
      }
    );
  }

  async removeFromFavorites(productId: string) {
    return this.delete<void>(
      "/favorites",
      {
        id: productId,
      },
      {
        headers: {
          "x-api-key": "secret-key-bitstarz",
        },
      }
    );
  }
}

export const productService = new ProductService();
