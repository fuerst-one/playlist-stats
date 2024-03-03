"use client"; // Error components must be Client Components

import { AppLayout } from "@/components/AppLayout";
import { isTokenMissingError } from "@/utils/TokenMissingError";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (isTokenMissingError(error)) {
    location.assign("/");
  }

  return (
    <AppLayout>
      <h1>Sorry, there was an error</h1>
    </AppLayout>
  );
}
