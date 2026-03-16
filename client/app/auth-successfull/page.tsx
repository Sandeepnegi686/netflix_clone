"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleAuth() {
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

  return <p>Signing you in...</p>;
}
