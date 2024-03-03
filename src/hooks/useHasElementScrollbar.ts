import { RefObject, useEffect, useState } from "react";

export const useHasElementScrollbar = (elementRef: RefObject<HTMLElement>) => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    const hasVerticalScrollbar =
      element.offsetHeight - element.clientHeight !== 0;
    const hasHorizontalScrollbar =
      element.offsetWidth - element.clientWidth !== 0;
    setHasScrollbar(hasVerticalScrollbar || hasHorizontalScrollbar);
  }, [elementRef]);

  return hasScrollbar;
};
