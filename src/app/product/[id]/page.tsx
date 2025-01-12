import { productService } from "@/services/product.service";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
