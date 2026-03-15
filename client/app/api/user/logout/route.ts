import API_BASE_URL from "@/lib/api";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }

  const data = await response.json();
  const cookie = response.headers.get("set-cookie");

  const res = Response.json(data, { status: response.status });
  if (cookie) {
    res.headers.set("Set-Cookie", cookie);
  }

  return res;
}
