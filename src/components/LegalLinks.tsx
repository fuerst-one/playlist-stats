import Link from "next/link";
import React, { ComponentPropsWithRef } from "react";

export const LegalLinks = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      {...props}
      className={`items-center justify-center gap-2 text-2xs font-medium text-gray-500 lg:text-xs ${className}`}
    >
      <Link href="https://fuerst.one" className="hover:underline">
        &copy; {new Date().getFullYear()} https://fuerst.one
      </Link>
      |
      <Link
        href="https://github.com/fuerst-one/playlist-stats"
        className="hover:underline"
      >
        github
      </Link>
      <Link href="https://fuerst.one/impressum" className="hover:underline">
        imprint
      </Link>
      <Link href="https://fuerst.one/datenschutz" className="hover:underline">
        privacy policy
      </Link>
    </div>
  );
};
