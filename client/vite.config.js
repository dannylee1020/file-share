import {defineConfig} from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        https: true,
        host: "0.0.0.0",
        port: 5173,
    },
    plugins: [react(), mkcert()],
});
