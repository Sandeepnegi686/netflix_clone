import API_BASE_URL from "@/lib/api";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  },
) {
  const movieId = (await params).movieId;
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/movies/getMovieById/${movieId}`,
    {
      headers: {
        Cookie: `access-token=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP ERROR, status code: ${response.status}`);
  }

  const data = await response.json();
  return Response.json(data);
}
