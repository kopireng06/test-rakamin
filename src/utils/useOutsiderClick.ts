import { MutableRefObject, useEffect } from "react";

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  onClickOutside: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickOutside(event);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};

export { useOutsideClick };
