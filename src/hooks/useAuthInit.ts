import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";

export default function useAuthInit() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => init(), [init]);
}

