import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    base:
      mode === "gh-pages"
        ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "byteCraft"}/`
        : "/",
    define: {
      // Force inlining of Firebase env in the client bundle for GitHub Pages builds.
      "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(env.VITE_FIREBASE_API_KEY ?? ""),
      "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN ?? ""),
      "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(env.VITE_FIREBASE_PROJECT_ID ?? ""),
      "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(env.VITE_FIREBASE_APP_ID ?? ""),
    },
    build: {
      sourcemap: "hidden",
    },
    plugins: [
      react({
        babel: {
          plugins: ["react-dev-locator"],
        },
      }),
      traeBadgePlugin({
        variant: "dark",
        position: "bottom-right",
        prodOnly: true,
        clickable: true,
        clickUrl: "https://www.trae.ai/solo?showJoin=1",
        autoTheme: true,
        autoThemeTarget: "#root",
      }),
      tsconfigPaths(),
    ],
  };
});
