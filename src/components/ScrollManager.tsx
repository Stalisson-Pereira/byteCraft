import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToHash(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = window.setTimeout(() => scrollToHash(location.hash), 0);
      return () => window.clearTimeout(t);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}

