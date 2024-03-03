import Link from "next/link";
import React, { ComponentPropsWithRef } from "react";

export const LegalLinks = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      {...props}
      className={`text-2xs items-center justify-center gap-2 font-medium text-gray-500 lg:text-xs ${className}`}
    >
      <Link href="https://fuerst.one" className="hover:underline">
        &copy; {new Date().getFullYear()} https://fuerst.one
      </Link>
      |
      <Link
        href="https://github.com/fuerst-one/playlist-canvas"
        className="hover:underline"
      >
        github
      </Link>
      <Link href="https://fuerst.one/impressum" className="hover:underline">
        imprint
      </Link>
      <Link href="https://fuerst.one/impressum" className="hover:underline">
        privacy policy
      </Link>
    </div>
  );
};
