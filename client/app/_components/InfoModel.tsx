import { useCallback, useEffect, useState } from "react";
import useInfoModel from "@/hooks/useInfoModel";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

import { AiOutlineClose } from "react-icons/ai";
import styles from "@/styles/InfoModel.module.css";
import API_BASE_URL from "@/lib/api";
import { MovieType } from "@/types/MovieType";

interface InfoModelProps {
  visible?: boolean;
}

export default function InfoModel({ visible }: InfoModelProps) {
  const { closeModel, movieId } = useInfoModel();
  const [movie, setMovie] = useState<MovieType>({
    _id: "",
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    genre: "",
    duration: "",
  });

  const handleCose = useCallback(
    function () {
      setTimeout(function () {
        closeModel();
      }, 300);
    },
    [closeModel],
  );

  async function fetchMovie(movieId: string) {
    if (!movieId)
      return {
        _id: "",
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        genre: "",
        duration: "",
      };
    const response = await fetch(
      `${API_BASE_URL}/api/v1/movies/getMovieById/${movieId}`,
    );
    const data = await response.json();
    return data.d;
  }

  useEffect(
    function () {
      fetchMovie(movieId!).then((data) => setMovie(data));
    },
    [movieId],
  );

  if (!visible) {
    return;
  }

  return (
    <div
      className={`${styles.infoModel} z-50 transition duration-300 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0`}
    >
      <div className="w-full h-full relative">
        <div className="overflow-hidden flex justify-center items-center h-full">
          <div
            className={`${visible ? "scale-100" : "scale-0"} max-w-3xl transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md transition`}
          >
            <div className="relative h-96">
              {movie?.videoUrl && (
                <video
                  src={movie?.videoUrl ?? null}
                  autoPlay
                  muted
                  loop
                  poster={movie?.thumbnailUrl ?? null}
                  className="w-full brightness-60 object-cover h-full"
                ></video>
              )}
              <div
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black flex justify-center items-center"
                onClick={handleCose}
              >
                <AiOutlineClose className="text-white" size={20} />
              </div>
              <div className="absolute bottom-[10%] left-10">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                  {movie.title ?? null}
                </p>
                <div className="flex gap-4 items-center">
                  <PlayButton movieId={movie._id ?? null} />
                  <FavoriteButton favoriteIds={movie._id ?? null} />
                </div>
              </div>
            </div>
            <div className="px-12 py-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{movie.duration ?? null}</p>
              <p className="text-white text-lg">{movie.genre ?? null}</p>
              <p className="text-white text-lg">{movie.description ?? null}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
