"use client";

import styled from "styled-components";
import { useComments } from "@/hooks/useComments";

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

interface CommentsProps {
  productId: string;
}

export default function Comments({ productId }: CommentsProps) {
  const { data: comments, isLoading } = useComments(productId);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }
  console.log({ comments });
  if (!comments || comments.length === 0) {
    return (
      <CommentsSection>
        <SectionTitle>Comments</SectionTitle>
        <p>No comments yet.</p>
      </CommentsSection>
    );
  }

  return (
    <CommentsSection>
      <SectionTitle>Comments</SectionTitle>
      <CommentsList>
        {comments.map((comment) => (
          <CommentItem key={comment}>
            <h4>{comment}</h4>
          </CommentItem>
        ))}
      </CommentsList>
    </CommentsSection>
  );
}
