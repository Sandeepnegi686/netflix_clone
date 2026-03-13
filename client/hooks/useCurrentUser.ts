import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/user/currentUser",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    currentUser: data.d || {},
    isLoading,
    error,
    mutate,
  };
}
