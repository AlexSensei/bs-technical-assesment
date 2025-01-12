"use client";

import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";

interface ProductDetailProps {
  id: string;
}

export function ProductDetail({ id }: ProductDetailProps) {
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <div>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            priority
          />
        </div>
        <div>
          <h1>{product.title}</h1>
          <p>Category: {product.category}</p>
          <button>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
}
