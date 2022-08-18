#!/usr/bin/env node
const { Binary } = require("binary-install");

var binary;

if (process.platform == 'darwin') {
  binary = new Binary('zephyr', 'https://github.com/MaybeJustJames/zephyr/releases/download/v0.5.2/macOS.tar.gz')
} else if (process.platform == 'linux') {
  binary = new Binary('zephyr', 'https://github.com/MaybeJustJames/zephyr/releases/download/v0.5.2/Linux.tar.gz')
} else throw `Platform is not supported: ${process.platform}`

binary.install();
