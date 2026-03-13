import API_BASE_URL from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = (await cookieStore).get("access-token");
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token?.value}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  return Response.json(data, {
    status: response.status,
  });
}
