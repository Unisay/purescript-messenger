import esbuild from "esbuild";
import express from "express";
import livereload from "livereload";
import connectLiveReload from 'connect-livereload';
import PureScriptPlugin from "esbuild-plugin-purescript";
import * as fs from 'node:fs';

esbuild
  .build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["build/index.js"],
    external: ["url", "xhr2"],
    outdir: "dist/js",
    sourcemap: true,
    plugins: [PureScriptPlugin()],
  })
  .then(({ errors, warnings, stop }) => {
    const lrServer = livereload.createServer({
      debug: true,
      https: {
        key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
        cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
      }
    });
    lrServer.watch("dist");
    lrServer.server.once("connection", () => {
      setTimeout(() => {
        lrServer.refresh("/");
      }, 200);
    });
    const app = express();
    const port = 8000;
    app.use(express.static('dist'));
    app.use(connectLiveReload());
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });



