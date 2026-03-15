import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

function required(value: unknown, name: string): string {
  if (!value || typeof value !== "string") {
    throw new Error(
      `Missing environment variable ${name}. ` +
        `For local dev, set it in .env.local. For GitHub Pages, set it as an Actions Secret and redeploy.`,
    );
  }
  return value;
}

const firebaseConfig = {
  // Use direct access so Vite can inline VITE_* at build time (GitHub Pages).
  apiKey: required(import.meta.env.VITE_FIREBASE_API_KEY, "VITE_FIREBASE_API_KEY"),
  authDomain: required(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: required(import.meta.env.VITE_FIREBASE_PROJECT_ID, "VITE_FIREBASE_PROJECT_ID"),
  appId: required(import.meta.env.VITE_FIREBASE_APP_ID, "VITE_FIREBASE_APP_ID"),
};

export const firebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
