import API_BASE_URL from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/movies/getFavMovieByUser`,
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
  return Response.json(data.d);
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  const body = await req.json();
  const res = await fetch(`${API_BASE_URL}/api/v1/movies/addFavoriteMovie`, {
    body: JSON.stringify(body),
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token?.value}`,
    },
  });
  if (!res.ok) {
    return Response.json(null, { status: res.status });
  }
  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function DELETE(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  const body = await req.json();
  const res = await fetch(`${API_BASE_URL}/api/v1/movies/removeFavoriteMovie`, {
    body: JSON.stringify(body),
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token?.value}`,
    },
  });
  if (!res.ok) {
    return Response.json(null, { status: res.status });
  }
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
