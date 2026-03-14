"use client";
import { useGetMovieById } from "@/hooks/getMovie";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function WatchClient({ movieId }: { movieId: string }) {
  const { movie, error } = useGetMovieById(movieId);
  if (error) {
    return (
      <div className="text-center text-white text-3xl">Unknown movie ID</div>
    );
  }
  return (
    <div className="h-screen w-screen">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black brightness-70">
        <Link href="/" className="ml-4">
          <AiOutlineArrowLeft className="text-white" size={30} />
        </Link>
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie.videoUrl}
        poster={movie.thumbnailUrl}
      ></video>
    </div>
  );
}
