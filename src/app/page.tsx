import { ProductList } from "@/components/product/ProductList";
import { Product } from "@/types/product";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts, getFavorites } from "./actions";
import { PRODUCTS_PER_PAGE } from "@/hooks/useProducts";

async function getInitialProducts(): Promise<{
  top: Product[];
  exclusive: Product[];
  recent: Product[];
  favorites: string[];
}> {
  const [top, exclusive, recent, favorites] = await Promise.all([
    getProducts("top", 0, PRODUCTS_PER_PAGE),
    getProducts("exclusive", 0, PRODUCTS_PER_PAGE),
    getProducts("recent", 0, PRODUCTS_PER_PAGE),
    getFavorites(),
  ]);

  return { top, exclusive, recent, favorites };
}

export default async function Home() {
  const queryClient = new QueryClient();
  const { top, exclusive, recent, favorites } = await getInitialProducts();

  // Prefetch and cache the data
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products", "top"],
      queryFn: () => Promise.resolve(top),
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products", "exclusive"],
      queryFn: () => Promise.resolve(exclusive),
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products", "recent"],
      queryFn: () => Promise.resolve(recent),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ["favorites"],
      queryFn: () => Promise.resolve(favorites),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <ProductList title="Top Products" category="top" initialData={top} />
        <ProductList
          title="Exclusive Products"
          category="exclusive"
          initialData={exclusive}
        />
        <ProductList
          title="Recent Products"
          category="recent"
          initialData={recent}
        />
      </main>
    </HydrationBoundary>
  );
}
