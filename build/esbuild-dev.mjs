import esbuild from "esbuild";
import express from "express";
import livereload from "livereload";
import connectLiveReload from 'connect-livereload';
import PureScriptPlugin from "esbuild-plugin-purescript";
import * as fs from 'node:fs';
import * as https from 'https'

const certs = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.crt')
};

const livereloadServer = livereload.createServer({
  debug: false,
  https: certs
});

esbuild
  .build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["build/index.js"],
    external: ["url", "xhr2"],
    outdir: "dist/js",
    sourcemap: true,
    plugins: [PureScriptPlugin()],
    watch: {
      onRebuild(err) {
        if (err) {
          console.error("Rebuild Failed")
        } else {
          livereloadServer.refresh("/");
          console.info("✓ Asked browsers to refresh");
        }
      },
    },
  })
  .then(({ errors, warnings, stop }) => {
    livereloadServer.server.once("connection", () => {
      setTimeout(() => { livereloadServer.refresh("/"); }, 200);
    });
    const port = 8000;
    const devServer = express();
    devServer.use(express.static('dist'));
    devServer.use(connectLiveReload());
    https.createServer(certs, devServer).listen(port, () => {
      console.log(`Dev server is listening on port ${port}`)
    })
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });



