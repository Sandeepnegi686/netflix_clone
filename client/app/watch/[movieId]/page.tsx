import WatchClient from "@/app/_components/WatchClient";

async function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params;
  if (!movieId) {
    return (
      <div className="text-center text-white text-3xl">Unknown movie ID</div>
    );
  }

  return <WatchClient movieId={movieId} />;
}

export default Page;
