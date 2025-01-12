import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/app/actions";
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}
