import { useFavorites } from "@/hooks/useFavorites";
import { MovieType } from "@/types/MovieType";
import { useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { mutate } from "swr";

interface FavoriteButtonProps {
  favoriteIds: string;
}

export default function FavoriteButton({ favoriteIds }: FavoriteButtonProps) {
  const { favoriteMovies } = useFavorites();

  const isFavroite = useMemo(
    function () {
      return favoriteMovies.some(
        (movie: MovieType) => movie._id == favoriteIds,
      );
    },
    [favoriteIds, favoriteMovies],
  );

  async function handleAddRemoveFav() {
    if (isFavroite) {
      await fetch("/api/movies/favourites", {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({ favoriteMovieId: favoriteIds }),
      });
      mutate("/api/movies/favourites");
    } else {
      await fetch("/api/movies/favourites", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ favoriteMovieId: favoriteIds }),
      });
      mutate("/api/movies/favourites");
    }
  }

  return (
    <div
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border rounded-full flex justify-center items-center transition hover:border-neutral-300"
      onClick={handleAddRemoveFav}
    >
      {isFavroite ? (
        <AiOutlineCheck size={30} className="text-white" />
      ) : (
        <AiOutlinePlus size={30} className="text-white" />
      )}
    </div>
  );
}
