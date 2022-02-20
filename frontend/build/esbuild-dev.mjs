import esbuild from "esbuild";
import serve, { error, log } from "create-serve";

esbuild
  .build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["build/index-dev.js"],
    external: ["url", "xhr2"],
    outfile: "dist/main.js",
    sourcemap: true,
    watch: {
      onRebuild(err) {
        serve.update();
        err ? error("× Failed") : log("✓ Updated");
      },
    },
  })
  .then(({ errors, warnings, stop }) => {
    serve.start({
      port: 8000,
      root: "dist",
      live: true,
    });
  })
  .catch((e) => {
    error(e);
    process.exit(1);
  });
