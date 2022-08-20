import esbuild from "esbuild";
import PureScriptPlugin from "esbuild-plugin-purescript";

esbuild
  .build({
    bundle: true,
    minify: true,
    sourcemap: false,
    logLevel: "info",
    entryPoints: ["build/index.js"],
    external: ["url", "xhr2"],
    outdir: "dist/js",
    treeShaking: true,
    plugins: [PureScriptPlugin({ output: "output" })],
  })
  .catch((e) => {
    console.error(e);
  });
