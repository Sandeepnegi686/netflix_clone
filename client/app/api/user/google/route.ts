import API_BASE_URL from "@/lib/api";

export async function GET() {
  return Response.redirect(`${API_BASE_URL}/api/v1/auth/google`, 302);
}
