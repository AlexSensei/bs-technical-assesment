"use client";

import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Comments = dynamic(() => import("./Comments"), {
  ssr: false,
  loading: () => <div>Loading comments...</div>,
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const FavoriteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

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
    <Wrapper>
      <Link href="/" passHref>
        <BackButton>← Back to Home</BackButton>
      </Link>

      <Title>{product.title}</Title>

      <Image
        src={product.image}
        alt={product.title}
        width={250}
        height={250}
        priority
      />

      <FavoriteButton>Add to Favorites</FavoriteButton>
      <Suspense>
        <Comments productId={id} />
      </Suspense>
    </Wrapper>
  );
}
