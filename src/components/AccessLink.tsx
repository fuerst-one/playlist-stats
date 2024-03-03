import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const emailContent = `subject=I'd like to have access to your spotify collage app&body=Hi, I found your app and would like access to it. My spotify email is ...`;

export const AccessLink = () => {
  return (
    <Link href={`mailto:alexander@fuerst.one?${emailContent}`}>
      <Button size="lg" variant="outline">
        Request Access
      </Button>
    </Link>
  );
};
