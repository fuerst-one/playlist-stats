import { ComponentPropsWithRef } from "react";

export const Container = ({
  children,
  ...props
}: ComponentPropsWithRef<"main">) => (
  <main
    {...props}
    className={`max-w-screen-xl! px-md md:px-lg xxl:px-2xl mx-auto lg:container ${props.className}`}
  >
    {children}
  </main>
);

export const SidebarContainer = (props: ComponentPropsWithRef<"main">) => (
  <main
    {...props}
    className={`max-w-screen-xl! px-xs sm:px-md md:px-lg xxl:px-2xl mx-auto flex flex-wrap items-start gap-3 lg:container md:gap-0 ${props.className}`}
  />
);

export const SidebarContent = ({
  $fixed,
  children,
  ...props
}: { $fixed?: boolean } & ComponentPropsWithRef<"aside">) => (
  <aside
    {...props}
    className={`mb-xl w-full px-1 md:px-3 lg:order-1 lg:w-5/12 xl:w-4/12 ${
      $fixed
        ? "max-h-[calc(100vh - 120px)] overflow-y-auto lg:sticky lg:top-[100px]"
        : ""
    } ${props.className}`}
  >
    {children}
  </aside>
);

export const MainContent = ({
  children,
  ...props
}: ComponentPropsWithRef<"article">) => (
  <article
    {...props}
    className={`lg:pl-xl mb-xl w-full px-1 md:px-3 lg:order-2 lg:w-7/12 xl:w-8/12 ${props.className}`}
  >
    {children}
  </article>
);
