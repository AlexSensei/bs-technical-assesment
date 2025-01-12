"use client";

import { Comment } from "@/types/product";
import styled from "styled-components";

const CommentsSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`;

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;

  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }

  small {
    display: block;
    margin-top: 0.5rem;
    color: #999;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const mockComments: Comment[] = [
  {
    id: "1",
    text: "Great product! Really happy with my purchase.",
    author: "John Doe",
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    text: "The quality is amazing, highly recommend!",
    author: "Jane Smith",
    createdAt: "2024-03-19T15:30:00Z",
  },
];

interface CommentsProps {
  productId: string;
}

export function Comments({ productId }: CommentsProps) {
  return (
    <CommentsSection>
      <SectionTitle>Comments for product {productId}</SectionTitle>
      <CommentsList>
        {mockComments.map((comment) => (
          <CommentItem key={comment.id}>
            <h4>{comment.author}</h4>
            <p>{comment.text}</p>
            <small>
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
          </CommentItem>
        ))}
      </CommentsList>
    </CommentsSection>
  );
}
