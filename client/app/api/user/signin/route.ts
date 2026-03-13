import API_BASE_URL from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  const cookie = response.headers.get("set-cookie");
  return Response.json(data, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie || "",
    },
  });
}
