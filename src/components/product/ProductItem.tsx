"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

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

export function ProductItem({ id, title, image }: Product) {
  return (
    <Link href={`/product/${id}`}>
      <Wrapper>
        <h3>{title}</h3>
        <Image src={image} alt={title} width={100} height={100} />
        <button>Add/remove favorites</button>
      </Wrapper>
    </Link>
  );
}
