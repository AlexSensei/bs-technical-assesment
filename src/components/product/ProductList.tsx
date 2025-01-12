"use client";

import { Product, ProductCategories } from "@/types/product";
import { ProductItem } from "./ProductItem";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 1rem;
`;

interface ProductListProps {
  products: Product[];
  title: string;
  isLoading?: boolean;
  category: ProductCategories;
}

export function ProductList({ products, title, isLoading }: ProductListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>{title}</h2>
      <Wrapper>
        {products.map(({ id, image, title, category }) => (
          <ProductItem
            key={id}
            id={id}
            image={image}
            title={title}
            category={category}
          />
        ))}
      </Wrapper>
    </section>
  );
}
