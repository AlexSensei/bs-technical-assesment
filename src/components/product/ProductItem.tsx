"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useFavorites } from "@/hooks/useFavorites";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 1rem;
`;

const FavoriteButton = styled.button<{ isfavorite?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ isfavorite }) => (isfavorite ? "#dc3545" : "#28a745")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ isfavorite }) =>
      isfavorite ? "#c82333" : "#218838"};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface ProductItemProps extends Product {
  isFavorite?: boolean;
}

export function ProductItem({
  id,
  title,
  image,
  isFavorite,
}: ProductItemProps) {
  const { addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    if (isFavorite) {
      removeFromFavorites.mutate(id);
    } else {
      addToFavorites.mutate(id);
    }
  };

  return (
    <Link href={`/product/${id}`} prefetch>
      <Wrapper>
        <h3>{title}</h3>
        <Image src={image} alt={title} width={100} height={100} />
        <FavoriteButton
          onClick={handleFavoriteClick}
          isfavorite={isFavorite}
          disabled={addToFavorites.isPending || removeFromFavorites.isPending}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </FavoriteButton>
      </Wrapper>
    </Link>
  );
}
