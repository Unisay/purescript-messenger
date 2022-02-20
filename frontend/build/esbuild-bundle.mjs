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
    plugins: [PureScriptPlugin({ output: "dce-output" })],
  })
  .catch((e) => {
    error(e);
    process.exit(1);
  });
