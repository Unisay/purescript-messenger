"use strict";

const { argon2i } = require("argon2-ffi");

exports._hashPassword = function (password) {
  return async function (salt) {
    return await argon2i.hash(password, Buffer.from(salt));
  };
};
