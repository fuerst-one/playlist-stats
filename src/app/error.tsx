"use client";

import { IntroLayout } from "@/components/IntroLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { isNoAccessError } from "@/utils/NoAccessError";
import { isTokenMissingError } from "@/utils/TokenMissingError";
import Link from "next/link";
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

  let message = "Sorry, there was an error";
  if (isTokenMissingError(error) || isNoAccessError(error)) {
    message = error.message;
  }

  return (
    <IntroLayout>
      <CardHeader>
        <h1 className="text-center font-semibold text-red-500">{message}</h1>
      </CardHeader>
      <CardContent>
        <Link href="/">
          <Button variant="primary" className="w-full">
            Go back to homepage
          </Button>
        </Link>
      </CardContent>
    </IntroLayout>
  );
}
