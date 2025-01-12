import { ProductList } from "@/components/product/ProductList";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

async function getInitialProducts(): Promise<{
  top: Product[];
  exclusive: Product[];
  recent: Product[];
}> {
  const [top, exclusive, recent] = await Promise.all([
    productService.getProducts("top", 0, 6),
    productService.getProducts("exclusive", 0, 6),
    productService.getProducts("recent", 0, 6),
  ]);

  return { top, exclusive, recent };
}

export default async function Home() {
  const queryClient = new QueryClient();
  const { top, exclusive, recent } = await getInitialProducts();

  // Prefetch and cache the data
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["products", "top", 1, 6],
      queryFn: () => Promise.resolve(top),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "exclusive", 1, 6],
      queryFn: () => Promise.resolve(exclusive),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "recent", 1, 6],
      queryFn: () => Promise.resolve(recent),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <ProductList products={top} title="Top Products" category="top" />
        <ProductList
          products={exclusive}
          title="Exclusive Products"
          category="exclusive"
        />
        <ProductList
          products={recent}
          title="Recent Products"
          category="recent"
        />
      </main>
    </HydrationBoundary>
  );
}
