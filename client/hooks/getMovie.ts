import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useGetMovieById(movieId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/movies/getMovie/${movieId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    movie: data.d || {},
    isLoading,
    error,
    mutate,
  };
}
