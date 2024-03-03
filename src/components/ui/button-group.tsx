import { ComponentPropsWithRef } from "react";

export const ButtonGroup = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      {...props}
      className={`flex flex-shrink-0 rounded shadow-sm *:rounded-none *:border-l-0 [&>:first-child.border]:border-l [&>:first-child]:rounded-bl [&>:first-child]:rounded-tl [&>:last-child]:rounded-br [&>:last-child]:rounded-tr ${className}`}
    >
      {children}
    </div>
  );
};
