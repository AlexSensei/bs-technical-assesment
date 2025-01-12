import { getComments } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useComments(productId: string) {
  return useQuery({
    queryKey: ["comments", productId],
    queryFn: () => getComments(productId),
  });
}
