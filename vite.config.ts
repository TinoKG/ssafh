import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // This app is deployed to Netlify, so disable the lovable config's default
  // Cloudflare/nitro deploy plugin and let the Netlify plugin prepare the build
  // (it turns the SSR entry into a Netlify Function and emulates Netlify in dev).
  nitro: false,
  plugins: [netlify()],
});
