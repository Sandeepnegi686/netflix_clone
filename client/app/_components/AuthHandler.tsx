"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("access-token");

    if (!token) return;

    fetch(`/api/user/currentUser`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      router.push("/profiles");
    });
  }, [params, router]);
  return <div></div>;
}
