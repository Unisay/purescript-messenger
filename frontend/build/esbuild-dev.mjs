import esbuild from "esbuild";
import serve, { error, log } from "create-serve";
import PureScriptPlugin from "esbuild-plugin-purescript";

esbuild
  .build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["build/index.js"],
    external: ["url", "xhr2"],
    outdir: "dist/js",
    sourcemap: true,
    watch: {
      onRebuild(err) {
        serve.update();
        err ? error("Failed") : log("✓ Updated");
      },
    },
    plugins: [PureScriptPlugin()],
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
