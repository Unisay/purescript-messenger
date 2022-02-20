import esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    minify: true,
    sourcemap: false,
    logLevel: "info",
    entryPoints: ["build/index-bundle.js"],
    external: ["url", "xhr2"],
    outfile: "dist/main.js",
  })
  .catch((e) => {
    error(e);
    process.exit(1);
  });
