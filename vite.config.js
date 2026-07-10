import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";

const getInlineSvg = (fileName, className) => {
  const filePath = path.resolve(__dirname, `public/res/${fileName}`);
  const svgRaw = fs.readFileSync(filePath, "utf-8");
  return svgRaw.replace("<svg", `<svg class="${className}"`);
};

const htmlVariables = {
  logoSvg: getInlineSvg("logo.svg", ""),
  githubSvg: getInlineSvg("github.svg", "icon"),
  downloadSvg: getInlineSvg("download.svg", "icon"),
  integralSvg: getInlineSvg("integral.svg", "maths"),
  sumSvg: getInlineSvg("sum.svg", "maths"),
  linuxSvg: getInlineSvg("linux.svg", "linux"),
  windowsSvg: getInlineSvg("windows.svg", "windows"),
  macSvg: getInlineSvg("mac.svg", "mac"),
}

export default defineConfig({
  optimizeDeps: {
    exclude: ["@paddim8/kalk-component"]
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@paddim8/kalk-component/public/build/*",
          dest: "dist",
          rename: { stripBase: true }
        }
      ]
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: "index.html",
          template: "index.html",
          injectOptions: { data: htmlVariables }
        },
        {
          filename: "kalk.html",
          template: "kalk.html",
          injectOptions: { data: htmlVariables }
        }
      ]
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        kalk: path.resolve(__dirname, "kalk.html")
      }
    }
  }
});
