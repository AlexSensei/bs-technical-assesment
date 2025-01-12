"use client";
import { useEffect, useState } from "react";
import { Product, ProductCategories } from "@/types/product";
import { ProductItem } from "./ProductItem";
import styled from "styled-components";
import { useProducts } from "@/hooks/useProducts";
import { useFavorites } from "@/hooks/useFavorites";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
`;

const LoadMoreButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface ProductListProps {
  title: string;
  category: ProductCategories;
  initialData?: Product[];
}

export function ProductList({
  title,
  category,
  initialData,
}: ProductListProps) {
  const { favorites } = useFavorites();

  const [page, setPage] = useState(0);
  const { data, isLoading, refetch } = useProducts(category, page, initialData);

  useEffect(() => {
    refetch();
  }, [page, refetch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <h2>{title}</h2>
      <Wrapper>
        {data.map(({ id, image, title, category }) => (
          <ProductItem
            key={id}
            id={id}
            image={image}
            title={title}
            category={category}
            isFavorite={favorites?.some((fav) => fav === id)}
          />
        ))}
        <LoadMoreButton
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={isLoading || page === 0}
        >
          {isLoading ? "Loading..." : "Prev"}
        </LoadMoreButton>
        <LoadMoreButton
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </LoadMoreButton>
      </Wrapper>
    </section>
  );
}
