import { useEffect } from "react";

const useRedirect = (fromPath: string, toPath: string) => {
  useEffect(() => {
    if (window.location.pathname === fromPath) {
      window.location.replace(origin + toPath);
    }
  }, []);
};

export { useRedirect };
