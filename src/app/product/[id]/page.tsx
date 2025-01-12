import { productService } from "@/services/product.service";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/app/actions";
import { PRODUCTS_PER_PAGE } from "@/hooks/useProducts";
import { ProductCategories } from "@/types/product";

// Generate static params for first 6 products of each category
export async function generateStaticParams() {
  const categories: ProductCategories[] = ["top", "exclusive", "recent"];

  const allProducts = await Promise.all(
    categories.map((category) => getProducts(category, 0, PRODUCTS_PER_PAGE))
  );

  // Flatten the array of products and map to params
  const params = allProducts.flat().map((product) => ({
    id: product.id,
  }));

  return params;
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;
  try {
    const product = await productService.getProductById(id);

    await queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => Promise.resolve(product),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <ProductDetail id={id} />
        </main>
      </HydrationBoundary>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}
