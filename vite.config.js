import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
    plugins: [react()],
});
