import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => productService.getFavorites(),
  });

  const addToFavorites = useMutation({
    mutationFn: (productId: string) => productService.addToFavorites(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: (productId: string) =>
      productService.removeFromFavorites(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = (productId: string) => {
    return favorites?.some((fav: string) => fav === productId) ?? false;
  };

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
}
