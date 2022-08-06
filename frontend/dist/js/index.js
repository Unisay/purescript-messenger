(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod5) => function __require() {
    return mod5 || (0, cb[__getOwnPropNames(cb)[0]])((mod5 = { exports: {} }).exports, mod5), mod5.exports;
  };
  var __copyProps = (to3, from3, except3, desc) => {
    if (from3 && typeof from3 === "object" || typeof from3 === "function") {
      for (let key2 of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to3, key2) && key2 !== except3)
          __defProp(to3, key2, { get: () => from3[key2], enumerable: !(desc = __getOwnPropDesc(from3, key2)) || desc.enumerable });
    }
    return to3;
  };
  var __toESM = (mod5, isNodeMode, target7) => (target7 = mod5 != null ? __create(__getProtoOf(mod5)) : {}, __copyProps(isNodeMode || !mod5 || !mod5.__esModule ? __defProp(target7, "default", { value: mod5, enumerable: true }) : target7, mod5));

  // ../node_modules/crypt/crypt.js
  var require_crypt = __commonJS({
    "../node_modules/crypt/crypt.js"(exports, module) {
      (function() {
        var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
          rotl: function(n2, b3) {
            return n2 << b3 | n2 >>> 32 - b3;
          },
          rotr: function(n2, b3) {
            return n2 << 32 - b3 | n2 >>> b3;
          },
          endian: function(n2) {
            if (n2.constructor == Number) {
              return crypt.rotl(n2, 8) & 16711935 | crypt.rotl(n2, 24) & 4278255360;
            }
            for (var i3 = 0; i3 < n2.length; i3++)
              n2[i3] = crypt.endian(n2[i3]);
            return n2;
          },
          randomBytes: function(n2) {
            for (var bytes = []; n2 > 0; n2--)
              bytes.push(Math.floor(Math.random() * 256));
            return bytes;
          },
          bytesToWords: function(bytes) {
            for (var words = [], i3 = 0, b3 = 0; i3 < bytes.length; i3++, b3 += 8)
              words[b3 >>> 5] |= bytes[i3] << 24 - b3 % 32;
            return words;
          },
          wordsToBytes: function(words) {
            for (var bytes = [], b3 = 0; b3 < words.length * 32; b3 += 8)
              bytes.push(words[b3 >>> 5] >>> 24 - b3 % 32 & 255);
            return bytes;
          },
          bytesToHex: function(bytes) {
            for (var hex = [], i3 = 0; i3 < bytes.length; i3++) {
              hex.push((bytes[i3] >>> 4).toString(16));
              hex.push((bytes[i3] & 15).toString(16));
            }
            return hex.join("");
          },
          hexToBytes: function(hex) {
            for (var bytes = [], c2 = 0; c2 < hex.length; c2 += 2)
              bytes.push(parseInt(hex.substr(c2, 2), 16));
            return bytes;
          },
          bytesToBase64: function(bytes) {
            for (var base64 = [], i3 = 0; i3 < bytes.length; i3 += 3) {
              var triplet = bytes[i3] << 16 | bytes[i3 + 1] << 8 | bytes[i3 + 2];
              for (var j2 = 0; j2 < 4; j2++)
                if (i3 * 8 + j2 * 6 <= bytes.length * 8)
                  base64.push(base64map.charAt(triplet >>> 6 * (3 - j2) & 63));
                else
                  base64.push("=");
            }
            return base64.join("");
          },
          base64ToBytes: function(base64) {
            base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
            for (var bytes = [], i3 = 0, imod4 = 0; i3 < base64.length; imod4 = ++i3 % 4) {
              if (imod4 == 0)
                continue;
              bytes.push((base64map.indexOf(base64.charAt(i3 - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i3)) >>> 6 - imod4 * 2);
            }
            return bytes;
          }
        };
        module.exports = crypt;
      })();
    }
  });

  // ../node_modules/charenc/charenc.js
  var require_charenc = __commonJS({
    "../node_modules/charenc/charenc.js"(exports, module) {
      var charenc = {
        utf8: {
          stringToBytes: function(str) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
          },
          bytesToString: function(bytes) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
          }
        },
        bin: {
          stringToBytes: function(str) {
            for (var bytes = [], i3 = 0; i3 < str.length; i3++)
              bytes.push(str.charCodeAt(i3) & 255);
            return bytes;
          },
          bytesToString: function(bytes) {
            for (var str = [], i3 = 0; i3 < bytes.length; i3++)
              str.push(String.fromCharCode(bytes[i3]));
            return str.join("");
          }
        }
      };
      module.exports = charenc;
    }
  });

  // ../node_modules/is-buffer/index.js
  var require_is_buffer = __commonJS({
    "../node_modules/is-buffer/index.js"(exports, module) {
      module.exports = function(obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };
      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
      }
    }
  });

  // ../node_modules/md5/md5.js
  var require_md5 = __commonJS({
    "../node_modules/md5/md5.js"(exports, module) {
      (function() {
        var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer = require_is_buffer(), bin = require_charenc().bin, md52 = function(message2, options2) {
          if (message2.constructor == String)
            if (options2 && options2.encoding === "binary")
              message2 = bin.stringToBytes(message2);
            else
              message2 = utf8.stringToBytes(message2);
          else if (isBuffer(message2))
            message2 = Array.prototype.slice.call(message2, 0);
          else if (!Array.isArray(message2) && message2.constructor !== Uint8Array)
            message2 = message2.toString();
          var m2 = crypt.bytesToWords(message2), l2 = message2.length * 8, a3 = 1732584193, b3 = -271733879, c2 = -1732584194, d2 = 271733878;
          for (var i3 = 0; i3 < m2.length; i3++) {
            m2[i3] = (m2[i3] << 8 | m2[i3] >>> 24) & 16711935 | (m2[i3] << 24 | m2[i3] >>> 8) & 4278255360;
          }
          m2[l2 >>> 5] |= 128 << l2 % 32;
          m2[(l2 + 64 >>> 9 << 4) + 14] = l2;
          var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
          for (var i3 = 0; i3 < m2.length; i3 += 16) {
            var aa2 = a3, bb = b3, cc2 = c2, dd2 = d2;
            a3 = FF(a3, b3, c2, d2, m2[i3 + 0], 7, -680876936);
            d2 = FF(d2, a3, b3, c2, m2[i3 + 1], 12, -389564586);
            c2 = FF(c2, d2, a3, b3, m2[i3 + 2], 17, 606105819);
            b3 = FF(b3, c2, d2, a3, m2[i3 + 3], 22, -1044525330);
            a3 = FF(a3, b3, c2, d2, m2[i3 + 4], 7, -176418897);
            d2 = FF(d2, a3, b3, c2, m2[i3 + 5], 12, 1200080426);
            c2 = FF(c2, d2, a3, b3, m2[i3 + 6], 17, -1473231341);
            b3 = FF(b3, c2, d2, a3, m2[i3 + 7], 22, -45705983);
            a3 = FF(a3, b3, c2, d2, m2[i3 + 8], 7, 1770035416);
            d2 = FF(d2, a3, b3, c2, m2[i3 + 9], 12, -1958414417);
            c2 = FF(c2, d2, a3, b3, m2[i3 + 10], 17, -42063);
            b3 = FF(b3, c2, d2, a3, m2[i3 + 11], 22, -1990404162);
            a3 = FF(a3, b3, c2, d2, m2[i3 + 12], 7, 1804603682);
            d2 = FF(d2, a3, b3, c2, m2[i3 + 13], 12, -40341101);
            c2 = FF(c2, d2, a3, b3, m2[i3 + 14], 17, -1502002290);
            b3 = FF(b3, c2, d2, a3, m2[i3 + 15], 22, 1236535329);
            a3 = GG(a3, b3, c2, d2, m2[i3 + 1], 5, -165796510);
            d2 = GG(d2, a3, b3, c2, m2[i3 + 6], 9, -1069501632);
            c2 = GG(c2, d2, a3, b3, m2[i3 + 11], 14, 643717713);
            b3 = GG(b3, c2, d2, a3, m2[i3 + 0], 20, -373897302);
            a3 = GG(a3, b3, c2, d2, m2[i3 + 5], 5, -701558691);
            d2 = GG(d2, a3, b3, c2, m2[i3 + 10], 9, 38016083);
            c2 = GG(c2, d2, a3, b3, m2[i3 + 15], 14, -660478335);
            b3 = GG(b3, c2, d2, a3, m2[i3 + 4], 20, -405537848);
            a3 = GG(a3, b3, c2, d2, m2[i3 + 9], 5, 568446438);
            d2 = GG(d2, a3, b3, c2, m2[i3 + 14], 9, -1019803690);
            c2 = GG(c2, d2, a3, b3, m2[i3 + 3], 14, -187363961);
            b3 = GG(b3, c2, d2, a3, m2[i3 + 8], 20, 1163531501);
            a3 = GG(a3, b3, c2, d2, m2[i3 + 13], 5, -1444681467);
            d2 = GG(d2, a3, b3, c2, m2[i3 + 2], 9, -51403784);
            c2 = GG(c2, d2, a3, b3, m2[i3 + 7], 14, 1735328473);
            b3 = GG(b3, c2, d2, a3, m2[i3 + 12], 20, -1926607734);
            a3 = HH(a3, b3, c2, d2, m2[i3 + 5], 4, -378558);
            d2 = HH(d2, a3, b3, c2, m2[i3 + 8], 11, -2022574463);
            c2 = HH(c2, d2, a3, b3, m2[i3 + 11], 16, 1839030562);
            b3 = HH(b3, c2, d2, a3, m2[i3 + 14], 23, -35309556);
            a3 = HH(a3, b3, c2, d2, m2[i3 + 1], 4, -1530992060);
            d2 = HH(d2, a3, b3, c2, m2[i3 + 4], 11, 1272893353);
            c2 = HH(c2, d2, a3, b3, m2[i3 + 7], 16, -155497632);
            b3 = HH(b3, c2, d2, a3, m2[i3 + 10], 23, -1094730640);
            a3 = HH(a3, b3, c2, d2, m2[i3 + 13], 4, 681279174);
            d2 = HH(d2, a3, b3, c2, m2[i3 + 0], 11, -358537222);
            c2 = HH(c2, d2, a3, b3, m2[i3 + 3], 16, -722521979);
            b3 = HH(b3, c2, d2, a3, m2[i3 + 6], 23, 76029189);
            a3 = HH(a3, b3, c2, d2, m2[i3 + 9], 4, -640364487);
            d2 = HH(d2, a3, b3, c2, m2[i3 + 12], 11, -421815835);
            c2 = HH(c2, d2, a3, b3, m2[i3 + 15], 16, 530742520);
            b3 = HH(b3, c2, d2, a3, m2[i3 + 2], 23, -995338651);
            a3 = II(a3, b3, c2, d2, m2[i3 + 0], 6, -198630844);
            d2 = II(d2, a3, b3, c2, m2[i3 + 7], 10, 1126891415);
            c2 = II(c2, d2, a3, b3, m2[i3 + 14], 15, -1416354905);
            b3 = II(b3, c2, d2, a3, m2[i3 + 5], 21, -57434055);
            a3 = II(a3, b3, c2, d2, m2[i3 + 12], 6, 1700485571);
            d2 = II(d2, a3, b3, c2, m2[i3 + 3], 10, -1894986606);
            c2 = II(c2, d2, a3, b3, m2[i3 + 10], 15, -1051523);
            b3 = II(b3, c2, d2, a3, m2[i3 + 1], 21, -2054922799);
            a3 = II(a3, b3, c2, d2, m2[i3 + 8], 6, 1873313359);
            d2 = II(d2, a3, b3, c2, m2[i3 + 15], 10, -30611744);
            c2 = II(c2, d2, a3, b3, m2[i3 + 6], 15, -1560198380);
            b3 = II(b3, c2, d2, a3, m2[i3 + 13], 21, 1309151649);
            a3 = II(a3, b3, c2, d2, m2[i3 + 4], 6, -145523070);
            d2 = II(d2, a3, b3, c2, m2[i3 + 11], 10, -1120210379);
            c2 = II(c2, d2, a3, b3, m2[i3 + 2], 15, 718787259);
            b3 = II(b3, c2, d2, a3, m2[i3 + 9], 21, -343485551);
            a3 = a3 + aa2 >>> 0;
            b3 = b3 + bb >>> 0;
            c2 = c2 + cc2 >>> 0;
            d2 = d2 + dd2 >>> 0;
          }
          return crypt.endian([a3, b3, c2, d2]);
        };
        md52._ff = function(a3, b3, c2, d2, x2, s2, t2) {
          var n2 = a3 + (b3 & c2 | ~b3 & d2) + (x2 >>> 0) + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b3;
        };
        md52._gg = function(a3, b3, c2, d2, x2, s2, t2) {
          var n2 = a3 + (b3 & d2 | c2 & ~d2) + (x2 >>> 0) + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b3;
        };
        md52._hh = function(a3, b3, c2, d2, x2, s2, t2) {
          var n2 = a3 + (b3 ^ c2 ^ d2) + (x2 >>> 0) + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b3;
        };
        md52._ii = function(a3, b3, c2, d2, x2, s2, t2) {
          var n2 = a3 + (c2 ^ (b3 | ~d2)) + (x2 >>> 0) + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b3;
        };
        md52._blocksize = 16;
        md52._digestsize = 16;
        module.exports = function(message2, options2) {
          if (message2 === void 0 || message2 === null)
            throw new Error("Illegal argument " + message2);
          var digestbytes = crypt.wordsToBytes(md52(message2, options2));
          return options2 && options2.asBytes ? digestbytes : options2 && options2.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
        };
      })();
    }
  });

  // ../node_modules/@auth0/auth0-spa-js/dist/auth0-spa-js.production.esm.js
  var e = function(t2, n2) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e2, t3) {
      e2.__proto__ = t3;
    } || function(e2, t3) {
      for (var n3 in t3)
        Object.prototype.hasOwnProperty.call(t3, n3) && (e2[n3] = t3[n3]);
    }, e(t2, n2);
  };
  function t(t2, n2) {
    if (typeof n2 != "function" && n2 !== null)
      throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
    function r2() {
      this.constructor = t2;
    }
    e(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
  }
  var n = function() {
    return n = Object.assign || function(e2) {
      for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
        for (var o2 in t2 = arguments[n2])
          Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
      return e2;
    }, n.apply(this, arguments);
  };
  function r(e2, t2) {
    var n2 = {};
    for (var r2 in e2)
      Object.prototype.hasOwnProperty.call(e2, r2) && t2.indexOf(r2) < 0 && (n2[r2] = e2[r2]);
    if (e2 != null && typeof Object.getOwnPropertySymbols == "function") {
      var o2 = 0;
      for (r2 = Object.getOwnPropertySymbols(e2); o2 < r2.length; o2++)
        t2.indexOf(r2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, r2[o2]) && (n2[r2[o2]] = e2[r2[o2]]);
    }
    return n2;
  }
  function o(e2, t2, n2, r2) {
    return new (n2 || (n2 = Promise))(function(o2, i3) {
      function a3(e3) {
        try {
          s2(r2.next(e3));
        } catch (e4) {
          i3(e4);
        }
      }
      function c2(e3) {
        try {
          s2(r2.throw(e3));
        } catch (e4) {
          i3(e4);
        }
      }
      function s2(e3) {
        var t3;
        e3.done ? o2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
          e4(t3);
        })).then(a3, c2);
      }
      s2((r2 = r2.apply(e2, t2 || [])).next());
    });
  }
  function i(e2, t2) {
    var n2, r2, o2, i3, a3 = { label: 0, sent: function() {
      if (1 & o2[0])
        throw o2[1];
      return o2[1];
    }, trys: [], ops: [] };
    return i3 = { next: c2(0), throw: c2(1), return: c2(2) }, typeof Symbol == "function" && (i3[Symbol.iterator] = function() {
      return this;
    }), i3;
    function c2(i4) {
      return function(c3) {
        return function(i5) {
          if (n2)
            throw new TypeError("Generator is already executing.");
          for (; a3; )
            try {
              if (n2 = 1, r2 && (o2 = 2 & i5[0] ? r2.return : i5[0] ? r2.throw || ((o2 = r2.return) && o2.call(r2), 0) : r2.next) && !(o2 = o2.call(r2, i5[1])).done)
                return o2;
              switch (r2 = 0, o2 && (i5 = [2 & i5[0], o2.value]), i5[0]) {
                case 0:
                case 1:
                  o2 = i5;
                  break;
                case 4:
                  return a3.label++, { value: i5[1], done: false };
                case 5:
                  a3.label++, r2 = i5[1], i5 = [0];
                  continue;
                case 7:
                  i5 = a3.ops.pop(), a3.trys.pop();
                  continue;
                default:
                  if (!(o2 = a3.trys, (o2 = o2.length > 0 && o2[o2.length - 1]) || i5[0] !== 6 && i5[0] !== 2)) {
                    a3 = 0;
                    continue;
                  }
                  if (i5[0] === 3 && (!o2 || i5[1] > o2[0] && i5[1] < o2[3])) {
                    a3.label = i5[1];
                    break;
                  }
                  if (i5[0] === 6 && a3.label < o2[1]) {
                    a3.label = o2[1], o2 = i5;
                    break;
                  }
                  if (o2 && a3.label < o2[2]) {
                    a3.label = o2[2], a3.ops.push(i5);
                    break;
                  }
                  o2[2] && a3.ops.pop(), a3.trys.pop();
                  continue;
              }
              i5 = t2.call(e2, a3);
            } catch (e3) {
              i5 = [6, e3], r2 = 0;
            } finally {
              n2 = o2 = 0;
            }
          if (5 & i5[0])
            throw i5[1];
          return { value: i5[0] ? i5[1] : void 0, done: true };
        }([i4, c3]);
      };
    }
  }
  function a(e2, t2) {
    var n2 = typeof Symbol == "function" && e2[Symbol.iterator];
    if (!n2)
      return e2;
    var r2, o2, i3 = n2.call(e2), a3 = [];
    try {
      for (; (t2 === void 0 || t2-- > 0) && !(r2 = i3.next()).done; )
        a3.push(r2.value);
    } catch (e3) {
      o2 = { error: e3 };
    } finally {
      try {
        r2 && !r2.done && (n2 = i3.return) && n2.call(i3);
      } finally {
        if (o2)
          throw o2.error;
      }
    }
    return a3;
  }
  function c(e2, t2, n2) {
    if (n2 || arguments.length === 2)
      for (var r2, o2 = 0, i3 = t2.length; o2 < i3; o2++)
        !r2 && o2 in t2 || (r2 || (r2 = Array.prototype.slice.call(t2, 0, o2)), r2[o2] = t2[o2]);
    return e2.concat(r2 || Array.prototype.slice.call(t2));
  }
  var s = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
  function u(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function l(e2, t2) {
    return e2(t2 = { exports: {} }, t2.exports), t2.exports;
  }
  var f;
  var d;
  var h = function(e2) {
    return e2 && e2.Math == Math && e2;
  };
  var p = h(typeof globalThis == "object" && globalThis) || h(typeof window == "object" && window) || h(typeof self == "object" && self) || h(typeof s == "object" && s) || function() {
    return this;
  }() || Function("return this")();
  var y = function(e2) {
    try {
      return !!e2();
    } catch (e3) {
      return true;
    }
  };
  var v = !y(function() {
    return Object.defineProperty({}, 1, { get: function() {
      return 7;
    } })[1] != 7;
  });
  var m = !y(function() {
    var e2 = function() {
    }.bind();
    return typeof e2 != "function" || e2.hasOwnProperty("prototype");
  });
  var b = Function.prototype.call;
  var g = m ? b.bind(b) : function() {
    return b.apply(b, arguments);
  };
  var w = {}.propertyIsEnumerable;
  var S = Object.getOwnPropertyDescriptor;
  var k = S && !w.call({ 1: 2 }, 1) ? function(e2) {
    var t2 = S(this, e2);
    return !!t2 && t2.enumerable;
  } : w;
  var _ = { f: k };
  var I = function(e2, t2) {
    return { enumerable: !(1 & e2), configurable: !(2 & e2), writable: !(4 & e2), value: t2 };
  };
  var T = Function.prototype;
  var O = T.bind;
  var x = T.call;
  var C = m && O.bind(x, x);
  var R = m ? function(e2) {
    return e2 && C(e2);
  } : function(e2) {
    return e2 && function() {
      return x.apply(e2, arguments);
    };
  };
  var E = R({}.toString);
  var j = R("".slice);
  var K = function(e2) {
    return j(E(e2), 8, -1);
  };
  var U = p.Object;
  var F = R("".split);
  var W = y(function() {
    return !U("z").propertyIsEnumerable(0);
  }) ? function(e2) {
    return K(e2) == "String" ? F(e2, "") : U(e2);
  } : U;
  var Z = p.TypeError;
  var L = function(e2) {
    if (e2 == null)
      throw Z("Can't call method on " + e2);
    return e2;
  };
  var G = function(e2) {
    return W(L(e2));
  };
  var P = function(e2) {
    return typeof e2 == "function";
  };
  var A = function(e2) {
    return typeof e2 == "object" ? e2 !== null : P(e2);
  };
  var X = function(e2) {
    return P(e2) ? e2 : void 0;
  };
  var V = function(e2, t2) {
    return arguments.length < 2 ? X(p[e2]) : p[e2] && p[e2][t2];
  };
  var N = R({}.isPrototypeOf);
  var J = V("navigator", "userAgent") || "";
  var Y = p.process;
  var H = p.Deno;
  var D = Y && Y.versions || H && H.version;
  var B = D && D.v8;
  B && (d = (f = B.split("."))[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1])), !d && J && (!(f = J.match(/Edge\/(\d+)/)) || f[1] >= 74) && (f = J.match(/Chrome\/(\d+)/)) && (d = +f[1]);
  var z = d;
  var M = !!Object.getOwnPropertySymbols && !y(function() {
    var e2 = Symbol();
    return !String(e2) || !(Object(e2) instanceof Symbol) || !Symbol.sham && z && z < 41;
  });
  var q = M && !Symbol.sham && typeof Symbol.iterator == "symbol";
  var Q = p.Object;
  var $ = q ? function(e2) {
    return typeof e2 == "symbol";
  } : function(e2) {
    var t2 = V("Symbol");
    return P(t2) && N(t2.prototype, Q(e2));
  };
  var ee = p.String;
  var te = function(e2) {
    try {
      return ee(e2);
    } catch (e3) {
      return "Object";
    }
  };
  var ne = p.TypeError;
  var re = function(e2) {
    if (P(e2))
      return e2;
    throw ne(te(e2) + " is not a function");
  };
  var oe = function(e2, t2) {
    var n2 = e2[t2];
    return n2 == null ? void 0 : re(n2);
  };
  var ie = p.TypeError;
  var ae = Object.defineProperty;
  var ce = function(e2, t2) {
    try {
      ae(p, e2, { value: t2, configurable: true, writable: true });
    } catch (n2) {
      p[e2] = t2;
    }
    return t2;
  };
  var se = p["__core-js_shared__"] || ce("__core-js_shared__", {});
  var ue = l(function(e2) {
    (e2.exports = function(e3, t2) {
      return se[e3] || (se[e3] = t2 !== void 0 ? t2 : {});
    })("versions", []).push({ version: "3.22.4", mode: "global", copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.22.4/LICENSE", source: "https://github.com/zloirock/core-js" });
  });
  var le = p.Object;
  var fe = function(e2) {
    return le(L(e2));
  };
  var de = R({}.hasOwnProperty);
  var he = Object.hasOwn || function(e2, t2) {
    return de(fe(e2), t2);
  };
  var pe = 0;
  var ye = Math.random();
  var ve = R(1 .toString);
  var me = function(e2) {
    return "Symbol(" + (e2 === void 0 ? "" : e2) + ")_" + ve(++pe + ye, 36);
  };
  var be = ue("wks");
  var ge = p.Symbol;
  var we = ge && ge.for;
  var Se = q ? ge : ge && ge.withoutSetter || me;
  var ke = function(e2) {
    if (!he(be, e2) || !M && typeof be[e2] != "string") {
      var t2 = "Symbol." + e2;
      M && he(ge, e2) ? be[e2] = ge[e2] : be[e2] = q && we ? we(t2) : Se(t2);
    }
    return be[e2];
  };
  var _e = p.TypeError;
  var Ie = ke("toPrimitive");
  var Te = function(e2, t2) {
    if (!A(e2) || $(e2))
      return e2;
    var n2, r2 = oe(e2, Ie);
    if (r2) {
      if (t2 === void 0 && (t2 = "default"), n2 = g(r2, e2, t2), !A(n2) || $(n2))
        return n2;
      throw _e("Can't convert object to primitive value");
    }
    return t2 === void 0 && (t2 = "number"), function(e3, t3) {
      var n3, r3;
      if (t3 === "string" && P(n3 = e3.toString) && !A(r3 = g(n3, e3)))
        return r3;
      if (P(n3 = e3.valueOf) && !A(r3 = g(n3, e3)))
        return r3;
      if (t3 !== "string" && P(n3 = e3.toString) && !A(r3 = g(n3, e3)))
        return r3;
      throw ie("Can't convert object to primitive value");
    }(e2, t2);
  };
  var Oe = function(e2) {
    var t2 = Te(e2, "string");
    return $(t2) ? t2 : t2 + "";
  };
  var xe = p.document;
  var Ce = A(xe) && A(xe.createElement);
  var Re = function(e2) {
    return Ce ? xe.createElement(e2) : {};
  };
  var Ee = !v && !y(function() {
    return Object.defineProperty(Re("div"), "a", { get: function() {
      return 7;
    } }).a != 7;
  });
  var je = Object.getOwnPropertyDescriptor;
  var Ke = { f: v ? je : function(e2, t2) {
    if (e2 = G(e2), t2 = Oe(t2), Ee)
      try {
        return je(e2, t2);
      } catch (e3) {
      }
    if (he(e2, t2))
      return I(!g(_.f, e2, t2), e2[t2]);
  } };
  var Ue = v && y(function() {
    return Object.defineProperty(function() {
    }, "prototype", { value: 42, writable: false }).prototype != 42;
  });
  var Fe = p.String;
  var We = p.TypeError;
  var Ze = function(e2) {
    if (A(e2))
      return e2;
    throw We(Fe(e2) + " is not an object");
  };
  var Le = p.TypeError;
  var Ge = Object.defineProperty;
  var Pe = Object.getOwnPropertyDescriptor;
  var Ae = { f: v ? Ue ? function(e2, t2, n2) {
    if (Ze(e2), t2 = Oe(t2), Ze(n2), typeof e2 == "function" && t2 === "prototype" && "value" in n2 && "writable" in n2 && !n2.writable) {
      var r2 = Pe(e2, t2);
      r2 && r2.writable && (e2[t2] = n2.value, n2 = { configurable: "configurable" in n2 ? n2.configurable : r2.configurable, enumerable: "enumerable" in n2 ? n2.enumerable : r2.enumerable, writable: false });
    }
    return Ge(e2, t2, n2);
  } : Ge : function(e2, t2, n2) {
    if (Ze(e2), t2 = Oe(t2), Ze(n2), Ee)
      try {
        return Ge(e2, t2, n2);
      } catch (e3) {
      }
    if ("get" in n2 || "set" in n2)
      throw Le("Accessors not supported");
    return "value" in n2 && (e2[t2] = n2.value), e2;
  } };
  var Xe = v ? function(e2, t2, n2) {
    return Ae.f(e2, t2, I(1, n2));
  } : function(e2, t2, n2) {
    return e2[t2] = n2, e2;
  };
  var Ve = Function.prototype;
  var Ne = v && Object.getOwnPropertyDescriptor;
  var Je = he(Ve, "name");
  var Ye = { EXISTS: Je, PROPER: Je && function() {
  }.name === "something", CONFIGURABLE: Je && (!v || v && Ne(Ve, "name").configurable) };
  var He = R(Function.toString);
  P(se.inspectSource) || (se.inspectSource = function(e2) {
    return He(e2);
  });
  var De;
  var Be;
  var ze;
  var Me = se.inspectSource;
  var qe = p.WeakMap;
  var Qe = P(qe) && /native code/.test(Me(qe));
  var $e = ue("keys");
  var et = function(e2) {
    return $e[e2] || ($e[e2] = me(e2));
  };
  var tt = {};
  var nt = p.TypeError;
  var rt = p.WeakMap;
  if (Qe || se.state) {
    ot = se.state || (se.state = new rt()), it = R(ot.get), at = R(ot.has), ct = R(ot.set);
    De = function(e2, t2) {
      if (at(ot, e2))
        throw new nt("Object already initialized");
      return t2.facade = e2, ct(ot, e2, t2), t2;
    }, Be = function(e2) {
      return it(ot, e2) || {};
    }, ze = function(e2) {
      return at(ot, e2);
    };
  } else {
    st = et("state");
    tt[st] = true, De = function(e2, t2) {
      if (he(e2, st))
        throw new nt("Object already initialized");
      return t2.facade = e2, Xe(e2, st, t2), t2;
    }, Be = function(e2) {
      return he(e2, st) ? e2[st] : {};
    }, ze = function(e2) {
      return he(e2, st);
    };
  }
  var ot;
  var it;
  var at;
  var ct;
  var st;
  var ut = { set: De, get: Be, has: ze, enforce: function(e2) {
    return ze(e2) ? Be(e2) : De(e2, {});
  }, getterFor: function(e2) {
    return function(t2) {
      var n2;
      if (!A(t2) || (n2 = Be(t2)).type !== e2)
        throw nt("Incompatible receiver, " + e2 + " required");
      return n2;
    };
  } };
  var lt = l(function(e2) {
    var t2 = Ae.f, n2 = Ye.CONFIGURABLE, r2 = ut.enforce, o2 = ut.get, i3 = !y(function() {
      return t2(function() {
      }, "length", { value: 8 }).length !== 8;
    }), a3 = String(String).split("String"), c2 = e2.exports = function(e3, o3, c3) {
      String(o3).slice(0, 7) === "Symbol(" && (o3 = "[" + String(o3).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), c3 && c3.getter && (o3 = "get " + o3), c3 && c3.setter && (o3 = "set " + o3), (!he(e3, "name") || n2 && e3.name !== o3) && t2(e3, "name", { value: o3, configurable: true }), i3 && c3 && he(c3, "arity") && e3.length !== c3.arity && t2(e3, "length", { value: c3.arity });
      var s2 = r2(e3);
      return he(s2, "source") || (s2.source = a3.join(typeof o3 == "string" ? o3 : "")), e3;
    };
    Function.prototype.toString = c2(function() {
      return P(this) && o2(this).source || Me(this);
    }, "toString");
  });
  var ft = function(e2, t2, n2, r2) {
    var o2 = !!r2 && !!r2.unsafe, i3 = !!r2 && !!r2.enumerable, a3 = !!r2 && !!r2.noTargetGet, c2 = r2 && r2.name !== void 0 ? r2.name : t2;
    return P(n2) && lt(n2, c2, r2), e2 === p ? (i3 ? e2[t2] = n2 : ce(t2, n2), e2) : (o2 ? !a3 && e2[t2] && (i3 = true) : delete e2[t2], i3 ? e2[t2] = n2 : Xe(e2, t2, n2), e2);
  };
  var dt = Math.ceil;
  var ht = Math.floor;
  var pt = function(e2) {
    var t2 = +e2;
    return t2 != t2 || t2 === 0 ? 0 : (t2 > 0 ? ht : dt)(t2);
  };
  var yt = Math.max;
  var vt = Math.min;
  var mt = function(e2, t2) {
    var n2 = pt(e2);
    return n2 < 0 ? yt(n2 + t2, 0) : vt(n2, t2);
  };
  var bt = Math.min;
  var gt = function(e2) {
    return e2 > 0 ? bt(pt(e2), 9007199254740991) : 0;
  };
  var wt = function(e2) {
    return gt(e2.length);
  };
  var St = function(e2) {
    return function(t2, n2, r2) {
      var o2, i3 = G(t2), a3 = wt(i3), c2 = mt(r2, a3);
      if (e2 && n2 != n2) {
        for (; a3 > c2; )
          if ((o2 = i3[c2++]) != o2)
            return true;
      } else
        for (; a3 > c2; c2++)
          if ((e2 || c2 in i3) && i3[c2] === n2)
            return e2 || c2 || 0;
      return !e2 && -1;
    };
  };
  var kt = { includes: St(true), indexOf: St(false) };
  var _t = kt.indexOf;
  var It = R([].push);
  var Tt = function(e2, t2) {
    var n2, r2 = G(e2), o2 = 0, i3 = [];
    for (n2 in r2)
      !he(tt, n2) && he(r2, n2) && It(i3, n2);
    for (; t2.length > o2; )
      he(r2, n2 = t2[o2++]) && (~_t(i3, n2) || It(i3, n2));
    return i3;
  };
  var Ot = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  var xt = Ot.concat("length", "prototype");
  var Ct = { f: Object.getOwnPropertyNames || function(e2) {
    return Tt(e2, xt);
  } };
  var Rt = { f: Object.getOwnPropertySymbols };
  var Et = R([].concat);
  var jt = V("Reflect", "ownKeys") || function(e2) {
    var t2 = Ct.f(Ze(e2)), n2 = Rt.f;
    return n2 ? Et(t2, n2(e2)) : t2;
  };
  var Kt = function(e2, t2, n2) {
    for (var r2 = jt(t2), o2 = Ae.f, i3 = Ke.f, a3 = 0; a3 < r2.length; a3++) {
      var c2 = r2[a3];
      he(e2, c2) || n2 && he(n2, c2) || o2(e2, c2, i3(t2, c2));
    }
  };
  var Ut = /#|\.prototype\./;
  var Ft = function(e2, t2) {
    var n2 = Zt[Wt(e2)];
    return n2 == Gt || n2 != Lt && (P(t2) ? y(t2) : !!t2);
  };
  var Wt = Ft.normalize = function(e2) {
    return String(e2).replace(Ut, ".").toLowerCase();
  };
  var Zt = Ft.data = {};
  var Lt = Ft.NATIVE = "N";
  var Gt = Ft.POLYFILL = "P";
  var Pt = Ft;
  var At = Ke.f;
  var Xt = function(e2, t2) {
    var n2, r2, o2, i3, a3, c2 = e2.target, s2 = e2.global, u3 = e2.stat;
    if (n2 = s2 ? p : u3 ? p[c2] || ce(c2, {}) : (p[c2] || {}).prototype)
      for (r2 in t2) {
        if (i3 = t2[r2], o2 = e2.noTargetGet ? (a3 = At(n2, r2)) && a3.value : n2[r2], !Pt(s2 ? r2 : c2 + (u3 ? "." : "#") + r2, e2.forced) && o2 !== void 0) {
          if (typeof i3 == typeof o2)
            continue;
          Kt(i3, o2);
        }
        (e2.sham || o2 && o2.sham) && Xe(i3, "sham", true), ft(n2, r2, i3, e2);
      }
  };
  var Vt = {};
  Vt[ke("toStringTag")] = "z";
  var Nt;
  var Jt = String(Vt) === "[object z]";
  var Yt = ke("toStringTag");
  var Ht = p.Object;
  var Dt = K(function() {
    return arguments;
  }()) == "Arguments";
  var Bt = Jt ? K : function(e2) {
    var t2, n2, r2;
    return e2 === void 0 ? "Undefined" : e2 === null ? "Null" : typeof (n2 = function(e3, t3) {
      try {
        return e3[t3];
      } catch (e4) {
      }
    }(t2 = Ht(e2), Yt)) == "string" ? n2 : Dt ? K(t2) : (r2 = K(t2)) == "Object" && P(t2.callee) ? "Arguments" : r2;
  };
  var zt = p.String;
  var Mt = function(e2) {
    if (Bt(e2) === "Symbol")
      throw TypeError("Cannot convert a Symbol value to a string");
    return zt(e2);
  };
  var qt = ke("match");
  var Qt = p.TypeError;
  var $t = function(e2) {
    if (function(e3) {
      var t2;
      return A(e3) && ((t2 = e3[qt]) !== void 0 ? !!t2 : K(e3) == "RegExp");
    }(e2))
      throw Qt("The method doesn't accept regular expressions");
    return e2;
  };
  var en = ke("match");
  var tn = function(e2) {
    var t2 = /./;
    try {
      "/./"[e2](t2);
    } catch (n2) {
      try {
        return t2[en] = false, "/./"[e2](t2);
      } catch (e3) {
      }
    }
    return false;
  };
  var nn = Ke.f;
  var rn = R("".startsWith);
  var on = R("".slice);
  var an = Math.min;
  var cn = tn("startsWith");
  var sn = !(cn || (Nt = nn(String.prototype, "startsWith"), !Nt || Nt.writable));
  Xt({ target: "String", proto: true, forced: !sn && !cn }, { startsWith: function(e2) {
    var t2 = Mt(L(this));
    $t(e2);
    var n2 = gt(an(arguments.length > 1 ? arguments[1] : void 0, t2.length)), r2 = Mt(e2);
    return rn ? rn(t2, r2, n2) : on(t2, n2, n2 + r2.length) === r2;
  } });
  var un = function(e2, t2) {
    return R(p[e2].prototype[t2]);
  };
  un("String", "startsWith");
  var ln = Array.isArray || function(e2) {
    return K(e2) == "Array";
  };
  var fn = function(e2, t2, n2) {
    var r2 = Oe(t2);
    r2 in e2 ? Ae.f(e2, r2, I(0, n2)) : e2[r2] = n2;
  };
  var dn = function() {
  };
  var hn = [];
  var pn = V("Reflect", "construct");
  var yn = /^\s*(?:class|function)\b/;
  var vn = R(yn.exec);
  var mn = !yn.exec(dn);
  var bn = function(e2) {
    if (!P(e2))
      return false;
    try {
      return pn(dn, hn, e2), true;
    } catch (e3) {
      return false;
    }
  };
  var gn = function(e2) {
    if (!P(e2))
      return false;
    switch (Bt(e2)) {
      case "AsyncFunction":
      case "GeneratorFunction":
      case "AsyncGeneratorFunction":
        return false;
    }
    try {
      return mn || !!vn(yn, Me(e2));
    } catch (e3) {
      return true;
    }
  };
  gn.sham = true;
  var wn;
  var Sn = !pn || y(function() {
    var e2;
    return bn(bn.call) || !bn(Object) || !bn(function() {
      e2 = true;
    }) || e2;
  }) ? gn : bn;
  var kn = ke("species");
  var _n = p.Array;
  var In = function(e2, t2) {
    return new (function(e3) {
      var t3;
      return ln(e3) && (t3 = e3.constructor, (Sn(t3) && (t3 === _n || ln(t3.prototype)) || A(t3) && (t3 = t3[kn]) === null) && (t3 = void 0)), t3 === void 0 ? _n : t3;
    }(e2))(t2 === 0 ? 0 : t2);
  };
  var Tn = ke("species");
  var On = ke("isConcatSpreadable");
  var xn = p.TypeError;
  var Cn = z >= 51 || !y(function() {
    var e2 = [];
    return e2[On] = false, e2.concat()[0] !== e2;
  });
  var Rn = (wn = "concat", z >= 51 || !y(function() {
    var e2 = [];
    return (e2.constructor = {})[Tn] = function() {
      return { foo: 1 };
    }, e2[wn](Boolean).foo !== 1;
  }));
  var En = function(e2) {
    if (!A(e2))
      return false;
    var t2 = e2[On];
    return t2 !== void 0 ? !!t2 : ln(e2);
  };
  Xt({ target: "Array", proto: true, arity: 1, forced: !Cn || !Rn }, { concat: function(e2) {
    var t2, n2, r2, o2, i3, a3 = fe(this), c2 = In(a3, 0), s2 = 0;
    for (t2 = -1, r2 = arguments.length; t2 < r2; t2++)
      if (En(i3 = t2 === -1 ? a3 : arguments[t2])) {
        if (s2 + (o2 = wt(i3)) > 9007199254740991)
          throw xn("Maximum allowed index exceeded");
        for (n2 = 0; n2 < o2; n2++, s2++)
          n2 in i3 && fn(c2, s2, i3[n2]);
      } else {
        if (s2 >= 9007199254740991)
          throw xn("Maximum allowed index exceeded");
        fn(c2, s2++, i3);
      }
    return c2.length = s2, c2;
  } });
  var jn = Jt ? {}.toString : function() {
    return "[object " + Bt(this) + "]";
  };
  Jt || ft(Object.prototype, "toString", jn, { unsafe: true });
  var Kn;
  var Un = Object.keys || function(e2) {
    return Tt(e2, Ot);
  };
  var Fn = v && !Ue ? Object.defineProperties : function(e2, t2) {
    Ze(e2);
    for (var n2, r2 = G(t2), o2 = Un(t2), i3 = o2.length, a3 = 0; i3 > a3; )
      Ae.f(e2, n2 = o2[a3++], r2[n2]);
    return e2;
  };
  var Wn = { f: Fn };
  var Zn = V("document", "documentElement");
  var Ln = et("IE_PROTO");
  var Gn = function() {
  };
  var Pn = function(e2) {
    return "<script>" + e2 + "<\/script>";
  };
  var An = function(e2) {
    e2.write(Pn("")), e2.close();
    var t2 = e2.parentWindow.Object;
    return e2 = null, t2;
  };
  var Xn = function() {
    try {
      Kn = new ActiveXObject("htmlfile");
    } catch (e3) {
    }
    var e2, t2;
    Xn = typeof document != "undefined" ? document.domain && Kn ? An(Kn) : ((t2 = Re("iframe")).style.display = "none", Zn.appendChild(t2), t2.src = String("javascript:"), (e2 = t2.contentWindow.document).open(), e2.write(Pn("document.F=Object")), e2.close(), e2.F) : An(Kn);
    for (var n2 = Ot.length; n2--; )
      delete Xn.prototype[Ot[n2]];
    return Xn();
  };
  tt[Ln] = true;
  var Vn = Object.create || function(e2, t2) {
    var n2;
    return e2 !== null ? (Gn.prototype = Ze(e2), n2 = new Gn(), Gn.prototype = null, n2[Ln] = e2) : n2 = Xn(), t2 === void 0 ? n2 : Wn.f(n2, t2);
  };
  var Nn = p.Array;
  var Jn = Math.max;
  var Yn = Ct.f;
  var Hn = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var Dn = function(e2) {
    try {
      return Yn(e2);
    } catch (e3) {
      return function(e4, t2, n2) {
        for (var r2 = wt(e4), o2 = mt(t2, r2), i3 = mt(n2 === void 0 ? r2 : n2, r2), a3 = Nn(Jn(i3 - o2, 0)), c2 = 0; o2 < i3; o2++, c2++)
          fn(a3, c2, e4[o2]);
        return a3.length = c2, a3;
      }(Hn);
    }
  };
  var Bn = { f: function(e2) {
    return Hn && K(e2) == "Window" ? Dn(e2) : Yn(G(e2));
  } };
  var zn = { f: ke };
  var Mn = p;
  var qn = Ae.f;
  var Qn = function(e2) {
    var t2 = Mn.Symbol || (Mn.Symbol = {});
    he(t2, e2) || qn(t2, e2, { value: zn.f(e2) });
  };
  var $n = function() {
    var e2 = V("Symbol"), t2 = e2 && e2.prototype, n2 = t2 && t2.valueOf, r2 = ke("toPrimitive");
    t2 && !t2[r2] && ft(t2, r2, function(e3) {
      return g(n2, this);
    }, { arity: 1 });
  };
  var er = Ae.f;
  var tr = ke("toStringTag");
  var nr = function(e2, t2, n2) {
    e2 && !n2 && (e2 = e2.prototype), e2 && !he(e2, tr) && er(e2, tr, { configurable: true, value: t2 });
  };
  var rr = R(R.bind);
  var or = function(e2, t2) {
    return re(e2), t2 === void 0 ? e2 : m ? rr(e2, t2) : function() {
      return e2.apply(t2, arguments);
    };
  };
  var ir = R([].push);
  var ar = function(e2) {
    var t2 = e2 == 1, n2 = e2 == 2, r2 = e2 == 3, o2 = e2 == 4, i3 = e2 == 6, a3 = e2 == 7, c2 = e2 == 5 || i3;
    return function(s2, u3, l2, f2) {
      for (var d2, h7, p3 = fe(s2), y2 = W(p3), v2 = or(u3, l2), m2 = wt(y2), b3 = 0, g2 = f2 || In, w2 = t2 ? g2(s2, m2) : n2 || a3 ? g2(s2, 0) : void 0; m2 > b3; b3++)
        if ((c2 || b3 in y2) && (h7 = v2(d2 = y2[b3], b3, p3), e2))
          if (t2)
            w2[b3] = h7;
          else if (h7)
            switch (e2) {
              case 3:
                return true;
              case 5:
                return d2;
              case 6:
                return b3;
              case 2:
                ir(w2, d2);
            }
          else
            switch (e2) {
              case 4:
                return false;
              case 7:
                ir(w2, d2);
            }
      return i3 ? -1 : r2 || o2 ? o2 : w2;
    };
  };
  var cr = { forEach: ar(0), map: ar(1), filter: ar(2), some: ar(3), every: ar(4), find: ar(5), findIndex: ar(6), filterReject: ar(7) }.forEach;
  var sr = et("hidden");
  var ur = ut.set;
  var lr = ut.getterFor("Symbol");
  var fr = Object.prototype;
  var dr = p.Symbol;
  var hr = dr && dr.prototype;
  var pr = p.TypeError;
  var yr = p.QObject;
  var vr = Ke.f;
  var mr = Ae.f;
  var br = Bn.f;
  var gr = _.f;
  var wr = R([].push);
  var Sr = ue("symbols");
  var kr = ue("op-symbols");
  var _r = ue("wks");
  var Ir = !yr || !yr.prototype || !yr.prototype.findChild;
  var Tr = v && y(function() {
    return Vn(mr({}, "a", { get: function() {
      return mr(this, "a", { value: 7 }).a;
    } })).a != 7;
  }) ? function(e2, t2, n2) {
    var r2 = vr(fr, t2);
    r2 && delete fr[t2], mr(e2, t2, n2), r2 && e2 !== fr && mr(fr, t2, r2);
  } : mr;
  var Or = function(e2, t2) {
    var n2 = Sr[e2] = Vn(hr);
    return ur(n2, { type: "Symbol", tag: e2, description: t2 }), v || (n2.description = t2), n2;
  };
  var xr = function(e2, t2, n2) {
    e2 === fr && xr(kr, t2, n2), Ze(e2);
    var r2 = Oe(t2);
    return Ze(n2), he(Sr, r2) ? (n2.enumerable ? (he(e2, sr) && e2[sr][r2] && (e2[sr][r2] = false), n2 = Vn(n2, { enumerable: I(0, false) })) : (he(e2, sr) || mr(e2, sr, I(1, {})), e2[sr][r2] = true), Tr(e2, r2, n2)) : mr(e2, r2, n2);
  };
  var Cr = function(e2, t2) {
    Ze(e2);
    var n2 = G(t2), r2 = Un(n2).concat(Kr(n2));
    return cr(r2, function(t3) {
      v && !g(Rr, n2, t3) || xr(e2, t3, n2[t3]);
    }), e2;
  };
  var Rr = function(e2) {
    var t2 = Oe(e2), n2 = g(gr, this, t2);
    return !(this === fr && he(Sr, t2) && !he(kr, t2)) && (!(n2 || !he(this, t2) || !he(Sr, t2) || he(this, sr) && this[sr][t2]) || n2);
  };
  var Er = function(e2, t2) {
    var n2 = G(e2), r2 = Oe(t2);
    if (n2 !== fr || !he(Sr, r2) || he(kr, r2)) {
      var o2 = vr(n2, r2);
      return !o2 || !he(Sr, r2) || he(n2, sr) && n2[sr][r2] || (o2.enumerable = true), o2;
    }
  };
  var jr = function(e2) {
    var t2 = br(G(e2)), n2 = [];
    return cr(t2, function(e3) {
      he(Sr, e3) || he(tt, e3) || wr(n2, e3);
    }), n2;
  };
  var Kr = function(e2) {
    var t2 = e2 === fr, n2 = br(t2 ? kr : G(e2)), r2 = [];
    return cr(n2, function(e3) {
      !he(Sr, e3) || t2 && !he(fr, e3) || wr(r2, Sr[e3]);
    }), r2;
  };
  M || (hr = (dr = function() {
    if (N(hr, this))
      throw pr("Symbol is not a constructor");
    var e2 = arguments.length && arguments[0] !== void 0 ? Mt(arguments[0]) : void 0, t2 = me(e2), n2 = function(e3) {
      this === fr && g(n2, kr, e3), he(this, sr) && he(this[sr], t2) && (this[sr][t2] = false), Tr(this, t2, I(1, e3));
    };
    return v && Ir && Tr(fr, t2, { configurable: true, set: n2 }), Or(t2, e2);
  }).prototype, ft(hr, "toString", function() {
    return lr(this).tag;
  }), ft(dr, "withoutSetter", function(e2) {
    return Or(me(e2), e2);
  }), _.f = Rr, Ae.f = xr, Wn.f = Cr, Ke.f = Er, Ct.f = Bn.f = jr, Rt.f = Kr, zn.f = function(e2) {
    return Or(ke(e2), e2);
  }, v && (mr(hr, "description", { configurable: true, get: function() {
    return lr(this).description;
  } }), ft(fr, "propertyIsEnumerable", Rr, { unsafe: true }))), Xt({ global: true, wrap: true, forced: !M, sham: !M }, { Symbol: dr }), cr(Un(_r), function(e2) {
    Qn(e2);
  }), Xt({ target: "Symbol", stat: true, forced: !M }, { useSetter: function() {
    Ir = true;
  }, useSimple: function() {
    Ir = false;
  } }), Xt({ target: "Object", stat: true, forced: !M, sham: !v }, { create: function(e2, t2) {
    return t2 === void 0 ? Vn(e2) : Cr(Vn(e2), t2);
  }, defineProperty: xr, defineProperties: Cr, getOwnPropertyDescriptor: Er }), Xt({ target: "Object", stat: true, forced: !M }, { getOwnPropertyNames: jr }), $n(), nr(dr, "Symbol"), tt[sr] = true;
  var Ur = M && !!Symbol.for && !!Symbol.keyFor;
  var Fr = ue("string-to-symbol-registry");
  var Wr = ue("symbol-to-string-registry");
  Xt({ target: "Symbol", stat: true, forced: !Ur }, { for: function(e2) {
    var t2 = Mt(e2);
    if (he(Fr, t2))
      return Fr[t2];
    var n2 = V("Symbol")(t2);
    return Fr[t2] = n2, Wr[n2] = t2, n2;
  } });
  var Zr = ue("symbol-to-string-registry");
  Xt({ target: "Symbol", stat: true, forced: !Ur }, { keyFor: function(e2) {
    if (!$(e2))
      throw TypeError(te(e2) + " is not a symbol");
    if (he(Zr, e2))
      return Zr[e2];
  } });
  var Lr = Function.prototype;
  var Gr = Lr.apply;
  var Pr = Lr.call;
  var Ar = typeof Reflect == "object" && Reflect.apply || (m ? Pr.bind(Gr) : function() {
    return Pr.apply(Gr, arguments);
  });
  var Xr = R([].slice);
  var Vr = V("JSON", "stringify");
  var Nr = R(/./.exec);
  var Jr = R("".charAt);
  var Yr = R("".charCodeAt);
  var Hr = R("".replace);
  var Dr = R(1 .toString);
  var Br = /[\uD800-\uDFFF]/g;
  var zr = /^[\uD800-\uDBFF]$/;
  var Mr = /^[\uDC00-\uDFFF]$/;
  var qr = !M || y(function() {
    var e2 = V("Symbol")();
    return Vr([e2]) != "[null]" || Vr({ a: e2 }) != "{}" || Vr(Object(e2)) != "{}";
  });
  var Qr = y(function() {
    return Vr("\uDF06\uD834") !== '"\\udf06\\ud834"' || Vr("\uDEAD") !== '"\\udead"';
  });
  var $r = function(e2, t2) {
    var n2 = Xr(arguments), r2 = t2;
    if ((A(t2) || e2 !== void 0) && !$(e2))
      return ln(t2) || (t2 = function(e3, t3) {
        if (P(r2) && (t3 = g(r2, this, e3, t3)), !$(t3))
          return t3;
      }), n2[1] = t2, Ar(Vr, null, n2);
  };
  var eo = function(e2, t2, n2) {
    var r2 = Jr(n2, t2 - 1), o2 = Jr(n2, t2 + 1);
    return Nr(zr, e2) && !Nr(Mr, o2) || Nr(Mr, e2) && !Nr(zr, r2) ? "\\u" + Dr(Yr(e2, 0), 16) : e2;
  };
  Vr && Xt({ target: "JSON", stat: true, arity: 3, forced: qr || Qr }, { stringify: function(e2, t2, n2) {
    var r2 = Xr(arguments), o2 = Ar(qr ? $r : Vr, null, r2);
    return Qr && typeof o2 == "string" ? Hr(o2, Br, eo) : o2;
  } });
  var to = !M || y(function() {
    Rt.f(1);
  });
  Xt({ target: "Object", stat: true, forced: to }, { getOwnPropertySymbols: function(e2) {
    var t2 = Rt.f;
    return t2 ? t2(fe(e2)) : [];
  } }), Qn("asyncIterator");
  var no = Ae.f;
  var ro = p.Symbol;
  var oo = ro && ro.prototype;
  if (v && P(ro) && (!("description" in oo) || ro().description !== void 0)) {
    io = {}, ao = function() {
      var e2 = arguments.length < 1 || arguments[0] === void 0 ? void 0 : Mt(arguments[0]), t2 = N(oo, this) ? new ro(e2) : e2 === void 0 ? ro() : ro(e2);
      return e2 === "" && (io[t2] = true), t2;
    };
    Kt(ao, ro), ao.prototype = oo, oo.constructor = ao;
    co = String(ro("test")) == "Symbol(test)", so = R(oo.toString), uo = R(oo.valueOf), lo = /^Symbol\((.*)\)[^)]+$/, fo = R("".replace), ho = R("".slice);
    no(oo, "description", { configurable: true, get: function() {
      var e2 = uo(this), t2 = so(e2);
      if (he(io, e2))
        return "";
      var n2 = co ? ho(t2, 7, -1) : fo(t2, lo, "$1");
      return n2 === "" ? void 0 : n2;
    } }), Xt({ global: true, forced: true }, { Symbol: ao });
  }
  var io;
  var ao;
  var co;
  var so;
  var uo;
  var lo;
  var fo;
  var ho;
  Qn("hasInstance"), Qn("isConcatSpreadable"), Qn("iterator"), Qn("match"), Qn("matchAll"), Qn("replace"), Qn("search"), Qn("species"), Qn("split"), Qn("toPrimitive"), $n(), Qn("toStringTag"), nr(V("Symbol"), "Symbol"), Qn("unscopables"), nr(p.JSON, "JSON", true), nr(Math, "Math", true), Xt({ global: true }, { Reflect: {} }), nr(p.Reflect, "Reflect", true), Mn.Symbol;
  var po;
  var yo;
  var vo;
  var mo = R("".charAt);
  var bo = R("".charCodeAt);
  var go = R("".slice);
  var wo = function(e2) {
    return function(t2, n2) {
      var r2, o2, i3 = Mt(L(t2)), a3 = pt(n2), c2 = i3.length;
      return a3 < 0 || a3 >= c2 ? e2 ? "" : void 0 : (r2 = bo(i3, a3)) < 55296 || r2 > 56319 || a3 + 1 === c2 || (o2 = bo(i3, a3 + 1)) < 56320 || o2 > 57343 ? e2 ? mo(i3, a3) : r2 : e2 ? go(i3, a3, a3 + 2) : o2 - 56320 + (r2 - 55296 << 10) + 65536;
    };
  };
  var So = { codeAt: wo(false), charAt: wo(true) };
  var ko = !y(function() {
    function e2() {
    }
    return e2.prototype.constructor = null, Object.getPrototypeOf(new e2()) !== e2.prototype;
  });
  var _o = et("IE_PROTO");
  var Io = p.Object;
  var To = Io.prototype;
  var Oo = ko ? Io.getPrototypeOf : function(e2) {
    var t2 = fe(e2);
    if (he(t2, _o))
      return t2[_o];
    var n2 = t2.constructor;
    return P(n2) && t2 instanceof n2 ? n2.prototype : t2 instanceof Io ? To : null;
  };
  var xo = ke("iterator");
  var Co = false;
  [].keys && ("next" in (vo = [].keys()) ? (yo = Oo(Oo(vo))) !== Object.prototype && (po = yo) : Co = true);
  var Ro = po == null || y(function() {
    var e2 = {};
    return po[xo].call(e2) !== e2;
  });
  Ro && (po = {}), P(po[xo]) || ft(po, xo, function() {
    return this;
  });
  var Eo = { IteratorPrototype: po, BUGGY_SAFARI_ITERATORS: Co };
  var jo = {};
  var Ko = Eo.IteratorPrototype;
  var Uo = function() {
    return this;
  };
  var Fo = p.String;
  var Wo = p.TypeError;
  var Zo = Object.setPrototypeOf || ("__proto__" in {} ? function() {
    var e2, t2 = false, n2 = {};
    try {
      (e2 = R(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(n2, []), t2 = n2 instanceof Array;
    } catch (e3) {
    }
    return function(n3, r2) {
      return Ze(n3), function(e3) {
        if (typeof e3 == "object" || P(e3))
          return e3;
        throw Wo("Can't set " + Fo(e3) + " as a prototype");
      }(r2), t2 ? e2(n3, r2) : n3.__proto__ = r2, n3;
    };
  }() : void 0);
  var Lo = Ye.PROPER;
  var Go = Ye.CONFIGURABLE;
  var Po = Eo.IteratorPrototype;
  var Ao = Eo.BUGGY_SAFARI_ITERATORS;
  var Xo = ke("iterator");
  var Vo = function() {
    return this;
  };
  var No = function(e2, t2, n2, r2, o2, i3, a3) {
    !function(e3, t3, n3, r3) {
      var o3 = t3 + " Iterator";
      e3.prototype = Vn(Ko, { next: I(+!r3, n3) }), nr(e3, o3, false), jo[o3] = Uo;
    }(n2, t2, r2);
    var c2, s2, u3, l2 = function(e3) {
      if (e3 === o2 && y2)
        return y2;
      if (!Ao && e3 in h7)
        return h7[e3];
      switch (e3) {
        case "keys":
        case "values":
        case "entries":
          return function() {
            return new n2(this, e3);
          };
      }
      return function() {
        return new n2(this);
      };
    }, f2 = t2 + " Iterator", d2 = false, h7 = e2.prototype, p3 = h7[Xo] || h7["@@iterator"] || o2 && h7[o2], y2 = !Ao && p3 || l2(o2), v2 = t2 == "Array" && h7.entries || p3;
    if (v2 && (c2 = Oo(v2.call(new e2()))) !== Object.prototype && c2.next && (Oo(c2) !== Po && (Zo ? Zo(c2, Po) : P(c2[Xo]) || ft(c2, Xo, Vo)), nr(c2, f2, true)), Lo && o2 == "values" && p3 && p3.name !== "values" && (Go ? Xe(h7, "name", "values") : (d2 = true, y2 = function() {
      return g(p3, this);
    })), o2)
      if (s2 = { values: l2("values"), keys: i3 ? y2 : l2("keys"), entries: l2("entries") }, a3)
        for (u3 in s2)
          (Ao || d2 || !(u3 in h7)) && ft(h7, u3, s2[u3]);
      else
        Xt({ target: t2, proto: true, forced: Ao || d2 }, s2);
    return h7[Xo] !== y2 && ft(h7, Xo, y2, { name: o2 }), jo[t2] = y2, s2;
  };
  var Jo = So.charAt;
  var Yo = ut.set;
  var Ho = ut.getterFor("String Iterator");
  No(String, "String", function(e2) {
    Yo(this, { type: "String Iterator", string: Mt(e2), index: 0 });
  }, function() {
    var e2, t2 = Ho(this), n2 = t2.string, r2 = t2.index;
    return r2 >= n2.length ? { value: void 0, done: true } : (e2 = Jo(n2, r2), t2.index += e2.length, { value: e2, done: false });
  });
  var Do = function(e2, t2, n2) {
    var r2, o2;
    Ze(e2);
    try {
      if (!(r2 = oe(e2, "return"))) {
        if (t2 === "throw")
          throw n2;
        return n2;
      }
      r2 = g(r2, e2);
    } catch (e3) {
      o2 = true, r2 = e3;
    }
    if (t2 === "throw")
      throw n2;
    if (o2)
      throw r2;
    return Ze(r2), n2;
  };
  var Bo = function(e2, t2, n2, r2) {
    try {
      return r2 ? t2(Ze(n2)[0], n2[1]) : t2(n2);
    } catch (t3) {
      Do(e2, "throw", t3);
    }
  };
  var zo = ke("iterator");
  var Mo = Array.prototype;
  var qo = function(e2) {
    return e2 !== void 0 && (jo.Array === e2 || Mo[zo] === e2);
  };
  var Qo = ke("iterator");
  var $o = function(e2) {
    if (e2 != null)
      return oe(e2, Qo) || oe(e2, "@@iterator") || jo[Bt(e2)];
  };
  var ei = p.TypeError;
  var ti = function(e2, t2) {
    var n2 = arguments.length < 2 ? $o(e2) : t2;
    if (re(n2))
      return Ze(g(n2, e2));
    throw ei(te(e2) + " is not iterable");
  };
  var ni = p.Array;
  var ri = ke("iterator");
  var oi = false;
  try {
    ii = 0, ai = { next: function() {
      return { done: !!ii++ };
    }, return: function() {
      oi = true;
    } };
    ai[ri] = function() {
      return this;
    }, Array.from(ai, function() {
      throw 2;
    });
  } catch (e2) {
  }
  var ii;
  var ai;
  var ci = function(e2, t2) {
    if (!t2 && !oi)
      return false;
    var n2 = false;
    try {
      var r2 = {};
      r2[ri] = function() {
        return { next: function() {
          return { done: n2 = true };
        } };
      }, e2(r2);
    } catch (e3) {
    }
    return n2;
  };
  var si = !ci(function(e2) {
    Array.from(e2);
  });
  Xt({ target: "Array", stat: true, forced: si }, { from: function(e2) {
    var t2 = fe(e2), n2 = Sn(this), r2 = arguments.length, o2 = r2 > 1 ? arguments[1] : void 0, i3 = o2 !== void 0;
    i3 && (o2 = or(o2, r2 > 2 ? arguments[2] : void 0));
    var a3, c2, s2, u3, l2, f2, d2 = $o(t2), h7 = 0;
    if (!d2 || this == ni && qo(d2))
      for (a3 = wt(t2), c2 = n2 ? new this(a3) : ni(a3); a3 > h7; h7++)
        f2 = i3 ? o2(t2[h7], h7) : t2[h7], fn(c2, h7, f2);
    else
      for (l2 = (u3 = ti(t2, d2)).next, c2 = n2 ? new this() : []; !(s2 = g(l2, u3)).done; h7++)
        f2 = i3 ? Bo(u3, o2, [s2.value, h7], true) : s2.value, fn(c2, h7, f2);
    return c2.length = h7, c2;
  } }), Mn.Array.from;
  var ui;
  var li;
  var fi;
  var di = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined";
  var hi = Ae.f;
  var pi = p.Int8Array;
  var yi = pi && pi.prototype;
  var vi = p.Uint8ClampedArray;
  var mi = vi && vi.prototype;
  var bi = pi && Oo(pi);
  var gi = yi && Oo(yi);
  var wi = Object.prototype;
  var Si = p.TypeError;
  var ki = ke("toStringTag");
  var _i = me("TYPED_ARRAY_TAG");
  var Ii = me("TYPED_ARRAY_CONSTRUCTOR");
  var Ti = di && !!Zo && Bt(p.opera) !== "Opera";
  var Oi = false;
  var xi = { Int8Array: 1, Uint8Array: 1, Uint8ClampedArray: 1, Int16Array: 2, Uint16Array: 2, Int32Array: 4, Uint32Array: 4, Float32Array: 4, Float64Array: 8 };
  var Ci = { BigInt64Array: 8, BigUint64Array: 8 };
  var Ri = function(e2) {
    if (!A(e2))
      return false;
    var t2 = Bt(e2);
    return he(xi, t2) || he(Ci, t2);
  };
  for (ui in xi)
    (fi = (li = p[ui]) && li.prototype) ? Xe(fi, Ii, li) : Ti = false;
  for (ui in Ci)
    (fi = (li = p[ui]) && li.prototype) && Xe(fi, Ii, li);
  if ((!Ti || !P(bi) || bi === Function.prototype) && (bi = function() {
    throw Si("Incorrect invocation");
  }, Ti))
    for (ui in xi)
      p[ui] && Zo(p[ui], bi);
  if ((!Ti || !gi || gi === wi) && (gi = bi.prototype, Ti))
    for (ui in xi)
      p[ui] && Zo(p[ui].prototype, gi);
  if (Ti && Oo(mi) !== gi && Zo(mi, gi), v && !he(gi, ki))
    for (ui in Oi = true, hi(gi, ki, { get: function() {
      return A(this) ? this[_i] : void 0;
    } }), xi)
      p[ui] && Xe(p[ui], _i, ui);
  var Ei = { NATIVE_ARRAY_BUFFER_VIEWS: Ti, TYPED_ARRAY_CONSTRUCTOR: Ii, TYPED_ARRAY_TAG: Oi && _i, aTypedArray: function(e2) {
    if (Ri(e2))
      return e2;
    throw Si("Target is not a typed array");
  }, aTypedArrayConstructor: function(e2) {
    if (P(e2) && (!Zo || N(bi, e2)))
      return e2;
    throw Si(te(e2) + " is not a typed array constructor");
  }, exportTypedArrayMethod: function(e2, t2, n2, r2) {
    if (v) {
      if (n2)
        for (var o2 in xi) {
          var i3 = p[o2];
          if (i3 && he(i3.prototype, e2))
            try {
              delete i3.prototype[e2];
            } catch (n3) {
              try {
                i3.prototype[e2] = t2;
              } catch (e3) {
              }
            }
        }
      gi[e2] && !n2 || ft(gi, e2, n2 ? t2 : Ti && yi[e2] || t2, r2);
    }
  }, exportTypedArrayStaticMethod: function(e2, t2, n2) {
    var r2, o2;
    if (v) {
      if (Zo) {
        if (n2) {
          for (r2 in xi)
            if ((o2 = p[r2]) && he(o2, e2))
              try {
                delete o2[e2];
              } catch (e3) {
              }
        }
        if (bi[e2] && !n2)
          return;
        try {
          return ft(bi, e2, n2 ? t2 : Ti && bi[e2] || t2);
        } catch (e3) {
        }
      }
      for (r2 in xi)
        !(o2 = p[r2]) || o2[e2] && !n2 || ft(o2, e2, t2);
    }
  }, isView: function(e2) {
    if (!A(e2))
      return false;
    var t2 = Bt(e2);
    return t2 === "DataView" || he(xi, t2) || he(Ci, t2);
  }, isTypedArray: Ri, TypedArray: bi, TypedArrayPrototype: gi };
  var ji = p.TypeError;
  var Ki = ke("species");
  var Ui = function(e2, t2) {
    var n2, r2 = Ze(e2).constructor;
    return r2 === void 0 || (n2 = Ze(r2)[Ki]) == null ? t2 : function(e3) {
      if (Sn(e3))
        return e3;
      throw ji(te(e3) + " is not a constructor");
    }(n2);
  };
  var Fi = Ei.TYPED_ARRAY_CONSTRUCTOR;
  var Wi = Ei.aTypedArrayConstructor;
  var Zi = Ei.aTypedArray;
  (0, Ei.exportTypedArrayMethod)("slice", function(e2, t2) {
    for (var n2, r2 = Xr(Zi(this), e2, t2), o2 = Wi(Ui(n2 = this, n2[Fi])), i3 = 0, a3 = r2.length, c2 = new o2(a3); a3 > i3; )
      c2[i3] = r2[i3++];
    return c2;
  }, y(function() {
    new Int8Array(1).slice();
  }));
  var Li = ke("unscopables");
  var Gi = Array.prototype;
  Gi[Li] == null && Ae.f(Gi, Li, { configurable: true, value: Vn(null) });
  var Pi = function(e2) {
    Gi[Li][e2] = true;
  };
  var Ai = kt.includes;
  var Xi = y(function() {
    return !Array(1).includes();
  });
  Xt({ target: "Array", proto: true, forced: Xi }, { includes: function(e2) {
    return Ai(this, e2, arguments.length > 1 ? arguments[1] : void 0);
  } }), Pi("includes"), un("Array", "includes");
  var Vi = R("".indexOf);
  Xt({ target: "String", proto: true, forced: !tn("includes") }, { includes: function(e2) {
    return !!~Vi(Mt(L(this)), Mt($t(e2)), arguments.length > 1 ? arguments[1] : void 0);
  } }), un("String", "includes");
  var Ni = Ae.f;
  var Ji = ut.set;
  var Yi = ut.getterFor("Array Iterator");
  No(Array, "Array", function(e2, t2) {
    Ji(this, { type: "Array Iterator", target: G(e2), index: 0, kind: t2 });
  }, function() {
    var e2 = Yi(this), t2 = e2.target, n2 = e2.kind, r2 = e2.index++;
    return !t2 || r2 >= t2.length ? (e2.target = void 0, { value: void 0, done: true }) : n2 == "keys" ? { value: r2, done: false } : n2 == "values" ? { value: t2[r2], done: false } : { value: [r2, t2[r2]], done: false };
  }, "values");
  var Hi = jo.Arguments = jo.Array;
  if (Pi("keys"), Pi("values"), Pi("entries"), v && Hi.name !== "values")
    try {
      Ni(Hi, "name", { value: "values" });
    } catch (e2) {
    }
  var Di = y(function() {
    if (typeof ArrayBuffer == "function") {
      var e2 = new ArrayBuffer(8);
      Object.isExtensible(e2) && Object.defineProperty(e2, "a", { value: 8 });
    }
  });
  var Bi = Object.isExtensible;
  var zi = y(function() {
    Bi(1);
  }) || Di ? function(e2) {
    return !!A(e2) && ((!Di || K(e2) != "ArrayBuffer") && (!Bi || Bi(e2)));
  } : Bi;
  var Mi = !y(function() {
    return Object.isExtensible(Object.preventExtensions({}));
  });
  var qi = l(function(e2) {
    var t2 = Ae.f, n2 = false, r2 = me("meta"), o2 = 0, i3 = function(e3) {
      t2(e3, r2, { value: { objectID: "O" + o2++, weakData: {} } });
    }, a3 = e2.exports = { enable: function() {
      a3.enable = function() {
      }, n2 = true;
      var e3 = Ct.f, t3 = R([].splice), o3 = {};
      o3[r2] = 1, e3(o3).length && (Ct.f = function(n3) {
        for (var o4 = e3(n3), i4 = 0, a4 = o4.length; i4 < a4; i4++)
          if (o4[i4] === r2) {
            t3(o4, i4, 1);
            break;
          }
        return o4;
      }, Xt({ target: "Object", stat: true, forced: true }, { getOwnPropertyNames: Bn.f }));
    }, fastKey: function(e3, t3) {
      if (!A(e3))
        return typeof e3 == "symbol" ? e3 : (typeof e3 == "string" ? "S" : "P") + e3;
      if (!he(e3, r2)) {
        if (!zi(e3))
          return "F";
        if (!t3)
          return "E";
        i3(e3);
      }
      return e3[r2].objectID;
    }, getWeakData: function(e3, t3) {
      if (!he(e3, r2)) {
        if (!zi(e3))
          return true;
        if (!t3)
          return false;
        i3(e3);
      }
      return e3[r2].weakData;
    }, onFreeze: function(e3) {
      return Mi && n2 && zi(e3) && !he(e3, r2) && i3(e3), e3;
    } };
    tt[r2] = true;
  });
  qi.enable, qi.fastKey, qi.getWeakData, qi.onFreeze;
  var Qi = p.TypeError;
  var $i = function(e2, t2) {
    this.stopped = e2, this.result = t2;
  };
  var ea = $i.prototype;
  var ta = function(e2, t2, n2) {
    var r2, o2, i3, a3, c2, s2, u3, l2 = n2 && n2.that, f2 = !(!n2 || !n2.AS_ENTRIES), d2 = !(!n2 || !n2.IS_ITERATOR), h7 = !(!n2 || !n2.INTERRUPTED), p3 = or(t2, l2), y2 = function(e3) {
      return r2 && Do(r2, "normal", e3), new $i(true, e3);
    }, v2 = function(e3) {
      return f2 ? (Ze(e3), h7 ? p3(e3[0], e3[1], y2) : p3(e3[0], e3[1])) : h7 ? p3(e3, y2) : p3(e3);
    };
    if (d2)
      r2 = e2;
    else {
      if (!(o2 = $o(e2)))
        throw Qi(te(e2) + " is not iterable");
      if (qo(o2)) {
        for (i3 = 0, a3 = wt(e2); a3 > i3; i3++)
          if ((c2 = v2(e2[i3])) && N(ea, c2))
            return c2;
        return new $i(false);
      }
      r2 = ti(e2, o2);
    }
    for (s2 = r2.next; !(u3 = g(s2, r2)).done; ) {
      try {
        c2 = v2(u3.value);
      } catch (e3) {
        Do(r2, "throw", e3);
      }
      if (typeof c2 == "object" && c2 && N(ea, c2))
        return c2;
    }
    return new $i(false);
  };
  var na = p.TypeError;
  var ra = function(e2, t2) {
    if (N(t2, e2))
      return e2;
    throw na("Incorrect invocation");
  };
  var oa = function(e2, t2, n2) {
    for (var r2 in t2)
      ft(e2, r2, t2[r2], n2);
    return e2;
  };
  var ia = ke("species");
  var aa = Ae.f;
  var ca = qi.fastKey;
  var sa = ut.set;
  var ua = ut.getterFor;
  var la = { getConstructor: function(e2, t2, n2, r2) {
    var o2 = e2(function(e3, o3) {
      ra(e3, i3), sa(e3, { type: t2, index: Vn(null), first: void 0, last: void 0, size: 0 }), v || (e3.size = 0), o3 != null && ta(o3, e3[r2], { that: e3, AS_ENTRIES: n2 });
    }), i3 = o2.prototype, a3 = ua(t2), c2 = function(e3, t3, n3) {
      var r3, o3, i4 = a3(e3), c3 = s2(e3, t3);
      return c3 ? c3.value = n3 : (i4.last = c3 = { index: o3 = ca(t3, true), key: t3, value: n3, previous: r3 = i4.last, next: void 0, removed: false }, i4.first || (i4.first = c3), r3 && (r3.next = c3), v ? i4.size++ : e3.size++, o3 !== "F" && (i4.index[o3] = c3)), e3;
    }, s2 = function(e3, t3) {
      var n3, r3 = a3(e3), o3 = ca(t3);
      if (o3 !== "F")
        return r3.index[o3];
      for (n3 = r3.first; n3; n3 = n3.next)
        if (n3.key == t3)
          return n3;
    };
    return oa(i3, { clear: function() {
      for (var e3 = a3(this), t3 = e3.index, n3 = e3.first; n3; )
        n3.removed = true, n3.previous && (n3.previous = n3.previous.next = void 0), delete t3[n3.index], n3 = n3.next;
      e3.first = e3.last = void 0, v ? e3.size = 0 : this.size = 0;
    }, delete: function(e3) {
      var t3 = this, n3 = a3(t3), r3 = s2(t3, e3);
      if (r3) {
        var o3 = r3.next, i4 = r3.previous;
        delete n3.index[r3.index], r3.removed = true, i4 && (i4.next = o3), o3 && (o3.previous = i4), n3.first == r3 && (n3.first = o3), n3.last == r3 && (n3.last = i4), v ? n3.size-- : t3.size--;
      }
      return !!r3;
    }, forEach: function(e3) {
      for (var t3, n3 = a3(this), r3 = or(e3, arguments.length > 1 ? arguments[1] : void 0); t3 = t3 ? t3.next : n3.first; )
        for (r3(t3.value, t3.key, this); t3 && t3.removed; )
          t3 = t3.previous;
    }, has: function(e3) {
      return !!s2(this, e3);
    } }), oa(i3, n2 ? { get: function(e3) {
      var t3 = s2(this, e3);
      return t3 && t3.value;
    }, set: function(e3, t3) {
      return c2(this, e3 === 0 ? 0 : e3, t3);
    } } : { add: function(e3) {
      return c2(this, e3 = e3 === 0 ? 0 : e3, e3);
    } }), v && aa(i3, "size", { get: function() {
      return a3(this).size;
    } }), o2;
  }, setStrong: function(e2, t2, n2) {
    var r2 = t2 + " Iterator", o2 = ua(t2), i3 = ua(r2);
    No(e2, t2, function(e3, t3) {
      sa(this, { type: r2, target: e3, state: o2(e3), kind: t3, last: void 0 });
    }, function() {
      for (var e3 = i3(this), t3 = e3.kind, n3 = e3.last; n3 && n3.removed; )
        n3 = n3.previous;
      return e3.target && (e3.last = n3 = n3 ? n3.next : e3.state.first) ? t3 == "keys" ? { value: n3.key, done: false } : t3 == "values" ? { value: n3.value, done: false } : { value: [n3.key, n3.value], done: false } : (e3.target = void 0, { value: void 0, done: true });
    }, n2 ? "entries" : "values", !n2, true), function(e3) {
      var t3 = V(e3), n3 = Ae.f;
      v && t3 && !t3[ia] && n3(t3, ia, { configurable: true, get: function() {
        return this;
      } });
    }(t2);
  } };
  function fa(e2) {
    var t2 = this.constructor;
    return this.then(function(n2) {
      return t2.resolve(e2()).then(function() {
        return n2;
      });
    }, function(n2) {
      return t2.resolve(e2()).then(function() {
        return t2.reject(n2);
      });
    });
  }
  function da(e2) {
    return new this(function(t2, n2) {
      if (!e2 || e2.length === void 0)
        return n2(new TypeError(typeof e2 + " " + e2 + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
      var r2 = Array.prototype.slice.call(e2);
      if (r2.length === 0)
        return t2([]);
      var o2 = r2.length;
      function i3(e3, n3) {
        if (n3 && (typeof n3 == "object" || typeof n3 == "function")) {
          var a4 = n3.then;
          if (typeof a4 == "function")
            return void a4.call(n3, function(t3) {
              i3(e3, t3);
            }, function(n4) {
              r2[e3] = { status: "rejected", reason: n4 }, --o2 == 0 && t2(r2);
            });
        }
        r2[e3] = { status: "fulfilled", value: n3 }, --o2 == 0 && t2(r2);
      }
      for (var a3 = 0; a3 < r2.length; a3++)
        i3(a3, r2[a3]);
    });
  }
  !function(e2, t2, n2) {
    var r2 = e2.indexOf("Map") !== -1, o2 = e2.indexOf("Weak") !== -1, i3 = r2 ? "set" : "add", a3 = p[e2], c2 = a3 && a3.prototype, s2 = a3, u3 = {}, l2 = function(e3) {
      var t3 = R(c2[e3]);
      ft(c2, e3, e3 == "add" ? function(e4) {
        return t3(this, e4 === 0 ? 0 : e4), this;
      } : e3 == "delete" ? function(e4) {
        return !(o2 && !A(e4)) && t3(this, e4 === 0 ? 0 : e4);
      } : e3 == "get" ? function(e4) {
        return o2 && !A(e4) ? void 0 : t3(this, e4 === 0 ? 0 : e4);
      } : e3 == "has" ? function(e4) {
        return !(o2 && !A(e4)) && t3(this, e4 === 0 ? 0 : e4);
      } : function(e4, n3) {
        return t3(this, e4 === 0 ? 0 : e4, n3), this;
      });
    };
    if (Pt(e2, !P(a3) || !(o2 || c2.forEach && !y(function() {
      new a3().entries().next();
    }))))
      s2 = n2.getConstructor(t2, e2, r2, i3), qi.enable();
    else if (Pt(e2, true)) {
      var f2 = new s2(), d2 = f2[i3](o2 ? {} : -0, 1) != f2, h7 = y(function() {
        f2.has(1);
      }), v2 = ci(function(e3) {
        new a3(e3);
      }), m2 = !o2 && y(function() {
        for (var e3 = new a3(), t3 = 5; t3--; )
          e3[i3](t3, t3);
        return !e3.has(-0);
      });
      v2 || ((s2 = t2(function(e3, t3) {
        ra(e3, c2);
        var n3 = function(e4, t4, n4) {
          var r3, o3;
          return Zo && P(r3 = t4.constructor) && r3 !== n4 && A(o3 = r3.prototype) && o3 !== n4.prototype && Zo(e4, o3), e4;
        }(new a3(), e3, s2);
        return t3 != null && ta(t3, n3[i3], { that: n3, AS_ENTRIES: r2 }), n3;
      })).prototype = c2, c2.constructor = s2), (h7 || m2) && (l2("delete"), l2("has"), r2 && l2("get")), (m2 || d2) && l2(i3), o2 && c2.clear && delete c2.clear;
    }
    u3[e2] = s2, Xt({ global: true, forced: s2 != a3 }, u3), nr(s2, e2), o2 || n2.setStrong(s2, e2, r2);
  }("Set", function(e2) {
    return function() {
      return e2(this, arguments.length ? arguments[0] : void 0);
    };
  }, la), Mn.Set;
  var ha = setTimeout;
  function pa(e2) {
    return Boolean(e2 && e2.length !== void 0);
  }
  function ya() {
  }
  function va(e2) {
    if (!(this instanceof va))
      throw new TypeError("Promises must be constructed via new");
    if (typeof e2 != "function")
      throw new TypeError("not a function");
    this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], ka(e2, this);
  }
  function ma(e2, t2) {
    for (; e2._state === 3; )
      e2 = e2._value;
    e2._state !== 0 ? (e2._handled = true, va._immediateFn(function() {
      var n2 = e2._state === 1 ? t2.onFulfilled : t2.onRejected;
      if (n2 !== null) {
        var r2;
        try {
          r2 = n2(e2._value);
        } catch (e3) {
          return void ga(t2.promise, e3);
        }
        ba(t2.promise, r2);
      } else
        (e2._state === 1 ? ba : ga)(t2.promise, e2._value);
    })) : e2._deferreds.push(t2);
  }
  function ba(e2, t2) {
    try {
      if (t2 === e2)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (t2 && (typeof t2 == "object" || typeof t2 == "function")) {
        var n2 = t2.then;
        if (t2 instanceof va)
          return e2._state = 3, e2._value = t2, void wa(e2);
        if (typeof n2 == "function")
          return void ka((r2 = n2, o2 = t2, function() {
            r2.apply(o2, arguments);
          }), e2);
      }
      e2._state = 1, e2._value = t2, wa(e2);
    } catch (t3) {
      ga(e2, t3);
    }
    var r2, o2;
  }
  function ga(e2, t2) {
    e2._state = 2, e2._value = t2, wa(e2);
  }
  function wa(e2) {
    e2._state === 2 && e2._deferreds.length === 0 && va._immediateFn(function() {
      e2._handled || va._unhandledRejectionFn(e2._value);
    });
    for (var t2 = 0, n2 = e2._deferreds.length; t2 < n2; t2++)
      ma(e2, e2._deferreds[t2]);
    e2._deferreds = null;
  }
  function Sa(e2, t2, n2) {
    this.onFulfilled = typeof e2 == "function" ? e2 : null, this.onRejected = typeof t2 == "function" ? t2 : null, this.promise = n2;
  }
  function ka(e2, t2) {
    var n2 = false;
    try {
      e2(function(e3) {
        n2 || (n2 = true, ba(t2, e3));
      }, function(e3) {
        n2 || (n2 = true, ga(t2, e3));
      });
    } catch (e3) {
      if (n2)
        return;
      n2 = true, ga(t2, e3);
    }
  }
  va.prototype.catch = function(e2) {
    return this.then(null, e2);
  }, va.prototype.then = function(e2, t2) {
    var n2 = new this.constructor(ya);
    return ma(this, new Sa(e2, t2, n2)), n2;
  }, va.prototype.finally = fa, va.all = function(e2) {
    return new va(function(t2, n2) {
      if (!pa(e2))
        return n2(new TypeError("Promise.all accepts an array"));
      var r2 = Array.prototype.slice.call(e2);
      if (r2.length === 0)
        return t2([]);
      var o2 = r2.length;
      function i3(e3, a4) {
        try {
          if (a4 && (typeof a4 == "object" || typeof a4 == "function")) {
            var c2 = a4.then;
            if (typeof c2 == "function")
              return void c2.call(a4, function(t3) {
                i3(e3, t3);
              }, n2);
          }
          r2[e3] = a4, --o2 == 0 && t2(r2);
        } catch (e4) {
          n2(e4);
        }
      }
      for (var a3 = 0; a3 < r2.length; a3++)
        i3(a3, r2[a3]);
    });
  }, va.allSettled = da, va.resolve = function(e2) {
    return e2 && typeof e2 == "object" && e2.constructor === va ? e2 : new va(function(t2) {
      t2(e2);
    });
  }, va.reject = function(e2) {
    return new va(function(t2, n2) {
      n2(e2);
    });
  }, va.race = function(e2) {
    return new va(function(t2, n2) {
      if (!pa(e2))
        return n2(new TypeError("Promise.race accepts an array"));
      for (var r2 = 0, o2 = e2.length; r2 < o2; r2++)
        va.resolve(e2[r2]).then(t2, n2);
    });
  }, va._immediateFn = typeof setImmediate == "function" && function(e2) {
    setImmediate(e2);
  } || function(e2) {
    ha(e2, 0);
  }, va._unhandledRejectionFn = function(e2) {
    typeof console != "undefined" && console && console.warn("Possible Unhandled Promise Rejection:", e2);
  };
  var _a = function() {
    if (typeof self != "undefined")
      return self;
    if (typeof window != "undefined")
      return window;
    if (typeof global != "undefined")
      return global;
    throw new Error("unable to locate global object");
  }();
  typeof _a.Promise != "function" ? _a.Promise = va : (_a.Promise.prototype.finally || (_a.Promise.prototype.finally = fa), _a.Promise.allSettled || (_a.Promise.allSettled = da)), function(e2) {
    function t2() {
    }
    function n2(e3, t3) {
      if (e3 = e3 === void 0 ? "utf-8" : e3, t3 = t3 === void 0 ? { fatal: false } : t3, o2.indexOf(e3.toLowerCase()) === -1)
        throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('" + e3 + "') is invalid.");
      if (t3.fatal)
        throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
    }
    function r2(e3) {
      for (var t3 = 0, n3 = Math.min(65536, e3.length + 1), r3 = new Uint16Array(n3), o3 = [], i4 = 0; ; ) {
        var a3 = t3 < e3.length;
        if (!a3 || i4 >= n3 - 1) {
          if (o3.push(String.fromCharCode.apply(null, r3.subarray(0, i4))), !a3)
            return o3.join("");
          e3 = e3.subarray(t3), i4 = t3 = 0;
        }
        if ((128 & (a3 = e3[t3++])) == 0)
          r3[i4++] = a3;
        else if ((224 & a3) == 192) {
          var c2 = 63 & e3[t3++];
          r3[i4++] = (31 & a3) << 6 | c2;
        } else if ((240 & a3) == 224) {
          c2 = 63 & e3[t3++];
          var s2 = 63 & e3[t3++];
          r3[i4++] = (31 & a3) << 12 | c2 << 6 | s2;
        } else if ((248 & a3) == 240) {
          65535 < (a3 = (7 & a3) << 18 | (c2 = 63 & e3[t3++]) << 12 | (s2 = 63 & e3[t3++]) << 6 | 63 & e3[t3++]) && (a3 -= 65536, r3[i4++] = a3 >>> 10 & 1023 | 55296, a3 = 56320 | 1023 & a3), r3[i4++] = a3;
        }
      }
    }
    if (e2.TextEncoder && e2.TextDecoder)
      return false;
    var o2 = ["utf-8", "utf8", "unicode-1-1-utf-8"];
    Object.defineProperty(t2.prototype, "encoding", { value: "utf-8" }), t2.prototype.encode = function(e3, t3) {
      if ((t3 = t3 === void 0 ? { stream: false } : t3).stream)
        throw Error("Failed to encode: the 'stream' option is unsupported.");
      t3 = 0;
      for (var n3 = e3.length, r3 = 0, o3 = Math.max(32, n3 + (n3 >>> 1) + 7), i4 = new Uint8Array(o3 >>> 3 << 3); t3 < n3; ) {
        var a3 = e3.charCodeAt(t3++);
        if (55296 <= a3 && 56319 >= a3) {
          if (t3 < n3) {
            var c2 = e3.charCodeAt(t3);
            (64512 & c2) == 56320 && (++t3, a3 = ((1023 & a3) << 10) + (1023 & c2) + 65536);
          }
          if (55296 <= a3 && 56319 >= a3)
            continue;
        }
        if (r3 + 4 > i4.length && (o3 += 8, o3 = (o3 *= 1 + t3 / e3.length * 2) >>> 3 << 3, (c2 = new Uint8Array(o3)).set(i4), i4 = c2), (4294967168 & a3) == 0)
          i4[r3++] = a3;
        else {
          if ((4294965248 & a3) == 0)
            i4[r3++] = a3 >>> 6 & 31 | 192;
          else if ((4294901760 & a3) == 0)
            i4[r3++] = a3 >>> 12 & 15 | 224, i4[r3++] = a3 >>> 6 & 63 | 128;
          else {
            if ((4292870144 & a3) != 0)
              continue;
            i4[r3++] = a3 >>> 18 & 7 | 240, i4[r3++] = a3 >>> 12 & 63 | 128, i4[r3++] = a3 >>> 6 & 63 | 128;
          }
          i4[r3++] = 63 & a3 | 128;
        }
      }
      return i4.slice ? i4.slice(0, r3) : i4.subarray(0, r3);
    }, Object.defineProperty(n2.prototype, "encoding", { value: "utf-8" }), Object.defineProperty(n2.prototype, "fatal", { value: false }), Object.defineProperty(n2.prototype, "ignoreBOM", { value: false });
    var i3 = r2;
    typeof Buffer == "function" && Buffer.from ? i3 = function(e3) {
      return Buffer.from(e3.buffer, e3.byteOffset, e3.byteLength).toString("utf-8");
    } : typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function" && (i3 = function(e3) {
      var t3 = URL.createObjectURL(new Blob([e3], { type: "text/plain;charset=UTF-8" }));
      try {
        var n3 = new XMLHttpRequest();
        return n3.open("GET", t3, false), n3.send(), n3.responseText;
      } catch (t4) {
        return r2(e3);
      } finally {
        URL.revokeObjectURL(t3);
      }
    }), n2.prototype.decode = function(e3, t3) {
      if ((t3 = t3 === void 0 ? { stream: false } : t3).stream)
        throw Error("Failed to decode: the 'stream' option is unsupported.");
      return e3 = e3 instanceof Uint8Array ? e3 : e3.buffer instanceof ArrayBuffer ? new Uint8Array(e3.buffer) : new Uint8Array(e3), i3(e3);
    }, e2.TextEncoder = t2, e2.TextDecoder = n2;
  }(typeof window != "undefined" ? window : s), function() {
    function e2(e3, t3) {
      if (!(e3 instanceof t3))
        throw new TypeError("Cannot call a class as a function");
    }
    function t2(e3, t3) {
      for (var n3 = 0; n3 < t3.length; n3++) {
        var r3 = t3[n3];
        r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(e3, r3.key, r3);
      }
    }
    function n2(e3, n3, r3) {
      return n3 && t2(e3.prototype, n3), r3 && t2(e3, r3), e3;
    }
    function r2(e3, t3) {
      if (typeof t3 != "function" && t3 !== null)
        throw new TypeError("Super expression must either be null or a function");
      e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, writable: true, configurable: true } }), t3 && i3(e3, t3);
    }
    function o2(e3) {
      return o2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(e4) {
        return e4.__proto__ || Object.getPrototypeOf(e4);
      }, o2(e3);
    }
    function i3(e3, t3) {
      return i3 = Object.setPrototypeOf || function(e4, t4) {
        return e4.__proto__ = t4, e4;
      }, i3(e3, t3);
    }
    function a3() {
      if (typeof Reflect == "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy == "function")
        return true;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        })), true;
      } catch (e3) {
        return false;
      }
    }
    function c2(e3) {
      if (e3 === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e3;
    }
    function u3(e3, t3) {
      return !t3 || typeof t3 != "object" && typeof t3 != "function" ? c2(e3) : t3;
    }
    function l2(e3) {
      var t3 = a3();
      return function() {
        var n3, r3 = o2(e3);
        if (t3) {
          var i4 = o2(this).constructor;
          n3 = Reflect.construct(r3, arguments, i4);
        } else
          n3 = r3.apply(this, arguments);
        return u3(this, n3);
      };
    }
    function f2(e3, t3) {
      for (; !Object.prototype.hasOwnProperty.call(e3, t3) && (e3 = o2(e3)) !== null; )
        ;
      return e3;
    }
    function d2(e3, t3, n3) {
      return d2 = typeof Reflect != "undefined" && Reflect.get ? Reflect.get : function(e4, t4, n4) {
        var r3 = f2(e4, t4);
        if (r3) {
          var o3 = Object.getOwnPropertyDescriptor(r3, t4);
          return o3.get ? o3.get.call(n4) : o3.value;
        }
      }, d2(e3, t3, n3 || e3);
    }
    var h7 = function() {
      function t3() {
        e2(this, t3), Object.defineProperty(this, "listeners", { value: {}, writable: true, configurable: true });
      }
      return n2(t3, [{ key: "addEventListener", value: function(e3, t4, n3) {
        e3 in this.listeners || (this.listeners[e3] = []), this.listeners[e3].push({ callback: t4, options: n3 });
      } }, { key: "removeEventListener", value: function(e3, t4) {
        if (e3 in this.listeners) {
          for (var n3 = this.listeners[e3], r3 = 0, o3 = n3.length; r3 < o3; r3++)
            if (n3[r3].callback === t4)
              return void n3.splice(r3, 1);
        }
      } }, { key: "dispatchEvent", value: function(e3) {
        if (e3.type in this.listeners) {
          for (var t4 = this.listeners[e3.type].slice(), n3 = 0, r3 = t4.length; n3 < r3; n3++) {
            var o3 = t4[n3];
            try {
              o3.callback.call(this, e3);
            } catch (e4) {
              Promise.resolve().then(function() {
                throw e4;
              });
            }
            o3.options && o3.options.once && this.removeEventListener(e3.type, o3.callback);
          }
          return !e3.defaultPrevented;
        }
      } }]), t3;
    }(), p3 = function(t3) {
      r2(a4, t3);
      var i4 = l2(a4);
      function a4() {
        var t4;
        return e2(this, a4), (t4 = i4.call(this)).listeners || h7.call(c2(t4)), Object.defineProperty(c2(t4), "aborted", { value: false, writable: true, configurable: true }), Object.defineProperty(c2(t4), "onabort", { value: null, writable: true, configurable: true }), t4;
      }
      return n2(a4, [{ key: "toString", value: function() {
        return "[object AbortSignal]";
      } }, { key: "dispatchEvent", value: function(e3) {
        e3.type === "abort" && (this.aborted = true, typeof this.onabort == "function" && this.onabort.call(this, e3)), d2(o2(a4.prototype), "dispatchEvent", this).call(this, e3);
      } }]), a4;
    }(h7), y2 = function() {
      function t3() {
        e2(this, t3), Object.defineProperty(this, "signal", { value: new p3(), writable: true, configurable: true });
      }
      return n2(t3, [{ key: "abort", value: function() {
        var e3;
        try {
          e3 = new Event("abort");
        } catch (t4) {
          typeof document != "undefined" ? document.createEvent ? (e3 = document.createEvent("Event")).initEvent("abort", false, false) : (e3 = document.createEventObject()).type = "abort" : e3 = { type: "abort", bubbles: false, cancelable: false };
        }
        this.signal.dispatchEvent(e3);
      } }, { key: "toString", value: function() {
        return "[object AbortController]";
      } }]), t3;
    }();
    function v2(e3) {
      return e3.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL ? (console.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill"), true) : typeof e3.Request == "function" && !e3.Request.prototype.hasOwnProperty("signal") || !e3.AbortController;
    }
    typeof Symbol != "undefined" && Symbol.toStringTag && (y2.prototype[Symbol.toStringTag] = "AbortController", p3.prototype[Symbol.toStringTag] = "AbortSignal"), function(e3) {
      v2(e3) && (e3.AbortController = y2, e3.AbortSignal = p3);
    }(typeof self != "undefined" ? self : s);
  }();
  var Ia = l(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    var n2 = function() {
      function e3() {
        var e4 = this;
        this.locked = /* @__PURE__ */ new Map(), this.addToLocked = function(t3, n3) {
          var r2 = e4.locked.get(t3);
          r2 === void 0 ? n3 === void 0 ? e4.locked.set(t3, []) : e4.locked.set(t3, [n3]) : n3 !== void 0 && (r2.unshift(n3), e4.locked.set(t3, r2));
        }, this.isLocked = function(t3) {
          return e4.locked.has(t3);
        }, this.lock = function(t3) {
          return new Promise(function(n3, r2) {
            e4.isLocked(t3) ? e4.addToLocked(t3, n3) : (e4.addToLocked(t3), n3());
          });
        }, this.unlock = function(t3) {
          var n3 = e4.locked.get(t3);
          if (n3 !== void 0 && n3.length !== 0) {
            var r2 = n3.pop();
            e4.locked.set(t3, n3), r2 !== void 0 && setTimeout(r2, 0);
          } else
            e4.locked.delete(t3);
        };
      }
      return e3.getInstance = function() {
        return e3.instance === void 0 && (e3.instance = new e3()), e3.instance;
      }, e3;
    }();
    t2.default = function() {
      return n2.getInstance();
    };
  });
  u(Ia);
  var Ta = l(function(e2, t2) {
    var n2 = s && s.__awaiter || function(e3, t3, n3, r3) {
      return new (n3 || (n3 = Promise))(function(o3, i4) {
        function a4(e4) {
          try {
            s2(r3.next(e4));
          } catch (e5) {
            i4(e5);
          }
        }
        function c3(e4) {
          try {
            s2(r3.throw(e4));
          } catch (e5) {
            i4(e5);
          }
        }
        function s2(e4) {
          e4.done ? o3(e4.value) : new n3(function(t4) {
            t4(e4.value);
          }).then(a4, c3);
        }
        s2((r3 = r3.apply(e3, t3 || [])).next());
      });
    }, r2 = s && s.__generator || function(e3, t3) {
      var n3, r3, o3, i4, a4 = { label: 0, sent: function() {
        if (1 & o3[0])
          throw o3[1];
        return o3[1];
      }, trys: [], ops: [] };
      return i4 = { next: c3(0), throw: c3(1), return: c3(2) }, typeof Symbol == "function" && (i4[Symbol.iterator] = function() {
        return this;
      }), i4;
      function c3(i5) {
        return function(c4) {
          return function(i6) {
            if (n3)
              throw new TypeError("Generator is already executing.");
            for (; a4; )
              try {
                if (n3 = 1, r3 && (o3 = 2 & i6[0] ? r3.return : i6[0] ? r3.throw || ((o3 = r3.return) && o3.call(r3), 0) : r3.next) && !(o3 = o3.call(r3, i6[1])).done)
                  return o3;
                switch (r3 = 0, o3 && (i6 = [2 & i6[0], o3.value]), i6[0]) {
                  case 0:
                  case 1:
                    o3 = i6;
                    break;
                  case 4:
                    return a4.label++, { value: i6[1], done: false };
                  case 5:
                    a4.label++, r3 = i6[1], i6 = [0];
                    continue;
                  case 7:
                    i6 = a4.ops.pop(), a4.trys.pop();
                    continue;
                  default:
                    if (!(o3 = a4.trys, (o3 = o3.length > 0 && o3[o3.length - 1]) || i6[0] !== 6 && i6[0] !== 2)) {
                      a4 = 0;
                      continue;
                    }
                    if (i6[0] === 3 && (!o3 || i6[1] > o3[0] && i6[1] < o3[3])) {
                      a4.label = i6[1];
                      break;
                    }
                    if (i6[0] === 6 && a4.label < o3[1]) {
                      a4.label = o3[1], o3 = i6;
                      break;
                    }
                    if (o3 && a4.label < o3[2]) {
                      a4.label = o3[2], a4.ops.push(i6);
                      break;
                    }
                    o3[2] && a4.ops.pop(), a4.trys.pop();
                    continue;
                }
                i6 = t3.call(e3, a4);
              } catch (e4) {
                i6 = [6, e4], r3 = 0;
              } finally {
                n3 = o3 = 0;
              }
            if (5 & i6[0])
              throw i6[1];
            return { value: i6[0] ? i6[1] : void 0, done: true };
          }([i5, c4]);
        };
      }
    };
    Object.defineProperty(t2, "__esModule", { value: true });
    var o2 = "browser-tabs-lock-key";
    function i3(e3) {
      return new Promise(function(t3) {
        return setTimeout(t3, e3);
      });
    }
    function a3(e3) {
      for (var t3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", n3 = "", r3 = 0; r3 < e3; r3++) {
        n3 += t3[Math.floor(Math.random() * t3.length)];
      }
      return n3;
    }
    var c2 = function() {
      function e3() {
        this.acquiredIatSet = /* @__PURE__ */ new Set(), this.id = Date.now().toString() + a3(15), this.acquireLock = this.acquireLock.bind(this), this.releaseLock = this.releaseLock.bind(this), this.releaseLock__private__ = this.releaseLock__private__.bind(this), this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this), this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this), e3.waiters === void 0 && (e3.waiters = []);
      }
      return e3.prototype.acquireLock = function(t3, c3) {
        return c3 === void 0 && (c3 = 5e3), n2(this, void 0, void 0, function() {
          var n3, s2, u3, l2, f2, d2;
          return r2(this, function(r3) {
            switch (r3.label) {
              case 0:
                n3 = Date.now() + a3(4), s2 = Date.now() + c3, u3 = o2 + "-" + t3, l2 = window.localStorage, r3.label = 1;
              case 1:
                return Date.now() < s2 ? [4, i3(30)] : [3, 8];
              case 2:
                return r3.sent(), l2.getItem(u3) !== null ? [3, 5] : (f2 = this.id + "-" + t3 + "-" + n3, [4, i3(Math.floor(25 * Math.random()))]);
              case 3:
                return r3.sent(), l2.setItem(u3, JSON.stringify({ id: this.id, iat: n3, timeoutKey: f2, timeAcquired: Date.now(), timeRefreshed: Date.now() })), [4, i3(30)];
              case 4:
                return r3.sent(), (d2 = l2.getItem(u3)) !== null && (d2 = JSON.parse(d2)).id === this.id && d2.iat === n3 ? (this.acquiredIatSet.add(n3), this.refreshLockWhileAcquired(u3, n3), [2, true]) : [3, 7];
              case 5:
                return e3.lockCorrector(), [4, this.waitForSomethingToChange(s2)];
              case 6:
                r3.sent(), r3.label = 7;
              case 7:
                return n3 = Date.now() + a3(4), [3, 1];
              case 8:
                return [2, false];
            }
          });
        });
      }, e3.prototype.refreshLockWhileAcquired = function(e4, t3) {
        return n2(this, void 0, void 0, function() {
          var o3 = this;
          return r2(this, function(i4) {
            return setTimeout(function() {
              return n2(o3, void 0, void 0, function() {
                var n3, o4;
                return r2(this, function(r3) {
                  switch (r3.label) {
                    case 0:
                      return [4, Ia.default().lock(t3)];
                    case 1:
                      return r3.sent(), this.acquiredIatSet.has(t3) ? (n3 = window.localStorage, (o4 = n3.getItem(e4)) === null ? (Ia.default().unlock(t3), [2]) : ((o4 = JSON.parse(o4)).timeRefreshed = Date.now(), n3.setItem(e4, JSON.stringify(o4)), Ia.default().unlock(t3), this.refreshLockWhileAcquired(e4, t3), [2])) : (Ia.default().unlock(t3), [2]);
                  }
                });
              });
            }, 1e3), [2];
          });
        });
      }, e3.prototype.waitForSomethingToChange = function(t3) {
        return n2(this, void 0, void 0, function() {
          return r2(this, function(n3) {
            switch (n3.label) {
              case 0:
                return [4, new Promise(function(n4) {
                  var r3 = false, o3 = Date.now(), i4 = false;
                  function a4() {
                    if (i4 || (window.removeEventListener("storage", a4), e3.removeFromWaiting(a4), clearTimeout(c3), i4 = true), !r3) {
                      r3 = true;
                      var t4 = 50 - (Date.now() - o3);
                      t4 > 0 ? setTimeout(n4, t4) : n4();
                    }
                  }
                  window.addEventListener("storage", a4), e3.addToWaiting(a4);
                  var c3 = setTimeout(a4, Math.max(0, t3 - Date.now()));
                })];
              case 1:
                return n3.sent(), [2];
            }
          });
        });
      }, e3.addToWaiting = function(t3) {
        this.removeFromWaiting(t3), e3.waiters !== void 0 && e3.waiters.push(t3);
      }, e3.removeFromWaiting = function(t3) {
        e3.waiters !== void 0 && (e3.waiters = e3.waiters.filter(function(e4) {
          return e4 !== t3;
        }));
      }, e3.notifyWaiters = function() {
        e3.waiters !== void 0 && e3.waiters.slice().forEach(function(e4) {
          return e4();
        });
      }, e3.prototype.releaseLock = function(e4) {
        return n2(this, void 0, void 0, function() {
          return r2(this, function(t3) {
            switch (t3.label) {
              case 0:
                return [4, this.releaseLock__private__(e4)];
              case 1:
                return [2, t3.sent()];
            }
          });
        });
      }, e3.prototype.releaseLock__private__ = function(t3) {
        return n2(this, void 0, void 0, function() {
          var n3, i4, a4;
          return r2(this, function(r3) {
            switch (r3.label) {
              case 0:
                return n3 = window.localStorage, i4 = o2 + "-" + t3, (a4 = n3.getItem(i4)) === null ? [2] : (a4 = JSON.parse(a4)).id !== this.id ? [3, 2] : [4, Ia.default().lock(a4.iat)];
              case 1:
                r3.sent(), this.acquiredIatSet.delete(a4.iat), n3.removeItem(i4), Ia.default().unlock(a4.iat), e3.notifyWaiters(), r3.label = 2;
              case 2:
                return [2];
            }
          });
        });
      }, e3.lockCorrector = function() {
        for (var t3 = Date.now() - 5e3, n3 = window.localStorage, r3 = Object.keys(n3), i4 = false, a4 = 0; a4 < r3.length; a4++) {
          var c3 = r3[a4];
          if (c3.includes(o2)) {
            var s2 = n3.getItem(c3);
            s2 !== null && ((s2 = JSON.parse(s2)).timeRefreshed === void 0 && s2.timeAcquired < t3 || s2.timeRefreshed !== void 0 && s2.timeRefreshed < t3) && (n3.removeItem(c3), i4 = true);
          }
        }
        i4 && e3.notifyWaiters();
      }, e3.waiters = void 0, e3;
    }();
    t2.default = c2;
  });
  var Oa = u(Ta);
  var xa = { timeoutInSeconds: 60 };
  var Ca = ["login_required", "consent_required", "interaction_required", "account_selection_required", "access_denied"];
  var Ra = { name: "auth0-spa-js", version: "1.22.0" };
  var Ea = function() {
    return Date.now();
  };
  var ja = function(e2) {
    function n2(t2, r2) {
      var o2 = e2.call(this, r2) || this;
      return o2.error = t2, o2.error_description = r2, Object.setPrototypeOf(o2, n2.prototype), o2;
    }
    return t(n2, e2), n2.fromPayload = function(e3) {
      return new n2(e3.error, e3.error_description);
    }, n2;
  }(Error);
  var Ka = function(e2) {
    function n2(t2, r2, o2, i3) {
      i3 === void 0 && (i3 = null);
      var a3 = e2.call(this, t2, r2) || this;
      return a3.state = o2, a3.appState = i3, Object.setPrototypeOf(a3, n2.prototype), a3;
    }
    return t(n2, e2), n2;
  }(ja);
  var Ua = function(e2) {
    function n2() {
      var t2 = e2.call(this, "timeout", "Timeout") || this;
      return Object.setPrototypeOf(t2, n2.prototype), t2;
    }
    return t(n2, e2), n2;
  }(ja);
  var Fa = function(e2) {
    function n2(t2) {
      var r2 = e2.call(this) || this;
      return r2.popup = t2, Object.setPrototypeOf(r2, n2.prototype), r2;
    }
    return t(n2, e2), n2;
  }(Ua);
  var Wa = function(e2) {
    function n2(t2) {
      var r2 = e2.call(this, "cancelled", "Popup closed") || this;
      return r2.popup = t2, Object.setPrototypeOf(r2, n2.prototype), r2;
    }
    return t(n2, e2), n2;
  }(ja);
  var Za = function(e2) {
    function n2(t2, r2, o2) {
      var i3 = e2.call(this, t2, r2) || this;
      return i3.mfa_token = o2, Object.setPrototypeOf(i3, n2.prototype), i3;
    }
    return t(n2, e2), n2;
  }(ja);
  var La = function(e2) {
    function n2(t2, r2) {
      var o2 = e2.call(this, "missing_refresh_token", "Missing Refresh Token (audience: '".concat(Da(t2, ["default"]), "', scope: '").concat(Da(r2), "')")) || this;
      return o2.audience = t2, o2.scope = r2, Object.setPrototypeOf(o2, n2.prototype), o2;
    }
    return t(n2, e2), n2;
  }(ja);
  var Ga = function(e2) {
    return new Promise(function(t2, n2) {
      var r2, o2 = setInterval(function() {
        e2.popup && e2.popup.closed && (clearInterval(o2), clearTimeout(i3), window.removeEventListener("message", r2, false), n2(new Wa(e2.popup)));
      }, 1e3), i3 = setTimeout(function() {
        clearInterval(o2), n2(new Fa(e2.popup)), window.removeEventListener("message", r2, false);
      }, 1e3 * (e2.timeoutInSeconds || 60));
      r2 = function(a3) {
        if (a3.data && a3.data.type === "authorization_response") {
          if (clearTimeout(i3), clearInterval(o2), window.removeEventListener("message", r2, false), e2.popup.close(), a3.data.response.error)
            return n2(ja.fromPayload(a3.data.response));
          t2(a3.data.response);
        }
      }, window.addEventListener("message", r2);
    });
  };
  var Pa = function() {
    return window.crypto || window.msCrypto;
  };
  var Aa = function() {
    var e2 = Pa();
    return e2.subtle || e2.webkitSubtle;
  };
  var Xa = function() {
    var e2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.", t2 = "";
    return Array.from(Pa().getRandomValues(new Uint8Array(43))).forEach(function(n2) {
      return t2 += e2[n2 % e2.length];
    }), t2;
  };
  var Va = function(e2) {
    return btoa(e2);
  };
  var Na = function(e2) {
    return Object.keys(e2).filter(function(t2) {
      return e2[t2] !== void 0;
    }).map(function(t2) {
      return encodeURIComponent(t2) + "=" + encodeURIComponent(e2[t2]);
    }).join("&");
  };
  var Ja = function(e2) {
    return o(void 0, void 0, void 0, function() {
      var t2;
      return i(this, function(n2) {
        switch (n2.label) {
          case 0:
            return t2 = Aa().digest({ name: "SHA-256" }, new TextEncoder().encode(e2)), window.msCrypto ? [2, new Promise(function(e3, n3) {
              t2.oncomplete = function(t3) {
                e3(t3.target.result);
              }, t2.onerror = function(e4) {
                n3(e4.error);
              }, t2.onabort = function() {
                n3("The digest operation was aborted");
              };
            })] : [4, t2];
          case 1:
            return [2, n2.sent()];
        }
      });
    });
  };
  var Ya = function(e2) {
    return function(e3) {
      return decodeURIComponent(atob(e3).split("").map(function(e4) {
        return "%" + ("00" + e4.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
    }(e2.replace(/_/g, "/").replace(/-/g, "+"));
  };
  var Ha = function(e2) {
    var t2 = new Uint8Array(e2);
    return function(e3) {
      var t3 = { "+": "-", "/": "_", "=": "" };
      return e3.replace(/[+/=]/g, function(e4) {
        return t3[e4];
      });
    }(window.btoa(String.fromCharCode.apply(String, c([], a(Array.from(t2)), false))));
  };
  function Da(e2, t2) {
    return t2 === void 0 && (t2 = []), e2 && !t2.includes(e2) ? e2 : "";
  }
  var Ba = function(e2, t2) {
    return o(void 0, void 0, void 0, function() {
      var n2, r2;
      return i(this, function(o2) {
        switch (o2.label) {
          case 0:
            return [4, (i3 = e2, a3 = t2, a3 = a3 || {}, new Promise(function(e3, t3) {
              var n3 = new XMLHttpRequest(), r3 = [], o3 = [], c2 = {}, s2 = function() {
                return { ok: (n3.status / 100 | 0) == 2, statusText: n3.statusText, status: n3.status, url: n3.responseURL, text: function() {
                  return Promise.resolve(n3.responseText);
                }, json: function() {
                  return Promise.resolve(n3.responseText).then(JSON.parse);
                }, blob: function() {
                  return Promise.resolve(new Blob([n3.response]));
                }, clone: s2, headers: { keys: function() {
                  return r3;
                }, entries: function() {
                  return o3;
                }, get: function(e4) {
                  return c2[e4.toLowerCase()];
                }, has: function(e4) {
                  return e4.toLowerCase() in c2;
                } } };
              };
              for (var u3 in n3.open(a3.method || "get", i3, true), n3.onload = function() {
                n3.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e4, t4, n4) {
                  r3.push(t4 = t4.toLowerCase()), o3.push([t4, n4]), c2[t4] = c2[t4] ? c2[t4] + "," + n4 : n4;
                }), e3(s2());
              }, n3.onerror = t3, n3.withCredentials = a3.credentials == "include", a3.headers)
                n3.setRequestHeader(u3, a3.headers[u3]);
              n3.send(a3.body || null);
            }))];
          case 1:
            return n2 = o2.sent(), r2 = { ok: n2.ok }, [4, n2.json()];
          case 2:
            return [2, (r2.json = o2.sent(), r2)];
        }
        var i3, a3;
      });
    });
  };
  var za = function(e2, t2, n2) {
    return o(void 0, void 0, void 0, function() {
      var r2, o2;
      return i(this, function(i3) {
        return r2 = new AbortController(), t2.signal = r2.signal, [2, Promise.race([Ba(e2, t2), new Promise(function(e3, t3) {
          o2 = setTimeout(function() {
            r2.abort(), t3(new Error("Timeout when executing 'fetch'"));
          }, n2);
        })]).finally(function() {
          clearTimeout(o2);
        })];
      });
    });
  };
  var Ma = function(e2, t2, n2, r2, a3, c2, s2) {
    return o(void 0, void 0, void 0, function() {
      return i(this, function(o2) {
        return [2, (i3 = { auth: { audience: t2, scope: n2 }, timeout: a3, fetchUrl: e2, fetchOptions: r2, useFormData: s2 }, u3 = c2, new Promise(function(e3, t3) {
          var n3 = new MessageChannel();
          n3.port1.onmessage = function(n4) {
            n4.data.error ? t3(new Error(n4.data.error)) : e3(n4.data);
          }, u3.postMessage(i3, [n3.port2]);
        }))];
        var i3, u3;
      });
    });
  };
  var qa = function(e2, t2, n2, r2, a3, c2, s2) {
    return s2 === void 0 && (s2 = 1e4), o(void 0, void 0, void 0, function() {
      return i(this, function(o2) {
        return a3 ? [2, Ma(e2, t2, n2, r2, s2, a3, c2)] : [2, za(e2, r2, s2)];
      });
    });
  };
  function Qa(e2, t2, n2, a3, c2, s2, u3) {
    return o(this, void 0, void 0, function() {
      var o2, l2, f2, d2, h7, p3, y2, v2, m2;
      return i(this, function(i3) {
        switch (i3.label) {
          case 0:
            o2 = null, f2 = 0, i3.label = 1;
          case 1:
            if (!(f2 < 3))
              return [3, 6];
            i3.label = 2;
          case 2:
            return i3.trys.push([2, 4, , 5]), [4, qa(e2, n2, a3, c2, s2, u3, t2)];
          case 3:
            return l2 = i3.sent(), o2 = null, [3, 6];
          case 4:
            return d2 = i3.sent(), o2 = d2, [3, 5];
          case 5:
            return f2++, [3, 1];
          case 6:
            if (o2)
              throw o2.message = o2.message || "Failed to fetch", o2;
            if (h7 = l2.json, p3 = h7.error, y2 = h7.error_description, v2 = r(h7, ["error", "error_description"]), !l2.ok) {
              if (m2 = y2 || "HTTP error. Unable to fetch ".concat(e2), p3 === "mfa_required")
                throw new Za(p3, m2, v2.mfa_token);
              throw new ja(p3 || "request_error", m2);
            }
            return [2, v2];
        }
      });
    });
  }
  function $a(e2, t2) {
    var n2 = e2.baseUrl, a3 = e2.timeout, c2 = e2.audience, s2 = e2.scope, u3 = e2.auth0Client, l2 = e2.useFormData, f2 = r(e2, ["baseUrl", "timeout", "audience", "scope", "auth0Client", "useFormData"]);
    return o(this, void 0, void 0, function() {
      var e3;
      return i(this, function(r2) {
        switch (r2.label) {
          case 0:
            return e3 = l2 ? Na(f2) : JSON.stringify(f2), [4, Qa("".concat(n2, "/oauth/token"), a3, c2 || "default", s2, { method: "POST", body: e3, headers: { "Content-Type": l2 ? "application/x-www-form-urlencoded" : "application/json", "Auth0-Client": btoa(JSON.stringify(u3 || Ra)) } }, t2, l2)];
          case 1:
            return [2, r2.sent()];
        }
      });
    });
  }
  var ec = function(e2) {
    return Array.from(new Set(e2));
  };
  var tc = function() {
    for (var e2 = [], t2 = 0; t2 < arguments.length; t2++)
      e2[t2] = arguments[t2];
    return ec(e2.join(" ").trim().split(/\s+/)).join(" ");
  };
  var nc = function() {
    function e2(e3, t2) {
      t2 === void 0 && (t2 = "@@auth0spajs@@"), this.prefix = t2, this.client_id = e3.client_id, this.scope = e3.scope, this.audience = e3.audience;
    }
    return e2.prototype.toKey = function() {
      return "".concat(this.prefix, "::").concat(this.client_id, "::").concat(this.audience, "::").concat(this.scope);
    }, e2.fromKey = function(t2) {
      var n2 = a(t2.split("::"), 4), r2 = n2[0], o2 = n2[1], i3 = n2[2];
      return new e2({ client_id: o2, scope: n2[3], audience: i3 }, r2);
    }, e2.fromCacheEntry = function(t2) {
      return new e2({ scope: t2.scope, audience: t2.audience, client_id: t2.client_id });
    }, e2;
  }();
  var rc = function() {
    function e2() {
    }
    return e2.prototype.set = function(e3, t2) {
      localStorage.setItem(e3, JSON.stringify(t2));
    }, e2.prototype.get = function(e3) {
      var t2 = window.localStorage.getItem(e3);
      if (t2)
        try {
          return JSON.parse(t2);
        } catch (e4) {
          return;
        }
    }, e2.prototype.remove = function(e3) {
      localStorage.removeItem(e3);
    }, e2.prototype.allKeys = function() {
      return Object.keys(window.localStorage).filter(function(e3) {
        return e3.startsWith("@@auth0spajs@@");
      });
    }, e2;
  }();
  var oc = function() {
    var e2;
    this.enclosedCache = (e2 = {}, { set: function(t2, n2) {
      e2[t2] = n2;
    }, get: function(t2) {
      var n2 = e2[t2];
      if (n2)
        return n2;
    }, remove: function(t2) {
      delete e2[t2];
    }, allKeys: function() {
      return Object.keys(e2);
    } });
  };
  var ic = function() {
    function e2(e3, t2, n2) {
      this.cache = e3, this.keyManifest = t2, this.nowProvider = n2, this.nowProvider = this.nowProvider || Ea;
    }
    return e2.prototype.get = function(e3, t2) {
      var n2;
      return t2 === void 0 && (t2 = 0), o(this, void 0, void 0, function() {
        var r2, o2, a3, c2, s2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return [4, this.cache.get(e3.toKey())];
            case 1:
              return (r2 = i3.sent()) ? [3, 4] : [4, this.getCacheKeys()];
            case 2:
              return (o2 = i3.sent()) ? (a3 = this.matchExistingCacheKey(e3, o2)) ? [4, this.cache.get(a3)] : [3, 4] : [2];
            case 3:
              r2 = i3.sent(), i3.label = 4;
            case 4:
              return r2 ? [4, this.nowProvider()] : [2];
            case 5:
              return c2 = i3.sent(), s2 = Math.floor(c2 / 1e3), r2.expiresAt - t2 < s2 ? r2.body.refresh_token ? (r2.body = { refresh_token: r2.body.refresh_token }, [4, this.cache.set(e3.toKey(), r2)]) : [3, 7] : [3, 10];
            case 6:
              return i3.sent(), [2, r2.body];
            case 7:
              return [4, this.cache.remove(e3.toKey())];
            case 8:
              return i3.sent(), [4, (n2 = this.keyManifest) === null || n2 === void 0 ? void 0 : n2.remove(e3.toKey())];
            case 9:
              return i3.sent(), [2];
            case 10:
              return [2, r2.body];
          }
        });
      });
    }, e2.prototype.set = function(e3) {
      var t2;
      return o(this, void 0, void 0, function() {
        var n2, r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return n2 = new nc({ client_id: e3.client_id, scope: e3.scope, audience: e3.audience }), [4, this.wrapCacheEntry(e3)];
            case 1:
              return r2 = o2.sent(), [4, this.cache.set(n2.toKey(), r2)];
            case 2:
              return o2.sent(), [4, (t2 = this.keyManifest) === null || t2 === void 0 ? void 0 : t2.add(n2.toKey())];
            case 3:
              return o2.sent(), [2];
          }
        });
      });
    }, e2.prototype.clear = function(e3) {
      var t2;
      return o(this, void 0, void 0, function() {
        var n2, r2 = this;
        return i(this, function(a3) {
          switch (a3.label) {
            case 0:
              return [4, this.getCacheKeys()];
            case 1:
              return (n2 = a3.sent()) ? [4, n2.filter(function(t3) {
                return !e3 || t3.includes(e3);
              }).reduce(function(e4, t3) {
                return o(r2, void 0, void 0, function() {
                  return i(this, function(n3) {
                    switch (n3.label) {
                      case 0:
                        return [4, e4];
                      case 1:
                        return n3.sent(), [4, this.cache.remove(t3)];
                      case 2:
                        return n3.sent(), [2];
                    }
                  });
                });
              }, Promise.resolve())] : [2];
            case 2:
              return a3.sent(), [4, (t2 = this.keyManifest) === null || t2 === void 0 ? void 0 : t2.clear()];
            case 3:
              return a3.sent(), [2];
          }
        });
      });
    }, e2.prototype.clearSync = function(e3) {
      var t2 = this, n2 = this.cache.allKeys();
      n2 && n2.filter(function(t3) {
        return !e3 || t3.includes(e3);
      }).forEach(function(e4) {
        t2.cache.remove(e4);
      });
    }, e2.prototype.wrapCacheEntry = function(e3) {
      return o(this, void 0, void 0, function() {
        var t2, n2, r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return [4, this.nowProvider()];
            case 1:
              return t2 = o2.sent(), n2 = Math.floor(t2 / 1e3) + e3.expires_in, r2 = Math.min(n2, e3.decodedToken.claims.exp), [2, { body: e3, expiresAt: r2 }];
          }
        });
      });
    }, e2.prototype.getCacheKeys = function() {
      var e3;
      return o(this, void 0, void 0, function() {
        var t2;
        return i(this, function(n2) {
          switch (n2.label) {
            case 0:
              return this.keyManifest ? [4, this.keyManifest.get()] : [3, 2];
            case 1:
              return t2 = (e3 = n2.sent()) === null || e3 === void 0 ? void 0 : e3.keys, [3, 4];
            case 2:
              return [4, this.cache.allKeys()];
            case 3:
              t2 = n2.sent(), n2.label = 4;
            case 4:
              return [2, t2];
          }
        });
      });
    }, e2.prototype.matchExistingCacheKey = function(e3, t2) {
      return t2.filter(function(t3) {
        var n2 = nc.fromKey(t3), r2 = new Set(n2.scope && n2.scope.split(" ")), o2 = e3.scope.split(" "), i3 = n2.scope && o2.reduce(function(e4, t4) {
          return e4 && r2.has(t4);
        }, true);
        return n2.prefix === "@@auth0spajs@@" && n2.client_id === e3.client_id && n2.audience === e3.audience && i3;
      })[0];
    }, e2;
  }();
  var ac = function() {
    function e2(e3, t2) {
      this.storage = e3, this.clientId = t2, this.storageKey = "".concat("a0.spajs.txs", ".").concat(this.clientId), this.transaction = this.storage.get(this.storageKey);
    }
    return e2.prototype.create = function(e3) {
      this.transaction = e3, this.storage.save(this.storageKey, e3, { daysUntilExpire: 1 });
    }, e2.prototype.get = function() {
      return this.transaction;
    }, e2.prototype.remove = function() {
      delete this.transaction, this.storage.remove(this.storageKey);
    }, e2;
  }();
  var cc = function(e2) {
    return typeof e2 == "number";
  };
  var sc = ["iss", "aud", "exp", "nbf", "iat", "jti", "azp", "nonce", "auth_time", "at_hash", "c_hash", "acr", "amr", "sub_jwk", "cnf", "sip_from_tag", "sip_date", "sip_callid", "sip_cseq_num", "sip_via_branch", "orig", "dest", "mky", "events", "toe", "txn", "rph", "sid", "vot", "vtm"];
  var uc = function(e2) {
    if (!e2.id_token)
      throw new Error("ID token is required but missing");
    var t2 = function(e3) {
      var t3 = e3.split("."), n3 = a(t3, 3), r3 = n3[0], o3 = n3[1], i4 = n3[2];
      if (t3.length !== 3 || !r3 || !o3 || !i4)
        throw new Error("ID token could not be decoded");
      var c3 = JSON.parse(Ya(o3)), s2 = { __raw: e3 }, u3 = {};
      return Object.keys(c3).forEach(function(e4) {
        s2[e4] = c3[e4], sc.includes(e4) || (u3[e4] = c3[e4]);
      }), { encoded: { header: r3, payload: o3, signature: i4 }, header: JSON.parse(Ya(r3)), claims: s2, user: u3 };
    }(e2.id_token);
    if (!t2.claims.iss)
      throw new Error("Issuer (iss) claim must be a string present in the ID token");
    if (t2.claims.iss !== e2.iss)
      throw new Error('Issuer (iss) claim mismatch in the ID token; expected "'.concat(e2.iss, '", found "').concat(t2.claims.iss, '"'));
    if (!t2.user.sub)
      throw new Error("Subject (sub) claim must be a string present in the ID token");
    if (t2.header.alg !== "RS256")
      throw new Error('Signature algorithm of "'.concat(t2.header.alg, '" is not supported. Expected the ID token to be signed with "RS256".'));
    if (!t2.claims.aud || typeof t2.claims.aud != "string" && !Array.isArray(t2.claims.aud))
      throw new Error("Audience (aud) claim must be a string or array of strings present in the ID token");
    if (Array.isArray(t2.claims.aud)) {
      if (!t2.claims.aud.includes(e2.aud))
        throw new Error('Audience (aud) claim mismatch in the ID token; expected "'.concat(e2.aud, '" but was not one of "').concat(t2.claims.aud.join(", "), '"'));
      if (t2.claims.aud.length > 1) {
        if (!t2.claims.azp)
          throw new Error("Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values");
        if (t2.claims.azp !== e2.aud)
          throw new Error('Authorized Party (azp) claim mismatch in the ID token; expected "'.concat(e2.aud, '", found "').concat(t2.claims.azp, '"'));
      }
    } else if (t2.claims.aud !== e2.aud)
      throw new Error('Audience (aud) claim mismatch in the ID token; expected "'.concat(e2.aud, '" but found "').concat(t2.claims.aud, '"'));
    if (e2.nonce) {
      if (!t2.claims.nonce)
        throw new Error("Nonce (nonce) claim must be a string present in the ID token");
      if (t2.claims.nonce !== e2.nonce)
        throw new Error('Nonce (nonce) claim mismatch in the ID token; expected "'.concat(e2.nonce, '", found "').concat(t2.claims.nonce, '"'));
    }
    if (e2.max_age && !cc(t2.claims.auth_time))
      throw new Error("Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified");
    if (!cc(t2.claims.exp))
      throw new Error("Expiration Time (exp) claim must be a number present in the ID token");
    if (!cc(t2.claims.iat))
      throw new Error("Issued At (iat) claim must be a number present in the ID token");
    var n2 = e2.leeway || 60, r2 = new Date(e2.now || Date.now()), o2 = new Date(0), i3 = new Date(0), c2 = new Date(0);
    if (c2.setUTCSeconds(parseInt(t2.claims.auth_time) + e2.max_age + n2), o2.setUTCSeconds(t2.claims.exp + n2), i3.setUTCSeconds(t2.claims.nbf - n2), r2 > o2)
      throw new Error("Expiration Time (exp) claim error in the ID token; current time (".concat(r2, ") is after expiration time (").concat(o2, ")"));
    if (cc(t2.claims.nbf) && r2 < i3)
      throw new Error("Not Before time (nbf) claim in the ID token indicates that this token can't be used just yet. Currrent time (".concat(r2, ") is before ").concat(i3));
    if (cc(t2.claims.auth_time) && r2 > c2)
      throw new Error("Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Currrent time (".concat(r2, ") is after last auth at ").concat(c2));
    if (e2.organizationId) {
      if (!t2.claims.org_id)
        throw new Error("Organization ID (org_id) claim must be a string present in the ID token");
      if (e2.organizationId !== t2.claims.org_id)
        throw new Error('Organization ID (org_id) claim mismatch in the ID token; expected "'.concat(e2.organizationId, '", found "').concat(t2.claims.org_id, '"'));
    }
    return t2;
  };
  var lc = l(function(e2, t2) {
    var n2 = s && s.__assign || function() {
      return n2 = Object.assign || function(e3) {
        for (var t3, n3 = 1, r3 = arguments.length; n3 < r3; n3++)
          for (var o3 in t3 = arguments[n3])
            Object.prototype.hasOwnProperty.call(t3, o3) && (e3[o3] = t3[o3]);
        return e3;
      }, n2.apply(this, arguments);
    };
    function r2(e3, t3) {
      if (!t3)
        return "";
      var n3 = "; " + e3;
      return t3 === true ? n3 : n3 + "=" + t3;
    }
    function o2(e3, t3, n3) {
      return encodeURIComponent(e3).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/\(/g, "%28").replace(/\)/g, "%29") + "=" + encodeURIComponent(t3).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) + function(e4) {
        if (typeof e4.expires == "number") {
          var t4 = new Date();
          t4.setMilliseconds(t4.getMilliseconds() + 864e5 * e4.expires), e4.expires = t4;
        }
        return r2("Expires", e4.expires ? e4.expires.toUTCString() : "") + r2("Domain", e4.domain) + r2("Path", e4.path) + r2("Secure", e4.secure) + r2("SameSite", e4.sameSite);
      }(n3);
    }
    function i3(e3) {
      for (var t3 = {}, n3 = e3 ? e3.split("; ") : [], r3 = /(%[\dA-F]{2})+/gi, o3 = 0; o3 < n3.length; o3++) {
        var i4 = n3[o3].split("="), a4 = i4.slice(1).join("=");
        a4.charAt(0) === '"' && (a4 = a4.slice(1, -1));
        try {
          t3[i4[0].replace(r3, decodeURIComponent)] = a4.replace(r3, decodeURIComponent);
        } catch (e4) {
        }
      }
      return t3;
    }
    function a3() {
      return i3(document.cookie);
    }
    function c2(e3, t3, r3) {
      document.cookie = o2(e3, t3, n2({ path: "/" }, r3));
    }
    t2.__esModule = true, t2.encode = o2, t2.parse = i3, t2.getAll = a3, t2.get = function(e3) {
      return a3()[e3];
    }, t2.set = c2, t2.remove = function(e3, t3) {
      c2(e3, "", n2(n2({}, t3), { expires: -1 }));
    };
  });
  u(lc), lc.encode, lc.parse, lc.getAll;
  var fc = lc.get;
  var dc = lc.set;
  var hc = lc.remove;
  var pc = { get: function(e2) {
    var t2 = fc(e2);
    if (t2 !== void 0)
      return JSON.parse(t2);
  }, save: function(e2, t2, n2) {
    var r2 = {};
    window.location.protocol === "https:" && (r2 = { secure: true, sameSite: "none" }), (n2 == null ? void 0 : n2.daysUntilExpire) && (r2.expires = n2.daysUntilExpire), (n2 == null ? void 0 : n2.cookieDomain) && (r2.domain = n2.cookieDomain), dc(e2, JSON.stringify(t2), r2);
  }, remove: function(e2) {
    hc(e2);
  } };
  var yc = { get: function(e2) {
    var t2 = pc.get(e2);
    return t2 || pc.get("".concat("_legacy_").concat(e2));
  }, save: function(e2, t2, n2) {
    var r2 = {};
    window.location.protocol === "https:" && (r2 = { secure: true }), (n2 == null ? void 0 : n2.daysUntilExpire) && (r2.expires = n2.daysUntilExpire), dc("".concat("_legacy_").concat(e2), JSON.stringify(t2), r2), pc.save(e2, t2, n2);
  }, remove: function(e2) {
    pc.remove(e2), pc.remove("".concat("_legacy_").concat(e2));
  } };
  var vc = { get: function(e2) {
    if (typeof sessionStorage != "undefined") {
      var t2 = sessionStorage.getItem(e2);
      if (t2 !== void 0)
        return JSON.parse(t2);
    }
  }, save: function(e2, t2) {
    sessionStorage.setItem(e2, JSON.stringify(t2));
  }, remove: function(e2) {
    sessionStorage.removeItem(e2);
  } };
  function mc(e2, t2, n2) {
    var r2 = t2 === void 0 ? null : t2, o2 = function(e3, t3) {
      var n3 = atob(e3);
      if (t3) {
        for (var r3 = new Uint8Array(n3.length), o3 = 0, i4 = n3.length; o3 < i4; ++o3)
          r3[o3] = n3.charCodeAt(o3);
        return String.fromCharCode.apply(null, new Uint16Array(r3.buffer));
      }
      return n3;
    }(e2, n2 !== void 0 && n2), i3 = o2.indexOf("\n", 10) + 1, a3 = o2.substring(i3) + (r2 ? "//# sourceMappingURL=" + r2 : ""), c2 = new Blob([a3], { type: "application/javascript" });
    return URL.createObjectURL(c2);
  }
  var bc;
  var gc;
  var wc;
  var Sc;
  var kc = (bc = "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Ci8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKgogICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uCgogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55CiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuCgogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgKICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWQogICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULAogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NCiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUgogICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUgogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4KICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovdmFyIHQ9ZnVuY3Rpb24oZSxyKXtyZXR1cm4gdD1PYmplY3Quc2V0UHJvdG90eXBlT2Z8fHtfX3Byb3RvX186W119aW5zdGFuY2VvZiBBcnJheSYmZnVuY3Rpb24odCxlKXt0Ll9fcHJvdG9fXz1lfXx8ZnVuY3Rpb24odCxlKXtmb3IodmFyIHIgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxyKSYmKHRbcl09ZVtyXSl9LHQoZSxyKX07ZnVuY3Rpb24gZShlLHIpe2lmKCJmdW5jdGlvbiIhPXR5cGVvZiByJiZudWxsIT09cil0aHJvdyBuZXcgVHlwZUVycm9yKCJDbGFzcyBleHRlbmRzIHZhbHVlICIrU3RyaW5nKHIpKyIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbCIpO2Z1bmN0aW9uIG4oKXt0aGlzLmNvbnN0cnVjdG9yPWV9dChlLHIpLGUucHJvdG90eXBlPW51bGw9PT1yP09iamVjdC5jcmVhdGUocik6KG4ucHJvdG90eXBlPXIucHJvdG90eXBlLG5ldyBuKX12YXIgcj1mdW5jdGlvbigpe3JldHVybiByPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxyPTEsbj1hcmd1bWVudHMubGVuZ3RoO3I8bjtyKyspZm9yKHZhciBvIGluIGU9YXJndW1lbnRzW3JdKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLG8pJiYodFtvXT1lW29dKTtyZXR1cm4gdH0sci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O2Z1bmN0aW9uIG4odCxlLHIsbil7cmV0dXJuIG5ldyhyfHwocj1Qcm9taXNlKSkoKGZ1bmN0aW9uKG8sYyl7ZnVuY3Rpb24gaSh0KXt0cnl7cyhuLm5leHQodCkpfWNhdGNoKHQpe2ModCl9fWZ1bmN0aW9uIGEodCl7dHJ5e3Mobi50aHJvdyh0KSl9Y2F0Y2godCl7Yyh0KX19ZnVuY3Rpb24gcyh0KXt2YXIgZTt0LmRvbmU/byh0LnZhbHVlKTooZT10LnZhbHVlLGUgaW5zdGFuY2VvZiByP2U6bmV3IHIoKGZ1bmN0aW9uKHQpe3QoZSl9KSkpLnRoZW4oaSxhKX1zKChuPW4uYXBwbHkodCxlfHxbXSkpLm5leHQoKSl9KSl9ZnVuY3Rpb24gbyh0LGUpe3ZhciByLG4sbyxjLGk9e2xhYmVsOjAsc2VudDpmdW5jdGlvbigpe2lmKDEmb1swXSl0aHJvdyBvWzFdO3JldHVybiBvWzFdfSx0cnlzOltdLG9wczpbXX07cmV0dXJuIGM9e25leHQ6YSgwKSx0aHJvdzphKDEpLHJldHVybjphKDIpfSwiZnVuY3Rpb24iPT10eXBlb2YgU3ltYm9sJiYoY1tTeW1ib2wuaXRlcmF0b3JdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSxjO2Z1bmN0aW9uIGEoYyl7cmV0dXJuIGZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbihjKXtpZihyKXRocm93IG5ldyBUeXBlRXJyb3IoIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy4iKTtmb3IoO2k7KXRyeXtpZihyPTEsbiYmKG89MiZjWzBdP24ucmV0dXJuOmNbMF0/bi50aHJvd3x8KChvPW4ucmV0dXJuKSYmby5jYWxsKG4pLDApOm4ubmV4dCkmJiEobz1vLmNhbGwobixjWzFdKSkuZG9uZSlyZXR1cm4gbztzd2l0Y2gobj0wLG8mJihjPVsyJmNbMF0sby52YWx1ZV0pLGNbMF0pe2Nhc2UgMDpjYXNlIDE6bz1jO2JyZWFrO2Nhc2UgNDpyZXR1cm4gaS5sYWJlbCsrLHt2YWx1ZTpjWzFdLGRvbmU6ITF9O2Nhc2UgNTppLmxhYmVsKyssbj1jWzFdLGM9WzBdO2NvbnRpbnVlO2Nhc2UgNzpjPWkub3BzLnBvcCgpLGkudHJ5cy5wb3AoKTtjb250aW51ZTtkZWZhdWx0OmlmKCEobz1pLnRyeXMsKG89by5sZW5ndGg+MCYmb1tvLmxlbmd0aC0xXSl8fDYhPT1jWzBdJiYyIT09Y1swXSkpe2k9MDtjb250aW51ZX1pZigzPT09Y1swXSYmKCFvfHxjWzFdPm9bMF0mJmNbMV08b1szXSkpe2kubGFiZWw9Y1sxXTticmVha31pZig2PT09Y1swXSYmaS5sYWJlbDxvWzFdKXtpLmxhYmVsPW9bMV0sbz1jO2JyZWFrfWlmKG8mJmkubGFiZWw8b1syXSl7aS5sYWJlbD1vWzJdLGkub3BzLnB1c2goYyk7YnJlYWt9b1syXSYmaS5vcHMucG9wKCksaS50cnlzLnBvcCgpO2NvbnRpbnVlfWM9ZS5jYWxsKHQsaSl9Y2F0Y2godCl7Yz1bNix0XSxuPTB9ZmluYWxseXtyPW89MH1pZig1JmNbMF0pdGhyb3cgY1sxXTtyZXR1cm57dmFsdWU6Y1swXT9jWzFdOnZvaWQgMCxkb25lOiEwfX0oW2MsYV0pfX19ZnVuY3Rpb24gYyh0LGUpe3JldHVybiB2b2lkIDA9PT1lJiYoZT1bXSksdCYmIWUuaW5jbHVkZXModCk/dDoiIn12YXIgaT1mdW5jdGlvbih0KXtmdW5jdGlvbiByKGUsbil7dmFyIG89dC5jYWxsKHRoaXMsbil8fHRoaXM7cmV0dXJuIG8uZXJyb3I9ZSxvLmVycm9yX2Rlc2NyaXB0aW9uPW4sT2JqZWN0LnNldFByb3RvdHlwZU9mKG8sci5wcm90b3R5cGUpLG99cmV0dXJuIGUocix0KSxyLmZyb21QYXlsb2FkPWZ1bmN0aW9uKHQpe3JldHVybiBuZXcgcih0LmVycm9yLHQuZXJyb3JfZGVzY3JpcHRpb24pfSxyfShFcnJvcik7IWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoZSxuLG8sYyl7dm9pZCAwPT09YyYmKGM9bnVsbCk7dmFyIGk9dC5jYWxsKHRoaXMsZSxuKXx8dGhpcztyZXR1cm4gaS5zdGF0ZT1vLGkuYXBwU3RhdGU9YyxPYmplY3Quc2V0UHJvdG90eXBlT2YoaSxyLnByb3RvdHlwZSksaX1lKHIsdCl9KGkpLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoZSl7dmFyIG49dC5jYWxsKHRoaXMpfHx0aGlzO3JldHVybiBuLnBvcHVwPWUsT2JqZWN0LnNldFByb3RvdHlwZU9mKG4sci5wcm90b3R5cGUpLG59ZShyLHQpfShmdW5jdGlvbih0KXtmdW5jdGlvbiByKCl7dmFyIGU9dC5jYWxsKHRoaXMsInRpbWVvdXQiLCJUaW1lb3V0Iil8fHRoaXM7cmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihlLHIucHJvdG90eXBlKSxlfXJldHVybiBlKHIsdCkscn0oaSkpLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoZSl7dmFyIG49dC5jYWxsKHRoaXMsImNhbmNlbGxlZCIsIlBvcHVwIGNsb3NlZCIpfHx0aGlzO3JldHVybiBuLnBvcHVwPWUsT2JqZWN0LnNldFByb3RvdHlwZU9mKG4sci5wcm90b3R5cGUpLG59ZShyLHQpfShpKSxmdW5jdGlvbih0KXtmdW5jdGlvbiByKGUsbixvKXt2YXIgYz10LmNhbGwodGhpcyxlLG4pfHx0aGlzO3JldHVybiBjLm1mYV90b2tlbj1vLE9iamVjdC5zZXRQcm90b3R5cGVPZihjLHIucHJvdG90eXBlKSxjfWUocix0KX0oaSk7dmFyIGE9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gcihlLG4pe3ZhciBvPXQuY2FsbCh0aGlzLCJtaXNzaW5nX3JlZnJlc2hfdG9rZW4iLCJNaXNzaW5nIFJlZnJlc2ggVG9rZW4gKGF1ZGllbmNlOiAnIi5jb25jYXQoYyhlLFsiZGVmYXVsdCJdKSwiJywgc2NvcGU6ICciKS5jb25jYXQoYyhuKSwiJykiKSl8fHRoaXM7cmV0dXJuIG8uYXVkaWVuY2U9ZSxvLnNjb3BlPW4sT2JqZWN0LnNldFByb3RvdHlwZU9mKG8sci5wcm90b3R5cGUpLG99cmV0dXJuIGUocix0KSxyfShpKSxzPXt9LHU9ZnVuY3Rpb24odCxlKXtyZXR1cm4iIi5jb25jYXQodCwifCIpLmNvbmNhdChlKX07YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0YSxjPWUudGltZW91dCxpPWUuYXV0aCxmPWUuZmV0Y2hVcmwsbD1lLmZldGNoT3B0aW9ucyxwPWUudXNlRm9ybURhdGEsaD1mdW5jdGlvbih0LGUpe3ZhciByPSJmdW5jdGlvbiI9PXR5cGVvZiBTeW1ib2wmJnRbU3ltYm9sLml0ZXJhdG9yXTtpZighcilyZXR1cm4gdDt2YXIgbixvLGM9ci5jYWxsKHQpLGk9W107dHJ5e2Zvcig7KHZvaWQgMD09PWV8fGUtLSA+MCkmJiEobj1jLm5leHQoKSkuZG9uZTspaS5wdXNoKG4udmFsdWUpfWNhdGNoKHQpe289e2Vycm9yOnR9fWZpbmFsbHl7dHJ5e24mJiFuLmRvbmUmJihyPWMucmV0dXJuKSYmci5jYWxsKGMpfWZpbmFsbHl7aWYobyl0aHJvdyBvLmVycm9yfX1yZXR1cm4gaX0odC5wb3J0cywxKVswXTtyZXR1cm4gbih2b2lkIDAsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24oKXt2YXIgdCxlLG4seSx2LGIsZCx3LE8sXztyZXR1cm4gbyh0aGlzLChmdW5jdGlvbihvKXtzd2l0Y2goby5sYWJlbCl7Y2FzZSAwOm49KGU9aXx8e30pLmF1ZGllbmNlLHk9ZS5zY29wZSxvLmxhYmVsPTE7Y2FzZSAxOmlmKG8udHJ5cy5wdXNoKFsxLDcsLDhdKSwhKHY9cD8obT1sLmJvZHksaz1uZXcgVVJMU2VhcmNoUGFyYW1zKG0pLFA9e30say5mb3JFYWNoKChmdW5jdGlvbih0LGUpe1BbZV09dH0pKSxQKTpKU09OLnBhcnNlKGwuYm9keSkpLnJlZnJlc2hfdG9rZW4mJiJyZWZyZXNoX3Rva2VuIj09PXYuZ3JhbnRfdHlwZSl7aWYoYj1mdW5jdGlvbih0LGUpe3JldHVybiBzW3UodCxlKV19KG4seSksIWIpdGhyb3cgbmV3IGEobix5KTtsLmJvZHk9cD9uZXcgVVJMU2VhcmNoUGFyYW1zKHIocih7fSx2KSx7cmVmcmVzaF90b2tlbjpifSkpLnRvU3RyaW5nKCk6SlNPTi5zdHJpbmdpZnkocihyKHt9LHYpLHtyZWZyZXNoX3Rva2VuOmJ9KSl9ZD12b2lkIDAsImZ1bmN0aW9uIj09dHlwZW9mIEFib3J0Q29udHJvbGxlciYmKGQ9bmV3IEFib3J0Q29udHJvbGxlcixsLnNpZ25hbD1kLnNpZ25hbCksdz12b2lkIDAsby5sYWJlbD0yO2Nhc2UgMjpyZXR1cm4gby50cnlzLnB1c2goWzIsNCwsNV0pLFs0LFByb21pc2UucmFjZShbKGc9YyxuZXcgUHJvbWlzZSgoZnVuY3Rpb24odCl7cmV0dXJuIHNldFRpbWVvdXQodCxnKX0pKSksZmV0Y2goZixyKHt9LGwpKV0pXTtjYXNlIDM6cmV0dXJuIHc9by5zZW50KCksWzMsNV07Y2FzZSA0OnJldHVybiBPPW8uc2VudCgpLGgucG9zdE1lc3NhZ2Uoe2Vycm9yOk8ubWVzc2FnZX0pLFsyXTtjYXNlIDU6cmV0dXJuIHc/WzQsdy5qc29uKCldOihkJiZkLmFib3J0KCksaC5wb3N0TWVzc2FnZSh7ZXJyb3I6IlRpbWVvdXQgd2hlbiBleGVjdXRpbmcgJ2ZldGNoJyJ9KSxbMl0pO2Nhc2UgNjpyZXR1cm4odD1vLnNlbnQoKSkucmVmcmVzaF90b2tlbj8oZnVuY3Rpb24odCxlLHIpe3NbdShlLHIpXT10fSh0LnJlZnJlc2hfdG9rZW4sbix5KSxkZWxldGUgdC5yZWZyZXNoX3Rva2VuKTpmdW5jdGlvbih0LGUpe2RlbGV0ZSBzW3UodCxlKV19KG4seSksaC5wb3N0TWVzc2FnZSh7b2s6dy5vayxqc29uOnR9KSxbMyw4XTtjYXNlIDc6cmV0dXJuIF89by5zZW50KCksaC5wb3N0TWVzc2FnZSh7b2s6ITEsanNvbjp7ZXJyb3JfZGVzY3JpcHRpb246Xy5tZXNzYWdlfX0pLFszLDhdO2Nhc2UgODpyZXR1cm5bMl19dmFyIGcsbSxrLFB9KSl9KSl9KSl9KCk7Cgo=", gc = null, wc = false, function(e2) {
    return Sc = Sc || mc(bc, gc, wc), new Worker(Sc, e2);
  });
  var _c = {};
  var Ic = function() {
    function e2(e3, t2) {
      this.cache = e3, this.clientId = t2, this.manifestKey = this.createManifestKeyFrom(this.clientId);
    }
    return e2.prototype.add = function(e3) {
      var t2;
      return o(this, void 0, void 0, function() {
        var n2, r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return r2 = Set.bind, [4, this.cache.get(this.manifestKey)];
            case 1:
              return (n2 = new (r2.apply(Set, [void 0, ((t2 = o2.sent()) === null || t2 === void 0 ? void 0 : t2.keys) || []]))()).add(e3), [4, this.cache.set(this.manifestKey, { keys: c([], a(n2), false) })];
            case 2:
              return o2.sent(), [2];
          }
        });
      });
    }, e2.prototype.remove = function(e3) {
      return o(this, void 0, void 0, function() {
        var t2, n2;
        return i(this, function(r2) {
          switch (r2.label) {
            case 0:
              return [4, this.cache.get(this.manifestKey)];
            case 1:
              return (t2 = r2.sent()) ? ((n2 = new Set(t2.keys)).delete(e3), n2.size > 0 ? [4, this.cache.set(this.manifestKey, { keys: c([], a(n2), false) })] : [3, 3]) : [3, 5];
            case 2:
            case 4:
              return [2, r2.sent()];
            case 3:
              return [4, this.cache.remove(this.manifestKey)];
            case 5:
              return [2];
          }
        });
      });
    }, e2.prototype.get = function() {
      return this.cache.get(this.manifestKey);
    }, e2.prototype.clear = function() {
      return this.cache.remove(this.manifestKey);
    }, e2.prototype.createManifestKeyFrom = function(e3) {
      return "".concat("@@auth0spajs@@", "::").concat(e3);
    }, e2;
  }();
  var Tc = new Oa();
  var Oc = { memory: function() {
    return new oc().enclosedCache;
  }, localstorage: function() {
    return new rc();
  } };
  var xc = function(e2) {
    return Oc[e2];
  };
  var Cc = function() {
    return !/Trident.*rv:11\.0/.test(navigator.userAgent);
  };
  var Rc = function() {
    function e2(e3) {
      var t2, n2, o2, i3;
      if (this.options = e3, typeof window != "undefined" && function() {
        if (!Pa())
          throw new Error("For security reasons, `window.crypto` is required to run `auth0-spa-js`.");
        if (Aa() === void 0)
          throw new Error("\n      auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/master/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.\n    ");
      }(), e3.cache && e3.cacheLocation && console.warn("Both `cache` and `cacheLocation` options have been specified in the Auth0Client configuration; ignoring `cacheLocation` and using `cache`."), e3.cache)
        o2 = e3.cache;
      else {
        if (this.cacheLocation = e3.cacheLocation || "memory", !xc(this.cacheLocation))
          throw new Error('Invalid cache location "'.concat(this.cacheLocation, '"'));
        o2 = xc(this.cacheLocation)();
      }
      this.httpTimeoutMs = e3.httpTimeoutInSeconds ? 1e3 * e3.httpTimeoutInSeconds : 1e4, this.cookieStorage = e3.legacySameSiteCookie === false ? pc : yc, this.orgHintCookieName = (i3 = this.options.client_id, "auth0.".concat(i3, ".organization_hint")), this.isAuthenticatedCookieName = function(e4) {
        return "auth0.".concat(e4, ".is.authenticated");
      }(this.options.client_id), this.sessionCheckExpiryDays = e3.sessionCheckExpiryDays || 1;
      var a3, c2 = e3.useCookiesForTransactions ? this.cookieStorage : vc;
      this.scope = this.options.scope, this.transactionManager = new ac(c2, this.options.client_id), this.nowProvider = this.options.nowProvider || Ea, this.cacheManager = new ic(o2, o2.allKeys ? null : new Ic(o2, this.options.client_id), this.nowProvider), this.domainUrl = (a3 = this.options.domain, /^https?:\/\//.test(a3) ? a3 : "https://".concat(a3)), this.tokenIssuer = function(e4, t3) {
        return e4 ? e4.startsWith("https://") ? e4 : "https://".concat(e4, "/") : "".concat(t3, "/");
      }(this.options.issuer, this.domainUrl), this.defaultScope = tc("openid", ((n2 = (t2 = this.options) === null || t2 === void 0 ? void 0 : t2.advancedOptions) === null || n2 === void 0 ? void 0 : n2.defaultScope) !== void 0 ? this.options.advancedOptions.defaultScope : "openid profile email"), this.options.useRefreshTokens && (this.scope = tc(this.scope, "offline_access")), typeof window != "undefined" && window.Worker && this.options.useRefreshTokens && this.cacheLocation === "memory" && Cc() && (this.worker = new kc()), this.customOptions = function(e4) {
        return e4.advancedOptions, e4.audience, e4.auth0Client, e4.authorizeTimeoutInSeconds, e4.cacheLocation, e4.client_id, e4.domain, e4.issuer, e4.leeway, e4.max_age, e4.redirect_uri, e4.scope, e4.useRefreshTokens, e4.useCookiesForTransactions, e4.useFormData, r(e4, ["advancedOptions", "audience", "auth0Client", "authorizeTimeoutInSeconds", "cacheLocation", "client_id", "domain", "issuer", "leeway", "max_age", "redirect_uri", "scope", "useRefreshTokens", "useCookiesForTransactions", "useFormData"]);
      }(e3), this.useRefreshTokensFallback = this.options.useRefreshTokensFallback !== false;
    }
    return e2.prototype._url = function(e3) {
      var t2 = encodeURIComponent(btoa(JSON.stringify(this.options.auth0Client || Ra)));
      return "".concat(this.domainUrl).concat(e3, "&auth0Client=").concat(t2);
    }, e2.prototype._getParams = function(e3, t2, o2, i3, a3) {
      var c2 = this.options;
      c2.useRefreshTokens, c2.useCookiesForTransactions, c2.useFormData, c2.auth0Client, c2.cacheLocation, c2.advancedOptions, c2.detailedResponse, c2.nowProvider, c2.authorizeTimeoutInSeconds, c2.legacySameSiteCookie, c2.sessionCheckExpiryDays, c2.domain, c2.leeway, c2.httpTimeoutInSeconds;
      var s2 = r(c2, ["useRefreshTokens", "useCookiesForTransactions", "useFormData", "auth0Client", "cacheLocation", "advancedOptions", "detailedResponse", "nowProvider", "authorizeTimeoutInSeconds", "legacySameSiteCookie", "sessionCheckExpiryDays", "domain", "leeway", "httpTimeoutInSeconds"]);
      return n(n(n({}, s2), e3), { scope: tc(this.defaultScope, this.scope, e3.scope), response_type: "code", response_mode: "query", state: t2, nonce: o2, redirect_uri: a3 || this.options.redirect_uri, code_challenge: i3, code_challenge_method: "S256" });
    }, e2.prototype._authorizeUrl = function(e3) {
      return this._url("/authorize?".concat(Na(e3)));
    }, e2.prototype._verifyIdToken = function(e3, t2, n2) {
      return o(this, void 0, void 0, function() {
        var r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return [4, this.nowProvider()];
            case 1:
              return r2 = o2.sent(), [2, uc({ iss: this.tokenIssuer, aud: this.options.client_id, id_token: e3, nonce: t2, organizationId: n2, leeway: this.options.leeway, max_age: this._parseNumber(this.options.max_age), now: r2 })];
          }
        });
      });
    }, e2.prototype._parseNumber = function(e3) {
      return typeof e3 != "string" ? e3 : parseInt(e3, 10) || void 0;
    }, e2.prototype._processOrgIdHint = function(e3) {
      e3 ? this.cookieStorage.save(this.orgHintCookieName, e3, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }) : this.cookieStorage.remove(this.orgHintCookieName);
    }, e2.prototype.buildAuthorizeUrl = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, o2, a3, c2, s2, u3, l2, f2, d2, h7, p3, y2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return t2 = e3.redirect_uri, o2 = e3.appState, a3 = r(e3, ["redirect_uri", "appState"]), c2 = Va(Xa()), s2 = Va(Xa()), u3 = Xa(), [4, Ja(u3)];
            case 1:
              return l2 = i3.sent(), f2 = Ha(l2), d2 = e3.fragment ? "#".concat(e3.fragment) : "", h7 = this._getParams(a3, c2, s2, f2, t2), p3 = this._authorizeUrl(h7), y2 = e3.organization || this.options.organization, this.transactionManager.create(n({ nonce: s2, code_verifier: u3, appState: o2, scope: h7.scope, audience: h7.audience || "default", redirect_uri: h7.redirect_uri, state: c2 }, y2 && { organizationId: y2 })), [2, p3 + d2];
          }
        });
      });
    }, e2.prototype.loginWithPopup = function(e3, t2) {
      return o(this, void 0, void 0, function() {
        var o2, a3, c2, s2, u3, l2, f2, d2, h7, p3, y2, v2, m2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              if (e3 = e3 || {}, !(t2 = t2 || {}).popup && (t2.popup = function(e4) {
                var t3 = window.screenX + (window.innerWidth - 400) / 2, n2 = window.screenY + (window.innerHeight - 600) / 2;
                return window.open(e4, "auth0:authorize:popup", "left=".concat(t3, ",top=").concat(n2, ",width=").concat(400, ",height=").concat(600, ",resizable,scrollbars=yes,status=1"));
              }(""), !t2.popup))
                throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
              return o2 = r(e3, []), a3 = Va(Xa()), c2 = Va(Xa()), s2 = Xa(), [4, Ja(s2)];
            case 1:
              return u3 = i3.sent(), l2 = Ha(u3), f2 = this._getParams(o2, a3, c2, l2, this.options.redirect_uri || window.location.origin), d2 = this._authorizeUrl(n(n({}, f2), { response_mode: "web_message" })), t2.popup.location.href = d2, [4, Ga(n(n({}, t2), { timeoutInSeconds: t2.timeoutInSeconds || this.options.authorizeTimeoutInSeconds || 60 }))];
            case 2:
              if (h7 = i3.sent(), a3 !== h7.state)
                throw new Error("Invalid state");
              return [4, $a({ audience: f2.audience, scope: f2.scope, baseUrl: this.domainUrl, client_id: this.options.client_id, code_verifier: s2, code: h7.code, grant_type: "authorization_code", redirect_uri: f2.redirect_uri, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs }, this.worker)];
            case 3:
              return p3 = i3.sent(), y2 = e3.organization || this.options.organization, [4, this._verifyIdToken(p3.id_token, c2, y2)];
            case 4:
              return v2 = i3.sent(), m2 = n(n({}, p3), { decodedToken: v2, scope: f2.scope, audience: f2.audience || "default", client_id: this.options.client_id }), [4, this.cacheManager.set(m2)];
            case 5:
              return i3.sent(), this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this._processOrgIdHint(v2.claims.org_id), [2];
          }
        });
      });
    }, e2.prototype.getUser = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, n2, r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return t2 = e3.audience || this.options.audience || "default", n2 = tc(this.defaultScope, this.scope, e3.scope), [4, this.cacheManager.get(new nc({ client_id: this.options.client_id, audience: t2, scope: n2 }))];
            case 1:
              return [2, (r2 = o2.sent()) && r2.decodedToken && r2.decodedToken.user];
          }
        });
      });
    }, e2.prototype.getIdTokenClaims = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, n2, r2;
        return i(this, function(o2) {
          switch (o2.label) {
            case 0:
              return t2 = e3.audience || this.options.audience || "default", n2 = tc(this.defaultScope, this.scope, e3.scope), [4, this.cacheManager.get(new nc({ client_id: this.options.client_id, audience: t2, scope: n2 }))];
            case 1:
              return [2, (r2 = o2.sent()) && r2.decodedToken && r2.decodedToken.claims];
          }
        });
      });
    }, e2.prototype.loginWithRedirect = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, n2, o2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return t2 = e3.redirectMethod, n2 = r(e3, ["redirectMethod"]), [4, this.buildAuthorizeUrl(n2)];
            case 1:
              return o2 = i3.sent(), window.location[t2 || "assign"](o2), [2];
          }
        });
      });
    }, e2.prototype.handleRedirectCallback = function(e3) {
      return e3 === void 0 && (e3 = window.location.href), o(this, void 0, void 0, function() {
        var t2, r2, o2, c2, s2, u3, l2, f2, d2, h7;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              if ((t2 = e3.split("?").slice(1)).length === 0)
                throw new Error("There are no query params available for parsing.");
              if (r2 = function(e4) {
                e4.indexOf("#") > -1 && (e4 = e4.substr(0, e4.indexOf("#")));
                var t3 = e4.split("&"), n2 = {};
                return t3.forEach(function(e5) {
                  var t4 = a(e5.split("="), 2), r3 = t4[0], o3 = t4[1];
                  n2[r3] = decodeURIComponent(o3);
                }), n2.expires_in && (n2.expires_in = parseInt(n2.expires_in)), n2;
              }(t2.join("")), o2 = r2.state, c2 = r2.code, s2 = r2.error, u3 = r2.error_description, !(l2 = this.transactionManager.get()))
                throw new Error("Invalid state");
              if (this.transactionManager.remove(), s2)
                throw new Ka(s2, u3, o2, l2.appState);
              if (!l2.code_verifier || l2.state && l2.state !== o2)
                throw new Error("Invalid state");
              return f2 = { audience: l2.audience, scope: l2.scope, baseUrl: this.domainUrl, client_id: this.options.client_id, code_verifier: l2.code_verifier, grant_type: "authorization_code", code: c2, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs }, l2.redirect_uri !== void 0 && (f2.redirect_uri = l2.redirect_uri), [4, $a(f2, this.worker)];
            case 1:
              return d2 = i3.sent(), [4, this._verifyIdToken(d2.id_token, l2.nonce, l2.organizationId)];
            case 2:
              return h7 = i3.sent(), [4, this.cacheManager.set(n(n(n(n({}, d2), { decodedToken: h7, audience: l2.audience, scope: l2.scope }), d2.scope ? { oauthTokenScope: d2.scope } : null), { client_id: this.options.client_id }))];
            case 3:
              return i3.sent(), this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this._processOrgIdHint(h7.claims.org_id), [2, { appState: l2.appState }];
          }
        });
      });
    }, e2.prototype.checkSession = function(e3) {
      return o(this, void 0, void 0, function() {
        var t2;
        return i(this, function(n2) {
          switch (n2.label) {
            case 0:
              if (!this.cookieStorage.get(this.isAuthenticatedCookieName)) {
                if (!this.cookieStorage.get("auth0.is.authenticated"))
                  return [2];
                this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove("auth0.is.authenticated");
              }
              n2.label = 1;
            case 1:
              return n2.trys.push([1, 3, , 4]), [4, this.getTokenSilently(e3)];
            case 2:
              return n2.sent(), [3, 4];
            case 3:
              if (t2 = n2.sent(), !Ca.includes(t2.error))
                throw t2;
              return [3, 4];
            case 4:
              return [2];
          }
        });
      });
    }, e2.prototype.getTokenSilently = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, o2, a3, c2 = this;
        return i(this, function(i3) {
          return t2 = n(n({ audience: this.options.audience, ignoreCache: false }, e3), { scope: tc(this.defaultScope, this.scope, e3.scope) }), o2 = t2.ignoreCache, a3 = r(t2, ["ignoreCache"]), [2, (s2 = function() {
            return c2._getTokenSilently(n({ ignoreCache: o2 }, a3));
          }, u3 = "".concat(this.options.client_id, "::").concat(a3.audience, "::").concat(a3.scope), l2 = _c[u3], l2 || (l2 = s2().finally(function() {
            delete _c[u3], l2 = null;
          }), _c[u3] = l2), l2)];
          var s2, u3, l2;
        });
      });
    }, e2.prototype._getTokenSilently = function(e3) {
      return e3 === void 0 && (e3 = {}), o(this, void 0, void 0, function() {
        var t2, a3, c2, s2, u3, l2, f2, d2, h7;
        return i(this, function(p3) {
          switch (p3.label) {
            case 0:
              return t2 = e3.ignoreCache, a3 = r(e3, ["ignoreCache"]), t2 ? [3, 2] : [4, this._getEntryFromCache({ scope: a3.scope, audience: a3.audience || "default", client_id: this.options.client_id, getDetailedEntry: e3.detailedResponse })];
            case 1:
              if (c2 = p3.sent())
                return [2, c2];
              p3.label = 2;
            case 2:
              return [4, (y2 = function() {
                return Tc.acquireLock("auth0.lock.getTokenSilently", 5e3);
              }, v2 = 10, v2 === void 0 && (v2 = 3), o(void 0, void 0, void 0, function() {
                var e4;
                return i(this, function(t3) {
                  switch (t3.label) {
                    case 0:
                      e4 = 0, t3.label = 1;
                    case 1:
                      return e4 < v2 ? [4, y2()] : [3, 4];
                    case 2:
                      if (t3.sent())
                        return [2, true];
                      t3.label = 3;
                    case 3:
                      return e4++, [3, 1];
                    case 4:
                      return [2, false];
                  }
                });
              }))];
            case 3:
              if (!p3.sent())
                return [3, 15];
              p3.label = 4;
            case 4:
              return p3.trys.push([4, , 12, 14]), t2 ? [3, 6] : [4, this._getEntryFromCache({ scope: a3.scope, audience: a3.audience || "default", client_id: this.options.client_id, getDetailedEntry: e3.detailedResponse })];
            case 5:
              if (c2 = p3.sent())
                return [2, c2];
              p3.label = 6;
            case 6:
              return this.options.useRefreshTokens ? [4, this._getTokenUsingRefreshToken(a3)] : [3, 8];
            case 7:
              return u3 = p3.sent(), [3, 10];
            case 8:
              return [4, this._getTokenFromIFrame(a3)];
            case 9:
              u3 = p3.sent(), p3.label = 10;
            case 10:
              return s2 = u3, [4, this.cacheManager.set(n({ client_id: this.options.client_id }, s2))];
            case 11:
              return p3.sent(), this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), e3.detailedResponse ? (l2 = s2.id_token, f2 = s2.access_token, d2 = s2.oauthTokenScope, h7 = s2.expires_in, [2, n(n({ id_token: l2, access_token: f2 }, d2 ? { scope: d2 } : null), { expires_in: h7 })]) : [2, s2.access_token];
            case 12:
              return [4, Tc.releaseLock("auth0.lock.getTokenSilently")];
            case 13:
              return p3.sent(), [7];
            case 14:
              return [3, 16];
            case 15:
              throw new Ua();
            case 16:
              return [2];
          }
          var y2, v2;
        });
      });
    }, e2.prototype.getTokenWithPopup = function(e3, t2) {
      return e3 === void 0 && (e3 = {}), t2 === void 0 && (t2 = {}), o(this, void 0, void 0, function() {
        return i(this, function(r2) {
          switch (r2.label) {
            case 0:
              return e3.audience = e3.audience || this.options.audience, e3.scope = tc(this.defaultScope, this.scope, e3.scope), t2 = n(n({}, xa), t2), [4, this.loginWithPopup(e3, t2)];
            case 1:
              return r2.sent(), [4, this.cacheManager.get(new nc({ scope: e3.scope, audience: e3.audience || "default", client_id: this.options.client_id }))];
            case 2:
              return [2, r2.sent().access_token];
          }
        });
      });
    }, e2.prototype.isAuthenticated = function() {
      return o(this, void 0, void 0, function() {
        return i(this, function(e3) {
          switch (e3.label) {
            case 0:
              return [4, this.getUser()];
            case 1:
              return [2, !!e3.sent()];
          }
        });
      });
    }, e2.prototype.buildLogoutUrl = function(e3) {
      e3 === void 0 && (e3 = {}), e3.client_id !== null ? e3.client_id = e3.client_id || this.options.client_id : delete e3.client_id;
      var t2 = e3.federated, n2 = r(e3, ["federated"]), o2 = t2 ? "&federated" : "";
      return this._url("/v2/logout?".concat(Na(n2))) + o2;
    }, e2.prototype.logout = function(e3) {
      var t2 = this;
      e3 === void 0 && (e3 = {});
      var n2 = e3.localOnly, o2 = r(e3, ["localOnly"]);
      if (n2 && o2.federated)
        throw new Error("It is invalid to set both the `federated` and `localOnly` options to `true`");
      var i3 = function() {
        if (t2.cookieStorage.remove(t2.orgHintCookieName), t2.cookieStorage.remove(t2.isAuthenticatedCookieName), !n2) {
          var e4 = t2.buildLogoutUrl(o2);
          window.location.assign(e4);
        }
      };
      if (this.options.cache)
        return this.cacheManager.clear().then(function() {
          return i3();
        });
      this.cacheManager.clearSync(), i3();
    }, e2.prototype._getTokenFromIFrame = function(e3) {
      return o(this, void 0, void 0, function() {
        var t2, o2, a3, c2, s2, u3, l2, f2, d2, h7, p3, y2, v2, m2, b3, g2, w2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return t2 = Va(Xa()), o2 = Va(Xa()), a3 = Xa(), [4, Ja(a3)];
            case 1:
              c2 = i3.sent(), s2 = Ha(c2), u3 = r(e3, ["detailedResponse"]), l2 = this._getParams(u3, t2, o2, s2, e3.redirect_uri || this.options.redirect_uri || window.location.origin), (f2 = this.cookieStorage.get(this.orgHintCookieName)) && !l2.organization && (l2.organization = f2), d2 = this._authorizeUrl(n(n({}, l2), { prompt: "none", response_mode: "web_message" })), i3.label = 2;
            case 2:
              if (i3.trys.push([2, 6, , 7]), window.crossOriginIsolated)
                throw new ja("login_required", "The application is running in a Cross-Origin Isolated context, silently retrieving a token without refresh token is not possible.");
              return h7 = e3.timeoutInSeconds || this.options.authorizeTimeoutInSeconds, [4, (S2 = d2, k2 = this.domainUrl, _2 = h7, _2 === void 0 && (_2 = 60), new Promise(function(e4, t3) {
                var n2 = window.document.createElement("iframe");
                n2.setAttribute("width", "0"), n2.setAttribute("height", "0"), n2.style.display = "none";
                var r2, o3 = function() {
                  window.document.body.contains(n2) && (window.document.body.removeChild(n2), window.removeEventListener("message", r2, false));
                }, i4 = setTimeout(function() {
                  t3(new Ua()), o3();
                }, 1e3 * _2);
                r2 = function(n3) {
                  if (n3.origin == k2 && n3.data && n3.data.type === "authorization_response") {
                    var a4 = n3.source;
                    a4 && a4.close(), n3.data.response.error ? t3(ja.fromPayload(n3.data.response)) : e4(n3.data.response), clearTimeout(i4), window.removeEventListener("message", r2, false), setTimeout(o3, 2e3);
                  }
                }, window.addEventListener("message", r2, false), window.document.body.appendChild(n2), n2.setAttribute("src", S2);
              }))];
            case 3:
              if (p3 = i3.sent(), t2 !== p3.state)
                throw new Error("Invalid state");
              return y2 = e3.scope, v2 = e3.audience, m2 = r(e3, ["scope", "audience", "redirect_uri", "ignoreCache", "timeoutInSeconds", "detailedResponse"]), [4, $a(n(n(n({}, this.customOptions), m2), { scope: y2, audience: v2, baseUrl: this.domainUrl, client_id: this.options.client_id, code_verifier: a3, code: p3.code, grant_type: "authorization_code", redirect_uri: l2.redirect_uri, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: m2.timeout || this.httpTimeoutMs }), this.worker)];
            case 4:
              return b3 = i3.sent(), [4, this._verifyIdToken(b3.id_token, o2)];
            case 5:
              return g2 = i3.sent(), this._processOrgIdHint(g2.claims.org_id), [2, n(n({}, b3), { decodedToken: g2, scope: l2.scope, oauthTokenScope: b3.scope, audience: l2.audience || "default" })];
            case 6:
              throw (w2 = i3.sent()).error === "login_required" && this.logout({ localOnly: true }), w2;
            case 7:
              return [2];
          }
          var S2, k2, _2;
        });
      });
    }, e2.prototype._getTokenUsingRefreshToken = function(e3) {
      return o(this, void 0, void 0, function() {
        var t2, o2, a3, c2, s2, u3, l2, f2, d2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return e3.scope = tc(this.defaultScope, this.options.scope, e3.scope), [4, this.cacheManager.get(new nc({ scope: e3.scope, audience: e3.audience || "default", client_id: this.options.client_id }))];
            case 1:
              return (t2 = i3.sent()) && t2.refresh_token || this.worker ? [3, 4] : this.useRefreshTokensFallback ? [4, this._getTokenFromIFrame(e3)] : [3, 3];
            case 2:
              return [2, i3.sent()];
            case 3:
              throw new La(e3.audience || "default", e3.scope);
            case 4:
              o2 = e3.redirect_uri || this.options.redirect_uri || window.location.origin, c2 = e3.scope, s2 = e3.audience, u3 = r(e3, ["scope", "audience", "ignoreCache", "timeoutInSeconds", "detailedResponse"]), l2 = typeof e3.timeoutInSeconds == "number" ? 1e3 * e3.timeoutInSeconds : null, i3.label = 5;
            case 5:
              return i3.trys.push([5, 7, , 10]), [4, $a(n(n(n(n(n({}, this.customOptions), u3), { audience: s2, scope: c2, baseUrl: this.domainUrl, client_id: this.options.client_id, grant_type: "refresh_token", refresh_token: t2 && t2.refresh_token, redirect_uri: o2 }), l2 && { timeout: l2 }), { auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs }), this.worker)];
            case 6:
              return a3 = i3.sent(), [3, 10];
            case 7:
              return ((f2 = i3.sent()).message.indexOf("Missing Refresh Token") > -1 || f2.message && f2.message.indexOf("invalid refresh token") > -1) && this.useRefreshTokensFallback ? [4, this._getTokenFromIFrame(e3)] : [3, 9];
            case 8:
              return [2, i3.sent()];
            case 9:
              throw f2;
            case 10:
              return [4, this._verifyIdToken(a3.id_token)];
            case 11:
              return d2 = i3.sent(), [2, n(n({}, a3), { decodedToken: d2, scope: e3.scope, oauthTokenScope: a3.scope, audience: e3.audience || "default" })];
          }
        });
      });
    }, e2.prototype._getEntryFromCache = function(e3) {
      var t2 = e3.scope, r2 = e3.audience, a3 = e3.client_id, c2 = e3.getDetailedEntry, s2 = c2 !== void 0 && c2;
      return o(this, void 0, void 0, function() {
        var e4, o2, c3, u3, l2;
        return i(this, function(i3) {
          switch (i3.label) {
            case 0:
              return [4, this.cacheManager.get(new nc({ scope: t2, audience: r2, client_id: a3 }), 60)];
            case 1:
              return (e4 = i3.sent()) && e4.access_token ? s2 ? (o2 = e4.id_token, c3 = e4.access_token, u3 = e4.oauthTokenScope, l2 = e4.expires_in, [2, n(n({ id_token: o2, access_token: c3 }, u3 ? { scope: u3 } : null), { expires_in: l2 })]) : [2, e4.access_token] : [2];
          }
        });
      });
    }, e2;
  }();
  function jc(e2) {
    return o(this, void 0, void 0, function() {
      var t2;
      return i(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, (t2 = new Rc(e2)).checkSession()];
          case 1:
            return n2.sent(), [2, t2];
        }
      });
    });
  }

  // output/Auth0/foreign.js
  var _config = (url2) => () => fetch(url2).then((response) => response.json());
  var _client = (config) => () => jc({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });
  var _isAuthenticated = (client) => client.isAuthenticated();
  var _loginWithRedirect = (client) => (opts) => client.loginWithRedirect(opts);
  var _handleRedirectCallback = (client) => () => client.handleRedirectCallback();
  var _getUser = (client) => client.getUser();
  var _getTokenSilently = (client) => (opts) => () => client.getTokenSilently(opts);
  var _buildAuthorizeUrl = (client) => (opts) => client.buildAuthorizeUrl(opts);

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l2 = fs.length;
      var k2 = xs.length;
      var result = new Array(l2 * k2);
      var n2 = 0;
      for (var i3 = 0; i3 < l2; i3++) {
        var f2 = fs[i3];
        for (var j2 = 0; j2 < k2; j2++) {
          result[n2++] = f2(xs[j2]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f2) {
      return function(g2) {
        return function(x2) {
          return f2(g2(x2));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x2) {
      return x2;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on2 = function(f2) {
    return function(g2) {
      return function(x2) {
        return function(y2) {
          return f2(g2(x2))(g2(y2));
        };
      };
    };
  };
  var flip = function(f2) {
    return function(b3) {
      return function(a3) {
        return f2(a3)(b3);
      };
    };
  };
  var $$const = function(a3) {
    return function(v2) {
      return a3;
    };
  };
  var applyFlipped = function(x2) {
    return function(f2) {
      return f2(x2);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f2) {
    return function(arr) {
      var l2 = arr.length;
      var result = new Array(l2);
      for (var i3 = 0; i3 < l2; i3++) {
        result[i3] = f2(arr[i3]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map119 = map(dictFunctor);
    return function(fa2) {
      return function(f2) {
        return map119(f2)(fa2);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map119 = map(dictFunctor);
    return function(f2) {
      return function(x2) {
        return map119($$const(x2))(f2);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map119 = map(dictFunctor);
    return function(x2) {
      return map119($$const(x2));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f2) {
      return function(g2) {
        return function(x2) {
          return f2(x2)(g2(x2));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    var apply12 = apply(dictApply);
    var map53 = map(dictApply.Functor0());
    return function(a3) {
      return function(b3) {
        return apply12(map53($$const)(a3))(b3);
      };
    };
  };
  var applySecond = function(dictApply) {
    var apply12 = apply(dictApply);
    var map53 = map(dictApply.Functor0());
    return function(a3) {
      return function(b3) {
        return apply12(map53($$const(identity2))(a3))(b3);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure111 = pure(dictApplicative);
    return function(v2) {
      return function(v1) {
        if (!v2) {
          return v1;
        }
        ;
        if (v2) {
          return pure111(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v2.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure111 = pure(dictApplicative);
    return function(v2) {
      return function(v1) {
        if (v2) {
          return v1;
        }
        ;
        if (!v2) {
          return pure111(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v2.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    var pure111 = pure(dictApplicative);
    return function(f2) {
      return function(a3) {
        return apply6(pure111(f2))(a3);
      };
    };
  };
  var applicativeArray = {
    pure: function(x2) {
      return [x2];
    },
    Apply0: function() {
      return applyArray;
    }
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f2) {
      var result = [];
      for (var i3 = 0, l2 = arr.length; i3 < l2; i3++) {
        Array.prototype.push.apply(result, f2(arr[i3]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped13 = bindFlipped(dictBind);
    return function(f2) {
      return function(g2) {
        return function(a3) {
          return bindFlipped13(f2)(g2(a3));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind115 = bind(dictBind);
    return function(f2) {
      return function(g2) {
        return function(a3) {
          return bind115(f2(a3))(g2);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind115 = bind(dictBind);
    return function(m2) {
      return bind115(m2)(identity3);
    };
  };

  // output/Control.Monad/index.js
  var whenM = function(dictMonad) {
    var bind28 = bind(dictMonad.Bind1());
    var when5 = when(dictMonad.Applicative0());
    return function(mb) {
      return function(m2) {
        return bind28(mb)(function(b3) {
          return when5(b3)(m2);
        });
      };
    };
  };
  var unlessM = function(dictMonad) {
    var bind28 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m2) {
        return bind28(mb)(function(b3) {
          return unless2(b3)(m2);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind28 = bind(dictMonad.Bind1());
    var pure27 = pure(dictMonad.Applicative0());
    return function(f2) {
      return function(a3) {
        return bind28(f2)(function(f$prime) {
          return bind28(a3)(function(a$prime) {
            return pure27(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };
  var asks = function(dictMonadAsk) {
    var map53 = map(dictMonadAsk.Monad0().Bind1().Apply0().Functor0());
    var ask1 = ask(dictMonadAsk);
    return function(f2) {
      return map53(f2)(ask1);
    };
  };

  // output/Control.Promise/foreign.js
  function thenImpl(promise2) {
    return function(errCB) {
      return function(succCB) {
        return function() {
          promise2.then(succCB, errCB);
        };
      };
    };
  }

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };
  var unsafeSet = function(label5) {
    return function(value17) {
      return function(rec) {
        var copy2 = {};
        for (var key2 in rec) {
          if ({}.hasOwnProperty.call(rec, key2)) {
            copy2[key2] = rec[key2];
          }
        }
        copy2[label5] = value17;
        return copy2;
      };
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt2) {
    return function(eq7) {
      return function(gt2) {
        return function(x2) {
          return function(y2) {
            return x2 < y2 ? lt2 : x2 === y2 ? eq7 : gt2;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqUnit = {
    eq: function(v2) {
      return function(v1) {
        return true;
      };
    }
  };
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x2) {
      return function(y2) {
        return eq2(eq32(x2)(y2))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x2) {
    return function(y2) {
      return x2 - y2 | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x2) {
    return function(y2) {
      return x2 + y2 | 0;
    };
  };
  var intMul = function(x2) {
    return function(y2) {
      return x2 * y2 | 0;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a3) {
      return sub1(zero2)(a3);
    };
  };

  // output/Data.Ord/index.js
  var ordUnit = {
    compare: function(v2) {
      return function(v1) {
        return EQ.value;
      };
    },
    Eq0: function() {
      return eqUnit;
    }
  };
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var comparing = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f2) {
      return function(x2) {
        return function(y2) {
          return compare3(f2(x2))(f2(y2));
        };
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a22) {
        var v2 = compare3(a1)(a22);
        if (v2 instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a22) {
        var v2 = compare3(a1)(a22);
        if (v2 instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var lessThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a22) {
        var v2 = compare3(a1)(a22);
        if (v2 instanceof GT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var abs = function(dictOrd) {
    var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
    return function(dictRing) {
      var zero2 = zero(dictRing.Semiring0());
      var negate1 = negate(dictRing);
      return function(x2) {
        var $99 = greaterThanOrEq1(x2)(zero2);
        if ($99) {
          return x2;
        }
        ;
        return negate1(x2);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n2) {
    return n2.toString();
  };
  var showCharImpl = function(c2) {
    var code3 = c2.charCodeAt(0);
    if (code3 < 32 || code3 === 127) {
      switch (c2) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code3.toString(10) + "'";
    }
    return c2 === "'" || c2 === "\\" ? "'\\" + c2 + "'" : "'" + c2 + "'";
  };
  var showStringImpl = function(s2) {
    var l2 = s2.length;
    return '"' + s2.replace(/[\0-\x1F\x7F"\\]/g, function(c2, i3) {
      switch (c2) {
        case '"':
        case "\\":
          return "\\" + c2;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k2 = i3 + 1;
      var empty7 = k2 < l2 && s2[k2] >= "0" && s2[k2] <= "9" ? "\\&" : "";
      return "\\" + c2.charCodeAt(0).toString(10) + empty7;
    }) + '"';
  };
  var showArrayImpl = function(f2) {
    return function(xs) {
      var ss = [];
      for (var i3 = 0, l2 = xs.length; i3 < l2; i3++) {
        ss[i3] = f2(xs[i3]);
      }
      return "[" + ss.join(",") + "]";
    };
  };
  var cons = function(head6) {
    return function(tail3) {
      return [head6].concat(tail3);
    };
  };
  var intercalate = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFieldsNil = {
    showRecordFields: function(v2) {
      return function(v1) {
        return [];
      };
    }
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            var v2 = showRecordFields1($$Proxy.value)(record);
            if (v2.length === 0) {
              return "{}";
            }
            ;
            return intercalate(" ")(["{", intercalate(", ")(v2), "}"]);
          }
        };
      };
    };
  };
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show114 = show(dictShow);
        return {
          showRecordFields: function(v2) {
            return function(record) {
              var tail3 = showRecordFields1($$Proxy.value)(record);
              var key2 = reflectSymbol2($$Proxy.value);
              var focus3 = unsafeGet(key2)(record);
              return cons(intercalate(": ")([key2, show114(focus3)]))(tail3);
            };
          }
        };
      };
    };
  };

  // output/Data.Generic.Rep/index.js
  var Inl = /* @__PURE__ */ function() {
    function Inl2(value0) {
      this.value0 = value0;
    }
    ;
    Inl2.create = function(value0) {
      return new Inl2(value0);
    };
    return Inl2;
  }();
  var Inr = /* @__PURE__ */ function() {
    function Inr2(value0) {
      this.value0 = value0;
    }
    ;
    Inr2.create = function(value0) {
      return new Inr2(value0);
    };
    return Inr2;
  }();
  var Product = /* @__PURE__ */ function() {
    function Product3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Product3.create = function(value0) {
      return function(value1) {
        return new Product3(value0, value1);
      };
    };
    return Product3;
  }();
  var NoArguments = /* @__PURE__ */ function() {
    function NoArguments2() {
    }
    ;
    NoArguments2.value = new NoArguments2();
    return NoArguments2;
  }();
  var Constructor = function(x2) {
    return x2;
  };
  var to2 = function(dict) {
    return dict.to;
  };
  var from = function(dict) {
    return dict.from;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var showMaybe = function(dictShow) {
    var show31 = show(dictShow);
    return {
      show: function(v2) {
        if (v2 instanceof Just) {
          return "(Just " + (show31(v2.value0) + ")");
        }
        ;
        if (v2 instanceof Nothing) {
          return "Nothing";
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 223, column 1 - line 225, column 28): " + [v2.constructor.name]);
      }
    };
  };
  var maybe = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22 instanceof Nothing) {
          return v2;
        }
        ;
        if (v22 instanceof Just) {
          return v1(v22.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v2) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v2(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a3) {
    return maybe(a3)(identity4);
  };
  var fromJust = function() {
    return function(v2) {
      if (v2 instanceof Just) {
        return v2.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v2.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq7 = eq(dictEq);
    return {
      eq: function(x2) {
        return function(y2) {
          if (x2 instanceof Nothing && y2 instanceof Nothing) {
            return true;
          }
          ;
          if (x2 instanceof Just && y2 instanceof Just) {
            return eq7(x2.value0)(y2.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var applyMaybe = {
    apply: function(v2) {
      return function(v1) {
        if (v2 instanceof Just) {
          return map2(v2.value0)(v1);
        }
        ;
        if (v2 instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v2) {
      return function(v1) {
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        if (v2 instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();
  var altMaybe = {
    alt: function(v2) {
      return function(v1) {
        if (v2 instanceof Nothing) {
          return v1;
        }
        ;
        return v2;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var plusMaybe = /* @__PURE__ */ function() {
    return {
      empty: Nothing.value,
      Alt0: function() {
        return altMaybe;
      }
    };
  }();
  var alternativeMaybe = {
    Applicative0: function() {
      return applicativeMaybe;
    },
    Plus1: function() {
      return plusMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a3) {
    return maybe(new Left(a3))(Right.create);
  };
  var functorEither = {
    map: function(f2) {
      return function(m2) {
        if (m2 instanceof Left) {
          return new Left(m2.value0);
        }
        ;
        if (m2 instanceof Right) {
          return new Right(f2(m2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m2.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
  var either = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22 instanceof Left) {
          return v2(v22.value0);
        }
        ;
        if (v22 instanceof Right) {
          return v1(v22.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
      };
    };
  };
  var applyEither = {
    apply: function(v2) {
      return function(v1) {
        if (v2 instanceof Left) {
          return new Left(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return map3(v2.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e2) {
      return function(v2) {
        return new Left(e2);
      };
    })(function(a3) {
      return function(f2) {
        return f2(a3);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

  // output/Effect/foreign.js
  var pureE = function(a3) {
    return function() {
      return a3;
    };
  };
  var bindE = function(a3) {
    return function(f2) {
      return function() {
        return f2(a3())();
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x2) {
    return Math.min(Math.abs(x2), 2147483647);
  };
  var intDiv = function(x2) {
    return function(y2) {
      if (y2 === 0)
        return 0;
      return y2 > 0 ? Math.floor(x2 / y2) : -Math.floor(x2 / -y2);
    };
  };
  var intMod = function(x2) {
    return function(y2) {
      if (y2 === 0)
        return 0;
      var yy = Math.abs(y2);
      return (x2 % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e2) {
    return e2.message;
  }
  function throwException(e2) {
    return function() {
      throw e2;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map53 = map(Monad0.Bind1().Apply0().Functor0());
    var pure27 = pure(Monad0.Applicative0());
    return function(a3) {
      return catchError1(map53(Right.create)(a3))(function($52) {
        return pure27(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x2) {
    return x2;
  };
  var functorIdentity = {
    map: function(f2) {
      return function(m2) {
        return f2(m2);
      };
    }
  };
  var applyIdentity = {
    apply: function(v2) {
      return function(v1) {
        return v2(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v2) {
      return function(f2) {
        return f2(v2);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref3) {
    return function() {
      return ref3.value;
    };
  };
  var modifyImpl = function(f2) {
    return function(ref3) {
      return function() {
        var t2 = f2(ref3.value);
        ref3.value = t2.state;
        return t2.value;
      };
    };
  };
  var write = function(val) {
    return function(ref3) {
      return function() {
        ref3.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f2) {
    return modify$prime(function(s2) {
      var s$prime = f2(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f2) {
    return function(s2) {
      return $$void2(modify(f2)(s2));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f2) {
    var go3 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v2) {
        if (v2 instanceof Loop) {
          $copy_v = f2(v2.value0);
          return;
        }
        ;
        if (v2 instanceof Done) {
          $tco_done = true;
          return v2.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 93, column 3 - line 93, column 25): " + [v2.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go3(f2($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f2) {
      var runIdentity = function(v2) {
        return v2;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f2($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };
  var monadRecEffect = {
    tailRecM: function(f2) {
      return function(a3) {
        var fromDone = function(v2) {
          if (v2 instanceof Done) {
            return v2.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 113, column 30 - line 113, column 44): " + [v2.constructor.name]);
        };
        return function __do2() {
          var r2 = bindFlipped2($$new)(f2(a3))();
          (function() {
            while (!function __do3() {
              var v2 = read(r2)();
              if (v2 instanceof Loop) {
                var e2 = f2(v2.value0)();
                write(e2)(r2)();
                return false;
              }
              ;
              if (v2 instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 104, column 22 - line 109, column 28): " + [v2.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map4(fromDone)(read(r2))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };
  var forever = function(dictMonadRec) {
    var tailRecM1 = tailRecM(dictMonadRec);
    var voidRight4 = voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    return function(ma2) {
      return tailRecM1(function(u3) {
        return voidRight4(new Loop(u3))(ma2);
      })(unit);
    };
  };
  var bifunctorStep = {
    bimap: function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22 instanceof Loop) {
            return new Loop(v2(v22.value0));
          }
          ;
          if (v22 instanceof Done) {
            return new Done(v1(v22.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
        };
      };
    }
  };

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b22) {
      return b1 && b22;
    };
  };
  var boolDisj = function(b1) {
    return function(b22) {
      return b1 || b22;
    };
  };
  var boolNot = function(b3) {
    return !b3;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt2 = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a3) {
      return function(b3) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a3))(b3);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt2(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v2) {
        return ff1;
      },
      tt: function(v2) {
        return tt1;
      },
      implies: function(f2) {
        return function(g2) {
          return function(a3) {
            return implies1(f2(a3))(g2(a3));
          };
        };
      },
      conj: function(f2) {
        return function(g2) {
          return function(a3) {
            return conj1(f2(a3))(g2(a3));
          };
        };
      },
      disj: function(f2) {
        return function(g2) {
          return function(a3) {
            return disj1(f2(a3))(g2(a3));
          };
        };
      },
      not: function(f2) {
        return function(a3) {
          return not1(f2(a3));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f2) {
    return function(v2) {
      return f2(v2.value0)(v2.value1);
    };
  };
  var snd = function(v2) {
    return v2.value1;
  };
  var functorTuple = {
    map: function(f2) {
      return function(m2) {
        return new Tuple(m2.value0, f2(m2.value1));
      };
    }
  };
  var fst = function(v2) {
    return v2.value0;
  };
  var eqTuple = function(dictEq) {
    var eq7 = eq(dictEq);
    return function(dictEq1) {
      var eq12 = eq(dictEq1);
      return {
        eq: function(x2) {
          return function(y2) {
            return eq7(x2.value0)(y2.value0) && eq12(x2.value1)(y2.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare3 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x2) {
          return function(y2) {
            var v2 = compare3(x2.value0)(y2.value0);
            if (v2 instanceof LT) {
              return LT.value;
            }
            ;
            if (v2 instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x2.value1)(y2.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(s2) {
      return state1(function(v2) {
        return new Tuple(unit, s2);
      });
    };
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f2) {
      return state1(function(s2) {
        return new Tuple(unit, f2(s2));
      });
    };
  };
  var gets = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f2) {
      return state1(function(s2) {
        return new Tuple(f2(s2), s2);
      });
    };
  };

  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map5 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x2) {
    return x2;
  };
  var runExceptT = function(v2) {
    return v2;
  };
  var monadTransExceptT = {
    lift: function(dictMonad) {
      var bind28 = bind(dictMonad.Bind1());
      var pure27 = pure(dictMonad.Applicative0());
      return function(m2) {
        return bind28(m2)(function(a3) {
          return pure27(new Right(a3));
        });
      };
    }
  };
  var lift3 = /* @__PURE__ */ lift(monadTransExceptT);
  var mapExceptT = function(f2) {
    return function(v2) {
      return f2(v2);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map119 = map(dictFunctor);
    return {
      map: function(f2) {
        return mapExceptT(map119(map5(f2)));
      }
    };
  };
  var except = function(dictApplicative) {
    var $185 = pure(dictApplicative);
    return function($186) {
      return ExceptT($185($186));
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind28 = bind(dictMonad.Bind1());
    var pure27 = pure(dictMonad.Applicative0());
    return {
      bind: function(v2) {
        return function(k2) {
          return bind28(v2)(either(function($187) {
            return pure27(Left.create($187));
          })(function(a3) {
            var v1 = k2(a3);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadAskExceptT = function(dictMonadAsk) {
    var Monad0 = dictMonadAsk.Monad0();
    var monadExceptT1 = monadExceptT(Monad0);
    return {
      ask: lift3(Monad0)(ask(dictMonadAsk)),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var monadEffectExceptT = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadExceptT1 = monadExceptT(Monad0);
    return {
      liftEffect: function() {
        var $190 = lift3(Monad0);
        var $191 = liftEffect(dictMonadEffect);
        return function($192) {
          return $190($191($192));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append16 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind28 = bind(Bind1);
      var pure27 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v2) {
          return function(v1) {
            return bind28(v2)(function(rm) {
              if (rm instanceof Right) {
                return pure27(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind28(v1)(function(rn2) {
                  if (rn2 instanceof Right) {
                    return pure27(new Right(rn2.value0));
                  }
                  ;
                  if (rn2 instanceof Left) {
                    return pure27(new Left(append16(rm.value0)(rn2.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn2.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x2) {
    return x2;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var wrap = function() {
    return coerce2;
  };
  var unwrap = function() {
    return coerce2;
  };
  var over = function() {
    return function() {
      return function(v2) {
        return coerce2;
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v2) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap2(runExceptT($3));
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f2) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i3 = len - 1; i3 >= 0; i3--) {
          acc = f2(xs[i3])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f2) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i3 = 0; i3 < len; i3++) {
          acc = f2(acc)(xs[i3]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f2) {
      return bimap1(f2)(identity5);
    };
  };
  var bifunctorTuple = {
    bimap: function(f2) {
      return function(g2) {
        return function(v2) {
          return new Tuple(f2(v2.value0), g2(v2.value1));
        };
      };
    }
  };
  var bifunctorEither = {
    bimap: function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22 instanceof Left) {
            return new Left(v2(v22.value0));
          }
          ;
          if (v22 instanceof Right) {
            return new Right(v1(v22.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
        };
      };
    }
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x2) {
    return x2;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v2) {
        return function(v1) {
          return disj2(v2)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond5 = applySecond(dictApplicative.Apply0());
    var pure27 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f2) {
        return foldr22(function($449) {
          return applySecond5(f2($449));
        })(pure27(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_15 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_15(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var indexl = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(idx) {
      var go3 = function(cursor) {
        return function(a3) {
          if (cursor.elem instanceof Just) {
            return cursor;
          }
          ;
          var $291 = cursor.pos === idx;
          if ($291) {
            return {
              elem: new Just(a3),
              pos: cursor.pos
            };
          }
          ;
          return {
            pos: cursor.pos + 1 | 0,
            elem: cursor.elem
          };
        };
      };
      var $450 = foldl22(go3)({
        elem: Nothing.value,
        pos: 0
      });
      return function($451) {
        return function(v2) {
          return v2.elem;
        }($450($451));
      };
    };
  };
  var intercalate2 = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictMonoid) {
      var append16 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(sep) {
        return function(xs) {
          var go3 = function(v2) {
            return function(x2) {
              if (v2.init) {
                return {
                  init: false,
                  acc: x2
                };
              }
              ;
              return {
                init: false,
                acc: append16(v2.acc)(append16(sep)(x2))
              };
            };
          };
          return foldl22(go3)({
            init: true,
            acc: mempty5
          })(xs).acc;
        };
      };
    };
  };
  var foldableMaybe = {
    foldr: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z2;
          }
          ;
          if (v1 instanceof Just) {
            return v2(v1.value0)(z2);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldl: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z2;
          }
          ;
          if (v1 instanceof Just) {
            return v2(z2)(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      return function(v2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty5;
          }
          ;
          if (v1 instanceof Just) {
            return v2(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldableEither = {
    foldr: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Left) {
            return z2;
          }
          ;
          if (v1 instanceof Right) {
            return v2(v1.value0)(z2);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldl: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Left) {
            return z2;
          }
          ;
          if (v1 instanceof Right) {
            return v2(z2)(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      return function(v2) {
        return function(v1) {
          if (v1 instanceof Left) {
            return mempty5;
          }
          ;
          if (v1 instanceof Right) {
            return v2(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append16 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f2) {
        return foldr22(function(x2) {
          return function(acc) {
            return append16(f2(x2))(acc);
          };
        })(mempty5);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f2) {
    return function(xs) {
      var l2 = xs.length;
      var result = Array(l2);
      for (var i3 = 0; i3 < l2; i3++) {
        result[i3] = f2(i3)(xs[i3]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append16 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f2) {
        return foldrWithIndex1(function(i3) {
          return function(x2) {
            return function(acc) {
              return append16(f2(i3)(x2))(acc);
            };
          };
        })(mempty5);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f2) {
      return function(z2) {
        var $289 = foldr8(function(v2) {
          return function(y2) {
            return f2(v2.value0)(v2.value1)(y2);
          };
        })(z2);
        var $290 = mapWithIndex2(Tuple.create);
        return function($291) {
          return $289($290($291));
        };
      };
    },
    foldlWithIndex: function(f2) {
      return function(z2) {
        var $292 = foldl8(function(y2) {
          return function(v2) {
            return f2(v2.value0)(y2)(v2.value1);
          };
        })(z2);
        var $293 = mapWithIndex2(Tuple.create);
        return function($294) {
          return $292($293($294));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a3) {
      return [a3];
    }
    function array2(a3) {
      return function(b3) {
        return [a3, b3];
      };
    }
    function array3(a3) {
      return function(b3) {
        return function(c2) {
          return [a3, b3, c2];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply6) {
      return function(map53) {
        return function(pure27) {
          return function(f2) {
            return function(array) {
              function go3(bot, top5) {
                switch (top5 - bot) {
                  case 0:
                    return pure27([]);
                  case 1:
                    return map53(array1)(f2(array[bot]));
                  case 2:
                    return apply6(map53(array2)(f2(array[bot])))(f2(array[bot + 1]));
                  case 3:
                    return apply6(apply6(map53(array3)(f2(array[bot])))(f2(array[bot + 1])))(f2(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top5 - bot) / 4) * 2;
                    return apply6(map53(concat2)(go3(bot, pivot)))(go3(pivot, top5));
                }
              }
              return go3(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var traversableMaybe = {
    traverse: function(dictApplicative) {
      var pure27 = pure(dictApplicative);
      var map53 = map(dictApplicative.Apply0().Functor0());
      return function(v2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return pure27(Nothing.value);
          }
          ;
          if (v1 instanceof Just) {
            return map53(Just.create)(v2(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    },
    sequence: function(dictApplicative) {
      var pure27 = pure(dictApplicative);
      var map53 = map(dictApplicative.Apply0().Functor0());
      return function(v2) {
        if (v2 instanceof Nothing) {
          return pure27(Nothing.value);
        }
        ;
        if (v2 instanceof Just) {
          return map53(Just.create)(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v2.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    },
    Foldable1: function() {
      return foldableMaybe;
    }
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity6);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
    var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    return function(dictApplicative) {
      var sequence12 = sequence2(dictApplicative);
      return function(f2) {
        var $174 = mapWithIndex4(f2);
        return function($175) {
          return sequence12($174($175));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust13) {
      return function(fst2) {
        return function(snd2) {
          return function(f2) {
            return function(b3) {
              var result = [];
              var value17 = b3;
              while (true) {
                var maybe2 = f2(value17);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust13(maybe2);
                result.push(fst2(tuple));
                value17 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust13) {
      return function(fst2) {
        return function(snd2) {
          return function(f2) {
            return function(b3) {
              var result = [];
              var value17 = b3;
              while (true) {
                var tuple = f2(value17);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value17 = fromJust13(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldr1 = function(dict) {
    return dict.unfoldr1;
  };
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };
  var replicate1 = function(dictUnfoldable1) {
    var unfoldr11 = unfoldr1(dictUnfoldable1);
    return function(n2) {
      return function(v2) {
        var step5 = function(i3) {
          if (i3 <= 0) {
            return new Tuple(v2, Nothing.value);
          }
          ;
          if (otherwise) {
            return new Tuple(v2, new Just(i3 - 1 | 0));
          }
          ;
          throw new Error("Failed pattern match at Data.Unfoldable1 (line 68, column 5 - line 68, column 39): " + [i3.constructor.name]);
        };
        return unfoldr11(step5)(n2 - 1 | 0);
      };
    };
  };
  var singleton = function(dictUnfoldable1) {
    return replicate1(dictUnfoldable1)(1);
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.NonEmpty/index.js
  var map6 = /* @__PURE__ */ map(functorTuple);
  var map1 = /* @__PURE__ */ map(functorMaybe);
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var unfoldable1NonEmpty = function(dictUnfoldable) {
    var unfoldr3 = unfoldr(dictUnfoldable);
    return {
      unfoldr1: function(f2) {
        return function(b3) {
          return uncurry(NonEmpty.create)(map6(unfoldr3(map1(f2)))(f2(b3)));
        };
      }
    };
  };
  var singleton2 = function(dictPlus) {
    var empty7 = empty(dictPlus);
    return function(a3) {
      return new NonEmpty(a3, empty7);
    };
  };
  var functorNonEmpty = function(dictFunctor) {
    var map212 = map(dictFunctor);
    return {
      map: function(f2) {
        return function(m2) {
          return new NonEmpty(f2(m2.value0), map212(f2)(m2.value1));
        };
      }
    };
  };
  var foldableNonEmpty = function(dictFoldable) {
    var foldMap3 = foldMap(dictFoldable);
    var foldl4 = foldl(dictFoldable);
    var foldr4 = foldr(dictFoldable);
    return {
      foldMap: function(dictMonoid) {
        var append16 = append(dictMonoid.Semigroup0());
        var foldMap13 = foldMap3(dictMonoid);
        return function(f2) {
          return function(v2) {
            return append16(f2(v2.value0))(foldMap13(f2)(v2.value1));
          };
        };
      },
      foldl: function(f2) {
        return function(b3) {
          return function(v2) {
            return foldl4(f2)(f2(b3)(v2.value0))(v2.value1);
          };
        };
      },
      foldr: function(f2) {
        return function(b3) {
          return function(v2) {
            return f2(v2.value0)(foldr4(f2)(b3)(v2.value1));
          };
        };
      }
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x2) {
    return x2;
  };
  var toList = function(v2) {
    return new Cons(v2.value0, v2.value1);
  };
  var listMap = function(f2) {
    var chunkedRevMap = function($copy_chunksAcc) {
      return function($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(chunksAcc, v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Cons)) {
            $tco_var_chunksAcc = new Cons(v2, chunksAcc);
            $copy_v = v2.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v1) {
            if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
              return new Cons(f2(v1.value0), new Cons(f2(v1.value1.value0), Nil.value));
            }
            ;
            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f2(v1.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v1, acc) {
                if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f2(v1.value0.value0), new Cons(f2(v1.value0.value1.value0), new Cons(f2(v1.value0.value1.value1.value0), acc)));
                  return;
                }
                ;
                $tco_done1 = true;
                return acc;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v2));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
  var foldableList = {
    foldr: function(f2) {
      return function(b3) {
        var rev3 = function() {
          var go3 = function($copy_acc) {
            return function($copy_v) {
              var $tco_var_acc = $copy_acc;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_acc = new Cons(v2.value0, acc);
                  $copy_v = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go3(Nil.value);
        }();
        var $281 = foldl(foldableList)(flip(f2))(b3);
        return function($282) {
          return $281(rev3($282));
        };
      };
    },
    foldl: function(f2) {
      var go3 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b3, v2) {
            if (v2 instanceof Nil) {
              $tco_done1 = true;
              return b3;
            }
            ;
            if (v2 instanceof Cons) {
              $tco_var_b = f2(b3)(v2.value0);
              $copy_v = v2.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v2.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go3;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f2) {
        return foldl(foldableList)(function(acc) {
          var $283 = append22(acc);
          return function($284) {
            return $283(f2($284));
          };
        })(mempty5);
      };
    }
  };
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var foldableNonEmptyList = /* @__PURE__ */ foldableNonEmpty(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v2) {
      return function(as$prime) {
        return new NonEmpty(v2.value0, append1(v2.value1)(toList(as$prime)));
      };
    }
  };
  var unfoldable1List = {
    unfoldr1: function(f2) {
      return function(b3) {
        var go3 = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v2 = f2(source3);
              if (v2.value1 instanceof Just) {
                $tco_var_source = v2.value1.value0;
                $copy_memo = new Cons(v2.value0, memo);
                return;
              }
              ;
              if (v2.value1 instanceof Nothing) {
                $tco_done = true;
                return foldl2(flip(Cons.create))(Nil.value)(new Cons(v2.value0, memo));
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 135, column 22 - line 137, column 61): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go3(b3)(Nil.value);
      };
    }
  };
  var unfoldableList = {
    unfoldr: function(f2) {
      return function(b3) {
        var go3 = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v2 = f2(source3);
              if (v2 instanceof Nothing) {
                $tco_done = true;
                return foldl2(flip(Cons.create))(Nil.value)(memo);
              }
              ;
              if (v2 instanceof Just) {
                $tco_var_source = v2.value0.value1;
                $copy_memo = new Cons(v2.value0.value0, memo);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 142, column 22 - line 144, column 52): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go3(b3)(Nil.value);
      };
    },
    Unfoldable10: function() {
      return unfoldable1List;
    }
  };
  var unfoldable1NonEmptyList = /* @__PURE__ */ unfoldable1NonEmpty(unfoldableList);
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn2 = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn2.tag = tag;
      return fn2;
    }
    function nonCanceler2(error5) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error5) {
        setTimeout(function() {
          throw error5;
        }, 0);
      }
    }
    function runSync(left2, right2, eff) {
      try {
        return right2(eff());
      } catch (error5) {
        return left2(error5);
      }
    }
    function runAsync(left2, eff, k2) {
      try {
        return eff(k2)();
      } catch (error5) {
        k2(left2(error5))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i3, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k2 in fibers) {
              if (fibers.hasOwnProperty(k2)) {
                killCount++;
                kill2(k2);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error5) {
              return new Aff2(SYNC, function() {
                for (var k3 in kills) {
                  if (kills.hasOwnProperty(k3)) {
                    kills[k3]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step5 = aff;
      var fail5 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run6(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step5 = bhead(step5);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e2) {
                status = RETURN;
                fail5 = util.left(e2);
                step5 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step5)) {
                status = RETURN;
                fail5 = step5;
                step5 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step5 = util.fromRight(step5);
              }
              break;
            case CONTINUE:
              switch (step5.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step5._2;
                  status = CONTINUE;
                  step5 = step5._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step5 = util.right(step5._1);
                  } else {
                    status = STEP_BIND;
                    step5 = step5._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step5 = runSync(util.left, util.right, step5._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step5 = runAsync(util.left, step5._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step5 = result2;
                        run6(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail5 = util.left(step5._1);
                  step5 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step5, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step5, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step5 = step5._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step5, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step5, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step5 = step5._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step5._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step5._1) {
                    tmp.run();
                  }
                  step5 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step5 = sequential3(util, supervisor, step5._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step5 = interrupt || fail5 || step5;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail5) {
                      status = CONTINUE;
                      step5 = attempt._2(util.fromLeft(fail5));
                      fail5 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail5) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step5 = util.fromRight(step5);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail5 === null) {
                      result = util.fromRight(step5);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step5 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step5, fail5), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step5 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail5) {
                      step5 = attempt._1.failed(util.fromLeft(fail5))(attempt._2);
                    } else {
                      step5 = attempt._1.completed(util.fromRight(step5))(attempt._2);
                    }
                    fail5 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step5, fail5), attempts, interrupt);
                    status = CONTINUE;
                    step5 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step5 = attempt._1;
                    fail5 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k2 in joins) {
                if (joins.hasOwnProperty(k2)) {
                  rethrow = rethrow && joins[k2].rethrow;
                  runEff(joins[k2].handler(step5));
                }
              }
              joins = null;
              if (interrupt && fail5) {
                setTimeout(function() {
                  throw util.fromLeft(fail5);
                }, 0);
              } else if (util.isLeft(step5) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step5);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join5) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join5.rethrow;
            join5.handler(step5)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join5;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error5, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error5);
              status = COMPLETED;
              step5 = interrupt;
              run6(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step5(error5)), attempts, interrupt);
                }
                status = RETURN;
                step5 = null;
                fail5 = null;
                run6(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step5 = null;
                fail5 = null;
              }
          }
          return canceler;
        };
      }
      function join4(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run6(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join4,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run6(runTick);
              });
            } else {
              run6(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root2 = EMPTY;
      function kill2(error5, par2, cb2) {
        var step5 = par2;
        var head6 = null;
        var tail3 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step5.tag) {
              case FORKED:
                if (step5._3 === EMPTY) {
                  tmp = fibers[step5._1];
                  kills2[count++] = tmp.kill(error5, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head6 === null) {
                  break loop;
                }
                step5 = head6._2;
                if (tail3 === null) {
                  head6 = null;
                } else {
                  head6 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step5 = step5._2;
                break;
              case APPLY:
              case ALT:
                if (head6) {
                  tail3 = new Aff2(CONS, head6, tail3);
                }
                head6 = step5;
                step5 = step5._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join4(result, head6, tail3) {
        var fail5, step5, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail5 = result;
          step5 = null;
        } else {
          step5 = result;
          fail5 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head6 === null) {
              cb(fail5 || step5)();
              return;
            }
            if (head6._3 !== EMPTY) {
              return;
            }
            switch (head6.tag) {
              case MAP:
                if (fail5 === null) {
                  head6._3 = util.right(head6._1(util.fromRight(step5)));
                  step5 = head6._3;
                } else {
                  head6._3 = fail5;
                }
                break;
              case APPLY:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (fail5) {
                  head6._3 = fail5;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail5 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(fail5, null, null);
                      } else {
                        join4(fail5, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step5 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head6._3 = step5;
                }
                break;
              case ALT:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail5 = step5 === lhs ? rhs : lhs;
                  step5 = null;
                  head6._3 = fail5;
                } else {
                  head6._3 = step5;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step5 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(step5, null, null);
                      } else {
                        join4(step5, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head6 = null;
            } else {
              head6 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join4(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run6() {
        var status = CONTINUE;
        var step5 = par;
        var head6 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step5.tag) {
                  case MAP:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(MAP, step5._1, EMPTY, EMPTY);
                    step5 = step5._2;
                    break;
                  case APPLY:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(APPLY, EMPTY, step5._2, EMPTY);
                    step5 = step5._1;
                    break;
                  case ALT:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(ALT, EMPTY, step5._2, EMPTY);
                    step5 = step5._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step5;
                    step5 = new Aff2(FORKED, fid, new Aff2(CONS, head6, tail3), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step5)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head6 === null) {
                  break loop;
                }
                if (head6._1 === EMPTY) {
                  head6._1 = step5;
                  status = CONTINUE;
                  step5 = head6._2;
                  head6._2 = EMPTY;
                } else {
                  head6._2 = step5;
                  step5 = head6;
                  if (tail3 === null) {
                    head6 = null;
                  } else {
                    head6 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root2 = step5;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error5, cb2) {
        interrupt = util.left(error5);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error5, root2, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run6();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k2) {
      return Aff.Catch(aff, k2);
    };
  }
  function _map(f2) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f2(aff._1));
      } else {
        return Aff.Bind(aff, function(value17) {
          return Aff.Pure(f2(value17));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k2) {
      return Aff.Bind(aff, k2);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f2) {
    return function(aff) {
      return Aff.ParMap(f2, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k2) {
        return Aff.Bracket(acquire, options2, k2);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n2, k2) {
      if (n2 === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k2);
      } else {
        return setTimeout(k2, n2);
      }
    }
    function clearDelay(n2, t2) {
      if (n2 === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t2);
      } else {
        return clearTimeout(t2);
      }
    }
    return function(right2, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right2()));
          return function() {
            return Aff.Sync(function() {
              return right2(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Monad.Reader.Trans/index.js
  var ReaderT = function(x2) {
    return x2;
  };
  var runReaderT = function(v2) {
    return v2;
  };
  var monadTransReaderT = {
    lift: function(dictMonad) {
      return function($147) {
        return ReaderT($$const($147));
      };
    }
  };
  var lift4 = /* @__PURE__ */ lift(monadTransReaderT);
  var mapReaderT = function(f2) {
    return function(v2) {
      return function($148) {
        return f2(v2($148));
      };
    };
  };
  var functorReaderT = function(dictFunctor) {
    return {
      map: function() {
        var $149 = map(dictFunctor);
        return function($150) {
          return mapReaderT($149($150));
        };
      }()
    };
  };
  var applyReaderT = function(dictApply) {
    var apply6 = apply(dictApply);
    var functorReaderT1 = functorReaderT(dictApply.Functor0());
    return {
      apply: function(v2) {
        return function(v1) {
          return function(r2) {
            return apply6(v2(r2))(v1(r2));
          };
        };
      },
      Functor0: function() {
        return functorReaderT1;
      }
    };
  };
  var bindReaderT = function(dictBind) {
    var bind28 = bind(dictBind);
    var applyReaderT1 = applyReaderT(dictBind.Apply0());
    return {
      bind: function(v2) {
        return function(k2) {
          return function(r2) {
            return bind28(v2(r2))(function(a3) {
              var v1 = k2(a3);
              return v1(r2);
            });
          };
        };
      },
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var applicativeReaderT = function(dictApplicative) {
    var applyReaderT1 = applyReaderT(dictApplicative.Apply0());
    return {
      pure: function() {
        var $154 = pure(dictApplicative);
        return function($155) {
          return ReaderT($$const($154($155)));
        };
      }(),
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var monadReaderT = function(dictMonad) {
    var applicativeReaderT1 = applicativeReaderT(dictMonad.Applicative0());
    var bindReaderT1 = bindReaderT(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeReaderT1;
      },
      Bind1: function() {
        return bindReaderT1;
      }
    };
  };
  var monadAskReaderT = function(dictMonad) {
    var monadReaderT1 = monadReaderT(dictMonad);
    return {
      ask: pure(dictMonad.Applicative0()),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };
  var monadEffectReader = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadReaderT1 = monadReaderT(Monad0);
    return {
      liftEffect: function() {
        var $157 = lift4(Monad0);
        var $158 = liftEffect(dictMonadEffect);
        return function($159) {
          return $157($158($159));
        };
      }(),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };

  // output/Data.Profunctor/index.js
  var dimap = function(dict) {
    return dict.dimap;
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var traverse_10 = traverse_(dictParallel.Applicative1());
    var parallel3 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_15 = traverse_10(dictFoldable);
      return function(f2) {
        var $48 = traverse_15(function($50) {
          return parallel3(f2($50));
        });
        return function($49) {
          return sequential3($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity7);
    };
  };

  // output/Data.Time.Duration/index.js
  var over2 = /* @__PURE__ */ over()();
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var Seconds = function(x2) {
    return x2;
  };
  var Milliseconds = function(x2) {
    return x2;
  };
  var toDuration = function(dict) {
    return dict.toDuration;
  };
  var fromDuration = function(dict) {
    return dict.fromDuration;
  };
  var durationSeconds = {
    fromDuration: /* @__PURE__ */ over2(Seconds)(function(v2) {
      return v2 * 1e3;
    }),
    toDuration: /* @__PURE__ */ over2(Milliseconds)(function(v2) {
      return v2 / 1e3;
    })
  };
  var durationMilliseconds = {
    fromDuration: identity8,
    toDuration: identity8
  };
  var convertDuration = function(dictDuration) {
    var fromDuration1 = fromDuration(dictDuration);
    return function(dictDuration1) {
      var $61 = toDuration(dictDuration1);
      return function($62) {
        return $61(fromDuration1($62));
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f2) {
    return f2();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f2) {
    return f2();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map7 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x2) {
    return x2;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map12 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v2) {
      if (v2 instanceof Right) {
        return v2.value0;
      }
      ;
      if (v2 instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 21 - line 409, column 54): " + [v2.constructor.name]);
    };
    var unsafeFromLeft = function(v2) {
      if (v2 instanceof Left) {
        return v2.value0;
      }
      ;
      if (v2 instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 20 - line 404, column 55): " + [v2.constructor.name]);
    };
    var isLeft = function(v2) {
      if (v2 instanceof Left) {
        return true;
      }
      ;
      if (v2 instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 397, column 12 - line 399, column 21): " + [v2.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($73) {
    return $$void3(launchAff($73));
  };
  var delay = function(v2) {
    return _delay(Right.create, v2);
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a3) {
      return bracket(pure22(unit))($$const(fin))($$const(a3));
    };
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($74) {
    return Canceler($$const(liftEffect2($74)));
  };
  var joinFiber = function(v2) {
    return makeAff(function(k2) {
      return map7(effectCanceler)(v2.join(k2));
    });
  };
  var functorFiber = {
    map: function(f2) {
      return function(t2) {
        return unsafePerformEffect(makeFiber(map12(f2)(joinFiber(t2))));
      };
    }
  };
  var killFiber = function(e2) {
    return function(v2) {
      return bind1(liftEffect2(v2.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v2.kill(e2, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k2) {
          return map7(effectCanceler)(v2.kill(e2, k2));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k2) {
    return function(aff) {
      return launchAff(bindFlipped3(function($77) {
        return liftEffect2(k2($77));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k2) {
    return function(aff) {
      return $$void3(runAff(k2)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $79 = parallel(parallelAff);
        return function($80) {
          return $79(pure22($80));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(131);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v2) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v2(err), v1(err)]);
        };
      };
    }
  };
  var monadRecAff = {
    tailRecM: function(k2) {
      var go3 = function(a3) {
        return bind1(k2(a3))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go3(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 102, column 7 - line 104, column 23): " + [res.constructor.name]);
        });
      };
      return go3;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Foreign/foreign.js
  function typeOf(value17) {
    return typeof value17;
  }
  function tagOf(value17) {
    return Object.prototype.toString.call(value17).slice(8, -1);
  }
  var isArray = Array.isArray || function(value17) {
    return Object.prototype.toString.call(value17) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n2) {
        return (n2 | 0) === n2 ? just(n2) : nothing;
      };
    };
  };
  var toNumber = function(n2) {
    return n2;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var abs2 = Math.abs;
  var ceil = Math.ceil;
  var floor = Math.floor;
  var round = Math.round;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x2) {
    if (!isFiniteImpl(x2)) {
      return 0;
    }
    ;
    if (x2 >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x2 <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x2));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x2.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };
  var ceil2 = function($40) {
    return unsafeClamp(ceil($40));
  };

  // output/Data.List/index.js
  var bimap2 = /* @__PURE__ */ bimap(bifunctorStep);
  var reverse = /* @__PURE__ */ function() {
    var go3 = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v2) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return acc;
          }
          ;
          if (v2 instanceof Cons) {
            $tco_var_acc = new Cons(v2.value0, acc);
            $copy_v = v2.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go3(Nil.value);
  }();
  var $$null = function(v2) {
    if (v2 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var manyRec = function(dictMonadRec) {
    var bind115 = bind(dictMonadRec.Monad0().Bind1());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(dictAlternative) {
      var Alt0 = dictAlternative.Plus1().Alt0();
      var alt13 = alt(Alt0);
      var map119 = map(Alt0.Functor0());
      var pure27 = pure(dictAlternative.Applicative0());
      return function(p3) {
        var go3 = function(acc) {
          return bind115(alt13(map119(Loop.create)(p3))(pure27(new Done(unit))))(function(aa2) {
            return pure27(bimap2(function(v2) {
              return new Cons(v2, acc);
            })(function(v2) {
              return reverse(acc);
            })(aa2));
          });
        };
        return tailRecM4(go3)(Nil.value);
      };
    };
  };
  var someRec = function(dictMonadRec) {
    var manyRec1 = manyRec(dictMonadRec);
    return function(dictAlternative) {
      var apply6 = apply(dictAlternative.Applicative0().Apply0());
      var map119 = map(dictAlternative.Plus1().Alt0().Functor0());
      var manyRec22 = manyRec1(dictAlternative);
      return function(v2) {
        return apply6(map119(Cons.create)(v2))(manyRec22(v2));
      };
    };
  };

  // output/Data.List.NonEmpty/index.js
  var toList2 = function(v2) {
    return new Cons(v2.value0, v2.value1);
  };
  var singleton3 = /* @__PURE__ */ function() {
    var $199 = singleton2(plusList);
    return function($200) {
      return NonEmptyList($199($200));
    };
  }();
  var head = function(v2) {
    return v2.value0;
  };
  var cons$prime = function(x2) {
    return function(xs) {
      return new NonEmpty(x2, xs);
    };
  };
  var cons2 = function(y2) {
    return function(v2) {
      return new NonEmpty(y2, new Cons(v2.value0, v2.value1));
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton4 = function(c2) {
    return c2;
  };
  var length2 = function(s2) {
    return s2.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x2) {
        return function(s2) {
          var i3 = s2.indexOf(x2);
          return i3 === -1 ? nothing : just(i3);
        };
      };
    };
  };
  var take2 = function(n2) {
    return function(s2) {
      return s2.substr(0, n2);
    };
  };
  var drop2 = function(n2) {
    return function(s2) {
      return s2.substring(n2);
    };
  };
  var splitAt = function(i3) {
    return function(s2) {
      return { before: s2.substring(0, i3), after: s2.substring(i3) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i3) {
    return function(s2) {
      if (i3 >= 0 && i3 < s2.length)
        return s2.charAt(i3);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v2) {
    return function(str) {
      var v1 = splitAt(length2(v2))(str);
      var $20 = v1.before === v2;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return function(value1) {
        return new TypeMismatch3(value0, value1);
      };
    };
    return TypeMismatch3;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v2) {
    if (v2 instanceof ForeignError) {
      return v2.value0;
    }
    ;
    if (v2 instanceof ErrorAtIndex) {
      return "Error at array index " + (show1(v2.value0) + (": " + renderForeignError(v2.value1)));
    }
    ;
    if (v2 instanceof ErrorAtProperty) {
      return "Error at property " + (show2(v2.value0) + (": " + renderForeignError(v2.value1)));
    }
    ;
    if (v2 instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v2.value0 + (", found " + v2.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v2.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton3($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure111 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value17) {
        if (tagOf(value17) === tag) {
          return pure111(unsafeFromForeign(value17));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value17)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value17.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Control.Promise/index.js
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var map8 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var bind2 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var toAff$prime = function(customCoerce) {
    return function(p3) {
      return makeAff(function(cb) {
        return voidRight2(mempty2)(thenImpl(p3)(function($14) {
          return cb(Left.create(customCoerce($14)))();
        })(function($15) {
          return cb(Right.create($15))();
        }));
      });
    };
  };
  var coerce3 = function(fn2) {
    return either(function(v2) {
      return error("Promise failed, couldn't extract JS Error or String");
    })(identity9)(runExcept(alt2(unsafeReadTagged2("Error")(fn2))(map8(error)(readString2(fn2)))));
  };
  var toAff = /* @__PURE__ */ toAff$prime(coerce3);
  var toAffE = function(f2) {
    return bind2(liftEffect3(f2))(toAff);
  };

  // output/Data.Argonaut.Core/foreign.js
  function id(x2) {
    return x2;
  }
  function stringify(j2) {
    return JSON.stringify(j2);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j2) {
    if (j2 == null)
      return isNull3();
    else if (typeof j2 === "boolean")
      return isBool(j2);
    else if (typeof j2 === "number")
      return isNum(j2);
    else if (typeof j2 === "string")
      return isStr(j2);
    else if (Object.prototype.toString.call(j2) === "[object Array]")
      return isArr(j2);
    else
      return isObj(j2);
  }

  // output/Foreign.Object/foreign.js
  function _copyST(m2) {
    return function() {
      var r2 = {};
      for (var k2 in m2) {
        if (hasOwnProperty.call(m2, k2)) {
          r2[k2] = m2[k2];
        }
      }
      return r2;
    };
  }
  var empty2 = {};
  function runST(f2) {
    return f2();
  }
  function _lookup(no2, yes, k2, m2) {
    return k2 in m2 ? yes(m2[k2]) : no2;
  }
  function toArrayWithKey(f2) {
    return function(m2) {
      var r2 = [];
      for (var k2 in m2) {
        if (hasOwnProperty.call(m2, k2)) {
          r2.push(f2(k2)(m2[k2]));
        }
      }
      return r2;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k2) {
    return function() {
      return k2;
    };
  });

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value17) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value17);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value17) {
      var result = [];
      var n2 = 0;
      for (var i3 = 0; i3 < count; i3++) {
        result[n2++] = value17;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail3) {
        return new Cons3(head6, tail3);
      };
    }
    function listToArray(list2) {
      var result = [];
      var count = 0;
      var xs = list2;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr4) {
      return function(xs) {
        return listToArray(foldr4(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty7) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty7({}) : next(xs[0])(xs.slice(1));
      };
    };
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i3) {
          return i3 < 0 || i3 >= xs.length ? nothing : just(xs[i3]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f2) {
        return function(xs) {
          for (var i3 = 0, l2 = xs.length; i3 < l2; i3++) {
            if (f2(xs[i3]))
              return just(i3);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i3) {
        return function(l2) {
          if (i3 < 0 || i3 >= l2.length)
            return nothing;
          var l1 = l2.slice();
          l1.splice(i3, 1);
          return just(l1);
        };
      };
    };
  };
  var filter2 = function(f2) {
    return function(xs) {
      return xs.filter(f2);
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i3;
      var j2;
      var k2;
      var x2;
      var y2;
      var c2;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to3);
      i3 = from3;
      j2 = mid;
      k2 = from3;
      while (i3 < mid && j2 < to3) {
        x2 = xs2[i3];
        y2 = xs2[j2];
        c2 = fromOrdering(compare3(x2)(y2));
        if (c2 > 0) {
          xs1[k2++] = y2;
          ++j2;
        } else {
          xs1[k2++] = x2;
          ++i3;
        }
      }
      while (i3 < mid) {
        xs1[k2++] = xs2[i3++];
      }
      while (j2 < to3) {
        xs1[k2++] = xs2[j2++];
      }
    }
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice2 = function(s2) {
    return function(e2) {
      return function(l2) {
        return l2.slice(s2, e2);
      };
    };
  };
  var any2 = function(p3) {
    return function(xs) {
      var len = xs.length;
      for (var i3 = 0; i3 < len; i3++) {
        if (p3(xs[i3]))
          return true;
      }
      return false;
    };
  };
  var unsafeIndexImpl = function(xs) {
    return function(n2) {
      return xs[n2];
    };
  };

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as2) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as2);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i3;
      var j2;
      var k2;
      var x2;
      var y2;
      var c2;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to3);
      i3 = from3;
      j2 = mid;
      k2 = from3;
      while (i3 < mid && j2 < to3) {
        x2 = xs2[i3];
        y2 = xs2[j2];
        c2 = fromOrdering(compare3(x2)(y2));
        if (c2 > 0) {
          xs1[k2++] = y2;
          ++j2;
        } else {
          xs1[k2++] = x2;
          ++i3;
        }
      }
      while (i3 < mid) {
        xs1[k2++] = xs2[i3++];
      }
      while (j2 < to3) {
        xs1[k2++] = xs2[j2++];
      }
    }
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f2) {
    return function(xs) {
      return function __do2() {
        var result = thaw(xs)();
        f2(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a3) {
    return pushAll([a3]);
  };

  // output/Data.Array/index.js
  var map13 = /* @__PURE__ */ map(functorMaybe);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var unsafeIndex = function() {
    return unsafeIndexImpl;
  };
  var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
  var tail = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(v2) {
      return function(xs) {
        return new Just(xs);
      };
    });
  }();
  var sortBy2 = function(comp) {
    return sortByImpl(comp)(function(v2) {
      if (v2 instanceof GT) {
        return 1;
      }
      ;
      if (v2 instanceof EQ) {
        return 0;
      }
      ;
      if (v2 instanceof LT) {
        return -1 | 0;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 829, column 31 - line 832, column 11): " + [v2.constructor.name]);
    });
  };
  var sortWith = function(dictOrd) {
    var comparing2 = comparing(dictOrd);
    return function(f2) {
      return sortBy2(comparing2(f2));
    };
  };
  var snoc2 = function(xs) {
    return function(x2) {
      return withArray(push(x2))(xs)();
    };
  };
  var singleton5 = function(a3) {
    return [a3];
  };
  var $$null2 = function(xs) {
    return length3(xs) === 0;
  };
  var init2 = function(xs) {
    if ($$null2(xs)) {
      return Nothing.value;
    }
    ;
    if (otherwise) {
      return new Just(slice2(0)(length3(xs) - 1 | 0)(xs));
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 338, column 1 - line 338, column 45): " + [xs.constructor.name]);
  };
  var index2 = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last2 = function(xs) {
    return index2(xs)(length3(xs) - 1 | 0);
  };
  var head2 = function(xs) {
    return index2(xs)(0);
  };
  var fromFoldable2 = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var findIndex2 = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var find2 = function(f2) {
    return function(xs) {
      return map13(unsafeIndex1(xs))(findIndex2(f2)(xs));
    };
  };
  var elemIndex = function(dictEq) {
    var eq22 = eq(dictEq);
    return function(x2) {
      return findIndex2(function(v2) {
        return eq22(v2)(x2);
      });
    };
  };
  var elem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a3) {
      return function(arr) {
        return isJust(elemIndex1(a3)(arr));
      };
    };
  };
  var drop3 = function(n2) {
    return function(xs) {
      var $167 = n2 < 1;
      if ($167) {
        return xs;
      }
      ;
      return slice2(n2)(length3(xs))(xs);
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22.length === 0) {
          return [];
        }
        ;
        return maybe(v22)(function(i3) {
          return fromJust4(deleteAt(i3)(v22));
        })(findIndex2(v2(v1))(v22));
      };
    };
  };
  var cons3 = function(x2) {
    return function(xs) {
      return append2([x2])(xs);
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn2) {
    return function(a3, b3, c2, d2, e2) {
      return fn2(a3)(b3)(c2)(d2)(e2);
    };
  };
  var runFn3 = function(fn2) {
    return function(a3) {
      return function(b3) {
        return function(c2) {
          return fn2(a3, b3, c2);
        };
      };
    };
  };
  var runFn4 = function(fn2) {
    return function(a3) {
      return function(b3) {
        return function(c2) {
          return function(d2) {
            return fn2(a3, b3, c2, d2);
          };
        };
      };
    };
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k2) {
    return function(v2) {
      return function(m2) {
        return function() {
          m2[k2] = v2;
          return m2;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var thawST = _copyST;
  var mutate = function(f2) {
    return function(m2) {
      return runST(function __do2() {
        var s2 = thawST(m2)();
        f2(s2)();
        return s2;
      });
    };
  };
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var insert = function(k2) {
    return function(v2) {
      return mutate(poke2(k2)(v2));
    };
  };

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f2) {
      return function(g2) {
        return g2(def)(f2);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var jsonEmptyObject = /* @__PURE__ */ id(empty2);
  var isJsonType = /* @__PURE__ */ verbJsonType(false)(/* @__PURE__ */ $$const(true));
  var caseJsonString = function(d2) {
    return function(f2) {
      return function(j2) {
        return _caseJson($$const(d2), $$const(d2), $$const(d2), f2, $$const(d2), $$const(d2), j2);
      };
    };
  };
  var caseJsonObject = function(d2) {
    return function(f2) {
      return function(j2) {
        return _caseJson($$const(d2), $$const(d2), $$const(d2), $$const(d2), $$const(d2), f2, j2);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d2) {
    return function(f2) {
      return function(j2) {
        return _caseJson($$const(d2), $$const(d2), f2, $$const(d2), $$const(d2), $$const(d2), j2);
      };
    };
  };
  var caseJsonNull = function(d2) {
    return function(f2) {
      return function(j2) {
        return _caseJson(f2, $$const(d2), $$const(d2), $$const(d2), $$const(d2), $$const(d2), j2);
      };
    };
  };
  var isNull2 = /* @__PURE__ */ isJsonType(caseJsonNull);
  var caseJsonArray = function(d2) {
    return function(f2) {
      return function(j2) {
        return _caseJson($$const(d2), $$const(d2), $$const(d2), $$const(d2), f2, $$const(d2), j2);
      };
    };
  };
  var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);

  // output/Data.Argonaut.Decode.Error/index.js
  var show3 = /* @__PURE__ */ show(showString);
  var show12 = /* @__PURE__ */ show(showInt);
  var TypeMismatch2 = /* @__PURE__ */ function() {
    function TypeMismatch3(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return new TypeMismatch3(value0);
    };
    return TypeMismatch3;
  }();
  var UnexpectedValue = /* @__PURE__ */ function() {
    function UnexpectedValue2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue2.create = function(value0) {
      return new UnexpectedValue2(value0);
    };
    return UnexpectedValue2;
  }();
  var AtIndex = /* @__PURE__ */ function() {
    function AtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtIndex2.create = function(value0) {
      return function(value1) {
        return new AtIndex2(value0, value1);
      };
    };
    return AtIndex2;
  }();
  var AtKey = /* @__PURE__ */ function() {
    function AtKey2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtKey2.create = function(value0) {
      return function(value1) {
        return new AtKey2(value0, value1);
      };
    };
    return AtKey2;
  }();
  var Named = /* @__PURE__ */ function() {
    function Named2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Named2.create = function(value0) {
      return function(value1) {
        return new Named2(value0, value1);
      };
    };
    return Named2;
  }();
  var MissingValue = /* @__PURE__ */ function() {
    function MissingValue2() {
    }
    ;
    MissingValue2.value = new MissingValue2();
    return MissingValue2;
  }();
  var showJsonDecodeError = {
    show: function(v2) {
      if (v2 instanceof TypeMismatch2) {
        return "(TypeMismatch " + (show3(v2.value0) + ")");
      }
      ;
      if (v2 instanceof UnexpectedValue) {
        return "(UnexpectedValue " + (stringify(v2.value0) + ")");
      }
      ;
      if (v2 instanceof AtIndex) {
        return "(AtIndex " + (show12(v2.value0) + (" " + (show(showJsonDecodeError)(v2.value1) + ")")));
      }
      ;
      if (v2 instanceof AtKey) {
        return "(AtKey " + (show3(v2.value0) + (" " + (show(showJsonDecodeError)(v2.value1) + ")")));
      }
      ;
      if (v2 instanceof Named) {
        return "(Named " + (show3(v2.value0) + (" " + (show(showJsonDecodeError)(v2.value1) + ")")));
      }
      ;
      if (v2 instanceof MissingValue) {
        return "MissingValue";
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 24, column 10 - line 30, column 35): " + [v2.constructor.name]);
    }
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn2) {
      this.fn = fn2;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x2) {
      return function(xs) {
        return new ConsCell(x2, xs);
      };
    }
    function listToArray(list2) {
      var arr = [];
      var xs = list2;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply6) {
      return function(map53) {
        return function(f2) {
          var buildFrom = function(x2, ys) {
            return apply6(map53(consList)(f2(x2)))(ys);
          };
          var go3 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last4 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go3(buildFrom(last4, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map53(finalCell)(f2(array[array.length - 1]));
            var result = go3(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map53(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x2) {
    return x2;
  };
  var semigroupNonEmptyArray = semigroupArray;
  var functorNonEmptyArray = functorArray;
  var foldableNonEmptyArray = foldableArray;
  var applicativeNonEmptyArray = applicativeArray;

  // output/Data.Array.NonEmpty/index.js
  var fromJust5 = /* @__PURE__ */ fromJust();
  var unsafeIndex12 = /* @__PURE__ */ unsafeIndex();
  var unsafeFromArray = NonEmptyArray;
  var toArray2 = function(v2) {
    return v2;
  };
  var snoc$prime = function(xs) {
    return function(x2) {
      return unsafeFromArray(snoc2(xs)(x2));
    };
  };
  var snoc3 = function(xs) {
    return function(x2) {
      return unsafeFromArray(snoc2(toArray2(xs))(x2));
    };
  };
  var singleton7 = function($108) {
    return unsafeFromArray(singleton5($108));
  };
  var fromArray = function(xs) {
    if (length3(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 157, column 1 - line 157, column 58): " + [xs.constructor.name]);
  };
  var cons$prime2 = function(x2) {
    return function(xs) {
      return unsafeFromArray(cons3(x2)(xs));
    };
  };
  var adaptMaybe = function(f2) {
    return function($123) {
      return fromJust5(f2(toArray2($123)));
    };
  };
  var head3 = /* @__PURE__ */ adaptMaybe(head2);
  var init3 = /* @__PURE__ */ adaptMaybe(init2);
  var last3 = /* @__PURE__ */ adaptMaybe(last2);
  var tail2 = /* @__PURE__ */ adaptMaybe(tail);
  var adaptAny = function(f2) {
    return function($125) {
      return f2(toArray2($125));
    };
  };
  var length4 = /* @__PURE__ */ adaptAny(length3);
  var unsafeAdapt = function(f2) {
    var $126 = adaptAny(f2);
    return function($127) {
      return unsafeFromArray($126($127));
    };
  };
  var cons4 = function(x2) {
    return unsafeAdapt(cons3(x2));
  };
  var unsafeIndex2 = function() {
    return adaptAny(unsafeIndex12);
  };
  var unsafeIndex22 = /* @__PURE__ */ unsafeIndex2();
  var toUnfoldable1 = function(dictUnfoldable1) {
    var unfoldr12 = unfoldr1(dictUnfoldable1);
    return function(xs) {
      var len = length4(xs);
      var f2 = function(i3) {
        return new Tuple(unsafeIndex22(xs)(i3), function() {
          var $97 = i3 < (len - 1 | 0);
          if ($97) {
            return new Just(i3 + 1 | 0);
          }
          ;
          return Nothing.value;
        }());
      };
      return unfoldr12(f2)(0);
    };
  };

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v2 = null;
    return function() {
      if (thunk === void 0)
        return v2;
      v2 = thunk();
      thunk = void 0;
      return v2;
    };
  };
  var force = function(l2) {
    return l2();
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var lookup2 = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k2) {
      var go3 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v2) {
          if (v2 instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v2 instanceof Two) {
            var v22 = compare3(k2)(v2.value1);
            if (v22 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value2);
            }
            ;
            if (v22 instanceof LT) {
              $copy_v = v2.value0;
              return;
            }
            ;
            $copy_v = v2.value3;
            return;
          }
          ;
          if (v2 instanceof Three) {
            var v3 = compare3(k2)(v2.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value2);
            }
            ;
            var v4 = compare3(k2)(v2.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v2.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v2.value6;
              return;
            }
            ;
            $copy_v = v2.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go3;
    };
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_tree) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v2, tree) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (v2 instanceof Cons) {
            if (v2.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Two(tree, v2.value0.value0, v2.value0.value1, v2.value0.value2);
              return;
            }
            ;
            if (v2.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Two(v2.value0.value0, v2.value0.value1, v2.value0.value2, tree);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(tree, v2.value0.value0, v2.value0.value1, v2.value0.value2, v2.value0.value3, v2.value0.value4, v2.value0.value5);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(v2.value0.value0, v2.value0.value1, v2.value0.value2, tree, v2.value0.value3, v2.value0.value4, v2.value0.value5);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(v2.value0.value0, v2.value0.value1, v2.value0.value2, v2.value0.value3, v2.value0.value4, v2.value0.value5, tree);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v2.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v2.constructor.name, tree.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert3 = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare3 = compare(dictOrd);
    return function(k2) {
      return function(v2) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v22) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v22.value0, v22.value1, v22.value2, v22.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v22.value0, v22.value1, v22.value2, v22.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v22.value0, v22.value1, v22.value2, v22.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v22.value0, v22.value1, v22.value2, v22.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v22.value0), v22.value1, v22.value2, new Two(v22.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v22.value0, v22.value1, v22.value2, v22.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v22.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v22.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_ctx) {
          return function($copy_v1) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(ctx, v1) {
              if (v1 instanceof Leaf) {
                $tco_done1 = true;
                return up(ctx)(new KickUp(Leaf.value, k2, v2, Leaf.value));
              }
              ;
              if (v1 instanceof Two) {
                var v22 = compare3(k2)(v1.value1);
                if (v22 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Two(v1.value0, k2, v2, v1.value3));
                }
                ;
                if (v22 instanceof LT) {
                  $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              if (v1 instanceof Three) {
                var v3 = compare3(k2)(v1.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, k2, v2, v1.value3, v1.value4, v1.value5, v1.value6));
                }
                ;
                var v4 = compare3(k2)(v1.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k2, v2, v1.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value3;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                $copy_v1 = v1.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare3 = compare(dictOrd);
    return function(k2) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Two && (m2.value0 instanceof Leaf && m2.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m2 instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three && (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m2.value1, m2.value2), ctx))(Leaf.value);
            }
            ;
            if (m2 instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m2) {
          if (m2 instanceof Two && m2.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value1,
              value: m2.value2
            };
          }
          ;
          if (m2 instanceof Two) {
            $copy_m = m2.value3;
            return;
          }
          ;
          if (m2 instanceof Three && m2.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value4,
              value: m2.value5
            };
          }
          ;
          if (m2 instanceof Three) {
            $copy_m = m2.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m2 instanceof Two) {
              var v2 = compare3(k2)(m2.value1);
              if (m2.value3 instanceof Leaf && v2 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v2 instanceof EQ) {
                var max7 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new TwoLeft(max7.key, max7.value, m2.value3), ctx))(m2.value0)));
              }
              ;
              if (v2 instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m2.value1, m2.value2, m2.value3), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three) {
              var leaves = function() {
                if (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v2 = compare3(k2)(m2.value4);
              var v3 = compare3(k2)(m2.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, fromZipper1(ctx)(new Two(Leaf.value, m2.value4, m2.value5, Leaf.value))));
              }
              ;
              if (leaves && v2 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, fromZipper1(ctx)(new Two(Leaf.value, m2.value1, m2.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max7 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new ThreeLeft(max7.key, max7.value, m2.value3, m2.value4, m2.value5, m2.value6), ctx))(m2.value0)));
              }
              ;
              if (v2 instanceof EQ) {
                var max7 = maxNode(m2.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, removeMaxNode(new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, max7.key, max7.value, m2.value6), ctx))(m2.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m2.value1, m2.value2, m2.value3, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v2 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m2.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f2) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldr(foldableMap)(f2)(f2(m2.value2)(foldr(foldableMap)(f2)(z2)(m2.value3)))(m2.value0);
          }
          ;
          if (m2 instanceof Three) {
            return foldr(foldableMap)(f2)(f2(m2.value2)(foldr(foldableMap)(f2)(f2(m2.value5)(foldr(foldableMap)(f2)(z2)(m2.value6)))(m2.value3)))(m2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldl: function(f2) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldl(foldableMap)(f2)(f2(foldl(foldableMap)(f2)(z2)(m2.value0))(m2.value2))(m2.value3);
          }
          ;
          if (m2 instanceof Three) {
            return foldl(foldableMap)(f2)(f2(foldl(foldableMap)(f2)(f2(foldl(foldableMap)(f2)(z2)(m2.value0))(m2.value2))(m2.value3))(m2.value5))(m2.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty5;
          }
          ;
          if (m2 instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f2)(m2.value0))(append22(f2(m2.value2))(foldMap(foldableMap)(dictMonoid)(f2)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f2)(m2.value0))(append22(f2(m2.value2))(append22(foldMap(foldableMap)(dictMonoid)(f2)(m2.value3))(append22(f2(m2.value5))(foldMap(foldableMap)(dictMonoid)(f2)(m2.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m2.constructor.name]);
        };
      };
    }
  };
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var pop12 = pop(dictOrd);
    return function(k2) {
      return function(m2) {
        return maybe(m2)(snd)(pop12(k2)(m2));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup13 = lookup2(dictOrd);
    var delete1 = $$delete2(dictOrd);
    var insert13 = insert3(dictOrd);
    return function(f2) {
      return function(k2) {
        return function(m2) {
          var v2 = f2(lookup13(k2)(m2));
          if (v2 instanceof Nothing) {
            return delete1(k2)(m2);
          }
          ;
          if (v2 instanceof Just) {
            return insert13(k2)(v2.value0)(m2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v2.constructor.name]);
        };
      };
    };
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index6) {
            return function(str) {
              var length11 = str.length;
              if (index6 < 0 || index6 >= length11)
                return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i3 = index6; ; --i3) {
                  var o2 = iter.next();
                  if (o2.done)
                    return Nothing2;
                  if (i3 === 0)
                    return Just2(unsafeCodePointAt02(o2.value));
                }
              }
              return fallback(index6)(str);
            };
          };
        };
      };
    };
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n2) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i3 = 0; i3 < n2; ++i3) {
            var o2 = iter.next();
            if (o2.done)
              return accum;
            accum += o2.value;
          }
          return accum;
        };
      }
      return fallback(n2);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c2) {
    return c2.charCodeAt(0);
  }
  function fromCharCode(c2) {
    return String.fromCharCode(c2);
  }

  // output/Control.Alternative/index.js
  var guard = function(dictAlternative) {
    var pure27 = pure(dictAlternative.Applicative0());
    var empty7 = empty(dictAlternative.Plus1());
    return function(v2) {
      if (v2) {
        return pure27(unit);
      }
      ;
      if (!v2) {
        return empty7;
      }
      ;
      throw new Error("Failed pattern match at Control.Alternative (line 48, column 1 - line 48, column 54): " + [v2.constructor.name]);
    };
  };

  // output/Data.Enum/index.js
  var top3 = /* @__PURE__ */ top(boundedInt);
  var bottom3 = /* @__PURE__ */ bottom(boundedInt);
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorMaybe);
  var guard2 = /* @__PURE__ */ guard(alternativeMaybe);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var succ = function(dict) {
    return dict.succ;
  };
  var pred = function(dict) {
    return dict.pred;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum12 = fromEnum(dictBoundedEnum);
    var bottom1 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x2) {
          var v2 = toEnum1(x2);
          if (v2 instanceof Just) {
            return v2.value0;
          }
          ;
          if (v2 instanceof Nothing) {
            var $140 = x2 < fromEnum12(bottom1);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v2.constructor.name]);
        };
      };
    };
  };
  var enumFromTo = function(dictEnum) {
    var Ord0 = dictEnum.Ord0();
    var eq12 = eq(Ord0.Eq0());
    var lessThan1 = lessThan(Ord0);
    var succ1 = succ(dictEnum);
    var lessThanOrEq1 = lessThanOrEq(Ord0);
    var pred1 = pred(dictEnum);
    var greaterThanOrEq1 = greaterThanOrEq(Ord0);
    return function(dictUnfoldable1) {
      var singleton12 = singleton(dictUnfoldable1);
      var unfoldr12 = unfoldr1(dictUnfoldable1);
      var go3 = function(step5) {
        return function(op) {
          return function(to3) {
            return function(a3) {
              return new Tuple(a3, bind3(step5(a3))(function(a$prime) {
                return voidLeft2(guard2(op(a$prime)(to3)))(a$prime);
              }));
            };
          };
        };
      };
      return function(v2) {
        return function(v1) {
          if (eq12(v2)(v1)) {
            return singleton12(v2);
          }
          ;
          if (lessThan1(v2)(v1)) {
            return unfoldr12(go3(succ1)(lessThanOrEq1)(v1))(v2);
          }
          ;
          if (otherwise) {
            return unfoldr12(go3(pred1)(greaterThanOrEq1)(v1))(v2);
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 186, column 14 - line 190, column 51): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a3) {
        return toEnum$prime(fromEnum$prime(a3) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a3) {
        return toEnum$prime(fromEnum$prime(a3) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v2) {
    if (v2 >= bottom3 && v2 <= top3) {
      return new Just(fromCharCode(v2));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s2) {
      return s2.split(sep);
    };
  };
  var toLower = function(s2) {
    return s2.toLowerCase();
  };
  var trim = function(s2) {
    return s2.trim();
  };
  var joinWith = function(s2) {
    return function(xs) {
      return xs.join(s2);
    };
  };

  // output/Data.String.Common/index.js
  var $$null3 = function(s2) {
    return s2 === "";
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy3 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map9 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var CodePoint = function(x2) {
    return x2;
  };
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons3 = function(s2) {
    var v2 = length2(s2);
    if (v2 === 0) {
      return Nothing.value;
    }
    ;
    if (v2 === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s2)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s2));
    var cu0 = fromEnum2(charAt(0)(s2));
    var $42 = isLead(cu0) && isTrail(cu1);
    if ($42) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s2)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s2)
    });
  };
  var unconsButWithTuple = function(s2) {
    return map9(function(v2) {
      return new Tuple(v2.head, v2.tail);
    })(uncons3(s2));
  };
  var toCodePointArrayFallback = function(s2) {
    return unfoldr2(unconsButWithTuple)(s2);
  };
  var unsafeCodePointAt0Fallback = function(s2) {
    var cu0 = fromEnum2(charAt(0)(s2));
    var $46 = isLead(cu0) && length2(s2) > 1;
    if ($46) {
      var cu1 = fromEnum2(charAt(1)(s2));
      var $47 = isTrail(cu1);
      if ($47) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length5 = function($73) {
    return length3(toCodePointArray($73));
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $74 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($75) {
      return singleton4($74($75));
    };
  }();
  var singletonFallback = function(v2) {
    if (v2 <= 65535) {
      return fromCharCode2(v2);
    }
    ;
    var lead = div2(v2 - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v2 - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton9 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(n2) {
    return function(v2) {
      if (n2 < 1) {
        return "";
      }
      ;
      var v1 = uncons3(v2);
      if (v1 instanceof Just) {
        return singleton9(v1.value0.head) + takeFallback(n2 - 1 | 0)(v1.value0.tail);
      }
      ;
      return v2;
    };
  };
  var take4 = /* @__PURE__ */ _take(takeFallback);
  var eqCodePoint = {
    eq: function(x2) {
      return function(y2) {
        return x2 === y2;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x2) {
      return function(y2) {
        return compare2(x2)(y2);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var drop4 = function(n2) {
    return function(s2) {
      return drop2(length2(take4(n2)(s2)))(s2);
    };
  };
  var codePointFromChar = function($76) {
    return CodePoint(fromEnum2($76));
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n2, s2) {
        var v2 = uncons3(s2);
        if (v2 instanceof Just) {
          var $65 = n2 === 0;
          if ($65) {
            $tco_done = true;
            return new Just(v2.value0.head);
          }
          ;
          $tco_var_n = n2 - 1 | 0;
          $copy_s = v2.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v2) {
    return function(v1) {
      if (v2 < 0) {
        return Nothing.value;
      }
      ;
      if (v2 === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v2 === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v2)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v2) {
        return v2;
      },
      toEnum: function(n2) {
        if (n2 >= 0 && n2 <= 1114111) {
          return new Just(n2);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n2.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy3("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Data.String.NonEmpty.Internal/index.js
  var show4 = /* @__PURE__ */ show(showString);
  var fromJust6 = /* @__PURE__ */ fromJust();
  var NonEmptyString = function(x2) {
    return x2;
  };
  var toString = function(v2) {
    return v2;
  };
  var showNonEmptyString = {
    show: function(v2) {
      return "(NonEmptyString.unsafeFromString " + (show4(v2) + ")");
    }
  };
  var semigroupNonEmptyString = semigroupString;
  var joinWith2 = function(dictFoldable) {
    var intercalate5 = intercalate2(dictFoldable)(monoidString);
    return function(splice2) {
      var $61 = intercalate5(splice2);
      return function($62) {
        return $61($62);
      };
    };
  };
  var fromString = function(v2) {
    if (v2 === "") {
      return Nothing.value;
    }
    ;
    return new Just(v2);
  };
  var unsafeFromString = function() {
    return function($65) {
      return fromJust6(fromString($65));
    };
  };

  // output/Data.Argonaut.Decode.Decoders/index.js
  var pure3 = /* @__PURE__ */ pure(applicativeEither);
  var map10 = /* @__PURE__ */ map(functorEither);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEither);
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEither);
  var decodeString = /* @__PURE__ */ function() {
    return caseJsonString(new Left(new TypeMismatch2("String")))(Right.create);
  }();
  var decodeNumber = /* @__PURE__ */ function() {
    return caseJsonNumber(new Left(new TypeMismatch2("Number")))(Right.create);
  }();
  var decodeMaybe = function(decoder) {
    return function(json2) {
      if (isNull2(json2)) {
        return pure3(Nothing.value);
      }
      ;
      if (otherwise) {
        return map10(Just.create)(decoder(json2));
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Decoders (line 37, column 1 - line 41, column 38): " + [decoder.constructor.name, json2.constructor.name]);
    };
  };
  var decodeJArray = /* @__PURE__ */ function() {
    var $52 = note(new TypeMismatch2("Array"));
    return function($53) {
      return $52(toArray($53));
    };
  }();
  var decodeArray = function(decoder) {
    return composeKleisliFlipped2(function() {
      var $89 = lmap2(Named.create("Array"));
      var $90 = traverseWithIndex2(function(i3) {
        var $92 = lmap2(AtIndex.create(i3));
        return function($93) {
          return $92(decoder($93));
        };
      });
      return function($91) {
        return $89($90($91));
      };
    }())(decodeJArray);
  };

  // output/Record/index.js
  var insert4 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l2) {
          return function(a3) {
            return function(r2) {
              return unsafeSet(reflectSymbol2(l2))(a3)(r2);
            };
          };
        };
      };
    };
  };
  var get = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l2) {
        return function(r2) {
          return unsafeGet(reflectSymbol2(l2))(r2);
        };
      };
    };
  };

  // output/Data.Argonaut.Decode.Class/index.js
  var bind4 = /* @__PURE__ */ bind(bindEither);
  var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
  var map11 = /* @__PURE__ */ map(functorMaybe);
  var gDecodeJsonNil = {
    gDecodeJson: function(v2) {
      return function(v1) {
        return new Right({});
      };
    }
  };
  var gDecodeJson = function(dict) {
    return dict.gDecodeJson;
  };
  var decodeRecord = function(dictGDecodeJson) {
    var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
    return function() {
      return {
        decodeJson: function(json2) {
          var v2 = toObject(json2);
          if (v2 instanceof Just) {
            return gDecodeJson1(v2.value0)($$Proxy.value);
          }
          ;
          if (v2 instanceof Nothing) {
            return new Left(new TypeMismatch2("Object"));
          }
          ;
          throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v2.constructor.name]);
        }
      };
    };
  };
  var decodeJsonString = {
    decodeJson: decodeString
  };
  var decodeJsonNumber = {
    decodeJson: decodeNumber
  };
  var decodeJsonField = function(dict) {
    return dict.decodeJsonField;
  };
  var gDecodeJsonCons = function(dictDecodeJsonField) {
    var decodeJsonField1 = decodeJsonField(dictDecodeJsonField);
    return function(dictGDecodeJson) {
      var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var insert9 = insert4(dictIsSymbol)()();
        return function() {
          return function() {
            return {
              gDecodeJson: function(object2) {
                return function(v2) {
                  var fieldName = reflectSymbol2($$Proxy.value);
                  var fieldValue = lookup(fieldName)(object2);
                  var v1 = decodeJsonField1(fieldValue);
                  if (v1 instanceof Just) {
                    return bind4(lmap3(AtKey.create(fieldName))(v1.value0))(function(val) {
                      return bind4(gDecodeJson1(object2)($$Proxy.value))(function(rest2) {
                        return new Right(insert9($$Proxy.value)(val)(rest2));
                      });
                    });
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return new Left(new AtKey(fieldName, MissingValue.value));
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
                };
              }
            };
          };
        };
      };
    };
  };
  var decodeJson = function(dict) {
    return dict.decodeJson;
  };
  var decodeJsonMaybe = function(dictDecodeJson) {
    return {
      decodeJson: decodeMaybe(decodeJson(dictDecodeJson))
    };
  };
  var decodeFieldMaybe = function(dictDecodeJson) {
    var decodeJson12 = decodeJson(decodeJsonMaybe(dictDecodeJson));
    return {
      decodeJsonField: function(v2) {
        if (v2 instanceof Nothing) {
          return new Just(new Right(Nothing.value));
        }
        ;
        if (v2 instanceof Just) {
          return new Just(decodeJson12(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 139, column 1 - line 143, column 49): " + [v2.constructor.name]);
      }
    };
  };
  var decodeFieldId = function(dictDecodeJson) {
    var decodeJson12 = decodeJson(dictDecodeJson);
    return {
      decodeJsonField: function(j2) {
        return map11(decodeJson12)(j2);
      }
    };
  };
  var decodeArray2 = function(dictDecodeJson) {
    return {
      decodeJson: decodeArray(decodeJson(dictDecodeJson))
    };
  };

  // output/Data.Argonaut.Encode.Encoders/index.js
  var encodeString = id;
  var encodeNumber = id;
  var encodeNonEmptyString = function($44) {
    return id(toString($44));
  };

  // output/Data.Argonaut.Encode.Class/index.js
  var gEncodeJsonNil = {
    gEncodeJson: function(v2) {
      return function(v1) {
        return empty2;
      };
    }
  };
  var gEncodeJson = function(dict) {
    return dict.gEncodeJson;
  };
  var encodeRecord = function(dictGEncodeJson) {
    var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
    return function() {
      return {
        encodeJson: function(rec) {
          return id(gEncodeJson1(rec)($$Proxy.value));
        }
      };
    };
  };
  var encodeNonEmptyString2 = {
    encodeJson: encodeNonEmptyString
  };
  var encodeJsonJString = {
    encodeJson: encodeString
  };
  var encodeJsonJNumber = {
    encodeJson: encodeNumber
  };
  var encodeJson = function(dict) {
    return dict.encodeJson;
  };
  var gEncodeJsonCons = function(dictEncodeJson) {
    var encodeJson1 = encodeJson(dictEncodeJson);
    return function(dictGEncodeJson) {
      var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var get4 = get(dictIsSymbol)();
        return function() {
          return {
            gEncodeJson: function(row) {
              return function(v2) {
                return insert(reflectSymbol2($$Proxy.value))(encodeJson1(get4($$Proxy.value)(row)))(gEncodeJson1(row)($$Proxy.value));
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Auth.Token/index.js
  var Token = function(x2) {
    return x2;
  };
  var unsafe = Token;
  var toString3 = function(v2) {
    return v2;
  };

  // output/Effect.Aff.Class/index.js
  var lift1 = /* @__PURE__ */ lift(monadTransExceptT);
  var lift42 = /* @__PURE__ */ lift(monadTransReaderT);
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };
  var monadAffExceptT = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var monadEffectExceptT2 = monadEffectExceptT(MonadEffect0);
    return {
      liftAff: function() {
        var $68 = lift1(MonadEffect0.Monad0());
        var $69 = liftAff(dictMonadAff);
        return function($70) {
          return $68($69($70));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectExceptT2;
      }
    };
  };
  var monadAffReader = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var monadEffectReader2 = monadEffectReader(MonadEffect0);
    return {
      liftAff: function() {
        var $79 = lift42(MonadEffect0.Monad0());
        var $80 = liftAff(dictMonadAff);
        return function($81) {
          return $79($80($81));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectReader2;
      }
    };
  };

  // output/Auth0/index.js
  var newClient = function($69) {
    return toAffE(_client($69));
  };
  var loginWithRedirect = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      var liftAff4 = liftAff(dictMonadAff);
      return bind(dictMonadAff.MonadEffect0().Monad0().Bind1())(asks3(function(v2) {
        return v2.auth0Config;
      }))(function(v2) {
        return liftAff4(toAff(_loginWithRedirect(v2.client)({
          redirect_uri: v2.redirectUri,
          audience: "https://puremess:8081/",
          scope: "api"
        })));
      });
    };
  };
  var isAuthenticated = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      return bind(dictMonadAff.MonadEffect0().Monad0().Bind1())(asks3(function(v2) {
        return v2.auth0Config.client;
      }))(function() {
        var $72 = liftAff(dictMonadAff);
        return function($73) {
          return $72(toAff(_isAuthenticated($73)));
        };
      }());
    };
  };
  var handleRedirectCallback = function(dictMonadAff) {
    var $74 = liftAff(dictMonadAff);
    return function($75) {
      return $74(toAffE(_handleRedirectCallback($75)));
    };
  };
  var getUser = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      return bind(dictMonadAff.MonadEffect0().Monad0().Bind1())(asks3(function(v2) {
        return v2.auth0Config.client;
      }))(function() {
        var $76 = liftAff(dictMonadAff);
        return function($77) {
          return $76(toAff(_getUser($77)));
        };
      }());
    };
  };
  var getTokenSilently = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      var Monad0 = dictMonadAff.MonadEffect0().Monad0();
      var bind28 = bind(Monad0.Bind1());
      var liftAff4 = liftAff(dictMonadAff);
      var pure27 = pure(Monad0.Applicative0());
      return bind28(asks3(function(v2) {
        return v2.auth0Config.client;
      }))(function(client) {
        return bind28(liftAff4(toAffE(_getTokenSilently(client)({
          detailedResponse: false
        }))))(function(token4) {
          return pure27(unsafe(token4));
        });
      });
    };
  };
  var clientConfig = /* @__PURE__ */ function() {
    var $78 = liftAff(monadAffAff);
    return function($79) {
      return $78(toAffE(_config($79)));
    };
  }();
  var buildAuthorizeUrl = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      var liftAff4 = liftAff(dictMonadAff);
      return bind(dictMonadAff.MonadEffect0().Monad0().Bind1())(asks3(function(v2) {
        return v2.auth0Config;
      }))(function(v2) {
        return liftAff4(toAff(_buildAuthorizeUrl(v2.client)({
          redirect_uri: v2.redirectUri,
          audience: "https://puremess:8081/",
          scope: "api"
        })));
      });
    };
  };

  // output/Control.Monad.Error.Hoist/index.js
  var hoistErrorEither = function(dictMonadThrow) {
    var throwError5 = throwError(dictMonadThrow);
    var pure27 = pure(dictMonadThrow.Monad0().Applicative0());
    return {
      hoistError: function(f2) {
        return either(function($40) {
          return throwError5(f2($40));
        })(pure27);
      }
    };
  };
  var hoistError = function(dict) {
    return dict.hoistError;
  };
  var hoistErrorFlipped = function(dictHoistError) {
    return flip(hoistError(dictHoistError));
  };
  var hoistErrorM = function(dictBind) {
    var bind28 = bind(dictBind);
    return function(dictHoistError) {
      var hoistError1 = hoistError(dictHoistError);
      return function(f2) {
        return function(m2) {
          return bind28(m2)(hoistError1(f2));
        };
      };
    };
  };
  var hoistErrorMFlipped = function(dictBind) {
    var hoistErrorM1 = hoistErrorM(dictBind);
    return function(dictHoistError) {
      return flip(hoistErrorM1(dictHoistError));
    };
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f2, s2, key2, value17) {
    return value17 == null ? f2 : s2(value17[key2]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail5 = fail(dictMonad);
    var pure27 = pure(applicativeExceptT(dictMonad));
    return function(k2) {
      return function(value17) {
        return unsafeReadPropImpl(fail5(new TypeMismatch("object", typeOf(value17))), pure27, k2, value17);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Foreign.Generic.Class/index.js
  var readString3 = /* @__PURE__ */ readString(monadIdentity);
  var stringDecode = {
    decode: readString3
  };
  var decode2 = function(dict) {
    return dict.decode;
  };

  // output/Data.Char/index.js
  var toCharCode2 = /* @__PURE__ */ fromEnum(boundedEnumChar);

  // output/Data.Show.Generic/foreign.js
  var intercalate4 = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show.Generic/index.js
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var genericShowArgsNoArguments = {
    genericShowArgs: function(v2) {
      return [];
    }
  };
  var genericShowArgsArgument = function(dictShow) {
    var show31 = show(dictShow);
    return {
      genericShowArgs: function(v2) {
        return [show31(v2)];
      }
    };
  };
  var genericShowArgs = function(dict) {
    return dict.genericShowArgs;
  };
  var genericShowArgsProduct = function(dictGenericShowArgs) {
    var genericShowArgs1 = genericShowArgs(dictGenericShowArgs);
    return function(dictGenericShowArgs1) {
      var genericShowArgs2 = genericShowArgs(dictGenericShowArgs1);
      return {
        genericShowArgs: function(v2) {
          return append3(genericShowArgs1(v2.value0))(genericShowArgs2(v2.value1));
        }
      };
    };
  };
  var genericShowConstructor = function(dictGenericShowArgs) {
    var genericShowArgs1 = genericShowArgs(dictGenericShowArgs);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return {
        "genericShow'": function(v2) {
          var ctor = reflectSymbol2($$Proxy.value);
          var v1 = genericShowArgs1(v2);
          if (v1.length === 0) {
            return ctor;
          }
          ;
          return "(" + (intercalate4(" ")(append3([ctor])(v1)) + ")");
        }
      };
    };
  };
  var genericShow$prime = function(dict) {
    return dict["genericShow'"];
  };
  var genericShowSum = function(dictGenericShow) {
    var genericShow$prime1 = genericShow$prime(dictGenericShow);
    return function(dictGenericShow1) {
      var genericShow$prime2 = genericShow$prime(dictGenericShow1);
      return {
        "genericShow'": function(v2) {
          if (v2 instanceof Inl) {
            return genericShow$prime1(v2.value0);
          }
          ;
          if (v2 instanceof Inr) {
            return genericShow$prime2(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Show.Generic (line 26, column 1 - line 28, column 40): " + [v2.constructor.name]);
        }
      };
    };
  };
  var genericShow = function(dictGeneric) {
    var from3 = from(dictGeneric);
    return function(dictGenericShow) {
      var genericShow$prime1 = genericShow$prime(dictGenericShow);
      return function(x2) {
        return genericShow$prime1(from3(x2));
      };
    };
  };

  // output/Data.Email/index.js
  var decodeEmail = stringDecode;

  // output/Data.CodePoint.Unicode.Internal/index.js
  var unsafeIndex3 = /* @__PURE__ */ unsafeIndex();
  var elemIndex2 = /* @__PURE__ */ elemIndex(eqInt);
  var NUMCAT_LU = /* @__PURE__ */ function() {
    function NUMCAT_LU2() {
    }
    ;
    NUMCAT_LU2.value = new NUMCAT_LU2();
    return NUMCAT_LU2;
  }();
  var NUMCAT_LL = /* @__PURE__ */ function() {
    function NUMCAT_LL2() {
    }
    ;
    NUMCAT_LL2.value = new NUMCAT_LL2();
    return NUMCAT_LL2;
  }();
  var NUMCAT_LT = /* @__PURE__ */ function() {
    function NUMCAT_LT2() {
    }
    ;
    NUMCAT_LT2.value = new NUMCAT_LT2();
    return NUMCAT_LT2;
  }();
  var NUMCAT_LM = /* @__PURE__ */ function() {
    function NUMCAT_LM2() {
    }
    ;
    NUMCAT_LM2.value = new NUMCAT_LM2();
    return NUMCAT_LM2;
  }();
  var NUMCAT_LO = /* @__PURE__ */ function() {
    function NUMCAT_LO2() {
    }
    ;
    NUMCAT_LO2.value = new NUMCAT_LO2();
    return NUMCAT_LO2;
  }();
  var NUMCAT_MN = /* @__PURE__ */ function() {
    function NUMCAT_MN2() {
    }
    ;
    NUMCAT_MN2.value = new NUMCAT_MN2();
    return NUMCAT_MN2;
  }();
  var NUMCAT_MC = /* @__PURE__ */ function() {
    function NUMCAT_MC2() {
    }
    ;
    NUMCAT_MC2.value = new NUMCAT_MC2();
    return NUMCAT_MC2;
  }();
  var NUMCAT_ME = /* @__PURE__ */ function() {
    function NUMCAT_ME2() {
    }
    ;
    NUMCAT_ME2.value = new NUMCAT_ME2();
    return NUMCAT_ME2;
  }();
  var NUMCAT_ND = /* @__PURE__ */ function() {
    function NUMCAT_ND2() {
    }
    ;
    NUMCAT_ND2.value = new NUMCAT_ND2();
    return NUMCAT_ND2;
  }();
  var NUMCAT_NL = /* @__PURE__ */ function() {
    function NUMCAT_NL2() {
    }
    ;
    NUMCAT_NL2.value = new NUMCAT_NL2();
    return NUMCAT_NL2;
  }();
  var NUMCAT_NO = /* @__PURE__ */ function() {
    function NUMCAT_NO2() {
    }
    ;
    NUMCAT_NO2.value = new NUMCAT_NO2();
    return NUMCAT_NO2;
  }();
  var NUMCAT_PC = /* @__PURE__ */ function() {
    function NUMCAT_PC2() {
    }
    ;
    NUMCAT_PC2.value = new NUMCAT_PC2();
    return NUMCAT_PC2;
  }();
  var NUMCAT_PD = /* @__PURE__ */ function() {
    function NUMCAT_PD2() {
    }
    ;
    NUMCAT_PD2.value = new NUMCAT_PD2();
    return NUMCAT_PD2;
  }();
  var NUMCAT_PS = /* @__PURE__ */ function() {
    function NUMCAT_PS2() {
    }
    ;
    NUMCAT_PS2.value = new NUMCAT_PS2();
    return NUMCAT_PS2;
  }();
  var NUMCAT_PE = /* @__PURE__ */ function() {
    function NUMCAT_PE2() {
    }
    ;
    NUMCAT_PE2.value = new NUMCAT_PE2();
    return NUMCAT_PE2;
  }();
  var NUMCAT_PI = /* @__PURE__ */ function() {
    function NUMCAT_PI2() {
    }
    ;
    NUMCAT_PI2.value = new NUMCAT_PI2();
    return NUMCAT_PI2;
  }();
  var NUMCAT_PF = /* @__PURE__ */ function() {
    function NUMCAT_PF2() {
    }
    ;
    NUMCAT_PF2.value = new NUMCAT_PF2();
    return NUMCAT_PF2;
  }();
  var NUMCAT_PO = /* @__PURE__ */ function() {
    function NUMCAT_PO2() {
    }
    ;
    NUMCAT_PO2.value = new NUMCAT_PO2();
    return NUMCAT_PO2;
  }();
  var NUMCAT_SM = /* @__PURE__ */ function() {
    function NUMCAT_SM2() {
    }
    ;
    NUMCAT_SM2.value = new NUMCAT_SM2();
    return NUMCAT_SM2;
  }();
  var NUMCAT_SC = /* @__PURE__ */ function() {
    function NUMCAT_SC2() {
    }
    ;
    NUMCAT_SC2.value = new NUMCAT_SC2();
    return NUMCAT_SC2;
  }();
  var NUMCAT_SK = /* @__PURE__ */ function() {
    function NUMCAT_SK2() {
    }
    ;
    NUMCAT_SK2.value = new NUMCAT_SK2();
    return NUMCAT_SK2;
  }();
  var NUMCAT_SO = /* @__PURE__ */ function() {
    function NUMCAT_SO2() {
    }
    ;
    NUMCAT_SO2.value = new NUMCAT_SO2();
    return NUMCAT_SO2;
  }();
  var NUMCAT_ZS = /* @__PURE__ */ function() {
    function NUMCAT_ZS2() {
    }
    ;
    NUMCAT_ZS2.value = new NUMCAT_ZS2();
    return NUMCAT_ZS2;
  }();
  var NUMCAT_ZL = /* @__PURE__ */ function() {
    function NUMCAT_ZL2() {
    }
    ;
    NUMCAT_ZL2.value = new NUMCAT_ZL2();
    return NUMCAT_ZL2;
  }();
  var NUMCAT_ZP = /* @__PURE__ */ function() {
    function NUMCAT_ZP2() {
    }
    ;
    NUMCAT_ZP2.value = new NUMCAT_ZP2();
    return NUMCAT_ZP2;
  }();
  var NUMCAT_CC = /* @__PURE__ */ function() {
    function NUMCAT_CC2() {
    }
    ;
    NUMCAT_CC2.value = new NUMCAT_CC2();
    return NUMCAT_CC2;
  }();
  var NUMCAT_CF = /* @__PURE__ */ function() {
    function NUMCAT_CF2() {
    }
    ;
    NUMCAT_CF2.value = new NUMCAT_CF2();
    return NUMCAT_CF2;
  }();
  var NUMCAT_CS = /* @__PURE__ */ function() {
    function NUMCAT_CS2() {
    }
    ;
    NUMCAT_CS2.value = new NUMCAT_CS2();
    return NUMCAT_CS2;
  }();
  var NUMCAT_CO = /* @__PURE__ */ function() {
    function NUMCAT_CO2() {
    }
    ;
    NUMCAT_CO2.value = new NUMCAT_CO2();
    return NUMCAT_CO2;
  }();
  var NUMCAT_CN = /* @__PURE__ */ function() {
    function NUMCAT_CN2() {
    }
    ;
    NUMCAT_CN2.value = new NUMCAT_CN2();
    return NUMCAT_CN2;
  }();
  var numLat1Blocks = 63;
  var numBlocks = 3396;
  var gencatZS = 2;
  var rule1 = /* @__PURE__ */ function() {
    return {
      category: gencatZS,
      unicodeCat: NUMCAT_ZS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatZP = 67108864;
  var rule162 = /* @__PURE__ */ function() {
    return {
      category: gencatZP,
      unicodeCat: NUMCAT_ZP.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatZL = 33554432;
  var rule161 = /* @__PURE__ */ function() {
    return {
      category: gencatZL,
      unicodeCat: NUMCAT_ZL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSO = 8192;
  var rule13 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule170 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 1,
      updist: 0,
      lowdist: 26,
      titledist: 0
    };
  }();
  var rule171 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 1,
      updist: -26 | 0,
      lowdist: 0,
      titledist: -26 | 0
    };
  }();
  var gencatSM = 64;
  var rule6 = /* @__PURE__ */ function() {
    return {
      category: gencatSM,
      unicodeCat: NUMCAT_SM.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSK = 1024;
  var rule10 = /* @__PURE__ */ function() {
    return {
      category: gencatSK,
      unicodeCat: NUMCAT_SK.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSC = 8;
  var rule3 = /* @__PURE__ */ function() {
    return {
      category: gencatSC,
      unicodeCat: NUMCAT_SC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPS = 16;
  var rule4 = /* @__PURE__ */ function() {
    return {
      category: gencatPS,
      unicodeCat: NUMCAT_PS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPO = 4;
  var rule2 = /* @__PURE__ */ function() {
    return {
      category: gencatPO,
      unicodeCat: NUMCAT_PO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPI = 32768;
  var rule15 = /* @__PURE__ */ function() {
    return {
      category: gencatPI,
      unicodeCat: NUMCAT_PI.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPF = 262144;
  var rule19 = /* @__PURE__ */ function() {
    return {
      category: gencatPF,
      unicodeCat: NUMCAT_PF.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPE = 32;
  var rule5 = /* @__PURE__ */ function() {
    return {
      category: gencatPE,
      unicodeCat: NUMCAT_PE.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPD = 128;
  var rule7 = /* @__PURE__ */ function() {
    return {
      category: gencatPD,
      unicodeCat: NUMCAT_PD.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPC = 2048;
  var rule11 = /* @__PURE__ */ function() {
    return {
      category: gencatPC,
      unicodeCat: NUMCAT_PC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatNO = 131072;
  var rule17 = /* @__PURE__ */ function() {
    return {
      category: gencatNO,
      unicodeCat: NUMCAT_NO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatNL = 16777216;
  var rule128 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule168 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 1,
      updist: 0,
      lowdist: 16,
      titledist: 0
    };
  }();
  var rule169 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 1,
      updist: -16 | 0,
      lowdist: 0,
      titledist: -16 | 0
    };
  }();
  var gencatND = 256;
  var rule8 = /* @__PURE__ */ function() {
    return {
      category: gencatND,
      unicodeCat: NUMCAT_ND.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatMN = 2097152;
  var rule92 = /* @__PURE__ */ function() {
    return {
      category: gencatMN,
      unicodeCat: NUMCAT_MN.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule93 = /* @__PURE__ */ function() {
    return {
      category: gencatMN,
      unicodeCat: NUMCAT_MN.value,
      possible: 1,
      updist: 84,
      lowdist: 0,
      titledist: 84
    };
  }();
  var gencatME = 4194304;
  var rule119 = /* @__PURE__ */ function() {
    return {
      category: gencatME,
      unicodeCat: NUMCAT_ME.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatMC = 8388608;
  var rule124 = /* @__PURE__ */ function() {
    return {
      category: gencatMC,
      unicodeCat: NUMCAT_MC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLU = 512;
  var nullrule = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_CN.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule104 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 8,
      titledist: 0
    };
  }();
  var rule107 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule115 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -60 | 0,
      titledist: 0
    };
  }();
  var rule117 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7 | 0,
      titledist: 0
    };
  }();
  var rule118 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 80,
      titledist: 0
    };
  }();
  var rule120 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 15,
      titledist: 0
    };
  }();
  var rule122 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 48,
      titledist: 0
    };
  }();
  var rule125 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 7264,
      titledist: 0
    };
  }();
  var rule127 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 38864,
      titledist: 0
    };
  }();
  var rule137 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -3008 | 0,
      titledist: 0
    };
  }();
  var rule142 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7615 | 0,
      titledist: 0
    };
  }();
  var rule144 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8 | 0,
      titledist: 0
    };
  }();
  var rule153 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -74 | 0,
      titledist: 0
    };
  }();
  var rule156 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -86 | 0,
      titledist: 0
    };
  }();
  var rule157 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -100 | 0,
      titledist: 0
    };
  }();
  var rule158 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -112 | 0,
      titledist: 0
    };
  }();
  var rule159 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -128 | 0,
      titledist: 0
    };
  }();
  var rule160 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -126 | 0,
      titledist: 0
    };
  }();
  var rule163 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7517 | 0,
      titledist: 0
    };
  }();
  var rule164 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8383 | 0,
      titledist: 0
    };
  }();
  var rule165 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8262 | 0,
      titledist: 0
    };
  }();
  var rule166 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 28,
      titledist: 0
    };
  }();
  var rule172 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10743 | 0,
      titledist: 0
    };
  }();
  var rule173 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -3814 | 0,
      titledist: 0
    };
  }();
  var rule174 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10727 | 0,
      titledist: 0
    };
  }();
  var rule177 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10780 | 0,
      titledist: 0
    };
  }();
  var rule178 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10749 | 0,
      titledist: 0
    };
  }();
  var rule179 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10783 | 0,
      titledist: 0
    };
  }();
  var rule180 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10782 | 0,
      titledist: 0
    };
  }();
  var rule181 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10815 | 0,
      titledist: 0
    };
  }();
  var rule183 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -35332 | 0,
      titledist: 0
    };
  }();
  var rule184 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42280 | 0,
      titledist: 0
    };
  }();
  var rule186 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42308 | 0,
      titledist: 0
    };
  }();
  var rule187 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42319 | 0,
      titledist: 0
    };
  }();
  var rule188 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42315 | 0,
      titledist: 0
    };
  }();
  var rule189 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42305 | 0,
      titledist: 0
    };
  }();
  var rule190 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42258 | 0,
      titledist: 0
    };
  }();
  var rule191 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42282 | 0,
      titledist: 0
    };
  }();
  var rule192 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42261 | 0,
      titledist: 0
    };
  }();
  var rule193 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 928,
      titledist: 0
    };
  }();
  var rule194 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -48 | 0,
      titledist: 0
    };
  }();
  var rule195 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42307 | 0,
      titledist: 0
    };
  }();
  var rule196 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -35384 | 0,
      titledist: 0
    };
  }();
  var rule201 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 40,
      titledist: 0
    };
  }();
  var rule203 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 34,
      titledist: 0
    };
  }();
  var rule22 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 1,
      titledist: 0
    };
  }();
  var rule24 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -199 | 0,
      titledist: 0
    };
  }();
  var rule26 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -121 | 0,
      titledist: 0
    };
  }();
  var rule29 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 210,
      titledist: 0
    };
  }();
  var rule30 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 206,
      titledist: 0
    };
  }();
  var rule31 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 205,
      titledist: 0
    };
  }();
  var rule32 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 79,
      titledist: 0
    };
  }();
  var rule33 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 202,
      titledist: 0
    };
  }();
  var rule34 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 203,
      titledist: 0
    };
  }();
  var rule35 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 207,
      titledist: 0
    };
  }();
  var rule37 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 211,
      titledist: 0
    };
  }();
  var rule38 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 209,
      titledist: 0
    };
  }();
  var rule40 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 213,
      titledist: 0
    };
  }();
  var rule42 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 214,
      titledist: 0
    };
  }();
  var rule43 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 218,
      titledist: 0
    };
  }();
  var rule44 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 217,
      titledist: 0
    };
  }();
  var rule45 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 219,
      titledist: 0
    };
  }();
  var rule47 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 2,
      titledist: 1
    };
  }();
  var rule51 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -97 | 0,
      titledist: 0
    };
  }();
  var rule52 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -56 | 0,
      titledist: 0
    };
  }();
  var rule53 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -130 | 0,
      titledist: 0
    };
  }();
  var rule54 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 10795,
      titledist: 0
    };
  }();
  var rule55 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -163 | 0,
      titledist: 0
    };
  }();
  var rule56 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 10792,
      titledist: 0
    };
  }();
  var rule58 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -195 | 0,
      titledist: 0
    };
  }();
  var rule59 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 69,
      titledist: 0
    };
  }();
  var rule60 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 71,
      titledist: 0
    };
  }();
  var rule9 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 32,
      titledist: 0
    };
  }();
  var rule94 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 116,
      titledist: 0
    };
  }();
  var rule95 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 38,
      titledist: 0
    };
  }();
  var rule96 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 37,
      titledist: 0
    };
  }();
  var rule97 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 64,
      titledist: 0
    };
  }();
  var rule98 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 63,
      titledist: 0
    };
  }();
  var gencatLT = 524288;
  var rule151 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: 0,
      lowdist: -8 | 0,
      titledist: 0
    };
  }();
  var rule154 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: 0,
      lowdist: -9 | 0,
      titledist: 0
    };
  }();
  var rule48 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: -1 | 0,
      lowdist: 1,
      titledist: 0
    };
  }();
  var gencatLO = 16384;
  var rule14 = /* @__PURE__ */ function() {
    return {
      category: gencatLO,
      unicodeCat: NUMCAT_LO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLM = 1048576;
  var rule91 = /* @__PURE__ */ function() {
    return {
      category: gencatLM,
      unicodeCat: NUMCAT_LM.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLL = 4096;
  var rule100 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -37 | 0,
      lowdist: 0,
      titledist: -37 | 0
    };
  }();
  var rule101 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -31 | 0,
      lowdist: 0,
      titledist: -31 | 0
    };
  }();
  var rule102 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -64 | 0,
      lowdist: 0,
      titledist: -64 | 0
    };
  }();
  var rule103 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -63 | 0,
      lowdist: 0,
      titledist: -63 | 0
    };
  }();
  var rule105 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -62 | 0,
      lowdist: 0,
      titledist: -62 | 0
    };
  }();
  var rule106 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -57 | 0,
      lowdist: 0,
      titledist: -57 | 0
    };
  }();
  var rule108 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -47 | 0,
      lowdist: 0,
      titledist: -47 | 0
    };
  }();
  var rule109 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -54 | 0,
      lowdist: 0,
      titledist: -54 | 0
    };
  }();
  var rule110 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -8 | 0,
      lowdist: 0,
      titledist: -8 | 0
    };
  }();
  var rule111 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -86 | 0,
      lowdist: 0,
      titledist: -86 | 0
    };
  }();
  var rule112 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -80 | 0,
      lowdist: 0,
      titledist: -80 | 0
    };
  }();
  var rule113 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 7,
      lowdist: 0,
      titledist: 7
    };
  }();
  var rule114 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -116 | 0,
      lowdist: 0,
      titledist: -116 | 0
    };
  }();
  var rule116 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -96 | 0,
      lowdist: 0,
      titledist: -96 | 0
    };
  }();
  var rule12 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -32 | 0,
      lowdist: 0,
      titledist: -32 | 0
    };
  }();
  var rule121 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -15 | 0,
      lowdist: 0,
      titledist: -15 | 0
    };
  }();
  var rule123 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -48 | 0,
      lowdist: 0,
      titledist: -48 | 0
    };
  }();
  var rule126 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 3008,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule129 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6254 | 0,
      lowdist: 0,
      titledist: -6254 | 0
    };
  }();
  var rule130 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6253 | 0,
      lowdist: 0,
      titledist: -6253 | 0
    };
  }();
  var rule131 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6244 | 0,
      lowdist: 0,
      titledist: -6244 | 0
    };
  }();
  var rule132 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6242 | 0,
      lowdist: 0,
      titledist: -6242 | 0
    };
  }();
  var rule133 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6243 | 0,
      lowdist: 0,
      titledist: -6243 | 0
    };
  }();
  var rule134 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6236 | 0,
      lowdist: 0,
      titledist: -6236 | 0
    };
  }();
  var rule135 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6181 | 0,
      lowdist: 0,
      titledist: -6181 | 0
    };
  }();
  var rule136 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35266,
      lowdist: 0,
      titledist: 35266
    };
  }();
  var rule138 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35332,
      lowdist: 0,
      titledist: 35332
    };
  }();
  var rule139 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 3814,
      lowdist: 0,
      titledist: 3814
    };
  }();
  var rule140 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35384,
      lowdist: 0,
      titledist: 35384
    };
  }();
  var rule141 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -59 | 0,
      lowdist: 0,
      titledist: -59 | 0
    };
  }();
  var rule143 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 8,
      lowdist: 0,
      titledist: 8
    };
  }();
  var rule145 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 74,
      lowdist: 0,
      titledist: 74
    };
  }();
  var rule146 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 86,
      lowdist: 0,
      titledist: 86
    };
  }();
  var rule147 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 100,
      lowdist: 0,
      titledist: 100
    };
  }();
  var rule148 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 128,
      lowdist: 0,
      titledist: 128
    };
  }();
  var rule149 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 112,
      lowdist: 0,
      titledist: 112
    };
  }();
  var rule150 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 126,
      lowdist: 0,
      titledist: 126
    };
  }();
  var rule152 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 9,
      lowdist: 0,
      titledist: 9
    };
  }();
  var rule155 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -7205 | 0,
      lowdist: 0,
      titledist: -7205 | 0
    };
  }();
  var rule167 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -28 | 0,
      lowdist: 0,
      titledist: -28 | 0
    };
  }();
  var rule175 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -10795 | 0,
      lowdist: 0,
      titledist: -10795 | 0
    };
  }();
  var rule176 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -10792 | 0,
      lowdist: 0,
      titledist: -10792 | 0
    };
  }();
  var rule18 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 743,
      lowdist: 0,
      titledist: 743
    };
  }();
  var rule182 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -7264 | 0,
      lowdist: 0,
      titledist: -7264 | 0
    };
  }();
  var rule185 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 48,
      lowdist: 0,
      titledist: 48
    };
  }();
  var rule197 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -928 | 0,
      lowdist: 0,
      titledist: -928 | 0
    };
  }();
  var rule198 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -38864 | 0,
      lowdist: 0,
      titledist: -38864 | 0
    };
  }();
  var rule20 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule202 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -40 | 0,
      lowdist: 0,
      titledist: -40 | 0
    };
  }();
  var rule204 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -34 | 0,
      lowdist: 0,
      titledist: -34 | 0
    };
  }();
  var rule21 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 121,
      lowdist: 0,
      titledist: 121
    };
  }();
  var rule23 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -1 | 0,
      lowdist: 0,
      titledist: -1 | 0
    };
  }();
  var rule25 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -232 | 0,
      lowdist: 0,
      titledist: -232 | 0
    };
  }();
  var rule27 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -300 | 0,
      lowdist: 0,
      titledist: -300 | 0
    };
  }();
  var rule28 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 195,
      lowdist: 0,
      titledist: 195
    };
  }();
  var rule36 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 97,
      lowdist: 0,
      titledist: 97
    };
  }();
  var rule39 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 163,
      lowdist: 0,
      titledist: 163
    };
  }();
  var rule41 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 130,
      lowdist: 0,
      titledist: 130
    };
  }();
  var rule46 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 56,
      lowdist: 0,
      titledist: 56
    };
  }();
  var rule49 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -2 | 0,
      lowdist: 0,
      titledist: -1 | 0
    };
  }();
  var rule50 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -79 | 0,
      lowdist: 0,
      titledist: -79 | 0
    };
  }();
  var rule57 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10815,
      lowdist: 0,
      titledist: 10815
    };
  }();
  var rule61 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10783,
      lowdist: 0,
      titledist: 10783
    };
  }();
  var rule62 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10780,
      lowdist: 0,
      titledist: 10780
    };
  }();
  var rule63 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10782,
      lowdist: 0,
      titledist: 10782
    };
  }();
  var rule64 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -210 | 0,
      lowdist: 0,
      titledist: -210 | 0
    };
  }();
  var rule65 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -206 | 0,
      lowdist: 0,
      titledist: -206 | 0
    };
  }();
  var rule66 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -205 | 0,
      lowdist: 0,
      titledist: -205 | 0
    };
  }();
  var rule67 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -202 | 0,
      lowdist: 0,
      titledist: -202 | 0
    };
  }();
  var rule68 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -203 | 0,
      lowdist: 0,
      titledist: -203 | 0
    };
  }();
  var rule69 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42319,
      lowdist: 0,
      titledist: 42319
    };
  }();
  var rule70 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42315,
      lowdist: 0,
      titledist: 42315
    };
  }();
  var rule71 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -207 | 0,
      lowdist: 0,
      titledist: -207 | 0
    };
  }();
  var rule72 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42280,
      lowdist: 0,
      titledist: 42280
    };
  }();
  var rule73 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42308,
      lowdist: 0,
      titledist: 42308
    };
  }();
  var rule74 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -209 | 0,
      lowdist: 0,
      titledist: -209 | 0
    };
  }();
  var rule75 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -211 | 0,
      lowdist: 0,
      titledist: -211 | 0
    };
  }();
  var rule76 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10743,
      lowdist: 0,
      titledist: 10743
    };
  }();
  var rule77 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42305,
      lowdist: 0,
      titledist: 42305
    };
  }();
  var rule78 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10749,
      lowdist: 0,
      titledist: 10749
    };
  }();
  var rule79 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -213 | 0,
      lowdist: 0,
      titledist: -213 | 0
    };
  }();
  var rule80 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -214 | 0,
      lowdist: 0,
      titledist: -214 | 0
    };
  }();
  var rule81 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10727,
      lowdist: 0,
      titledist: 10727
    };
  }();
  var rule82 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -218 | 0,
      lowdist: 0,
      titledist: -218 | 0
    };
  }();
  var rule83 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42307,
      lowdist: 0,
      titledist: 42307
    };
  }();
  var rule84 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42282,
      lowdist: 0,
      titledist: 42282
    };
  }();
  var rule85 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -69 | 0,
      lowdist: 0,
      titledist: -69 | 0
    };
  }();
  var rule86 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -217 | 0,
      lowdist: 0,
      titledist: -217 | 0
    };
  }();
  var rule87 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -71 | 0,
      lowdist: 0,
      titledist: -71 | 0
    };
  }();
  var rule88 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -219 | 0,
      lowdist: 0,
      titledist: -219 | 0
    };
  }();
  var rule89 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42261,
      lowdist: 0,
      titledist: 42261
    };
  }();
  var rule90 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42258,
      lowdist: 0,
      titledist: 42258
    };
  }();
  var rule99 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -38 | 0,
      lowdist: 0,
      titledist: -38 | 0
    };
  }();
  var gencatCS = 134217728;
  var rule199 = /* @__PURE__ */ function() {
    return {
      category: gencatCS,
      unicodeCat: NUMCAT_CS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCO = 268435456;
  var rule200 = /* @__PURE__ */ function() {
    return {
      category: gencatCO,
      unicodeCat: NUMCAT_CO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCF = 65536;
  var rule16 = /* @__PURE__ */ function() {
    return {
      category: gencatCF,
      unicodeCat: NUMCAT_CF.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCC = 1;
  var rule0 = /* @__PURE__ */ function() {
    return {
      category: gencatCC,
      unicodeCat: NUMCAT_CC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var bsearch = function(a3) {
    return function(array) {
      return function(size5) {
        return function(compare3) {
          var go3 = function($copy_i) {
            return function($copy_k) {
              var $tco_var_i = $copy_i;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(i3, k2) {
                if (i3 > k2 || i3 >= length3(array)) {
                  $tco_done = true;
                  return Nothing.value;
                }
                ;
                if (otherwise) {
                  var j2 = floor2(toNumber(i3 + k2 | 0) / 2);
                  var b3 = unsafeIndex3(array)(j2);
                  var v2 = compare3(a3)(b3);
                  if (v2 instanceof EQ) {
                    $tco_done = true;
                    return new Just(b3);
                  }
                  ;
                  if (v2 instanceof GT) {
                    $tco_var_i = j2 + 1 | 0;
                    $copy_k = k2;
                    return;
                  }
                  ;
                  $tco_var_i = i3;
                  $copy_k = j2 - 1 | 0;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5622, column 3 - line 5632, column 30): " + [i3.constructor.name, k2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_i, $copy_k);
              }
              ;
              return $tco_result;
            };
          };
          return go3(0)(size5);
        };
      };
    };
  };
  var blkCmp = function(v2) {
    return function(v1) {
      if (v2.start >= v1.start && v2.start < (v1.start + v1.length | 0)) {
        return EQ.value;
      }
      ;
      if (v2.start > v1.start) {
        return GT.value;
      }
      ;
      if (otherwise) {
        return LT.value;
      }
      ;
      throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5598, column 1 - line 5598, column 45): " + [v2.constructor.name, v1.constructor.name]);
    };
  };
  var getRule = function(blocks) {
    return function(unichar) {
      return function(size5) {
        var key2 = {
          start: unichar,
          length: 1,
          convRule: nullrule
        };
        var maybeCharBlock = bsearch(key2)(blocks)(size5)(blkCmp);
        if (maybeCharBlock instanceof Nothing) {
          return Nothing.value;
        }
        ;
        if (maybeCharBlock instanceof Just) {
          return new Just(maybeCharBlock.value0.convRule);
        }
        ;
        throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5612, column 5 - line 5614, column 60): " + [maybeCharBlock.constructor.name]);
      };
    };
  };
  var allchars = [{
    start: 0,
    length: 32,
    convRule: rule0
  }, {
    start: 32,
    length: 1,
    convRule: rule1
  }, {
    start: 33,
    length: 3,
    convRule: rule2
  }, {
    start: 36,
    length: 1,
    convRule: rule3
  }, {
    start: 37,
    length: 3,
    convRule: rule2
  }, {
    start: 40,
    length: 1,
    convRule: rule4
  }, {
    start: 41,
    length: 1,
    convRule: rule5
  }, {
    start: 42,
    length: 1,
    convRule: rule2
  }, {
    start: 43,
    length: 1,
    convRule: rule6
  }, {
    start: 44,
    length: 1,
    convRule: rule2
  }, {
    start: 45,
    length: 1,
    convRule: rule7
  }, {
    start: 46,
    length: 2,
    convRule: rule2
  }, {
    start: 48,
    length: 10,
    convRule: rule8
  }, {
    start: 58,
    length: 2,
    convRule: rule2
  }, {
    start: 60,
    length: 3,
    convRule: rule6
  }, {
    start: 63,
    length: 2,
    convRule: rule2
  }, {
    start: 65,
    length: 26,
    convRule: rule9
  }, {
    start: 91,
    length: 1,
    convRule: rule4
  }, {
    start: 92,
    length: 1,
    convRule: rule2
  }, {
    start: 93,
    length: 1,
    convRule: rule5
  }, {
    start: 94,
    length: 1,
    convRule: rule10
  }, {
    start: 95,
    length: 1,
    convRule: rule11
  }, {
    start: 96,
    length: 1,
    convRule: rule10
  }, {
    start: 97,
    length: 26,
    convRule: rule12
  }, {
    start: 123,
    length: 1,
    convRule: rule4
  }, {
    start: 124,
    length: 1,
    convRule: rule6
  }, {
    start: 125,
    length: 1,
    convRule: rule5
  }, {
    start: 126,
    length: 1,
    convRule: rule6
  }, {
    start: 127,
    length: 33,
    convRule: rule0
  }, {
    start: 160,
    length: 1,
    convRule: rule1
  }, {
    start: 161,
    length: 1,
    convRule: rule2
  }, {
    start: 162,
    length: 4,
    convRule: rule3
  }, {
    start: 166,
    length: 1,
    convRule: rule13
  }, {
    start: 167,
    length: 1,
    convRule: rule2
  }, {
    start: 168,
    length: 1,
    convRule: rule10
  }, {
    start: 169,
    length: 1,
    convRule: rule13
  }, {
    start: 170,
    length: 1,
    convRule: rule14
  }, {
    start: 171,
    length: 1,
    convRule: rule15
  }, {
    start: 172,
    length: 1,
    convRule: rule6
  }, {
    start: 173,
    length: 1,
    convRule: rule16
  }, {
    start: 174,
    length: 1,
    convRule: rule13
  }, {
    start: 175,
    length: 1,
    convRule: rule10
  }, {
    start: 176,
    length: 1,
    convRule: rule13
  }, {
    start: 177,
    length: 1,
    convRule: rule6
  }, {
    start: 178,
    length: 2,
    convRule: rule17
  }, {
    start: 180,
    length: 1,
    convRule: rule10
  }, {
    start: 181,
    length: 1,
    convRule: rule18
  }, {
    start: 182,
    length: 2,
    convRule: rule2
  }, {
    start: 184,
    length: 1,
    convRule: rule10
  }, {
    start: 185,
    length: 1,
    convRule: rule17
  }, {
    start: 186,
    length: 1,
    convRule: rule14
  }, {
    start: 187,
    length: 1,
    convRule: rule19
  }, {
    start: 188,
    length: 3,
    convRule: rule17
  }, {
    start: 191,
    length: 1,
    convRule: rule2
  }, {
    start: 192,
    length: 23,
    convRule: rule9
  }, {
    start: 215,
    length: 1,
    convRule: rule6
  }, {
    start: 216,
    length: 7,
    convRule: rule9
  }, {
    start: 223,
    length: 1,
    convRule: rule20
  }, {
    start: 224,
    length: 23,
    convRule: rule12
  }, {
    start: 247,
    length: 1,
    convRule: rule6
  }, {
    start: 248,
    length: 7,
    convRule: rule12
  }, {
    start: 255,
    length: 1,
    convRule: rule21
  }, {
    start: 256,
    length: 1,
    convRule: rule22
  }, {
    start: 257,
    length: 1,
    convRule: rule23
  }, {
    start: 258,
    length: 1,
    convRule: rule22
  }, {
    start: 259,
    length: 1,
    convRule: rule23
  }, {
    start: 260,
    length: 1,
    convRule: rule22
  }, {
    start: 261,
    length: 1,
    convRule: rule23
  }, {
    start: 262,
    length: 1,
    convRule: rule22
  }, {
    start: 263,
    length: 1,
    convRule: rule23
  }, {
    start: 264,
    length: 1,
    convRule: rule22
  }, {
    start: 265,
    length: 1,
    convRule: rule23
  }, {
    start: 266,
    length: 1,
    convRule: rule22
  }, {
    start: 267,
    length: 1,
    convRule: rule23
  }, {
    start: 268,
    length: 1,
    convRule: rule22
  }, {
    start: 269,
    length: 1,
    convRule: rule23
  }, {
    start: 270,
    length: 1,
    convRule: rule22
  }, {
    start: 271,
    length: 1,
    convRule: rule23
  }, {
    start: 272,
    length: 1,
    convRule: rule22
  }, {
    start: 273,
    length: 1,
    convRule: rule23
  }, {
    start: 274,
    length: 1,
    convRule: rule22
  }, {
    start: 275,
    length: 1,
    convRule: rule23
  }, {
    start: 276,
    length: 1,
    convRule: rule22
  }, {
    start: 277,
    length: 1,
    convRule: rule23
  }, {
    start: 278,
    length: 1,
    convRule: rule22
  }, {
    start: 279,
    length: 1,
    convRule: rule23
  }, {
    start: 280,
    length: 1,
    convRule: rule22
  }, {
    start: 281,
    length: 1,
    convRule: rule23
  }, {
    start: 282,
    length: 1,
    convRule: rule22
  }, {
    start: 283,
    length: 1,
    convRule: rule23
  }, {
    start: 284,
    length: 1,
    convRule: rule22
  }, {
    start: 285,
    length: 1,
    convRule: rule23
  }, {
    start: 286,
    length: 1,
    convRule: rule22
  }, {
    start: 287,
    length: 1,
    convRule: rule23
  }, {
    start: 288,
    length: 1,
    convRule: rule22
  }, {
    start: 289,
    length: 1,
    convRule: rule23
  }, {
    start: 290,
    length: 1,
    convRule: rule22
  }, {
    start: 291,
    length: 1,
    convRule: rule23
  }, {
    start: 292,
    length: 1,
    convRule: rule22
  }, {
    start: 293,
    length: 1,
    convRule: rule23
  }, {
    start: 294,
    length: 1,
    convRule: rule22
  }, {
    start: 295,
    length: 1,
    convRule: rule23
  }, {
    start: 296,
    length: 1,
    convRule: rule22
  }, {
    start: 297,
    length: 1,
    convRule: rule23
  }, {
    start: 298,
    length: 1,
    convRule: rule22
  }, {
    start: 299,
    length: 1,
    convRule: rule23
  }, {
    start: 300,
    length: 1,
    convRule: rule22
  }, {
    start: 301,
    length: 1,
    convRule: rule23
  }, {
    start: 302,
    length: 1,
    convRule: rule22
  }, {
    start: 303,
    length: 1,
    convRule: rule23
  }, {
    start: 304,
    length: 1,
    convRule: rule24
  }, {
    start: 305,
    length: 1,
    convRule: rule25
  }, {
    start: 306,
    length: 1,
    convRule: rule22
  }, {
    start: 307,
    length: 1,
    convRule: rule23
  }, {
    start: 308,
    length: 1,
    convRule: rule22
  }, {
    start: 309,
    length: 1,
    convRule: rule23
  }, {
    start: 310,
    length: 1,
    convRule: rule22
  }, {
    start: 311,
    length: 1,
    convRule: rule23
  }, {
    start: 312,
    length: 1,
    convRule: rule20
  }, {
    start: 313,
    length: 1,
    convRule: rule22
  }, {
    start: 314,
    length: 1,
    convRule: rule23
  }, {
    start: 315,
    length: 1,
    convRule: rule22
  }, {
    start: 316,
    length: 1,
    convRule: rule23
  }, {
    start: 317,
    length: 1,
    convRule: rule22
  }, {
    start: 318,
    length: 1,
    convRule: rule23
  }, {
    start: 319,
    length: 1,
    convRule: rule22
  }, {
    start: 320,
    length: 1,
    convRule: rule23
  }, {
    start: 321,
    length: 1,
    convRule: rule22
  }, {
    start: 322,
    length: 1,
    convRule: rule23
  }, {
    start: 323,
    length: 1,
    convRule: rule22
  }, {
    start: 324,
    length: 1,
    convRule: rule23
  }, {
    start: 325,
    length: 1,
    convRule: rule22
  }, {
    start: 326,
    length: 1,
    convRule: rule23
  }, {
    start: 327,
    length: 1,
    convRule: rule22
  }, {
    start: 328,
    length: 1,
    convRule: rule23
  }, {
    start: 329,
    length: 1,
    convRule: rule20
  }, {
    start: 330,
    length: 1,
    convRule: rule22
  }, {
    start: 331,
    length: 1,
    convRule: rule23
  }, {
    start: 332,
    length: 1,
    convRule: rule22
  }, {
    start: 333,
    length: 1,
    convRule: rule23
  }, {
    start: 334,
    length: 1,
    convRule: rule22
  }, {
    start: 335,
    length: 1,
    convRule: rule23
  }, {
    start: 336,
    length: 1,
    convRule: rule22
  }, {
    start: 337,
    length: 1,
    convRule: rule23
  }, {
    start: 338,
    length: 1,
    convRule: rule22
  }, {
    start: 339,
    length: 1,
    convRule: rule23
  }, {
    start: 340,
    length: 1,
    convRule: rule22
  }, {
    start: 341,
    length: 1,
    convRule: rule23
  }, {
    start: 342,
    length: 1,
    convRule: rule22
  }, {
    start: 343,
    length: 1,
    convRule: rule23
  }, {
    start: 344,
    length: 1,
    convRule: rule22
  }, {
    start: 345,
    length: 1,
    convRule: rule23
  }, {
    start: 346,
    length: 1,
    convRule: rule22
  }, {
    start: 347,
    length: 1,
    convRule: rule23
  }, {
    start: 348,
    length: 1,
    convRule: rule22
  }, {
    start: 349,
    length: 1,
    convRule: rule23
  }, {
    start: 350,
    length: 1,
    convRule: rule22
  }, {
    start: 351,
    length: 1,
    convRule: rule23
  }, {
    start: 352,
    length: 1,
    convRule: rule22
  }, {
    start: 353,
    length: 1,
    convRule: rule23
  }, {
    start: 354,
    length: 1,
    convRule: rule22
  }, {
    start: 355,
    length: 1,
    convRule: rule23
  }, {
    start: 356,
    length: 1,
    convRule: rule22
  }, {
    start: 357,
    length: 1,
    convRule: rule23
  }, {
    start: 358,
    length: 1,
    convRule: rule22
  }, {
    start: 359,
    length: 1,
    convRule: rule23
  }, {
    start: 360,
    length: 1,
    convRule: rule22
  }, {
    start: 361,
    length: 1,
    convRule: rule23
  }, {
    start: 362,
    length: 1,
    convRule: rule22
  }, {
    start: 363,
    length: 1,
    convRule: rule23
  }, {
    start: 364,
    length: 1,
    convRule: rule22
  }, {
    start: 365,
    length: 1,
    convRule: rule23
  }, {
    start: 366,
    length: 1,
    convRule: rule22
  }, {
    start: 367,
    length: 1,
    convRule: rule23
  }, {
    start: 368,
    length: 1,
    convRule: rule22
  }, {
    start: 369,
    length: 1,
    convRule: rule23
  }, {
    start: 370,
    length: 1,
    convRule: rule22
  }, {
    start: 371,
    length: 1,
    convRule: rule23
  }, {
    start: 372,
    length: 1,
    convRule: rule22
  }, {
    start: 373,
    length: 1,
    convRule: rule23
  }, {
    start: 374,
    length: 1,
    convRule: rule22
  }, {
    start: 375,
    length: 1,
    convRule: rule23
  }, {
    start: 376,
    length: 1,
    convRule: rule26
  }, {
    start: 377,
    length: 1,
    convRule: rule22
  }, {
    start: 378,
    length: 1,
    convRule: rule23
  }, {
    start: 379,
    length: 1,
    convRule: rule22
  }, {
    start: 380,
    length: 1,
    convRule: rule23
  }, {
    start: 381,
    length: 1,
    convRule: rule22
  }, {
    start: 382,
    length: 1,
    convRule: rule23
  }, {
    start: 383,
    length: 1,
    convRule: rule27
  }, {
    start: 384,
    length: 1,
    convRule: rule28
  }, {
    start: 385,
    length: 1,
    convRule: rule29
  }, {
    start: 386,
    length: 1,
    convRule: rule22
  }, {
    start: 387,
    length: 1,
    convRule: rule23
  }, {
    start: 388,
    length: 1,
    convRule: rule22
  }, {
    start: 389,
    length: 1,
    convRule: rule23
  }, {
    start: 390,
    length: 1,
    convRule: rule30
  }, {
    start: 391,
    length: 1,
    convRule: rule22
  }, {
    start: 392,
    length: 1,
    convRule: rule23
  }, {
    start: 393,
    length: 2,
    convRule: rule31
  }, {
    start: 395,
    length: 1,
    convRule: rule22
  }, {
    start: 396,
    length: 1,
    convRule: rule23
  }, {
    start: 397,
    length: 1,
    convRule: rule20
  }, {
    start: 398,
    length: 1,
    convRule: rule32
  }, {
    start: 399,
    length: 1,
    convRule: rule33
  }, {
    start: 400,
    length: 1,
    convRule: rule34
  }, {
    start: 401,
    length: 1,
    convRule: rule22
  }, {
    start: 402,
    length: 1,
    convRule: rule23
  }, {
    start: 403,
    length: 1,
    convRule: rule31
  }, {
    start: 404,
    length: 1,
    convRule: rule35
  }, {
    start: 405,
    length: 1,
    convRule: rule36
  }, {
    start: 406,
    length: 1,
    convRule: rule37
  }, {
    start: 407,
    length: 1,
    convRule: rule38
  }, {
    start: 408,
    length: 1,
    convRule: rule22
  }, {
    start: 409,
    length: 1,
    convRule: rule23
  }, {
    start: 410,
    length: 1,
    convRule: rule39
  }, {
    start: 411,
    length: 1,
    convRule: rule20
  }, {
    start: 412,
    length: 1,
    convRule: rule37
  }, {
    start: 413,
    length: 1,
    convRule: rule40
  }, {
    start: 414,
    length: 1,
    convRule: rule41
  }, {
    start: 415,
    length: 1,
    convRule: rule42
  }, {
    start: 416,
    length: 1,
    convRule: rule22
  }, {
    start: 417,
    length: 1,
    convRule: rule23
  }, {
    start: 418,
    length: 1,
    convRule: rule22
  }, {
    start: 419,
    length: 1,
    convRule: rule23
  }, {
    start: 420,
    length: 1,
    convRule: rule22
  }, {
    start: 421,
    length: 1,
    convRule: rule23
  }, {
    start: 422,
    length: 1,
    convRule: rule43
  }, {
    start: 423,
    length: 1,
    convRule: rule22
  }, {
    start: 424,
    length: 1,
    convRule: rule23
  }, {
    start: 425,
    length: 1,
    convRule: rule43
  }, {
    start: 426,
    length: 2,
    convRule: rule20
  }, {
    start: 428,
    length: 1,
    convRule: rule22
  }, {
    start: 429,
    length: 1,
    convRule: rule23
  }, {
    start: 430,
    length: 1,
    convRule: rule43
  }, {
    start: 431,
    length: 1,
    convRule: rule22
  }, {
    start: 432,
    length: 1,
    convRule: rule23
  }, {
    start: 433,
    length: 2,
    convRule: rule44
  }, {
    start: 435,
    length: 1,
    convRule: rule22
  }, {
    start: 436,
    length: 1,
    convRule: rule23
  }, {
    start: 437,
    length: 1,
    convRule: rule22
  }, {
    start: 438,
    length: 1,
    convRule: rule23
  }, {
    start: 439,
    length: 1,
    convRule: rule45
  }, {
    start: 440,
    length: 1,
    convRule: rule22
  }, {
    start: 441,
    length: 1,
    convRule: rule23
  }, {
    start: 442,
    length: 1,
    convRule: rule20
  }, {
    start: 443,
    length: 1,
    convRule: rule14
  }, {
    start: 444,
    length: 1,
    convRule: rule22
  }, {
    start: 445,
    length: 1,
    convRule: rule23
  }, {
    start: 446,
    length: 1,
    convRule: rule20
  }, {
    start: 447,
    length: 1,
    convRule: rule46
  }, {
    start: 448,
    length: 4,
    convRule: rule14
  }, {
    start: 452,
    length: 1,
    convRule: rule47
  }, {
    start: 453,
    length: 1,
    convRule: rule48
  }, {
    start: 454,
    length: 1,
    convRule: rule49
  }, {
    start: 455,
    length: 1,
    convRule: rule47
  }, {
    start: 456,
    length: 1,
    convRule: rule48
  }, {
    start: 457,
    length: 1,
    convRule: rule49
  }, {
    start: 458,
    length: 1,
    convRule: rule47
  }, {
    start: 459,
    length: 1,
    convRule: rule48
  }, {
    start: 460,
    length: 1,
    convRule: rule49
  }, {
    start: 461,
    length: 1,
    convRule: rule22
  }, {
    start: 462,
    length: 1,
    convRule: rule23
  }, {
    start: 463,
    length: 1,
    convRule: rule22
  }, {
    start: 464,
    length: 1,
    convRule: rule23
  }, {
    start: 465,
    length: 1,
    convRule: rule22
  }, {
    start: 466,
    length: 1,
    convRule: rule23
  }, {
    start: 467,
    length: 1,
    convRule: rule22
  }, {
    start: 468,
    length: 1,
    convRule: rule23
  }, {
    start: 469,
    length: 1,
    convRule: rule22
  }, {
    start: 470,
    length: 1,
    convRule: rule23
  }, {
    start: 471,
    length: 1,
    convRule: rule22
  }, {
    start: 472,
    length: 1,
    convRule: rule23
  }, {
    start: 473,
    length: 1,
    convRule: rule22
  }, {
    start: 474,
    length: 1,
    convRule: rule23
  }, {
    start: 475,
    length: 1,
    convRule: rule22
  }, {
    start: 476,
    length: 1,
    convRule: rule23
  }, {
    start: 477,
    length: 1,
    convRule: rule50
  }, {
    start: 478,
    length: 1,
    convRule: rule22
  }, {
    start: 479,
    length: 1,
    convRule: rule23
  }, {
    start: 480,
    length: 1,
    convRule: rule22
  }, {
    start: 481,
    length: 1,
    convRule: rule23
  }, {
    start: 482,
    length: 1,
    convRule: rule22
  }, {
    start: 483,
    length: 1,
    convRule: rule23
  }, {
    start: 484,
    length: 1,
    convRule: rule22
  }, {
    start: 485,
    length: 1,
    convRule: rule23
  }, {
    start: 486,
    length: 1,
    convRule: rule22
  }, {
    start: 487,
    length: 1,
    convRule: rule23
  }, {
    start: 488,
    length: 1,
    convRule: rule22
  }, {
    start: 489,
    length: 1,
    convRule: rule23
  }, {
    start: 490,
    length: 1,
    convRule: rule22
  }, {
    start: 491,
    length: 1,
    convRule: rule23
  }, {
    start: 492,
    length: 1,
    convRule: rule22
  }, {
    start: 493,
    length: 1,
    convRule: rule23
  }, {
    start: 494,
    length: 1,
    convRule: rule22
  }, {
    start: 495,
    length: 1,
    convRule: rule23
  }, {
    start: 496,
    length: 1,
    convRule: rule20
  }, {
    start: 497,
    length: 1,
    convRule: rule47
  }, {
    start: 498,
    length: 1,
    convRule: rule48
  }, {
    start: 499,
    length: 1,
    convRule: rule49
  }, {
    start: 500,
    length: 1,
    convRule: rule22
  }, {
    start: 501,
    length: 1,
    convRule: rule23
  }, {
    start: 502,
    length: 1,
    convRule: rule51
  }, {
    start: 503,
    length: 1,
    convRule: rule52
  }, {
    start: 504,
    length: 1,
    convRule: rule22
  }, {
    start: 505,
    length: 1,
    convRule: rule23
  }, {
    start: 506,
    length: 1,
    convRule: rule22
  }, {
    start: 507,
    length: 1,
    convRule: rule23
  }, {
    start: 508,
    length: 1,
    convRule: rule22
  }, {
    start: 509,
    length: 1,
    convRule: rule23
  }, {
    start: 510,
    length: 1,
    convRule: rule22
  }, {
    start: 511,
    length: 1,
    convRule: rule23
  }, {
    start: 512,
    length: 1,
    convRule: rule22
  }, {
    start: 513,
    length: 1,
    convRule: rule23
  }, {
    start: 514,
    length: 1,
    convRule: rule22
  }, {
    start: 515,
    length: 1,
    convRule: rule23
  }, {
    start: 516,
    length: 1,
    convRule: rule22
  }, {
    start: 517,
    length: 1,
    convRule: rule23
  }, {
    start: 518,
    length: 1,
    convRule: rule22
  }, {
    start: 519,
    length: 1,
    convRule: rule23
  }, {
    start: 520,
    length: 1,
    convRule: rule22
  }, {
    start: 521,
    length: 1,
    convRule: rule23
  }, {
    start: 522,
    length: 1,
    convRule: rule22
  }, {
    start: 523,
    length: 1,
    convRule: rule23
  }, {
    start: 524,
    length: 1,
    convRule: rule22
  }, {
    start: 525,
    length: 1,
    convRule: rule23
  }, {
    start: 526,
    length: 1,
    convRule: rule22
  }, {
    start: 527,
    length: 1,
    convRule: rule23
  }, {
    start: 528,
    length: 1,
    convRule: rule22
  }, {
    start: 529,
    length: 1,
    convRule: rule23
  }, {
    start: 530,
    length: 1,
    convRule: rule22
  }, {
    start: 531,
    length: 1,
    convRule: rule23
  }, {
    start: 532,
    length: 1,
    convRule: rule22
  }, {
    start: 533,
    length: 1,
    convRule: rule23
  }, {
    start: 534,
    length: 1,
    convRule: rule22
  }, {
    start: 535,
    length: 1,
    convRule: rule23
  }, {
    start: 536,
    length: 1,
    convRule: rule22
  }, {
    start: 537,
    length: 1,
    convRule: rule23
  }, {
    start: 538,
    length: 1,
    convRule: rule22
  }, {
    start: 539,
    length: 1,
    convRule: rule23
  }, {
    start: 540,
    length: 1,
    convRule: rule22
  }, {
    start: 541,
    length: 1,
    convRule: rule23
  }, {
    start: 542,
    length: 1,
    convRule: rule22
  }, {
    start: 543,
    length: 1,
    convRule: rule23
  }, {
    start: 544,
    length: 1,
    convRule: rule53
  }, {
    start: 545,
    length: 1,
    convRule: rule20
  }, {
    start: 546,
    length: 1,
    convRule: rule22
  }, {
    start: 547,
    length: 1,
    convRule: rule23
  }, {
    start: 548,
    length: 1,
    convRule: rule22
  }, {
    start: 549,
    length: 1,
    convRule: rule23
  }, {
    start: 550,
    length: 1,
    convRule: rule22
  }, {
    start: 551,
    length: 1,
    convRule: rule23
  }, {
    start: 552,
    length: 1,
    convRule: rule22
  }, {
    start: 553,
    length: 1,
    convRule: rule23
  }, {
    start: 554,
    length: 1,
    convRule: rule22
  }, {
    start: 555,
    length: 1,
    convRule: rule23
  }, {
    start: 556,
    length: 1,
    convRule: rule22
  }, {
    start: 557,
    length: 1,
    convRule: rule23
  }, {
    start: 558,
    length: 1,
    convRule: rule22
  }, {
    start: 559,
    length: 1,
    convRule: rule23
  }, {
    start: 560,
    length: 1,
    convRule: rule22
  }, {
    start: 561,
    length: 1,
    convRule: rule23
  }, {
    start: 562,
    length: 1,
    convRule: rule22
  }, {
    start: 563,
    length: 1,
    convRule: rule23
  }, {
    start: 564,
    length: 6,
    convRule: rule20
  }, {
    start: 570,
    length: 1,
    convRule: rule54
  }, {
    start: 571,
    length: 1,
    convRule: rule22
  }, {
    start: 572,
    length: 1,
    convRule: rule23
  }, {
    start: 573,
    length: 1,
    convRule: rule55
  }, {
    start: 574,
    length: 1,
    convRule: rule56
  }, {
    start: 575,
    length: 2,
    convRule: rule57
  }, {
    start: 577,
    length: 1,
    convRule: rule22
  }, {
    start: 578,
    length: 1,
    convRule: rule23
  }, {
    start: 579,
    length: 1,
    convRule: rule58
  }, {
    start: 580,
    length: 1,
    convRule: rule59
  }, {
    start: 581,
    length: 1,
    convRule: rule60
  }, {
    start: 582,
    length: 1,
    convRule: rule22
  }, {
    start: 583,
    length: 1,
    convRule: rule23
  }, {
    start: 584,
    length: 1,
    convRule: rule22
  }, {
    start: 585,
    length: 1,
    convRule: rule23
  }, {
    start: 586,
    length: 1,
    convRule: rule22
  }, {
    start: 587,
    length: 1,
    convRule: rule23
  }, {
    start: 588,
    length: 1,
    convRule: rule22
  }, {
    start: 589,
    length: 1,
    convRule: rule23
  }, {
    start: 590,
    length: 1,
    convRule: rule22
  }, {
    start: 591,
    length: 1,
    convRule: rule23
  }, {
    start: 592,
    length: 1,
    convRule: rule61
  }, {
    start: 593,
    length: 1,
    convRule: rule62
  }, {
    start: 594,
    length: 1,
    convRule: rule63
  }, {
    start: 595,
    length: 1,
    convRule: rule64
  }, {
    start: 596,
    length: 1,
    convRule: rule65
  }, {
    start: 597,
    length: 1,
    convRule: rule20
  }, {
    start: 598,
    length: 2,
    convRule: rule66
  }, {
    start: 600,
    length: 1,
    convRule: rule20
  }, {
    start: 601,
    length: 1,
    convRule: rule67
  }, {
    start: 602,
    length: 1,
    convRule: rule20
  }, {
    start: 603,
    length: 1,
    convRule: rule68
  }, {
    start: 604,
    length: 1,
    convRule: rule69
  }, {
    start: 605,
    length: 3,
    convRule: rule20
  }, {
    start: 608,
    length: 1,
    convRule: rule66
  }, {
    start: 609,
    length: 1,
    convRule: rule70
  }, {
    start: 610,
    length: 1,
    convRule: rule20
  }, {
    start: 611,
    length: 1,
    convRule: rule71
  }, {
    start: 612,
    length: 1,
    convRule: rule20
  }, {
    start: 613,
    length: 1,
    convRule: rule72
  }, {
    start: 614,
    length: 1,
    convRule: rule73
  }, {
    start: 615,
    length: 1,
    convRule: rule20
  }, {
    start: 616,
    length: 1,
    convRule: rule74
  }, {
    start: 617,
    length: 1,
    convRule: rule75
  }, {
    start: 618,
    length: 1,
    convRule: rule73
  }, {
    start: 619,
    length: 1,
    convRule: rule76
  }, {
    start: 620,
    length: 1,
    convRule: rule77
  }, {
    start: 621,
    length: 2,
    convRule: rule20
  }, {
    start: 623,
    length: 1,
    convRule: rule75
  }, {
    start: 624,
    length: 1,
    convRule: rule20
  }, {
    start: 625,
    length: 1,
    convRule: rule78
  }, {
    start: 626,
    length: 1,
    convRule: rule79
  }, {
    start: 627,
    length: 2,
    convRule: rule20
  }, {
    start: 629,
    length: 1,
    convRule: rule80
  }, {
    start: 630,
    length: 7,
    convRule: rule20
  }, {
    start: 637,
    length: 1,
    convRule: rule81
  }, {
    start: 638,
    length: 2,
    convRule: rule20
  }, {
    start: 640,
    length: 1,
    convRule: rule82
  }, {
    start: 641,
    length: 1,
    convRule: rule20
  }, {
    start: 642,
    length: 1,
    convRule: rule83
  }, {
    start: 643,
    length: 1,
    convRule: rule82
  }, {
    start: 644,
    length: 3,
    convRule: rule20
  }, {
    start: 647,
    length: 1,
    convRule: rule84
  }, {
    start: 648,
    length: 1,
    convRule: rule82
  }, {
    start: 649,
    length: 1,
    convRule: rule85
  }, {
    start: 650,
    length: 2,
    convRule: rule86
  }, {
    start: 652,
    length: 1,
    convRule: rule87
  }, {
    start: 653,
    length: 5,
    convRule: rule20
  }, {
    start: 658,
    length: 1,
    convRule: rule88
  }, {
    start: 659,
    length: 1,
    convRule: rule20
  }, {
    start: 660,
    length: 1,
    convRule: rule14
  }, {
    start: 661,
    length: 8,
    convRule: rule20
  }, {
    start: 669,
    length: 1,
    convRule: rule89
  }, {
    start: 670,
    length: 1,
    convRule: rule90
  }, {
    start: 671,
    length: 17,
    convRule: rule20
  }, {
    start: 688,
    length: 18,
    convRule: rule91
  }, {
    start: 706,
    length: 4,
    convRule: rule10
  }, {
    start: 710,
    length: 12,
    convRule: rule91
  }, {
    start: 722,
    length: 14,
    convRule: rule10
  }, {
    start: 736,
    length: 5,
    convRule: rule91
  }, {
    start: 741,
    length: 7,
    convRule: rule10
  }, {
    start: 748,
    length: 1,
    convRule: rule91
  }, {
    start: 749,
    length: 1,
    convRule: rule10
  }, {
    start: 750,
    length: 1,
    convRule: rule91
  }, {
    start: 751,
    length: 17,
    convRule: rule10
  }, {
    start: 768,
    length: 69,
    convRule: rule92
  }, {
    start: 837,
    length: 1,
    convRule: rule93
  }, {
    start: 838,
    length: 42,
    convRule: rule92
  }, {
    start: 880,
    length: 1,
    convRule: rule22
  }, {
    start: 881,
    length: 1,
    convRule: rule23
  }, {
    start: 882,
    length: 1,
    convRule: rule22
  }, {
    start: 883,
    length: 1,
    convRule: rule23
  }, {
    start: 884,
    length: 1,
    convRule: rule91
  }, {
    start: 885,
    length: 1,
    convRule: rule10
  }, {
    start: 886,
    length: 1,
    convRule: rule22
  }, {
    start: 887,
    length: 1,
    convRule: rule23
  }, {
    start: 890,
    length: 1,
    convRule: rule91
  }, {
    start: 891,
    length: 3,
    convRule: rule41
  }, {
    start: 894,
    length: 1,
    convRule: rule2
  }, {
    start: 895,
    length: 1,
    convRule: rule94
  }, {
    start: 900,
    length: 2,
    convRule: rule10
  }, {
    start: 902,
    length: 1,
    convRule: rule95
  }, {
    start: 903,
    length: 1,
    convRule: rule2
  }, {
    start: 904,
    length: 3,
    convRule: rule96
  }, {
    start: 908,
    length: 1,
    convRule: rule97
  }, {
    start: 910,
    length: 2,
    convRule: rule98
  }, {
    start: 912,
    length: 1,
    convRule: rule20
  }, {
    start: 913,
    length: 17,
    convRule: rule9
  }, {
    start: 931,
    length: 9,
    convRule: rule9
  }, {
    start: 940,
    length: 1,
    convRule: rule99
  }, {
    start: 941,
    length: 3,
    convRule: rule100
  }, {
    start: 944,
    length: 1,
    convRule: rule20
  }, {
    start: 945,
    length: 17,
    convRule: rule12
  }, {
    start: 962,
    length: 1,
    convRule: rule101
  }, {
    start: 963,
    length: 9,
    convRule: rule12
  }, {
    start: 972,
    length: 1,
    convRule: rule102
  }, {
    start: 973,
    length: 2,
    convRule: rule103
  }, {
    start: 975,
    length: 1,
    convRule: rule104
  }, {
    start: 976,
    length: 1,
    convRule: rule105
  }, {
    start: 977,
    length: 1,
    convRule: rule106
  }, {
    start: 978,
    length: 3,
    convRule: rule107
  }, {
    start: 981,
    length: 1,
    convRule: rule108
  }, {
    start: 982,
    length: 1,
    convRule: rule109
  }, {
    start: 983,
    length: 1,
    convRule: rule110
  }, {
    start: 984,
    length: 1,
    convRule: rule22
  }, {
    start: 985,
    length: 1,
    convRule: rule23
  }, {
    start: 986,
    length: 1,
    convRule: rule22
  }, {
    start: 987,
    length: 1,
    convRule: rule23
  }, {
    start: 988,
    length: 1,
    convRule: rule22
  }, {
    start: 989,
    length: 1,
    convRule: rule23
  }, {
    start: 990,
    length: 1,
    convRule: rule22
  }, {
    start: 991,
    length: 1,
    convRule: rule23
  }, {
    start: 992,
    length: 1,
    convRule: rule22
  }, {
    start: 993,
    length: 1,
    convRule: rule23
  }, {
    start: 994,
    length: 1,
    convRule: rule22
  }, {
    start: 995,
    length: 1,
    convRule: rule23
  }, {
    start: 996,
    length: 1,
    convRule: rule22
  }, {
    start: 997,
    length: 1,
    convRule: rule23
  }, {
    start: 998,
    length: 1,
    convRule: rule22
  }, {
    start: 999,
    length: 1,
    convRule: rule23
  }, {
    start: 1e3,
    length: 1,
    convRule: rule22
  }, {
    start: 1001,
    length: 1,
    convRule: rule23
  }, {
    start: 1002,
    length: 1,
    convRule: rule22
  }, {
    start: 1003,
    length: 1,
    convRule: rule23
  }, {
    start: 1004,
    length: 1,
    convRule: rule22
  }, {
    start: 1005,
    length: 1,
    convRule: rule23
  }, {
    start: 1006,
    length: 1,
    convRule: rule22
  }, {
    start: 1007,
    length: 1,
    convRule: rule23
  }, {
    start: 1008,
    length: 1,
    convRule: rule111
  }, {
    start: 1009,
    length: 1,
    convRule: rule112
  }, {
    start: 1010,
    length: 1,
    convRule: rule113
  }, {
    start: 1011,
    length: 1,
    convRule: rule114
  }, {
    start: 1012,
    length: 1,
    convRule: rule115
  }, {
    start: 1013,
    length: 1,
    convRule: rule116
  }, {
    start: 1014,
    length: 1,
    convRule: rule6
  }, {
    start: 1015,
    length: 1,
    convRule: rule22
  }, {
    start: 1016,
    length: 1,
    convRule: rule23
  }, {
    start: 1017,
    length: 1,
    convRule: rule117
  }, {
    start: 1018,
    length: 1,
    convRule: rule22
  }, {
    start: 1019,
    length: 1,
    convRule: rule23
  }, {
    start: 1020,
    length: 1,
    convRule: rule20
  }, {
    start: 1021,
    length: 3,
    convRule: rule53
  }, {
    start: 1024,
    length: 16,
    convRule: rule118
  }, {
    start: 1040,
    length: 32,
    convRule: rule9
  }, {
    start: 1072,
    length: 32,
    convRule: rule12
  }, {
    start: 1104,
    length: 16,
    convRule: rule112
  }, {
    start: 1120,
    length: 1,
    convRule: rule22
  }, {
    start: 1121,
    length: 1,
    convRule: rule23
  }, {
    start: 1122,
    length: 1,
    convRule: rule22
  }, {
    start: 1123,
    length: 1,
    convRule: rule23
  }, {
    start: 1124,
    length: 1,
    convRule: rule22
  }, {
    start: 1125,
    length: 1,
    convRule: rule23
  }, {
    start: 1126,
    length: 1,
    convRule: rule22
  }, {
    start: 1127,
    length: 1,
    convRule: rule23
  }, {
    start: 1128,
    length: 1,
    convRule: rule22
  }, {
    start: 1129,
    length: 1,
    convRule: rule23
  }, {
    start: 1130,
    length: 1,
    convRule: rule22
  }, {
    start: 1131,
    length: 1,
    convRule: rule23
  }, {
    start: 1132,
    length: 1,
    convRule: rule22
  }, {
    start: 1133,
    length: 1,
    convRule: rule23
  }, {
    start: 1134,
    length: 1,
    convRule: rule22
  }, {
    start: 1135,
    length: 1,
    convRule: rule23
  }, {
    start: 1136,
    length: 1,
    convRule: rule22
  }, {
    start: 1137,
    length: 1,
    convRule: rule23
  }, {
    start: 1138,
    length: 1,
    convRule: rule22
  }, {
    start: 1139,
    length: 1,
    convRule: rule23
  }, {
    start: 1140,
    length: 1,
    convRule: rule22
  }, {
    start: 1141,
    length: 1,
    convRule: rule23
  }, {
    start: 1142,
    length: 1,
    convRule: rule22
  }, {
    start: 1143,
    length: 1,
    convRule: rule23
  }, {
    start: 1144,
    length: 1,
    convRule: rule22
  }, {
    start: 1145,
    length: 1,
    convRule: rule23
  }, {
    start: 1146,
    length: 1,
    convRule: rule22
  }, {
    start: 1147,
    length: 1,
    convRule: rule23
  }, {
    start: 1148,
    length: 1,
    convRule: rule22
  }, {
    start: 1149,
    length: 1,
    convRule: rule23
  }, {
    start: 1150,
    length: 1,
    convRule: rule22
  }, {
    start: 1151,
    length: 1,
    convRule: rule23
  }, {
    start: 1152,
    length: 1,
    convRule: rule22
  }, {
    start: 1153,
    length: 1,
    convRule: rule23
  }, {
    start: 1154,
    length: 1,
    convRule: rule13
  }, {
    start: 1155,
    length: 5,
    convRule: rule92
  }, {
    start: 1160,
    length: 2,
    convRule: rule119
  }, {
    start: 1162,
    length: 1,
    convRule: rule22
  }, {
    start: 1163,
    length: 1,
    convRule: rule23
  }, {
    start: 1164,
    length: 1,
    convRule: rule22
  }, {
    start: 1165,
    length: 1,
    convRule: rule23
  }, {
    start: 1166,
    length: 1,
    convRule: rule22
  }, {
    start: 1167,
    length: 1,
    convRule: rule23
  }, {
    start: 1168,
    length: 1,
    convRule: rule22
  }, {
    start: 1169,
    length: 1,
    convRule: rule23
  }, {
    start: 1170,
    length: 1,
    convRule: rule22
  }, {
    start: 1171,
    length: 1,
    convRule: rule23
  }, {
    start: 1172,
    length: 1,
    convRule: rule22
  }, {
    start: 1173,
    length: 1,
    convRule: rule23
  }, {
    start: 1174,
    length: 1,
    convRule: rule22
  }, {
    start: 1175,
    length: 1,
    convRule: rule23
  }, {
    start: 1176,
    length: 1,
    convRule: rule22
  }, {
    start: 1177,
    length: 1,
    convRule: rule23
  }, {
    start: 1178,
    length: 1,
    convRule: rule22
  }, {
    start: 1179,
    length: 1,
    convRule: rule23
  }, {
    start: 1180,
    length: 1,
    convRule: rule22
  }, {
    start: 1181,
    length: 1,
    convRule: rule23
  }, {
    start: 1182,
    length: 1,
    convRule: rule22
  }, {
    start: 1183,
    length: 1,
    convRule: rule23
  }, {
    start: 1184,
    length: 1,
    convRule: rule22
  }, {
    start: 1185,
    length: 1,
    convRule: rule23
  }, {
    start: 1186,
    length: 1,
    convRule: rule22
  }, {
    start: 1187,
    length: 1,
    convRule: rule23
  }, {
    start: 1188,
    length: 1,
    convRule: rule22
  }, {
    start: 1189,
    length: 1,
    convRule: rule23
  }, {
    start: 1190,
    length: 1,
    convRule: rule22
  }, {
    start: 1191,
    length: 1,
    convRule: rule23
  }, {
    start: 1192,
    length: 1,
    convRule: rule22
  }, {
    start: 1193,
    length: 1,
    convRule: rule23
  }, {
    start: 1194,
    length: 1,
    convRule: rule22
  }, {
    start: 1195,
    length: 1,
    convRule: rule23
  }, {
    start: 1196,
    length: 1,
    convRule: rule22
  }, {
    start: 1197,
    length: 1,
    convRule: rule23
  }, {
    start: 1198,
    length: 1,
    convRule: rule22
  }, {
    start: 1199,
    length: 1,
    convRule: rule23
  }, {
    start: 1200,
    length: 1,
    convRule: rule22
  }, {
    start: 1201,
    length: 1,
    convRule: rule23
  }, {
    start: 1202,
    length: 1,
    convRule: rule22
  }, {
    start: 1203,
    length: 1,
    convRule: rule23
  }, {
    start: 1204,
    length: 1,
    convRule: rule22
  }, {
    start: 1205,
    length: 1,
    convRule: rule23
  }, {
    start: 1206,
    length: 1,
    convRule: rule22
  }, {
    start: 1207,
    length: 1,
    convRule: rule23
  }, {
    start: 1208,
    length: 1,
    convRule: rule22
  }, {
    start: 1209,
    length: 1,
    convRule: rule23
  }, {
    start: 1210,
    length: 1,
    convRule: rule22
  }, {
    start: 1211,
    length: 1,
    convRule: rule23
  }, {
    start: 1212,
    length: 1,
    convRule: rule22
  }, {
    start: 1213,
    length: 1,
    convRule: rule23
  }, {
    start: 1214,
    length: 1,
    convRule: rule22
  }, {
    start: 1215,
    length: 1,
    convRule: rule23
  }, {
    start: 1216,
    length: 1,
    convRule: rule120
  }, {
    start: 1217,
    length: 1,
    convRule: rule22
  }, {
    start: 1218,
    length: 1,
    convRule: rule23
  }, {
    start: 1219,
    length: 1,
    convRule: rule22
  }, {
    start: 1220,
    length: 1,
    convRule: rule23
  }, {
    start: 1221,
    length: 1,
    convRule: rule22
  }, {
    start: 1222,
    length: 1,
    convRule: rule23
  }, {
    start: 1223,
    length: 1,
    convRule: rule22
  }, {
    start: 1224,
    length: 1,
    convRule: rule23
  }, {
    start: 1225,
    length: 1,
    convRule: rule22
  }, {
    start: 1226,
    length: 1,
    convRule: rule23
  }, {
    start: 1227,
    length: 1,
    convRule: rule22
  }, {
    start: 1228,
    length: 1,
    convRule: rule23
  }, {
    start: 1229,
    length: 1,
    convRule: rule22
  }, {
    start: 1230,
    length: 1,
    convRule: rule23
  }, {
    start: 1231,
    length: 1,
    convRule: rule121
  }, {
    start: 1232,
    length: 1,
    convRule: rule22
  }, {
    start: 1233,
    length: 1,
    convRule: rule23
  }, {
    start: 1234,
    length: 1,
    convRule: rule22
  }, {
    start: 1235,
    length: 1,
    convRule: rule23
  }, {
    start: 1236,
    length: 1,
    convRule: rule22
  }, {
    start: 1237,
    length: 1,
    convRule: rule23
  }, {
    start: 1238,
    length: 1,
    convRule: rule22
  }, {
    start: 1239,
    length: 1,
    convRule: rule23
  }, {
    start: 1240,
    length: 1,
    convRule: rule22
  }, {
    start: 1241,
    length: 1,
    convRule: rule23
  }, {
    start: 1242,
    length: 1,
    convRule: rule22
  }, {
    start: 1243,
    length: 1,
    convRule: rule23
  }, {
    start: 1244,
    length: 1,
    convRule: rule22
  }, {
    start: 1245,
    length: 1,
    convRule: rule23
  }, {
    start: 1246,
    length: 1,
    convRule: rule22
  }, {
    start: 1247,
    length: 1,
    convRule: rule23
  }, {
    start: 1248,
    length: 1,
    convRule: rule22
  }, {
    start: 1249,
    length: 1,
    convRule: rule23
  }, {
    start: 1250,
    length: 1,
    convRule: rule22
  }, {
    start: 1251,
    length: 1,
    convRule: rule23
  }, {
    start: 1252,
    length: 1,
    convRule: rule22
  }, {
    start: 1253,
    length: 1,
    convRule: rule23
  }, {
    start: 1254,
    length: 1,
    convRule: rule22
  }, {
    start: 1255,
    length: 1,
    convRule: rule23
  }, {
    start: 1256,
    length: 1,
    convRule: rule22
  }, {
    start: 1257,
    length: 1,
    convRule: rule23
  }, {
    start: 1258,
    length: 1,
    convRule: rule22
  }, {
    start: 1259,
    length: 1,
    convRule: rule23
  }, {
    start: 1260,
    length: 1,
    convRule: rule22
  }, {
    start: 1261,
    length: 1,
    convRule: rule23
  }, {
    start: 1262,
    length: 1,
    convRule: rule22
  }, {
    start: 1263,
    length: 1,
    convRule: rule23
  }, {
    start: 1264,
    length: 1,
    convRule: rule22
  }, {
    start: 1265,
    length: 1,
    convRule: rule23
  }, {
    start: 1266,
    length: 1,
    convRule: rule22
  }, {
    start: 1267,
    length: 1,
    convRule: rule23
  }, {
    start: 1268,
    length: 1,
    convRule: rule22
  }, {
    start: 1269,
    length: 1,
    convRule: rule23
  }, {
    start: 1270,
    length: 1,
    convRule: rule22
  }, {
    start: 1271,
    length: 1,
    convRule: rule23
  }, {
    start: 1272,
    length: 1,
    convRule: rule22
  }, {
    start: 1273,
    length: 1,
    convRule: rule23
  }, {
    start: 1274,
    length: 1,
    convRule: rule22
  }, {
    start: 1275,
    length: 1,
    convRule: rule23
  }, {
    start: 1276,
    length: 1,
    convRule: rule22
  }, {
    start: 1277,
    length: 1,
    convRule: rule23
  }, {
    start: 1278,
    length: 1,
    convRule: rule22
  }, {
    start: 1279,
    length: 1,
    convRule: rule23
  }, {
    start: 1280,
    length: 1,
    convRule: rule22
  }, {
    start: 1281,
    length: 1,
    convRule: rule23
  }, {
    start: 1282,
    length: 1,
    convRule: rule22
  }, {
    start: 1283,
    length: 1,
    convRule: rule23
  }, {
    start: 1284,
    length: 1,
    convRule: rule22
  }, {
    start: 1285,
    length: 1,
    convRule: rule23
  }, {
    start: 1286,
    length: 1,
    convRule: rule22
  }, {
    start: 1287,
    length: 1,
    convRule: rule23
  }, {
    start: 1288,
    length: 1,
    convRule: rule22
  }, {
    start: 1289,
    length: 1,
    convRule: rule23
  }, {
    start: 1290,
    length: 1,
    convRule: rule22
  }, {
    start: 1291,
    length: 1,
    convRule: rule23
  }, {
    start: 1292,
    length: 1,
    convRule: rule22
  }, {
    start: 1293,
    length: 1,
    convRule: rule23
  }, {
    start: 1294,
    length: 1,
    convRule: rule22
  }, {
    start: 1295,
    length: 1,
    convRule: rule23
  }, {
    start: 1296,
    length: 1,
    convRule: rule22
  }, {
    start: 1297,
    length: 1,
    convRule: rule23
  }, {
    start: 1298,
    length: 1,
    convRule: rule22
  }, {
    start: 1299,
    length: 1,
    convRule: rule23
  }, {
    start: 1300,
    length: 1,
    convRule: rule22
  }, {
    start: 1301,
    length: 1,
    convRule: rule23
  }, {
    start: 1302,
    length: 1,
    convRule: rule22
  }, {
    start: 1303,
    length: 1,
    convRule: rule23
  }, {
    start: 1304,
    length: 1,
    convRule: rule22
  }, {
    start: 1305,
    length: 1,
    convRule: rule23
  }, {
    start: 1306,
    length: 1,
    convRule: rule22
  }, {
    start: 1307,
    length: 1,
    convRule: rule23
  }, {
    start: 1308,
    length: 1,
    convRule: rule22
  }, {
    start: 1309,
    length: 1,
    convRule: rule23
  }, {
    start: 1310,
    length: 1,
    convRule: rule22
  }, {
    start: 1311,
    length: 1,
    convRule: rule23
  }, {
    start: 1312,
    length: 1,
    convRule: rule22
  }, {
    start: 1313,
    length: 1,
    convRule: rule23
  }, {
    start: 1314,
    length: 1,
    convRule: rule22
  }, {
    start: 1315,
    length: 1,
    convRule: rule23
  }, {
    start: 1316,
    length: 1,
    convRule: rule22
  }, {
    start: 1317,
    length: 1,
    convRule: rule23
  }, {
    start: 1318,
    length: 1,
    convRule: rule22
  }, {
    start: 1319,
    length: 1,
    convRule: rule23
  }, {
    start: 1320,
    length: 1,
    convRule: rule22
  }, {
    start: 1321,
    length: 1,
    convRule: rule23
  }, {
    start: 1322,
    length: 1,
    convRule: rule22
  }, {
    start: 1323,
    length: 1,
    convRule: rule23
  }, {
    start: 1324,
    length: 1,
    convRule: rule22
  }, {
    start: 1325,
    length: 1,
    convRule: rule23
  }, {
    start: 1326,
    length: 1,
    convRule: rule22
  }, {
    start: 1327,
    length: 1,
    convRule: rule23
  }, {
    start: 1329,
    length: 38,
    convRule: rule122
  }, {
    start: 1369,
    length: 1,
    convRule: rule91
  }, {
    start: 1370,
    length: 6,
    convRule: rule2
  }, {
    start: 1376,
    length: 1,
    convRule: rule20
  }, {
    start: 1377,
    length: 38,
    convRule: rule123
  }, {
    start: 1415,
    length: 2,
    convRule: rule20
  }, {
    start: 1417,
    length: 1,
    convRule: rule2
  }, {
    start: 1418,
    length: 1,
    convRule: rule7
  }, {
    start: 1421,
    length: 2,
    convRule: rule13
  }, {
    start: 1423,
    length: 1,
    convRule: rule3
  }, {
    start: 1425,
    length: 45,
    convRule: rule92
  }, {
    start: 1470,
    length: 1,
    convRule: rule7
  }, {
    start: 1471,
    length: 1,
    convRule: rule92
  }, {
    start: 1472,
    length: 1,
    convRule: rule2
  }, {
    start: 1473,
    length: 2,
    convRule: rule92
  }, {
    start: 1475,
    length: 1,
    convRule: rule2
  }, {
    start: 1476,
    length: 2,
    convRule: rule92
  }, {
    start: 1478,
    length: 1,
    convRule: rule2
  }, {
    start: 1479,
    length: 1,
    convRule: rule92
  }, {
    start: 1488,
    length: 27,
    convRule: rule14
  }, {
    start: 1519,
    length: 4,
    convRule: rule14
  }, {
    start: 1523,
    length: 2,
    convRule: rule2
  }, {
    start: 1536,
    length: 6,
    convRule: rule16
  }, {
    start: 1542,
    length: 3,
    convRule: rule6
  }, {
    start: 1545,
    length: 2,
    convRule: rule2
  }, {
    start: 1547,
    length: 1,
    convRule: rule3
  }, {
    start: 1548,
    length: 2,
    convRule: rule2
  }, {
    start: 1550,
    length: 2,
    convRule: rule13
  }, {
    start: 1552,
    length: 11,
    convRule: rule92
  }, {
    start: 1563,
    length: 1,
    convRule: rule2
  }, {
    start: 1564,
    length: 1,
    convRule: rule16
  }, {
    start: 1566,
    length: 2,
    convRule: rule2
  }, {
    start: 1568,
    length: 32,
    convRule: rule14
  }, {
    start: 1600,
    length: 1,
    convRule: rule91
  }, {
    start: 1601,
    length: 10,
    convRule: rule14
  }, {
    start: 1611,
    length: 21,
    convRule: rule92
  }, {
    start: 1632,
    length: 10,
    convRule: rule8
  }, {
    start: 1642,
    length: 4,
    convRule: rule2
  }, {
    start: 1646,
    length: 2,
    convRule: rule14
  }, {
    start: 1648,
    length: 1,
    convRule: rule92
  }, {
    start: 1649,
    length: 99,
    convRule: rule14
  }, {
    start: 1748,
    length: 1,
    convRule: rule2
  }, {
    start: 1749,
    length: 1,
    convRule: rule14
  }, {
    start: 1750,
    length: 7,
    convRule: rule92
  }, {
    start: 1757,
    length: 1,
    convRule: rule16
  }, {
    start: 1758,
    length: 1,
    convRule: rule13
  }, {
    start: 1759,
    length: 6,
    convRule: rule92
  }, {
    start: 1765,
    length: 2,
    convRule: rule91
  }, {
    start: 1767,
    length: 2,
    convRule: rule92
  }, {
    start: 1769,
    length: 1,
    convRule: rule13
  }, {
    start: 1770,
    length: 4,
    convRule: rule92
  }, {
    start: 1774,
    length: 2,
    convRule: rule14
  }, {
    start: 1776,
    length: 10,
    convRule: rule8
  }, {
    start: 1786,
    length: 3,
    convRule: rule14
  }, {
    start: 1789,
    length: 2,
    convRule: rule13
  }, {
    start: 1791,
    length: 1,
    convRule: rule14
  }, {
    start: 1792,
    length: 14,
    convRule: rule2
  }, {
    start: 1807,
    length: 1,
    convRule: rule16
  }, {
    start: 1808,
    length: 1,
    convRule: rule14
  }, {
    start: 1809,
    length: 1,
    convRule: rule92
  }, {
    start: 1810,
    length: 30,
    convRule: rule14
  }, {
    start: 1840,
    length: 27,
    convRule: rule92
  }, {
    start: 1869,
    length: 89,
    convRule: rule14
  }, {
    start: 1958,
    length: 11,
    convRule: rule92
  }, {
    start: 1969,
    length: 1,
    convRule: rule14
  }, {
    start: 1984,
    length: 10,
    convRule: rule8
  }, {
    start: 1994,
    length: 33,
    convRule: rule14
  }, {
    start: 2027,
    length: 9,
    convRule: rule92
  }, {
    start: 2036,
    length: 2,
    convRule: rule91
  }, {
    start: 2038,
    length: 1,
    convRule: rule13
  }, {
    start: 2039,
    length: 3,
    convRule: rule2
  }, {
    start: 2042,
    length: 1,
    convRule: rule91
  }, {
    start: 2045,
    length: 1,
    convRule: rule92
  }, {
    start: 2046,
    length: 2,
    convRule: rule3
  }, {
    start: 2048,
    length: 22,
    convRule: rule14
  }, {
    start: 2070,
    length: 4,
    convRule: rule92
  }, {
    start: 2074,
    length: 1,
    convRule: rule91
  }, {
    start: 2075,
    length: 9,
    convRule: rule92
  }, {
    start: 2084,
    length: 1,
    convRule: rule91
  }, {
    start: 2085,
    length: 3,
    convRule: rule92
  }, {
    start: 2088,
    length: 1,
    convRule: rule91
  }, {
    start: 2089,
    length: 5,
    convRule: rule92
  }, {
    start: 2096,
    length: 15,
    convRule: rule2
  }, {
    start: 2112,
    length: 25,
    convRule: rule14
  }, {
    start: 2137,
    length: 3,
    convRule: rule92
  }, {
    start: 2142,
    length: 1,
    convRule: rule2
  }, {
    start: 2144,
    length: 11,
    convRule: rule14
  }, {
    start: 2208,
    length: 21,
    convRule: rule14
  }, {
    start: 2230,
    length: 18,
    convRule: rule14
  }, {
    start: 2259,
    length: 15,
    convRule: rule92
  }, {
    start: 2274,
    length: 1,
    convRule: rule16
  }, {
    start: 2275,
    length: 32,
    convRule: rule92
  }, {
    start: 2307,
    length: 1,
    convRule: rule124
  }, {
    start: 2308,
    length: 54,
    convRule: rule14
  }, {
    start: 2362,
    length: 1,
    convRule: rule92
  }, {
    start: 2363,
    length: 1,
    convRule: rule124
  }, {
    start: 2364,
    length: 1,
    convRule: rule92
  }, {
    start: 2365,
    length: 1,
    convRule: rule14
  }, {
    start: 2366,
    length: 3,
    convRule: rule124
  }, {
    start: 2369,
    length: 8,
    convRule: rule92
  }, {
    start: 2377,
    length: 4,
    convRule: rule124
  }, {
    start: 2381,
    length: 1,
    convRule: rule92
  }, {
    start: 2382,
    length: 2,
    convRule: rule124
  }, {
    start: 2384,
    length: 1,
    convRule: rule14
  }, {
    start: 2385,
    length: 7,
    convRule: rule92
  }, {
    start: 2392,
    length: 10,
    convRule: rule14
  }, {
    start: 2402,
    length: 2,
    convRule: rule92
  }, {
    start: 2404,
    length: 2,
    convRule: rule2
  }, {
    start: 2406,
    length: 10,
    convRule: rule8
  }, {
    start: 2416,
    length: 1,
    convRule: rule2
  }, {
    start: 2417,
    length: 1,
    convRule: rule91
  }, {
    start: 2418,
    length: 15,
    convRule: rule14
  }, {
    start: 2433,
    length: 1,
    convRule: rule92
  }, {
    start: 2434,
    length: 2,
    convRule: rule124
  }, {
    start: 2437,
    length: 8,
    convRule: rule14
  }, {
    start: 2447,
    length: 2,
    convRule: rule14
  }, {
    start: 2451,
    length: 22,
    convRule: rule14
  }, {
    start: 2474,
    length: 7,
    convRule: rule14
  }, {
    start: 2482,
    length: 1,
    convRule: rule14
  }, {
    start: 2486,
    length: 4,
    convRule: rule14
  }, {
    start: 2492,
    length: 1,
    convRule: rule92
  }, {
    start: 2493,
    length: 1,
    convRule: rule14
  }, {
    start: 2494,
    length: 3,
    convRule: rule124
  }, {
    start: 2497,
    length: 4,
    convRule: rule92
  }, {
    start: 2503,
    length: 2,
    convRule: rule124
  }, {
    start: 2507,
    length: 2,
    convRule: rule124
  }, {
    start: 2509,
    length: 1,
    convRule: rule92
  }, {
    start: 2510,
    length: 1,
    convRule: rule14
  }, {
    start: 2519,
    length: 1,
    convRule: rule124
  }, {
    start: 2524,
    length: 2,
    convRule: rule14
  }, {
    start: 2527,
    length: 3,
    convRule: rule14
  }, {
    start: 2530,
    length: 2,
    convRule: rule92
  }, {
    start: 2534,
    length: 10,
    convRule: rule8
  }, {
    start: 2544,
    length: 2,
    convRule: rule14
  }, {
    start: 2546,
    length: 2,
    convRule: rule3
  }, {
    start: 2548,
    length: 6,
    convRule: rule17
  }, {
    start: 2554,
    length: 1,
    convRule: rule13
  }, {
    start: 2555,
    length: 1,
    convRule: rule3
  }, {
    start: 2556,
    length: 1,
    convRule: rule14
  }, {
    start: 2557,
    length: 1,
    convRule: rule2
  }, {
    start: 2558,
    length: 1,
    convRule: rule92
  }, {
    start: 2561,
    length: 2,
    convRule: rule92
  }, {
    start: 2563,
    length: 1,
    convRule: rule124
  }, {
    start: 2565,
    length: 6,
    convRule: rule14
  }, {
    start: 2575,
    length: 2,
    convRule: rule14
  }, {
    start: 2579,
    length: 22,
    convRule: rule14
  }, {
    start: 2602,
    length: 7,
    convRule: rule14
  }, {
    start: 2610,
    length: 2,
    convRule: rule14
  }, {
    start: 2613,
    length: 2,
    convRule: rule14
  }, {
    start: 2616,
    length: 2,
    convRule: rule14
  }, {
    start: 2620,
    length: 1,
    convRule: rule92
  }, {
    start: 2622,
    length: 3,
    convRule: rule124
  }, {
    start: 2625,
    length: 2,
    convRule: rule92
  }, {
    start: 2631,
    length: 2,
    convRule: rule92
  }, {
    start: 2635,
    length: 3,
    convRule: rule92
  }, {
    start: 2641,
    length: 1,
    convRule: rule92
  }, {
    start: 2649,
    length: 4,
    convRule: rule14
  }, {
    start: 2654,
    length: 1,
    convRule: rule14
  }, {
    start: 2662,
    length: 10,
    convRule: rule8
  }, {
    start: 2672,
    length: 2,
    convRule: rule92
  }, {
    start: 2674,
    length: 3,
    convRule: rule14
  }, {
    start: 2677,
    length: 1,
    convRule: rule92
  }, {
    start: 2678,
    length: 1,
    convRule: rule2
  }, {
    start: 2689,
    length: 2,
    convRule: rule92
  }, {
    start: 2691,
    length: 1,
    convRule: rule124
  }, {
    start: 2693,
    length: 9,
    convRule: rule14
  }, {
    start: 2703,
    length: 3,
    convRule: rule14
  }, {
    start: 2707,
    length: 22,
    convRule: rule14
  }, {
    start: 2730,
    length: 7,
    convRule: rule14
  }, {
    start: 2738,
    length: 2,
    convRule: rule14
  }, {
    start: 2741,
    length: 5,
    convRule: rule14
  }, {
    start: 2748,
    length: 1,
    convRule: rule92
  }, {
    start: 2749,
    length: 1,
    convRule: rule14
  }, {
    start: 2750,
    length: 3,
    convRule: rule124
  }, {
    start: 2753,
    length: 5,
    convRule: rule92
  }, {
    start: 2759,
    length: 2,
    convRule: rule92
  }, {
    start: 2761,
    length: 1,
    convRule: rule124
  }, {
    start: 2763,
    length: 2,
    convRule: rule124
  }, {
    start: 2765,
    length: 1,
    convRule: rule92
  }, {
    start: 2768,
    length: 1,
    convRule: rule14
  }, {
    start: 2784,
    length: 2,
    convRule: rule14
  }, {
    start: 2786,
    length: 2,
    convRule: rule92
  }, {
    start: 2790,
    length: 10,
    convRule: rule8
  }, {
    start: 2800,
    length: 1,
    convRule: rule2
  }, {
    start: 2801,
    length: 1,
    convRule: rule3
  }, {
    start: 2809,
    length: 1,
    convRule: rule14
  }, {
    start: 2810,
    length: 6,
    convRule: rule92
  }, {
    start: 2817,
    length: 1,
    convRule: rule92
  }, {
    start: 2818,
    length: 2,
    convRule: rule124
  }, {
    start: 2821,
    length: 8,
    convRule: rule14
  }, {
    start: 2831,
    length: 2,
    convRule: rule14
  }, {
    start: 2835,
    length: 22,
    convRule: rule14
  }, {
    start: 2858,
    length: 7,
    convRule: rule14
  }, {
    start: 2866,
    length: 2,
    convRule: rule14
  }, {
    start: 2869,
    length: 5,
    convRule: rule14
  }, {
    start: 2876,
    length: 1,
    convRule: rule92
  }, {
    start: 2877,
    length: 1,
    convRule: rule14
  }, {
    start: 2878,
    length: 1,
    convRule: rule124
  }, {
    start: 2879,
    length: 1,
    convRule: rule92
  }, {
    start: 2880,
    length: 1,
    convRule: rule124
  }, {
    start: 2881,
    length: 4,
    convRule: rule92
  }, {
    start: 2887,
    length: 2,
    convRule: rule124
  }, {
    start: 2891,
    length: 2,
    convRule: rule124
  }, {
    start: 2893,
    length: 1,
    convRule: rule92
  }, {
    start: 2901,
    length: 2,
    convRule: rule92
  }, {
    start: 2903,
    length: 1,
    convRule: rule124
  }, {
    start: 2908,
    length: 2,
    convRule: rule14
  }, {
    start: 2911,
    length: 3,
    convRule: rule14
  }, {
    start: 2914,
    length: 2,
    convRule: rule92
  }, {
    start: 2918,
    length: 10,
    convRule: rule8
  }, {
    start: 2928,
    length: 1,
    convRule: rule13
  }, {
    start: 2929,
    length: 1,
    convRule: rule14
  }, {
    start: 2930,
    length: 6,
    convRule: rule17
  }, {
    start: 2946,
    length: 1,
    convRule: rule92
  }, {
    start: 2947,
    length: 1,
    convRule: rule14
  }, {
    start: 2949,
    length: 6,
    convRule: rule14
  }, {
    start: 2958,
    length: 3,
    convRule: rule14
  }, {
    start: 2962,
    length: 4,
    convRule: rule14
  }, {
    start: 2969,
    length: 2,
    convRule: rule14
  }, {
    start: 2972,
    length: 1,
    convRule: rule14
  }, {
    start: 2974,
    length: 2,
    convRule: rule14
  }, {
    start: 2979,
    length: 2,
    convRule: rule14
  }, {
    start: 2984,
    length: 3,
    convRule: rule14
  }, {
    start: 2990,
    length: 12,
    convRule: rule14
  }, {
    start: 3006,
    length: 2,
    convRule: rule124
  }, {
    start: 3008,
    length: 1,
    convRule: rule92
  }, {
    start: 3009,
    length: 2,
    convRule: rule124
  }, {
    start: 3014,
    length: 3,
    convRule: rule124
  }, {
    start: 3018,
    length: 3,
    convRule: rule124
  }, {
    start: 3021,
    length: 1,
    convRule: rule92
  }, {
    start: 3024,
    length: 1,
    convRule: rule14
  }, {
    start: 3031,
    length: 1,
    convRule: rule124
  }, {
    start: 3046,
    length: 10,
    convRule: rule8
  }, {
    start: 3056,
    length: 3,
    convRule: rule17
  }, {
    start: 3059,
    length: 6,
    convRule: rule13
  }, {
    start: 3065,
    length: 1,
    convRule: rule3
  }, {
    start: 3066,
    length: 1,
    convRule: rule13
  }, {
    start: 3072,
    length: 1,
    convRule: rule92
  }, {
    start: 3073,
    length: 3,
    convRule: rule124
  }, {
    start: 3076,
    length: 1,
    convRule: rule92
  }, {
    start: 3077,
    length: 8,
    convRule: rule14
  }, {
    start: 3086,
    length: 3,
    convRule: rule14
  }, {
    start: 3090,
    length: 23,
    convRule: rule14
  }, {
    start: 3114,
    length: 16,
    convRule: rule14
  }, {
    start: 3133,
    length: 1,
    convRule: rule14
  }, {
    start: 3134,
    length: 3,
    convRule: rule92
  }, {
    start: 3137,
    length: 4,
    convRule: rule124
  }, {
    start: 3142,
    length: 3,
    convRule: rule92
  }, {
    start: 3146,
    length: 4,
    convRule: rule92
  }, {
    start: 3157,
    length: 2,
    convRule: rule92
  }, {
    start: 3160,
    length: 3,
    convRule: rule14
  }, {
    start: 3168,
    length: 2,
    convRule: rule14
  }, {
    start: 3170,
    length: 2,
    convRule: rule92
  }, {
    start: 3174,
    length: 10,
    convRule: rule8
  }, {
    start: 3191,
    length: 1,
    convRule: rule2
  }, {
    start: 3192,
    length: 7,
    convRule: rule17
  }, {
    start: 3199,
    length: 1,
    convRule: rule13
  }, {
    start: 3200,
    length: 1,
    convRule: rule14
  }, {
    start: 3201,
    length: 1,
    convRule: rule92
  }, {
    start: 3202,
    length: 2,
    convRule: rule124
  }, {
    start: 3204,
    length: 1,
    convRule: rule2
  }, {
    start: 3205,
    length: 8,
    convRule: rule14
  }, {
    start: 3214,
    length: 3,
    convRule: rule14
  }, {
    start: 3218,
    length: 23,
    convRule: rule14
  }, {
    start: 3242,
    length: 10,
    convRule: rule14
  }, {
    start: 3253,
    length: 5,
    convRule: rule14
  }, {
    start: 3260,
    length: 1,
    convRule: rule92
  }, {
    start: 3261,
    length: 1,
    convRule: rule14
  }, {
    start: 3262,
    length: 1,
    convRule: rule124
  }, {
    start: 3263,
    length: 1,
    convRule: rule92
  }, {
    start: 3264,
    length: 5,
    convRule: rule124
  }, {
    start: 3270,
    length: 1,
    convRule: rule92
  }, {
    start: 3271,
    length: 2,
    convRule: rule124
  }, {
    start: 3274,
    length: 2,
    convRule: rule124
  }, {
    start: 3276,
    length: 2,
    convRule: rule92
  }, {
    start: 3285,
    length: 2,
    convRule: rule124
  }, {
    start: 3294,
    length: 1,
    convRule: rule14
  }, {
    start: 3296,
    length: 2,
    convRule: rule14
  }, {
    start: 3298,
    length: 2,
    convRule: rule92
  }, {
    start: 3302,
    length: 10,
    convRule: rule8
  }, {
    start: 3313,
    length: 2,
    convRule: rule14
  }, {
    start: 3328,
    length: 2,
    convRule: rule92
  }, {
    start: 3330,
    length: 2,
    convRule: rule124
  }, {
    start: 3332,
    length: 9,
    convRule: rule14
  }, {
    start: 3342,
    length: 3,
    convRule: rule14
  }, {
    start: 3346,
    length: 41,
    convRule: rule14
  }, {
    start: 3387,
    length: 2,
    convRule: rule92
  }, {
    start: 3389,
    length: 1,
    convRule: rule14
  }, {
    start: 3390,
    length: 3,
    convRule: rule124
  }, {
    start: 3393,
    length: 4,
    convRule: rule92
  }, {
    start: 3398,
    length: 3,
    convRule: rule124
  }, {
    start: 3402,
    length: 3,
    convRule: rule124
  }, {
    start: 3405,
    length: 1,
    convRule: rule92
  }, {
    start: 3406,
    length: 1,
    convRule: rule14
  }, {
    start: 3407,
    length: 1,
    convRule: rule13
  }, {
    start: 3412,
    length: 3,
    convRule: rule14
  }, {
    start: 3415,
    length: 1,
    convRule: rule124
  }, {
    start: 3416,
    length: 7,
    convRule: rule17
  }, {
    start: 3423,
    length: 3,
    convRule: rule14
  }, {
    start: 3426,
    length: 2,
    convRule: rule92
  }, {
    start: 3430,
    length: 10,
    convRule: rule8
  }, {
    start: 3440,
    length: 9,
    convRule: rule17
  }, {
    start: 3449,
    length: 1,
    convRule: rule13
  }, {
    start: 3450,
    length: 6,
    convRule: rule14
  }, {
    start: 3457,
    length: 1,
    convRule: rule92
  }, {
    start: 3458,
    length: 2,
    convRule: rule124
  }, {
    start: 3461,
    length: 18,
    convRule: rule14
  }, {
    start: 3482,
    length: 24,
    convRule: rule14
  }, {
    start: 3507,
    length: 9,
    convRule: rule14
  }, {
    start: 3517,
    length: 1,
    convRule: rule14
  }, {
    start: 3520,
    length: 7,
    convRule: rule14
  }, {
    start: 3530,
    length: 1,
    convRule: rule92
  }, {
    start: 3535,
    length: 3,
    convRule: rule124
  }, {
    start: 3538,
    length: 3,
    convRule: rule92
  }, {
    start: 3542,
    length: 1,
    convRule: rule92
  }, {
    start: 3544,
    length: 8,
    convRule: rule124
  }, {
    start: 3558,
    length: 10,
    convRule: rule8
  }, {
    start: 3570,
    length: 2,
    convRule: rule124
  }, {
    start: 3572,
    length: 1,
    convRule: rule2
  }, {
    start: 3585,
    length: 48,
    convRule: rule14
  }, {
    start: 3633,
    length: 1,
    convRule: rule92
  }, {
    start: 3634,
    length: 2,
    convRule: rule14
  }, {
    start: 3636,
    length: 7,
    convRule: rule92
  }, {
    start: 3647,
    length: 1,
    convRule: rule3
  }, {
    start: 3648,
    length: 6,
    convRule: rule14
  }, {
    start: 3654,
    length: 1,
    convRule: rule91
  }, {
    start: 3655,
    length: 8,
    convRule: rule92
  }, {
    start: 3663,
    length: 1,
    convRule: rule2
  }, {
    start: 3664,
    length: 10,
    convRule: rule8
  }, {
    start: 3674,
    length: 2,
    convRule: rule2
  }, {
    start: 3713,
    length: 2,
    convRule: rule14
  }, {
    start: 3716,
    length: 1,
    convRule: rule14
  }, {
    start: 3718,
    length: 5,
    convRule: rule14
  }, {
    start: 3724,
    length: 24,
    convRule: rule14
  }, {
    start: 3749,
    length: 1,
    convRule: rule14
  }, {
    start: 3751,
    length: 10,
    convRule: rule14
  }, {
    start: 3761,
    length: 1,
    convRule: rule92
  }, {
    start: 3762,
    length: 2,
    convRule: rule14
  }, {
    start: 3764,
    length: 9,
    convRule: rule92
  }, {
    start: 3773,
    length: 1,
    convRule: rule14
  }, {
    start: 3776,
    length: 5,
    convRule: rule14
  }, {
    start: 3782,
    length: 1,
    convRule: rule91
  }, {
    start: 3784,
    length: 6,
    convRule: rule92
  }, {
    start: 3792,
    length: 10,
    convRule: rule8
  }, {
    start: 3804,
    length: 4,
    convRule: rule14
  }, {
    start: 3840,
    length: 1,
    convRule: rule14
  }, {
    start: 3841,
    length: 3,
    convRule: rule13
  }, {
    start: 3844,
    length: 15,
    convRule: rule2
  }, {
    start: 3859,
    length: 1,
    convRule: rule13
  }, {
    start: 3860,
    length: 1,
    convRule: rule2
  }, {
    start: 3861,
    length: 3,
    convRule: rule13
  }, {
    start: 3864,
    length: 2,
    convRule: rule92
  }, {
    start: 3866,
    length: 6,
    convRule: rule13
  }, {
    start: 3872,
    length: 10,
    convRule: rule8
  }, {
    start: 3882,
    length: 10,
    convRule: rule17
  }, {
    start: 3892,
    length: 1,
    convRule: rule13
  }, {
    start: 3893,
    length: 1,
    convRule: rule92
  }, {
    start: 3894,
    length: 1,
    convRule: rule13
  }, {
    start: 3895,
    length: 1,
    convRule: rule92
  }, {
    start: 3896,
    length: 1,
    convRule: rule13
  }, {
    start: 3897,
    length: 1,
    convRule: rule92
  }, {
    start: 3898,
    length: 1,
    convRule: rule4
  }, {
    start: 3899,
    length: 1,
    convRule: rule5
  }, {
    start: 3900,
    length: 1,
    convRule: rule4
  }, {
    start: 3901,
    length: 1,
    convRule: rule5
  }, {
    start: 3902,
    length: 2,
    convRule: rule124
  }, {
    start: 3904,
    length: 8,
    convRule: rule14
  }, {
    start: 3913,
    length: 36,
    convRule: rule14
  }, {
    start: 3953,
    length: 14,
    convRule: rule92
  }, {
    start: 3967,
    length: 1,
    convRule: rule124
  }, {
    start: 3968,
    length: 5,
    convRule: rule92
  }, {
    start: 3973,
    length: 1,
    convRule: rule2
  }, {
    start: 3974,
    length: 2,
    convRule: rule92
  }, {
    start: 3976,
    length: 5,
    convRule: rule14
  }, {
    start: 3981,
    length: 11,
    convRule: rule92
  }, {
    start: 3993,
    length: 36,
    convRule: rule92
  }, {
    start: 4030,
    length: 8,
    convRule: rule13
  }, {
    start: 4038,
    length: 1,
    convRule: rule92
  }, {
    start: 4039,
    length: 6,
    convRule: rule13
  }, {
    start: 4046,
    length: 2,
    convRule: rule13
  }, {
    start: 4048,
    length: 5,
    convRule: rule2
  }, {
    start: 4053,
    length: 4,
    convRule: rule13
  }, {
    start: 4057,
    length: 2,
    convRule: rule2
  }, {
    start: 4096,
    length: 43,
    convRule: rule14
  }, {
    start: 4139,
    length: 2,
    convRule: rule124
  }, {
    start: 4141,
    length: 4,
    convRule: rule92
  }, {
    start: 4145,
    length: 1,
    convRule: rule124
  }, {
    start: 4146,
    length: 6,
    convRule: rule92
  }, {
    start: 4152,
    length: 1,
    convRule: rule124
  }, {
    start: 4153,
    length: 2,
    convRule: rule92
  }, {
    start: 4155,
    length: 2,
    convRule: rule124
  }, {
    start: 4157,
    length: 2,
    convRule: rule92
  }, {
    start: 4159,
    length: 1,
    convRule: rule14
  }, {
    start: 4160,
    length: 10,
    convRule: rule8
  }, {
    start: 4170,
    length: 6,
    convRule: rule2
  }, {
    start: 4176,
    length: 6,
    convRule: rule14
  }, {
    start: 4182,
    length: 2,
    convRule: rule124
  }, {
    start: 4184,
    length: 2,
    convRule: rule92
  }, {
    start: 4186,
    length: 4,
    convRule: rule14
  }, {
    start: 4190,
    length: 3,
    convRule: rule92
  }, {
    start: 4193,
    length: 1,
    convRule: rule14
  }, {
    start: 4194,
    length: 3,
    convRule: rule124
  }, {
    start: 4197,
    length: 2,
    convRule: rule14
  }, {
    start: 4199,
    length: 7,
    convRule: rule124
  }, {
    start: 4206,
    length: 3,
    convRule: rule14
  }, {
    start: 4209,
    length: 4,
    convRule: rule92
  }, {
    start: 4213,
    length: 13,
    convRule: rule14
  }, {
    start: 4226,
    length: 1,
    convRule: rule92
  }, {
    start: 4227,
    length: 2,
    convRule: rule124
  }, {
    start: 4229,
    length: 2,
    convRule: rule92
  }, {
    start: 4231,
    length: 6,
    convRule: rule124
  }, {
    start: 4237,
    length: 1,
    convRule: rule92
  }, {
    start: 4238,
    length: 1,
    convRule: rule14
  }, {
    start: 4239,
    length: 1,
    convRule: rule124
  }, {
    start: 4240,
    length: 10,
    convRule: rule8
  }, {
    start: 4250,
    length: 3,
    convRule: rule124
  }, {
    start: 4253,
    length: 1,
    convRule: rule92
  }, {
    start: 4254,
    length: 2,
    convRule: rule13
  }, {
    start: 4256,
    length: 38,
    convRule: rule125
  }, {
    start: 4295,
    length: 1,
    convRule: rule125
  }, {
    start: 4301,
    length: 1,
    convRule: rule125
  }, {
    start: 4304,
    length: 43,
    convRule: rule126
  }, {
    start: 4347,
    length: 1,
    convRule: rule2
  }, {
    start: 4348,
    length: 1,
    convRule: rule91
  }, {
    start: 4349,
    length: 3,
    convRule: rule126
  }, {
    start: 4352,
    length: 329,
    convRule: rule14
  }, {
    start: 4682,
    length: 4,
    convRule: rule14
  }, {
    start: 4688,
    length: 7,
    convRule: rule14
  }, {
    start: 4696,
    length: 1,
    convRule: rule14
  }, {
    start: 4698,
    length: 4,
    convRule: rule14
  }, {
    start: 4704,
    length: 41,
    convRule: rule14
  }, {
    start: 4746,
    length: 4,
    convRule: rule14
  }, {
    start: 4752,
    length: 33,
    convRule: rule14
  }, {
    start: 4786,
    length: 4,
    convRule: rule14
  }, {
    start: 4792,
    length: 7,
    convRule: rule14
  }, {
    start: 4800,
    length: 1,
    convRule: rule14
  }, {
    start: 4802,
    length: 4,
    convRule: rule14
  }, {
    start: 4808,
    length: 15,
    convRule: rule14
  }, {
    start: 4824,
    length: 57,
    convRule: rule14
  }, {
    start: 4882,
    length: 4,
    convRule: rule14
  }, {
    start: 4888,
    length: 67,
    convRule: rule14
  }, {
    start: 4957,
    length: 3,
    convRule: rule92
  }, {
    start: 4960,
    length: 9,
    convRule: rule2
  }, {
    start: 4969,
    length: 20,
    convRule: rule17
  }, {
    start: 4992,
    length: 16,
    convRule: rule14
  }, {
    start: 5008,
    length: 10,
    convRule: rule13
  }, {
    start: 5024,
    length: 80,
    convRule: rule127
  }, {
    start: 5104,
    length: 6,
    convRule: rule104
  }, {
    start: 5112,
    length: 6,
    convRule: rule110
  }, {
    start: 5120,
    length: 1,
    convRule: rule7
  }, {
    start: 5121,
    length: 620,
    convRule: rule14
  }, {
    start: 5741,
    length: 1,
    convRule: rule13
  }, {
    start: 5742,
    length: 1,
    convRule: rule2
  }, {
    start: 5743,
    length: 17,
    convRule: rule14
  }, {
    start: 5760,
    length: 1,
    convRule: rule1
  }, {
    start: 5761,
    length: 26,
    convRule: rule14
  }, {
    start: 5787,
    length: 1,
    convRule: rule4
  }, {
    start: 5788,
    length: 1,
    convRule: rule5
  }, {
    start: 5792,
    length: 75,
    convRule: rule14
  }, {
    start: 5867,
    length: 3,
    convRule: rule2
  }, {
    start: 5870,
    length: 3,
    convRule: rule128
  }, {
    start: 5873,
    length: 8,
    convRule: rule14
  }, {
    start: 5888,
    length: 13,
    convRule: rule14
  }, {
    start: 5902,
    length: 4,
    convRule: rule14
  }, {
    start: 5906,
    length: 3,
    convRule: rule92
  }, {
    start: 5920,
    length: 18,
    convRule: rule14
  }, {
    start: 5938,
    length: 3,
    convRule: rule92
  }, {
    start: 5941,
    length: 2,
    convRule: rule2
  }, {
    start: 5952,
    length: 18,
    convRule: rule14
  }, {
    start: 5970,
    length: 2,
    convRule: rule92
  }, {
    start: 5984,
    length: 13,
    convRule: rule14
  }, {
    start: 5998,
    length: 3,
    convRule: rule14
  }, {
    start: 6002,
    length: 2,
    convRule: rule92
  }, {
    start: 6016,
    length: 52,
    convRule: rule14
  }, {
    start: 6068,
    length: 2,
    convRule: rule92
  }, {
    start: 6070,
    length: 1,
    convRule: rule124
  }, {
    start: 6071,
    length: 7,
    convRule: rule92
  }, {
    start: 6078,
    length: 8,
    convRule: rule124
  }, {
    start: 6086,
    length: 1,
    convRule: rule92
  }, {
    start: 6087,
    length: 2,
    convRule: rule124
  }, {
    start: 6089,
    length: 11,
    convRule: rule92
  }, {
    start: 6100,
    length: 3,
    convRule: rule2
  }, {
    start: 6103,
    length: 1,
    convRule: rule91
  }, {
    start: 6104,
    length: 3,
    convRule: rule2
  }, {
    start: 6107,
    length: 1,
    convRule: rule3
  }, {
    start: 6108,
    length: 1,
    convRule: rule14
  }, {
    start: 6109,
    length: 1,
    convRule: rule92
  }, {
    start: 6112,
    length: 10,
    convRule: rule8
  }, {
    start: 6128,
    length: 10,
    convRule: rule17
  }, {
    start: 6144,
    length: 6,
    convRule: rule2
  }, {
    start: 6150,
    length: 1,
    convRule: rule7
  }, {
    start: 6151,
    length: 4,
    convRule: rule2
  }, {
    start: 6155,
    length: 3,
    convRule: rule92
  }, {
    start: 6158,
    length: 1,
    convRule: rule16
  }, {
    start: 6160,
    length: 10,
    convRule: rule8
  }, {
    start: 6176,
    length: 35,
    convRule: rule14
  }, {
    start: 6211,
    length: 1,
    convRule: rule91
  }, {
    start: 6212,
    length: 53,
    convRule: rule14
  }, {
    start: 6272,
    length: 5,
    convRule: rule14
  }, {
    start: 6277,
    length: 2,
    convRule: rule92
  }, {
    start: 6279,
    length: 34,
    convRule: rule14
  }, {
    start: 6313,
    length: 1,
    convRule: rule92
  }, {
    start: 6314,
    length: 1,
    convRule: rule14
  }, {
    start: 6320,
    length: 70,
    convRule: rule14
  }, {
    start: 6400,
    length: 31,
    convRule: rule14
  }, {
    start: 6432,
    length: 3,
    convRule: rule92
  }, {
    start: 6435,
    length: 4,
    convRule: rule124
  }, {
    start: 6439,
    length: 2,
    convRule: rule92
  }, {
    start: 6441,
    length: 3,
    convRule: rule124
  }, {
    start: 6448,
    length: 2,
    convRule: rule124
  }, {
    start: 6450,
    length: 1,
    convRule: rule92
  }, {
    start: 6451,
    length: 6,
    convRule: rule124
  }, {
    start: 6457,
    length: 3,
    convRule: rule92
  }, {
    start: 6464,
    length: 1,
    convRule: rule13
  }, {
    start: 6468,
    length: 2,
    convRule: rule2
  }, {
    start: 6470,
    length: 10,
    convRule: rule8
  }, {
    start: 6480,
    length: 30,
    convRule: rule14
  }, {
    start: 6512,
    length: 5,
    convRule: rule14
  }, {
    start: 6528,
    length: 44,
    convRule: rule14
  }, {
    start: 6576,
    length: 26,
    convRule: rule14
  }, {
    start: 6608,
    length: 10,
    convRule: rule8
  }, {
    start: 6618,
    length: 1,
    convRule: rule17
  }, {
    start: 6622,
    length: 34,
    convRule: rule13
  }, {
    start: 6656,
    length: 23,
    convRule: rule14
  }, {
    start: 6679,
    length: 2,
    convRule: rule92
  }, {
    start: 6681,
    length: 2,
    convRule: rule124
  }, {
    start: 6683,
    length: 1,
    convRule: rule92
  }, {
    start: 6686,
    length: 2,
    convRule: rule2
  }, {
    start: 6688,
    length: 53,
    convRule: rule14
  }, {
    start: 6741,
    length: 1,
    convRule: rule124
  }, {
    start: 6742,
    length: 1,
    convRule: rule92
  }, {
    start: 6743,
    length: 1,
    convRule: rule124
  }, {
    start: 6744,
    length: 7,
    convRule: rule92
  }, {
    start: 6752,
    length: 1,
    convRule: rule92
  }, {
    start: 6753,
    length: 1,
    convRule: rule124
  }, {
    start: 6754,
    length: 1,
    convRule: rule92
  }, {
    start: 6755,
    length: 2,
    convRule: rule124
  }, {
    start: 6757,
    length: 8,
    convRule: rule92
  }, {
    start: 6765,
    length: 6,
    convRule: rule124
  }, {
    start: 6771,
    length: 10,
    convRule: rule92
  }, {
    start: 6783,
    length: 1,
    convRule: rule92
  }, {
    start: 6784,
    length: 10,
    convRule: rule8
  }, {
    start: 6800,
    length: 10,
    convRule: rule8
  }, {
    start: 6816,
    length: 7,
    convRule: rule2
  }, {
    start: 6823,
    length: 1,
    convRule: rule91
  }, {
    start: 6824,
    length: 6,
    convRule: rule2
  }, {
    start: 6832,
    length: 14,
    convRule: rule92
  }, {
    start: 6846,
    length: 1,
    convRule: rule119
  }, {
    start: 6847,
    length: 2,
    convRule: rule92
  }, {
    start: 6912,
    length: 4,
    convRule: rule92
  }, {
    start: 6916,
    length: 1,
    convRule: rule124
  }, {
    start: 6917,
    length: 47,
    convRule: rule14
  }, {
    start: 6964,
    length: 1,
    convRule: rule92
  }, {
    start: 6965,
    length: 1,
    convRule: rule124
  }, {
    start: 6966,
    length: 5,
    convRule: rule92
  }, {
    start: 6971,
    length: 1,
    convRule: rule124
  }, {
    start: 6972,
    length: 1,
    convRule: rule92
  }, {
    start: 6973,
    length: 5,
    convRule: rule124
  }, {
    start: 6978,
    length: 1,
    convRule: rule92
  }, {
    start: 6979,
    length: 2,
    convRule: rule124
  }, {
    start: 6981,
    length: 7,
    convRule: rule14
  }, {
    start: 6992,
    length: 10,
    convRule: rule8
  }, {
    start: 7002,
    length: 7,
    convRule: rule2
  }, {
    start: 7009,
    length: 10,
    convRule: rule13
  }, {
    start: 7019,
    length: 9,
    convRule: rule92
  }, {
    start: 7028,
    length: 9,
    convRule: rule13
  }, {
    start: 7040,
    length: 2,
    convRule: rule92
  }, {
    start: 7042,
    length: 1,
    convRule: rule124
  }, {
    start: 7043,
    length: 30,
    convRule: rule14
  }, {
    start: 7073,
    length: 1,
    convRule: rule124
  }, {
    start: 7074,
    length: 4,
    convRule: rule92
  }, {
    start: 7078,
    length: 2,
    convRule: rule124
  }, {
    start: 7080,
    length: 2,
    convRule: rule92
  }, {
    start: 7082,
    length: 1,
    convRule: rule124
  }, {
    start: 7083,
    length: 3,
    convRule: rule92
  }, {
    start: 7086,
    length: 2,
    convRule: rule14
  }, {
    start: 7088,
    length: 10,
    convRule: rule8
  }, {
    start: 7098,
    length: 44,
    convRule: rule14
  }, {
    start: 7142,
    length: 1,
    convRule: rule92
  }, {
    start: 7143,
    length: 1,
    convRule: rule124
  }, {
    start: 7144,
    length: 2,
    convRule: rule92
  }, {
    start: 7146,
    length: 3,
    convRule: rule124
  }, {
    start: 7149,
    length: 1,
    convRule: rule92
  }, {
    start: 7150,
    length: 1,
    convRule: rule124
  }, {
    start: 7151,
    length: 3,
    convRule: rule92
  }, {
    start: 7154,
    length: 2,
    convRule: rule124
  }, {
    start: 7164,
    length: 4,
    convRule: rule2
  }, {
    start: 7168,
    length: 36,
    convRule: rule14
  }, {
    start: 7204,
    length: 8,
    convRule: rule124
  }, {
    start: 7212,
    length: 8,
    convRule: rule92
  }, {
    start: 7220,
    length: 2,
    convRule: rule124
  }, {
    start: 7222,
    length: 2,
    convRule: rule92
  }, {
    start: 7227,
    length: 5,
    convRule: rule2
  }, {
    start: 7232,
    length: 10,
    convRule: rule8
  }, {
    start: 7245,
    length: 3,
    convRule: rule14
  }, {
    start: 7248,
    length: 10,
    convRule: rule8
  }, {
    start: 7258,
    length: 30,
    convRule: rule14
  }, {
    start: 7288,
    length: 6,
    convRule: rule91
  }, {
    start: 7294,
    length: 2,
    convRule: rule2
  }, {
    start: 7296,
    length: 1,
    convRule: rule129
  }, {
    start: 7297,
    length: 1,
    convRule: rule130
  }, {
    start: 7298,
    length: 1,
    convRule: rule131
  }, {
    start: 7299,
    length: 2,
    convRule: rule132
  }, {
    start: 7301,
    length: 1,
    convRule: rule133
  }, {
    start: 7302,
    length: 1,
    convRule: rule134
  }, {
    start: 7303,
    length: 1,
    convRule: rule135
  }, {
    start: 7304,
    length: 1,
    convRule: rule136
  }, {
    start: 7312,
    length: 43,
    convRule: rule137
  }, {
    start: 7357,
    length: 3,
    convRule: rule137
  }, {
    start: 7360,
    length: 8,
    convRule: rule2
  }, {
    start: 7376,
    length: 3,
    convRule: rule92
  }, {
    start: 7379,
    length: 1,
    convRule: rule2
  }, {
    start: 7380,
    length: 13,
    convRule: rule92
  }, {
    start: 7393,
    length: 1,
    convRule: rule124
  }, {
    start: 7394,
    length: 7,
    convRule: rule92
  }, {
    start: 7401,
    length: 4,
    convRule: rule14
  }, {
    start: 7405,
    length: 1,
    convRule: rule92
  }, {
    start: 7406,
    length: 6,
    convRule: rule14
  }, {
    start: 7412,
    length: 1,
    convRule: rule92
  }, {
    start: 7413,
    length: 2,
    convRule: rule14
  }, {
    start: 7415,
    length: 1,
    convRule: rule124
  }, {
    start: 7416,
    length: 2,
    convRule: rule92
  }, {
    start: 7418,
    length: 1,
    convRule: rule14
  }, {
    start: 7424,
    length: 44,
    convRule: rule20
  }, {
    start: 7468,
    length: 63,
    convRule: rule91
  }, {
    start: 7531,
    length: 13,
    convRule: rule20
  }, {
    start: 7544,
    length: 1,
    convRule: rule91
  }, {
    start: 7545,
    length: 1,
    convRule: rule138
  }, {
    start: 7546,
    length: 3,
    convRule: rule20
  }, {
    start: 7549,
    length: 1,
    convRule: rule139
  }, {
    start: 7550,
    length: 16,
    convRule: rule20
  }, {
    start: 7566,
    length: 1,
    convRule: rule140
  }, {
    start: 7567,
    length: 12,
    convRule: rule20
  }, {
    start: 7579,
    length: 37,
    convRule: rule91
  }, {
    start: 7616,
    length: 58,
    convRule: rule92
  }, {
    start: 7675,
    length: 5,
    convRule: rule92
  }, {
    start: 7680,
    length: 1,
    convRule: rule22
  }, {
    start: 7681,
    length: 1,
    convRule: rule23
  }, {
    start: 7682,
    length: 1,
    convRule: rule22
  }, {
    start: 7683,
    length: 1,
    convRule: rule23
  }, {
    start: 7684,
    length: 1,
    convRule: rule22
  }, {
    start: 7685,
    length: 1,
    convRule: rule23
  }, {
    start: 7686,
    length: 1,
    convRule: rule22
  }, {
    start: 7687,
    length: 1,
    convRule: rule23
  }, {
    start: 7688,
    length: 1,
    convRule: rule22
  }, {
    start: 7689,
    length: 1,
    convRule: rule23
  }, {
    start: 7690,
    length: 1,
    convRule: rule22
  }, {
    start: 7691,
    length: 1,
    convRule: rule23
  }, {
    start: 7692,
    length: 1,
    convRule: rule22
  }, {
    start: 7693,
    length: 1,
    convRule: rule23
  }, {
    start: 7694,
    length: 1,
    convRule: rule22
  }, {
    start: 7695,
    length: 1,
    convRule: rule23
  }, {
    start: 7696,
    length: 1,
    convRule: rule22
  }, {
    start: 7697,
    length: 1,
    convRule: rule23
  }, {
    start: 7698,
    length: 1,
    convRule: rule22
  }, {
    start: 7699,
    length: 1,
    convRule: rule23
  }, {
    start: 7700,
    length: 1,
    convRule: rule22
  }, {
    start: 7701,
    length: 1,
    convRule: rule23
  }, {
    start: 7702,
    length: 1,
    convRule: rule22
  }, {
    start: 7703,
    length: 1,
    convRule: rule23
  }, {
    start: 7704,
    length: 1,
    convRule: rule22
  }, {
    start: 7705,
    length: 1,
    convRule: rule23
  }, {
    start: 7706,
    length: 1,
    convRule: rule22
  }, {
    start: 7707,
    length: 1,
    convRule: rule23
  }, {
    start: 7708,
    length: 1,
    convRule: rule22
  }, {
    start: 7709,
    length: 1,
    convRule: rule23
  }, {
    start: 7710,
    length: 1,
    convRule: rule22
  }, {
    start: 7711,
    length: 1,
    convRule: rule23
  }, {
    start: 7712,
    length: 1,
    convRule: rule22
  }, {
    start: 7713,
    length: 1,
    convRule: rule23
  }, {
    start: 7714,
    length: 1,
    convRule: rule22
  }, {
    start: 7715,
    length: 1,
    convRule: rule23
  }, {
    start: 7716,
    length: 1,
    convRule: rule22
  }, {
    start: 7717,
    length: 1,
    convRule: rule23
  }, {
    start: 7718,
    length: 1,
    convRule: rule22
  }, {
    start: 7719,
    length: 1,
    convRule: rule23
  }, {
    start: 7720,
    length: 1,
    convRule: rule22
  }, {
    start: 7721,
    length: 1,
    convRule: rule23
  }, {
    start: 7722,
    length: 1,
    convRule: rule22
  }, {
    start: 7723,
    length: 1,
    convRule: rule23
  }, {
    start: 7724,
    length: 1,
    convRule: rule22
  }, {
    start: 7725,
    length: 1,
    convRule: rule23
  }, {
    start: 7726,
    length: 1,
    convRule: rule22
  }, {
    start: 7727,
    length: 1,
    convRule: rule23
  }, {
    start: 7728,
    length: 1,
    convRule: rule22
  }, {
    start: 7729,
    length: 1,
    convRule: rule23
  }, {
    start: 7730,
    length: 1,
    convRule: rule22
  }, {
    start: 7731,
    length: 1,
    convRule: rule23
  }, {
    start: 7732,
    length: 1,
    convRule: rule22
  }, {
    start: 7733,
    length: 1,
    convRule: rule23
  }, {
    start: 7734,
    length: 1,
    convRule: rule22
  }, {
    start: 7735,
    length: 1,
    convRule: rule23
  }, {
    start: 7736,
    length: 1,
    convRule: rule22
  }, {
    start: 7737,
    length: 1,
    convRule: rule23
  }, {
    start: 7738,
    length: 1,
    convRule: rule22
  }, {
    start: 7739,
    length: 1,
    convRule: rule23
  }, {
    start: 7740,
    length: 1,
    convRule: rule22
  }, {
    start: 7741,
    length: 1,
    convRule: rule23
  }, {
    start: 7742,
    length: 1,
    convRule: rule22
  }, {
    start: 7743,
    length: 1,
    convRule: rule23
  }, {
    start: 7744,
    length: 1,
    convRule: rule22
  }, {
    start: 7745,
    length: 1,
    convRule: rule23
  }, {
    start: 7746,
    length: 1,
    convRule: rule22
  }, {
    start: 7747,
    length: 1,
    convRule: rule23
  }, {
    start: 7748,
    length: 1,
    convRule: rule22
  }, {
    start: 7749,
    length: 1,
    convRule: rule23
  }, {
    start: 7750,
    length: 1,
    convRule: rule22
  }, {
    start: 7751,
    length: 1,
    convRule: rule23
  }, {
    start: 7752,
    length: 1,
    convRule: rule22
  }, {
    start: 7753,
    length: 1,
    convRule: rule23
  }, {
    start: 7754,
    length: 1,
    convRule: rule22
  }, {
    start: 7755,
    length: 1,
    convRule: rule23
  }, {
    start: 7756,
    length: 1,
    convRule: rule22
  }, {
    start: 7757,
    length: 1,
    convRule: rule23
  }, {
    start: 7758,
    length: 1,
    convRule: rule22
  }, {
    start: 7759,
    length: 1,
    convRule: rule23
  }, {
    start: 7760,
    length: 1,
    convRule: rule22
  }, {
    start: 7761,
    length: 1,
    convRule: rule23
  }, {
    start: 7762,
    length: 1,
    convRule: rule22
  }, {
    start: 7763,
    length: 1,
    convRule: rule23
  }, {
    start: 7764,
    length: 1,
    convRule: rule22
  }, {
    start: 7765,
    length: 1,
    convRule: rule23
  }, {
    start: 7766,
    length: 1,
    convRule: rule22
  }, {
    start: 7767,
    length: 1,
    convRule: rule23
  }, {
    start: 7768,
    length: 1,
    convRule: rule22
  }, {
    start: 7769,
    length: 1,
    convRule: rule23
  }, {
    start: 7770,
    length: 1,
    convRule: rule22
  }, {
    start: 7771,
    length: 1,
    convRule: rule23
  }, {
    start: 7772,
    length: 1,
    convRule: rule22
  }, {
    start: 7773,
    length: 1,
    convRule: rule23
  }, {
    start: 7774,
    length: 1,
    convRule: rule22
  }, {
    start: 7775,
    length: 1,
    convRule: rule23
  }, {
    start: 7776,
    length: 1,
    convRule: rule22
  }, {
    start: 7777,
    length: 1,
    convRule: rule23
  }, {
    start: 7778,
    length: 1,
    convRule: rule22
  }, {
    start: 7779,
    length: 1,
    convRule: rule23
  }, {
    start: 7780,
    length: 1,
    convRule: rule22
  }, {
    start: 7781,
    length: 1,
    convRule: rule23
  }, {
    start: 7782,
    length: 1,
    convRule: rule22
  }, {
    start: 7783,
    length: 1,
    convRule: rule23
  }, {
    start: 7784,
    length: 1,
    convRule: rule22
  }, {
    start: 7785,
    length: 1,
    convRule: rule23
  }, {
    start: 7786,
    length: 1,
    convRule: rule22
  }, {
    start: 7787,
    length: 1,
    convRule: rule23
  }, {
    start: 7788,
    length: 1,
    convRule: rule22
  }, {
    start: 7789,
    length: 1,
    convRule: rule23
  }, {
    start: 7790,
    length: 1,
    convRule: rule22
  }, {
    start: 7791,
    length: 1,
    convRule: rule23
  }, {
    start: 7792,
    length: 1,
    convRule: rule22
  }, {
    start: 7793,
    length: 1,
    convRule: rule23
  }, {
    start: 7794,
    length: 1,
    convRule: rule22
  }, {
    start: 7795,
    length: 1,
    convRule: rule23
  }, {
    start: 7796,
    length: 1,
    convRule: rule22
  }, {
    start: 7797,
    length: 1,
    convRule: rule23
  }, {
    start: 7798,
    length: 1,
    convRule: rule22
  }, {
    start: 7799,
    length: 1,
    convRule: rule23
  }, {
    start: 7800,
    length: 1,
    convRule: rule22
  }, {
    start: 7801,
    length: 1,
    convRule: rule23
  }, {
    start: 7802,
    length: 1,
    convRule: rule22
  }, {
    start: 7803,
    length: 1,
    convRule: rule23
  }, {
    start: 7804,
    length: 1,
    convRule: rule22
  }, {
    start: 7805,
    length: 1,
    convRule: rule23
  }, {
    start: 7806,
    length: 1,
    convRule: rule22
  }, {
    start: 7807,
    length: 1,
    convRule: rule23
  }, {
    start: 7808,
    length: 1,
    convRule: rule22
  }, {
    start: 7809,
    length: 1,
    convRule: rule23
  }, {
    start: 7810,
    length: 1,
    convRule: rule22
  }, {
    start: 7811,
    length: 1,
    convRule: rule23
  }, {
    start: 7812,
    length: 1,
    convRule: rule22
  }, {
    start: 7813,
    length: 1,
    convRule: rule23
  }, {
    start: 7814,
    length: 1,
    convRule: rule22
  }, {
    start: 7815,
    length: 1,
    convRule: rule23
  }, {
    start: 7816,
    length: 1,
    convRule: rule22
  }, {
    start: 7817,
    length: 1,
    convRule: rule23
  }, {
    start: 7818,
    length: 1,
    convRule: rule22
  }, {
    start: 7819,
    length: 1,
    convRule: rule23
  }, {
    start: 7820,
    length: 1,
    convRule: rule22
  }, {
    start: 7821,
    length: 1,
    convRule: rule23
  }, {
    start: 7822,
    length: 1,
    convRule: rule22
  }, {
    start: 7823,
    length: 1,
    convRule: rule23
  }, {
    start: 7824,
    length: 1,
    convRule: rule22
  }, {
    start: 7825,
    length: 1,
    convRule: rule23
  }, {
    start: 7826,
    length: 1,
    convRule: rule22
  }, {
    start: 7827,
    length: 1,
    convRule: rule23
  }, {
    start: 7828,
    length: 1,
    convRule: rule22
  }, {
    start: 7829,
    length: 1,
    convRule: rule23
  }, {
    start: 7830,
    length: 5,
    convRule: rule20
  }, {
    start: 7835,
    length: 1,
    convRule: rule141
  }, {
    start: 7836,
    length: 2,
    convRule: rule20
  }, {
    start: 7838,
    length: 1,
    convRule: rule142
  }, {
    start: 7839,
    length: 1,
    convRule: rule20
  }, {
    start: 7840,
    length: 1,
    convRule: rule22
  }, {
    start: 7841,
    length: 1,
    convRule: rule23
  }, {
    start: 7842,
    length: 1,
    convRule: rule22
  }, {
    start: 7843,
    length: 1,
    convRule: rule23
  }, {
    start: 7844,
    length: 1,
    convRule: rule22
  }, {
    start: 7845,
    length: 1,
    convRule: rule23
  }, {
    start: 7846,
    length: 1,
    convRule: rule22
  }, {
    start: 7847,
    length: 1,
    convRule: rule23
  }, {
    start: 7848,
    length: 1,
    convRule: rule22
  }, {
    start: 7849,
    length: 1,
    convRule: rule23
  }, {
    start: 7850,
    length: 1,
    convRule: rule22
  }, {
    start: 7851,
    length: 1,
    convRule: rule23
  }, {
    start: 7852,
    length: 1,
    convRule: rule22
  }, {
    start: 7853,
    length: 1,
    convRule: rule23
  }, {
    start: 7854,
    length: 1,
    convRule: rule22
  }, {
    start: 7855,
    length: 1,
    convRule: rule23
  }, {
    start: 7856,
    length: 1,
    convRule: rule22
  }, {
    start: 7857,
    length: 1,
    convRule: rule23
  }, {
    start: 7858,
    length: 1,
    convRule: rule22
  }, {
    start: 7859,
    length: 1,
    convRule: rule23
  }, {
    start: 7860,
    length: 1,
    convRule: rule22
  }, {
    start: 7861,
    length: 1,
    convRule: rule23
  }, {
    start: 7862,
    length: 1,
    convRule: rule22
  }, {
    start: 7863,
    length: 1,
    convRule: rule23
  }, {
    start: 7864,
    length: 1,
    convRule: rule22
  }, {
    start: 7865,
    length: 1,
    convRule: rule23
  }, {
    start: 7866,
    length: 1,
    convRule: rule22
  }, {
    start: 7867,
    length: 1,
    convRule: rule23
  }, {
    start: 7868,
    length: 1,
    convRule: rule22
  }, {
    start: 7869,
    length: 1,
    convRule: rule23
  }, {
    start: 7870,
    length: 1,
    convRule: rule22
  }, {
    start: 7871,
    length: 1,
    convRule: rule23
  }, {
    start: 7872,
    length: 1,
    convRule: rule22
  }, {
    start: 7873,
    length: 1,
    convRule: rule23
  }, {
    start: 7874,
    length: 1,
    convRule: rule22
  }, {
    start: 7875,
    length: 1,
    convRule: rule23
  }, {
    start: 7876,
    length: 1,
    convRule: rule22
  }, {
    start: 7877,
    length: 1,
    convRule: rule23
  }, {
    start: 7878,
    length: 1,
    convRule: rule22
  }, {
    start: 7879,
    length: 1,
    convRule: rule23
  }, {
    start: 7880,
    length: 1,
    convRule: rule22
  }, {
    start: 7881,
    length: 1,
    convRule: rule23
  }, {
    start: 7882,
    length: 1,
    convRule: rule22
  }, {
    start: 7883,
    length: 1,
    convRule: rule23
  }, {
    start: 7884,
    length: 1,
    convRule: rule22
  }, {
    start: 7885,
    length: 1,
    convRule: rule23
  }, {
    start: 7886,
    length: 1,
    convRule: rule22
  }, {
    start: 7887,
    length: 1,
    convRule: rule23
  }, {
    start: 7888,
    length: 1,
    convRule: rule22
  }, {
    start: 7889,
    length: 1,
    convRule: rule23
  }, {
    start: 7890,
    length: 1,
    convRule: rule22
  }, {
    start: 7891,
    length: 1,
    convRule: rule23
  }, {
    start: 7892,
    length: 1,
    convRule: rule22
  }, {
    start: 7893,
    length: 1,
    convRule: rule23
  }, {
    start: 7894,
    length: 1,
    convRule: rule22
  }, {
    start: 7895,
    length: 1,
    convRule: rule23
  }, {
    start: 7896,
    length: 1,
    convRule: rule22
  }, {
    start: 7897,
    length: 1,
    convRule: rule23
  }, {
    start: 7898,
    length: 1,
    convRule: rule22
  }, {
    start: 7899,
    length: 1,
    convRule: rule23
  }, {
    start: 7900,
    length: 1,
    convRule: rule22
  }, {
    start: 7901,
    length: 1,
    convRule: rule23
  }, {
    start: 7902,
    length: 1,
    convRule: rule22
  }, {
    start: 7903,
    length: 1,
    convRule: rule23
  }, {
    start: 7904,
    length: 1,
    convRule: rule22
  }, {
    start: 7905,
    length: 1,
    convRule: rule23
  }, {
    start: 7906,
    length: 1,
    convRule: rule22
  }, {
    start: 7907,
    length: 1,
    convRule: rule23
  }, {
    start: 7908,
    length: 1,
    convRule: rule22
  }, {
    start: 7909,
    length: 1,
    convRule: rule23
  }, {
    start: 7910,
    length: 1,
    convRule: rule22
  }, {
    start: 7911,
    length: 1,
    convRule: rule23
  }, {
    start: 7912,
    length: 1,
    convRule: rule22
  }, {
    start: 7913,
    length: 1,
    convRule: rule23
  }, {
    start: 7914,
    length: 1,
    convRule: rule22
  }, {
    start: 7915,
    length: 1,
    convRule: rule23
  }, {
    start: 7916,
    length: 1,
    convRule: rule22
  }, {
    start: 7917,
    length: 1,
    convRule: rule23
  }, {
    start: 7918,
    length: 1,
    convRule: rule22
  }, {
    start: 7919,
    length: 1,
    convRule: rule23
  }, {
    start: 7920,
    length: 1,
    convRule: rule22
  }, {
    start: 7921,
    length: 1,
    convRule: rule23
  }, {
    start: 7922,
    length: 1,
    convRule: rule22
  }, {
    start: 7923,
    length: 1,
    convRule: rule23
  }, {
    start: 7924,
    length: 1,
    convRule: rule22
  }, {
    start: 7925,
    length: 1,
    convRule: rule23
  }, {
    start: 7926,
    length: 1,
    convRule: rule22
  }, {
    start: 7927,
    length: 1,
    convRule: rule23
  }, {
    start: 7928,
    length: 1,
    convRule: rule22
  }, {
    start: 7929,
    length: 1,
    convRule: rule23
  }, {
    start: 7930,
    length: 1,
    convRule: rule22
  }, {
    start: 7931,
    length: 1,
    convRule: rule23
  }, {
    start: 7932,
    length: 1,
    convRule: rule22
  }, {
    start: 7933,
    length: 1,
    convRule: rule23
  }, {
    start: 7934,
    length: 1,
    convRule: rule22
  }, {
    start: 7935,
    length: 1,
    convRule: rule23
  }, {
    start: 7936,
    length: 8,
    convRule: rule143
  }, {
    start: 7944,
    length: 8,
    convRule: rule144
  }, {
    start: 7952,
    length: 6,
    convRule: rule143
  }, {
    start: 7960,
    length: 6,
    convRule: rule144
  }, {
    start: 7968,
    length: 8,
    convRule: rule143
  }, {
    start: 7976,
    length: 8,
    convRule: rule144
  }, {
    start: 7984,
    length: 8,
    convRule: rule143
  }, {
    start: 7992,
    length: 8,
    convRule: rule144
  }, {
    start: 8e3,
    length: 6,
    convRule: rule143
  }, {
    start: 8008,
    length: 6,
    convRule: rule144
  }, {
    start: 8016,
    length: 1,
    convRule: rule20
  }, {
    start: 8017,
    length: 1,
    convRule: rule143
  }, {
    start: 8018,
    length: 1,
    convRule: rule20
  }, {
    start: 8019,
    length: 1,
    convRule: rule143
  }, {
    start: 8020,
    length: 1,
    convRule: rule20
  }, {
    start: 8021,
    length: 1,
    convRule: rule143
  }, {
    start: 8022,
    length: 1,
    convRule: rule20
  }, {
    start: 8023,
    length: 1,
    convRule: rule143
  }, {
    start: 8025,
    length: 1,
    convRule: rule144
  }, {
    start: 8027,
    length: 1,
    convRule: rule144
  }, {
    start: 8029,
    length: 1,
    convRule: rule144
  }, {
    start: 8031,
    length: 1,
    convRule: rule144
  }, {
    start: 8032,
    length: 8,
    convRule: rule143
  }, {
    start: 8040,
    length: 8,
    convRule: rule144
  }, {
    start: 8048,
    length: 2,
    convRule: rule145
  }, {
    start: 8050,
    length: 4,
    convRule: rule146
  }, {
    start: 8054,
    length: 2,
    convRule: rule147
  }, {
    start: 8056,
    length: 2,
    convRule: rule148
  }, {
    start: 8058,
    length: 2,
    convRule: rule149
  }, {
    start: 8060,
    length: 2,
    convRule: rule150
  }, {
    start: 8064,
    length: 8,
    convRule: rule143
  }, {
    start: 8072,
    length: 8,
    convRule: rule151
  }, {
    start: 8080,
    length: 8,
    convRule: rule143
  }, {
    start: 8088,
    length: 8,
    convRule: rule151
  }, {
    start: 8096,
    length: 8,
    convRule: rule143
  }, {
    start: 8104,
    length: 8,
    convRule: rule151
  }, {
    start: 8112,
    length: 2,
    convRule: rule143
  }, {
    start: 8114,
    length: 1,
    convRule: rule20
  }, {
    start: 8115,
    length: 1,
    convRule: rule152
  }, {
    start: 8116,
    length: 1,
    convRule: rule20
  }, {
    start: 8118,
    length: 2,
    convRule: rule20
  }, {
    start: 8120,
    length: 2,
    convRule: rule144
  }, {
    start: 8122,
    length: 2,
    convRule: rule153
  }, {
    start: 8124,
    length: 1,
    convRule: rule154
  }, {
    start: 8125,
    length: 1,
    convRule: rule10
  }, {
    start: 8126,
    length: 1,
    convRule: rule155
  }, {
    start: 8127,
    length: 3,
    convRule: rule10
  }, {
    start: 8130,
    length: 1,
    convRule: rule20
  }, {
    start: 8131,
    length: 1,
    convRule: rule152
  }, {
    start: 8132,
    length: 1,
    convRule: rule20
  }, {
    start: 8134,
    length: 2,
    convRule: rule20
  }, {
    start: 8136,
    length: 4,
    convRule: rule156
  }, {
    start: 8140,
    length: 1,
    convRule: rule154
  }, {
    start: 8141,
    length: 3,
    convRule: rule10
  }, {
    start: 8144,
    length: 2,
    convRule: rule143
  }, {
    start: 8146,
    length: 2,
    convRule: rule20
  }, {
    start: 8150,
    length: 2,
    convRule: rule20
  }, {
    start: 8152,
    length: 2,
    convRule: rule144
  }, {
    start: 8154,
    length: 2,
    convRule: rule157
  }, {
    start: 8157,
    length: 3,
    convRule: rule10
  }, {
    start: 8160,
    length: 2,
    convRule: rule143
  }, {
    start: 8162,
    length: 3,
    convRule: rule20
  }, {
    start: 8165,
    length: 1,
    convRule: rule113
  }, {
    start: 8166,
    length: 2,
    convRule: rule20
  }, {
    start: 8168,
    length: 2,
    convRule: rule144
  }, {
    start: 8170,
    length: 2,
    convRule: rule158
  }, {
    start: 8172,
    length: 1,
    convRule: rule117
  }, {
    start: 8173,
    length: 3,
    convRule: rule10
  }, {
    start: 8178,
    length: 1,
    convRule: rule20
  }, {
    start: 8179,
    length: 1,
    convRule: rule152
  }, {
    start: 8180,
    length: 1,
    convRule: rule20
  }, {
    start: 8182,
    length: 2,
    convRule: rule20
  }, {
    start: 8184,
    length: 2,
    convRule: rule159
  }, {
    start: 8186,
    length: 2,
    convRule: rule160
  }, {
    start: 8188,
    length: 1,
    convRule: rule154
  }, {
    start: 8189,
    length: 2,
    convRule: rule10
  }, {
    start: 8192,
    length: 11,
    convRule: rule1
  }, {
    start: 8203,
    length: 5,
    convRule: rule16
  }, {
    start: 8208,
    length: 6,
    convRule: rule7
  }, {
    start: 8214,
    length: 2,
    convRule: rule2
  }, {
    start: 8216,
    length: 1,
    convRule: rule15
  }, {
    start: 8217,
    length: 1,
    convRule: rule19
  }, {
    start: 8218,
    length: 1,
    convRule: rule4
  }, {
    start: 8219,
    length: 2,
    convRule: rule15
  }, {
    start: 8221,
    length: 1,
    convRule: rule19
  }, {
    start: 8222,
    length: 1,
    convRule: rule4
  }, {
    start: 8223,
    length: 1,
    convRule: rule15
  }, {
    start: 8224,
    length: 8,
    convRule: rule2
  }, {
    start: 8232,
    length: 1,
    convRule: rule161
  }, {
    start: 8233,
    length: 1,
    convRule: rule162
  }, {
    start: 8234,
    length: 5,
    convRule: rule16
  }, {
    start: 8239,
    length: 1,
    convRule: rule1
  }, {
    start: 8240,
    length: 9,
    convRule: rule2
  }, {
    start: 8249,
    length: 1,
    convRule: rule15
  }, {
    start: 8250,
    length: 1,
    convRule: rule19
  }, {
    start: 8251,
    length: 4,
    convRule: rule2
  }, {
    start: 8255,
    length: 2,
    convRule: rule11
  }, {
    start: 8257,
    length: 3,
    convRule: rule2
  }, {
    start: 8260,
    length: 1,
    convRule: rule6
  }, {
    start: 8261,
    length: 1,
    convRule: rule4
  }, {
    start: 8262,
    length: 1,
    convRule: rule5
  }, {
    start: 8263,
    length: 11,
    convRule: rule2
  }, {
    start: 8274,
    length: 1,
    convRule: rule6
  }, {
    start: 8275,
    length: 1,
    convRule: rule2
  }, {
    start: 8276,
    length: 1,
    convRule: rule11
  }, {
    start: 8277,
    length: 10,
    convRule: rule2
  }, {
    start: 8287,
    length: 1,
    convRule: rule1
  }, {
    start: 8288,
    length: 5,
    convRule: rule16
  }, {
    start: 8294,
    length: 10,
    convRule: rule16
  }, {
    start: 8304,
    length: 1,
    convRule: rule17
  }, {
    start: 8305,
    length: 1,
    convRule: rule91
  }, {
    start: 8308,
    length: 6,
    convRule: rule17
  }, {
    start: 8314,
    length: 3,
    convRule: rule6
  }, {
    start: 8317,
    length: 1,
    convRule: rule4
  }, {
    start: 8318,
    length: 1,
    convRule: rule5
  }, {
    start: 8319,
    length: 1,
    convRule: rule91
  }, {
    start: 8320,
    length: 10,
    convRule: rule17
  }, {
    start: 8330,
    length: 3,
    convRule: rule6
  }, {
    start: 8333,
    length: 1,
    convRule: rule4
  }, {
    start: 8334,
    length: 1,
    convRule: rule5
  }, {
    start: 8336,
    length: 13,
    convRule: rule91
  }, {
    start: 8352,
    length: 32,
    convRule: rule3
  }, {
    start: 8400,
    length: 13,
    convRule: rule92
  }, {
    start: 8413,
    length: 4,
    convRule: rule119
  }, {
    start: 8417,
    length: 1,
    convRule: rule92
  }, {
    start: 8418,
    length: 3,
    convRule: rule119
  }, {
    start: 8421,
    length: 12,
    convRule: rule92
  }, {
    start: 8448,
    length: 2,
    convRule: rule13
  }, {
    start: 8450,
    length: 1,
    convRule: rule107
  }, {
    start: 8451,
    length: 4,
    convRule: rule13
  }, {
    start: 8455,
    length: 1,
    convRule: rule107
  }, {
    start: 8456,
    length: 2,
    convRule: rule13
  }, {
    start: 8458,
    length: 1,
    convRule: rule20
  }, {
    start: 8459,
    length: 3,
    convRule: rule107
  }, {
    start: 8462,
    length: 2,
    convRule: rule20
  }, {
    start: 8464,
    length: 3,
    convRule: rule107
  }, {
    start: 8467,
    length: 1,
    convRule: rule20
  }, {
    start: 8468,
    length: 1,
    convRule: rule13
  }, {
    start: 8469,
    length: 1,
    convRule: rule107
  }, {
    start: 8470,
    length: 2,
    convRule: rule13
  }, {
    start: 8472,
    length: 1,
    convRule: rule6
  }, {
    start: 8473,
    length: 5,
    convRule: rule107
  }, {
    start: 8478,
    length: 6,
    convRule: rule13
  }, {
    start: 8484,
    length: 1,
    convRule: rule107
  }, {
    start: 8485,
    length: 1,
    convRule: rule13
  }, {
    start: 8486,
    length: 1,
    convRule: rule163
  }, {
    start: 8487,
    length: 1,
    convRule: rule13
  }, {
    start: 8488,
    length: 1,
    convRule: rule107
  }, {
    start: 8489,
    length: 1,
    convRule: rule13
  }, {
    start: 8490,
    length: 1,
    convRule: rule164
  }, {
    start: 8491,
    length: 1,
    convRule: rule165
  }, {
    start: 8492,
    length: 2,
    convRule: rule107
  }, {
    start: 8494,
    length: 1,
    convRule: rule13
  }, {
    start: 8495,
    length: 1,
    convRule: rule20
  }, {
    start: 8496,
    length: 2,
    convRule: rule107
  }, {
    start: 8498,
    length: 1,
    convRule: rule166
  }, {
    start: 8499,
    length: 1,
    convRule: rule107
  }, {
    start: 8500,
    length: 1,
    convRule: rule20
  }, {
    start: 8501,
    length: 4,
    convRule: rule14
  }, {
    start: 8505,
    length: 1,
    convRule: rule20
  }, {
    start: 8506,
    length: 2,
    convRule: rule13
  }, {
    start: 8508,
    length: 2,
    convRule: rule20
  }, {
    start: 8510,
    length: 2,
    convRule: rule107
  }, {
    start: 8512,
    length: 5,
    convRule: rule6
  }, {
    start: 8517,
    length: 1,
    convRule: rule107
  }, {
    start: 8518,
    length: 4,
    convRule: rule20
  }, {
    start: 8522,
    length: 1,
    convRule: rule13
  }, {
    start: 8523,
    length: 1,
    convRule: rule6
  }, {
    start: 8524,
    length: 2,
    convRule: rule13
  }, {
    start: 8526,
    length: 1,
    convRule: rule167
  }, {
    start: 8527,
    length: 1,
    convRule: rule13
  }, {
    start: 8528,
    length: 16,
    convRule: rule17
  }, {
    start: 8544,
    length: 16,
    convRule: rule168
  }, {
    start: 8560,
    length: 16,
    convRule: rule169
  }, {
    start: 8576,
    length: 3,
    convRule: rule128
  }, {
    start: 8579,
    length: 1,
    convRule: rule22
  }, {
    start: 8580,
    length: 1,
    convRule: rule23
  }, {
    start: 8581,
    length: 4,
    convRule: rule128
  }, {
    start: 8585,
    length: 1,
    convRule: rule17
  }, {
    start: 8586,
    length: 2,
    convRule: rule13
  }, {
    start: 8592,
    length: 5,
    convRule: rule6
  }, {
    start: 8597,
    length: 5,
    convRule: rule13
  }, {
    start: 8602,
    length: 2,
    convRule: rule6
  }, {
    start: 8604,
    length: 4,
    convRule: rule13
  }, {
    start: 8608,
    length: 1,
    convRule: rule6
  }, {
    start: 8609,
    length: 2,
    convRule: rule13
  }, {
    start: 8611,
    length: 1,
    convRule: rule6
  }, {
    start: 8612,
    length: 2,
    convRule: rule13
  }, {
    start: 8614,
    length: 1,
    convRule: rule6
  }, {
    start: 8615,
    length: 7,
    convRule: rule13
  }, {
    start: 8622,
    length: 1,
    convRule: rule6
  }, {
    start: 8623,
    length: 31,
    convRule: rule13
  }, {
    start: 8654,
    length: 2,
    convRule: rule6
  }, {
    start: 8656,
    length: 2,
    convRule: rule13
  }, {
    start: 8658,
    length: 1,
    convRule: rule6
  }, {
    start: 8659,
    length: 1,
    convRule: rule13
  }, {
    start: 8660,
    length: 1,
    convRule: rule6
  }, {
    start: 8661,
    length: 31,
    convRule: rule13
  }, {
    start: 8692,
    length: 268,
    convRule: rule6
  }, {
    start: 8960,
    length: 8,
    convRule: rule13
  }, {
    start: 8968,
    length: 1,
    convRule: rule4
  }, {
    start: 8969,
    length: 1,
    convRule: rule5
  }, {
    start: 8970,
    length: 1,
    convRule: rule4
  }, {
    start: 8971,
    length: 1,
    convRule: rule5
  }, {
    start: 8972,
    length: 20,
    convRule: rule13
  }, {
    start: 8992,
    length: 2,
    convRule: rule6
  }, {
    start: 8994,
    length: 7,
    convRule: rule13
  }, {
    start: 9001,
    length: 1,
    convRule: rule4
  }, {
    start: 9002,
    length: 1,
    convRule: rule5
  }, {
    start: 9003,
    length: 81,
    convRule: rule13
  }, {
    start: 9084,
    length: 1,
    convRule: rule6
  }, {
    start: 9085,
    length: 30,
    convRule: rule13
  }, {
    start: 9115,
    length: 25,
    convRule: rule6
  }, {
    start: 9140,
    length: 40,
    convRule: rule13
  }, {
    start: 9180,
    length: 6,
    convRule: rule6
  }, {
    start: 9186,
    length: 69,
    convRule: rule13
  }, {
    start: 9280,
    length: 11,
    convRule: rule13
  }, {
    start: 9312,
    length: 60,
    convRule: rule17
  }, {
    start: 9372,
    length: 26,
    convRule: rule13
  }, {
    start: 9398,
    length: 26,
    convRule: rule170
  }, {
    start: 9424,
    length: 26,
    convRule: rule171
  }, {
    start: 9450,
    length: 22,
    convRule: rule17
  }, {
    start: 9472,
    length: 183,
    convRule: rule13
  }, {
    start: 9655,
    length: 1,
    convRule: rule6
  }, {
    start: 9656,
    length: 9,
    convRule: rule13
  }, {
    start: 9665,
    length: 1,
    convRule: rule6
  }, {
    start: 9666,
    length: 54,
    convRule: rule13
  }, {
    start: 9720,
    length: 8,
    convRule: rule6
  }, {
    start: 9728,
    length: 111,
    convRule: rule13
  }, {
    start: 9839,
    length: 1,
    convRule: rule6
  }, {
    start: 9840,
    length: 248,
    convRule: rule13
  }, {
    start: 10088,
    length: 1,
    convRule: rule4
  }, {
    start: 10089,
    length: 1,
    convRule: rule5
  }, {
    start: 10090,
    length: 1,
    convRule: rule4
  }, {
    start: 10091,
    length: 1,
    convRule: rule5
  }, {
    start: 10092,
    length: 1,
    convRule: rule4
  }, {
    start: 10093,
    length: 1,
    convRule: rule5
  }, {
    start: 10094,
    length: 1,
    convRule: rule4
  }, {
    start: 10095,
    length: 1,
    convRule: rule5
  }, {
    start: 10096,
    length: 1,
    convRule: rule4
  }, {
    start: 10097,
    length: 1,
    convRule: rule5
  }, {
    start: 10098,
    length: 1,
    convRule: rule4
  }, {
    start: 10099,
    length: 1,
    convRule: rule5
  }, {
    start: 10100,
    length: 1,
    convRule: rule4
  }, {
    start: 10101,
    length: 1,
    convRule: rule5
  }, {
    start: 10102,
    length: 30,
    convRule: rule17
  }, {
    start: 10132,
    length: 44,
    convRule: rule13
  }, {
    start: 10176,
    length: 5,
    convRule: rule6
  }, {
    start: 10181,
    length: 1,
    convRule: rule4
  }, {
    start: 10182,
    length: 1,
    convRule: rule5
  }, {
    start: 10183,
    length: 31,
    convRule: rule6
  }, {
    start: 10214,
    length: 1,
    convRule: rule4
  }, {
    start: 10215,
    length: 1,
    convRule: rule5
  }, {
    start: 10216,
    length: 1,
    convRule: rule4
  }, {
    start: 10217,
    length: 1,
    convRule: rule5
  }, {
    start: 10218,
    length: 1,
    convRule: rule4
  }, {
    start: 10219,
    length: 1,
    convRule: rule5
  }, {
    start: 10220,
    length: 1,
    convRule: rule4
  }, {
    start: 10221,
    length: 1,
    convRule: rule5
  }, {
    start: 10222,
    length: 1,
    convRule: rule4
  }, {
    start: 10223,
    length: 1,
    convRule: rule5
  }, {
    start: 10224,
    length: 16,
    convRule: rule6
  }, {
    start: 10240,
    length: 256,
    convRule: rule13
  }, {
    start: 10496,
    length: 131,
    convRule: rule6
  }, {
    start: 10627,
    length: 1,
    convRule: rule4
  }, {
    start: 10628,
    length: 1,
    convRule: rule5
  }, {
    start: 10629,
    length: 1,
    convRule: rule4
  }, {
    start: 10630,
    length: 1,
    convRule: rule5
  }, {
    start: 10631,
    length: 1,
    convRule: rule4
  }, {
    start: 10632,
    length: 1,
    convRule: rule5
  }, {
    start: 10633,
    length: 1,
    convRule: rule4
  }, {
    start: 10634,
    length: 1,
    convRule: rule5
  }, {
    start: 10635,
    length: 1,
    convRule: rule4
  }, {
    start: 10636,
    length: 1,
    convRule: rule5
  }, {
    start: 10637,
    length: 1,
    convRule: rule4
  }, {
    start: 10638,
    length: 1,
    convRule: rule5
  }, {
    start: 10639,
    length: 1,
    convRule: rule4
  }, {
    start: 10640,
    length: 1,
    convRule: rule5
  }, {
    start: 10641,
    length: 1,
    convRule: rule4
  }, {
    start: 10642,
    length: 1,
    convRule: rule5
  }, {
    start: 10643,
    length: 1,
    convRule: rule4
  }, {
    start: 10644,
    length: 1,
    convRule: rule5
  }, {
    start: 10645,
    length: 1,
    convRule: rule4
  }, {
    start: 10646,
    length: 1,
    convRule: rule5
  }, {
    start: 10647,
    length: 1,
    convRule: rule4
  }, {
    start: 10648,
    length: 1,
    convRule: rule5
  }, {
    start: 10649,
    length: 63,
    convRule: rule6
  }, {
    start: 10712,
    length: 1,
    convRule: rule4
  }, {
    start: 10713,
    length: 1,
    convRule: rule5
  }, {
    start: 10714,
    length: 1,
    convRule: rule4
  }, {
    start: 10715,
    length: 1,
    convRule: rule5
  }, {
    start: 10716,
    length: 32,
    convRule: rule6
  }, {
    start: 10748,
    length: 1,
    convRule: rule4
  }, {
    start: 10749,
    length: 1,
    convRule: rule5
  }, {
    start: 10750,
    length: 258,
    convRule: rule6
  }, {
    start: 11008,
    length: 48,
    convRule: rule13
  }, {
    start: 11056,
    length: 21,
    convRule: rule6
  }, {
    start: 11077,
    length: 2,
    convRule: rule13
  }, {
    start: 11079,
    length: 6,
    convRule: rule6
  }, {
    start: 11085,
    length: 39,
    convRule: rule13
  }, {
    start: 11126,
    length: 32,
    convRule: rule13
  }, {
    start: 11159,
    length: 105,
    convRule: rule13
  }, {
    start: 11264,
    length: 47,
    convRule: rule122
  }, {
    start: 11312,
    length: 47,
    convRule: rule123
  }, {
    start: 11360,
    length: 1,
    convRule: rule22
  }, {
    start: 11361,
    length: 1,
    convRule: rule23
  }, {
    start: 11362,
    length: 1,
    convRule: rule172
  }, {
    start: 11363,
    length: 1,
    convRule: rule173
  }, {
    start: 11364,
    length: 1,
    convRule: rule174
  }, {
    start: 11365,
    length: 1,
    convRule: rule175
  }, {
    start: 11366,
    length: 1,
    convRule: rule176
  }, {
    start: 11367,
    length: 1,
    convRule: rule22
  }, {
    start: 11368,
    length: 1,
    convRule: rule23
  }, {
    start: 11369,
    length: 1,
    convRule: rule22
  }, {
    start: 11370,
    length: 1,
    convRule: rule23
  }, {
    start: 11371,
    length: 1,
    convRule: rule22
  }, {
    start: 11372,
    length: 1,
    convRule: rule23
  }, {
    start: 11373,
    length: 1,
    convRule: rule177
  }, {
    start: 11374,
    length: 1,
    convRule: rule178
  }, {
    start: 11375,
    length: 1,
    convRule: rule179
  }, {
    start: 11376,
    length: 1,
    convRule: rule180
  }, {
    start: 11377,
    length: 1,
    convRule: rule20
  }, {
    start: 11378,
    length: 1,
    convRule: rule22
  }, {
    start: 11379,
    length: 1,
    convRule: rule23
  }, {
    start: 11380,
    length: 1,
    convRule: rule20
  }, {
    start: 11381,
    length: 1,
    convRule: rule22
  }, {
    start: 11382,
    length: 1,
    convRule: rule23
  }, {
    start: 11383,
    length: 5,
    convRule: rule20
  }, {
    start: 11388,
    length: 2,
    convRule: rule91
  }, {
    start: 11390,
    length: 2,
    convRule: rule181
  }, {
    start: 11392,
    length: 1,
    convRule: rule22
  }, {
    start: 11393,
    length: 1,
    convRule: rule23
  }, {
    start: 11394,
    length: 1,
    convRule: rule22
  }, {
    start: 11395,
    length: 1,
    convRule: rule23
  }, {
    start: 11396,
    length: 1,
    convRule: rule22
  }, {
    start: 11397,
    length: 1,
    convRule: rule23
  }, {
    start: 11398,
    length: 1,
    convRule: rule22
  }, {
    start: 11399,
    length: 1,
    convRule: rule23
  }, {
    start: 11400,
    length: 1,
    convRule: rule22
  }, {
    start: 11401,
    length: 1,
    convRule: rule23
  }, {
    start: 11402,
    length: 1,
    convRule: rule22
  }, {
    start: 11403,
    length: 1,
    convRule: rule23
  }, {
    start: 11404,
    length: 1,
    convRule: rule22
  }, {
    start: 11405,
    length: 1,
    convRule: rule23
  }, {
    start: 11406,
    length: 1,
    convRule: rule22
  }, {
    start: 11407,
    length: 1,
    convRule: rule23
  }, {
    start: 11408,
    length: 1,
    convRule: rule22
  }, {
    start: 11409,
    length: 1,
    convRule: rule23
  }, {
    start: 11410,
    length: 1,
    convRule: rule22
  }, {
    start: 11411,
    length: 1,
    convRule: rule23
  }, {
    start: 11412,
    length: 1,
    convRule: rule22
  }, {
    start: 11413,
    length: 1,
    convRule: rule23
  }, {
    start: 11414,
    length: 1,
    convRule: rule22
  }, {
    start: 11415,
    length: 1,
    convRule: rule23
  }, {
    start: 11416,
    length: 1,
    convRule: rule22
  }, {
    start: 11417,
    length: 1,
    convRule: rule23
  }, {
    start: 11418,
    length: 1,
    convRule: rule22
  }, {
    start: 11419,
    length: 1,
    convRule: rule23
  }, {
    start: 11420,
    length: 1,
    convRule: rule22
  }, {
    start: 11421,
    length: 1,
    convRule: rule23
  }, {
    start: 11422,
    length: 1,
    convRule: rule22
  }, {
    start: 11423,
    length: 1,
    convRule: rule23
  }, {
    start: 11424,
    length: 1,
    convRule: rule22
  }, {
    start: 11425,
    length: 1,
    convRule: rule23
  }, {
    start: 11426,
    length: 1,
    convRule: rule22
  }, {
    start: 11427,
    length: 1,
    convRule: rule23
  }, {
    start: 11428,
    length: 1,
    convRule: rule22
  }, {
    start: 11429,
    length: 1,
    convRule: rule23
  }, {
    start: 11430,
    length: 1,
    convRule: rule22
  }, {
    start: 11431,
    length: 1,
    convRule: rule23
  }, {
    start: 11432,
    length: 1,
    convRule: rule22
  }, {
    start: 11433,
    length: 1,
    convRule: rule23
  }, {
    start: 11434,
    length: 1,
    convRule: rule22
  }, {
    start: 11435,
    length: 1,
    convRule: rule23
  }, {
    start: 11436,
    length: 1,
    convRule: rule22
  }, {
    start: 11437,
    length: 1,
    convRule: rule23
  }, {
    start: 11438,
    length: 1,
    convRule: rule22
  }, {
    start: 11439,
    length: 1,
    convRule: rule23
  }, {
    start: 11440,
    length: 1,
    convRule: rule22
  }, {
    start: 11441,
    length: 1,
    convRule: rule23
  }, {
    start: 11442,
    length: 1,
    convRule: rule22
  }, {
    start: 11443,
    length: 1,
    convRule: rule23
  }, {
    start: 11444,
    length: 1,
    convRule: rule22
  }, {
    start: 11445,
    length: 1,
    convRule: rule23
  }, {
    start: 11446,
    length: 1,
    convRule: rule22
  }, {
    start: 11447,
    length: 1,
    convRule: rule23
  }, {
    start: 11448,
    length: 1,
    convRule: rule22
  }, {
    start: 11449,
    length: 1,
    convRule: rule23
  }, {
    start: 11450,
    length: 1,
    convRule: rule22
  }, {
    start: 11451,
    length: 1,
    convRule: rule23
  }, {
    start: 11452,
    length: 1,
    convRule: rule22
  }, {
    start: 11453,
    length: 1,
    convRule: rule23
  }, {
    start: 11454,
    length: 1,
    convRule: rule22
  }, {
    start: 11455,
    length: 1,
    convRule: rule23
  }, {
    start: 11456,
    length: 1,
    convRule: rule22
  }, {
    start: 11457,
    length: 1,
    convRule: rule23
  }, {
    start: 11458,
    length: 1,
    convRule: rule22
  }, {
    start: 11459,
    length: 1,
    convRule: rule23
  }, {
    start: 11460,
    length: 1,
    convRule: rule22
  }, {
    start: 11461,
    length: 1,
    convRule: rule23
  }, {
    start: 11462,
    length: 1,
    convRule: rule22
  }, {
    start: 11463,
    length: 1,
    convRule: rule23
  }, {
    start: 11464,
    length: 1,
    convRule: rule22
  }, {
    start: 11465,
    length: 1,
    convRule: rule23
  }, {
    start: 11466,
    length: 1,
    convRule: rule22
  }, {
    start: 11467,
    length: 1,
    convRule: rule23
  }, {
    start: 11468,
    length: 1,
    convRule: rule22
  }, {
    start: 11469,
    length: 1,
    convRule: rule23
  }, {
    start: 11470,
    length: 1,
    convRule: rule22
  }, {
    start: 11471,
    length: 1,
    convRule: rule23
  }, {
    start: 11472,
    length: 1,
    convRule: rule22
  }, {
    start: 11473,
    length: 1,
    convRule: rule23
  }, {
    start: 11474,
    length: 1,
    convRule: rule22
  }, {
    start: 11475,
    length: 1,
    convRule: rule23
  }, {
    start: 11476,
    length: 1,
    convRule: rule22
  }, {
    start: 11477,
    length: 1,
    convRule: rule23
  }, {
    start: 11478,
    length: 1,
    convRule: rule22
  }, {
    start: 11479,
    length: 1,
    convRule: rule23
  }, {
    start: 11480,
    length: 1,
    convRule: rule22
  }, {
    start: 11481,
    length: 1,
    convRule: rule23
  }, {
    start: 11482,
    length: 1,
    convRule: rule22
  }, {
    start: 11483,
    length: 1,
    convRule: rule23
  }, {
    start: 11484,
    length: 1,
    convRule: rule22
  }, {
    start: 11485,
    length: 1,
    convRule: rule23
  }, {
    start: 11486,
    length: 1,
    convRule: rule22
  }, {
    start: 11487,
    length: 1,
    convRule: rule23
  }, {
    start: 11488,
    length: 1,
    convRule: rule22
  }, {
    start: 11489,
    length: 1,
    convRule: rule23
  }, {
    start: 11490,
    length: 1,
    convRule: rule22
  }, {
    start: 11491,
    length: 1,
    convRule: rule23
  }, {
    start: 11492,
    length: 1,
    convRule: rule20
  }, {
    start: 11493,
    length: 6,
    convRule: rule13
  }, {
    start: 11499,
    length: 1,
    convRule: rule22
  }, {
    start: 11500,
    length: 1,
    convRule: rule23
  }, {
    start: 11501,
    length: 1,
    convRule: rule22
  }, {
    start: 11502,
    length: 1,
    convRule: rule23
  }, {
    start: 11503,
    length: 3,
    convRule: rule92
  }, {
    start: 11506,
    length: 1,
    convRule: rule22
  }, {
    start: 11507,
    length: 1,
    convRule: rule23
  }, {
    start: 11513,
    length: 4,
    convRule: rule2
  }, {
    start: 11517,
    length: 1,
    convRule: rule17
  }, {
    start: 11518,
    length: 2,
    convRule: rule2
  }, {
    start: 11520,
    length: 38,
    convRule: rule182
  }, {
    start: 11559,
    length: 1,
    convRule: rule182
  }, {
    start: 11565,
    length: 1,
    convRule: rule182
  }, {
    start: 11568,
    length: 56,
    convRule: rule14
  }, {
    start: 11631,
    length: 1,
    convRule: rule91
  }, {
    start: 11632,
    length: 1,
    convRule: rule2
  }, {
    start: 11647,
    length: 1,
    convRule: rule92
  }, {
    start: 11648,
    length: 23,
    convRule: rule14
  }, {
    start: 11680,
    length: 7,
    convRule: rule14
  }, {
    start: 11688,
    length: 7,
    convRule: rule14
  }, {
    start: 11696,
    length: 7,
    convRule: rule14
  }, {
    start: 11704,
    length: 7,
    convRule: rule14
  }, {
    start: 11712,
    length: 7,
    convRule: rule14
  }, {
    start: 11720,
    length: 7,
    convRule: rule14
  }, {
    start: 11728,
    length: 7,
    convRule: rule14
  }, {
    start: 11736,
    length: 7,
    convRule: rule14
  }, {
    start: 11744,
    length: 32,
    convRule: rule92
  }, {
    start: 11776,
    length: 2,
    convRule: rule2
  }, {
    start: 11778,
    length: 1,
    convRule: rule15
  }, {
    start: 11779,
    length: 1,
    convRule: rule19
  }, {
    start: 11780,
    length: 1,
    convRule: rule15
  }, {
    start: 11781,
    length: 1,
    convRule: rule19
  }, {
    start: 11782,
    length: 3,
    convRule: rule2
  }, {
    start: 11785,
    length: 1,
    convRule: rule15
  }, {
    start: 11786,
    length: 1,
    convRule: rule19
  }, {
    start: 11787,
    length: 1,
    convRule: rule2
  }, {
    start: 11788,
    length: 1,
    convRule: rule15
  }, {
    start: 11789,
    length: 1,
    convRule: rule19
  }, {
    start: 11790,
    length: 9,
    convRule: rule2
  }, {
    start: 11799,
    length: 1,
    convRule: rule7
  }, {
    start: 11800,
    length: 2,
    convRule: rule2
  }, {
    start: 11802,
    length: 1,
    convRule: rule7
  }, {
    start: 11803,
    length: 1,
    convRule: rule2
  }, {
    start: 11804,
    length: 1,
    convRule: rule15
  }, {
    start: 11805,
    length: 1,
    convRule: rule19
  }, {
    start: 11806,
    length: 2,
    convRule: rule2
  }, {
    start: 11808,
    length: 1,
    convRule: rule15
  }, {
    start: 11809,
    length: 1,
    convRule: rule19
  }, {
    start: 11810,
    length: 1,
    convRule: rule4
  }, {
    start: 11811,
    length: 1,
    convRule: rule5
  }, {
    start: 11812,
    length: 1,
    convRule: rule4
  }, {
    start: 11813,
    length: 1,
    convRule: rule5
  }, {
    start: 11814,
    length: 1,
    convRule: rule4
  }, {
    start: 11815,
    length: 1,
    convRule: rule5
  }, {
    start: 11816,
    length: 1,
    convRule: rule4
  }, {
    start: 11817,
    length: 1,
    convRule: rule5
  }, {
    start: 11818,
    length: 5,
    convRule: rule2
  }, {
    start: 11823,
    length: 1,
    convRule: rule91
  }, {
    start: 11824,
    length: 10,
    convRule: rule2
  }, {
    start: 11834,
    length: 2,
    convRule: rule7
  }, {
    start: 11836,
    length: 4,
    convRule: rule2
  }, {
    start: 11840,
    length: 1,
    convRule: rule7
  }, {
    start: 11841,
    length: 1,
    convRule: rule2
  }, {
    start: 11842,
    length: 1,
    convRule: rule4
  }, {
    start: 11843,
    length: 13,
    convRule: rule2
  }, {
    start: 11856,
    length: 2,
    convRule: rule13
  }, {
    start: 11858,
    length: 1,
    convRule: rule2
  }, {
    start: 11904,
    length: 26,
    convRule: rule13
  }, {
    start: 11931,
    length: 89,
    convRule: rule13
  }, {
    start: 12032,
    length: 214,
    convRule: rule13
  }, {
    start: 12272,
    length: 12,
    convRule: rule13
  }, {
    start: 12288,
    length: 1,
    convRule: rule1
  }, {
    start: 12289,
    length: 3,
    convRule: rule2
  }, {
    start: 12292,
    length: 1,
    convRule: rule13
  }, {
    start: 12293,
    length: 1,
    convRule: rule91
  }, {
    start: 12294,
    length: 1,
    convRule: rule14
  }, {
    start: 12295,
    length: 1,
    convRule: rule128
  }, {
    start: 12296,
    length: 1,
    convRule: rule4
  }, {
    start: 12297,
    length: 1,
    convRule: rule5
  }, {
    start: 12298,
    length: 1,
    convRule: rule4
  }, {
    start: 12299,
    length: 1,
    convRule: rule5
  }, {
    start: 12300,
    length: 1,
    convRule: rule4
  }, {
    start: 12301,
    length: 1,
    convRule: rule5
  }, {
    start: 12302,
    length: 1,
    convRule: rule4
  }, {
    start: 12303,
    length: 1,
    convRule: rule5
  }, {
    start: 12304,
    length: 1,
    convRule: rule4
  }, {
    start: 12305,
    length: 1,
    convRule: rule5
  }, {
    start: 12306,
    length: 2,
    convRule: rule13
  }, {
    start: 12308,
    length: 1,
    convRule: rule4
  }, {
    start: 12309,
    length: 1,
    convRule: rule5
  }, {
    start: 12310,
    length: 1,
    convRule: rule4
  }, {
    start: 12311,
    length: 1,
    convRule: rule5
  }, {
    start: 12312,
    length: 1,
    convRule: rule4
  }, {
    start: 12313,
    length: 1,
    convRule: rule5
  }, {
    start: 12314,
    length: 1,
    convRule: rule4
  }, {
    start: 12315,
    length: 1,
    convRule: rule5
  }, {
    start: 12316,
    length: 1,
    convRule: rule7
  }, {
    start: 12317,
    length: 1,
    convRule: rule4
  }, {
    start: 12318,
    length: 2,
    convRule: rule5
  }, {
    start: 12320,
    length: 1,
    convRule: rule13
  }, {
    start: 12321,
    length: 9,
    convRule: rule128
  }, {
    start: 12330,
    length: 4,
    convRule: rule92
  }, {
    start: 12334,
    length: 2,
    convRule: rule124
  }, {
    start: 12336,
    length: 1,
    convRule: rule7
  }, {
    start: 12337,
    length: 5,
    convRule: rule91
  }, {
    start: 12342,
    length: 2,
    convRule: rule13
  }, {
    start: 12344,
    length: 3,
    convRule: rule128
  }, {
    start: 12347,
    length: 1,
    convRule: rule91
  }, {
    start: 12348,
    length: 1,
    convRule: rule14
  }, {
    start: 12349,
    length: 1,
    convRule: rule2
  }, {
    start: 12350,
    length: 2,
    convRule: rule13
  }, {
    start: 12353,
    length: 86,
    convRule: rule14
  }, {
    start: 12441,
    length: 2,
    convRule: rule92
  }, {
    start: 12443,
    length: 2,
    convRule: rule10
  }, {
    start: 12445,
    length: 2,
    convRule: rule91
  }, {
    start: 12447,
    length: 1,
    convRule: rule14
  }, {
    start: 12448,
    length: 1,
    convRule: rule7
  }, {
    start: 12449,
    length: 90,
    convRule: rule14
  }, {
    start: 12539,
    length: 1,
    convRule: rule2
  }, {
    start: 12540,
    length: 3,
    convRule: rule91
  }, {
    start: 12543,
    length: 1,
    convRule: rule14
  }, {
    start: 12549,
    length: 43,
    convRule: rule14
  }, {
    start: 12593,
    length: 94,
    convRule: rule14
  }, {
    start: 12688,
    length: 2,
    convRule: rule13
  }, {
    start: 12690,
    length: 4,
    convRule: rule17
  }, {
    start: 12694,
    length: 10,
    convRule: rule13
  }, {
    start: 12704,
    length: 32,
    convRule: rule14
  }, {
    start: 12736,
    length: 36,
    convRule: rule13
  }, {
    start: 12784,
    length: 16,
    convRule: rule14
  }, {
    start: 12800,
    length: 31,
    convRule: rule13
  }, {
    start: 12832,
    length: 10,
    convRule: rule17
  }, {
    start: 12842,
    length: 30,
    convRule: rule13
  }, {
    start: 12872,
    length: 8,
    convRule: rule17
  }, {
    start: 12880,
    length: 1,
    convRule: rule13
  }, {
    start: 12881,
    length: 15,
    convRule: rule17
  }, {
    start: 12896,
    length: 32,
    convRule: rule13
  }, {
    start: 12928,
    length: 10,
    convRule: rule17
  }, {
    start: 12938,
    length: 39,
    convRule: rule13
  }, {
    start: 12977,
    length: 15,
    convRule: rule17
  }, {
    start: 12992,
    length: 320,
    convRule: rule13
  }, {
    start: 13312,
    length: 6592,
    convRule: rule14
  }, {
    start: 19904,
    length: 64,
    convRule: rule13
  }, {
    start: 19968,
    length: 20989,
    convRule: rule14
  }, {
    start: 40960,
    length: 21,
    convRule: rule14
  }, {
    start: 40981,
    length: 1,
    convRule: rule91
  }, {
    start: 40982,
    length: 1143,
    convRule: rule14
  }, {
    start: 42128,
    length: 55,
    convRule: rule13
  }, {
    start: 42192,
    length: 40,
    convRule: rule14
  }, {
    start: 42232,
    length: 6,
    convRule: rule91
  }, {
    start: 42238,
    length: 2,
    convRule: rule2
  }, {
    start: 42240,
    length: 268,
    convRule: rule14
  }, {
    start: 42508,
    length: 1,
    convRule: rule91
  }, {
    start: 42509,
    length: 3,
    convRule: rule2
  }, {
    start: 42512,
    length: 16,
    convRule: rule14
  }, {
    start: 42528,
    length: 10,
    convRule: rule8
  }, {
    start: 42538,
    length: 2,
    convRule: rule14
  }, {
    start: 42560,
    length: 1,
    convRule: rule22
  }, {
    start: 42561,
    length: 1,
    convRule: rule23
  }, {
    start: 42562,
    length: 1,
    convRule: rule22
  }, {
    start: 42563,
    length: 1,
    convRule: rule23
  }, {
    start: 42564,
    length: 1,
    convRule: rule22
  }, {
    start: 42565,
    length: 1,
    convRule: rule23
  }, {
    start: 42566,
    length: 1,
    convRule: rule22
  }, {
    start: 42567,
    length: 1,
    convRule: rule23
  }, {
    start: 42568,
    length: 1,
    convRule: rule22
  }, {
    start: 42569,
    length: 1,
    convRule: rule23
  }, {
    start: 42570,
    length: 1,
    convRule: rule22
  }, {
    start: 42571,
    length: 1,
    convRule: rule23
  }, {
    start: 42572,
    length: 1,
    convRule: rule22
  }, {
    start: 42573,
    length: 1,
    convRule: rule23
  }, {
    start: 42574,
    length: 1,
    convRule: rule22
  }, {
    start: 42575,
    length: 1,
    convRule: rule23
  }, {
    start: 42576,
    length: 1,
    convRule: rule22
  }, {
    start: 42577,
    length: 1,
    convRule: rule23
  }, {
    start: 42578,
    length: 1,
    convRule: rule22
  }, {
    start: 42579,
    length: 1,
    convRule: rule23
  }, {
    start: 42580,
    length: 1,
    convRule: rule22
  }, {
    start: 42581,
    length: 1,
    convRule: rule23
  }, {
    start: 42582,
    length: 1,
    convRule: rule22
  }, {
    start: 42583,
    length: 1,
    convRule: rule23
  }, {
    start: 42584,
    length: 1,
    convRule: rule22
  }, {
    start: 42585,
    length: 1,
    convRule: rule23
  }, {
    start: 42586,
    length: 1,
    convRule: rule22
  }, {
    start: 42587,
    length: 1,
    convRule: rule23
  }, {
    start: 42588,
    length: 1,
    convRule: rule22
  }, {
    start: 42589,
    length: 1,
    convRule: rule23
  }, {
    start: 42590,
    length: 1,
    convRule: rule22
  }, {
    start: 42591,
    length: 1,
    convRule: rule23
  }, {
    start: 42592,
    length: 1,
    convRule: rule22
  }, {
    start: 42593,
    length: 1,
    convRule: rule23
  }, {
    start: 42594,
    length: 1,
    convRule: rule22
  }, {
    start: 42595,
    length: 1,
    convRule: rule23
  }, {
    start: 42596,
    length: 1,
    convRule: rule22
  }, {
    start: 42597,
    length: 1,
    convRule: rule23
  }, {
    start: 42598,
    length: 1,
    convRule: rule22
  }, {
    start: 42599,
    length: 1,
    convRule: rule23
  }, {
    start: 42600,
    length: 1,
    convRule: rule22
  }, {
    start: 42601,
    length: 1,
    convRule: rule23
  }, {
    start: 42602,
    length: 1,
    convRule: rule22
  }, {
    start: 42603,
    length: 1,
    convRule: rule23
  }, {
    start: 42604,
    length: 1,
    convRule: rule22
  }, {
    start: 42605,
    length: 1,
    convRule: rule23
  }, {
    start: 42606,
    length: 1,
    convRule: rule14
  }, {
    start: 42607,
    length: 1,
    convRule: rule92
  }, {
    start: 42608,
    length: 3,
    convRule: rule119
  }, {
    start: 42611,
    length: 1,
    convRule: rule2
  }, {
    start: 42612,
    length: 10,
    convRule: rule92
  }, {
    start: 42622,
    length: 1,
    convRule: rule2
  }, {
    start: 42623,
    length: 1,
    convRule: rule91
  }, {
    start: 42624,
    length: 1,
    convRule: rule22
  }, {
    start: 42625,
    length: 1,
    convRule: rule23
  }, {
    start: 42626,
    length: 1,
    convRule: rule22
  }, {
    start: 42627,
    length: 1,
    convRule: rule23
  }, {
    start: 42628,
    length: 1,
    convRule: rule22
  }, {
    start: 42629,
    length: 1,
    convRule: rule23
  }, {
    start: 42630,
    length: 1,
    convRule: rule22
  }, {
    start: 42631,
    length: 1,
    convRule: rule23
  }, {
    start: 42632,
    length: 1,
    convRule: rule22
  }, {
    start: 42633,
    length: 1,
    convRule: rule23
  }, {
    start: 42634,
    length: 1,
    convRule: rule22
  }, {
    start: 42635,
    length: 1,
    convRule: rule23
  }, {
    start: 42636,
    length: 1,
    convRule: rule22
  }, {
    start: 42637,
    length: 1,
    convRule: rule23
  }, {
    start: 42638,
    length: 1,
    convRule: rule22
  }, {
    start: 42639,
    length: 1,
    convRule: rule23
  }, {
    start: 42640,
    length: 1,
    convRule: rule22
  }, {
    start: 42641,
    length: 1,
    convRule: rule23
  }, {
    start: 42642,
    length: 1,
    convRule: rule22
  }, {
    start: 42643,
    length: 1,
    convRule: rule23
  }, {
    start: 42644,
    length: 1,
    convRule: rule22
  }, {
    start: 42645,
    length: 1,
    convRule: rule23
  }, {
    start: 42646,
    length: 1,
    convRule: rule22
  }, {
    start: 42647,
    length: 1,
    convRule: rule23
  }, {
    start: 42648,
    length: 1,
    convRule: rule22
  }, {
    start: 42649,
    length: 1,
    convRule: rule23
  }, {
    start: 42650,
    length: 1,
    convRule: rule22
  }, {
    start: 42651,
    length: 1,
    convRule: rule23
  }, {
    start: 42652,
    length: 2,
    convRule: rule91
  }, {
    start: 42654,
    length: 2,
    convRule: rule92
  }, {
    start: 42656,
    length: 70,
    convRule: rule14
  }, {
    start: 42726,
    length: 10,
    convRule: rule128
  }, {
    start: 42736,
    length: 2,
    convRule: rule92
  }, {
    start: 42738,
    length: 6,
    convRule: rule2
  }, {
    start: 42752,
    length: 23,
    convRule: rule10
  }, {
    start: 42775,
    length: 9,
    convRule: rule91
  }, {
    start: 42784,
    length: 2,
    convRule: rule10
  }, {
    start: 42786,
    length: 1,
    convRule: rule22
  }, {
    start: 42787,
    length: 1,
    convRule: rule23
  }, {
    start: 42788,
    length: 1,
    convRule: rule22
  }, {
    start: 42789,
    length: 1,
    convRule: rule23
  }, {
    start: 42790,
    length: 1,
    convRule: rule22
  }, {
    start: 42791,
    length: 1,
    convRule: rule23
  }, {
    start: 42792,
    length: 1,
    convRule: rule22
  }, {
    start: 42793,
    length: 1,
    convRule: rule23
  }, {
    start: 42794,
    length: 1,
    convRule: rule22
  }, {
    start: 42795,
    length: 1,
    convRule: rule23
  }, {
    start: 42796,
    length: 1,
    convRule: rule22
  }, {
    start: 42797,
    length: 1,
    convRule: rule23
  }, {
    start: 42798,
    length: 1,
    convRule: rule22
  }, {
    start: 42799,
    length: 1,
    convRule: rule23
  }, {
    start: 42800,
    length: 2,
    convRule: rule20
  }, {
    start: 42802,
    length: 1,
    convRule: rule22
  }, {
    start: 42803,
    length: 1,
    convRule: rule23
  }, {
    start: 42804,
    length: 1,
    convRule: rule22
  }, {
    start: 42805,
    length: 1,
    convRule: rule23
  }, {
    start: 42806,
    length: 1,
    convRule: rule22
  }, {
    start: 42807,
    length: 1,
    convRule: rule23
  }, {
    start: 42808,
    length: 1,
    convRule: rule22
  }, {
    start: 42809,
    length: 1,
    convRule: rule23
  }, {
    start: 42810,
    length: 1,
    convRule: rule22
  }, {
    start: 42811,
    length: 1,
    convRule: rule23
  }, {
    start: 42812,
    length: 1,
    convRule: rule22
  }, {
    start: 42813,
    length: 1,
    convRule: rule23
  }, {
    start: 42814,
    length: 1,
    convRule: rule22
  }, {
    start: 42815,
    length: 1,
    convRule: rule23
  }, {
    start: 42816,
    length: 1,
    convRule: rule22
  }, {
    start: 42817,
    length: 1,
    convRule: rule23
  }, {
    start: 42818,
    length: 1,
    convRule: rule22
  }, {
    start: 42819,
    length: 1,
    convRule: rule23
  }, {
    start: 42820,
    length: 1,
    convRule: rule22
  }, {
    start: 42821,
    length: 1,
    convRule: rule23
  }, {
    start: 42822,
    length: 1,
    convRule: rule22
  }, {
    start: 42823,
    length: 1,
    convRule: rule23
  }, {
    start: 42824,
    length: 1,
    convRule: rule22
  }, {
    start: 42825,
    length: 1,
    convRule: rule23
  }, {
    start: 42826,
    length: 1,
    convRule: rule22
  }, {
    start: 42827,
    length: 1,
    convRule: rule23
  }, {
    start: 42828,
    length: 1,
    convRule: rule22
  }, {
    start: 42829,
    length: 1,
    convRule: rule23
  }, {
    start: 42830,
    length: 1,
    convRule: rule22
  }, {
    start: 42831,
    length: 1,
    convRule: rule23
  }, {
    start: 42832,
    length: 1,
    convRule: rule22
  }, {
    start: 42833,
    length: 1,
    convRule: rule23
  }, {
    start: 42834,
    length: 1,
    convRule: rule22
  }, {
    start: 42835,
    length: 1,
    convRule: rule23
  }, {
    start: 42836,
    length: 1,
    convRule: rule22
  }, {
    start: 42837,
    length: 1,
    convRule: rule23
  }, {
    start: 42838,
    length: 1,
    convRule: rule22
  }, {
    start: 42839,
    length: 1,
    convRule: rule23
  }, {
    start: 42840,
    length: 1,
    convRule: rule22
  }, {
    start: 42841,
    length: 1,
    convRule: rule23
  }, {
    start: 42842,
    length: 1,
    convRule: rule22
  }, {
    start: 42843,
    length: 1,
    convRule: rule23
  }, {
    start: 42844,
    length: 1,
    convRule: rule22
  }, {
    start: 42845,
    length: 1,
    convRule: rule23
  }, {
    start: 42846,
    length: 1,
    convRule: rule22
  }, {
    start: 42847,
    length: 1,
    convRule: rule23
  }, {
    start: 42848,
    length: 1,
    convRule: rule22
  }, {
    start: 42849,
    length: 1,
    convRule: rule23
  }, {
    start: 42850,
    length: 1,
    convRule: rule22
  }, {
    start: 42851,
    length: 1,
    convRule: rule23
  }, {
    start: 42852,
    length: 1,
    convRule: rule22
  }, {
    start: 42853,
    length: 1,
    convRule: rule23
  }, {
    start: 42854,
    length: 1,
    convRule: rule22
  }, {
    start: 42855,
    length: 1,
    convRule: rule23
  }, {
    start: 42856,
    length: 1,
    convRule: rule22
  }, {
    start: 42857,
    length: 1,
    convRule: rule23
  }, {
    start: 42858,
    length: 1,
    convRule: rule22
  }, {
    start: 42859,
    length: 1,
    convRule: rule23
  }, {
    start: 42860,
    length: 1,
    convRule: rule22
  }, {
    start: 42861,
    length: 1,
    convRule: rule23
  }, {
    start: 42862,
    length: 1,
    convRule: rule22
  }, {
    start: 42863,
    length: 1,
    convRule: rule23
  }, {
    start: 42864,
    length: 1,
    convRule: rule91
  }, {
    start: 42865,
    length: 8,
    convRule: rule20
  }, {
    start: 42873,
    length: 1,
    convRule: rule22
  }, {
    start: 42874,
    length: 1,
    convRule: rule23
  }, {
    start: 42875,
    length: 1,
    convRule: rule22
  }, {
    start: 42876,
    length: 1,
    convRule: rule23
  }, {
    start: 42877,
    length: 1,
    convRule: rule183
  }, {
    start: 42878,
    length: 1,
    convRule: rule22
  }, {
    start: 42879,
    length: 1,
    convRule: rule23
  }, {
    start: 42880,
    length: 1,
    convRule: rule22
  }, {
    start: 42881,
    length: 1,
    convRule: rule23
  }, {
    start: 42882,
    length: 1,
    convRule: rule22
  }, {
    start: 42883,
    length: 1,
    convRule: rule23
  }, {
    start: 42884,
    length: 1,
    convRule: rule22
  }, {
    start: 42885,
    length: 1,
    convRule: rule23
  }, {
    start: 42886,
    length: 1,
    convRule: rule22
  }, {
    start: 42887,
    length: 1,
    convRule: rule23
  }, {
    start: 42888,
    length: 1,
    convRule: rule91
  }, {
    start: 42889,
    length: 2,
    convRule: rule10
  }, {
    start: 42891,
    length: 1,
    convRule: rule22
  }, {
    start: 42892,
    length: 1,
    convRule: rule23
  }, {
    start: 42893,
    length: 1,
    convRule: rule184
  }, {
    start: 42894,
    length: 1,
    convRule: rule20
  }, {
    start: 42895,
    length: 1,
    convRule: rule14
  }, {
    start: 42896,
    length: 1,
    convRule: rule22
  }, {
    start: 42897,
    length: 1,
    convRule: rule23
  }, {
    start: 42898,
    length: 1,
    convRule: rule22
  }, {
    start: 42899,
    length: 1,
    convRule: rule23
  }, {
    start: 42900,
    length: 1,
    convRule: rule185
  }, {
    start: 42901,
    length: 1,
    convRule: rule20
  }, {
    start: 42902,
    length: 1,
    convRule: rule22
  }, {
    start: 42903,
    length: 1,
    convRule: rule23
  }, {
    start: 42904,
    length: 1,
    convRule: rule22
  }, {
    start: 42905,
    length: 1,
    convRule: rule23
  }, {
    start: 42906,
    length: 1,
    convRule: rule22
  }, {
    start: 42907,
    length: 1,
    convRule: rule23
  }, {
    start: 42908,
    length: 1,
    convRule: rule22
  }, {
    start: 42909,
    length: 1,
    convRule: rule23
  }, {
    start: 42910,
    length: 1,
    convRule: rule22
  }, {
    start: 42911,
    length: 1,
    convRule: rule23
  }, {
    start: 42912,
    length: 1,
    convRule: rule22
  }, {
    start: 42913,
    length: 1,
    convRule: rule23
  }, {
    start: 42914,
    length: 1,
    convRule: rule22
  }, {
    start: 42915,
    length: 1,
    convRule: rule23
  }, {
    start: 42916,
    length: 1,
    convRule: rule22
  }, {
    start: 42917,
    length: 1,
    convRule: rule23
  }, {
    start: 42918,
    length: 1,
    convRule: rule22
  }, {
    start: 42919,
    length: 1,
    convRule: rule23
  }, {
    start: 42920,
    length: 1,
    convRule: rule22
  }, {
    start: 42921,
    length: 1,
    convRule: rule23
  }, {
    start: 42922,
    length: 1,
    convRule: rule186
  }, {
    start: 42923,
    length: 1,
    convRule: rule187
  }, {
    start: 42924,
    length: 1,
    convRule: rule188
  }, {
    start: 42925,
    length: 1,
    convRule: rule189
  }, {
    start: 42926,
    length: 1,
    convRule: rule186
  }, {
    start: 42927,
    length: 1,
    convRule: rule20
  }, {
    start: 42928,
    length: 1,
    convRule: rule190
  }, {
    start: 42929,
    length: 1,
    convRule: rule191
  }, {
    start: 42930,
    length: 1,
    convRule: rule192
  }, {
    start: 42931,
    length: 1,
    convRule: rule193
  }, {
    start: 42932,
    length: 1,
    convRule: rule22
  }, {
    start: 42933,
    length: 1,
    convRule: rule23
  }, {
    start: 42934,
    length: 1,
    convRule: rule22
  }, {
    start: 42935,
    length: 1,
    convRule: rule23
  }, {
    start: 42936,
    length: 1,
    convRule: rule22
  }, {
    start: 42937,
    length: 1,
    convRule: rule23
  }, {
    start: 42938,
    length: 1,
    convRule: rule22
  }, {
    start: 42939,
    length: 1,
    convRule: rule23
  }, {
    start: 42940,
    length: 1,
    convRule: rule22
  }, {
    start: 42941,
    length: 1,
    convRule: rule23
  }, {
    start: 42942,
    length: 1,
    convRule: rule22
  }, {
    start: 42943,
    length: 1,
    convRule: rule23
  }, {
    start: 42946,
    length: 1,
    convRule: rule22
  }, {
    start: 42947,
    length: 1,
    convRule: rule23
  }, {
    start: 42948,
    length: 1,
    convRule: rule194
  }, {
    start: 42949,
    length: 1,
    convRule: rule195
  }, {
    start: 42950,
    length: 1,
    convRule: rule196
  }, {
    start: 42951,
    length: 1,
    convRule: rule22
  }, {
    start: 42952,
    length: 1,
    convRule: rule23
  }, {
    start: 42953,
    length: 1,
    convRule: rule22
  }, {
    start: 42954,
    length: 1,
    convRule: rule23
  }, {
    start: 42997,
    length: 1,
    convRule: rule22
  }, {
    start: 42998,
    length: 1,
    convRule: rule23
  }, {
    start: 42999,
    length: 1,
    convRule: rule14
  }, {
    start: 43e3,
    length: 2,
    convRule: rule91
  }, {
    start: 43002,
    length: 1,
    convRule: rule20
  }, {
    start: 43003,
    length: 7,
    convRule: rule14
  }, {
    start: 43010,
    length: 1,
    convRule: rule92
  }, {
    start: 43011,
    length: 3,
    convRule: rule14
  }, {
    start: 43014,
    length: 1,
    convRule: rule92
  }, {
    start: 43015,
    length: 4,
    convRule: rule14
  }, {
    start: 43019,
    length: 1,
    convRule: rule92
  }, {
    start: 43020,
    length: 23,
    convRule: rule14
  }, {
    start: 43043,
    length: 2,
    convRule: rule124
  }, {
    start: 43045,
    length: 2,
    convRule: rule92
  }, {
    start: 43047,
    length: 1,
    convRule: rule124
  }, {
    start: 43048,
    length: 4,
    convRule: rule13
  }, {
    start: 43052,
    length: 1,
    convRule: rule92
  }, {
    start: 43056,
    length: 6,
    convRule: rule17
  }, {
    start: 43062,
    length: 2,
    convRule: rule13
  }, {
    start: 43064,
    length: 1,
    convRule: rule3
  }, {
    start: 43065,
    length: 1,
    convRule: rule13
  }, {
    start: 43072,
    length: 52,
    convRule: rule14
  }, {
    start: 43124,
    length: 4,
    convRule: rule2
  }, {
    start: 43136,
    length: 2,
    convRule: rule124
  }, {
    start: 43138,
    length: 50,
    convRule: rule14
  }, {
    start: 43188,
    length: 16,
    convRule: rule124
  }, {
    start: 43204,
    length: 2,
    convRule: rule92
  }, {
    start: 43214,
    length: 2,
    convRule: rule2
  }, {
    start: 43216,
    length: 10,
    convRule: rule8
  }, {
    start: 43232,
    length: 18,
    convRule: rule92
  }, {
    start: 43250,
    length: 6,
    convRule: rule14
  }, {
    start: 43256,
    length: 3,
    convRule: rule2
  }, {
    start: 43259,
    length: 1,
    convRule: rule14
  }, {
    start: 43260,
    length: 1,
    convRule: rule2
  }, {
    start: 43261,
    length: 2,
    convRule: rule14
  }, {
    start: 43263,
    length: 1,
    convRule: rule92
  }, {
    start: 43264,
    length: 10,
    convRule: rule8
  }, {
    start: 43274,
    length: 28,
    convRule: rule14
  }, {
    start: 43302,
    length: 8,
    convRule: rule92
  }, {
    start: 43310,
    length: 2,
    convRule: rule2
  }, {
    start: 43312,
    length: 23,
    convRule: rule14
  }, {
    start: 43335,
    length: 11,
    convRule: rule92
  }, {
    start: 43346,
    length: 2,
    convRule: rule124
  }, {
    start: 43359,
    length: 1,
    convRule: rule2
  }, {
    start: 43360,
    length: 29,
    convRule: rule14
  }, {
    start: 43392,
    length: 3,
    convRule: rule92
  }, {
    start: 43395,
    length: 1,
    convRule: rule124
  }, {
    start: 43396,
    length: 47,
    convRule: rule14
  }, {
    start: 43443,
    length: 1,
    convRule: rule92
  }, {
    start: 43444,
    length: 2,
    convRule: rule124
  }, {
    start: 43446,
    length: 4,
    convRule: rule92
  }, {
    start: 43450,
    length: 2,
    convRule: rule124
  }, {
    start: 43452,
    length: 2,
    convRule: rule92
  }, {
    start: 43454,
    length: 3,
    convRule: rule124
  }, {
    start: 43457,
    length: 13,
    convRule: rule2
  }, {
    start: 43471,
    length: 1,
    convRule: rule91
  }, {
    start: 43472,
    length: 10,
    convRule: rule8
  }, {
    start: 43486,
    length: 2,
    convRule: rule2
  }, {
    start: 43488,
    length: 5,
    convRule: rule14
  }, {
    start: 43493,
    length: 1,
    convRule: rule92
  }, {
    start: 43494,
    length: 1,
    convRule: rule91
  }, {
    start: 43495,
    length: 9,
    convRule: rule14
  }, {
    start: 43504,
    length: 10,
    convRule: rule8
  }, {
    start: 43514,
    length: 5,
    convRule: rule14
  }, {
    start: 43520,
    length: 41,
    convRule: rule14
  }, {
    start: 43561,
    length: 6,
    convRule: rule92
  }, {
    start: 43567,
    length: 2,
    convRule: rule124
  }, {
    start: 43569,
    length: 2,
    convRule: rule92
  }, {
    start: 43571,
    length: 2,
    convRule: rule124
  }, {
    start: 43573,
    length: 2,
    convRule: rule92
  }, {
    start: 43584,
    length: 3,
    convRule: rule14
  }, {
    start: 43587,
    length: 1,
    convRule: rule92
  }, {
    start: 43588,
    length: 8,
    convRule: rule14
  }, {
    start: 43596,
    length: 1,
    convRule: rule92
  }, {
    start: 43597,
    length: 1,
    convRule: rule124
  }, {
    start: 43600,
    length: 10,
    convRule: rule8
  }, {
    start: 43612,
    length: 4,
    convRule: rule2
  }, {
    start: 43616,
    length: 16,
    convRule: rule14
  }, {
    start: 43632,
    length: 1,
    convRule: rule91
  }, {
    start: 43633,
    length: 6,
    convRule: rule14
  }, {
    start: 43639,
    length: 3,
    convRule: rule13
  }, {
    start: 43642,
    length: 1,
    convRule: rule14
  }, {
    start: 43643,
    length: 1,
    convRule: rule124
  }, {
    start: 43644,
    length: 1,
    convRule: rule92
  }, {
    start: 43645,
    length: 1,
    convRule: rule124
  }, {
    start: 43646,
    length: 50,
    convRule: rule14
  }, {
    start: 43696,
    length: 1,
    convRule: rule92
  }, {
    start: 43697,
    length: 1,
    convRule: rule14
  }, {
    start: 43698,
    length: 3,
    convRule: rule92
  }, {
    start: 43701,
    length: 2,
    convRule: rule14
  }, {
    start: 43703,
    length: 2,
    convRule: rule92
  }, {
    start: 43705,
    length: 5,
    convRule: rule14
  }, {
    start: 43710,
    length: 2,
    convRule: rule92
  }, {
    start: 43712,
    length: 1,
    convRule: rule14
  }, {
    start: 43713,
    length: 1,
    convRule: rule92
  }, {
    start: 43714,
    length: 1,
    convRule: rule14
  }, {
    start: 43739,
    length: 2,
    convRule: rule14
  }, {
    start: 43741,
    length: 1,
    convRule: rule91
  }, {
    start: 43742,
    length: 2,
    convRule: rule2
  }, {
    start: 43744,
    length: 11,
    convRule: rule14
  }, {
    start: 43755,
    length: 1,
    convRule: rule124
  }, {
    start: 43756,
    length: 2,
    convRule: rule92
  }, {
    start: 43758,
    length: 2,
    convRule: rule124
  }, {
    start: 43760,
    length: 2,
    convRule: rule2
  }, {
    start: 43762,
    length: 1,
    convRule: rule14
  }, {
    start: 43763,
    length: 2,
    convRule: rule91
  }, {
    start: 43765,
    length: 1,
    convRule: rule124
  }, {
    start: 43766,
    length: 1,
    convRule: rule92
  }, {
    start: 43777,
    length: 6,
    convRule: rule14
  }, {
    start: 43785,
    length: 6,
    convRule: rule14
  }, {
    start: 43793,
    length: 6,
    convRule: rule14
  }, {
    start: 43808,
    length: 7,
    convRule: rule14
  }, {
    start: 43816,
    length: 7,
    convRule: rule14
  }, {
    start: 43824,
    length: 35,
    convRule: rule20
  }, {
    start: 43859,
    length: 1,
    convRule: rule197
  }, {
    start: 43860,
    length: 7,
    convRule: rule20
  }, {
    start: 43867,
    length: 1,
    convRule: rule10
  }, {
    start: 43868,
    length: 4,
    convRule: rule91
  }, {
    start: 43872,
    length: 9,
    convRule: rule20
  }, {
    start: 43881,
    length: 1,
    convRule: rule91
  }, {
    start: 43882,
    length: 2,
    convRule: rule10
  }, {
    start: 43888,
    length: 80,
    convRule: rule198
  }, {
    start: 43968,
    length: 35,
    convRule: rule14
  }, {
    start: 44003,
    length: 2,
    convRule: rule124
  }, {
    start: 44005,
    length: 1,
    convRule: rule92
  }, {
    start: 44006,
    length: 2,
    convRule: rule124
  }, {
    start: 44008,
    length: 1,
    convRule: rule92
  }, {
    start: 44009,
    length: 2,
    convRule: rule124
  }, {
    start: 44011,
    length: 1,
    convRule: rule2
  }, {
    start: 44012,
    length: 1,
    convRule: rule124
  }, {
    start: 44013,
    length: 1,
    convRule: rule92
  }, {
    start: 44016,
    length: 10,
    convRule: rule8
  }, {
    start: 44032,
    length: 11172,
    convRule: rule14
  }, {
    start: 55216,
    length: 23,
    convRule: rule14
  }, {
    start: 55243,
    length: 49,
    convRule: rule14
  }, {
    start: 55296,
    length: 896,
    convRule: rule199
  }, {
    start: 56192,
    length: 128,
    convRule: rule199
  }, {
    start: 56320,
    length: 1024,
    convRule: rule199
  }, {
    start: 57344,
    length: 6400,
    convRule: rule200
  }, {
    start: 63744,
    length: 366,
    convRule: rule14
  }, {
    start: 64112,
    length: 106,
    convRule: rule14
  }, {
    start: 64256,
    length: 7,
    convRule: rule20
  }, {
    start: 64275,
    length: 5,
    convRule: rule20
  }, {
    start: 64285,
    length: 1,
    convRule: rule14
  }, {
    start: 64286,
    length: 1,
    convRule: rule92
  }, {
    start: 64287,
    length: 10,
    convRule: rule14
  }, {
    start: 64297,
    length: 1,
    convRule: rule6
  }, {
    start: 64298,
    length: 13,
    convRule: rule14
  }, {
    start: 64312,
    length: 5,
    convRule: rule14
  }, {
    start: 64318,
    length: 1,
    convRule: rule14
  }, {
    start: 64320,
    length: 2,
    convRule: rule14
  }, {
    start: 64323,
    length: 2,
    convRule: rule14
  }, {
    start: 64326,
    length: 108,
    convRule: rule14
  }, {
    start: 64434,
    length: 16,
    convRule: rule10
  }, {
    start: 64467,
    length: 363,
    convRule: rule14
  }, {
    start: 64830,
    length: 1,
    convRule: rule5
  }, {
    start: 64831,
    length: 1,
    convRule: rule4
  }, {
    start: 64848,
    length: 64,
    convRule: rule14
  }, {
    start: 64914,
    length: 54,
    convRule: rule14
  }, {
    start: 65008,
    length: 12,
    convRule: rule14
  }, {
    start: 65020,
    length: 1,
    convRule: rule3
  }, {
    start: 65021,
    length: 1,
    convRule: rule13
  }, {
    start: 65024,
    length: 16,
    convRule: rule92
  }, {
    start: 65040,
    length: 7,
    convRule: rule2
  }, {
    start: 65047,
    length: 1,
    convRule: rule4
  }, {
    start: 65048,
    length: 1,
    convRule: rule5
  }, {
    start: 65049,
    length: 1,
    convRule: rule2
  }, {
    start: 65056,
    length: 16,
    convRule: rule92
  }, {
    start: 65072,
    length: 1,
    convRule: rule2
  }, {
    start: 65073,
    length: 2,
    convRule: rule7
  }, {
    start: 65075,
    length: 2,
    convRule: rule11
  }, {
    start: 65077,
    length: 1,
    convRule: rule4
  }, {
    start: 65078,
    length: 1,
    convRule: rule5
  }, {
    start: 65079,
    length: 1,
    convRule: rule4
  }, {
    start: 65080,
    length: 1,
    convRule: rule5
  }, {
    start: 65081,
    length: 1,
    convRule: rule4
  }, {
    start: 65082,
    length: 1,
    convRule: rule5
  }, {
    start: 65083,
    length: 1,
    convRule: rule4
  }, {
    start: 65084,
    length: 1,
    convRule: rule5
  }, {
    start: 65085,
    length: 1,
    convRule: rule4
  }, {
    start: 65086,
    length: 1,
    convRule: rule5
  }, {
    start: 65087,
    length: 1,
    convRule: rule4
  }, {
    start: 65088,
    length: 1,
    convRule: rule5
  }, {
    start: 65089,
    length: 1,
    convRule: rule4
  }, {
    start: 65090,
    length: 1,
    convRule: rule5
  }, {
    start: 65091,
    length: 1,
    convRule: rule4
  }, {
    start: 65092,
    length: 1,
    convRule: rule5
  }, {
    start: 65093,
    length: 2,
    convRule: rule2
  }, {
    start: 65095,
    length: 1,
    convRule: rule4
  }, {
    start: 65096,
    length: 1,
    convRule: rule5
  }, {
    start: 65097,
    length: 4,
    convRule: rule2
  }, {
    start: 65101,
    length: 3,
    convRule: rule11
  }, {
    start: 65104,
    length: 3,
    convRule: rule2
  }, {
    start: 65108,
    length: 4,
    convRule: rule2
  }, {
    start: 65112,
    length: 1,
    convRule: rule7
  }, {
    start: 65113,
    length: 1,
    convRule: rule4
  }, {
    start: 65114,
    length: 1,
    convRule: rule5
  }, {
    start: 65115,
    length: 1,
    convRule: rule4
  }, {
    start: 65116,
    length: 1,
    convRule: rule5
  }, {
    start: 65117,
    length: 1,
    convRule: rule4
  }, {
    start: 65118,
    length: 1,
    convRule: rule5
  }, {
    start: 65119,
    length: 3,
    convRule: rule2
  }, {
    start: 65122,
    length: 1,
    convRule: rule6
  }, {
    start: 65123,
    length: 1,
    convRule: rule7
  }, {
    start: 65124,
    length: 3,
    convRule: rule6
  }, {
    start: 65128,
    length: 1,
    convRule: rule2
  }, {
    start: 65129,
    length: 1,
    convRule: rule3
  }, {
    start: 65130,
    length: 2,
    convRule: rule2
  }, {
    start: 65136,
    length: 5,
    convRule: rule14
  }, {
    start: 65142,
    length: 135,
    convRule: rule14
  }, {
    start: 65279,
    length: 1,
    convRule: rule16
  }, {
    start: 65281,
    length: 3,
    convRule: rule2
  }, {
    start: 65284,
    length: 1,
    convRule: rule3
  }, {
    start: 65285,
    length: 3,
    convRule: rule2
  }, {
    start: 65288,
    length: 1,
    convRule: rule4
  }, {
    start: 65289,
    length: 1,
    convRule: rule5
  }, {
    start: 65290,
    length: 1,
    convRule: rule2
  }, {
    start: 65291,
    length: 1,
    convRule: rule6
  }, {
    start: 65292,
    length: 1,
    convRule: rule2
  }, {
    start: 65293,
    length: 1,
    convRule: rule7
  }, {
    start: 65294,
    length: 2,
    convRule: rule2
  }, {
    start: 65296,
    length: 10,
    convRule: rule8
  }, {
    start: 65306,
    length: 2,
    convRule: rule2
  }, {
    start: 65308,
    length: 3,
    convRule: rule6
  }, {
    start: 65311,
    length: 2,
    convRule: rule2
  }, {
    start: 65313,
    length: 26,
    convRule: rule9
  }, {
    start: 65339,
    length: 1,
    convRule: rule4
  }, {
    start: 65340,
    length: 1,
    convRule: rule2
  }, {
    start: 65341,
    length: 1,
    convRule: rule5
  }, {
    start: 65342,
    length: 1,
    convRule: rule10
  }, {
    start: 65343,
    length: 1,
    convRule: rule11
  }, {
    start: 65344,
    length: 1,
    convRule: rule10
  }, {
    start: 65345,
    length: 26,
    convRule: rule12
  }, {
    start: 65371,
    length: 1,
    convRule: rule4
  }, {
    start: 65372,
    length: 1,
    convRule: rule6
  }, {
    start: 65373,
    length: 1,
    convRule: rule5
  }, {
    start: 65374,
    length: 1,
    convRule: rule6
  }, {
    start: 65375,
    length: 1,
    convRule: rule4
  }, {
    start: 65376,
    length: 1,
    convRule: rule5
  }, {
    start: 65377,
    length: 1,
    convRule: rule2
  }, {
    start: 65378,
    length: 1,
    convRule: rule4
  }, {
    start: 65379,
    length: 1,
    convRule: rule5
  }, {
    start: 65380,
    length: 2,
    convRule: rule2
  }, {
    start: 65382,
    length: 10,
    convRule: rule14
  }, {
    start: 65392,
    length: 1,
    convRule: rule91
  }, {
    start: 65393,
    length: 45,
    convRule: rule14
  }, {
    start: 65438,
    length: 2,
    convRule: rule91
  }, {
    start: 65440,
    length: 31,
    convRule: rule14
  }, {
    start: 65474,
    length: 6,
    convRule: rule14
  }, {
    start: 65482,
    length: 6,
    convRule: rule14
  }, {
    start: 65490,
    length: 6,
    convRule: rule14
  }, {
    start: 65498,
    length: 3,
    convRule: rule14
  }, {
    start: 65504,
    length: 2,
    convRule: rule3
  }, {
    start: 65506,
    length: 1,
    convRule: rule6
  }, {
    start: 65507,
    length: 1,
    convRule: rule10
  }, {
    start: 65508,
    length: 1,
    convRule: rule13
  }, {
    start: 65509,
    length: 2,
    convRule: rule3
  }, {
    start: 65512,
    length: 1,
    convRule: rule13
  }, {
    start: 65513,
    length: 4,
    convRule: rule6
  }, {
    start: 65517,
    length: 2,
    convRule: rule13
  }, {
    start: 65529,
    length: 3,
    convRule: rule16
  }, {
    start: 65532,
    length: 2,
    convRule: rule13
  }, {
    start: 65536,
    length: 12,
    convRule: rule14
  }, {
    start: 65549,
    length: 26,
    convRule: rule14
  }, {
    start: 65576,
    length: 19,
    convRule: rule14
  }, {
    start: 65596,
    length: 2,
    convRule: rule14
  }, {
    start: 65599,
    length: 15,
    convRule: rule14
  }, {
    start: 65616,
    length: 14,
    convRule: rule14
  }, {
    start: 65664,
    length: 123,
    convRule: rule14
  }, {
    start: 65792,
    length: 3,
    convRule: rule2
  }, {
    start: 65799,
    length: 45,
    convRule: rule17
  }, {
    start: 65847,
    length: 9,
    convRule: rule13
  }, {
    start: 65856,
    length: 53,
    convRule: rule128
  }, {
    start: 65909,
    length: 4,
    convRule: rule17
  }, {
    start: 65913,
    length: 17,
    convRule: rule13
  }, {
    start: 65930,
    length: 2,
    convRule: rule17
  }, {
    start: 65932,
    length: 3,
    convRule: rule13
  }, {
    start: 65936,
    length: 13,
    convRule: rule13
  }, {
    start: 65952,
    length: 1,
    convRule: rule13
  }, {
    start: 66e3,
    length: 45,
    convRule: rule13
  }, {
    start: 66045,
    length: 1,
    convRule: rule92
  }, {
    start: 66176,
    length: 29,
    convRule: rule14
  }, {
    start: 66208,
    length: 49,
    convRule: rule14
  }, {
    start: 66272,
    length: 1,
    convRule: rule92
  }, {
    start: 66273,
    length: 27,
    convRule: rule17
  }, {
    start: 66304,
    length: 32,
    convRule: rule14
  }, {
    start: 66336,
    length: 4,
    convRule: rule17
  }, {
    start: 66349,
    length: 20,
    convRule: rule14
  }, {
    start: 66369,
    length: 1,
    convRule: rule128
  }, {
    start: 66370,
    length: 8,
    convRule: rule14
  }, {
    start: 66378,
    length: 1,
    convRule: rule128
  }, {
    start: 66384,
    length: 38,
    convRule: rule14
  }, {
    start: 66422,
    length: 5,
    convRule: rule92
  }, {
    start: 66432,
    length: 30,
    convRule: rule14
  }, {
    start: 66463,
    length: 1,
    convRule: rule2
  }, {
    start: 66464,
    length: 36,
    convRule: rule14
  }, {
    start: 66504,
    length: 8,
    convRule: rule14
  }, {
    start: 66512,
    length: 1,
    convRule: rule2
  }, {
    start: 66513,
    length: 5,
    convRule: rule128
  }, {
    start: 66560,
    length: 40,
    convRule: rule201
  }, {
    start: 66600,
    length: 40,
    convRule: rule202
  }, {
    start: 66640,
    length: 78,
    convRule: rule14
  }, {
    start: 66720,
    length: 10,
    convRule: rule8
  }, {
    start: 66736,
    length: 36,
    convRule: rule201
  }, {
    start: 66776,
    length: 36,
    convRule: rule202
  }, {
    start: 66816,
    length: 40,
    convRule: rule14
  }, {
    start: 66864,
    length: 52,
    convRule: rule14
  }, {
    start: 66927,
    length: 1,
    convRule: rule2
  }, {
    start: 67072,
    length: 311,
    convRule: rule14
  }, {
    start: 67392,
    length: 22,
    convRule: rule14
  }, {
    start: 67424,
    length: 8,
    convRule: rule14
  }, {
    start: 67584,
    length: 6,
    convRule: rule14
  }, {
    start: 67592,
    length: 1,
    convRule: rule14
  }, {
    start: 67594,
    length: 44,
    convRule: rule14
  }, {
    start: 67639,
    length: 2,
    convRule: rule14
  }, {
    start: 67644,
    length: 1,
    convRule: rule14
  }, {
    start: 67647,
    length: 23,
    convRule: rule14
  }, {
    start: 67671,
    length: 1,
    convRule: rule2
  }, {
    start: 67672,
    length: 8,
    convRule: rule17
  }, {
    start: 67680,
    length: 23,
    convRule: rule14
  }, {
    start: 67703,
    length: 2,
    convRule: rule13
  }, {
    start: 67705,
    length: 7,
    convRule: rule17
  }, {
    start: 67712,
    length: 31,
    convRule: rule14
  }, {
    start: 67751,
    length: 9,
    convRule: rule17
  }, {
    start: 67808,
    length: 19,
    convRule: rule14
  }, {
    start: 67828,
    length: 2,
    convRule: rule14
  }, {
    start: 67835,
    length: 5,
    convRule: rule17
  }, {
    start: 67840,
    length: 22,
    convRule: rule14
  }, {
    start: 67862,
    length: 6,
    convRule: rule17
  }, {
    start: 67871,
    length: 1,
    convRule: rule2
  }, {
    start: 67872,
    length: 26,
    convRule: rule14
  }, {
    start: 67903,
    length: 1,
    convRule: rule2
  }, {
    start: 67968,
    length: 56,
    convRule: rule14
  }, {
    start: 68028,
    length: 2,
    convRule: rule17
  }, {
    start: 68030,
    length: 2,
    convRule: rule14
  }, {
    start: 68032,
    length: 16,
    convRule: rule17
  }, {
    start: 68050,
    length: 46,
    convRule: rule17
  }, {
    start: 68096,
    length: 1,
    convRule: rule14
  }, {
    start: 68097,
    length: 3,
    convRule: rule92
  }, {
    start: 68101,
    length: 2,
    convRule: rule92
  }, {
    start: 68108,
    length: 4,
    convRule: rule92
  }, {
    start: 68112,
    length: 4,
    convRule: rule14
  }, {
    start: 68117,
    length: 3,
    convRule: rule14
  }, {
    start: 68121,
    length: 29,
    convRule: rule14
  }, {
    start: 68152,
    length: 3,
    convRule: rule92
  }, {
    start: 68159,
    length: 1,
    convRule: rule92
  }, {
    start: 68160,
    length: 9,
    convRule: rule17
  }, {
    start: 68176,
    length: 9,
    convRule: rule2
  }, {
    start: 68192,
    length: 29,
    convRule: rule14
  }, {
    start: 68221,
    length: 2,
    convRule: rule17
  }, {
    start: 68223,
    length: 1,
    convRule: rule2
  }, {
    start: 68224,
    length: 29,
    convRule: rule14
  }, {
    start: 68253,
    length: 3,
    convRule: rule17
  }, {
    start: 68288,
    length: 8,
    convRule: rule14
  }, {
    start: 68296,
    length: 1,
    convRule: rule13
  }, {
    start: 68297,
    length: 28,
    convRule: rule14
  }, {
    start: 68325,
    length: 2,
    convRule: rule92
  }, {
    start: 68331,
    length: 5,
    convRule: rule17
  }, {
    start: 68336,
    length: 7,
    convRule: rule2
  }, {
    start: 68352,
    length: 54,
    convRule: rule14
  }, {
    start: 68409,
    length: 7,
    convRule: rule2
  }, {
    start: 68416,
    length: 22,
    convRule: rule14
  }, {
    start: 68440,
    length: 8,
    convRule: rule17
  }, {
    start: 68448,
    length: 19,
    convRule: rule14
  }, {
    start: 68472,
    length: 8,
    convRule: rule17
  }, {
    start: 68480,
    length: 18,
    convRule: rule14
  }, {
    start: 68505,
    length: 4,
    convRule: rule2
  }, {
    start: 68521,
    length: 7,
    convRule: rule17
  }, {
    start: 68608,
    length: 73,
    convRule: rule14
  }, {
    start: 68736,
    length: 51,
    convRule: rule97
  }, {
    start: 68800,
    length: 51,
    convRule: rule102
  }, {
    start: 68858,
    length: 6,
    convRule: rule17
  }, {
    start: 68864,
    length: 36,
    convRule: rule14
  }, {
    start: 68900,
    length: 4,
    convRule: rule92
  }, {
    start: 68912,
    length: 10,
    convRule: rule8
  }, {
    start: 69216,
    length: 31,
    convRule: rule17
  }, {
    start: 69248,
    length: 42,
    convRule: rule14
  }, {
    start: 69291,
    length: 2,
    convRule: rule92
  }, {
    start: 69293,
    length: 1,
    convRule: rule7
  }, {
    start: 69296,
    length: 2,
    convRule: rule14
  }, {
    start: 69376,
    length: 29,
    convRule: rule14
  }, {
    start: 69405,
    length: 10,
    convRule: rule17
  }, {
    start: 69415,
    length: 1,
    convRule: rule14
  }, {
    start: 69424,
    length: 22,
    convRule: rule14
  }, {
    start: 69446,
    length: 11,
    convRule: rule92
  }, {
    start: 69457,
    length: 4,
    convRule: rule17
  }, {
    start: 69461,
    length: 5,
    convRule: rule2
  }, {
    start: 69552,
    length: 21,
    convRule: rule14
  }, {
    start: 69573,
    length: 7,
    convRule: rule17
  }, {
    start: 69600,
    length: 23,
    convRule: rule14
  }, {
    start: 69632,
    length: 1,
    convRule: rule124
  }, {
    start: 69633,
    length: 1,
    convRule: rule92
  }, {
    start: 69634,
    length: 1,
    convRule: rule124
  }, {
    start: 69635,
    length: 53,
    convRule: rule14
  }, {
    start: 69688,
    length: 15,
    convRule: rule92
  }, {
    start: 69703,
    length: 7,
    convRule: rule2
  }, {
    start: 69714,
    length: 20,
    convRule: rule17
  }, {
    start: 69734,
    length: 10,
    convRule: rule8
  }, {
    start: 69759,
    length: 3,
    convRule: rule92
  }, {
    start: 69762,
    length: 1,
    convRule: rule124
  }, {
    start: 69763,
    length: 45,
    convRule: rule14
  }, {
    start: 69808,
    length: 3,
    convRule: rule124
  }, {
    start: 69811,
    length: 4,
    convRule: rule92
  }, {
    start: 69815,
    length: 2,
    convRule: rule124
  }, {
    start: 69817,
    length: 2,
    convRule: rule92
  }, {
    start: 69819,
    length: 2,
    convRule: rule2
  }, {
    start: 69821,
    length: 1,
    convRule: rule16
  }, {
    start: 69822,
    length: 4,
    convRule: rule2
  }, {
    start: 69837,
    length: 1,
    convRule: rule16
  }, {
    start: 69840,
    length: 25,
    convRule: rule14
  }, {
    start: 69872,
    length: 10,
    convRule: rule8
  }, {
    start: 69888,
    length: 3,
    convRule: rule92
  }, {
    start: 69891,
    length: 36,
    convRule: rule14
  }, {
    start: 69927,
    length: 5,
    convRule: rule92
  }, {
    start: 69932,
    length: 1,
    convRule: rule124
  }, {
    start: 69933,
    length: 8,
    convRule: rule92
  }, {
    start: 69942,
    length: 10,
    convRule: rule8
  }, {
    start: 69952,
    length: 4,
    convRule: rule2
  }, {
    start: 69956,
    length: 1,
    convRule: rule14
  }, {
    start: 69957,
    length: 2,
    convRule: rule124
  }, {
    start: 69959,
    length: 1,
    convRule: rule14
  }, {
    start: 69968,
    length: 35,
    convRule: rule14
  }, {
    start: 70003,
    length: 1,
    convRule: rule92
  }, {
    start: 70004,
    length: 2,
    convRule: rule2
  }, {
    start: 70006,
    length: 1,
    convRule: rule14
  }, {
    start: 70016,
    length: 2,
    convRule: rule92
  }, {
    start: 70018,
    length: 1,
    convRule: rule124
  }, {
    start: 70019,
    length: 48,
    convRule: rule14
  }, {
    start: 70067,
    length: 3,
    convRule: rule124
  }, {
    start: 70070,
    length: 9,
    convRule: rule92
  }, {
    start: 70079,
    length: 2,
    convRule: rule124
  }, {
    start: 70081,
    length: 4,
    convRule: rule14
  }, {
    start: 70085,
    length: 4,
    convRule: rule2
  }, {
    start: 70089,
    length: 4,
    convRule: rule92
  }, {
    start: 70093,
    length: 1,
    convRule: rule2
  }, {
    start: 70094,
    length: 1,
    convRule: rule124
  }, {
    start: 70095,
    length: 1,
    convRule: rule92
  }, {
    start: 70096,
    length: 10,
    convRule: rule8
  }, {
    start: 70106,
    length: 1,
    convRule: rule14
  }, {
    start: 70107,
    length: 1,
    convRule: rule2
  }, {
    start: 70108,
    length: 1,
    convRule: rule14
  }, {
    start: 70109,
    length: 3,
    convRule: rule2
  }, {
    start: 70113,
    length: 20,
    convRule: rule17
  }, {
    start: 70144,
    length: 18,
    convRule: rule14
  }, {
    start: 70163,
    length: 25,
    convRule: rule14
  }, {
    start: 70188,
    length: 3,
    convRule: rule124
  }, {
    start: 70191,
    length: 3,
    convRule: rule92
  }, {
    start: 70194,
    length: 2,
    convRule: rule124
  }, {
    start: 70196,
    length: 1,
    convRule: rule92
  }, {
    start: 70197,
    length: 1,
    convRule: rule124
  }, {
    start: 70198,
    length: 2,
    convRule: rule92
  }, {
    start: 70200,
    length: 6,
    convRule: rule2
  }, {
    start: 70206,
    length: 1,
    convRule: rule92
  }, {
    start: 70272,
    length: 7,
    convRule: rule14
  }, {
    start: 70280,
    length: 1,
    convRule: rule14
  }, {
    start: 70282,
    length: 4,
    convRule: rule14
  }, {
    start: 70287,
    length: 15,
    convRule: rule14
  }, {
    start: 70303,
    length: 10,
    convRule: rule14
  }, {
    start: 70313,
    length: 1,
    convRule: rule2
  }, {
    start: 70320,
    length: 47,
    convRule: rule14
  }, {
    start: 70367,
    length: 1,
    convRule: rule92
  }, {
    start: 70368,
    length: 3,
    convRule: rule124
  }, {
    start: 70371,
    length: 8,
    convRule: rule92
  }, {
    start: 70384,
    length: 10,
    convRule: rule8
  }, {
    start: 70400,
    length: 2,
    convRule: rule92
  }, {
    start: 70402,
    length: 2,
    convRule: rule124
  }, {
    start: 70405,
    length: 8,
    convRule: rule14
  }, {
    start: 70415,
    length: 2,
    convRule: rule14
  }, {
    start: 70419,
    length: 22,
    convRule: rule14
  }, {
    start: 70442,
    length: 7,
    convRule: rule14
  }, {
    start: 70450,
    length: 2,
    convRule: rule14
  }, {
    start: 70453,
    length: 5,
    convRule: rule14
  }, {
    start: 70459,
    length: 2,
    convRule: rule92
  }, {
    start: 70461,
    length: 1,
    convRule: rule14
  }, {
    start: 70462,
    length: 2,
    convRule: rule124
  }, {
    start: 70464,
    length: 1,
    convRule: rule92
  }, {
    start: 70465,
    length: 4,
    convRule: rule124
  }, {
    start: 70471,
    length: 2,
    convRule: rule124
  }, {
    start: 70475,
    length: 3,
    convRule: rule124
  }, {
    start: 70480,
    length: 1,
    convRule: rule14
  }, {
    start: 70487,
    length: 1,
    convRule: rule124
  }, {
    start: 70493,
    length: 5,
    convRule: rule14
  }, {
    start: 70498,
    length: 2,
    convRule: rule124
  }, {
    start: 70502,
    length: 7,
    convRule: rule92
  }, {
    start: 70512,
    length: 5,
    convRule: rule92
  }, {
    start: 70656,
    length: 53,
    convRule: rule14
  }, {
    start: 70709,
    length: 3,
    convRule: rule124
  }, {
    start: 70712,
    length: 8,
    convRule: rule92
  }, {
    start: 70720,
    length: 2,
    convRule: rule124
  }, {
    start: 70722,
    length: 3,
    convRule: rule92
  }, {
    start: 70725,
    length: 1,
    convRule: rule124
  }, {
    start: 70726,
    length: 1,
    convRule: rule92
  }, {
    start: 70727,
    length: 4,
    convRule: rule14
  }, {
    start: 70731,
    length: 5,
    convRule: rule2
  }, {
    start: 70736,
    length: 10,
    convRule: rule8
  }, {
    start: 70746,
    length: 2,
    convRule: rule2
  }, {
    start: 70749,
    length: 1,
    convRule: rule2
  }, {
    start: 70750,
    length: 1,
    convRule: rule92
  }, {
    start: 70751,
    length: 3,
    convRule: rule14
  }, {
    start: 70784,
    length: 48,
    convRule: rule14
  }, {
    start: 70832,
    length: 3,
    convRule: rule124
  }, {
    start: 70835,
    length: 6,
    convRule: rule92
  }, {
    start: 70841,
    length: 1,
    convRule: rule124
  }, {
    start: 70842,
    length: 1,
    convRule: rule92
  }, {
    start: 70843,
    length: 4,
    convRule: rule124
  }, {
    start: 70847,
    length: 2,
    convRule: rule92
  }, {
    start: 70849,
    length: 1,
    convRule: rule124
  }, {
    start: 70850,
    length: 2,
    convRule: rule92
  }, {
    start: 70852,
    length: 2,
    convRule: rule14
  }, {
    start: 70854,
    length: 1,
    convRule: rule2
  }, {
    start: 70855,
    length: 1,
    convRule: rule14
  }, {
    start: 70864,
    length: 10,
    convRule: rule8
  }, {
    start: 71040,
    length: 47,
    convRule: rule14
  }, {
    start: 71087,
    length: 3,
    convRule: rule124
  }, {
    start: 71090,
    length: 4,
    convRule: rule92
  }, {
    start: 71096,
    length: 4,
    convRule: rule124
  }, {
    start: 71100,
    length: 2,
    convRule: rule92
  }, {
    start: 71102,
    length: 1,
    convRule: rule124
  }, {
    start: 71103,
    length: 2,
    convRule: rule92
  }, {
    start: 71105,
    length: 23,
    convRule: rule2
  }, {
    start: 71128,
    length: 4,
    convRule: rule14
  }, {
    start: 71132,
    length: 2,
    convRule: rule92
  }, {
    start: 71168,
    length: 48,
    convRule: rule14
  }, {
    start: 71216,
    length: 3,
    convRule: rule124
  }, {
    start: 71219,
    length: 8,
    convRule: rule92
  }, {
    start: 71227,
    length: 2,
    convRule: rule124
  }, {
    start: 71229,
    length: 1,
    convRule: rule92
  }, {
    start: 71230,
    length: 1,
    convRule: rule124
  }, {
    start: 71231,
    length: 2,
    convRule: rule92
  }, {
    start: 71233,
    length: 3,
    convRule: rule2
  }, {
    start: 71236,
    length: 1,
    convRule: rule14
  }, {
    start: 71248,
    length: 10,
    convRule: rule8
  }, {
    start: 71264,
    length: 13,
    convRule: rule2
  }, {
    start: 71296,
    length: 43,
    convRule: rule14
  }, {
    start: 71339,
    length: 1,
    convRule: rule92
  }, {
    start: 71340,
    length: 1,
    convRule: rule124
  }, {
    start: 71341,
    length: 1,
    convRule: rule92
  }, {
    start: 71342,
    length: 2,
    convRule: rule124
  }, {
    start: 71344,
    length: 6,
    convRule: rule92
  }, {
    start: 71350,
    length: 1,
    convRule: rule124
  }, {
    start: 71351,
    length: 1,
    convRule: rule92
  }, {
    start: 71352,
    length: 1,
    convRule: rule14
  }, {
    start: 71360,
    length: 10,
    convRule: rule8
  }, {
    start: 71424,
    length: 27,
    convRule: rule14
  }, {
    start: 71453,
    length: 3,
    convRule: rule92
  }, {
    start: 71456,
    length: 2,
    convRule: rule124
  }, {
    start: 71458,
    length: 4,
    convRule: rule92
  }, {
    start: 71462,
    length: 1,
    convRule: rule124
  }, {
    start: 71463,
    length: 5,
    convRule: rule92
  }, {
    start: 71472,
    length: 10,
    convRule: rule8
  }, {
    start: 71482,
    length: 2,
    convRule: rule17
  }, {
    start: 71484,
    length: 3,
    convRule: rule2
  }, {
    start: 71487,
    length: 1,
    convRule: rule13
  }, {
    start: 71680,
    length: 44,
    convRule: rule14
  }, {
    start: 71724,
    length: 3,
    convRule: rule124
  }, {
    start: 71727,
    length: 9,
    convRule: rule92
  }, {
    start: 71736,
    length: 1,
    convRule: rule124
  }, {
    start: 71737,
    length: 2,
    convRule: rule92
  }, {
    start: 71739,
    length: 1,
    convRule: rule2
  }, {
    start: 71840,
    length: 32,
    convRule: rule9
  }, {
    start: 71872,
    length: 32,
    convRule: rule12
  }, {
    start: 71904,
    length: 10,
    convRule: rule8
  }, {
    start: 71914,
    length: 9,
    convRule: rule17
  }, {
    start: 71935,
    length: 8,
    convRule: rule14
  }, {
    start: 71945,
    length: 1,
    convRule: rule14
  }, {
    start: 71948,
    length: 8,
    convRule: rule14
  }, {
    start: 71957,
    length: 2,
    convRule: rule14
  }, {
    start: 71960,
    length: 24,
    convRule: rule14
  }, {
    start: 71984,
    length: 6,
    convRule: rule124
  }, {
    start: 71991,
    length: 2,
    convRule: rule124
  }, {
    start: 71995,
    length: 2,
    convRule: rule92
  }, {
    start: 71997,
    length: 1,
    convRule: rule124
  }, {
    start: 71998,
    length: 1,
    convRule: rule92
  }, {
    start: 71999,
    length: 1,
    convRule: rule14
  }, {
    start: 72e3,
    length: 1,
    convRule: rule124
  }, {
    start: 72001,
    length: 1,
    convRule: rule14
  }, {
    start: 72002,
    length: 1,
    convRule: rule124
  }, {
    start: 72003,
    length: 1,
    convRule: rule92
  }, {
    start: 72004,
    length: 3,
    convRule: rule2
  }, {
    start: 72016,
    length: 10,
    convRule: rule8
  }, {
    start: 72096,
    length: 8,
    convRule: rule14
  }, {
    start: 72106,
    length: 39,
    convRule: rule14
  }, {
    start: 72145,
    length: 3,
    convRule: rule124
  }, {
    start: 72148,
    length: 4,
    convRule: rule92
  }, {
    start: 72154,
    length: 2,
    convRule: rule92
  }, {
    start: 72156,
    length: 4,
    convRule: rule124
  }, {
    start: 72160,
    length: 1,
    convRule: rule92
  }, {
    start: 72161,
    length: 1,
    convRule: rule14
  }, {
    start: 72162,
    length: 1,
    convRule: rule2
  }, {
    start: 72163,
    length: 1,
    convRule: rule14
  }, {
    start: 72164,
    length: 1,
    convRule: rule124
  }, {
    start: 72192,
    length: 1,
    convRule: rule14
  }, {
    start: 72193,
    length: 10,
    convRule: rule92
  }, {
    start: 72203,
    length: 40,
    convRule: rule14
  }, {
    start: 72243,
    length: 6,
    convRule: rule92
  }, {
    start: 72249,
    length: 1,
    convRule: rule124
  }, {
    start: 72250,
    length: 1,
    convRule: rule14
  }, {
    start: 72251,
    length: 4,
    convRule: rule92
  }, {
    start: 72255,
    length: 8,
    convRule: rule2
  }, {
    start: 72263,
    length: 1,
    convRule: rule92
  }, {
    start: 72272,
    length: 1,
    convRule: rule14
  }, {
    start: 72273,
    length: 6,
    convRule: rule92
  }, {
    start: 72279,
    length: 2,
    convRule: rule124
  }, {
    start: 72281,
    length: 3,
    convRule: rule92
  }, {
    start: 72284,
    length: 46,
    convRule: rule14
  }, {
    start: 72330,
    length: 13,
    convRule: rule92
  }, {
    start: 72343,
    length: 1,
    convRule: rule124
  }, {
    start: 72344,
    length: 2,
    convRule: rule92
  }, {
    start: 72346,
    length: 3,
    convRule: rule2
  }, {
    start: 72349,
    length: 1,
    convRule: rule14
  }, {
    start: 72350,
    length: 5,
    convRule: rule2
  }, {
    start: 72384,
    length: 57,
    convRule: rule14
  }, {
    start: 72704,
    length: 9,
    convRule: rule14
  }, {
    start: 72714,
    length: 37,
    convRule: rule14
  }, {
    start: 72751,
    length: 1,
    convRule: rule124
  }, {
    start: 72752,
    length: 7,
    convRule: rule92
  }, {
    start: 72760,
    length: 6,
    convRule: rule92
  }, {
    start: 72766,
    length: 1,
    convRule: rule124
  }, {
    start: 72767,
    length: 1,
    convRule: rule92
  }, {
    start: 72768,
    length: 1,
    convRule: rule14
  }, {
    start: 72769,
    length: 5,
    convRule: rule2
  }, {
    start: 72784,
    length: 10,
    convRule: rule8
  }, {
    start: 72794,
    length: 19,
    convRule: rule17
  }, {
    start: 72816,
    length: 2,
    convRule: rule2
  }, {
    start: 72818,
    length: 30,
    convRule: rule14
  }, {
    start: 72850,
    length: 22,
    convRule: rule92
  }, {
    start: 72873,
    length: 1,
    convRule: rule124
  }, {
    start: 72874,
    length: 7,
    convRule: rule92
  }, {
    start: 72881,
    length: 1,
    convRule: rule124
  }, {
    start: 72882,
    length: 2,
    convRule: rule92
  }, {
    start: 72884,
    length: 1,
    convRule: rule124
  }, {
    start: 72885,
    length: 2,
    convRule: rule92
  }, {
    start: 72960,
    length: 7,
    convRule: rule14
  }, {
    start: 72968,
    length: 2,
    convRule: rule14
  }, {
    start: 72971,
    length: 38,
    convRule: rule14
  }, {
    start: 73009,
    length: 6,
    convRule: rule92
  }, {
    start: 73018,
    length: 1,
    convRule: rule92
  }, {
    start: 73020,
    length: 2,
    convRule: rule92
  }, {
    start: 73023,
    length: 7,
    convRule: rule92
  }, {
    start: 73030,
    length: 1,
    convRule: rule14
  }, {
    start: 73031,
    length: 1,
    convRule: rule92
  }, {
    start: 73040,
    length: 10,
    convRule: rule8
  }, {
    start: 73056,
    length: 6,
    convRule: rule14
  }, {
    start: 73063,
    length: 2,
    convRule: rule14
  }, {
    start: 73066,
    length: 32,
    convRule: rule14
  }, {
    start: 73098,
    length: 5,
    convRule: rule124
  }, {
    start: 73104,
    length: 2,
    convRule: rule92
  }, {
    start: 73107,
    length: 2,
    convRule: rule124
  }, {
    start: 73109,
    length: 1,
    convRule: rule92
  }, {
    start: 73110,
    length: 1,
    convRule: rule124
  }, {
    start: 73111,
    length: 1,
    convRule: rule92
  }, {
    start: 73112,
    length: 1,
    convRule: rule14
  }, {
    start: 73120,
    length: 10,
    convRule: rule8
  }, {
    start: 73440,
    length: 19,
    convRule: rule14
  }, {
    start: 73459,
    length: 2,
    convRule: rule92
  }, {
    start: 73461,
    length: 2,
    convRule: rule124
  }, {
    start: 73463,
    length: 2,
    convRule: rule2
  }, {
    start: 73648,
    length: 1,
    convRule: rule14
  }, {
    start: 73664,
    length: 21,
    convRule: rule17
  }, {
    start: 73685,
    length: 8,
    convRule: rule13
  }, {
    start: 73693,
    length: 4,
    convRule: rule3
  }, {
    start: 73697,
    length: 17,
    convRule: rule13
  }, {
    start: 73727,
    length: 1,
    convRule: rule2
  }, {
    start: 73728,
    length: 922,
    convRule: rule14
  }, {
    start: 74752,
    length: 111,
    convRule: rule128
  }, {
    start: 74864,
    length: 5,
    convRule: rule2
  }, {
    start: 74880,
    length: 196,
    convRule: rule14
  }, {
    start: 77824,
    length: 1071,
    convRule: rule14
  }, {
    start: 78896,
    length: 9,
    convRule: rule16
  }, {
    start: 82944,
    length: 583,
    convRule: rule14
  }, {
    start: 92160,
    length: 569,
    convRule: rule14
  }, {
    start: 92736,
    length: 31,
    convRule: rule14
  }, {
    start: 92768,
    length: 10,
    convRule: rule8
  }, {
    start: 92782,
    length: 2,
    convRule: rule2
  }, {
    start: 92880,
    length: 30,
    convRule: rule14
  }, {
    start: 92912,
    length: 5,
    convRule: rule92
  }, {
    start: 92917,
    length: 1,
    convRule: rule2
  }, {
    start: 92928,
    length: 48,
    convRule: rule14
  }, {
    start: 92976,
    length: 7,
    convRule: rule92
  }, {
    start: 92983,
    length: 5,
    convRule: rule2
  }, {
    start: 92988,
    length: 4,
    convRule: rule13
  }, {
    start: 92992,
    length: 4,
    convRule: rule91
  }, {
    start: 92996,
    length: 1,
    convRule: rule2
  }, {
    start: 92997,
    length: 1,
    convRule: rule13
  }, {
    start: 93008,
    length: 10,
    convRule: rule8
  }, {
    start: 93019,
    length: 7,
    convRule: rule17
  }, {
    start: 93027,
    length: 21,
    convRule: rule14
  }, {
    start: 93053,
    length: 19,
    convRule: rule14
  }, {
    start: 93760,
    length: 32,
    convRule: rule9
  }, {
    start: 93792,
    length: 32,
    convRule: rule12
  }, {
    start: 93824,
    length: 23,
    convRule: rule17
  }, {
    start: 93847,
    length: 4,
    convRule: rule2
  }, {
    start: 93952,
    length: 75,
    convRule: rule14
  }, {
    start: 94031,
    length: 1,
    convRule: rule92
  }, {
    start: 94032,
    length: 1,
    convRule: rule14
  }, {
    start: 94033,
    length: 55,
    convRule: rule124
  }, {
    start: 94095,
    length: 4,
    convRule: rule92
  }, {
    start: 94099,
    length: 13,
    convRule: rule91
  }, {
    start: 94176,
    length: 2,
    convRule: rule91
  }, {
    start: 94178,
    length: 1,
    convRule: rule2
  }, {
    start: 94179,
    length: 1,
    convRule: rule91
  }, {
    start: 94180,
    length: 1,
    convRule: rule92
  }, {
    start: 94192,
    length: 2,
    convRule: rule124
  }, {
    start: 94208,
    length: 6136,
    convRule: rule14
  }, {
    start: 100352,
    length: 1238,
    convRule: rule14
  }, {
    start: 101632,
    length: 9,
    convRule: rule14
  }, {
    start: 110592,
    length: 287,
    convRule: rule14
  }, {
    start: 110928,
    length: 3,
    convRule: rule14
  }, {
    start: 110948,
    length: 4,
    convRule: rule14
  }, {
    start: 110960,
    length: 396,
    convRule: rule14
  }, {
    start: 113664,
    length: 107,
    convRule: rule14
  }, {
    start: 113776,
    length: 13,
    convRule: rule14
  }, {
    start: 113792,
    length: 9,
    convRule: rule14
  }, {
    start: 113808,
    length: 10,
    convRule: rule14
  }, {
    start: 113820,
    length: 1,
    convRule: rule13
  }, {
    start: 113821,
    length: 2,
    convRule: rule92
  }, {
    start: 113823,
    length: 1,
    convRule: rule2
  }, {
    start: 113824,
    length: 4,
    convRule: rule16
  }, {
    start: 118784,
    length: 246,
    convRule: rule13
  }, {
    start: 119040,
    length: 39,
    convRule: rule13
  }, {
    start: 119081,
    length: 60,
    convRule: rule13
  }, {
    start: 119141,
    length: 2,
    convRule: rule124
  }, {
    start: 119143,
    length: 3,
    convRule: rule92
  }, {
    start: 119146,
    length: 3,
    convRule: rule13
  }, {
    start: 119149,
    length: 6,
    convRule: rule124
  }, {
    start: 119155,
    length: 8,
    convRule: rule16
  }, {
    start: 119163,
    length: 8,
    convRule: rule92
  }, {
    start: 119171,
    length: 2,
    convRule: rule13
  }, {
    start: 119173,
    length: 7,
    convRule: rule92
  }, {
    start: 119180,
    length: 30,
    convRule: rule13
  }, {
    start: 119210,
    length: 4,
    convRule: rule92
  }, {
    start: 119214,
    length: 59,
    convRule: rule13
  }, {
    start: 119296,
    length: 66,
    convRule: rule13
  }, {
    start: 119362,
    length: 3,
    convRule: rule92
  }, {
    start: 119365,
    length: 1,
    convRule: rule13
  }, {
    start: 119520,
    length: 20,
    convRule: rule17
  }, {
    start: 119552,
    length: 87,
    convRule: rule13
  }, {
    start: 119648,
    length: 25,
    convRule: rule17
  }, {
    start: 119808,
    length: 26,
    convRule: rule107
  }, {
    start: 119834,
    length: 26,
    convRule: rule20
  }, {
    start: 119860,
    length: 26,
    convRule: rule107
  }, {
    start: 119886,
    length: 7,
    convRule: rule20
  }, {
    start: 119894,
    length: 18,
    convRule: rule20
  }, {
    start: 119912,
    length: 26,
    convRule: rule107
  }, {
    start: 119938,
    length: 26,
    convRule: rule20
  }, {
    start: 119964,
    length: 1,
    convRule: rule107
  }, {
    start: 119966,
    length: 2,
    convRule: rule107
  }, {
    start: 119970,
    length: 1,
    convRule: rule107
  }, {
    start: 119973,
    length: 2,
    convRule: rule107
  }, {
    start: 119977,
    length: 4,
    convRule: rule107
  }, {
    start: 119982,
    length: 8,
    convRule: rule107
  }, {
    start: 119990,
    length: 4,
    convRule: rule20
  }, {
    start: 119995,
    length: 1,
    convRule: rule20
  }, {
    start: 119997,
    length: 7,
    convRule: rule20
  }, {
    start: 120005,
    length: 11,
    convRule: rule20
  }, {
    start: 120016,
    length: 26,
    convRule: rule107
  }, {
    start: 120042,
    length: 26,
    convRule: rule20
  }, {
    start: 120068,
    length: 2,
    convRule: rule107
  }, {
    start: 120071,
    length: 4,
    convRule: rule107
  }, {
    start: 120077,
    length: 8,
    convRule: rule107
  }, {
    start: 120086,
    length: 7,
    convRule: rule107
  }, {
    start: 120094,
    length: 26,
    convRule: rule20
  }, {
    start: 120120,
    length: 2,
    convRule: rule107
  }, {
    start: 120123,
    length: 4,
    convRule: rule107
  }, {
    start: 120128,
    length: 5,
    convRule: rule107
  }, {
    start: 120134,
    length: 1,
    convRule: rule107
  }, {
    start: 120138,
    length: 7,
    convRule: rule107
  }, {
    start: 120146,
    length: 26,
    convRule: rule20
  }, {
    start: 120172,
    length: 26,
    convRule: rule107
  }, {
    start: 120198,
    length: 26,
    convRule: rule20
  }, {
    start: 120224,
    length: 26,
    convRule: rule107
  }, {
    start: 120250,
    length: 26,
    convRule: rule20
  }, {
    start: 120276,
    length: 26,
    convRule: rule107
  }, {
    start: 120302,
    length: 26,
    convRule: rule20
  }, {
    start: 120328,
    length: 26,
    convRule: rule107
  }, {
    start: 120354,
    length: 26,
    convRule: rule20
  }, {
    start: 120380,
    length: 26,
    convRule: rule107
  }, {
    start: 120406,
    length: 26,
    convRule: rule20
  }, {
    start: 120432,
    length: 26,
    convRule: rule107
  }, {
    start: 120458,
    length: 28,
    convRule: rule20
  }, {
    start: 120488,
    length: 25,
    convRule: rule107
  }, {
    start: 120513,
    length: 1,
    convRule: rule6
  }, {
    start: 120514,
    length: 25,
    convRule: rule20
  }, {
    start: 120539,
    length: 1,
    convRule: rule6
  }, {
    start: 120540,
    length: 6,
    convRule: rule20
  }, {
    start: 120546,
    length: 25,
    convRule: rule107
  }, {
    start: 120571,
    length: 1,
    convRule: rule6
  }, {
    start: 120572,
    length: 25,
    convRule: rule20
  }, {
    start: 120597,
    length: 1,
    convRule: rule6
  }, {
    start: 120598,
    length: 6,
    convRule: rule20
  }, {
    start: 120604,
    length: 25,
    convRule: rule107
  }, {
    start: 120629,
    length: 1,
    convRule: rule6
  }, {
    start: 120630,
    length: 25,
    convRule: rule20
  }, {
    start: 120655,
    length: 1,
    convRule: rule6
  }, {
    start: 120656,
    length: 6,
    convRule: rule20
  }, {
    start: 120662,
    length: 25,
    convRule: rule107
  }, {
    start: 120687,
    length: 1,
    convRule: rule6
  }, {
    start: 120688,
    length: 25,
    convRule: rule20
  }, {
    start: 120713,
    length: 1,
    convRule: rule6
  }, {
    start: 120714,
    length: 6,
    convRule: rule20
  }, {
    start: 120720,
    length: 25,
    convRule: rule107
  }, {
    start: 120745,
    length: 1,
    convRule: rule6
  }, {
    start: 120746,
    length: 25,
    convRule: rule20
  }, {
    start: 120771,
    length: 1,
    convRule: rule6
  }, {
    start: 120772,
    length: 6,
    convRule: rule20
  }, {
    start: 120778,
    length: 1,
    convRule: rule107
  }, {
    start: 120779,
    length: 1,
    convRule: rule20
  }, {
    start: 120782,
    length: 50,
    convRule: rule8
  }, {
    start: 120832,
    length: 512,
    convRule: rule13
  }, {
    start: 121344,
    length: 55,
    convRule: rule92
  }, {
    start: 121399,
    length: 4,
    convRule: rule13
  }, {
    start: 121403,
    length: 50,
    convRule: rule92
  }, {
    start: 121453,
    length: 8,
    convRule: rule13
  }, {
    start: 121461,
    length: 1,
    convRule: rule92
  }, {
    start: 121462,
    length: 14,
    convRule: rule13
  }, {
    start: 121476,
    length: 1,
    convRule: rule92
  }, {
    start: 121477,
    length: 2,
    convRule: rule13
  }, {
    start: 121479,
    length: 5,
    convRule: rule2
  }, {
    start: 121499,
    length: 5,
    convRule: rule92
  }, {
    start: 121505,
    length: 15,
    convRule: rule92
  }, {
    start: 122880,
    length: 7,
    convRule: rule92
  }, {
    start: 122888,
    length: 17,
    convRule: rule92
  }, {
    start: 122907,
    length: 7,
    convRule: rule92
  }, {
    start: 122915,
    length: 2,
    convRule: rule92
  }, {
    start: 122918,
    length: 5,
    convRule: rule92
  }, {
    start: 123136,
    length: 45,
    convRule: rule14
  }, {
    start: 123184,
    length: 7,
    convRule: rule92
  }, {
    start: 123191,
    length: 7,
    convRule: rule91
  }, {
    start: 123200,
    length: 10,
    convRule: rule8
  }, {
    start: 123214,
    length: 1,
    convRule: rule14
  }, {
    start: 123215,
    length: 1,
    convRule: rule13
  }, {
    start: 123584,
    length: 44,
    convRule: rule14
  }, {
    start: 123628,
    length: 4,
    convRule: rule92
  }, {
    start: 123632,
    length: 10,
    convRule: rule8
  }, {
    start: 123647,
    length: 1,
    convRule: rule3
  }, {
    start: 124928,
    length: 197,
    convRule: rule14
  }, {
    start: 125127,
    length: 9,
    convRule: rule17
  }, {
    start: 125136,
    length: 7,
    convRule: rule92
  }, {
    start: 125184,
    length: 34,
    convRule: rule203
  }, {
    start: 125218,
    length: 34,
    convRule: rule204
  }, {
    start: 125252,
    length: 7,
    convRule: rule92
  }, {
    start: 125259,
    length: 1,
    convRule: rule91
  }, {
    start: 125264,
    length: 10,
    convRule: rule8
  }, {
    start: 125278,
    length: 2,
    convRule: rule2
  }, {
    start: 126065,
    length: 59,
    convRule: rule17
  }, {
    start: 126124,
    length: 1,
    convRule: rule13
  }, {
    start: 126125,
    length: 3,
    convRule: rule17
  }, {
    start: 126128,
    length: 1,
    convRule: rule3
  }, {
    start: 126129,
    length: 4,
    convRule: rule17
  }, {
    start: 126209,
    length: 45,
    convRule: rule17
  }, {
    start: 126254,
    length: 1,
    convRule: rule13
  }, {
    start: 126255,
    length: 15,
    convRule: rule17
  }, {
    start: 126464,
    length: 4,
    convRule: rule14
  }, {
    start: 126469,
    length: 27,
    convRule: rule14
  }, {
    start: 126497,
    length: 2,
    convRule: rule14
  }, {
    start: 126500,
    length: 1,
    convRule: rule14
  }, {
    start: 126503,
    length: 1,
    convRule: rule14
  }, {
    start: 126505,
    length: 10,
    convRule: rule14
  }, {
    start: 126516,
    length: 4,
    convRule: rule14
  }, {
    start: 126521,
    length: 1,
    convRule: rule14
  }, {
    start: 126523,
    length: 1,
    convRule: rule14
  }, {
    start: 126530,
    length: 1,
    convRule: rule14
  }, {
    start: 126535,
    length: 1,
    convRule: rule14
  }, {
    start: 126537,
    length: 1,
    convRule: rule14
  }, {
    start: 126539,
    length: 1,
    convRule: rule14
  }, {
    start: 126541,
    length: 3,
    convRule: rule14
  }, {
    start: 126545,
    length: 2,
    convRule: rule14
  }, {
    start: 126548,
    length: 1,
    convRule: rule14
  }, {
    start: 126551,
    length: 1,
    convRule: rule14
  }, {
    start: 126553,
    length: 1,
    convRule: rule14
  }, {
    start: 126555,
    length: 1,
    convRule: rule14
  }, {
    start: 126557,
    length: 1,
    convRule: rule14
  }, {
    start: 126559,
    length: 1,
    convRule: rule14
  }, {
    start: 126561,
    length: 2,
    convRule: rule14
  }, {
    start: 126564,
    length: 1,
    convRule: rule14
  }, {
    start: 126567,
    length: 4,
    convRule: rule14
  }, {
    start: 126572,
    length: 7,
    convRule: rule14
  }, {
    start: 126580,
    length: 4,
    convRule: rule14
  }, {
    start: 126585,
    length: 4,
    convRule: rule14
  }, {
    start: 126590,
    length: 1,
    convRule: rule14
  }, {
    start: 126592,
    length: 10,
    convRule: rule14
  }, {
    start: 126603,
    length: 17,
    convRule: rule14
  }, {
    start: 126625,
    length: 3,
    convRule: rule14
  }, {
    start: 126629,
    length: 5,
    convRule: rule14
  }, {
    start: 126635,
    length: 17,
    convRule: rule14
  }, {
    start: 126704,
    length: 2,
    convRule: rule6
  }, {
    start: 126976,
    length: 44,
    convRule: rule13
  }, {
    start: 127024,
    length: 100,
    convRule: rule13
  }, {
    start: 127136,
    length: 15,
    convRule: rule13
  }, {
    start: 127153,
    length: 15,
    convRule: rule13
  }, {
    start: 127169,
    length: 15,
    convRule: rule13
  }, {
    start: 127185,
    length: 37,
    convRule: rule13
  }, {
    start: 127232,
    length: 13,
    convRule: rule17
  }, {
    start: 127245,
    length: 161,
    convRule: rule13
  }, {
    start: 127462,
    length: 29,
    convRule: rule13
  }, {
    start: 127504,
    length: 44,
    convRule: rule13
  }, {
    start: 127552,
    length: 9,
    convRule: rule13
  }, {
    start: 127568,
    length: 2,
    convRule: rule13
  }, {
    start: 127584,
    length: 6,
    convRule: rule13
  }, {
    start: 127744,
    length: 251,
    convRule: rule13
  }, {
    start: 127995,
    length: 5,
    convRule: rule10
  }, {
    start: 128e3,
    length: 728,
    convRule: rule13
  }, {
    start: 128736,
    length: 13,
    convRule: rule13
  }, {
    start: 128752,
    length: 13,
    convRule: rule13
  }, {
    start: 128768,
    length: 116,
    convRule: rule13
  }, {
    start: 128896,
    length: 89,
    convRule: rule13
  }, {
    start: 128992,
    length: 12,
    convRule: rule13
  }, {
    start: 129024,
    length: 12,
    convRule: rule13
  }, {
    start: 129040,
    length: 56,
    convRule: rule13
  }, {
    start: 129104,
    length: 10,
    convRule: rule13
  }, {
    start: 129120,
    length: 40,
    convRule: rule13
  }, {
    start: 129168,
    length: 30,
    convRule: rule13
  }, {
    start: 129200,
    length: 2,
    convRule: rule13
  }, {
    start: 129280,
    length: 121,
    convRule: rule13
  }, {
    start: 129402,
    length: 82,
    convRule: rule13
  }, {
    start: 129485,
    length: 135,
    convRule: rule13
  }, {
    start: 129632,
    length: 14,
    convRule: rule13
  }, {
    start: 129648,
    length: 5,
    convRule: rule13
  }, {
    start: 129656,
    length: 3,
    convRule: rule13
  }, {
    start: 129664,
    length: 7,
    convRule: rule13
  }, {
    start: 129680,
    length: 25,
    convRule: rule13
  }, {
    start: 129712,
    length: 7,
    convRule: rule13
  }, {
    start: 129728,
    length: 3,
    convRule: rule13
  }, {
    start: 129744,
    length: 7,
    convRule: rule13
  }, {
    start: 129792,
    length: 147,
    convRule: rule13
  }, {
    start: 129940,
    length: 55,
    convRule: rule13
  }, {
    start: 130032,
    length: 10,
    convRule: rule8
  }, {
    start: 131072,
    length: 42718,
    convRule: rule14
  }, {
    start: 173824,
    length: 4149,
    convRule: rule14
  }, {
    start: 177984,
    length: 222,
    convRule: rule14
  }, {
    start: 178208,
    length: 5762,
    convRule: rule14
  }, {
    start: 183984,
    length: 7473,
    convRule: rule14
  }, {
    start: 194560,
    length: 542,
    convRule: rule14
  }, {
    start: 196608,
    length: 4939,
    convRule: rule14
  }, {
    start: 917505,
    length: 1,
    convRule: rule16
  }, {
    start: 917536,
    length: 96,
    convRule: rule16
  }, {
    start: 917760,
    length: 240,
    convRule: rule92
  }, {
    start: 983040,
    length: 65534,
    convRule: rule200
  }, {
    start: 1048576,
    length: 65534,
    convRule: rule200
  }];
  var checkAttr = function(categories) {
    return function($$char3) {
      var numOfBlocks = function() {
        var $43 = $$char3 < 256;
        if ($43) {
          return numLat1Blocks;
        }
        ;
        return numBlocks;
      }();
      var maybeConversionRule = getRule(allchars)($$char3)(numOfBlocks);
      if (maybeConversionRule instanceof Nothing) {
        return false;
      }
      ;
      if (maybeConversionRule instanceof Just) {
        return isJust(elemIndex2(maybeConversionRule.value0.category)(categories));
      }
      ;
      throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5645, column 5 - line 5647, column 86): " + [maybeConversionRule.constructor.name]);
    };
  };
  var uIswalnum = /* @__PURE__ */ checkAttr([gencatLT, gencatLU, gencatLL, gencatLM, gencatLO, gencatMC, gencatME, gencatMN, gencatNO, gencatND, gencatNL]);

  // output/Data.CodePoint.Unicode/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var isDecDigit = function(c2) {
    var diff = fromEnum3(c2) - toCharCode2("0") | 0;
    return diff <= 9 && diff >= 0;
  };
  var isHexDigit = function(c2) {
    return isDecDigit(c2) || (function() {
      var diff = fromEnum3(c2) - toCharCode2("A") | 0;
      return diff <= 5 && diff >= 0;
    }() || function() {
      var diff = fromEnum3(c2) - toCharCode2("a") | 0;
      return diff <= 5 && diff >= 0;
    }());
  };
  var isAlphaNum = function($70) {
    return uIswalnum(fromEnum3($70));
  };

  // output/Data.Username/index.js
  var eq3 = /* @__PURE__ */ eq(eqCodePoint);
  var pure1 = /* @__PURE__ */ pure(applicativeNonEmptyArray);
  var bind5 = /* @__PURE__ */ bind(/* @__PURE__ */ bindExceptT(monadIdentity));
  var decode3 = /* @__PURE__ */ decode2(stringDecode);
  var lmap4 = /* @__PURE__ */ lmap(bifunctorEither);
  var toUnfoldable12 = /* @__PURE__ */ toUnfoldable1(unfoldable1NonEmptyList);
  var map14 = /* @__PURE__ */ map(functorNonEmptyList);
  var except2 = /* @__PURE__ */ except(applicativeIdentity);
  var encodeJsonUsername = encodeJsonJString;
  var decodeJsonUsername = decodeJsonString;
  var toString5 = function(v2) {
    return v2;
  };
  var showUsername = {
    show: function(username) {
      return "(Username " + (toString5(username) + ")");
    }
  };
  var parse = function(s2) {
    var isValidCodePoint = function(cp) {
      return isAlphaNum(cp) || (eq3(cp)(codePointFromChar("_")) || (eq3(cp)(codePointFromChar("-")) || eq3(cp)(codePointFromChar("."))));
    };
    var v2 = trim(s2);
    if ($$null3(v2)) {
      return new Left(pure1("Username can't be empty"));
    }
    ;
    if (any2(function($39) {
      return !isValidCodePoint($39);
    })(toCodePointArray(v2))) {
      return new Left(pure1("Username must contain only alphanumeric characters, _ and -"));
    }
    ;
    if (length5(v2) > 20) {
      return new Left(pure1("Username mustn't be longer than 20 characters"));
    }
    ;
    return new Right(v2);
  };
  var decodeUsername = {
    decode: function(f2) {
      return bind5(decode3(f2))(function() {
        var $40 = lmap4(function() {
          var $42 = map14(ForeignError.create);
          return function($43) {
            return $42(toUnfoldable12($43));
          };
        }());
        return function($41) {
          return except2($40(parse($41)));
        };
      }());
    }
  };

  // output/Auth/index.js
  var fromFoldable6 = /* @__PURE__ */ fromFoldable2(foldableNonEmptyList);
  var map15 = /* @__PURE__ */ map(functorNonEmptyList);
  var apply2 = /* @__PURE__ */ apply(/* @__PURE__ */ applyExceptT(monadIdentity));
  var map16 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
  var bind6 = /* @__PURE__ */ bind(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var decode4 = /* @__PURE__ */ decode2(decodeEmail);
  var decode1 = /* @__PURE__ */ decode2(decodeUsername);
  var map22 = /* @__PURE__ */ map(functorEither);
  var Anonymous = /* @__PURE__ */ function() {
    function Anonymous2() {
    }
    ;
    Anonymous2.value = new Anonymous2();
    return Anonymous2;
  }();
  var Authenticated = /* @__PURE__ */ function() {
    function Authenticated2(value0) {
      this.value0 = value0;
    }
    ;
    Authenticated2.create = function(value0) {
      return new Authenticated2(value0);
    };
    return Authenticated2;
  }();
  var UserDecodingError = function(x2) {
    return x2;
  };
  var showError = {
    show: function(v2) {
      return joinWith("; ")(fromFoldable6(map15(renderForeignError)(v2)));
    }
  };
  var decodeUser = {
    decode: function(v2) {
      return apply2(map16(function(v1) {
        return function(v22) {
          return {
            email: v1,
            name: v22
          };
        };
      })(bind6(readProp2("email")(v2))(decode4)))(bind6(readProp2("nickname")(v2))(decode1));
    }
  };
  var decode22 = /* @__PURE__ */ decode2(decodeUser);
  var userInfo = function(dictMonadAff) {
    var Monad0 = dictMonadAff.MonadEffect0().Monad0();
    var bind115 = bind(Monad0.Bind1());
    var pure27 = pure(Monad0.Applicative0());
    return function(dictMonadThrow) {
      var hoistError2 = hoistError(hoistErrorEither(dictMonadThrow));
      return function(dictMonadAsk) {
        var getUser2 = getUser(dictMonadAsk)(dictMonadAff);
        return bind115(isAuthenticated(dictMonadAsk)(dictMonadAff))(function(isAuthenticated2) {
          if (isAuthenticated2) {
            return bind115(getUser2)(function() {
              var $60 = hoistError2(UserDecodingError);
              var $61 = map22(Authenticated.create);
              return function($62) {
                return $60($61(runExcept(decode22($62))));
              };
            }());
          }
          ;
          return pure27(Anonymous.value);
        });
      };
    };
  };
  var token = function(dictMonadAsk) {
    var getTokenSilently2 = getTokenSilently(dictMonadAsk);
    return function(dictMonadAff) {
      return getTokenSilently2(dictMonadAff);
    };
  };

  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i3 = 0, header2; (header2 = options2.headers[i3]) != null; i3++) {
            xhr.setRequestHeader(header2.field, header2.value);
          }
        } catch (e2) {
          errback(e2);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header3) {
            return header3.length > 0;
          }).map(function(header3) {
            var i4 = header3.indexOf(":");
            return mkHeader(header3.substring(0, i4))(header3.substring(i4 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error5, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e2) {
          return cancelErrback(e2);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob4(value0) {
      this.value0 = value0;
    }
    ;
    Blob4.create = function(value0) {
      return new Blob4(value0);
    };
    return Blob4;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v2) {
    if (v2 instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v2 instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };

  // output/Affjax.RequestHeader/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value = function(v2) {
    if (v2 instanceof Accept) {
      return unwrap3(v2.value0);
    }
    ;
    if (v2 instanceof ContentType) {
      return unwrap3(v2.value0);
    }
    ;
    if (v2 instanceof RequestHeader) {
      return v2.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v2.constructor.name]);
  };
  var name2 = function(v2) {
    if (v2 instanceof Accept) {
      return "Accept";
    }
    ;
    if (v2 instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v2 instanceof RequestHeader) {
      return v2.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v2.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob3 = /* @__PURE__ */ function() {
    function Blob4(value0) {
      this.value0 = value0;
    }
    ;
    Blob4.create = function(value0) {
      return new Blob4(value0);
    };
    return Blob4;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v2) {
    if (v2 instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v2 instanceof Blob3) {
      return "blob";
    }
    ;
    if (v2 instanceof Document2) {
      return "document";
    }
    ;
    if (v2 instanceof Json2) {
      return "text";
    }
    ;
    if (v2 instanceof $$String2) {
      return "text";
    }
    ;
    if (v2 instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v2.constructor.name]);
  };
  var toMediaType2 = function(v2) {
    if (v2 instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json = /* @__PURE__ */ function() {
    return new Json2(identity10);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity10);
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail5, succ2, s2) {
    try {
      return succ2(JSON.parse(s2));
    } catch (e2) {
      return fail5(e2.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j2) {
    return _jsonParser(Left.create, Right.create, j2);
  };

  // output/JSURI/foreign.js
  function toRFC3896(input3) {
    return input3.replace(/[!'()*]/g, function(c2) {
      return "%" + c2.charCodeAt(0).toString(16);
    });
  }
  var _encodeURIComponent = function encode2(fail5, succeed, input3) {
    try {
      return succeed(toRFC3896(encodeURIComponent(input3)));
    } catch (err) {
      return fail5(err);
    }
  };
  var _encodeFormURLComponent = function encode3(fail5, succeed, input3) {
    try {
      return succeed(toRFC3896(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail5(err);
    }
  };
  function _decodeURIComponent(fail5, succeed, input3) {
    try {
      return succeed(decodeURIComponent(input3));
    } catch (err) {
      return fail5(err);
    }
  }

  // output/JSURI/index.js
  var $$encodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeURIComponent)($$const(Nothing.value))(Just.create);
  }();
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();
  var $$decodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_decodeURIComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var apply3 = /* @__PURE__ */ apply(applyMaybe);
  var map17 = /* @__PURE__ */ map(functorMaybe);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray3 = function(v2) {
    return v2;
  };
  var encode4 = /* @__PURE__ */ function() {
    var encodePart = function(v2) {
      if (v2.value1 instanceof Nothing) {
        return encodeFormURLComponent(v2.value0);
      }
      ;
      if (v2.value1 instanceof Just) {
        return apply3(map17(function(key2) {
          return function(val) {
            return key2 + ("=" + val);
          };
        })(encodeFormURLComponent(v2.value0)))(encodeFormURLComponent(v2.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v2.constructor.name]);
    };
    var $37 = map17(joinWith("&"));
    var $38 = traverse2(encodePart);
    return function($39) {
      return $37($38(toArray3($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v2) {
    return v2;
  };
  var showMethod = {
    show: function(v2) {
      if (v2 instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v2 instanceof GET) {
        return "GET";
      }
      ;
      if (v2 instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v2 instanceof POST) {
        return "POST";
      }
      ;
      if (v2 instanceof PUT) {
        return "PUT";
      }
      ;
      if (v2 instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v2 instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v2 instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v2 instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v2 instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v2 instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v2 instanceof COPY) {
        return "COPY";
      }
      ;
      if (v2 instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v2 instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v2 instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v2 instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v2.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Data.Nullable/foreign.js
  var nullImpl2 = null;
  function nullable(a3, r2, f2) {
    return a3 == null ? r2 : f2(a3);
  }
  function notNull(x2) {
    return x2;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl2)(notNull);
  var toMaybe = function(n2) {
    return nullable(n2, Nothing.value, Just.create);
  };

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v2) {
    return makeAff(function(k2) {
      return function __do2() {
        var v1 = v2(function($9) {
          return k2(Left.create($9))();
        }, function($10) {
          return k2(Right.create($10))();
        });
        return function(e2) {
          return makeAff(function(k22) {
            return function __do3() {
              v1(e2, function($11) {
                return k22(Left.create($11))();
              }, function($12) {
                return k22(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Affjax/index.js
  var pure4 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail3 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged3 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt3 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map18 = /* @__PURE__ */ map(functorMaybe);
  var any3 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq4 = /* @__PURE__ */ eq(eqString);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map19 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try4 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v3) {
        if (v3 === "") {
          return pure4(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail3(ForeignError.create($74));
        })(pure4)(jsonParser(v3));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged3("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob3) {
          return unsafeReadTagged3("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x2) {
            return alt3(unsafeReadTagged3("Document")(x2))(alt3(unsafeReadTagged3("XMLDocument")(x2))(unsafeReadTagged3("HTMLDocument")(x2)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped3(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged3("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged3("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure4(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v3) {
        if (v3 instanceof ArrayView) {
          return new Right(v3.value0(unsafeToForeign));
        }
        ;
        if (v3 instanceof Blob2) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof Document) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof $$String) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof FormData) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map18(unsafeToForeign)(encode4(v3.value0)));
        }
        ;
        if (v3 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v3.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v3.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any3(on2(eq4)(name2)(mh.value0))(hs)) {
            return snoc2(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map18(ContentType.create)(bindFlipped4(toMediaType)(reqContent)))(addHeader(map18(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v3) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map19(function(h7) {
            return {
              field: name2(h7),
              value: value(h7)
            };
          })(headers(req.content)),
          content: v3,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map18(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try4(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v3) {
          if (v3 instanceof Right) {
            var v1 = runExcept(fromResponse(v3.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head(v1.value0), v3.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                body: v1.value0,
                headers: v3.value0.headers,
                status: v3.value0.status,
                statusText: v3.value0.statusText
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v3 instanceof Left) {
            return new Left(function() {
              var message2 = message(v3.value0);
              var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v3.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v3.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v2 = extractContent(req.content.value0);
        if (v2 instanceof Right) {
          return send(toNullable(new Just(v2.value0)));
        }
        ;
        if (v2 instanceof Left) {
          return pure12(new Left(new RequestContentError(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v2.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v2) {
    if (v2 instanceof RequestContentError) {
      return "There was a problem with the request content: " + v2.value0;
    }
    ;
    if (v2 instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v2.value0);
    }
    ;
    if (v2 instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v2 instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v2 instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v2.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v2.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();

  // output/Affjax.StatusCode/index.js
  var show5 = /* @__PURE__ */ show(showInt);
  var showStatusCode = {
    show: function(v2) {
      return "(StatusCode " + (show5(v2) + ")");
    }
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url2) {
      return url2 || "/";
    }
  };

  // output/Affjax.Web/index.js
  var request2 = /* @__PURE__ */ request(driver);

  // output/Chat.Api.Http/index.js
  var UserAction = /* @__PURE__ */ function() {
    function UserAction2() {
    }
    ;
    UserAction2.value = new UserAction2();
    return UserAction2;
  }();

  // output/Chat.Presence/index.js
  var bind7 = /* @__PURE__ */ bind(bindEither);
  var decodeJson2 = /* @__PURE__ */ decodeJson(decodeJsonString);
  var Online = /* @__PURE__ */ function() {
    function Online2() {
    }
    ;
    Online2.value = new Online2();
    return Online2;
  }();
  var Away = /* @__PURE__ */ function() {
    function Away2() {
    }
    ;
    Away2.value = new Away2();
    return Away2;
  }();
  var Offline = /* @__PURE__ */ function() {
    function Offline2() {
    }
    ;
    Offline2.value = new Offline2();
    return Offline2;
  }();
  var eqPresence = {
    eq: function(x2) {
      return function(y2) {
        if (x2 instanceof Online && y2 instanceof Online) {
          return true;
        }
        ;
        if (x2 instanceof Away && y2 instanceof Away) {
          return true;
        }
        ;
        if (x2 instanceof Offline && y2 instanceof Offline) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordPresence = {
    compare: function(x2) {
      return function(y2) {
        if (x2 instanceof Online && y2 instanceof Online) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Online) {
          return LT.value;
        }
        ;
        if (y2 instanceof Online) {
          return GT.value;
        }
        ;
        if (x2 instanceof Away && y2 instanceof Away) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Away) {
          return LT.value;
        }
        ;
        if (y2 instanceof Away) {
          return GT.value;
        }
        ;
        if (x2 instanceof Offline && y2 instanceof Offline) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Chat.Presence (line 0, column 0 - line 0, column 0): " + [x2.constructor.name, y2.constructor.name]);
      };
    },
    Eq0: function() {
      return eqPresence;
    }
  };
  var parse2 = function(v2) {
    if (v2 === "Online") {
      return new Just(Online.value);
    }
    ;
    if (v2 === "Away") {
      return new Just(Away.value);
    }
    ;
    if (v2 === "Offline") {
      return new Just(Offline.value);
    }
    ;
    return Nothing.value;
  };
  var decodeJsonPresence = {
    decodeJson: function(j2) {
      return bind7(decodeJson2(j2))(function() {
        var $35 = note(new UnexpectedValue(j2));
        return function($36) {
          return $35(parse2($36));
        };
      }());
    }
  };

  // output/Data.Date/foreign.js
  var createDate = function(y2, m2, d2) {
    var date2 = new Date(Date.UTC(y2, m2, d2));
    if (y2 >= 0 && y2 < 100) {
      date2.setUTCFullYear(y2);
    }
    return date2;
  };
  function canonicalDateImpl(ctor, y2, m2, d2) {
    var date2 = createDate(y2, m2 - 1, d2);
    return ctor(date2.getUTCFullYear())(date2.getUTCMonth() + 1)(date2.getUTCDate());
  }
  function calcWeekday(y2, m2, d2) {
    return createDate(y2, m2 - 1, d2).getUTCDay();
  }

  // output/Data.Date.Component/index.js
  var $runtime_lazy4 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var show6 = /* @__PURE__ */ show(showInt);
  var Monday = /* @__PURE__ */ function() {
    function Monday2() {
    }
    ;
    Monday2.value = new Monday2();
    return Monday2;
  }();
  var Tuesday = /* @__PURE__ */ function() {
    function Tuesday2() {
    }
    ;
    Tuesday2.value = new Tuesday2();
    return Tuesday2;
  }();
  var Wednesday = /* @__PURE__ */ function() {
    function Wednesday2() {
    }
    ;
    Wednesday2.value = new Wednesday2();
    return Wednesday2;
  }();
  var Thursday = /* @__PURE__ */ function() {
    function Thursday2() {
    }
    ;
    Thursday2.value = new Thursday2();
    return Thursday2;
  }();
  var Friday = /* @__PURE__ */ function() {
    function Friday2() {
    }
    ;
    Friday2.value = new Friday2();
    return Friday2;
  }();
  var Saturday = /* @__PURE__ */ function() {
    function Saturday2() {
    }
    ;
    Saturday2.value = new Saturday2();
    return Saturday2;
  }();
  var Sunday = /* @__PURE__ */ function() {
    function Sunday2() {
    }
    ;
    Sunday2.value = new Sunday2();
    return Sunday2;
  }();
  var January = /* @__PURE__ */ function() {
    function January2() {
    }
    ;
    January2.value = new January2();
    return January2;
  }();
  var February = /* @__PURE__ */ function() {
    function February2() {
    }
    ;
    February2.value = new February2();
    return February2;
  }();
  var March = /* @__PURE__ */ function() {
    function March2() {
    }
    ;
    March2.value = new March2();
    return March2;
  }();
  var April = /* @__PURE__ */ function() {
    function April2() {
    }
    ;
    April2.value = new April2();
    return April2;
  }();
  var May = /* @__PURE__ */ function() {
    function May2() {
    }
    ;
    May2.value = new May2();
    return May2;
  }();
  var June = /* @__PURE__ */ function() {
    function June2() {
    }
    ;
    June2.value = new June2();
    return June2;
  }();
  var July = /* @__PURE__ */ function() {
    function July2() {
    }
    ;
    July2.value = new July2();
    return July2;
  }();
  var August = /* @__PURE__ */ function() {
    function August2() {
    }
    ;
    August2.value = new August2();
    return August2;
  }();
  var September = /* @__PURE__ */ function() {
    function September2() {
    }
    ;
    September2.value = new September2();
    return September2;
  }();
  var October = /* @__PURE__ */ function() {
    function October2() {
    }
    ;
    October2.value = new October2();
    return October2;
  }();
  var November = /* @__PURE__ */ function() {
    function November2() {
    }
    ;
    November2.value = new November2();
    return November2;
  }();
  var December = /* @__PURE__ */ function() {
    function December2() {
    }
    ;
    December2.value = new December2();
    return December2;
  }();
  var showYear = {
    show: function(v2) {
      return "(Year " + (show6(v2) + ")");
    }
  };
  var showWeekday = {
    show: function(v2) {
      if (v2 instanceof Monday) {
        return "Monday";
      }
      ;
      if (v2 instanceof Tuesday) {
        return "Tuesday";
      }
      ;
      if (v2 instanceof Wednesday) {
        return "Wednesday";
      }
      ;
      if (v2 instanceof Thursday) {
        return "Thursday";
      }
      ;
      if (v2 instanceof Friday) {
        return "Friday";
      }
      ;
      if (v2 instanceof Saturday) {
        return "Saturday";
      }
      ;
      if (v2 instanceof Sunday) {
        return "Sunday";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [v2.constructor.name]);
    }
  };
  var showMonth = {
    show: function(v2) {
      if (v2 instanceof January) {
        return "January";
      }
      ;
      if (v2 instanceof February) {
        return "February";
      }
      ;
      if (v2 instanceof March) {
        return "March";
      }
      ;
      if (v2 instanceof April) {
        return "April";
      }
      ;
      if (v2 instanceof May) {
        return "May";
      }
      ;
      if (v2 instanceof June) {
        return "June";
      }
      ;
      if (v2 instanceof July) {
        return "July";
      }
      ;
      if (v2 instanceof August) {
        return "August";
      }
      ;
      if (v2 instanceof September) {
        return "September";
      }
      ;
      if (v2 instanceof October) {
        return "October";
      }
      ;
      if (v2 instanceof November) {
        return "November";
      }
      ;
      if (v2 instanceof December) {
        return "December";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v2.constructor.name]);
    }
  };
  var showDay = {
    show: function(v2) {
      return "(Day " + (show6(v2) + ")");
    }
  };
  var ordYear = ordInt;
  var ordDay = ordInt;
  var eqWeekday = {
    eq: function(x2) {
      return function(y2) {
        if (x2 instanceof Monday && y2 instanceof Monday) {
          return true;
        }
        ;
        if (x2 instanceof Tuesday && y2 instanceof Tuesday) {
          return true;
        }
        ;
        if (x2 instanceof Wednesday && y2 instanceof Wednesday) {
          return true;
        }
        ;
        if (x2 instanceof Thursday && y2 instanceof Thursday) {
          return true;
        }
        ;
        if (x2 instanceof Friday && y2 instanceof Friday) {
          return true;
        }
        ;
        if (x2 instanceof Saturday && y2 instanceof Saturday) {
          return true;
        }
        ;
        if (x2 instanceof Sunday && y2 instanceof Sunday) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordWeekday = {
    compare: function(x2) {
      return function(y2) {
        if (x2 instanceof Monday && y2 instanceof Monday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Monday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Monday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Tuesday && y2 instanceof Tuesday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Tuesday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Tuesday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Wednesday && y2 instanceof Wednesday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Wednesday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Wednesday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Thursday && y2 instanceof Thursday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Thursday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Thursday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Friday && y2 instanceof Friday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Friday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Friday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Saturday && y2 instanceof Saturday) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Saturday) {
          return LT.value;
        }
        ;
        if (y2 instanceof Saturday) {
          return GT.value;
        }
        ;
        if (x2 instanceof Sunday && y2 instanceof Sunday) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x2.constructor.name, y2.constructor.name]);
      };
    },
    Eq0: function() {
      return eqWeekday;
    }
  };
  var eqMonth = {
    eq: function(x2) {
      return function(y2) {
        if (x2 instanceof January && y2 instanceof January) {
          return true;
        }
        ;
        if (x2 instanceof February && y2 instanceof February) {
          return true;
        }
        ;
        if (x2 instanceof March && y2 instanceof March) {
          return true;
        }
        ;
        if (x2 instanceof April && y2 instanceof April) {
          return true;
        }
        ;
        if (x2 instanceof May && y2 instanceof May) {
          return true;
        }
        ;
        if (x2 instanceof June && y2 instanceof June) {
          return true;
        }
        ;
        if (x2 instanceof July && y2 instanceof July) {
          return true;
        }
        ;
        if (x2 instanceof August && y2 instanceof August) {
          return true;
        }
        ;
        if (x2 instanceof September && y2 instanceof September) {
          return true;
        }
        ;
        if (x2 instanceof October && y2 instanceof October) {
          return true;
        }
        ;
        if (x2 instanceof November && y2 instanceof November) {
          return true;
        }
        ;
        if (x2 instanceof December && y2 instanceof December) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordMonth = {
    compare: function(x2) {
      return function(y2) {
        if (x2 instanceof January && y2 instanceof January) {
          return EQ.value;
        }
        ;
        if (x2 instanceof January) {
          return LT.value;
        }
        ;
        if (y2 instanceof January) {
          return GT.value;
        }
        ;
        if (x2 instanceof February && y2 instanceof February) {
          return EQ.value;
        }
        ;
        if (x2 instanceof February) {
          return LT.value;
        }
        ;
        if (y2 instanceof February) {
          return GT.value;
        }
        ;
        if (x2 instanceof March && y2 instanceof March) {
          return EQ.value;
        }
        ;
        if (x2 instanceof March) {
          return LT.value;
        }
        ;
        if (y2 instanceof March) {
          return GT.value;
        }
        ;
        if (x2 instanceof April && y2 instanceof April) {
          return EQ.value;
        }
        ;
        if (x2 instanceof April) {
          return LT.value;
        }
        ;
        if (y2 instanceof April) {
          return GT.value;
        }
        ;
        if (x2 instanceof May && y2 instanceof May) {
          return EQ.value;
        }
        ;
        if (x2 instanceof May) {
          return LT.value;
        }
        ;
        if (y2 instanceof May) {
          return GT.value;
        }
        ;
        if (x2 instanceof June && y2 instanceof June) {
          return EQ.value;
        }
        ;
        if (x2 instanceof June) {
          return LT.value;
        }
        ;
        if (y2 instanceof June) {
          return GT.value;
        }
        ;
        if (x2 instanceof July && y2 instanceof July) {
          return EQ.value;
        }
        ;
        if (x2 instanceof July) {
          return LT.value;
        }
        ;
        if (y2 instanceof July) {
          return GT.value;
        }
        ;
        if (x2 instanceof August && y2 instanceof August) {
          return EQ.value;
        }
        ;
        if (x2 instanceof August) {
          return LT.value;
        }
        ;
        if (y2 instanceof August) {
          return GT.value;
        }
        ;
        if (x2 instanceof September && y2 instanceof September) {
          return EQ.value;
        }
        ;
        if (x2 instanceof September) {
          return LT.value;
        }
        ;
        if (y2 instanceof September) {
          return GT.value;
        }
        ;
        if (x2 instanceof October && y2 instanceof October) {
          return EQ.value;
        }
        ;
        if (x2 instanceof October) {
          return LT.value;
        }
        ;
        if (y2 instanceof October) {
          return GT.value;
        }
        ;
        if (x2 instanceof November && y2 instanceof November) {
          return EQ.value;
        }
        ;
        if (x2 instanceof November) {
          return LT.value;
        }
        ;
        if (y2 instanceof November) {
          return GT.value;
        }
        ;
        if (x2 instanceof December && y2 instanceof December) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x2.constructor.name, y2.constructor.name]);
      };
    },
    Eq0: function() {
      return eqMonth;
    }
  };
  var boundedYear = /* @__PURE__ */ function() {
    return {
      bottom: -271820 | 0,
      top: 275759,
      Ord0: function() {
        return ordYear;
      }
    };
  }();
  var boundedWeekday = /* @__PURE__ */ function() {
    return {
      bottom: Monday.value,
      top: Sunday.value,
      Ord0: function() {
        return ordWeekday;
      }
    };
  }();
  var boundedMonth = /* @__PURE__ */ function() {
    return {
      bottom: January.value,
      top: December.value,
      Ord0: function() {
        return ordMonth;
      }
    };
  }();
  var boundedEnumYear = {
    cardinality: 547580,
    toEnum: function(n2) {
      if (n2 >= (-271820 | 0) && n2 <= 275759) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedYear;
    },
    Enum1: function() {
      return $lazy_enumYear(0);
    }
  };
  var $lazy_enumYear = /* @__PURE__ */ $runtime_lazy4("enumYear", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $55 = toEnum(boundedEnumYear);
        var $56 = fromEnum(boundedEnumYear);
        return function($57) {
          return $55(function(v2) {
            return v2 + 1 | 0;
          }($56($57)));
        };
      }(),
      pred: function() {
        var $58 = toEnum(boundedEnumYear);
        var $59 = fromEnum(boundedEnumYear);
        return function($60) {
          return $58(function(v2) {
            return v2 - 1 | 0;
          }($59($60)));
        };
      }(),
      Ord0: function() {
        return ordYear;
      }
    };
  });
  var boundedEnumWeekday = {
    cardinality: 7,
    toEnum: function(v2) {
      if (v2 === 1) {
        return new Just(Monday.value);
      }
      ;
      if (v2 === 2) {
        return new Just(Tuesday.value);
      }
      ;
      if (v2 === 3) {
        return new Just(Wednesday.value);
      }
      ;
      if (v2 === 4) {
        return new Just(Thursday.value);
      }
      ;
      if (v2 === 5) {
        return new Just(Friday.value);
      }
      ;
      if (v2 === 6) {
        return new Just(Saturday.value);
      }
      ;
      if (v2 === 7) {
        return new Just(Sunday.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v2) {
      if (v2 instanceof Monday) {
        return 1;
      }
      ;
      if (v2 instanceof Tuesday) {
        return 2;
      }
      ;
      if (v2 instanceof Wednesday) {
        return 3;
      }
      ;
      if (v2 instanceof Thursday) {
        return 4;
      }
      ;
      if (v2 instanceof Friday) {
        return 5;
      }
      ;
      if (v2 instanceof Saturday) {
        return 6;
      }
      ;
      if (v2 instanceof Sunday) {
        return 7;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [v2.constructor.name]);
    },
    Bounded0: function() {
      return boundedWeekday;
    },
    Enum1: function() {
      return $lazy_enumWeekday(0);
    }
  };
  var $lazy_enumWeekday = /* @__PURE__ */ $runtime_lazy4("enumWeekday", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $61 = toEnum(boundedEnumWeekday);
        var $62 = fromEnum(boundedEnumWeekday);
        return function($63) {
          return $61(function(v2) {
            return v2 + 1 | 0;
          }($62($63)));
        };
      }(),
      pred: function() {
        var $64 = toEnum(boundedEnumWeekday);
        var $65 = fromEnum(boundedEnumWeekday);
        return function($66) {
          return $64(function(v2) {
            return v2 - 1 | 0;
          }($65($66)));
        };
      }(),
      Ord0: function() {
        return ordWeekday;
      }
    };
  });
  var boundedEnumMonth = {
    cardinality: 12,
    toEnum: function(v2) {
      if (v2 === 1) {
        return new Just(January.value);
      }
      ;
      if (v2 === 2) {
        return new Just(February.value);
      }
      ;
      if (v2 === 3) {
        return new Just(March.value);
      }
      ;
      if (v2 === 4) {
        return new Just(April.value);
      }
      ;
      if (v2 === 5) {
        return new Just(May.value);
      }
      ;
      if (v2 === 6) {
        return new Just(June.value);
      }
      ;
      if (v2 === 7) {
        return new Just(July.value);
      }
      ;
      if (v2 === 8) {
        return new Just(August.value);
      }
      ;
      if (v2 === 9) {
        return new Just(September.value);
      }
      ;
      if (v2 === 10) {
        return new Just(October.value);
      }
      ;
      if (v2 === 11) {
        return new Just(November.value);
      }
      ;
      if (v2 === 12) {
        return new Just(December.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v2) {
      if (v2 instanceof January) {
        return 1;
      }
      ;
      if (v2 instanceof February) {
        return 2;
      }
      ;
      if (v2 instanceof March) {
        return 3;
      }
      ;
      if (v2 instanceof April) {
        return 4;
      }
      ;
      if (v2 instanceof May) {
        return 5;
      }
      ;
      if (v2 instanceof June) {
        return 6;
      }
      ;
      if (v2 instanceof July) {
        return 7;
      }
      ;
      if (v2 instanceof August) {
        return 8;
      }
      ;
      if (v2 instanceof September) {
        return 9;
      }
      ;
      if (v2 instanceof October) {
        return 10;
      }
      ;
      if (v2 instanceof November) {
        return 11;
      }
      ;
      if (v2 instanceof December) {
        return 12;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v2.constructor.name]);
    },
    Bounded0: function() {
      return boundedMonth;
    },
    Enum1: function() {
      return $lazy_enumMonth(0);
    }
  };
  var $lazy_enumMonth = /* @__PURE__ */ $runtime_lazy4("enumMonth", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $67 = toEnum(boundedEnumMonth);
        var $68 = fromEnum(boundedEnumMonth);
        return function($69) {
          return $67(function(v2) {
            return v2 + 1 | 0;
          }($68($69)));
        };
      }(),
      pred: function() {
        var $70 = toEnum(boundedEnumMonth);
        var $71 = fromEnum(boundedEnumMonth);
        return function($72) {
          return $70(function(v2) {
            return v2 - 1 | 0;
          }($71($72)));
        };
      }(),
      Ord0: function() {
        return ordMonth;
      }
    };
  });
  var boundedDay = {
    bottom: 1,
    top: 31,
    Ord0: function() {
      return ordDay;
    }
  };
  var boundedEnumDay = {
    cardinality: 31,
    toEnum: function(n2) {
      if (n2 >= 1 && n2 <= 31) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedDay;
    },
    Enum1: function() {
      return $lazy_enumDay(0);
    }
  };
  var $lazy_enumDay = /* @__PURE__ */ $runtime_lazy4("enumDay", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $73 = toEnum(boundedEnumDay);
        var $74 = fromEnum(boundedEnumDay);
        return function($75) {
          return $73(function(v2) {
            return v2 + 1 | 0;
          }($74($75)));
        };
      }(),
      pred: function() {
        var $76 = toEnum(boundedEnumDay);
        var $77 = fromEnum(boundedEnumDay);
        return function($78) {
          return $76(function(v2) {
            return v2 - 1 | 0;
          }($77($78)));
        };
      }(),
      Ord0: function() {
        return ordDay;
      }
    };
  });

  // output/Data.Date/index.js
  var fromEnum4 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromJust7 = /* @__PURE__ */ fromJust();
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumWeekday);
  var show7 = /* @__PURE__ */ show(showYear);
  var show13 = /* @__PURE__ */ show(showMonth);
  var show22 = /* @__PURE__ */ show(showDay);
  var toEnum22 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var $$Date = /* @__PURE__ */ function() {
    function $$Date2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    $$Date2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new $$Date2(value0, value1, value22);
        };
      };
    };
    return $$Date2;
  }();
  var year = function(v2) {
    return v2.value0;
  };
  var weekday = function(v2) {
    var n2 = calcWeekday(v2.value0, fromEnum4(v2.value1), v2.value2);
    var $86 = n2 === 0;
    if ($86) {
      return fromJust7(toEnum2(7));
    }
    ;
    return fromJust7(toEnum2(n2));
  };
  var showDate = {
    show: function(v2) {
      return "(Date " + (show7(v2.value0) + (" " + (show13(v2.value1) + (" " + (show22(v2.value2) + ")")))));
    }
  };
  var month = function(v2) {
    return v2.value1;
  };
  var day = function(v2) {
    return v2.value2;
  };
  var canonicalDate = function(y2) {
    return function(m2) {
      return function(d2) {
        var mkDate = function(y$prime) {
          return function(m$prime) {
            return function(d$prime) {
              return new $$Date(y$prime, fromJust7(toEnum22(m$prime)), d$prime);
            };
          };
        };
        return canonicalDateImpl(mkDate, y2, fromEnum4(m2), d2);
      };
    };
  };

  // output/Data.Time.Component/index.js
  var $runtime_lazy5 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var show8 = /* @__PURE__ */ show(showInt);
  var showSecond = {
    show: function(v2) {
      return "(Second " + (show8(v2) + ")");
    }
  };
  var showMinute = {
    show: function(v2) {
      return "(Minute " + (show8(v2) + ")");
    }
  };
  var showMillisecond = {
    show: function(v2) {
      return "(Millisecond " + (show8(v2) + ")");
    }
  };
  var showHour = {
    show: function(v2) {
      return "(Hour " + (show8(v2) + ")");
    }
  };
  var ordSecond = ordInt;
  var ordMinute = ordInt;
  var ordMillisecond = ordInt;
  var ordHour = ordInt;
  var boundedSecond = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordSecond;
    }
  };
  var boundedMinute = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordMinute;
    }
  };
  var boundedMillisecond = {
    bottom: 0,
    top: 999,
    Ord0: function() {
      return ordMillisecond;
    }
  };
  var boundedHour = {
    bottom: 0,
    top: 23,
    Ord0: function() {
      return ordHour;
    }
  };
  var boundedEnumSecond = {
    cardinality: 60,
    toEnum: function(n2) {
      if (n2 >= 0 && n2 <= 59) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedSecond;
    },
    Enum1: function() {
      return $lazy_enumSecond(0);
    }
  };
  var $lazy_enumSecond = /* @__PURE__ */ $runtime_lazy5("enumSecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $36 = toEnum(boundedEnumSecond);
        var $37 = fromEnum(boundedEnumSecond);
        return function($38) {
          return $36(function(v2) {
            return v2 + 1 | 0;
          }($37($38)));
        };
      }(),
      pred: function() {
        var $39 = toEnum(boundedEnumSecond);
        var $40 = fromEnum(boundedEnumSecond);
        return function($41) {
          return $39(function(v2) {
            return v2 - 1 | 0;
          }($40($41)));
        };
      }(),
      Ord0: function() {
        return ordSecond;
      }
    };
  });
  var boundedEnumMinute = {
    cardinality: 60,
    toEnum: function(n2) {
      if (n2 >= 0 && n2 <= 59) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedMinute;
    },
    Enum1: function() {
      return $lazy_enumMinute(0);
    }
  };
  var $lazy_enumMinute = /* @__PURE__ */ $runtime_lazy5("enumMinute", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $42 = toEnum(boundedEnumMinute);
        var $43 = fromEnum(boundedEnumMinute);
        return function($44) {
          return $42(function(v2) {
            return v2 + 1 | 0;
          }($43($44)));
        };
      }(),
      pred: function() {
        var $45 = toEnum(boundedEnumMinute);
        var $46 = fromEnum(boundedEnumMinute);
        return function($47) {
          return $45(function(v2) {
            return v2 - 1 | 0;
          }($46($47)));
        };
      }(),
      Ord0: function() {
        return ordMinute;
      }
    };
  });
  var boundedEnumMillisecond = {
    cardinality: 1e3,
    toEnum: function(n2) {
      if (n2 >= 0 && n2 <= 999) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedMillisecond;
    },
    Enum1: function() {
      return $lazy_enumMillisecond(0);
    }
  };
  var $lazy_enumMillisecond = /* @__PURE__ */ $runtime_lazy5("enumMillisecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $48 = toEnum(boundedEnumMillisecond);
        var $49 = fromEnum(boundedEnumMillisecond);
        return function($50) {
          return $48(function(v2) {
            return v2 + 1 | 0;
          }($49($50)));
        };
      }(),
      pred: function() {
        var $51 = toEnum(boundedEnumMillisecond);
        var $52 = fromEnum(boundedEnumMillisecond);
        return function($53) {
          return $51(function(v2) {
            return v2 - 1 | 0;
          }($52($53)));
        };
      }(),
      Ord0: function() {
        return ordMillisecond;
      }
    };
  });
  var boundedEnumHour = {
    cardinality: 24,
    toEnum: function(n2) {
      if (n2 >= 0 && n2 <= 23) {
        return new Just(n2);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [n2.constructor.name]);
    },
    fromEnum: function(v2) {
      return v2;
    },
    Bounded0: function() {
      return boundedHour;
    },
    Enum1: function() {
      return $lazy_enumHour(0);
    }
  };
  var $lazy_enumHour = /* @__PURE__ */ $runtime_lazy5("enumHour", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $54 = toEnum(boundedEnumHour);
        var $55 = fromEnum(boundedEnumHour);
        return function($56) {
          return $54(function(v2) {
            return v2 + 1 | 0;
          }($55($56)));
        };
      }(),
      pred: function() {
        var $57 = toEnum(boundedEnumHour);
        var $58 = fromEnum(boundedEnumHour);
        return function($59) {
          return $57(function(v2) {
            return v2 - 1 | 0;
          }($58($59)));
        };
      }(),
      Ord0: function() {
        return ordHour;
      }
    };
  });

  // output/Data.Time/index.js
  var show9 = /* @__PURE__ */ show(showHour);
  var show14 = /* @__PURE__ */ show(showMinute);
  var show23 = /* @__PURE__ */ show(showSecond);
  var show32 = /* @__PURE__ */ show(showMillisecond);
  var Time = /* @__PURE__ */ function() {
    function Time2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Time2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Time2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Time2;
  }();
  var showTime = {
    show: function(v2) {
      return "(Time " + (show9(v2.value0) + (" " + (show14(v2.value1) + (" " + (show23(v2.value2) + (" " + (show32(v2.value3) + ")")))))));
    }
  };
  var second = function(v2) {
    return v2.value2;
  };
  var minute = function(v2) {
    return v2.value1;
  };
  var millisecond = function(v2) {
    return v2.value3;
  };
  var hour = function(v2) {
    return v2.value0;
  };

  // output/Data.DateTime/index.js
  var show10 = /* @__PURE__ */ show(showDate);
  var show15 = /* @__PURE__ */ show(showTime);
  var DateTime = /* @__PURE__ */ function() {
    function DateTime2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    DateTime2.create = function(value0) {
      return function(value1) {
        return new DateTime2(value0, value1);
      };
    };
    return DateTime2;
  }();
  var showDateTime = {
    show: function(v2) {
      return "(DateTime " + (show10(v2.value0) + (" " + (show15(v2.value1) + ")")));
    }
  };

  // output/Data.Hashing/foreign.js
  var import_md5 = __toESM(require_md5(), 1);
  var { md5 } = import_md5.default;

  // output/Data.Hashing/index.js
  var hash = /* @__PURE__ */ $$const("mocked");

  // output/Data.DateTime.Instant/foreign.js
  var createDateTime = function(y2, m2, d2, h7, mi2, s2, ms) {
    var dateTime3 = new Date(Date.UTC(y2, m2, d2, h7, mi2, s2, ms));
    if (y2 >= 0 && y2 < 100) {
      dateTime3.setUTCFullYear(y2);
    }
    return dateTime3;
  };
  function fromDateTimeImpl(y2, mo2, d2, h7, mi2, s2, ms) {
    return createDateTime(y2, mo2 - 1, d2, h7, mi2, s2, ms).getTime();
  }
  function toDateTimeImpl(ctor) {
    return function(instant2) {
      var dt3 = new Date(instant2);
      return ctor(dt3.getUTCFullYear())(dt3.getUTCMonth() + 1)(dt3.getUTCDate())(dt3.getUTCHours())(dt3.getUTCMinutes())(dt3.getUTCSeconds())(dt3.getUTCMilliseconds());
    };
  }

  // output/Data.DateTime.Instant/index.js
  var fromJust8 = /* @__PURE__ */ fromJust();
  var toEnum3 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var fromEnum5 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var unInstant = function(v2) {
    return v2;
  };
  var toDateTime = /* @__PURE__ */ function() {
    var mkDateTime = function(y2) {
      return function(mo2) {
        return function(d2) {
          return function(h7) {
            return function(mi2) {
              return function(s2) {
                return function(ms) {
                  return new DateTime(canonicalDate(y2)(fromJust8(toEnum3(mo2)))(d2), new Time(h7, mi2, s2, ms));
                };
              };
            };
          };
        };
      };
    };
    return toDateTimeImpl(mkDateTime);
  }();
  var instant = function(v2) {
    if (v2 >= -86399778816e5 && v2 <= 8639977881599999) {
      return new Just(v2);
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.DateTime.Instant (line 44, column 1 - line 44, column 41): " + [v2.constructor.name]);
  };
  var fromDateTime = function(v2) {
    return fromDateTimeImpl(year(v2.value0), fromEnum5(month(v2.value0)), day(v2.value0), hour(v2.value1), minute(v2.value1), second(v2.value1), millisecond(v2.value1));
  };

  // output/Data.String.NonEmpty.CodePoints/index.js
  var fromNonEmptyString = function(v2) {
    return v2;
  };
  var length7 = function($30) {
    return length5(fromNonEmptyString($30));
  };

  // output/Data.Message/index.js
  var authorIsSymbol = {
    reflectSymbol: function() {
      return "author";
    }
  };
  var textIsSymbol = {
    reflectSymbol: function() {
      return "text";
    }
  };
  var pure5 = /* @__PURE__ */ pure(applicativeNonEmptyArray);
  var bind8 = /* @__PURE__ */ bind(bindEither);
  var created_atIsSymbol = {
    reflectSymbol: function() {
      return "created_at";
    }
  };
  var decodeJson3 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonUsername))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonNumber))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(gDecodeJsonNil)(textIsSymbol)()())(created_atIsSymbol)()())(authorIsSymbol)()())());
  var pure13 = /* @__PURE__ */ pure(applicativeEither);
  var bind12 = /* @__PURE__ */ bind(bindMaybe);
  var map20 = /* @__PURE__ */ map(functorMaybe);
  var encodeJson2 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(encodeJsonUsername)(/* @__PURE__ */ gEncodeJsonCons(encodeJsonJNumber)(/* @__PURE__ */ gEncodeJsonCons(encodeJsonJString)(/* @__PURE__ */ gEncodeJsonCons(encodeNonEmptyString2)(gEncodeJsonNil)(textIsSymbol)())({
    reflectSymbol: function() {
      return "hash";
    }
  })())(created_atIsSymbol)())(authorIsSymbol)())());
  var show11 = /* @__PURE__ */ show(showUsername);
  var show16 = /* @__PURE__ */ show(showNonEmptyString);
  var show24 = /* @__PURE__ */ show(showDateTime);
  var WithCursor = /* @__PURE__ */ function() {
    function WithCursor2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    WithCursor2.create = function(value0) {
      return function(value1) {
        return new WithCursor2(value0, value1);
      };
    };
    return WithCursor2;
  }();
  var parse3 = function(s2) {
    return maybe(new Left(pure5("Your message is empty!")))(function(str) {
      var $117 = length7(str) > 800;
      if ($117) {
        return new Left(pure5("Your message is too long!"));
      }
      ;
      return new Right(str);
    })(fromString(trim(s2)));
  };
  var numberToPosix = /* @__PURE__ */ function() {
    var $124 = convertDuration(durationSeconds)(durationMilliseconds);
    var $125 = wrap();
    return function($126) {
      return instant($124($125($126)));
    };
  }();
  var decodeJsonMessage = {
    decodeJson: function(json2) {
      return bind8(decodeJson3(json2))(function(v2) {
        return bind8(note(new TypeMismatch2("Unexpected Milliseconds value"))(numberToPosix(v2.created_at)))(function(posix) {
          return bind8(note(new TypeMismatch2("The `message` value is empty"))(fromString(v2.text)))(function(text6) {
            return pure13({
              createdAt: toDateTime(posix),
              text: text6,
              author: v2.author
            });
          });
        });
      });
    }
  };
  var decodeJson1 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldMaybe(decodeJsonNumber))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeArray2(decodeJsonMessage)))(gDecodeJsonNil)({
    reflectSymbol: function() {
      return "items";
    }
  })()())({
    reflectSymbol: function() {
      return "cursor";
    }
  })()())());
  var decodeJsonCursoredMessage = {
    decodeJson: function(json2) {
      return bind8(decodeJson1(json2))(function(v2) {
        var posix = bind12(v2.cursor)(numberToPosix);
        return pure13(new WithCursor(map20(toDateTime)(posix), v2.items));
      });
    }
  };
  var fromCursored = function(v2) {
    return v2.value1;
  };
  var dateTimeToSeconds = /* @__PURE__ */ function() {
    var $127 = unwrap();
    var $128 = convertDuration(durationMilliseconds)(durationSeconds);
    return function($129) {
      return round($127($128(unInstant(fromDateTime($129)))));
    };
  }();
  var encodeJsonMessage = {
    encodeJson: function(v2) {
      return encodeJson2({
        text: v2.text,
        created_at: dateTimeToSeconds(v2.createdAt),
        author: v2.author,
        hash: hash(show11(v2.author) + (show16(v2.text) + show24(v2.createdAt)))
      });
    }
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s2) {
    return function() {
      console.log(s2);
    };
  };
  var warn = function(s2) {
    return function() {
      console.warn(s2);
    };
  };
  var error2 = function(s2) {
    return function() {
      console.error(s2);
    };
  };

  // output/Effect.Console/index.js
  var warnShow = function(dictShow) {
    var show31 = show(dictShow);
    return function(a3) {
      return warn(show31(a3));
    };
  };
  var logShow = function(dictShow) {
    var show31 = show(dictShow);
    return function(a3) {
      return log2(show31(a3));
    };
  };

  // output/Effect.Class.Console/index.js
  var warnShow2 = function(dictMonadEffect) {
    var liftEffect15 = liftEffect(dictMonadEffect);
    return function(dictShow) {
      var $39 = warnShow(dictShow);
      return function($40) {
        return liftEffect15($39($40));
      };
    };
  };
  var warn2 = function(dictMonadEffect) {
    var $41 = liftEffect(dictMonadEffect);
    return function($42) {
      return $41(warn($42));
    };
  };
  var logShow2 = function(dictMonadEffect) {
    var liftEffect15 = liftEffect(dictMonadEffect);
    return function(dictShow) {
      var $49 = logShow(dictShow);
      return function($50) {
        return liftEffect15($49($50));
      };
    };
  };
  var error3 = function(dictMonadEffect) {
    var $59 = liftEffect(dictMonadEffect);
    return function($60) {
      return $59(error2($60));
    };
  };

  // output/Preamble/index.js
  var pass2 = function(dictApplicative) {
    return pure(dictApplicative)(unit);
  };

  // output/Backend/index.js
  var append4 = /* @__PURE__ */ append(semigroupString);
  var show17 = /* @__PURE__ */ show(showJsonDecodeError);
  var show18 = /* @__PURE__ */ show(showStatusCode);
  var showMaybe2 = /* @__PURE__ */ showMaybe(showString);
  var show25 = /* @__PURE__ */ show(/* @__PURE__ */ showRecord()()(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "detail";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "href";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "instance";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "status";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "title";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "type";
    }
  })(showRecordFieldsNil)(showString))(showString))(/* @__PURE__ */ showMaybe(showInt)))(showMaybe2))(showMaybe2))(showMaybe2)));
  var usernameIsSymbol = {
    reflectSymbol: function() {
      return "username";
    }
  };
  var wrap2 = /* @__PURE__ */ wrap();
  var decodeJson22 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeArray2(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonPresence))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonUsername))(gDecodeJsonNil)(usernameIsSymbol)()())({
    reflectSymbol: function() {
      return "presence";
    }
  })()())()));
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorMaybe);
  var show33 = /* @__PURE__ */ show(showInt);
  var decodeJson32 = /* @__PURE__ */ decodeJson(decodeJsonCursoredMessage);
  var show42 = /* @__PURE__ */ show(showUsername);
  var show52 = /* @__PURE__ */ show(showNonEmptyString);
  var show62 = /* @__PURE__ */ show(showDateTime);
  var encodeJson3 = /* @__PURE__ */ encodeJson(encodeJsonMessage);
  var AffjaxError = /* @__PURE__ */ function() {
    function AffjaxError2(value0) {
      this.value0 = value0;
    }
    ;
    AffjaxError2.create = function(value0) {
      return new AffjaxError2(value0);
    };
    return AffjaxError2;
  }();
  var ResponseDecodeError = /* @__PURE__ */ function() {
    function ResponseDecodeError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseDecodeError2.create = function(value0) {
      return function(value1) {
        return new ResponseDecodeError2(value0, value1);
      };
    };
    return ResponseDecodeError2;
  }();
  var ResponseStatusError = /* @__PURE__ */ function() {
    function ResponseStatusError2(value0) {
      this.value0 = value0;
    }
    ;
    ResponseStatusError2.create = function(value0) {
      return new ResponseStatusError2(value0);
    };
    return ResponseStatusError2;
  }();
  var ResponseProblem = /* @__PURE__ */ function() {
    function ResponseProblem2(value0) {
      this.value0 = value0;
    }
    ;
    ResponseProblem2.create = function(value0) {
      return new ResponseProblem2(value0);
    };
    return ResponseProblem2;
  }();
  var showError2 = {
    show: function(err) {
      return "Backend error: " + function() {
        if (err instanceof AffjaxError) {
          return "AJAX request failed: " + printError(err.value0);
        }
        ;
        if (err instanceof ResponseDecodeError) {
          return "decoding " + (err.value0 + (" response JSON failed: " + show17(err.value1)));
        }
        ;
        if (err instanceof ResponseStatusError) {
          return "unexpected response status: " + (show18(err.value0.actual) + (", expected: " + show18(err.value0.expected)));
        }
        ;
        if (err instanceof ResponseProblem) {
          return "server responded with Problem: " + show25(err.value0);
        }
        ;
        throw new Error("Failed pattern match at Backend (line 49, column 35 - line 60, column 56): " + [err.constructor.name]);
      }();
    }
  };
  var defaultBackendRequest = /* @__PURE__ */ function() {
    return {
      method: defaultRequest.method,
      url: defaultRequest.url,
      headers: defaultRequest.headers,
      content: defaultRequest.content,
      username: defaultRequest.username,
      password: defaultRequest.password,
      withCredentials: defaultRequest.withCredentials,
      responseFormat: defaultRequest.responseFormat,
      timeout: new Just(5e3)
    };
  }();
  var authorization = function(token4) {
    return new RequestHeader("Authorization", "Bearer " + toString3(token4));
  };
  var listUsers$prime = function(dictMonadAff) {
    var Bind1 = dictMonadAff.MonadEffect0().Monad0().Bind1();
    var bind28 = bind(Bind1);
    var hoistErrorMFlipped2 = hoistErrorMFlipped(Bind1);
    var liftAff4 = liftAff(dictMonadAff);
    return function(dictMonadAsk) {
      var asks3 = asks(dictMonadAsk);
      return function(dictMonadThrow) {
        var hoistErrorEither2 = hoistErrorEither(dictMonadThrow);
        var hoistErrorMFlipped1 = hoistErrorMFlipped2(hoistErrorEither2);
        var hoistErrorFlipped2 = hoistErrorFlipped(hoistErrorEither2);
        var throwError5 = throwError(dictMonadThrow);
        return function(transport) {
          return function(token4) {
            return bind28(asks3(function(v2) {
              return v2.backendApiUrl;
            }))(function(backendApiUrl) {
              return bind28(hoistErrorMFlipped1(liftAff4(transport({
                method: new Left(GET.value),
                url: joinWith("/")([backendApiUrl, "chat", "users"]),
                headers: [authorization(token4)],
                content: defaultBackendRequest.content,
                username: defaultBackendRequest.username,
                password: defaultBackendRequest.password,
                withCredentials: defaultBackendRequest.withCredentials,
                responseFormat: json,
                timeout: defaultBackendRequest.timeout
              })))(AffjaxError.create))(function(v2) {
                if (v2.status === 200) {
                  return hoistErrorFlipped2(decodeJson22(v2.body))(ResponseDecodeError.create("listUsers"));
                }
                ;
                return throwError5(new ResponseStatusError({
                  expected: wrap2(200),
                  actual: v2.status
                }));
              });
            });
          };
        };
      };
    };
  };
  var listUsers = function(dictMonadAff) {
    var listUsers$prime1 = listUsers$prime(dictMonadAff);
    return function(dictMonadAsk) {
      var listUsers$prime2 = listUsers$prime1(dictMonadAsk);
      return function(dictMonadThrow) {
        return listUsers$prime2(dictMonadThrow)(request2);
      };
    };
  };
  var messagesWithCursor$prime = function(dictMonadAff) {
    var Bind1 = dictMonadAff.MonadEffect0().Monad0().Bind1();
    var bind28 = bind(Bind1);
    var hoistErrorMFlipped2 = hoistErrorMFlipped(Bind1);
    var liftAff4 = liftAff(dictMonadAff);
    return function(dictMonadAsk) {
      var asks3 = asks(dictMonadAsk);
      return function(dictMonadThrow) {
        var hoistErrorEither2 = hoistErrorEither(dictMonadThrow);
        var hoistErrorMFlipped1 = hoistErrorMFlipped2(hoistErrorEither2);
        var hoistErrorFlipped2 = hoistErrorFlipped(hoistErrorEither2);
        var throwError5 = throwError(dictMonadThrow);
        return function(transport) {
          return function(cursor) {
            return function(token4) {
              return bind28(asks3(function(v2) {
                return v2.backendApiUrl;
              }))(function(backendApiUrl) {
                return bind28(hoistErrorMFlipped1(liftAff4(transport({
                  method: new Left(GET.value),
                  url: joinWith("/")([backendApiUrl, "chat", "messages"]) + fromMaybe("")(mapFlipped3(cursor)(function() {
                    var $301 = append4("?cursor=");
                    return function($302) {
                      return $301(show33(ceil2(dateTimeToSeconds($302))));
                    };
                  }())),
                  headers: [authorization(token4)],
                  content: defaultBackendRequest.content,
                  username: defaultBackendRequest.username,
                  password: defaultBackendRequest.password,
                  withCredentials: defaultBackendRequest.withCredentials,
                  responseFormat: json,
                  timeout: defaultBackendRequest.timeout
                })))(AffjaxError.create))(function(v2) {
                  if (v2.status === 200) {
                    return hoistErrorFlipped2(decodeJson32(v2.body))(ResponseDecodeError.create("messagesWithCursor"));
                  }
                  ;
                  return throwError5(new ResponseStatusError({
                    expected: wrap2(200),
                    actual: v2.status
                  }));
                });
              });
            };
          };
        };
      };
    };
  };
  var messagesWithCursor = function(dictMonadAff) {
    var messagesWithCursor$prime1 = messagesWithCursor$prime(dictMonadAff);
    return function(dictMonadAsk) {
      var messagesWithCursor$prime2 = messagesWithCursor$prime1(dictMonadAsk);
      return function(dictMonadThrow) {
        return messagesWithCursor$prime2(dictMonadThrow)(request2);
      };
    };
  };
  var sendMessage$prime = function(dictMonadAff) {
    var Monad0 = dictMonadAff.MonadEffect0().Monad0();
    var Bind1 = Monad0.Bind1();
    var bind28 = bind(Bind1);
    var hoistErrorMFlipped2 = hoistErrorMFlipped(Bind1);
    var liftAff4 = liftAff(dictMonadAff);
    var pass6 = pass2(Monad0.Applicative0());
    return function(dictMonadAsk) {
      var asks3 = asks(dictMonadAsk);
      return function(dictMonadThrow) {
        var hoistErrorMFlipped1 = hoistErrorMFlipped2(hoistErrorEither(dictMonadThrow));
        var throwError5 = throwError(dictMonadThrow);
        return function(transport) {
          return function(username) {
            return function(v2) {
              return function(token4) {
                return bind28(asks3(function(v1) {
                  return v1.backendApiUrl;
                }))(function(backendApiUrl) {
                  return bind28(hoistErrorMFlipped1(liftAff4(transport({
                    method: new Left(PUT.value),
                    url: joinWith("/")([backendApiUrl, "chat", hash(show42(username) + (show52(v2.text) + show62(v2.createdAt)))]),
                    headers: [authorization(token4)],
                    content: new Just(new Json(encodeJson3(v2))),
                    username: defaultBackendRequest.username,
                    password: defaultBackendRequest.password,
                    withCredentials: defaultBackendRequest.withCredentials,
                    responseFormat: json,
                    timeout: defaultBackendRequest.timeout
                  })))(AffjaxError.create))(function(v1) {
                    if (v1.status === 200) {
                      return pass6;
                    }
                    ;
                    return throwError5(new ResponseStatusError({
                      expected: 200,
                      actual: v1.status
                    }));
                  });
                });
              };
            };
          };
        };
      };
    };
  };
  var sendMessage = function(dictMonadAff) {
    var sendMessage$prime1 = sendMessage$prime(dictMonadAff);
    return function(dictMonadAsk) {
      var sendMessage$prime2 = sendMessage$prime1(dictMonadAsk);
      return function(dictMonadThrow) {
        return sendMessage$prime2(dictMonadThrow)(request2);
      };
    };
  };

  // output/AppM/index.js
  var show19 = /* @__PURE__ */ show(showError2);
  var show110 = /* @__PURE__ */ show(showError);
  var BackendError = /* @__PURE__ */ function() {
    function BackendError2(value0) {
      this.value0 = value0;
    }
    ;
    BackendError2.create = function(value0) {
      return new BackendError2(value0);
    };
    return BackendError2;
  }();
  var AuthError = /* @__PURE__ */ function() {
    function AuthError2(value0) {
      this.value0 = value0;
    }
    ;
    AuthError2.create = function(value0) {
      return new AuthError2(value0);
    };
    return AuthError2;
  }();
  var showError3 = {
    show: function(v2) {
      if (v2 instanceof BackendError) {
        return "Backend error: " + show19(v2.value0);
      }
      ;
      if (v2 instanceof AuthError) {
        return "Auth error: " + show110(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at AppM (line 19, column 10 - line 21, column 45): " + [v2.constructor.name]);
    }
  };
  var monadEffectAppM = /* @__PURE__ */ monadEffectReader(monadEffectAff);
  var monadAskAppM = /* @__PURE__ */ monadAskReaderT(monadAff);
  var monadAffAppM = /* @__PURE__ */ monadAffReader(monadAffAff);
  var run3 = function(c2) {
    return function(v2) {
      return runReaderT(v2)(c2);
    };
  };

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v2) {
    if (v2 instanceof InputButton) {
      return "button";
    }
    ;
    if (v2 instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v2 instanceof InputColor) {
      return "color";
    }
    ;
    if (v2 instanceof InputDate) {
      return "date";
    }
    ;
    if (v2 instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v2 instanceof InputEmail) {
      return "email";
    }
    ;
    if (v2 instanceof InputFile) {
      return "file";
    }
    ;
    if (v2 instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v2 instanceof InputImage) {
      return "image";
    }
    ;
    if (v2 instanceof InputMonth) {
      return "month";
    }
    ;
    if (v2 instanceof InputNumber) {
      return "number";
    }
    ;
    if (v2 instanceof InputPassword) {
      return "password";
    }
    ;
    if (v2 instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v2 instanceof InputRange) {
      return "range";
    }
    ;
    if (v2 instanceof InputReset) {
      return "reset";
    }
    ;
    if (v2 instanceof InputSearch) {
      return "search";
    }
    ;
    if (v2 instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v2 instanceof InputTel) {
      return "tel";
    }
    ;
    if (v2 instanceof InputText) {
      return "text";
    }
    ;
    if (v2 instanceof InputTime) {
      return "time";
    }
    ;
    if (v2 instanceof InputUrl) {
      return "url";
    }
    ;
    if (v2 instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v2.constructor.name]);
  };

  // output/DOM.HTML.Indexed.WrapValue/index.js
  var Hard = /* @__PURE__ */ function() {
    function Hard2() {
    }
    ;
    Hard2.value = new Hard2();
    return Hard2;
  }();
  var Soft = /* @__PURE__ */ function() {
    function Soft2() {
    }
    ;
    Soft2.value = new Soft2();
    return Soft2;
  }();
  var renderWrapValue = function(v2) {
    if (v2 instanceof Hard) {
      return "hard";
    }
    ;
    if (v2 instanceof Soft) {
      return "soft";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.WrapValue (line 13, column 19 - line 15, column 17): " + [v2.constructor.name]);
  };

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/Effect.Now/index.js
  var map21 = /* @__PURE__ */ map(functorEffect);
  var nowDateTime = /* @__PURE__ */ map21(toDateTime)(now);

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f2) {
    return function(v2) {
      return runExists(function(v1) {
        return f2(v1.value0)(v1.value1);
      })(v2);
    };
  };
  var coyoneda = function(k2) {
    return function(fi2) {
      return mkExists(new CoyonedaF(k2, fi2));
    };
  };
  var functorCoyoneda = {
    map: function(f2) {
      return function(v2) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f2(v1.value0($180));
          })(v1.value1);
        })(v2);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v2) {
      return function(v1) {
        return v2.value0(v2.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v2) {
      return function(v1) {
        return v2.value1(v2.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup2(ordTuple2);
  var insert1 = /* @__PURE__ */ insert3(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v2) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v2);
            };
          };
        };
      };
    };
  };
  var lookup3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v2) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v2);
            };
          };
        };
      };
    };
  };
  var insert6 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(val) {
              return function(v2) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(val)(v2);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_10 = traverse_(dictApplicative)(foldableMap);
    return function(v2) {
      return function(k2) {
        return traverse_10(function($54) {
          return k2($54);
        })(v2);
      };
    };
  };
  var empty4 = empty3;

  // output/DOM.HTML.Indexed.ButtonType/index.js
  var ButtonButton = /* @__PURE__ */ function() {
    function ButtonButton2() {
    }
    ;
    ButtonButton2.value = new ButtonButton2();
    return ButtonButton2;
  }();
  var ButtonSubmit = /* @__PURE__ */ function() {
    function ButtonSubmit2() {
    }
    ;
    ButtonSubmit2.value = new ButtonSubmit2();
    return ButtonSubmit2;
  }();
  var ButtonReset = /* @__PURE__ */ function() {
    function ButtonReset2() {
    }
    ;
    ButtonReset2.value = new ButtonReset2();
    return ButtonReset2;
  }();
  var renderButtonType = function(v2) {
    if (v2 instanceof ButtonButton) {
      return "button";
    }
    ;
    if (v2 instanceof ButtonSubmit) {
      return "submit";
    }
    ;
    if (v2 instanceof ButtonReset) {
      return "reset";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.ButtonType (line 14, column 20 - line 17, column 25): " + [v2.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();
  var functorInput = {
    map: function(f2) {
      return function(m2) {
        if (m2 instanceof RefUpdate) {
          return new RefUpdate(m2.value0, m2.value1);
        }
        ;
        if (m2 instanceof Action) {
          return new Action(f2(m2.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Query.Input (line 0, column 0 - line 0, column 0): " + [m2.constructor.name]);
      };
    }
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step2 = function(v2, a3) {
    return v2.value2(v2.value1, a3);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v2) {
    return v2.value3(v2.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v2) {
    return v2.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map23 = /* @__PURE__ */ map(functorArray);
  var map110 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f2) {
    return function($61) {
      return f2($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f2) {
      return function(g2) {
        return unGraft(function(v2) {
          return graft(new Graft(function($63) {
            return f2(v2.value0($63));
          }, function($64) {
            return g2(v2.value1($64));
          }, v2.value2));
        });
      };
    }
  };
  var bimap3 = /* @__PURE__ */ bimap(bifunctorGraft);
  var bifunctorVDom = {
    bimap: function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22 instanceof Text) {
            return new Text(v22.value0);
          }
          ;
          if (v22 instanceof Grafted) {
            return new Grafted(bimap3(v2)(v1)(v22.value0));
          }
          ;
          return new Grafted(graft(new Graft(v2, v1, v22)));
        };
      };
    }
  };
  var runGraft = /* @__PURE__ */ unGraft(function(v2) {
    var go3 = function(v22) {
      if (v22 instanceof Text) {
        return new Text(v22.value0);
      }
      ;
      if (v22 instanceof Elem) {
        return new Elem(v22.value0, v22.value1, v2.value0(v22.value2), map23(go3)(v22.value3));
      }
      ;
      if (v22 instanceof Keyed) {
        return new Keyed(v22.value0, v22.value1, v2.value0(v22.value2), map23(map110(go3))(v22.value3));
      }
      ;
      if (v22 instanceof Widget) {
        return new Widget(v2.value1(v22.value0));
      }
      ;
      if (v22 instanceof Grafted) {
        return new Grafted(bimap3(v2.value0)(v2.value1)(v22.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v22.constructor.name]);
    };
    return go3(v2.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key2, obj) {
    return obj[key2];
  }
  function unsafeHasAny(key2, obj) {
    return obj.hasOwnProperty(key2);
  }
  function unsafeSetAny(key2, val, obj) {
    obj[key2] = val;
  }
  function forE2(a3, f2) {
    var b3 = [];
    for (var i3 = 0; i3 < a3.length; i3++) {
      b3.push(f2(i3, a3[i3]));
    }
    return b3;
  }
  function forEachE(a3, f2) {
    for (var i3 = 0; i3 < a3.length; i3++) {
      f2(a3[i3]);
    }
  }
  function forInE(o2, f2) {
    var ks = Object.keys(o2);
    for (var i3 = 0; i3 < ks.length; i3++) {
      var k2 = ks[i3];
      f2(k2, o2[k2]);
    }
  }
  function diffWithIxE(a1, a22, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a22.length;
    var i3 = 0;
    while (1) {
      if (i3 < l1) {
        if (i3 < l2) {
          a3.push(f1(i3, a1[i3], a22[i3]));
        } else {
          f2(i3, a1[i3]);
        }
      } else if (i3 < l2) {
        a3.push(f3(i3, a22[i3]));
      } else {
        break;
      }
      i3++;
    }
    return a3;
  }
  function strMapWithIxE(as2, fk, f2) {
    var o2 = {};
    for (var i3 = 0; i3 < as2.length; i3++) {
      var a3 = as2[i3];
      var k2 = fk(a3);
      o2[k2] = f2(k2, i3, a3);
    }
    return o2;
  }
  function diffWithKeyAndIxE(o1, as2, fk, f1, f2, f3) {
    var o2 = {};
    for (var i3 = 0; i3 < as2.length; i3++) {
      var a3 = as2[i3];
      var k2 = fk(a3);
      if (o1.hasOwnProperty(k2)) {
        o2[k2] = f1(k2, i3, o1[k2], a3);
      } else {
        o2[k2] = f3(k2, i3, a3);
      }
    }
    for (var k2 in o1) {
      if (k2 in o2) {
        continue;
      }
      f2(k2, o1[k2]);
    }
    return o2;
  }
  function refEq2(a3, b3) {
    return a3 === b3;
  }
  function createTextNode(s2, doc) {
    return doc.createTextNode(s2);
  }
  function setTextContent(s2, n2) {
    n2.textContent = s2;
  }
  function createElement(ns, name17, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name17);
    } else {
      return doc.createElement(name17);
    }
  }
  function insertChildIx(i3, a3, b3) {
    var n2 = b3.childNodes.item(i3) || null;
    if (n2 !== a3) {
      b3.insertBefore(a3, n2);
    }
  }
  function removeChild(a3, b3) {
    if (b3 && a3.parentNode === b3) {
      b3.removeChild(a3);
    }
  }
  function parentNode(a3) {
    return a3.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name17) {
    return function(doctype) {
      return doctype[name17];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");
  function scrollTop(node) {
    return function() {
      return node.scrollTop;
    };
  }
  function setScrollTop(scrollTop2) {
    return function(node) {
      return function() {
        node.scrollTop = scrollTop2;
      };
    };
  }
  function scrollHeight(el) {
    return function() {
      return el.scrollHeight;
    };
  }
  function clientHeight(el) {
    return function() {
      return el.clientHeight;
    };
  }

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map24 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map24(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy6 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v2) {
    return halt(v2.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy6("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v2) {
          return mkStep(new Step(v2.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v2) {
    var parent2 = parentNode(v2.node);
    return removeChild(v2.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy6("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v2) {
    var parent2 = parentNode(v2.node);
    removeChild(v2.node, parent2);
    forInE(v2.children, function(v1, s2) {
      return halt(s2);
    });
    return halt(v2.attrs);
  };
  var haltElem = function(v2) {
    var parent2 = parentNode(v2.node);
    removeChild(v2.node, parent2);
    forEachE(v2.children, halt);
    return halt(v2.attrs);
  };
  var eqElemSpec = function(ns1, v2, ns2, v1) {
    var $63 = v2 === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy6("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v2 = length3(vdom.value3);
        var v1 = length3(state3.children);
        if (v1 === 0 && v2 === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v22, s2) {
          return halt(s2);
        };
        var onThese = function(ix, s2, v22) {
          var res = step2(s2, v22);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v22) {
          var res = state3.build(v22);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy6("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v2 = length3(vdom.value3);
        if (state3.length === 0 && v2 === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v22, s2) {
          return halt(s2);
        };
        var onThese = function(v22, ix$prime, s2, v3) {
          var res = step2(s2, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v22, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v2, build2, w2) {
    var res = v2.buildWidget(v2)(w2);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build: build2,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v2, build2, s2) {
    var node = createTextNode(s2, v2.document);
    var state3 = {
      build: build2,
      node,
      value: s2
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v2, build2, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v2.document);
    var node = toNode(el);
    var onChild = function(v1, ix, v22) {
      var res = build2(v22.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v2.buildAttributes(el)(as1);
    var state3 = {
      build: build2,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length3(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v2, build2, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v2.document);
    var node = toNode(el);
    var onChild = function(ix, child) {
      var res = build2(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v2.buildAttributes(el)(as1);
    var state3 = {
      build: build2,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy6("build", "Halogen.VDom.DOM", function() {
      return function(v2) {
        if (v2 instanceof Text) {
          return buildText(spec, $lazy_build(59), v2.value0);
        }
        ;
        if (v2 instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v2.value0, v2.value1, v2.value2, v2.value3);
        }
        ;
        if (v2 instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v2.value0, v2.value1, v2.value2, v2.value3);
        }
        ;
        if (v2 instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v2.value0);
        }
        ;
        if (v2 instanceof Grafted) {
          return $lazy_build(63)(runGraft(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v2.constructor.name]);
      };
    });
    var build2 = $lazy_build(58);
    return build2;
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn2) {
    return function() {
      return function(event) {
        return fn2(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy7 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var map25 = /* @__PURE__ */ map(functorFn);
  var map111 = /* @__PURE__ */ map(functorMaybe);
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key2, el) {
    var v2 = hasAttribute(nullImpl2, key2, el);
    if (v2) {
      return removeAttribute(nullImpl2, key2, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key2, el));
    if (v1 === "string") {
      return unsafeSetAny(key2, "", el);
    }
    ;
    if (key2 === "rowSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    if (key2 === "colSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    return unsafeSetAny(key2, jsUndefined, el);
  };
  var propToStrKey = function(v2) {
    if (v2 instanceof Attribute && v2.value0 instanceof Just) {
      return "attr/" + (v2.value0.value0 + (":" + v2.value1));
    }
    ;
    if (v2 instanceof Attribute) {
      return "attr/:" + v2.value1;
    }
    ;
    if (v2 instanceof Property) {
      return "prop/" + v2.value0;
    }
    ;
    if (v2 instanceof Handler) {
      return "handler/" + v2.value0;
    }
    ;
    if (v2 instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v2.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var functorProp = {
    map: function(v2) {
      return function(v1) {
        if (v1 instanceof Handler) {
          return new Handler(v1.value0, map25(map111(v2))(v1.value1));
        }
        ;
        if (v1 instanceof Ref) {
          return new Ref(map25(map111(v2))(v1.value0));
        }
        ;
        return v1;
      };
    }
  };
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v2, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v2) {
        if (v2 instanceof Just) {
          return emit(v2.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v2 = lookup("ref")(state3.props);
        if (v2 instanceof Just && v2.value0 instanceof Ref) {
          return mbEmit(v2.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v2, v1, v11, v22) {
          if (v11 instanceof Attribute && v22 instanceof Attribute) {
            var $65 = v11.value2 === v22.value2;
            if ($65) {
              return v22;
            }
            ;
            setAttribute(toNullable(v22.value0), v22.value1, v22.value2, el);
            return v22;
          }
          ;
          if (v11 instanceof Property && v22 instanceof Property) {
            var v4 = refEq2(v11.value1, v22.value1);
            if (v4) {
              return v22;
            }
            ;
            if (v22.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $74 = refEq2(elVal, v22.value1);
              if ($74) {
                return v22;
              }
              ;
              setProperty(v22.value0, v22.value1, el);
              return v22;
            }
            ;
            setProperty(v22.value0, v22.value1, el);
            return v22;
          }
          ;
          if (v11 instanceof Handler && v22 instanceof Handler) {
            var handler3 = unsafeLookup(v22.value0, prevEvents);
            write(v22.value1)(snd(handler3))();
            pokeMutMap(v22.value0, handler3, events);
            return v22;
          }
          ;
          return v22;
        };
      };
      var applyProp = function(events) {
        return function(v2, v1, v22) {
          if (v22 instanceof Attribute) {
            setAttribute(toNullable(v22.value0), v22.value1, v22.value2, el);
            return v22;
          }
          ;
          if (v22 instanceof Property) {
            setProperty(v22.value0, v22.value1, el);
            return v22;
          }
          ;
          if (v22 instanceof Handler) {
            var v3 = unsafeGetAny(v22.value0, events);
            if (unsafeHasAny(v22.value0, events)) {
              write(v22.value1)(snd(v3))();
              return v22;
            }
            ;
            var ref3 = $$new(v22.value1)();
            var listener = eventListener(function(ev) {
              return function __do2() {
                var f$prime = read(ref3)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v22.value0, new Tuple(listener, ref3), events);
            addEventListener(v22.value0, listener, el);
            return v22;
          }
          ;
          if (v22 instanceof Ref) {
            mbEmit(v22.value0(new Created(el)));
            return v22;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v22.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy7("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Web.HTML.Common/index.js
  var ClassName = function(x2) {
    return x2;
  };

  // output/Halogen.HTML.Core/index.js
  var map26 = /* @__PURE__ */ map(functorArray);
  var map112 = /* @__PURE__ */ map(functorProp);
  var map27 = /* @__PURE__ */ map(functorInput);
  var bimap4 = /* @__PURE__ */ bimap(bifunctorVDom);
  var HTML = function(x2) {
    return x2;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v2) {
      var $31 = Property.create(v2);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropWrapValue = {
    toPropValue: function($35) {
      return propFromString(renderWrapValue($35));
    }
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropButtonType = {
    toPropValue: function($50) {
      return propFromString(renderButtonType($50));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name17) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name17, props, children2);
        };
      };
    };
  };
  var bifunctorHTML = {
    bimap: function(f2) {
      return function(g2) {
        return function(v2) {
          return bimap4(map26(map112(map27(g2))))(f2)(v2);
        };
      };
    }
  };

  // output/Control.Applicative.Free/index.js
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure27 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure27(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons2(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply6(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f2) {
      return function(x2) {
        return mkAp(new Pure(f2))(x2);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure27 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z2) {
        var go3 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v2) {
            if (v2.value1.value0 instanceof Pure) {
              var v1 = goApply1(v2.value0)(v2.value1.value1)(pure27(v2.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v2.value1.value0 instanceof Lift) {
              var v1 = goApply1(v2.value0)(v2.value1.value1)(nat(v2.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v2.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v2.value1.value0.value1, v2.value1.value1);
              $copy_v = goLeft1(v2.value0)(nextVals)(nat)(v2.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v2.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go3(new Tuple(Nil.value, singleton3(z2)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity11);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f2) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f2($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons4 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      if (v2.value0 instanceof Nil && v2.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v2.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v2.value1), Nil.value);
        return;
      }
      ;
      if (v2.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v2.value0.value0, new CatQueue(v2.value0.value1, v2.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v2.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc4 = function(v2) {
    return function(a3) {
      return new CatQueue(v2.value0, new Cons(a3, v2.value1));
    };
  };
  var $$null5 = function(v2) {
    if (v2.value0 instanceof Nil && v2.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v2) {
    return function(v1) {
      if (v2 instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v2;
      }
      ;
      if (v2 instanceof CatCons) {
        return new CatCons(v2.value0, snoc4(v2.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v2.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k2) {
    return function(b3) {
      return function(q3) {
        var foldl4 = function($copy_v) {
          return function($copy_c) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_var_c = $copy_c;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v2, c2, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return c2;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = v2;
                  $tco_var_c = v2(c2)(v1.value0);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v2.constructor.name, c2.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go3 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v2 = uncons4(xs);
              if (v2 instanceof Nothing) {
                $tco_done1 = true;
                return foldl4(function(x2) {
                  return function(i3) {
                    return i3(x2);
                  };
                })(b3)(ys);
              }
              ;
              if (v2 instanceof Just) {
                $tco_var_xs = v2.value0.value1;
                $copy_ys = new Cons(k2(v2.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go3(q3)(Nil.value);
      };
    };
  };
  var uncons5 = function(v2) {
    if (v2 instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v2 instanceof CatCons) {
      return new Just(new Tuple(v2.value0, function() {
        var $65 = $$null5(v2.value1);
        if ($65) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v2.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v2.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append5 = link;
  var semigroupCatList = {
    append: append5
  };
  var snoc5 = function(cat) {
    return function(a3) {
      return append5(cat)(new CatCons(a3, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy8 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var append6 = /* @__PURE__ */ append(semigroupCatList);
  var map28 = /* @__PURE__ */ map(functorFn);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      var runExpF = function(v23) {
        return v23;
      };
      var concatF = function(v23) {
        return function(r2) {
          return new Free(v23.value0, append6(v23.value1)(r2));
        };
      };
      if (v2.value0 instanceof Return) {
        var v22 = uncons5(v2.value1);
        if (v22 instanceof Nothing) {
          $tco_done = true;
          return new Return(v2.value0.value0);
        }
        ;
        if (v22 instanceof Just) {
          $copy_v = concatF(runExpF(v22.value0.value0)(v2.value0.value0))(v22.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v22.constructor.name]);
      }
      ;
      if (v2.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v2.value0.value0, function(a3) {
          return concatF(v2.value0.value1(a3))(v2.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v2.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f2) {
    return new Free(f2, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k2) {
      return function(f2) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k2($190));
          };
        }())(f2);
      };
    }
  };
  var freeBind = {
    bind: function(v2) {
      return function(k2) {
        return new Free(v2.value0, snoc5(v2.value1)(k2));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy8("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var freeApply = /* @__PURE__ */ $lazy_freeApply(77);
  var bind9 = /* @__PURE__ */ bind(freeBind);
  var pure6 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f2) {
    return fromView(new Bind(f2, function($192) {
      return pure6($192);
    }));
  };
  var substFree = function(k2) {
    var go3 = function(f2) {
      var v2 = toView(f2);
      if (v2 instanceof Return) {
        return pure6(v2.value0);
      }
      ;
      if (v2 instanceof Bind) {
        return bind9(k2(v2.value0))(map28(go3)(v2.value1));
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 168, column 10 - line 170, column 33): " + [v2.constructor.name]);
    };
    return go3;
  };
  var hoistFree = function(k2) {
    return substFree(function($193) {
      return liftF(k2($193));
    });
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map119 = map(Monad0.Bind1().Apply0().Functor0());
    var pure111 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k2) {
      var go3 = function(f2) {
        var v2 = toView(f2);
        if (v2 instanceof Return) {
          return map119(Done.create)(pure111(v2.value0));
        }
        ;
        if (v2 instanceof Bind) {
          return map119(function($199) {
            return Loop.create(v2.value1($199));
          })(k2(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v2.constructor.name]);
      };
      return tailRecM4(go3);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a3) {
    return function(b3) {
      return a3 === b3;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind10 = /* @__PURE__ */ bind(bindEffect);
  var append7 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v2) {
    return v2;
  };
  var subscribe = function(v2) {
    return function(k2) {
      return v2(function($76) {
        return $$void4(k2($76));
      });
    };
  };
  var notify = function(v2) {
    return function(a3) {
      return v2(a3);
    };
  };
  var functorEmitter = {
    map: function(f2) {
      return function(v2) {
        return function(k2) {
          return v2(function($77) {
            return k2(f2($77));
          });
        };
      };
    }
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k2) {
        return function __do2() {
          modify_(function(v2) {
            return append7(v2)([k2]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k2))(subscribers);
        };
      },
      listener: function(a3) {
        return bind10(read(subscribers))(traverse_1(function(k2) {
          return k2(a3);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var over3 = /* @__PURE__ */ over()();
  var SubscriptionId = function(x2) {
    return x2;
  };
  var ForkId = function(x2) {
    return x2;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenAp = function(x2) {
    return x2;
  };
  var HalogenM = function(x2) {
    return x2;
  };
  var unsubscribe2 = function(sid) {
    return liftF(new Unsubscribe(sid, unit));
  };
  var subscribe2 = function(es) {
    return liftF(new Subscribe(function(v2) {
      return es;
    }, identity12));
  };
  var raise = function(o2) {
    return liftF(new Raise(o2, unit));
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadTransHalogenM = {
    lift: function(dictMonad) {
      return function($180) {
        return HalogenM(liftF(Lift2.create($180)));
      };
    }
  };
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAskHalogenM = function(dictMonadAsk) {
    return {
      ask: liftF(new Lift2(ask(dictMonadAsk))),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var hoist = function(dictFunctor) {
    return function(nat) {
      return function(v2) {
        var go3 = function(v1) {
          if (v1 instanceof State) {
            return new State(v1.value0);
          }
          ;
          if (v1 instanceof Subscribe) {
            return new Subscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Unsubscribe) {
            return new Unsubscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Lift2) {
            return new Lift2(nat(v1.value0));
          }
          ;
          if (v1 instanceof ChildQuery2) {
            return new ChildQuery2(v1.value0);
          }
          ;
          if (v1 instanceof Raise) {
            return new Raise(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Par) {
            return new Par(over3(HalogenAp)(hoistFreeAp(hoist(dictFunctor)(nat)))(v1.value0));
          }
          ;
          if (v1 instanceof Fork) {
            return new Fork(hoist(dictFunctor)(nat)(v1.value0), v1.value1);
          }
          ;
          if (v1 instanceof Join) {
            return new Join(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Kill) {
            return new Kill(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof GetRef) {
            return new GetRef(v1.value0, v1.value1);
          }
          ;
          throw new Error("Failed pattern match at Halogen.Query.HalogenM (line 312, column 8 - line 323, column 29): " + [v1.constructor.name]);
        };
        return hoistFree(go3)(v2);
      };
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applyHalogenM = freeApply;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize7(value0) {
      this.value0 = value0;
    }
    ;
    Initialize7.create = function(value0) {
      return new Initialize7(value0);
    };
    return Initialize7;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize4(value0) {
      this.value0 = value0;
    }
    ;
    Finalize4.create = function(value0) {
      return new Finalize4(value0);
    };
    return Finalize4;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query4(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query4.create = function(value0) {
      return function(value1) {
        return new Query4(value0, value1);
      };
    };
    return Query4;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy9 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var Thunk = /* @__PURE__ */ function() {
    function Thunk2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Thunk2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Thunk2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Thunk2;
  }();
  var unsafeEqThunk = function(v2, v1) {
    return refEq2(v2.value0, v1.value0) && (refEq2(v2.value1, v1.value1) && v2.value1(v2.value3, v1.value3));
  };
  var runThunk = function(v2) {
    return v2.value2(v2.value3);
  };
  var mapThunk = function(k2) {
    return function(v2) {
      return new Thunk(v2.value0, v2.value1, function($51) {
        return k2(v2.value2($51));
      }, v2.value3);
    };
  };
  var hoist2 = mapThunk;
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy9("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t2) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t2,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map29 = /* @__PURE__ */ map(functorHalogenM);
  var lmap5 = /* @__PURE__ */ lmap(bifunctorHTML);
  var pure7 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup4 = /* @__PURE__ */ lookup3();
  var pop3 = /* @__PURE__ */ pop2();
  var insert7 = /* @__PURE__ */ insert6();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v2) {
      if (v2 instanceof Initialize) {
        return voidLeft3(traverse_3(args.handleAction)(args.initialize))(v2.value0);
      }
      ;
      if (v2 instanceof Finalize) {
        return voidLeft3(traverse_3(args.handleAction)(args.finalize))(v2.value0);
      }
      ;
      if (v2 instanceof Receive) {
        return voidLeft3(traverse_3(args.handleAction)(args.receive(v2.value0)))(v2.value1);
      }
      ;
      if (v2 instanceof Action2) {
        return voidLeft3(args.handleAction(v2.value0))(v2.value1);
      }
      ;
      if (v2 instanceof Query) {
        return unCoyoneda(function(g2) {
          var $45 = map29(maybe(v2.value1(unit))(g2));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v2.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var hoistSlot = function(dictFunctor) {
    return function(nat) {
      return function(v2) {
        if (v2 instanceof ComponentSlot) {
          return unComponentSlot(function(slot5) {
            return new ComponentSlot(mkComponentSlot({
              get: slot5.get,
              pop: slot5.pop,
              set: slot5.set,
              component: hoist3(dictFunctor)(nat)(slot5.component),
              input: slot5.input,
              output: slot5.output
            }));
          })(v2.value0);
        }
        ;
        if (v2 instanceof ThunkSlot) {
          return new ThunkSlot(hoist2(lmap5(hoistSlot(dictFunctor)(nat)))(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Component (line 279, column 17 - line 284, column 53): " + [v2.constructor.name]);
      };
    };
  };
  var hoist3 = function(dictFunctor) {
    var hoist1 = hoist(dictFunctor);
    return function(nat) {
      return unComponent(function(c2) {
        return mkComponent({
          initialState: c2.initialState,
          render: function() {
            var $47 = lmap5(hoistSlot(dictFunctor)(nat));
            return function($48) {
              return $47(c2.render($48));
            };
          }(),
          "eval": function() {
            var $49 = hoist1(nat);
            return function($50) {
              return $49(c2["eval"]($50));
            };
          }()
        });
      });
    };
  };
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure7(unit)),
      handleQuery: $$const(pure7(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert7(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p3) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p3),
                    pop: pop22(label5)(p3),
                    set: insert22(label5)(p3),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var form = /* @__PURE__ */ element2("form");
  var h1 = /* @__PURE__ */ element2("h1");
  var img = function(props) {
    return element2("img")(props)([]);
  };
  var input = function(props) {
    return element2("input")(props)([]);
  };
  var label = /* @__PURE__ */ element2("label");
  var li2 = /* @__PURE__ */ element2("li");
  var li_ = /* @__PURE__ */ li2([]);
  var nav = /* @__PURE__ */ element2("nav");
  var nav_ = /* @__PURE__ */ nav([]);
  var ol = /* @__PURE__ */ element2("ol");
  var p2 = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p2([]);
  var section = /* @__PURE__ */ element2("section");
  var section_ = /* @__PURE__ */ section([]);
  var span3 = /* @__PURE__ */ element2("span");
  var span_ = /* @__PURE__ */ span3([]);
  var textarea = function(es) {
    return element2("textarea")(es)([]);
  };
  var ul = /* @__PURE__ */ element2("ul");
  var div3 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div3([]);
  var button = /* @__PURE__ */ element2("button");
  var a2 = /* @__PURE__ */ element2("a");

  // output/Halogen.HTML.Properties/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var src = /* @__PURE__ */ prop22("src");
  var type_ = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value2 = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var placeholder = /* @__PURE__ */ prop22("placeholder");
  var name3 = /* @__PURE__ */ prop22("name");
  var id3 = /* @__PURE__ */ prop22("id");
  var href = /* @__PURE__ */ prop22("href");
  var $$for = /* @__PURE__ */ prop22("htmlFor");
  var disabled = /* @__PURE__ */ prop1("disabled");
  var classes = /* @__PURE__ */ function() {
    var $32 = prop22("className");
    var $33 = joinWith(" ");
    var $34 = map(functorArray)(unwrap4);
    return function($35) {
      return $32($33($34($35)));
    };
  }();
  var autofocus = /* @__PURE__ */ prop1("autofocus");

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p3) {
            return function(component11) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p3)(component11)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p3) {
            return function(component11) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p3)(component11)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value17) {
    var tag = Object.prototype.toString.call(value17);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value17);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement = function(x2) {
    return _read(Nothing.value, Just.create, x2);
  };

  // output/Halogen.Query/index.js
  var mkTell = function(act) {
    return act(unit);
  };

  // output/Halogen.Extended/index.js
  var bind11 = /* @__PURE__ */ bind(bindHalogenM);
  var pure8 = /* @__PURE__ */ pure(applicativeHalogenM);
  var identity13 = /* @__PURE__ */ identity(categoryFn);
  var readState = function(dictMonadState) {
    var bind115 = bind(dictMonadState.Monad0().Bind1());
    var gets7 = gets(dictMonadState);
    return function(f2) {
      return function(r2) {
        return bind115(gets7(f2))(runReaderT(r2));
      };
    };
  };
  var raiseErrors = function(et2) {
    return function(f2) {
      return function(k2) {
        return bind11(runExceptT(et2))(function(v2) {
          if (v2 instanceof Left) {
            return raise(f2(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return k2(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Halogen.Extended (line 32, column 5 - line 34, column 20): " + [v2.constructor.name]);
        });
      };
    };
  };
  var raiseErrors_ = function(e2) {
    return function(f2) {
      return raiseErrors(e2)(f2)(pure8);
    };
  };
  var raiseError_ = function(e2) {
    return raiseErrors_(e2)(identity13);
  };
  var raiseError = function(et2) {
    return raiseErrors(et2)(identity13);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e2) {
    return e2.currentTarget;
  }
  function preventDefault(e2) {
    return function() {
      return e2.preventDefault();
    };
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.HTML.Event.EventTypes/index.js
  var submit = "submit";
  var input2 = "input";
  var domcontentloaded = "DOMContentLoaded";

  // output/Web.UIEvent.KeyboardEvent.EventTypes/index.js
  var keydown = "keydown";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click2 = "click";

  // output/Halogen.HTML.Events/index.js
  var map31 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp3 = /* @__PURE__ */ readProp(monadIdentity);
  var readString4 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var keyHandler = unsafeCoerce2;
  var handler$prime = function(et2) {
    return function(f2) {
      return handler(et2)(function(ev) {
        return map31(Action.create)(f2(ev));
      });
    };
  };
  var handler2 = function(et2) {
    return function(f2) {
      return handler(et2)(function(ev) {
        return new Just(new Action(f2(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click2);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var onInput = /* @__PURE__ */ handler2(input2);
  var onKeyDown = /* @__PURE__ */ function() {
    var $23 = handler2(keydown);
    return function($24) {
      return $23(keyHandler($24));
    };
  }();
  var onScroll = /* @__PURE__ */ handler2("scroll");
  var onSubmit = /* @__PURE__ */ handler2("submit");
  var addForeignPropHandler = function(key2) {
    return function(prop4) {
      return function(reader) {
        return function(f2) {
          var go3 = function(a3) {
            return composeKleisliFlipped4(reader)(readProp3(prop4))(unsafeToForeign(a3));
          };
          return handler$prime(key2)(composeKleisli2(currentTarget)(function(e2) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f2($85));
            })(runExcept(go3(e2)));
          }));
        };
      };
    };
  };
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input2)("value")(readString4);

  // output/Halogen.HTML.Properties.Extended/index.js
  var classNames = /* @__PURE__ */ function() {
    var $2 = map(functorArray)(ClassName);
    return function($3) {
      return classes($2($3));
    };
  }();

  // output/Web.Event.CustomEvent/foreign.js
  var newSimple = function(ty) {
    return function() {
      return new CustomEvent(ty);
    };
  };

  // output/Web.Event.CustomEvent/index.js
  var toEvent = unsafeCoerce2;

  // output/Web.UIEvent.KeyboardEvent/foreign.js
  function key(e2) {
    return e2.key;
  }
  function shiftKey(e2) {
    return e2.shiftKey;
  }

  // output/Web.UIEvent.KeyboardEvent/index.js
  var toEvent2 = unsafeCoerce2;

  // output/Component.Chat.Controls/index.js
  var prop3 = /* @__PURE__ */ prop2(isPropWrapValue);
  var value4 = /* @__PURE__ */ value2(isPropString);
  var append8 = /* @__PURE__ */ append(semigroupArray);
  var prop12 = /* @__PURE__ */ prop2(isPropBoolean);
  var show20 = /* @__PURE__ */ show(showInt);
  var type_4 = /* @__PURE__ */ type_(isPropInputType);
  var whenM2 = /* @__PURE__ */ whenM(monadHalogenM);
  var gets2 = /* @__PURE__ */ gets(monadStateHalogenM);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind13 = /* @__PURE__ */ bind(bindHalogenM);
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorHalogenM);
  var applySecond2 = /* @__PURE__ */ applySecond(applyHalogenM);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var liftEffect4 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectHalogenM(monadEffectAppM));
  var unwrap5 = /* @__PURE__ */ unwrap();
  var monadAskHalogenM2 = /* @__PURE__ */ monadAskHalogenM(monadAskAppM);
  var monadAffHalogenM2 = /* @__PURE__ */ monadAffHalogenM(monadAffAppM);
  var token2 = /* @__PURE__ */ token(monadAskHalogenM2)(monadAffHalogenM2);
  var sendMessage2 = /* @__PURE__ */ sendMessage(/* @__PURE__ */ monadAffExceptT(monadAffHalogenM2))(/* @__PURE__ */ monadAskExceptT(monadAskHalogenM2))(/* @__PURE__ */ monadThrowExceptT(monadHalogenM));
  var pass3 = /* @__PURE__ */ pass2(applicativeHalogenM);
  var map32 = /* @__PURE__ */ map(functorHalogenM);
  var not2 = /* @__PURE__ */ not(heytingAlgebraBoolean);
  var SetMessage = /* @__PURE__ */ function() {
    function SetMessage2(value0) {
      this.value0 = value0;
    }
    ;
    SetMessage2.create = function(value0) {
      return new SetMessage2(value0);
    };
    return SetMessage2;
  }();
  var UpdateInfo = /* @__PURE__ */ function() {
    function UpdateInfo2(value0) {
      this.value0 = value0;
    }
    ;
    UpdateInfo2.create = function(value0) {
      return new UpdateInfo2(value0);
    };
    return UpdateInfo2;
  }();
  var SendMessage = /* @__PURE__ */ function() {
    function SendMessage2(value0) {
      this.value0 = value0;
    }
    ;
    SendMessage2.create = function(value0) {
      return new SendMessage2(value0);
    };
    return SendMessage2;
  }();
  var KeyPressed = /* @__PURE__ */ function() {
    function KeyPressed2(value0) {
      this.value0 = value0;
    }
    ;
    KeyPressed2.create = function(value0) {
      return new KeyPressed2(value0);
    };
    return KeyPressed2;
  }();
  var render = function(state3) {
    var isBlocked = function() {
      if (state3.buttonBlocked) {
        return true;
      }
      ;
      return false;
    }();
    return form([onSubmit(SendMessage.create), id3("controls"), classNames(["w-full", "flex", "relative", "bg-white", "transition", "duration-200", "shadow-xl", "rounded-b-lg"])])([textarea([onValueInput(SetMessage.create), placeholder("Enter your message here!"), autofocus(true), id3("controls"), onKeyDown(KeyPressed.create), prop3("wrap")(Soft.value), value4(state3.message.inputValue), classNames(["w-full", "h-21", "focus:outline-none", "focus:cursor-text", "cursor-pointer", "rounded-b-lg", "pl-2", "pr-10", "overflow-scroll", "placeholder:gray-500", "placeholder:italic", "border", "border-slate-400", "focus:border-slate-500", "hover:border-slate-500", "transition", "duration-100", "pt-1", "resize-none", "overflow-hidden"])]), p2([classNames(append8(["right-0", "bottom-0", "absolute", "mr-2", "mb-9", "text-base"])(function() {
      var $49 = length5(state3.message.inputValue) > 800;
      if ($49) {
        return ["text-red-500", "font-medium"];
      }
      ;
      return ["text-slate-400", "italic", "font-leight"];
    }())), prop12("hidden")($$null3(state3.message.inputValue))])([text(show20(length5(state3.message.inputValue)))]), input([classNames(append8(["w-9", "h-9", "text-center", "text-white", "duration-200", "focus:outline-none", "transition", "absolute", "right-0", "bottom-0", "rounded-br-lg", "rounded-tl-lg"])(function() {
      if (isBlocked) {
        return ["bg-gray-500", "cursor-not-allowed"];
      }
      ;
      return ["bg-blue-500", "hover:bg-blue-600", "hover:cursor-pointer", "active:bg-blue-700", "active:border", "active:border-blue-700", "active:scale-101"];
    }())), value4("\u2191"), type_4(InputSubmit.value), id3("controls"), disabled(isBlocked)])]);
  };
  var initialState = function(user) {
    return {
      buttonBlocked: true,
      message: {
        inputValue: "",
        result: Nothing.value
      },
      user
    };
  };
  var handleAction = /* @__PURE__ */ function() {
    var unblockBtn = whenM2(gets2(function(v2) {
      return v2.buttonBlocked;
    }))(modify_3(function(v2) {
      var $51 = {};
      for (var $52 in v2) {
        if ({}.hasOwnProperty.call(v2, $52)) {
          $51[$52] = v2[$52];
        }
        ;
      }
      ;
      $51.buttonBlocked = false;
      return $51;
    }));
    var validateInput = bind13(mapFlipped4(gets2(function(v2) {
      return v2.message.inputValue;
    }))(parse3))(either($$const(modify_3(function(v2) {
      var $54 = {};
      for (var $55 in v2) {
        if ({}.hasOwnProperty.call(v2, $55)) {
          $54[$55] = v2[$55];
        }
        ;
      }
      ;
      $54.buttonBlocked = true;
      return $54;
    })))($$const(unblockBtn)));
    return function(v2) {
      if (v2 instanceof UpdateInfo) {
        return modify_3(function(v12) {
          var $58 = {};
          for (var $59 in v12) {
            if ({}.hasOwnProperty.call(v12, $59)) {
              $58[$59] = v12[$59];
            }
            ;
          }
          ;
          $58.user = v2.value0;
          return $58;
        });
      }
      ;
      if (v2 instanceof SetMessage) {
        return applySecond2(modify_3(function(v12) {
          var $65 = {};
          for (var $66 in v12) {
            if ({}.hasOwnProperty.call(v12, $66)) {
              $65[$66] = v12[$66];
            }
            ;
          }
          ;
          $65.message = function() {
            var $62 = {};
            for (var $63 in v12.message) {
              if ({}.hasOwnProperty.call(v12.message, $63)) {
                $62[$63] = v12["message"][$63];
              }
              ;
            }
            ;
            $62.inputValue = trim(v2.value0);
            return $62;
          }();
          return $65;
        }))(validateInput);
      }
      ;
      if (v2 instanceof SendMessage) {
        return discard2(liftEffect4(preventDefault(v2.value0)))(function() {
          return bind13(mapFlipped4(gets2(function(v12) {
            return v12.message.inputValue;
          }))(parse3))(function(v12) {
            if (v12 instanceof Left) {
              return modify_3(function(v22) {
                var $73 = {};
                for (var $74 in v22) {
                  if ({}.hasOwnProperty.call(v22, $74)) {
                    $73[$74] = v22[$74];
                  }
                  ;
                }
                ;
                $73.buttonBlocked = true;
                $73.message = function() {
                  var $70 = {};
                  for (var $71 in v22.message) {
                    if ({}.hasOwnProperty.call(v22.message, $71)) {
                      $70[$71] = v22["message"][$71];
                    }
                    ;
                  }
                  ;
                  $70.result = new Just(new Left(v12.value0));
                  return $70;
                }();
                return $73;
              });
            }
            ;
            if (v12 instanceof Right) {
              return bind13(gets2(function($88) {
                return function(v22) {
                  return v22.name;
                }(unwrap5(function(v22) {
                  return v22.user;
                }($88)));
              }))(function(author) {
                return bind13(token2)(function(token1) {
                  return bind13(liftEffect4(nowDateTime))(function(createdAt) {
                    var msg = {
                      text: v12.value0,
                      createdAt,
                      author
                    };
                    return discard2(raiseError_(sendMessage2(author)(msg)(token1)))(function() {
                      return modify_3(function(v22) {
                        var $80 = {};
                        for (var $81 in v22) {
                          if ({}.hasOwnProperty.call(v22, $81)) {
                            $80[$81] = v22[$81];
                          }
                          ;
                        }
                        ;
                        $80.buttonBlocked = true;
                        $80.message = function() {
                          var $77 = {};
                          for (var $78 in v22.message) {
                            if ({}.hasOwnProperty.call(v22.message, $78)) {
                              $77[$78] = v22["message"][$78];
                            }
                            ;
                          }
                          ;
                          $77.inputValue = "";
                          return $77;
                        }();
                        return $80;
                      });
                    });
                  });
                });
              });
            }
            ;
            throw new Error("Failed pattern match at Component.Chat.Controls (line 170, column 55 - line 180, column 74): " + [v12.constructor.name]);
          });
        });
      }
      ;
      if (v2 instanceof KeyPressed) {
        var $85 = shiftKey(v2.value0);
        if ($85) {
          return pass3;
        }
        ;
        var v1 = key(v2.value0);
        if (v1 === "Enter") {
          return discard2(liftEffect4(preventDefault(toEvent2(v2.value0))))(function() {
            return whenM2(map32(not2)(gets2(function(v22) {
              return v22.buttonBlocked;
            })))(bind13(liftEffect4(newSimple(submit)))(function($89) {
              return handleAction(SendMessage.create(toEvent($89)));
            }));
          });
        }
        ;
        return pass3;
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Controls (line 163, column 16 - line 191, column 15): " + [v2.constructor.name]);
    };
  }();
  var component = /* @__PURE__ */ function() {
    return mkComponent({
      initialState,
      render,
      "eval": mkEval({
        handleAction,
        handleQuery: defaultEval.handleQuery,
        receive: function($90) {
          return Just.create(UpdateInfo.create($90));
        },
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Parsing/index.js
  var $runtime_lazy10 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var unwrap6 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift3 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var lazyParserT = {
    defer: function(f2) {
      var m2 = defer2(f2);
      return function(state1, more, lift12, $$throw2, done) {
        var v2 = force(m2);
        return v2(state1, more, lift12, $$throw2, done);
      };
    }
  };
  var functorParserT = {
    map: function(f2) {
      return function(v2) {
        return function(state1, more, lift12, $$throw2, done) {
          return more(function(v1) {
            return v2(state1, more, lift12, $$throw2, function(state22, a3) {
              return more(function(v22) {
                return done(state22, f2(a3));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v2) {
      return function(v1) {
        return function(state1, more, lift12, $$throw2, done) {
          return more(function(v22) {
            return v2(state1, more, lift12, $$throw2, function(state22, f2) {
              return more(function(v3) {
                return v1(state22, more, lift12, $$throw2, function(state3, a3) {
                  return more(function(v4) {
                    return done(state3, f2(a3));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v2) {
      return function(next) {
        return function(state1, more, lift12, $$throw2, done) {
          return more(function(v1) {
            return v2(state1, more, lift12, $$throw2, function(state22, a3) {
              return more(function(v22) {
                var v3 = next(a3);
                return v3(state22, more, lift12, $$throw2, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a3) {
      return function(state1, v2, v1, v22, done) {
        return done(state1, a3);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadRecParserT = {
    tailRecM: function(next) {
      return function(initArg) {
        return function(state1, more, lift12, $$throw2, done) {
          var $lazy_loop = $runtime_lazy10("loop", "Parsing", function() {
            return function(state22, arg, gas) {
              var v2 = next(arg);
              return v2(state22, more, lift12, $$throw2, function(state3, step5) {
                if (step5 instanceof Loop) {
                  var $188 = gas === 0;
                  if ($188) {
                    return more(function(v1) {
                      return $lazy_loop(269)(state3, step5.value0, 30);
                    });
                  }
                  ;
                  return $lazy_loop(271)(state3, step5.value0, gas - 1 | 0);
                }
                ;
                if (step5 instanceof Done) {
                  return done(state3, step5.value0);
                }
                ;
                throw new Error("Failed pattern match at Parsing (line 265, column 39 - line 273, column 43): " + [step5.constructor.name]);
              });
            };
          });
          var loop3 = $lazy_loop(262);
          return loop3(state1, initArg, 30);
        };
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v2, v1, $$throw2, v22) {
        return $$throw2(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError2 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v2) {
      return function(v1) {
        return function(v22, more, lift12, $$throw2, done) {
          return more(function(v3) {
            return v2(new ParseState(v22.value0, v22.value1, false), more, lift12, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw2(v4, err);
                }
                ;
                return v1(v22, more, lift12, $$throw2, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k2) {
    return function(state1, v2, v1, v22, done) {
      var v3 = k2(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map53 = map(Monad0.Bind1().Apply0().Functor0());
    var pure111 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v2) {
        var go3 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step5) {
            var v1 = step5(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift3) {
              $tco_done = true;
              return map53(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure111(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 144, column 13 - line 150, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM4(go3)(function(v1) {
          return v2(state1, More.create, Lift3.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position = /* @__PURE__ */ stateParserT(function(v2) {
    return new Tuple(v2.value1, v2);
  });
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map53 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s2) {
      return function(p3) {
        var initialState7 = new ParseState(s2, initialPos, false);
        return map53(fst)(runParserT$prime1(initialState7)(p3));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser2 = function(s2) {
    var $253 = runParserT1(s2);
    return function($254) {
      return unwrap6($253($254));
    };
  };
  var getParserT = function(state1, v2, v1, v22, done) {
    return done(state1, state1);
  };
  var failWithPosition = function(message2) {
    return function(pos) {
      return throwError2(new ParseError(message2, pos));
    };
  };
  var fail4 = function(message2) {
    return bindFlipped5(failWithPosition(message2))(position);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail4("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
    }
  };

  // output/Parsing.Combinators/index.js
  var alt6 = /* @__PURE__ */ alt(altParserT);
  var defer3 = /* @__PURE__ */ defer(lazyParserT);
  var pure9 = /* @__PURE__ */ pure(applicativeParserT);
  var applySecond3 = /* @__PURE__ */ applySecond(applyParserT);
  var bind14 = /* @__PURE__ */ bind(bindParserT);
  var map33 = /* @__PURE__ */ map(functorParserT);
  var manyRec2 = /* @__PURE__ */ manyRec(monadRecParserT)(alternativeParserT);
  var withLazyErrorMessage = function(p3) {
    return function(msg) {
      return alt6(p3)(defer3(function(v2) {
        return fail4("Expected " + msg(unit));
      }));
    };
  };
  var withErrorMessage = function(p3) {
    return function(msg) {
      return alt6(p3)(fail4("Expected " + msg));
    };
  };
  var sepBy12 = function(p3) {
    return function(sep) {
      return bind14(p3)(function(a3) {
        return bind14(manyRec2(applySecond3(sep)(p3)))(function(as2) {
          return pure9(cons$prime(a3)(as2));
        });
      });
    };
  };
  var sepBy = function(p3) {
    return function(sep) {
      return alt6(map33(toList2)(sepBy12(p3)(sep)))(pure9(Nil.value));
    };
  };
  var option2 = function(a3) {
    return function(p3) {
      return alt6(p3)(pure9(a3));
    };
  };
  var optionMaybe = function(p3) {
    return option2(Nothing.value)(map33(Just.create)(p3));
  };

  // output/Parsing.String/index.js
  var fromEnum6 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust9 = /* @__PURE__ */ fromJust();
  var toEnum4 = /* @__PURE__ */ toEnum(boundedEnumChar);
  var show26 = /* @__PURE__ */ show(showChar);
  var updatePosSingle = function(v2) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum6(cp);
        if (v1 === 10) {
          return {
            index: v2.index + 1 | 0,
            line: v2.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v22 = codePointAt(0)(after);
          if (v22 instanceof Just && fromEnum6(v22.value0) === 10) {
            return {
              index: v2.index + 1 | 0,
              line: v2.line,
              column: v2.column
            };
          }
          ;
          return {
            index: v2.index + 1 | 0,
            line: v2.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v2.index + 1 | 0,
            line: v2.line,
            column: (v2.column + 8 | 0) - mod3(v2.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v2.index + 1 | 0,
          line: v2.line,
          column: v2.column + 1 | 0
        };
      };
    };
  };
  var satisfy2 = function(f2) {
    return mkFn5(function(v2) {
      return function(v1) {
        return function(v22) {
          return function($$throw2) {
            return function(done) {
              var v3 = uncons3(v2.value0);
              if (v3 instanceof Nothing) {
                return $$throw2(v2, new ParseError("Unexpected EOF", v2.value1));
              }
              ;
              if (v3 instanceof Just) {
                var cp = fromEnum6(v3.value0.head);
                var $74 = cp < 0 || cp > 65535;
                if ($74) {
                  return $$throw2(v2, new ParseError("Expected Char", v2.value1));
                }
                ;
                var ch = fromJust9(toEnum4(cp));
                var $75 = f2(ch);
                if ($75) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v2.value1)(v3.value0.head)(v3.value0.tail), true), ch);
                }
                ;
                return $$throw2(v2, new ParseError("Predicate unsatisfied", v2.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 109, column 7 - line 124, column 75): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var eof2 = /* @__PURE__ */ mkFn5(function(v2) {
    return function(v1) {
      return function(v22) {
        return function($$throw2) {
          return function(done) {
            var $91 = $$null3(v2.value0);
            if ($91) {
              return done(new ParseState(v2.value0, v2.value1, true), unit);
            }
            ;
            return $$throw2(v2, new ParseError("Expected EOF", v2.value1));
          };
        };
      };
    };
  });
  var $$char2 = function(c2) {
    return withErrorMessage(satisfy2(function(v2) {
      return v2 === c2;
    }))(show26(c2));
  };
  var anyChar2 = /* @__PURE__ */ satisfy2(/* @__PURE__ */ $$const(true));

  // output/Parsing.String.Basic/index.js
  var elem1 = /* @__PURE__ */ elem2(eqChar);
  var show111 = /* @__PURE__ */ show(/* @__PURE__ */ showArray(showChar));
  var satisfyCP = function(p3) {
    return satisfy2(function($30) {
      return p3(codePointFromChar($30));
    });
  };
  var oneOf3 = function(ss) {
    return withLazyErrorMessage(satisfy2(flip(elem1)(ss)))(function(v2) {
      return "one of " + show111(ss);
    });
  };
  var hexDigit = /* @__PURE__ */ withErrorMessage(/* @__PURE__ */ satisfyCP(isHexDigit))("hex digit");
  var digit = /* @__PURE__ */ withErrorMessage(/* @__PURE__ */ satisfyCP(isDecDigit))("digit");

  // output/Data.Formatter.DateTime/index.js
  var show21 = /* @__PURE__ */ show(showInt);
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldMap12 = /* @__PURE__ */ foldMap2(monoidString);
  var abs3 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var fromEnum7 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var show112 = /* @__PURE__ */ show(showMonth);
  var fromEnum1 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromEnum22 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var unwrap7 = /* @__PURE__ */ unwrap();
  var fromEnum32 = /* @__PURE__ */ fromEnum(boundedEnumWeekday);
  var show27 = /* @__PURE__ */ show(showWeekday);
  var fromEnum42 = /* @__PURE__ */ fromEnum(boundedEnumHour);
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromEnum52 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
  var fromEnum62 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
  var fromEnum72 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
  var div1 = /* @__PURE__ */ div(euclideanRingInt);
  var YearFull = /* @__PURE__ */ function() {
    function YearFull2() {
    }
    ;
    YearFull2.value = new YearFull2();
    return YearFull2;
  }();
  var YearTwoDigits = /* @__PURE__ */ function() {
    function YearTwoDigits2() {
    }
    ;
    YearTwoDigits2.value = new YearTwoDigits2();
    return YearTwoDigits2;
  }();
  var YearAbsolute = /* @__PURE__ */ function() {
    function YearAbsolute2() {
    }
    ;
    YearAbsolute2.value = new YearAbsolute2();
    return YearAbsolute2;
  }();
  var MonthFull = /* @__PURE__ */ function() {
    function MonthFull2() {
    }
    ;
    MonthFull2.value = new MonthFull2();
    return MonthFull2;
  }();
  var MonthShort = /* @__PURE__ */ function() {
    function MonthShort2() {
    }
    ;
    MonthShort2.value = new MonthShort2();
    return MonthShort2;
  }();
  var MonthTwoDigits = /* @__PURE__ */ function() {
    function MonthTwoDigits2() {
    }
    ;
    MonthTwoDigits2.value = new MonthTwoDigits2();
    return MonthTwoDigits2;
  }();
  var DayOfMonthTwoDigits = /* @__PURE__ */ function() {
    function DayOfMonthTwoDigits2() {
    }
    ;
    DayOfMonthTwoDigits2.value = new DayOfMonthTwoDigits2();
    return DayOfMonthTwoDigits2;
  }();
  var DayOfMonth = /* @__PURE__ */ function() {
    function DayOfMonth2() {
    }
    ;
    DayOfMonth2.value = new DayOfMonth2();
    return DayOfMonth2;
  }();
  var UnixTimestamp = /* @__PURE__ */ function() {
    function UnixTimestamp2() {
    }
    ;
    UnixTimestamp2.value = new UnixTimestamp2();
    return UnixTimestamp2;
  }();
  var DayOfWeek = /* @__PURE__ */ function() {
    function DayOfWeek2() {
    }
    ;
    DayOfWeek2.value = new DayOfWeek2();
    return DayOfWeek2;
  }();
  var DayOfWeekName = /* @__PURE__ */ function() {
    function DayOfWeekName2() {
    }
    ;
    DayOfWeekName2.value = new DayOfWeekName2();
    return DayOfWeekName2;
  }();
  var DayOfWeekNameShort = /* @__PURE__ */ function() {
    function DayOfWeekNameShort2() {
    }
    ;
    DayOfWeekNameShort2.value = new DayOfWeekNameShort2();
    return DayOfWeekNameShort2;
  }();
  var Hours24 = /* @__PURE__ */ function() {
    function Hours242() {
    }
    ;
    Hours242.value = new Hours242();
    return Hours242;
  }();
  var Hours12 = /* @__PURE__ */ function() {
    function Hours122() {
    }
    ;
    Hours122.value = new Hours122();
    return Hours122;
  }();
  var Meridiem = /* @__PURE__ */ function() {
    function Meridiem2() {
    }
    ;
    Meridiem2.value = new Meridiem2();
    return Meridiem2;
  }();
  var Minutes = /* @__PURE__ */ function() {
    function Minutes2() {
    }
    ;
    Minutes2.value = new Minutes2();
    return Minutes2;
  }();
  var MinutesTwoDigits = /* @__PURE__ */ function() {
    function MinutesTwoDigits2() {
    }
    ;
    MinutesTwoDigits2.value = new MinutesTwoDigits2();
    return MinutesTwoDigits2;
  }();
  var Seconds2 = /* @__PURE__ */ function() {
    function Seconds3() {
    }
    ;
    Seconds3.value = new Seconds3();
    return Seconds3;
  }();
  var SecondsTwoDigits = /* @__PURE__ */ function() {
    function SecondsTwoDigits2() {
    }
    ;
    SecondsTwoDigits2.value = new SecondsTwoDigits2();
    return SecondsTwoDigits2;
  }();
  var Milliseconds2 = /* @__PURE__ */ function() {
    function Milliseconds3() {
    }
    ;
    Milliseconds3.value = new Milliseconds3();
    return Milliseconds3;
  }();
  var MillisecondsShort = /* @__PURE__ */ function() {
    function MillisecondsShort2() {
    }
    ;
    MillisecondsShort2.value = new MillisecondsShort2();
    return MillisecondsShort2;
  }();
  var MillisecondsTwoDigits = /* @__PURE__ */ function() {
    function MillisecondsTwoDigits2() {
    }
    ;
    MillisecondsTwoDigits2.value = new MillisecondsTwoDigits2();
    return MillisecondsTwoDigits2;
  }();
  var Placeholder = /* @__PURE__ */ function() {
    function Placeholder2(value0) {
      this.value0 = value0;
    }
    ;
    Placeholder2.create = function(value0) {
      return new Placeholder2(value0);
    };
    return Placeholder2;
  }();
  var printShortMonth = function(v2) {
    if (v2 instanceof January) {
      return "Jan";
    }
    ;
    if (v2 instanceof February) {
      return "Feb";
    }
    ;
    if (v2 instanceof March) {
      return "Mar";
    }
    ;
    if (v2 instanceof April) {
      return "Apr";
    }
    ;
    if (v2 instanceof May) {
      return "May";
    }
    ;
    if (v2 instanceof June) {
      return "Jun";
    }
    ;
    if (v2 instanceof July) {
      return "Jul";
    }
    ;
    if (v2 instanceof August) {
      return "Aug";
    }
    ;
    if (v2 instanceof September) {
      return "Sep";
    }
    ;
    if (v2 instanceof October) {
      return "Oct";
    }
    ;
    if (v2 instanceof November) {
      return "Nov";
    }
    ;
    if (v2 instanceof December) {
      return "Dec";
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 489, column 19 - line 501, column 22): " + [v2.constructor.name]);
  };
  var padSingleDigit = function(i3) {
    if (i3 < 0) {
      return "-" + padSingleDigit(-i3 | 0);
    }
    ;
    if (i3 < 10) {
      return "0" + show21(i3);
    }
    ;
    if (otherwise) {
      return show21(i3);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 194, column 1 - line 194, column 32): " + [i3.constructor.name]);
  };
  var padQuadrupleDigit = function(i3) {
    if (i3 < 0) {
      return "-" + padQuadrupleDigit(-i3 | 0);
    }
    ;
    if (i3 < 10) {
      return "000" + show21(i3);
    }
    ;
    if (i3 < 100) {
      return "00" + show21(i3);
    }
    ;
    if (i3 < 1e3) {
      return "0" + show21(i3);
    }
    ;
    if (otherwise) {
      return show21(i3);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 207, column 1 - line 207, column 35): " + [i3.constructor.name]);
  };
  var padDoubleDigit = function(i3) {
    if (i3 < 0) {
      return "-" + padDoubleDigit(-i3 | 0);
    }
    ;
    if (i3 < 10) {
      return "00" + show21(i3);
    }
    ;
    if (i3 < 100) {
      return "0" + show21(i3);
    }
    ;
    if (otherwise) {
      return show21(i3);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 200, column 1 - line 200, column 32): " + [i3.constructor.name]);
  };
  var formatYearTwoDigits = function(i3) {
    var dateString = show21(abs3(i3));
    var dateLength = length5(dateString);
    if (dateLength === 1) {
      return "0" + dateString;
    }
    ;
    if (dateLength === 2) {
      return dateString;
    }
    ;
    return drop4(dateLength - 2 | 0)(dateString);
  };
  var fix12 = function(h7) {
    var $617 = h7 === 0;
    if ($617) {
      return 12;
    }
    ;
    return h7;
  };
  var formatCommand = function(v2) {
    return function(v1) {
      if (v1 instanceof YearFull) {
        return padQuadrupleDigit(fromEnum7(year(v2.value0)));
      }
      ;
      if (v1 instanceof YearTwoDigits) {
        return formatYearTwoDigits(fromEnum7(year(v2.value0)));
      }
      ;
      if (v1 instanceof YearAbsolute) {
        return show21(fromEnum7(year(v2.value0)));
      }
      ;
      if (v1 instanceof MonthFull) {
        return show112(month(v2.value0));
      }
      ;
      if (v1 instanceof MonthShort) {
        return printShortMonth(month(v2.value0));
      }
      ;
      if (v1 instanceof MonthTwoDigits) {
        return padSingleDigit(fromEnum1(month(v2.value0)));
      }
      ;
      if (v1 instanceof DayOfMonthTwoDigits) {
        return padSingleDigit(fromEnum22(day(v2.value0)));
      }
      ;
      if (v1 instanceof DayOfMonth) {
        return show21(fromEnum22(day(v2.value0)));
      }
      ;
      if (v1 instanceof UnixTimestamp) {
        return show21(floor2(function(v22) {
          return v22 / 1e3;
        }(unwrap7(unInstant(fromDateTime(v2))))));
      }
      ;
      if (v1 instanceof DayOfWeek) {
        return show21(fromEnum32(weekday(v2.value0)));
      }
      ;
      if (v1 instanceof DayOfWeekName) {
        return show27(weekday(v2.value0));
      }
      ;
      if (v1 instanceof DayOfWeekNameShort) {
        return take4(3)(show27(weekday(v2.value0)));
      }
      ;
      if (v1 instanceof Hours24) {
        return padSingleDigit(fromEnum42(hour(v2.value1)));
      }
      ;
      if (v1 instanceof Hours12) {
        return padSingleDigit(fix12(mod4(fromEnum42(hour(v2.value1)))(12)));
      }
      ;
      if (v1 instanceof Meridiem) {
        var $620 = fromEnum42(hour(v2.value1)) >= 12;
        if ($620) {
          return "PM";
        }
        ;
        return "AM";
      }
      ;
      if (v1 instanceof Minutes) {
        return show21(fromEnum52(minute(v2.value1)));
      }
      ;
      if (v1 instanceof MinutesTwoDigits) {
        return padSingleDigit(fromEnum52(minute(v2.value1)));
      }
      ;
      if (v1 instanceof Seconds2) {
        return show21(fromEnum62(second(v2.value1)));
      }
      ;
      if (v1 instanceof SecondsTwoDigits) {
        return padSingleDigit(fromEnum62(second(v2.value1)));
      }
      ;
      if (v1 instanceof Milliseconds2) {
        return padDoubleDigit(fromEnum72(millisecond(v2.value1)));
      }
      ;
      if (v1 instanceof MillisecondsShort) {
        return show21(function(v22) {
          return div1(v22)(100);
        }(fromEnum72(millisecond(v2.value1))));
      }
      ;
      if (v1 instanceof MillisecondsTwoDigits) {
        return padSingleDigit(function(v22) {
          return div1(v22)(10);
        }(fromEnum72(millisecond(v2.value1))));
      }
      ;
      if (v1 instanceof Placeholder) {
        return v1.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Formatter.DateTime (line 169, column 38 - line 192, column 21): " + [v1.constructor.name]);
    };
  };
  var format = function(f2) {
    return function(d2) {
      return foldMap12(formatCommand(d2))(f2);
    };
  };

  // output/Web.DOM.Document/foreign.js
  var getEffProp2 = function(name17) {
    return function(doc) {
      return function() {
        return doc[name17];
      };
    };
  };
  var url = getEffProp2("URL");
  var documentURI = getEffProp2("documentURI");
  var origin = getEffProp2("origin");
  var compatMode = getEffProp2("compatMode");
  var characterSet = getEffProp2("characterSet");
  var contentType = getEffProp2("contentType");
  var _documentElement = getEffProp2("documentElement");

  // output/Web.DOM.Document/index.js
  var toNonElementParentNode = unsafeCoerce2;

  // output/Web.DOM.NonElementParentNode/foreign.js
  function _getElementById(id4) {
    return function(node) {
      return function() {
        return node.getElementById(id4);
      };
    };
  }

  // output/Web.DOM.NonElementParentNode/index.js
  var map34 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map34(toMaybe);
    var $3 = _getElementById(eid);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return function() {
      return doc.readyState;
    };
  }
  function title5(doc) {
    return function() {
      return doc.title;
    };
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading3() {
    }
    ;
    Loading3.value = new Loading3();
    return Loading3;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse4 = function(v2) {
    if (v2 === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v2 === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v2 === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map35 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = /* @__PURE__ */ function() {
    var $2 = map35(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse4($5));
      };
    }());
    return function($3) {
      return $2(_readyState($3));
    };
  }();

  // output/Web.HTML.History/foreign.js
  function replaceState(a3) {
    return function(docTitle) {
      return function(url2) {
        return function(history2) {
          return function() {
            return history2.replaceState(a3, docTitle, url2);
          };
        };
      };
    };
  }

  // output/Web.HTML.Location/foreign.js
  function hash2(location2) {
    return function() {
      return location2.hash;
    };
  }
  function setHash(hash3) {
    return function(location2) {
      return function() {
        location2.hash = hash3;
      };
    };
  }
  function search(location2) {
    return function() {
      return location2.search;
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }
  function location(window2) {
    return function() {
      return window2.location;
    };
  }
  function history(window2) {
    return function() {
      return window2.history;
    };
  }
  function localStorage2(window2) {
    return function() {
      return window2.localStorage;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Component.Chat.Messages/index.js
  var mapFlipped5 = /* @__PURE__ */ mapFlipped(functorArray);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var value15 = /* @__PURE__ */ value2(isPropString);
  var type_20 = /* @__PURE__ */ type_(isPropInputType);
  var bind15 = /* @__PURE__ */ bind(bindHalogenM);
  var monadEffectHalogenM2 = /* @__PURE__ */ monadEffectHalogenM(monadEffectAppM);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectHalogenM2);
  var monadAffHalogenM3 = /* @__PURE__ */ monadAffHalogenM(monadAffAppM);
  var liftAff2 = /* @__PURE__ */ liftAff(monadAffHalogenM3);
  var forever2 = /* @__PURE__ */ forever(monadRecAff);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure10 = /* @__PURE__ */ pure(applicativeHalogenM);
  var bind16 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorEffect);
  var warn3 = /* @__PURE__ */ warn2(monadEffectEffect);
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var gets3 = /* @__PURE__ */ gets(monadStateHalogenM);
  var pass4 = /* @__PURE__ */ pass2(applicativeHalogenM);
  var monadAskHalogenM3 = /* @__PURE__ */ monadAskHalogenM(monadAskAppM);
  var token3 = /* @__PURE__ */ token(monadAskHalogenM3)(monadAffHalogenM3);
  var messagesWithCursor2 = /* @__PURE__ */ messagesWithCursor(/* @__PURE__ */ monadAffExceptT(monadAffHalogenM3))(/* @__PURE__ */ monadAskExceptT(monadAskHalogenM3))(/* @__PURE__ */ monadThrowExceptT(monadHalogenM));
  var discard32 = /* @__PURE__ */ discard3(bindHalogenM);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindHalogenM);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var Following = /* @__PURE__ */ function() {
    function Following2() {
    }
    ;
    Following2.value = new Following2();
    return Following2;
  }();
  var NotFollowing = /* @__PURE__ */ function() {
    function NotFollowing2() {
    }
    ;
    NotFollowing2.value = new NotFollowing2();
    return NotFollowing2;
  }();
  var Initialize2 = /* @__PURE__ */ function() {
    function Initialize7() {
    }
    ;
    Initialize7.value = new Initialize7();
    return Initialize7;
  }();
  var Tick = /* @__PURE__ */ function() {
    function Tick3() {
    }
    ;
    Tick3.value = new Tick3();
    return Tick3;
  }();
  var MessagesScroll = /* @__PURE__ */ function() {
    function MessagesScroll2() {
    }
    ;
    MessagesScroll2.value = new MessagesScroll2();
    return MessagesScroll2;
  }();
  var ScrollBtnClicked = /* @__PURE__ */ function() {
    function ScrollBtnClicked2() {
    }
    ;
    ScrollBtnClicked2.value = new ScrollBtnClicked2();
    return ScrollBtnClicked2;
  }();
  var render2 = function(state3) {
    var isFollowing = function() {
      if (state3.scrollMode instanceof Following) {
        return true;
      }
      ;
      if (state3.scrollMode instanceof NotFollowing) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Messages (line 161, column 17 - line 163, column 25): " + [state3.scrollMode.constructor.name]);
    }();
    var dateTimeFormat = new Cons(new Placeholder("["), new Cons(DayOfMonth.value, new Cons(new Placeholder(" "), new Cons(MonthShort.value, new Cons(new Placeholder(" "), new Cons(Hours24.value, new Cons(new Placeholder(":"), new Cons(MinutesTwoDigits.value, new Cons(new Placeholder("]"), Nil.value)))))))));
    return div3([classNames(["relative"])])([div3([id3("messages"), classNames(["border-x-2", "border-t-2", "border-slate-400", "rounded-t-sm", "pl-2", "pr-1", "overflow-y-scroll", "relative", "h-chat", "bg-slate-100"]), onScroll($$const(MessagesScroll.value))])([ol([classNames(["flex", "flex-col-reverse", "wrap-anywhere"])])(mapFlipped5(fromCursored(state3.messages))(function(v2) {
      return li_([div3([classNames(["font-mono"])])([span3([classNames(["cursor-default", "text-blue-600", "font-datetime", "italic"])])([text(format(dateTimeFormat)(v2.createdAt) + " ")]), span3([classNames(["cursor-pointer", "text-blue-600", "hover:text-blue-700", "font-semibold"])])([text(toString5(v2.author) + ": ")]), p2([classNames(["inline"])])([text(toString(v2.text))])])]);
    }))]), input([classNames(append12(["w-8", "h-8", "text-center", "text-white", "duration-100", "transition", "rounded-lg", "text-sm", "text-center", "z-50", "absolute", "right-0", "bottom-0", "cursor-pointer", "mb-4", "mr-5", "bg-slate-400", "hover:bg-slate-500", "opacity-80", "hover:opacity-70"])(function() {
      if (isFollowing) {
        return ["hidden"];
      }
      ;
      return [];
    }())), value15("\u21E3"), type_20(InputButton.value), onClick($$const(ScrollBtnClicked.value))])]);
  };
  var initialState2 = function(user) {
    return {
      user,
      scrollMode: Following.value,
      messages: new WithCursor(Nothing.value, [])
    };
  };
  var handleAction2 = /* @__PURE__ */ function() {
    var timer = function(val) {
      return bind15(liftEffect5(create))(function(v2) {
        return bind15(liftAff2(forkAff(forever2(discard1(delay(1e3))(function() {
          return liftEffect1(notify(v2.listener)(val));
        })))))(function() {
          return pure10(v2.emitter);
        });
      });
    };
    var messagesScrollInfo = function(dictMonadEffect) {
      return liftEffect(dictMonadEffect)(function __do2() {
        var parent2 = mapFlipped1(bind16(windowImpl)(document2))(function($98) {
          return toNonElementParentNode(toDocument($98));
        })();
        var v2 = getElementById("messages")(parent2)();
        if (v2 instanceof Just) {
          var sheight = scrollHeight(v2.value0)();
          var cheight = clientHeight(v2.value0)();
          var top5 = scrollTop(v2.value0)();
          return new Just({
            el: v2.value0,
            cheight,
            sheight,
            top: top5
          });
        }
        ;
        if (v2 instanceof Nothing) {
          warn3("DOM Element not found by id = 'messages'")();
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Component.Chat.Messages (line 208, column 41 - line 216, column 21): " + [v2.constructor.name]);
      });
    };
    var messagesScrollInfo1 = messagesScrollInfo(monadEffectEffect);
    var messagesScrollInfo2 = messagesScrollInfo(monadEffectHalogenM2);
    var scrollToBottom = function(dictMonadEffect) {
      return liftEffect(dictMonadEffect)(bind16(messagesScrollInfo1)(traverse_4(function(v2) {
        return setScrollTop(v2.sheight)(v2.el);
      })));
    };
    var scrollToBottom1 = scrollToBottom(monadEffectHalogenM2);
    var updateScroll = bind15(gets3(function(v2) {
      return v2.scrollMode;
    }))(function(v2) {
      if (v2 instanceof NotFollowing) {
        return pass4;
      }
      ;
      if (v2 instanceof Following) {
        return scrollToBottom1;
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Messages (line 200, column 42 - line 202, column 31): " + [v2.constructor.name]);
    });
    var updateMessages = function(cursor) {
      return bind15(token3)(function(token1) {
        return raiseError(messagesWithCursor2(cursor)(token1))(function(v2) {
          var cursor$prime = function() {
            var $77 = isJust(v2.value0);
            if ($77) {
              return v2.value0;
            }
            ;
            return cursor;
          }();
          return discard32(modify_4(function(st) {
            var $78 = {};
            for (var $79 in st) {
              if ({}.hasOwnProperty.call(st, $79)) {
                $78[$79] = st[$79];
              }
              ;
            }
            ;
            $78.messages = new WithCursor(cursor$prime, append12(v2.value1)(fromCursored(st.messages)));
            return $78;
          }))(function() {
            return updateScroll;
          });
        });
      });
    };
    return function(v2) {
      if (v2 instanceof Initialize2) {
        return bind15(bindFlipped6(subscribe2)(timer(Tick.value)))(function() {
          return updateMessages(Nothing.value);
        });
      }
      ;
      if (v2 instanceof Tick) {
        return bind15(gets3(function(v1) {
          return v1.messages;
        }))(function(v1) {
          return updateMessages(v1.value0);
        });
      }
      ;
      if (v2 instanceof MessagesScroll) {
        return bind15(messagesScrollInfo2)(traverse_12(function(v1) {
          var $88 = abs2(v1.sheight - (v1.cheight + v1.top)) > 1;
          if ($88) {
            return modify_4(function(v22) {
              var $89 = {};
              for (var $90 in v22) {
                if ({}.hasOwnProperty.call(v22, $90)) {
                  $89[$90] = v22[$90];
                }
                ;
              }
              ;
              $89.scrollMode = NotFollowing.value;
              return $89;
            });
          }
          ;
          return modify_4(function(v22) {
            var $92 = {};
            for (var $93 in v22) {
              if ({}.hasOwnProperty.call(v22, $93)) {
                $92[$93] = v22[$93];
              }
              ;
            }
            ;
            $92.scrollMode = Following.value;
            return $92;
          });
        }));
      }
      ;
      if (v2 instanceof ScrollBtnClicked) {
        return scrollToBottom1;
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Messages (line 166, column 16 - line 179, column 19): " + [v2.constructor.name]);
    };
  }();
  var component2 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: initialState2,
      render: render2,
      "eval": mkEval({
        handleAction: handleAction2,
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: new Just(Initialize2.value),
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Network.RemoteData/index.js
  var NotAsked = /* @__PURE__ */ function() {
    function NotAsked2() {
    }
    ;
    NotAsked2.value = new NotAsked2();
    return NotAsked2;
  }();
  var Loading2 = /* @__PURE__ */ function() {
    function Loading3() {
    }
    ;
    Loading3.value = new Loading3();
    return Loading3;
  }();
  var Failure = /* @__PURE__ */ function() {
    function Failure2(value0) {
      this.value0 = value0;
    }
    ;
    Failure2.create = function(value0) {
      return new Failure2(value0);
    };
    return Failure2;
  }();
  var Success = /* @__PURE__ */ function() {
    function Success3(value0) {
      this.value0 = value0;
    }
    ;
    Success3.create = function(value0) {
      return new Success3(value0);
    };
    return Success3;
  }();
  var toMaybe2 = function(v2) {
    if (v2 instanceof Success) {
      return new Just(v2.value0);
    }
    ;
    return Nothing.value;
  };

  // output/Component.Chat.Users/index.js
  var append9 = /* @__PURE__ */ append(semigroupArray);
  var eq5 = /* @__PURE__ */ eq(eqPresence);
  var map36 = /* @__PURE__ */ map(functorArray);
  var sortWith2 = /* @__PURE__ */ sortWith(ordPresence);
  var monadAffHalogenM4 = /* @__PURE__ */ monadAffHalogenM(monadAffAppM);
  var monadAffExceptT2 = /* @__PURE__ */ monadAffExceptT(monadAffHalogenM4);
  var monadAskExceptT2 = /* @__PURE__ */ monadAskExceptT(/* @__PURE__ */ monadAskHalogenM(monadAskAppM));
  var modify_5 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind17 = /* @__PURE__ */ bind(bindHalogenM);
  var liftEffect6 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectHalogenM(monadEffectAppM));
  var liftAff3 = /* @__PURE__ */ liftAff(monadAffHalogenM4);
  var forever3 = /* @__PURE__ */ forever(monadRecAff);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var discard12 = /* @__PURE__ */ discard4(bindAff);
  var liftEffect12 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure11 = /* @__PURE__ */ pure(applicativeHalogenM);
  var discard22 = /* @__PURE__ */ discard4(bindHalogenM);
  var Initialize3 = /* @__PURE__ */ function() {
    function Initialize7() {
    }
    ;
    Initialize7.value = new Initialize7();
    return Initialize7;
  }();
  var ReceiveInput = /* @__PURE__ */ function() {
    function ReceiveInput2(value0) {
      this.value0 = value0;
    }
    ;
    ReceiveInput2.create = function(value0) {
      return new ReceiveInput2(value0);
    };
    return ReceiveInput2;
  }();
  var Tick2 = /* @__PURE__ */ function() {
    function Tick3() {
    }
    ;
    Tick3.value = new Tick3();
    return Tick3;
  }();
  var render3 = function(v2) {
    var renderUsers = function(st) {
      return li2([classNames(["flex", "flex-row"])])([div3([classNames(["flex", "flex-row", "h-fit", "items-center", "cursor-pointer"])])([span3([classNames(append9(["text-lg", "font-medium"])(function() {
        var $37 = eq5(st.presence)(Online.value);
        if ($37) {
          return ["text-green-700", "hover:text-green-800"];
        }
        ;
        return ["text-slate-600", "hover:text-slate-700"];
      }()))])([text(toString5(st.username))])])]);
    };
    return div3([classNames(["flex", "block", "flex-col", "bg-slate-200", "opacity-90", "rounded-b-md", "border-r", "border-y", "border-slate-300", "pr-2", "w-40", "h-fit", "min-w-fit", "row-span-full", "shadow-md", "cursor-default", "rounded-tr-sm"])])([function() {
      if (v2.users instanceof Success) {
        return ul([classNames(["w-full", "p-2"])])(map36(renderUsers)(sortWith2(function(v1) {
          return v1.presence;
        })(v2.users.value0)));
      }
      ;
      if (v2.users instanceof NotAsked) {
        return text("To be loaded.");
      }
      ;
      if (v2.users instanceof Loading2) {
        return text("Loading...");
      }
      ;
      if (v2.users instanceof Failure) {
        return text("Not Loaded. Please refresh.");
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Users (line 68, column 7 - line 77, column 48): " + [v2.users.constructor.name]);
    }()]);
  };
  var handleAction3 = /* @__PURE__ */ function() {
    var updateUsers = raiseError(bindFlipped(bindExceptT(monadHalogenM))(listUsers(monadAffExceptT2)(monadAskExceptT2)(monadThrowExceptT(monadHalogenM)))(token(monadAskExceptT2)(monadAffExceptT2)))(function(userPresenses) {
      return modify_5(function(v2) {
        var $42 = {};
        for (var $43 in v2) {
          if ({}.hasOwnProperty.call(v2, $43)) {
            $42[$43] = v2[$43];
          }
          ;
        }
        ;
        $42.users = new Success(userPresenses);
        return $42;
      });
    });
    var timer = function(val) {
      return bind17(liftEffect6(create))(function(v2) {
        return bind17(liftAff3(forkAff(forever3(discard12(delay(1e3))(function() {
          return liftEffect12(notify(v2.listener)(val));
        })))))(function() {
          return pure11(v2.emitter);
        });
      });
    };
    return function(v2) {
      if (v2 instanceof Initialize3) {
        return bind17(bind17(timer(Tick2.value))(subscribe2))(function() {
          return discard22(modify_5(function(v1) {
            var $49 = {};
            for (var $50 in v1) {
              if ({}.hasOwnProperty.call(v1, $50)) {
                $49[$50] = v1[$50];
              }
              ;
            }
            ;
            $49.users = Loading2.value;
            return $49;
          }))(function() {
            return updateUsers;
          });
        });
      }
      ;
      if (v2 instanceof ReceiveInput) {
        return modify_5(function(v1) {
          var $52 = {};
          for (var $53 in v1) {
            if ({}.hasOwnProperty.call(v1, $53)) {
              $52[$53] = v1[$53];
            }
            ;
          }
          ;
          $52.user = v2.value0;
          return $52;
        });
      }
      ;
      if (v2 instanceof Tick2) {
        return updateUsers;
      }
      ;
      throw new Error("Failed pattern match at Component.Chat.Users (line 110, column 16 - line 118, column 16): " + [v2.constructor.name]);
    };
  }();
  var component3 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: function(user) {
        return {
          user,
          users: NotAsked.value
        };
      },
      render: render3,
      "eval": mkEval({
        handleAction: handleAction3,
        handleQuery: defaultEval.handleQuery,
        receive: function($56) {
          return Just.create(ReceiveInput.create($56));
        },
        initialize: new Just(Initialize3.value),
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Component.Chat/index.js
  var slot2 = /* @__PURE__ */ slot();
  var slot1 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "users";
    }
  })(ordUnit);
  var slot22 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "messages";
    }
  })(ordUnit);
  var slot3 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "controls";
    }
  })(ordUnit);
  var HandleBackendError = /* @__PURE__ */ function() {
    function HandleBackendError2(value0) {
      this.value0 = value0;
    }
    ;
    HandleBackendError2.create = function(value0) {
      return new HandleBackendError2(value0);
    };
    return HandleBackendError2;
  }();
  var handleAction4 = function(v2) {
    return raise(v2.value0);
  };
  var component4 = /* @__PURE__ */ function() {
    var render10 = function(authUser) {
      var slotUsers = slot1($$Proxy.value)(unit)(component3)(authUser)(HandleBackendError.create);
      var slotMessages = slot22($$Proxy.value)(unit)(component2)(authUser)(HandleBackendError.create);
      var slotControls = slot3($$Proxy.value)(unit)(component)(authUser)(HandleBackendError.create);
      return div3([classNames(["grow", "block", "grid", "grid-cols-chat", "w-full", "gap-x-1", "grid-flow-col"])])([div3([classNames(["h-full", "flex", "flex-col", "pl-2"])])([slotMessages, slotControls]), slotUsers]);
    };
    return mkComponent({
      initialState: identity(categoryFn),
      render: render10,
      "eval": mkEval({
        handleAction: handleAction4,
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Data.Bounded.Generic/index.js
  var genericTopNoArguments = /* @__PURE__ */ function() {
    return {
      "genericTop'": NoArguments.value
    };
  }();
  var genericTop$prime = function(dict) {
    return dict["genericTop'"];
  };
  var genericTopConstructor = function(dictGenericTop) {
    return {
      "genericTop'": genericTop$prime(dictGenericTop)
    };
  };
  var genericTopSum = function(dictGenericTop) {
    return {
      "genericTop'": new Inr(genericTop$prime(dictGenericTop))
    };
  };
  var genericTop = function(dictGeneric) {
    var to3 = to2(dictGeneric);
    return function(dictGenericTop) {
      return to3(genericTop$prime(dictGenericTop));
    };
  };
  var genericBottomNoArguments = /* @__PURE__ */ function() {
    return {
      "genericBottom'": NoArguments.value
    };
  }();
  var genericBottom$prime = function(dict) {
    return dict["genericBottom'"];
  };
  var genericBottomConstructor = function(dictGenericBottom) {
    return {
      "genericBottom'": genericBottom$prime(dictGenericBottom)
    };
  };
  var genericBottomSum = function(dictGenericBottom) {
    return {
      "genericBottom'": new Inl(genericBottom$prime(dictGenericBottom))
    };
  };
  var genericBottom = function(dictGeneric) {
    var to3 = to2(dictGeneric);
    return function(dictGenericBottom) {
      return to3(genericBottom$prime(dictGenericBottom));
    };
  };

  // output/Data.Enum.Generic/index.js
  var map37 = /* @__PURE__ */ map(functorMaybe);
  var genericSucc$prime = function(dict) {
    return dict["genericSucc'"];
  };
  var genericSucc = function(dictGeneric) {
    var to3 = to2(dictGeneric);
    var from3 = from(dictGeneric);
    return function(dictGenericEnum) {
      var $156 = map37(to3);
      var $157 = genericSucc$prime(dictGenericEnum);
      return function($158) {
        return $156($157(from3($158)));
      };
    };
  };
  var genericPred$prime = function(dict) {
    return dict["genericPred'"];
  };
  var genericPred = function(dictGeneric) {
    var to3 = to2(dictGeneric);
    var from3 = from(dictGeneric);
    return function(dictGenericEnum) {
      var $159 = map37(to3);
      var $160 = genericPred$prime(dictGenericEnum);
      return function($161) {
        return $159($160(from3($161)));
      };
    };
  };
  var genericEnumSum = function(dictGenericEnum) {
    var genericPred$prime1 = genericPred$prime(dictGenericEnum);
    var genericSucc$prime1 = genericSucc$prime(dictGenericEnum);
    return function(dictGenericTop) {
      var genericTop$prime2 = genericTop$prime(dictGenericTop);
      return function(dictGenericEnum1) {
        var genericPred$prime2 = genericPred$prime(dictGenericEnum1);
        var genericSucc$prime2 = genericSucc$prime(dictGenericEnum1);
        return function(dictGenericBottom) {
          var genericBottom$prime2 = genericBottom$prime(dictGenericBottom);
          return {
            "genericPred'": function(v2) {
              if (v2 instanceof Inl) {
                return map37(Inl.create)(genericPred$prime1(v2.value0));
              }
              ;
              if (v2 instanceof Inr) {
                var v1 = genericPred$prime2(v2.value0);
                if (v1 instanceof Nothing) {
                  return new Just(new Inl(genericTop$prime2));
                }
                ;
                if (v1 instanceof Just) {
                  return new Just(new Inr(v1.value0));
                }
                ;
                throw new Error("Failed pattern match at Data.Enum.Generic (line 30, column 14 - line 32, column 31): " + [v1.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Enum.Generic (line 28, column 18 - line 32, column 31): " + [v2.constructor.name]);
            },
            "genericSucc'": function(v2) {
              if (v2 instanceof Inl) {
                var v1 = genericSucc$prime1(v2.value0);
                if (v1 instanceof Nothing) {
                  return new Just(new Inr(genericBottom$prime2));
                }
                ;
                if (v1 instanceof Just) {
                  return new Just(new Inl(v1.value0));
                }
                ;
                throw new Error("Failed pattern match at Data.Enum.Generic (line 34, column 14 - line 36, column 31): " + [v1.constructor.name]);
              }
              ;
              if (v2 instanceof Inr) {
                return map37(Inr.create)(genericSucc$prime2(v2.value0));
              }
              ;
              throw new Error("Failed pattern match at Data.Enum.Generic (line 33, column 18 - line 37, column 36): " + [v2.constructor.name]);
            }
          };
        };
      };
    };
  };
  var genericEnumNoArguments = {
    "genericPred'": function(v2) {
      return Nothing.value;
    },
    "genericSucc'": function(v2) {
      return Nothing.value;
    }
  };
  var genericEnumConstructor = function(dictGenericEnum) {
    var genericPred$prime1 = genericPred$prime(dictGenericEnum);
    var genericSucc$prime1 = genericSucc$prime(dictGenericEnum);
    return {
      "genericPred'": function(v2) {
        return map37(Constructor)(genericPred$prime1(v2));
      },
      "genericSucc'": function(v2) {
        return map37(Constructor)(genericSucc$prime1(v2));
      }
    };
  };

  // output/Data.Notification/index.js
  var genericShowConstructor2 = /* @__PURE__ */ genericShowConstructor(genericShowArgsNoArguments);
  var genericEnumConstructor2 = /* @__PURE__ */ genericEnumConstructor(genericEnumNoArguments);
  var genericTopConstructor2 = /* @__PURE__ */ genericTopConstructor(genericTopNoArguments);
  var genericEnumSum2 = /* @__PURE__ */ genericEnumSum(genericEnumConstructor2)(genericTopConstructor2);
  var genericBottomConstructor2 = /* @__PURE__ */ genericBottomConstructor(genericBottomNoArguments);
  var genericBottomSum2 = /* @__PURE__ */ genericBottomSum(genericBottomConstructor2);
  var genericEnumSum1 = /* @__PURE__ */ genericEnumSum2(/* @__PURE__ */ genericEnumSum2(genericEnumConstructor2)(genericBottomConstructor2))(genericBottomSum2);
  var Useful = /* @__PURE__ */ function() {
    function Useful2() {
    }
    ;
    Useful2.value = new Useful2();
    return Useful2;
  }();
  var Important = /* @__PURE__ */ function() {
    function Important2() {
    }
    ;
    Important2.value = new Important2();
    return Important2;
  }();
  var Critical = /* @__PURE__ */ function() {
    function Critical2() {
    }
    ;
    Critical2.value = new Critical2();
    return Critical2;
  }();
  var Notification = /* @__PURE__ */ function() {
    function Notification2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Notification2.create = function(value0) {
      return function(value1) {
        return new Notification2(value0, value1);
      };
    };
    return Notification2;
  }();
  var genericImportance_ = {
    to: function(x2) {
      if (x2 instanceof Inl) {
        return Useful.value;
      }
      ;
      if (x2 instanceof Inr && x2.value0 instanceof Inl) {
        return Important.value;
      }
      ;
      if (x2 instanceof Inr && x2.value0 instanceof Inr) {
        return Critical.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Notification (line 21, column 1 - line 21, column 37): " + [x2.constructor.name]);
    },
    from: function(x2) {
      if (x2 instanceof Useful) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x2 instanceof Important) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x2 instanceof Critical) {
        return new Inr(new Inr(NoArguments.value));
      }
      ;
      throw new Error("Failed pattern match at Data.Notification (line 21, column 1 - line 21, column 37): " + [x2.constructor.name]);
    }
  };
  var showImportance = {
    show: /* @__PURE__ */ genericShow(genericImportance_)(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Useful";
      }
    }))(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Important";
      }
    }))(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Critical";
      }
    }))))
  };
  var eqImportance = {
    eq: function(x2) {
      return function(y2) {
        if (x2 instanceof Useful && y2 instanceof Useful) {
          return true;
        }
        ;
        if (x2 instanceof Important && y2 instanceof Important) {
          return true;
        }
        ;
        if (x2 instanceof Critical && y2 instanceof Critical) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordImportance = {
    compare: function(x2) {
      return function(y2) {
        if (x2 instanceof Useful && y2 instanceof Useful) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Useful) {
          return LT.value;
        }
        ;
        if (y2 instanceof Useful) {
          return GT.value;
        }
        ;
        if (x2 instanceof Important && y2 instanceof Important) {
          return EQ.value;
        }
        ;
        if (x2 instanceof Important) {
          return LT.value;
        }
        ;
        if (y2 instanceof Important) {
          return GT.value;
        }
        ;
        if (x2 instanceof Critical && y2 instanceof Critical) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Notification (line 0, column 0 - line 0, column 0): " + [x2.constructor.name, y2.constructor.name]);
      };
    },
    Eq0: function() {
      return eqImportance;
    }
  };
  var enumImportance = {
    succ: /* @__PURE__ */ genericSucc(genericImportance_)(genericEnumSum1),
    pred: /* @__PURE__ */ genericPred(genericImportance_)(genericEnumSum1),
    Ord0: function() {
      return ordImportance;
    }
  };
  var boundedImportance = {
    top: /* @__PURE__ */ genericTop(genericImportance_)(/* @__PURE__ */ genericTopSum(/* @__PURE__ */ genericTopSum(genericTopConstructor2))),
    bottom: /* @__PURE__ */ genericBottom(genericImportance_)(genericBottomSum2),
    Ord0: function() {
      return ordImportance;
    }
  };
  var useful = /* @__PURE__ */ function() {
    return Notification.create(Useful.value);
  }();
  var important = /* @__PURE__ */ function() {
    return Notification.create(Important.value);
  }();
  var critical = /* @__PURE__ */ function() {
    return Notification.create(Critical.value);
  }();

  // output/Component.Debug/index.js
  var type_21 = /* @__PURE__ */ type_(isPropButtonType);
  var append10 = /* @__PURE__ */ append(semigroupArray);
  var mapFlipped6 = /* @__PURE__ */ mapFlipped(functorArray);
  var enumFromTo2 = /* @__PURE__ */ enumFromTo(enumImportance)(unfoldable1Array);
  var bottom4 = /* @__PURE__ */ bottom(boundedImportance);
  var top4 = /* @__PURE__ */ top(boundedImportance);
  var show28 = /* @__PURE__ */ show(showImportance);
  var type_1 = /* @__PURE__ */ type_(isPropInputType);
  var modify_6 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind18 = /* @__PURE__ */ bind(bindHalogenM);
  var gets4 = /* @__PURE__ */ gets(monadStateHalogenM);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var mapFlipped12 = /* @__PURE__ */ mapFlipped(functorHalogenM);
  var Ticked = /* @__PURE__ */ function() {
    function Ticked2(value0) {
      this.value0 = value0;
    }
    ;
    Ticked2.create = function(value0) {
      return new Ticked2(value0);
    };
    return Ticked2;
  }();
  var SendNotification = /* @__PURE__ */ function() {
    function SendNotification2() {
    }
    ;
    SendNotification2.value = new SendNotification2();
    return SendNotification2;
  }();
  var render4 = function(v2) {
    var buttonColor = function() {
      if (v2.selectedImportance instanceof Nothing) {
        return [];
      }
      ;
      if (v2.selectedImportance instanceof Just && v2.selectedImportance.value0 instanceof Useful) {
        return ["border-green-600", "bg-green-200"];
      }
      ;
      if (v2.selectedImportance instanceof Just && v2.selectedImportance.value0 instanceof Important) {
        return ["border-orange-600", "bg-orange-200"];
      }
      ;
      if (v2.selectedImportance instanceof Just && v2.selectedImportance.value0 instanceof Critical) {
        return ["border-red-600", "bg-red-200"];
      }
      ;
      throw new Error("Failed pattern match at Component.Debug (line 113, column 17 - line 117, column 55): " + [v2.selectedImportance.constructor.name]);
    }();
    return div3([classNames(["flex", "items-center", "justify-center", "grow", "bg-gray-100"])])([div3([classNames(["max-w-md", "w-full", "flex", "flex-col", "justify-center", "items-center", "space-y-3", "rounded", "border", "border-slate-300", "p-5", "shadow-xl", "bg-white"])])([button([type_21(ButtonButton.value), onClick(function(v1) {
      return SendNotification.value;
    }), classNames(append10(["font-medium", "border-2", "w-3/5", "mb-2", "h-12"])(buttonColor))])([span_([text("Send notification")])]), p2([classNames(["text-xl"])])([text("Choose notification type below:")]), form([id3("form-notification_type"), classNames(["w-fit", "mt-0", "flex", "flex-col"])])(mapFlipped6(enumFromTo2(bottom4)(top4))(function(importance) {
      var id_ = toLower(show28(importance));
      return section_([input([name3("specify-notification"), id3(id_), type_1(InputRadio.value), onInput(function(v1) {
        return new Ticked(importance);
      }), classNames(["scale-125"])]), label([$$for(id_), classNames(["ml-2"])])([text(show28(importance))])]);
    }))])]);
  };
  var initialState3 = function(v2) {
    return {
      selectedImportance: Nothing.value
    };
  };
  var handleAction5 = function(dictMonadAsk) {
    var asks3 = asks(monadAskHalogenM(dictMonadAsk));
    return function(dictMonadEffect) {
      var liftEffect15 = liftEffect(monadEffectHalogenM(dictMonadEffect));
      return function(v2) {
        if (v2 instanceof Ticked) {
          return modify_6(function(v1) {
            var $42 = {};
            for (var $43 in v1) {
              if ({}.hasOwnProperty.call(v1, $43)) {
                $42[$43] = v1[$43];
              }
              ;
            }
            ;
            $42.selectedImportance = new Just(v2.value0);
            return $42;
          });
        }
        ;
        if (v2 instanceof SendNotification) {
          return bind18(gets4(function(v1) {
            return v1.selectedImportance;
          }))(traverse_5(function(importance) {
            return bind18(mapFlipped12(asks3(function(v1) {
              return v1.notifications.listener;
            }))(function(listener) {
              var $47 = notify(listener);
              return function($48) {
                return liftEffect15($47($48));
              };
            }))(function(notify2) {
              if (importance instanceof Useful) {
                return notify2(useful("Useful"));
              }
              ;
              if (importance instanceof Important) {
                return notify2(important("Important"));
              }
              ;
              if (importance instanceof Critical) {
                return notify2(critical("Critical"));
              }
              ;
              throw new Error("Failed pattern match at Component.Debug (line 132, column 7 - line 135, column 48): " + [importance.constructor.name]);
            });
          }));
        }
        ;
        throw new Error("Failed pattern match at Component.Debug (line 125, column 16 - line 135, column 48): " + [v2.constructor.name]);
      };
    };
  };
  var component5 = function(dictMonadAsk) {
    var handleAction1 = handleAction5(dictMonadAsk);
    return function(dictMonadEffect) {
      return mkComponent({
        initialState: initialState3,
        render: render4,
        "eval": mkEval({
          handleAction: handleAction1(dictMonadEffect),
          handleQuery: defaultEval.handleQuery,
          receive: defaultEval.receive,
          initialize: defaultEval.initialize,
          finalize: defaultEval.finalize
        })
      });
    };
  };

  // output/Component.Error/index.js
  var type_22 = /* @__PURE__ */ type_(isPropInputType);
  var value16 = /* @__PURE__ */ value2(isPropString);
  var Retry = /* @__PURE__ */ function() {
    function Retry2() {
    }
    ;
    Retry2.value = new Retry2();
    return Retry2;
  }();
  var SignIn = /* @__PURE__ */ function() {
    function SignIn2() {
    }
    ;
    SignIn2.value = new SignIn2();
    return SignIn2;
  }();
  var Notify = /* @__PURE__ */ function() {
    function Notify3(value0) {
      this.value0 = value0;
    }
    ;
    Notify3.create = function(value0) {
      return new Notify3(value0);
    };
    return Notify3;
  }();
  var renderError = function(v2) {
    if (v2 instanceof BackendError && (v2.value0 instanceof ResponseStatusError && v2.value0.value0.actual === 403)) {
      return div_([p_([text(" Your session has expired!  ")]), p2([classNames(["mt-3", "mb-3"])])([text("Please sign in to your account again.")])]);
    }
    ;
    if (v2 instanceof BackendError && (v2.value0 instanceof AffjaxError && v2.value0.value0 instanceof TimeoutError)) {
      return div_([p_([text("\n              We tried sooo hard but couldn't reach the backend\n              in the given time anyway.\n              ")]), p2([classNames(["mt-3", "mb-3"])])([text("Please check your network connection and retry later.")])]);
    }
    ;
    return text("\n    We are really sorry, but application is unable to serve your\n    request at this time because of an unexpected critical error.\n    ");
  };
  var handleAction6 = function(v2) {
    return raise(v2.value0);
  };
  var errorAction = /* @__PURE__ */ function() {
    var signin = {
      action: SignIn.value,
      caption: "Okay"
    };
    var retry = {
      action: Retry.value,
      caption: "Retry"
    };
    return function(v2) {
      if (v2 instanceof BackendError && (v2.value0 instanceof ResponseStatusError && v2.value0.value0.actual === 403)) {
        return signin;
      }
      ;
      return retry;
    };
  }();
  var render5 = function(error5) {
    return function(v2) {
      return div3([classNames(["flex", "items-center", "justify-center", "min-h-screen", "bg-gray-100"])])([form([classNames(["max-w-md", "w-full", "flex", "flex-col", "justify-center", "items-center", "space-y-3", "rounded", "border", "border-slate-300", "p-5", "shadow-xl", "bg-white"]), onSubmit(function(v1) {
        return new Notify(v2.action);
      })])([span3([classNames(["text-8xl", "font-semibold"])])([text("Ouch,")]), span3([classNames(["font-medium", "text-center"])])([renderError(error5)]), input([classNames(["group", "w-full", "flex", "justify-center", "py-2", "px-4", "border", "border-transparent", "text-sm", "font-medium", "rounded-md", "text-white", "bg-indigo-600", "hover-bg-indigo-700", "focus-outline-none", "focus-ring-2", "focus-ring-offset-2", "focus-ring-indigo-500", "cursor-pointer"]), type_22(InputSubmit.value), value16(v2.caption), autofocus(true)])])]);
    }(errorAction(error5));
  };
  var component6 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: identity(categoryFn),
      render: render5,
      "eval": mkEval({
        handleAction: handleAction6,
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Routing.Duplex.Types/index.js
  var emptyRouteState = {
    segments: [],
    params: [],
    hash: ""
  };

  // output/Routing.Duplex.Parser/index.js
  var $runtime_lazy11 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var fromJust10 = /* @__PURE__ */ fromJust();
  var map38 = /* @__PURE__ */ map(functorArray);
  var bimap5 = /* @__PURE__ */ bimap(bifunctorTuple);
  var genericShowArgsArgument2 = /* @__PURE__ */ genericShowArgsArgument(showString);
  var genericShowConstructor3 = /* @__PURE__ */ genericShowConstructor(genericShowArgsArgument2);
  var map113 = /* @__PURE__ */ map(functorNonEmptyArray);
  var map210 = /* @__PURE__ */ map(functorFn);
  var foldl3 = /* @__PURE__ */ foldl(foldableNonEmptyArray);
  var append11 = /* @__PURE__ */ append(semigroupNonEmptyArray);
  var Expected = /* @__PURE__ */ function() {
    function Expected2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Expected2.create = function(value0) {
      return function(value1) {
        return new Expected2(value0, value1);
      };
    };
    return Expected2;
  }();
  var ExpectedEndOfPath = /* @__PURE__ */ function() {
    function ExpectedEndOfPath2(value0) {
      this.value0 = value0;
    }
    ;
    ExpectedEndOfPath2.create = function(value0) {
      return new ExpectedEndOfPath2(value0);
    };
    return ExpectedEndOfPath2;
  }();
  var MissingParam = /* @__PURE__ */ function() {
    function MissingParam2(value0) {
      this.value0 = value0;
    }
    ;
    MissingParam2.create = function(value0) {
      return new MissingParam2(value0);
    };
    return MissingParam2;
  }();
  var EndOfPath = /* @__PURE__ */ function() {
    function EndOfPath2() {
    }
    ;
    EndOfPath2.value = new EndOfPath2();
    return EndOfPath2;
  }();
  var Fail = /* @__PURE__ */ function() {
    function Fail3(value0) {
      this.value0 = value0;
    }
    ;
    Fail3.create = function(value0) {
      return new Fail3(value0);
    };
    return Fail3;
  }();
  var Success2 = /* @__PURE__ */ function() {
    function Success3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Success3.create = function(value0) {
      return function(value1) {
        return new Success3(value0, value1);
      };
    };
    return Success3;
  }();
  var Alt = /* @__PURE__ */ function() {
    function Alt2(value0) {
      this.value0 = value0;
    }
    ;
    Alt2.create = function(value0) {
      return new Alt2(value0);
    };
    return Alt2;
  }();
  var Chomp = /* @__PURE__ */ function() {
    function Chomp2(value0) {
      this.value0 = value0;
    }
    ;
    Chomp2.create = function(value0) {
      return new Chomp2(value0);
    };
    return Chomp2;
  }();
  var Prefix = /* @__PURE__ */ function() {
    function Prefix2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Prefix2.create = function(value0) {
      return function(value1) {
        return new Prefix2(value0, value1);
      };
    };
    return Prefix2;
  }();
  var prefix = /* @__PURE__ */ function() {
    return Prefix.create;
  }();
  var parsePath = /* @__PURE__ */ function() {
    var unsafeDecodeURIComponent = function($327) {
      return fromJust10($$decodeURIComponent($327));
    };
    var toRouteState = function(v2) {
      return {
        segments: v2.value0.value0,
        params: v2.value0.value1,
        hash: v2.value1
      };
    };
    var splitNonEmpty = function(v2) {
      return function(v1) {
        if (v1 === "") {
          return [];
        }
        ;
        return split(v2)(v1);
      };
    };
    var splitSegments = function() {
      var $328 = splitNonEmpty("/");
      return function($329) {
        return function(v2) {
          if (v2.length === 2 && (v2[0] === "" && v2[1] === "")) {
            return [""];
          }
          ;
          return map38(unsafeDecodeURIComponent)(v2);
        }($328($329));
      };
    }();
    var splitAt4 = function(k2) {
      return function(p3) {
        return function(str) {
          var v2 = indexOf(p3)(str);
          if (v2 instanceof Just) {
            return new Tuple(take2(v2.value0)(str), drop2(v2.value0 + length2(p3) | 0)(str));
          }
          ;
          if (v2 instanceof Nothing) {
            return k2(str);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 185, column 5 - line 187, column 23): " + [v2.constructor.name]);
        };
      };
    };
    var splitKeyValue = function() {
      var $330 = bimap5(unsafeDecodeURIComponent)(unsafeDecodeURIComponent);
      var $331 = splitAt4(flip(Tuple.create)(""))("=");
      return function($332) {
        return $330($331($332));
      };
    }();
    var splitParams = function() {
      var $333 = map38(splitKeyValue);
      var $334 = splitNonEmpty("&");
      return function($335) {
        return $333($334($335));
      };
    }();
    var splitPath = function() {
      var $336 = bimap5(splitSegments)(splitParams);
      var $337 = splitAt4(flip(Tuple.create)(""))("?");
      return function($338) {
        return $336($337($338));
      };
    }();
    var $339 = lmap(bifunctorTuple)(splitPath);
    var $340 = splitAt4(flip(Tuple.create)(""))("#");
    return function($341) {
      return toRouteState($339($340($341)));
    };
  }();
  var genericRouteError = {
    to: function(x2) {
      if (x2 instanceof Inl) {
        return new Expected(x2.value0.value0, x2.value0.value1);
      }
      ;
      if (x2 instanceof Inr && x2.value0 instanceof Inl) {
        return new ExpectedEndOfPath(x2.value0.value0);
      }
      ;
      if (x2 instanceof Inr && (x2.value0 instanceof Inr && x2.value0.value0 instanceof Inl)) {
        return new MissingParam(x2.value0.value0.value0);
      }
      ;
      if (x2 instanceof Inr && (x2.value0 instanceof Inr && x2.value0.value0 instanceof Inr)) {
        return EndOfPath.value;
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 64, column 1 - line 64, column 58): " + [x2.constructor.name]);
    },
    from: function(x2) {
      if (x2 instanceof Expected) {
        return new Inl(new Product(x2.value0, x2.value1));
      }
      ;
      if (x2 instanceof ExpectedEndOfPath) {
        return new Inr(new Inl(x2.value0));
      }
      ;
      if (x2 instanceof MissingParam) {
        return new Inr(new Inr(new Inl(x2.value0)));
      }
      ;
      if (x2 instanceof EndOfPath) {
        return new Inr(new Inr(new Inr(NoArguments.value)));
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 64, column 1 - line 64, column 58): " + [x2.constructor.name]);
    }
  };
  var showRouteError = {
    show: /* @__PURE__ */ genericShow(genericRouteError)(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor(/* @__PURE__ */ genericShowArgsProduct(genericShowArgsArgument2)(genericShowArgsArgument2))({
      reflectSymbol: function() {
        return "Expected";
      }
    }))(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor3({
      reflectSymbol: function() {
        return "ExpectedEndOfPath";
      }
    }))(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor3({
      reflectSymbol: function() {
        return "MissingParam";
      }
    }))(/* @__PURE__ */ genericShowConstructor(genericShowArgsNoArguments)({
      reflectSymbol: function() {
        return "EndOfPath";
      }
    })))))
  };
  var functorRouteResult = {
    map: function(f2) {
      return function(m2) {
        if (m2 instanceof Fail) {
          return new Fail(m2.value0);
        }
        ;
        if (m2 instanceof Success2) {
          return new Success2(m2.value0, f2(m2.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m2.constructor.name]);
      };
    }
  };
  var map39 = /* @__PURE__ */ map(functorRouteResult);
  var functorRouteParser = {
    map: function(f2) {
      return function(m2) {
        if (m2 instanceof Alt) {
          return new Alt(map113(map(functorRouteParser)(f2))(m2.value0));
        }
        ;
        if (m2 instanceof Chomp) {
          return new Chomp(map210(map39(f2))(m2.value0));
        }
        ;
        if (m2 instanceof Prefix) {
          return new Prefix(m2.value0, map(functorRouteParser)(f2)(m2.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m2.constructor.name]);
      };
    }
  };
  var end = /* @__PURE__ */ function() {
    return new Chomp(function(state3) {
      var v2 = head2(state3.segments);
      if (v2 instanceof Nothing) {
        return new Success2(state3, unit);
      }
      ;
      if (v2 instanceof Just) {
        return new Fail(new ExpectedEndOfPath(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 256, column 3 - line 258, column 45): " + [v2.constructor.name]);
    });
  }();
  var chompPrefix = function(pre2) {
    return function(state3) {
      var v2 = head2(state3.segments);
      if (v2 instanceof Just && pre2 === v2.value0) {
        return new Success2({
          segments: drop3(1)(state3.segments),
          params: state3.params,
          hash: state3.hash
        }, unit);
      }
      ;
      if (v2 instanceof Just) {
        return new Fail(new Expected(pre2, v2.value0));
      }
      ;
      return new Fail(EndOfPath.value);
    };
  };
  var $lazy_runRouteParser = /* @__PURE__ */ $runtime_lazy11("runRouteParser", "Routing.Duplex.Parser", function() {
    var goAlt = function(v2) {
      return function(v1) {
        return function(v22) {
          if (v1 instanceof Fail) {
            return $lazy_runRouteParser(153)(v2)(v22);
          }
          ;
          return v1;
        };
      };
    };
    var go3 = function($copy_state) {
      return function($copy_v) {
        var $tco_var_state = $copy_state;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(state3, v2) {
          if (v2 instanceof Alt) {
            $tco_done = true;
            return foldl3(goAlt(state3))(new Fail(EndOfPath.value))(v2.value0);
          }
          ;
          if (v2 instanceof Chomp) {
            $tco_done = true;
            return v2.value0(state3);
          }
          ;
          if (v2 instanceof Prefix) {
            var v1 = chompPrefix(v2.value0)(state3);
            if (v1 instanceof Fail) {
              $tco_done = true;
              return new Fail(v1.value0);
            }
            ;
            if (v1 instanceof Success2) {
              $tco_var_state = v1.value0;
              $copy_v = v2.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 149, column 7 - line 151, column 40): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 145, column 14 - line 151, column 40): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_state, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go3;
  });
  var runRouteParser = /* @__PURE__ */ $lazy_runRouteParser(142);
  var run4 = function(p3) {
    var $344 = flip(runRouteParser)(p3);
    return function($345) {
      return function(v2) {
        if (v2 instanceof Fail) {
          return new Left(v2.value0);
        }
        ;
        if (v2 instanceof Success2) {
          return new Right(v2.value1);
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 190, column 49 - line 192, column 29): " + [v2.constructor.name]);
      }($344(parsePath($345)));
    };
  };
  var applyRouteParser = {
    apply: function(fx) {
      return function(x2) {
        return new Chomp(function(state3) {
          var v2 = runRouteParser(state3)(fx);
          if (v2 instanceof Fail) {
            return new Fail(v2.value0);
          }
          ;
          if (v2 instanceof Success2) {
            return map39(v2.value1)(runRouteParser(v2.value0)(x2));
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 76, column 5 - line 78, column 56): " + [v2.constructor.name]);
        });
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var applicativeRouteParser = {
    pure: /* @__PURE__ */ function() {
      var $346 = flip(Success2.create);
      return function($347) {
        return Chomp.create($346($347));
      };
    }(),
    Apply0: function() {
      return applyRouteParser;
    }
  };
  var altSnoc = function(ls) {
    return function(v2) {
      var v1 = function(v22) {
        return snoc3(ls)(v2);
      };
      if (v2 instanceof Prefix) {
        var $287 = last3(ls);
        if ($287 instanceof Prefix) {
          var $288 = v2.value0 === $287.value0;
          if ($288) {
            return snoc$prime(init3(ls))(new Prefix(v2.value0, alt(altRouteParser)($287.value1)(v2.value1)));
          }
          ;
          return v1(true);
        }
        ;
        return v1(true);
      }
      ;
      return v1(true);
    };
  };
  var altRouteParser = {
    alt: function(v2) {
      return function(v1) {
        if (v2 instanceof Alt && v1 instanceof Alt) {
          return new Alt(altAppend(v2.value0)(v1.value0));
        }
        ;
        if (v2 instanceof Alt) {
          return new Alt(altSnoc(v2.value0)(v1));
        }
        ;
        if (v1 instanceof Alt) {
          return new Alt(altCons(v2)(v1.value0));
        }
        ;
        if (v2 instanceof Prefix && (v1 instanceof Prefix && v2.value0 === v1.value0)) {
          return new Prefix(v2.value0, alt(altRouteParser)(v2.value1)(v1.value1));
        }
        ;
        return new Alt(cons4(v2)(singleton7(v1)));
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var altCons = function(v2) {
    return function(rs) {
      var v1 = function(v22) {
        return cons4(v2)(rs);
      };
      if (v2 instanceof Prefix) {
        var $307 = head3(rs);
        if ($307 instanceof Prefix) {
          var $308 = v2.value0 === $307.value0;
          if ($308) {
            return cons$prime2(new Prefix(v2.value0, alt(altRouteParser)(v2.value1)($307.value1)))(tail2(rs));
          }
          ;
          return v1(true);
        }
        ;
        return v1(true);
      }
      ;
      return v1(true);
    };
  };
  var altAppend = function($copy_ls) {
    return function($copy_rs) {
      var $tco_var_ls = $copy_ls;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(ls, rs) {
        var v2 = function(v12) {
          if (otherwise) {
            return append11(ls)(rs);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 98, column 1 - line 101, column 32): " + [ls.constructor.name, rs.constructor.name]);
        };
        var $317 = last3(ls);
        if ($317 instanceof Prefix) {
          var $318 = head3(rs);
          if ($318 instanceof Prefix) {
            var $319 = $317.value0 === $318.value0;
            if ($319) {
              var rs$prime = cons$prime2(new Prefix($317.value0, alt(altRouteParser)($317.value1)($318.value1)))(tail2(rs));
              var v1 = fromArray(init3(ls));
              if (v1 instanceof Just) {
                $tco_var_ls = v1.value0;
                $copy_rs = rs$prime;
                return;
              }
              ;
              if (v1 instanceof Nothing) {
                $tco_done = true;
                return rs$prime;
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Parser (line 110, column 9 - line 112, column 26): " + [v1.constructor.name]);
            }
            ;
            $tco_done = true;
            return v2(true);
          }
          ;
          $tco_done = true;
          return v2(true);
        }
        ;
        $tco_done = true;
        return v2(true);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_ls, $copy_rs);
      }
      ;
      return $tco_result;
    };
  };

  // output/Routing.Duplex.Printer/index.js
  var fromJust11 = /* @__PURE__ */ fromJust();
  var map40 = /* @__PURE__ */ map(functorArray);
  var semigroupRoutePrinter = {
    append: function(v2) {
      return function(v1) {
        return function($32) {
          return v1(v2($32));
        };
      };
    }
  };
  var put3 = function(str) {
    return function(state3) {
      return {
        segments: snoc2(state3.segments)(str),
        params: state3.params,
        hash: state3.hash
      };
    };
  };
  var printPath = function(v2) {
    var unsafeEncodeURIComponent = function($34) {
      return fromJust11($$encodeURIComponent($34));
    };
    var printSegments = function(v1) {
      if (v1.length === 1 && v1[0] === "") {
        return "/";
      }
      ;
      return joinWith("/")(map40(unsafeEncodeURIComponent)(v1));
    };
    var printParam = function(key2) {
      return function(v1) {
        if (v1 === "") {
          return unsafeEncodeURIComponent(key2);
        }
        ;
        return unsafeEncodeURIComponent(key2) + ("=" + unsafeEncodeURIComponent(v1));
      };
    };
    var printParams = function(v1) {
      if (v1.length === 0) {
        return "";
      }
      ;
      return "?" + joinWith("&")(map40(uncurry(printParam))(v1));
    };
    var printHash = function(v1) {
      if (v1 === "") {
        return "";
      }
      ;
      return "#" + v1;
    };
    return printSegments(v2.segments) + (printParams(v2.params) + printHash(v2.hash));
  };
  var run5 = /* @__PURE__ */ function() {
    var $35 = applyFlipped(emptyRouteState);
    var $36 = unwrap();
    return function($37) {
      return printPath($35($36($37)));
    };
  }();
  var monoidRoutePRinter = {
    mempty: /* @__PURE__ */ identity(categoryFn),
    Semigroup0: function() {
      return semigroupRoutePrinter;
    }
  };

  // output/Routing.Duplex/index.js
  var append13 = /* @__PURE__ */ append(semigroupRoutePrinter);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyRouteParser);
  var pure14 = /* @__PURE__ */ pure(applicativeRouteParser);
  var apply4 = /* @__PURE__ */ apply(applyRouteParser);
  var map41 = /* @__PURE__ */ map(functorRouteParser);
  var mempty3 = /* @__PURE__ */ mempty(monoidRoutePRinter);
  var apply1 = /* @__PURE__ */ apply(applyFn);
  var map114 = /* @__PURE__ */ map(functorFn);
  var RouteDuplex = /* @__PURE__ */ function() {
    function RouteDuplex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RouteDuplex2.create = function(value0) {
      return function(value1) {
        return new RouteDuplex2(value0, value1);
      };
    };
    return RouteDuplex2;
  }();
  var profunctorRouteDuplex = {
    dimap: function(f2) {
      return function(g2) {
        return function(v2) {
          return new RouteDuplex(function($137) {
            return v2.value0(f2($137));
          }, map41(g2)(v2.value1));
        };
      };
    }
  };
  var print7 = function(v2) {
    return function($138) {
      return run5(v2.value0($138));
    };
  };
  var prefix2 = function(s2) {
    return function(v2) {
      return new RouteDuplex(function(a3) {
        return append13(put3(s2))(v2.value0(a3));
      }, prefix(s2)(v2.value1));
    };
  };
  var path = /* @__PURE__ */ function() {
    var $139 = flip(foldr(foldableArray)(prefix2));
    var $140 = split("/");
    return function($141) {
      return $139($140($141));
    };
  }();
  var root = /* @__PURE__ */ path("");
  var parse9 = function(v2) {
    return run4(v2.value1);
  };
  var functorRouteDuplex = {
    map: function(f2) {
      return function(m2) {
        return new RouteDuplex(m2.value0, map41(f2)(m2.value1));
      };
    }
  };
  var end2 = function(v2) {
    return new RouteDuplex(v2.value0, applyFirst2(v2.value1)(end));
  };
  var applyRouteDuplex = {
    apply: function(v2) {
      return function(v1) {
        return new RouteDuplex(apply1(map114(append13)(v2.value0))(v1.value0), apply4(v2.value1)(v1.value1));
      };
    },
    Functor0: function() {
      return functorRouteDuplex;
    }
  };
  var applicativeRouteDuplex = {
    pure: /* @__PURE__ */ function() {
      var $143 = RouteDuplex.create($$const(mempty3));
      return function($144) {
        return $143(pure14($144));
      };
    }(),
    Apply0: function() {
      return applyRouteDuplex;
    }
  };

  // output/Routing.Duplex.Generic/index.js
  var identity14 = /* @__PURE__ */ identity(categoryFn);
  var map42 = /* @__PURE__ */ map(functorRouteParser);
  var alt9 = /* @__PURE__ */ alt(altRouteParser);
  var dimap2 = /* @__PURE__ */ dimap(profunctorRouteDuplex);
  var noArgs = /* @__PURE__ */ function() {
    return pure(applicativeRouteDuplex)(NoArguments.value);
  }();
  var gRouteNoArguments = {
    gRouteDuplexCtr: identity14
  };
  var gRouteDuplexCtr = function(dict) {
    return dict.gRouteDuplexCtr;
  };
  var gRouteDuplex = function(dict) {
    return dict.gRouteDuplex;
  };
  var gRouteSum = function(dictGRouteDuplex) {
    var gRouteDuplex1 = gRouteDuplex(dictGRouteDuplex);
    return function(dictGRouteDuplex1) {
      var gRouteDuplex2 = gRouteDuplex(dictGRouteDuplex1);
      return {
        gRouteDuplex: function(r2) {
          var v2 = gRouteDuplex1(r2);
          var v1 = gRouteDuplex2(r2);
          var enc = function(v22) {
            if (v22 instanceof Inl) {
              return v2.value0(v22.value0);
            }
            ;
            if (v22 instanceof Inr) {
              return v1.value0(v22.value0);
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Generic (line 33, column 11 - line 35, column 22): " + [v22.constructor.name]);
          };
          var dec = alt9(map42(Inl.create)(v2.value1))(map42(Inr.create)(v1.value1));
          return new RouteDuplex(enc, dec);
        }
      };
    };
  };
  var sum2 = function(dictGeneric) {
    var from3 = from(dictGeneric);
    var to3 = to2(dictGeneric);
    return function(dictGRouteDuplex) {
      var $66 = dimap2(from3)(to3);
      var $67 = gRouteDuplex(dictGRouteDuplex);
      return function($68) {
        return $66($67($68));
      };
    };
  };
  var gRouteConstructor = function(dictIsSymbol) {
    var get4 = get(dictIsSymbol)();
    return function() {
      return function(dictGRouteDuplexCtr) {
        var gRouteDuplexCtr1 = gRouteDuplexCtr(dictGRouteDuplexCtr);
        return {
          gRouteDuplex: function(r2) {
            var v2 = end2(gRouteDuplexCtr1(get4($$Proxy.value)(r2)));
            var enc = function(v1) {
              return v2.value0(v1);
            };
            var dec = map42(Constructor)(v2.value1);
            return new RouteDuplex(enc, dec);
          }
        };
      };
    };
  };

  // output/Web.HTML.Event.HashChangeEvent.EventTypes/index.js
  var hashchange = "hashchange";

  // output/Routing.Hash/index.js
  var bind19 = /* @__PURE__ */ bind(bindEffect);
  var map43 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var join3 = /* @__PURE__ */ join(bindEffect);
  var apply5 = /* @__PURE__ */ apply(applyEffect);
  var pure15 = /* @__PURE__ */ pure(applicativeEffect);
  var voidRight3 = /* @__PURE__ */ voidRight(functorEffect);
  var setHash2 = function(h7) {
    return bind19(bind19(windowImpl)(location))(setHash(h7));
  };
  var getHash = /* @__PURE__ */ bind19(/* @__PURE__ */ bind19(windowImpl)(location))(/* @__PURE__ */ function() {
    var $16 = map43(function() {
      var $18 = fromMaybe("");
      var $19 = stripPrefix("#");
      return function($20) {
        return $18($19($20));
      };
    }());
    return function($17) {
      return $16(hash2($17));
    };
  }());
  var foldHashes = function(cb) {
    return function(init4) {
      return function __do2() {
        var ref3 = bindFlipped7($$new)(bindFlipped7(init4)(getHash))();
        var win = map43(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v2) {
          return bindFlipped7(flip(write)(ref3))(join3(apply5(map43(cb)(read(ref3)))(getHash)));
        })();
        addEventListener2(hashchange)(listener)(false)(win)();
        return removeEventListener2(hashchange)(listener)(false)(win);
      };
    };
  };
  var matchesWith = function(dictFoldable) {
    var indexl2 = indexl(dictFoldable);
    return function(parser) {
      return function(cb) {
        var go3 = function(a3) {
          var $21 = maybe(pure15(a3))(function(b3) {
            return voidRight3(new Just(b3))(cb(a3)(b3));
          });
          var $22 = indexl2(0);
          return function($23) {
            return $21($22(parser($23)));
          };
        };
        return foldHashes(go3)(go3(Nothing.value));
      };
    };
  };

  // output/Data.Route/index.js
  var HomeIsSymbol = {
    reflectSymbol: function() {
      return "Home";
    }
  };
  var DebugIsSymbol = {
    reflectSymbol: function() {
      return "Debug";
    }
  };
  var ChatIsSymbol = {
    reflectSymbol: function() {
      return "Chat";
    }
  };
  var Home = /* @__PURE__ */ function() {
    function Home2() {
    }
    ;
    Home2.value = new Home2();
    return Home2;
  }();
  var Debug = /* @__PURE__ */ function() {
    function Debug2() {
    }
    ;
    Debug2.value = new Debug2();
    return Debug2;
  }();
  var Chat = /* @__PURE__ */ function() {
    function Chat2() {
    }
    ;
    Chat2.value = new Chat2();
    return Chat2;
  }();
  var genericRoute_ = {
    to: function(x2) {
      if (x2 instanceof Inl) {
        return Home.value;
      }
      ;
      if (x2 instanceof Inr && x2.value0 instanceof Inl) {
        return Debug.value;
      }
      ;
      if (x2 instanceof Inr && x2.value0 instanceof Inr) {
        return Chat.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Route (line 23, column 1 - line 23, column 32): " + [x2.constructor.name]);
    },
    from: function(x2) {
      if (x2 instanceof Home) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x2 instanceof Debug) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x2 instanceof Chat) {
        return new Inr(new Inr(NoArguments.value));
      }
      ;
      throw new Error("Failed pattern match at Data.Route (line 23, column 1 - line 23, column 32): " + [x2.constructor.name]);
    }
  };
  var eqRoute = {
    eq: function(x2) {
      return function(y2) {
        if (x2 instanceof Home && y2 instanceof Home) {
          return true;
        }
        ;
        if (x2 instanceof Debug && y2 instanceof Debug) {
          return true;
        }
        ;
        if (x2 instanceof Chat && y2 instanceof Chat) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var codec = /* @__PURE__ */ root(/* @__PURE__ */ sum2(genericRoute_)(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(HomeIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(DebugIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteConstructor(ChatIsSymbol)()(gRouteNoArguments))))({
    Home: noArgs,
    Debug: /* @__PURE__ */ path("debug")(noArgs),
    Chat: /* @__PURE__ */ path("chat")(noArgs)
  }));
  var goTo = function(dictMonadEffect) {
    var $55 = liftEffect(dictMonadEffect);
    var $56 = print7(codec);
    return function($57) {
      return $55(setHash2($56($57)));
    };
  };
  var href5 = /* @__PURE__ */ function() {
    var $58 = append(semigroupString)("#");
    var $59 = print7(codec);
    return function($60) {
      return href($58($59($60)));
    };
  }();

  // output/Component.Home/index.js
  var map44 = /* @__PURE__ */ map(functorArray);
  var put4 = /* @__PURE__ */ put(monadStateHalogenM);
  var UpdateState = /* @__PURE__ */ function() {
    function UpdateState3(value0) {
      this.value0 = value0;
    }
    ;
    UpdateState3.create = function(value0) {
      return new UpdateState3(value0);
    };
    return UpdateState3;
  }();
  var render6 = function(v2) {
    var navLink = function(v1) {
      return a2([classNames(["justify-center", "flex", "font-medium", "w-full"]), v1.href])([span_([text("Go to " + v1.label)])]);
    };
    return div3([classNames(["flex", "items-center", "justify-center", "grow", "bg-gray-100"])])([div3([classNames(["max-w-md", "w-full", "space-y-8", "rounded", "border", "border-slate-300", "p-5", "shadow-xl", "bg-white"])])([h1([classNames(["text-center", "text-black", "text-3xl", "font-extrabold", "cursor-default"])])([text("PureMess")]), div3([classNames(["flex", "justify-between", "w-full", "basis-auto"])])(map44(navLink)(function() {
      if (v2.authInfo instanceof Nothing) {
        return [{
          href: href5(Debug.value),
          label: "Debug"
        }];
      }
      ;
      if (v2.authInfo instanceof Just) {
        return [{
          href: href5(Chat.value),
          label: "Chat"
        }];
      }
      ;
      throw new Error("Failed pattern match at Component.Home (line 72, column 15 - line 74, column 72): " + [v2.authInfo.constructor.name]);
    }()))])]);
  };
  var handleAction7 = function(v2) {
    return put4(v2.value0);
  };
  var component7 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: identity(categoryFn),
      render: render6,
      "eval": mkEval({
        handleAction: handleAction7,
        handleQuery: defaultEval.handleQuery,
        receive: function($18) {
          return Just.create(UpdateState.create($18));
        },
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Component.Navigation/index.js
  var bind20 = /* @__PURE__ */ bind(bindArray);
  var pure16 = /* @__PURE__ */ pure(applicativeArray);
  var unwrap8 = /* @__PURE__ */ unwrap();
  var append14 = /* @__PURE__ */ append(semigroupArray);
  var eq6 = /* @__PURE__ */ eq(eqRoute);
  var bind110 = /* @__PURE__ */ bind(bindHalogenM);
  var monadAskHalogenM4 = /* @__PURE__ */ monadAskHalogenM(monadAskAppM);
  var buildAuthorizeUrl2 = /* @__PURE__ */ buildAuthorizeUrl(monadAskHalogenM4)(/* @__PURE__ */ monadAffHalogenM(monadAffAppM));
  var modify_7 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var asks2 = /* @__PURE__ */ asks(monadAskHalogenM4);
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var liftEffect7 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectHalogenM(monadEffectAppM));
  var OutputError = /* @__PURE__ */ function() {
    function OutputError2(value0) {
      this.value0 = value0;
    }
    ;
    OutputError2.create = function(value0) {
      return new OutputError2(value0);
    };
    return OutputError2;
  }();
  var SignedOut = /* @__PURE__ */ function() {
    function SignedOut2() {
    }
    ;
    SignedOut2.value = new SignedOut2();
    return SignedOut2;
  }();
  var UpdateState2 = /* @__PURE__ */ function() {
    function UpdateState3(value0) {
      this.value0 = value0;
    }
    ;
    UpdateState3.create = function(value0) {
      return new UpdateState3(value0);
    };
    return UpdateState3;
  }();
  var SignOut = /* @__PURE__ */ function() {
    function SignOut2(value0) {
      this.value0 = value0;
    }
    ;
    SignOut2.create = function(value0) {
      return new SignOut2(value0);
    };
    return SignOut2;
  }();
  var Initialize4 = /* @__PURE__ */ function() {
    function Initialize7() {
    }
    ;
    Initialize7.value = new Initialize7();
    return Initialize7;
  }();
  var render7 = function(v2) {
    var anonymousActions = bind20([{
      label: "Signin",
      href: v2.authorizeUrl
    }, {
      label: "Signup",
      href: v2.authorizeUrl
    }])(function(v1) {
      return pure16(li2([classNames(["list-none", "mr-16", "mt-8", "text-xl"])])([function() {
        if (v1.href instanceof Nothing) {
          return text(v1.label);
        }
        ;
        if (v1.href instanceof Just) {
          return a2([classNames(["decoration-transparent", "text-black", "transition", "duration-50", "hover:text-blue-800", "active:text-blue-600"]), href(v1.href.value0)])([text(v1.label)]);
        }
        ;
        throw new Error("Failed pattern match at Component.Navigation (line 137, column 13 - line 150, column 34): " + [v1.href.constructor.name]);
      }()]));
    });
    var headerActions = function() {
      if (v2.authInfo instanceof Nothing) {
        return anonymousActions;
      }
      ;
      if (v2.authInfo instanceof Just && v2.authInfo.value0 instanceof Anonymous) {
        return anonymousActions;
      }
      ;
      if (v2.authInfo instanceof Just && v2.authInfo.value0 instanceof Authenticated) {
        return [li2([classNames(["list-none", "mr-16", "mt-8", "text-xl"])])([text(toString5(unwrap8(v2.authInfo.value0.value0).name))]), li2([classNames(["list-none", "mr-16", "mt-9", "text-xl"])])([a2([href5(Home.value), onClick(function(v1) {
          return new SignOut(UserAction.value);
        }), classNames(["block"])])([img([src("images/signout.svg"), classNames(["h-6", "w-6", "transition", "duration-100", "hover:scale-110", "active:scale-125", "stroke-current", "hover:stroke-blue-800", "stroke-2", "fill-transparent"])])])])];
      }
      ;
      throw new Error("Failed pattern match at Component.Navigation (line 98, column 19 - line 129, column 8): " + [v2.authInfo.constructor.name]);
    }();
    return nav_([ul([classNames(["bg-white", "top-0", "pr-0", "pt-2", "flex", "justify-end", "align-center", "w-full", "sticky", "h-20"])])(append14([li2([classNames(["list-none", "ml-8", "mr-auto", "mt-8"])])([a2([classNames([function() {
      var $37 = eq6(v2.route)(Home.value);
      if ($37) {
        return "overline";
      }
      ;
      return "no-underline";
    }(), function() {
      var $38 = eq6(v2.route)(Home.value);
      if ($38) {
        return "text-blue-800";
      }
      ;
      return "text-black";
    }(), "font-bold", "text-2xl", "transition", "duration-50", "hover:text-blue-800", "focus:text-blue-800", "active:text-blue-700"]), href5(Home.value)])([text("PureMess")])])])(headerActions))]);
  };
  var initialState4 = function(v2) {
    return {
      route: v2.route,
      authInfo: v2.authInfo,
      authorizeUrl: Nothing.value
    };
  };
  var handleAction8 = function(v2) {
    if (v2 instanceof Initialize4) {
      return bind110(buildAuthorizeUrl2)(function(authorizeUrl) {
        return modify_7(function(v1) {
          var $46 = {};
          for (var $47 in v1) {
            if ({}.hasOwnProperty.call(v1, $47)) {
              $46[$47] = v1[$47];
            }
            ;
          }
          ;
          $46.authorizeUrl = new Just(authorizeUrl);
          return $46;
        });
      });
    }
    ;
    if (v2 instanceof UpdateState2) {
      return modify_7(function(v1) {
        var $49 = {};
        for (var $50 in v1) {
          if ({}.hasOwnProperty.call(v1, $50)) {
            $49[$50] = v1[$50];
          }
          ;
        }
        ;
        $49.route = v2.value0.route;
        $49.authInfo = v2.value0.authInfo;
        return $49;
      });
    }
    ;
    if (v2 instanceof SignOut) {
      return bind110(asks2(function(v1) {
        return v1.notifications.listener;
      }))(function(listener) {
        return discard5(liftEffect7(notify(listener)(useful("You successfully signed out!"))))(function() {
          return discard5(modify_7(function(v1) {
            var $55 = {};
            for (var $56 in v1) {
              if ({}.hasOwnProperty.call(v1, $56)) {
                $55[$56] = v1[$56];
              }
              ;
            }
            ;
            $55.authInfo = Nothing.value;
            return $55;
          }))(function() {
            return raise(SignedOut.value);
          });
        });
      });
    }
    ;
    throw new Error("Failed pattern match at Component.Navigation (line 154, column 16 - line 171, column 22): " + [v2.constructor.name]);
  };
  var component8 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: initialState4,
      render: render7,
      "eval": mkEval({
        handleAction: handleAction8,
        handleQuery: defaultEval.handleQuery,
        receive: function($59) {
          return Just.create(UpdateState2.create($59));
        },
        initialize: new Just(Initialize4.value),
        finalize: defaultEval.finalize
      })
    });
  }();

  // output/Component.Notifications/index.js
  var discard6 = /* @__PURE__ */ discard(discardUnit);
  var show29 = /* @__PURE__ */ show(showInt);
  var map45 = /* @__PURE__ */ map(functorArray);
  var bind21 = /* @__PURE__ */ bind(bindHalogenM);
  var lift5 = /* @__PURE__ */ lift(monadTransHalogenM);
  var map115 = /* @__PURE__ */ map(functorEmitter);
  var modify_8 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var gets5 = /* @__PURE__ */ gets(monadStateHalogenM);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var discard13 = /* @__PURE__ */ discard6(bindHalogenM);
  var notEq2 = /* @__PURE__ */ notEq(eqInt);
  var Initialize5 = /* @__PURE__ */ function() {
    function Initialize7() {
    }
    ;
    Initialize7.value = new Initialize7();
    return Initialize7;
  }();
  var Finalize2 = /* @__PURE__ */ function() {
    function Finalize4() {
    }
    ;
    Finalize4.value = new Finalize4();
    return Finalize4;
  }();
  var Notify2 = /* @__PURE__ */ function() {
    function Notify3(value0) {
      this.value0 = value0;
    }
    ;
    Notify3.create = function(value0) {
      return new Notify3(value0);
    };
    return Notify3;
  }();
  var Close = /* @__PURE__ */ function() {
    function Close2(value0) {
      this.value0 = value0;
    }
    ;
    Close2.create = function(value0) {
      return new Close2(value0);
    };
    return Close2;
  }();
  var makeActive = function(dictMonadState) {
    var Monad0 = dictMonadState.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind115 = bind(Bind1);
    var gets1 = gets(dictMonadState);
    var discard24 = discard6(Bind1);
    var modify_1 = modify_2(dictMonadState);
    var pure27 = pure(Monad0.Applicative0());
    return function(value17) {
      return bind115(gets1(function(v2) {
        return v2.currentNotificationId;
      }))(function(id4) {
        return discard24(modify_1(function(v2) {
          var $61 = {};
          for (var $62 in v2) {
            if ({}.hasOwnProperty.call(v2, $62)) {
              $61[$62] = v2[$62];
            }
            ;
          }
          ;
          $61.currentNotificationId = id4 + 1 | 0;
          return $61;
        }))(function() {
          return pure27({
            id: id4,
            value: value17
          });
        });
      });
    };
  };
  var makeActive1 = /* @__PURE__ */ makeActive(monadStateHalogenM);
  var initialState5 = function(v2) {
    return {
      subscription: Nothing.value,
      queue: [],
      currentNotificationId: 0
    };
  };
  var importanceTimeout = function($93) {
    return Milliseconds(function(v2) {
      if (v2 instanceof Useful) {
        return 3e3;
      }
      ;
      if (v2 instanceof Important) {
        return 6e3;
      }
      ;
      if (v2 instanceof Critical) {
        return 9e3;
      }
      ;
      throw new Error("Failed pattern match at Component.Notifications (line 161, column 38 - line 164, column 20): " + [v2.constructor.name]);
    }($93));
  };
  var importanceIcon = function(importance) {
    return img(function() {
      if (importance instanceof Useful) {
        return [src("images/useful.svg"), classNames(["h-6", "w-6"])];
      }
      ;
      if (importance instanceof Important) {
        return [src("images/important.svg"), classNames(["h-6", "w-6"])];
      }
      ;
      if (importance instanceof Critical) {
        return [src("images/critical.svg"), classNames(["h-6", "w-6"])];
      }
      ;
      throw new Error("Failed pattern match at Component.Notifications (line 155, column 36 - line 158, column 78): " + [importance.constructor.name]);
    }());
  };
  var render8 = function(v2) {
    var importanceColor = function(v1) {
      if (v1 instanceof Useful) {
        return "bg-green-600/75";
      }
      ;
      if (v1 instanceof Important) {
        return "bg-orange-600/75";
      }
      ;
      if (v1 instanceof Critical) {
        return "bg-red-600/75";
      }
      ;
      throw new Error("Failed pattern match at Component.Notifications (line 114, column 21 - line 117, column 31): " + [v1.constructor.name]);
    };
    var animate = function(v1) {
      if (v1 instanceof Useful) {
        return "animate-disappear-useful";
      }
      ;
      if (v1 instanceof Important) {
        return "animate-disappear-important";
      }
      ;
      if (v1 instanceof Critical) {
        return "animate-disappear-critical";
      }
      ;
      throw new Error("Failed pattern match at Component.Notifications (line 120, column 13 - line 123, column 44): " + [v1.constructor.name]);
    };
    var renderNotification = function(v1) {
      return li_([div3([id3("notification" + show29(v1.id)), classNames(["flex", "p-2", "gap-2", "w-full", "rounded", "text-white", "justify-between", importanceColor(v1.value.value0), animate(v1.value.value0)])])([div3([classNames(["flex"])])([importanceIcon(v1.value.value0), p2([classNames(["ml-1"])])([text(v1.value.value1)])]), button([onClick(function(v22) {
        return new Close(v1.id);
      })])([img([src("images/close.svg"), classNames(["h-6", "w-6"])])])])]);
    };
    return div3([classNames(["fixed", "flex", "flex-col", "w-1/2", "items-center", "z-10", "m-auto", "mt-2", "left-0", "right-0"])])([ul([classNames(["w-full", "space-y-2"])])(map45(renderNotification)(v2.queue))]);
  };
  var handleAction9 = function(dictMonadAsk) {
    var asks3 = asks(dictMonadAsk);
    return function(dictMonadAff) {
      var lift12 = lift5(dictMonadAff.MonadEffect0().Monad0());
      var liftAff4 = liftAff(monadAffHalogenM(dictMonadAff));
      return function(v2) {
        if (v2 instanceof Initialize5) {
          return bind21(lift12(asks3(function(v1) {
            return v1.notifications.emitter;
          })))(function(emitter) {
            return bind21(subscribe2(map115(Notify2.create)(emitter)))(function(subscriptionId) {
              return modify_8(function(v1) {
                var $76 = {};
                for (var $77 in v1) {
                  if ({}.hasOwnProperty.call(v1, $77)) {
                    $76[$77] = v1[$77];
                  }
                  ;
                }
                ;
                $76.subscription = new Just(subscriptionId);
                return $76;
              });
            });
          });
        }
        ;
        if (v2 instanceof Finalize2) {
          return bind21(gets5(function(v1) {
            return v1.subscription;
          }))(function(s2) {
            return traverse_6(unsubscribe2)(s2);
          });
        }
        ;
        if (v2 instanceof Notify2) {
          return bind21(makeActive1(v2.value0))(function(activeNotification) {
            return discard13(modify_8(function(v1) {
              var $80 = {};
              for (var $81 in v1) {
                if ({}.hasOwnProperty.call(v1, $81)) {
                  $80[$81] = v1[$81];
                }
                ;
              }
              ;
              $80.queue = snoc2(v1.queue)(activeNotification);
              return $80;
            }))(function() {
              return discard13(liftAff4(delay(importanceTimeout(v2.value0.value0))))(function() {
                return handleAction9(dictMonadAsk)(dictMonadAff)(new Close(activeNotification.id));
              });
            });
          });
        }
        ;
        if (v2 instanceof Close) {
          return modify_8(function(v1) {
            var $88 = {};
            for (var $89 in v1) {
              if ({}.hasOwnProperty.call(v1, $89)) {
                $88[$89] = v1[$89];
              }
              ;
            }
            ;
            $88.queue = filter2(function() {
              var $94 = notEq2(v2.value0);
              return function($95) {
                return $94(function(v3) {
                  return v3.id;
                }($95));
              };
            }())(v1.queue);
            return $88;
          });
        }
        ;
        throw new Error("Failed pattern match at Component.Notifications (line 131, column 16 - line 146, column 69): " + [v2.constructor.name]);
      };
    };
  };
  var evalSpec = function(dictMonadAff) {
    return function(dictMonadAsk) {
      return {
        handleAction: handleAction9(dictMonadAsk)(dictMonadAff),
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: new Just(Initialize5.value),
        finalize: new Just(Finalize2.value)
      };
    };
  };
  var component9 = function(dictMonadAff) {
    var evalSpec1 = evalSpec(dictMonadAff);
    return function(dictMonadAsk) {
      return mkComponent({
        initialState: initialState5,
        render: render8,
        "eval": mkEval(evalSpec1(dictMonadAsk))
      });
    };
  };

  // output/Component.Router/index.js
  var discard7 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_9 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var mapFlipped7 = /* @__PURE__ */ mapFlipped(functorHalogenM);
  var gets6 = /* @__PURE__ */ gets(monadStateHalogenM);
  var bind22 = /* @__PURE__ */ bind(bindHalogenM);
  var monadAskReaderT2 = /* @__PURE__ */ monadAskReaderT(monadHalogenM);
  var loginWithRedirect2 = /* @__PURE__ */ loginWithRedirect(monadAskReaderT2);
  var pure17 = /* @__PURE__ */ pure(applicativeHalogenM);
  var applySecond4 = /* @__PURE__ */ applySecond(applyHalogenM);
  var readState2 = /* @__PURE__ */ readState(monadStateHalogenM);
  var monadThrowExceptT2 = /* @__PURE__ */ monadThrowExceptT(/* @__PURE__ */ monadReaderT(monadHalogenM));
  var monadAskExceptT3 = /* @__PURE__ */ monadAskExceptT(monadAskReaderT2);
  var voidLeft4 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var show30 = /* @__PURE__ */ show(showRouteError);
  var show113 = /* @__PURE__ */ show(showString);
  var pass5 = /* @__PURE__ */ pass2(applicativeHalogenM);
  var hoist4 = /* @__PURE__ */ hoist3(functorAff);
  var slot4 = /* @__PURE__ */ slot();
  var slot12 = /* @__PURE__ */ slot4({
    reflectSymbol: function() {
      return "chat";
    }
  })(ordInt);
  var slot_2 = /* @__PURE__ */ slot_();
  var slot_1 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "debug";
    }
  })(ordUnit);
  var component1 = /* @__PURE__ */ component5(monadAskAppM)(monadEffectAppM);
  var slot23 = /* @__PURE__ */ slot4({
    reflectSymbol: function() {
      return "home";
    }
  })(ordInt);
  var slot32 = /* @__PURE__ */ slot4({
    reflectSymbol: function() {
      return "navigation";
    }
  })(ordInt);
  var slot_22 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "notifications";
    }
  })(ordUnit);
  var component22 = /* @__PURE__ */ component9(monadAffAppM)(monadAskAppM);
  var slot42 = /* @__PURE__ */ slot4({
    reflectSymbol: function() {
      return "error";
    }
  })(ordInt);
  var Navigate = /* @__PURE__ */ function() {
    function Navigate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Navigate2.create = function(value0) {
      return function(value1) {
        return new Navigate2(value0, value1);
      };
    };
    return Navigate2;
  }();
  var Initialize6 = /* @__PURE__ */ function() {
    function Initialize7() {
    }
    ;
    Initialize7.value = new Initialize7();
    return Initialize7;
  }();
  var Finalize3 = /* @__PURE__ */ function() {
    function Finalize4() {
    }
    ;
    Finalize4.value = new Finalize4();
    return Finalize4;
  }();
  var RecordAppError = /* @__PURE__ */ function() {
    function RecordAppError2(value0) {
      this.value0 = value0;
    }
    ;
    RecordAppError2.create = function(value0) {
      return new RecordAppError2(value0);
    };
    return RecordAppError2;
  }();
  var ErrorAction = /* @__PURE__ */ function() {
    function ErrorAction2(value0) {
      this.value0 = value0;
    }
    ;
    ErrorAction2.create = function(value0) {
      return new ErrorAction2(value0);
    };
    return ErrorAction2;
  }();
  var NavigationOutput = /* @__PURE__ */ function() {
    function NavigationOutput2(value0) {
      this.value0 = value0;
    }
    ;
    NavigationOutput2.create = function(value0) {
      return new NavigationOutput2(value0);
    };
    return NavigationOutput2;
  }();
  var navigate = function(dictMonadEffect) {
    var liftEffect15 = liftEffect(monadEffectHalogenM(dictMonadEffect));
    return function(route) {
      return discard7(liftEffect15(setHash2(print7(codec)(route))))(function() {
        return modify_9(function(v2) {
          var $91 = {};
          for (var $92 in v2) {
            if ({}.hasOwnProperty.call(v2, $92)) {
              $91[$92] = v2[$92];
            }
            ;
          }
          ;
          $91.route = route;
          return $91;
        });
      });
    };
  };
  var initialState6 = function(config) {
    return {
      config,
      route: Home.value,
      authInfo: NotAsked.value,
      error: Nothing.value
    };
  };
  var handleQuery = function(dictMonadAff) {
    var loginWithRedirect1 = loginWithRedirect2(monadAffReader(monadAffHalogenM(dictMonadAff)));
    var navigate1 = navigate(dictMonadAff.MonadEffect0());
    return function(v2) {
      var isPublic = function(v1) {
        if (v1 instanceof Home) {
          return true;
        }
        ;
        if (v1 instanceof Debug) {
          return true;
        }
        ;
        if (v1 instanceof Chat) {
          return false;
        }
        ;
        throw new Error("Failed pattern match at Component.Router (line 145, column 14 - line 148, column 17): " + [v1.constructor.name]);
      };
      var isAuthorized = mapFlipped7(gets6(function(v1) {
        return v1.authInfo;
      }))(function(v1) {
        if (v1 instanceof Success && v1.value0 instanceof Authenticated) {
          return true;
        }
        ;
        return false;
      });
      return bind22(isAuthorized)(function(authorized) {
        return bind22(gets6(function(v1) {
          return v1.config;
        }))(function(config) {
          return discard7(function() {
            var $99 = !(authorized || isPublic(v2.value0));
            if ($99) {
              return runReaderT(loginWithRedirect1)(config);
            }
            ;
            return navigate1(v2.value0);
          }())(function() {
            return pure17(new Just(v2.value1));
          });
        });
      });
    };
  };
  var handleAction10 = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var monadEffectHalogenM3 = monadEffectHalogenM(MonadEffect0);
    var logShow3 = logShow2(monadEffectHalogenM3)(showError3);
    var userInfo2 = userInfo(monadAffExceptT(monadAffReader(monadAffHalogenM(dictMonadAff))))(monadThrowExceptT2)(monadAskExceptT3);
    var liftEffect15 = liftEffect(monadEffectHalogenM3);
    var error5 = error3(monadEffectHalogenM3);
    var navigate1 = navigate(MonadEffect0);
    var goTo2 = goTo(monadEffectHalogenM3);
    var recordAppError = function(err) {
      return applySecond4(logShow3(err))(modify_9(function(v2) {
        var $102 = {};
        for (var $103 in v2) {
          if ({}.hasOwnProperty.call(v2, $103)) {
            $102[$103] = v2[$103];
          }
          ;
        }
        ;
        $102.error = new Just(err);
        return $102;
      }));
    };
    return function(v2) {
      if (v2 instanceof Initialize6) {
        return discard7(modify_9(function(v1) {
          var $106 = {};
          for (var $107 in v1) {
            if ({}.hasOwnProperty.call(v1, $107)) {
              $106[$107] = v1[$107];
            }
            ;
          }
          ;
          $106.authInfo = Loading2.value;
          return $106;
        }))(function() {
          return discard7(bind22(readState2(function(v1) {
            return v1.config;
          })(runExceptT(userInfo2)))(function(v1) {
            if (v1 instanceof Left) {
              return recordAppError(new AuthError(v1.value0));
            }
            ;
            if (v1 instanceof Right) {
              return modify_9(function(v22) {
                var $111 = {};
                for (var $112 in v22) {
                  if ({}.hasOwnProperty.call(v22, $112)) {
                    $111[$112] = v22[$112];
                  }
                  ;
                }
                ;
                $111.authInfo = new Success(v1.value0);
                return $111;
              });
            }
            ;
            throw new Error("Failed pattern match at Component.Router (line 102, column 59 - line 104, column 59): " + [v1.constructor.name]);
          }))(function() {
            return bind22(bind22(liftEffect15(getHash))(function(hash3) {
              var v1 = parse9(codec)(hash3);
              if (v1 instanceof Left && v1.value0 instanceof EndOfPath) {
                return pure17(Home.value);
              }
              ;
              if (v1 instanceof Left) {
                return voidLeft4(error5(show30(v1.value0) + (": " + show113(hash3))))(Home.value);
              }
              ;
              if (v1 instanceof Right) {
                return pure17(v1.value0);
              }
              ;
              throw new Error("Failed pattern match at Component.Router (line 107, column 9 - line 110, column 35): " + [v1.constructor.name]);
            }))(function(route) {
              return navigate1(route);
            });
          });
        });
      }
      ;
      if (v2 instanceof Finalize3) {
        return pass5;
      }
      ;
      if (v2 instanceof ErrorAction) {
        if (v2.value0 instanceof Retry) {
          return modify_9(function(v1) {
            var $120 = {};
            for (var $121 in v1) {
              if ({}.hasOwnProperty.call(v1, $121)) {
                $120[$121] = v1[$121];
              }
              ;
            }
            ;
            $120.error = Nothing.value;
            return $120;
          });
        }
        ;
        if (v2.value0 instanceof SignIn) {
          return modify_9(function(v1) {
            var $123 = {};
            for (var $124 in v1) {
              if ({}.hasOwnProperty.call(v1, $124)) {
                $123[$124] = v1[$124];
              }
              ;
            }
            ;
            $123.error = Nothing.value;
            $123.authInfo = new Failure(unit);
            return $123;
          });
        }
        ;
        throw new Error("Failed pattern match at Component.Router (line 114, column 26 - line 117, column 63): " + [v2.value0.constructor.name]);
      }
      ;
      if (v2 instanceof NavigationOutput) {
        if (v2.value0 instanceof OutputError) {
          return recordAppError(v2.value0.value0);
        }
        ;
        if (v2.value0 instanceof SignedOut) {
          return applySecond4(modify_9(function(v1) {
            var $129 = {};
            for (var $130 in v1) {
              if ({}.hasOwnProperty.call(v1, $130)) {
                $129[$130] = v1[$130];
              }
              ;
            }
            ;
            $129.authInfo = NotAsked.value;
            return $129;
          }))(goTo2(Home.value));
        }
        ;
        throw new Error("Failed pattern match at Component.Router (line 120, column 7 - line 122, column 73): " + [v2.value0.constructor.name]);
      }
      ;
      if (v2 instanceof RecordAppError) {
        return recordAppError(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Component.Router (line 99, column 3 - line 124, column 25): " + [v2.constructor.name]);
    };
  };
  var _notifications = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _navigation = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _home = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _error = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _debug = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _chat = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var render9 = function(v2) {
    return div3([classNames(["flex", "flex-col", "min-h-screen"])])(function() {
      if (v2.error instanceof Nothing) {
        var hoistApp = hoist4(run3(v2.config));
        var slotChat = function(info2) {
          return slot12(_chat)(4)(hoistApp(component4))(info2)(function($145) {
            return RecordAppError.create(BackendError.create($145));
          });
        };
        var slotDebug = slot_1(_debug)(unit)(hoistApp(component1))(unit);
        var slotHome = slot23(_home)(5)(hoistApp(component7))({
          authInfo: toMaybe2(v2.authInfo)
        })(RecordAppError.create);
        var slotNavigation = slot32(_navigation)(0)(hoistApp(component8))({
          route: v2.route,
          authInfo: toMaybe2(v2.authInfo)
        })(NavigationOutput.create);
        var slotNotifications = slot_22(_notifications)(unit)(hoistApp(component22))(unit);
        return [slotNotifications, slotNavigation, function() {
          if (v2.route instanceof Home) {
            return slotHome;
          }
          ;
          if (v2.route instanceof Debug) {
            return slotDebug;
          }
          ;
          if (v2.route instanceof Chat) {
            if (v2.authInfo instanceof Success && v2.authInfo.value0 instanceof Authenticated) {
              return slotChat(v2.authInfo.value0.value0);
            }
            ;
            return text("Authorization required");
          }
          ;
          throw new Error("Failed pattern match at Component.Router (line 166, column 11 - line 172, column 53): " + [v2.route.constructor.name]);
        }()];
      }
      ;
      if (v2.error instanceof Just) {
        return [slot42(_error)(6)(component6)(v2.error.value0)(ErrorAction.create)];
      }
      ;
      throw new Error("Failed pattern match at Component.Router (line 162, column 5 - line 200, column 61): " + [v2.error.constructor.name]);
    }());
  };
  var component10 = /* @__PURE__ */ function() {
    return mkComponent({
      initialState: initialState6,
      render: render9,
      "eval": mkEval({
        handleAction: handleAction10(monadAffAff),
        handleQuery: handleQuery(monadAffAff),
        receive: defaultEval.receive,
        initialize: new Just(Initialize6.value),
        finalize: new Just(Finalize3.value)
      })
    });
  }();

  // output/Halogen.Aff.Util/index.js
  var bind23 = /* @__PURE__ */ bind(bindAff);
  var liftEffect8 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped5 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure18 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure19 = /* @__PURE__ */ pure(applicativeEffect);
  var map46 = /* @__PURE__ */ map(functorEffect);
  var discard8 = /* @__PURE__ */ discard(discardUnit);
  var throwError3 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query2) {
    return bind23(liftEffect8(bindFlipped8(composeKleisliFlipped5(function() {
      var $16 = querySelector(query2);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document2))(windowImpl)))(function(mel) {
      return pure18(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure19(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do2() {
      var rs = bindFlipped8(readyState)(bindFlipped8(document2)(windowImpl))();
      if (rs instanceof Loading) {
        var et2 = map46(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v2) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et2)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et2));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard8(bindAff)(awaitLoad)(function() {
    return bind23(selectElement("body"))(function(body2) {
      return maybe(throwError3(error("Could not find body")))(pure18)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork2 = function(dict) {
    return dict.fork;
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_10 = traverse_(dictApplicative)(foldableMaybe);
    return function(f2) {
      return unDriverStateX(function(st) {
        return traverse_10(f2)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f2) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f2(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f2) {
    return function(v2) {
      return f2(v2);
    };
  };
  var initDriverState = function(component11) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do2() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty4)();
            var childrenOut = $$new(empty4)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty3))();
            var forks = $$new(empty3)();
            var ds = {
              component: component11,
              state: component11.initialState(input3),
              refs: empty3,
              children: empty4,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_7 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped9 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup6 = /* @__PURE__ */ lookup2(ordSubscriptionId);
  var bind111 = /* @__PURE__ */ bind(bindAff);
  var liftEffect9 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard9 = /* @__PURE__ */ discard(discardUnit);
  var discard14 = /* @__PURE__ */ discard9(bindAff);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_13(foldableList);
  var fork3 = /* @__PURE__ */ fork2(monadForkAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var pure20 = /* @__PURE__ */ pure(applicativeAff);
  var map47 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var map116 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map211 = /* @__PURE__ */ map(functorMaybe);
  var insert8 = /* @__PURE__ */ insert3(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete4 = /* @__PURE__ */ $$delete2(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert3(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup2(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup2(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref3) {
      return function __do2() {
        var v2 = read(ref3)();
        var subs = read(v2.subscriptions)();
        return traverse_7(unsubscribe)(bindFlipped9(lookup6(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref3) {
    return function(au) {
      return bind111(liftEffect9(read(ref3)))(function(v2) {
        if (v2 instanceof Nothing) {
          return au;
        }
        ;
        if (v2 instanceof Just) {
          return liftEffect9(write(new Just(new Cons(au, v2.value0)))(ref3));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v2.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f2) {
      return discard14(liftEffect9(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind111(liftEffect9(f2))(function(result) {
          return bind111(liftEffect9(read(lchs)))(function(v2) {
            return discard14(traverse_22(fork3)(v2.finalizers))(function() {
              return discard14(parSequence_3(v2.initializers))(function() {
                return pure20(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f2) {
    return function(ref3) {
      return bind111(liftEffect9(read(ref3)))(function(v2) {
        return liftEffect9(modify$prime(function(i3) {
          return {
            state: i3 + 1 | 0,
            value: f2(i3)
          };
        })(v2.fresh));
      });
    };
  };
  var evalQ = function(render10) {
    return function(ref3) {
      return function(q3) {
        return bind111(liftEffect9(read(ref3)))(function(v2) {
          return evalM(render10)(ref3)(v2["component"]["eval"](new Query(map47(Just.create)(liftCoyoneda(q3)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render10) {
    return function(initRef) {
      return function(v2) {
        var evalChildQuery = function(ref3) {
          return function(cqb) {
            return bind111(liftEffect9(read(ref3)))(function(v1) {
              return unChildQueryBox(function(v22) {
                var evalChild = function(v3) {
                  return parallel2(bind111(liftEffect9(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render10)(ds.selfRef)(v22.value1);
                    })(dsx);
                  }));
                };
                return map116(v22.value2)(sequential2(v22.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go3 = function(ref3) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind111(liftEffect9(read(ref3)))(function(v22) {
                var v3 = v1.value0(v22.state);
                if (unsafeRefEq(v22.state)(v3.value1)) {
                  return pure20(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard14(liftEffect9(write({
                    component: v22.component,
                    state: v3.value1,
                    refs: v22.refs,
                    children: v22.children,
                    childrenIn: v22.childrenIn,
                    childrenOut: v22.childrenOut,
                    selfRef: v22.selfRef,
                    handlerRef: v22.handlerRef,
                    pendingQueries: v22.pendingQueries,
                    pendingOuts: v22.pendingOuts,
                    pendingHandlers: v22.pendingHandlers,
                    rendering: v22.rendering,
                    fresh: v22.fresh,
                    subscriptions: v22.subscriptions,
                    forks: v22.forks,
                    lifecycleHandlers: v22.lifecycleHandlers
                  })(ref3)))(function() {
                    return discard14(handleLifecycle(v22.lifecycleHandlers)(render10(v22.lifecycleHandlers)(ref3)))(function() {
                      return pure20(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind111(fresh(SubscriptionId)(ref3))(function(sid) {
                return bind111(liftEffect9(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render10)(ref3)(new Action(act)));
                })))(function(finalize) {
                  return bind111(liftEffect9(read(ref3)))(function(v22) {
                    return discard14(liftEffect9(modify_(map211(insert8(sid)(finalize)))(v22.subscriptions)))(function() {
                      return pure20(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard14(liftEffect9(unsubscribe3(v1.value0)(ref3)))(function() {
                return pure20(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref3)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind111(liftEffect9(read(ref3)))(function(v22) {
                return bind111(liftEffect9(read(v22.handlerRef)))(function(handler3) {
                  return discard14(queueOrRun(v22.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure20(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $118 = evalM(render10)(ref3);
                return function($119) {
                  return parallel2($118($119));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind111(fresh(ForkId)(ref3))(function(fid) {
                return bind111(liftEffect9(read(ref3)))(function(v22) {
                  return bind111(liftEffect9($$new(false)))(function(doneRef) {
                    return bind111(fork3($$finally(liftEffect9(function __do2() {
                      modify_($$delete4(fid))(v22.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render10)(ref3)(v1.value0))))(function(fiber) {
                      return discard14(liftEffect9(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v22.forks))))(function() {
                        return pure20(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind111(liftEffect9(read(ref3)))(function(v22) {
                return bind111(liftEffect9(read(v22.forks)))(function(forkMap) {
                  return discard14(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure20(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind111(liftEffect9(read(ref3)))(function(v22) {
                return bind111(liftEffect9(read(v22.forks)))(function(forkMap) {
                  return discard14(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure20(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind111(liftEffect9(read(ref3)))(function(v22) {
                return pure20(v1.value1(lookup22(v1.value0)(v22.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go3(initRef))(v2);
      };
    };
  };
  var evalF = function(render10) {
    return function(ref3) {
      return function(v2) {
        if (v2 instanceof RefUpdate) {
          return liftEffect9(flip(modify_)(ref3)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v2.value1))(v2.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v2 instanceof Action) {
          return bind111(liftEffect9(read(ref3)))(function(v1) {
            return evalM(render10)(ref3)(v1["component"]["eval"](new Action2(v2.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v2.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind24 = /* @__PURE__ */ bind(bindEffect);
  var discard10 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_8 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork2(monadForkAff);
  var bindFlipped10 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_14 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_14(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_14(foldableMap);
  var discard23 = /* @__PURE__ */ discard10(bindAff);
  var parSequence_4 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var liftEffect10 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure21 = /* @__PURE__ */ pure(applicativeEffect);
  var map48 = /* @__PURE__ */ map(functorEffect);
  var pure110 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft5 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind112 = /* @__PURE__ */ bind(bindAff);
  var liftEffect13 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref3) {
    return function __do2() {
      var queue = read(ref3)();
      write(Nothing.value)(ref3)();
      return for_2(queue)(function() {
        var $58 = traverse_8(fork4);
        return function($59) {
          return handleAff($58(reverse($59)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v2) {
    return function __do2() {
      bindFlipped10(traverse_23(traverse_33(unsubscribe)))(read(v2.subscriptions))();
      write(Nothing.value)(v2.subscriptions)();
      bindFlipped10(traverse_33(function() {
        var $60 = killFiber(error("finalized"));
        return function($61) {
          return handleAff($60($61));
        };
      }()))(read(v2.forks))();
      return write(empty3)(v2.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component11) {
      return function(i3) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render10)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard23(parSequence_4(reverse(handlers.initializers)))(function() {
                    return discard23(parentInitializer)(function() {
                      return liftEffect10(function __do2() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j2) {
              return unComponent(function(c2) {
                return function __do2() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c2)(j2)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped10(unDriverStateX(function() {
                    var $62 = render10(lchs);
                    return function($63) {
                      return $62(function(v2) {
                        return v2.selfRef;
                      }($63));
                    };
                  }()))(read($$var2))();
                  bindFlipped10(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot5) {
                  return function __do2() {
                    var childrenIn = map48(slot5.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do3() {
                            flip(write)(st.handlerRef)(function() {
                              var $64 = maybe(pure110(unit))(handler3);
                              return function($65) {
                                return $64(slot5.output($65));
                              };
                            }())();
                            return handleAff(evalM(render10)(st.selfRef)(st["component"]["eval"](new Receive(slot5.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $66 = maybe(pure110(unit))(handler3);
                          return function($67) {
                            return $66(slot5.output($67));
                          };
                        }())(slot5.input)(slot5.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map48(function($68) {
                      return isJust(slot5.get($68));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot5.set($$var2))(childrenOutRef)();
                    return bind24(read($$var2))(renderStateX2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v2 instanceof Just) {
                        return pure21(renderSpec2.renderChild(v2.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v2.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render10 = function(lchs) {
          return function($$var2) {
            return function __do2() {
              var v2 = read($$var2)();
              var shouldProcessHandlers = map48(isNothing)(read(v2.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v2.pendingHandlers))();
              write(empty4)(v2.childrenOut)();
              write(v2.children)(v2.childrenIn)();
              var handler3 = function() {
                var $69 = queueOrRun(v2.pendingHandlers);
                var $70 = evalF(render10)(v2.selfRef);
                return function($71) {
                  return $69($$void5($70($71)));
                };
              }();
              var childHandler = function() {
                var $72 = queueOrRun(v2.pendingQueries);
                return function($73) {
                  return $72(handler3(Action.create($73)));
                };
              }();
              var rendering = renderSpec2.render(function($74) {
                return handleAff(handler3($74));
              })(renderChild(lchs)(childHandler)(v2.childrenIn)(v2.childrenOut))(v2.component.render(v2.state))(v2.rendering)();
              var children2 = read(v2.childrenOut)();
              var childrenIn = read(v2.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do3() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v2.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do3() {
                  var handlers = read(v2.pendingHandlers)();
                  write(new Just(Nil.value))(v2.pendingHandlers)();
                  traverse_23(function() {
                    var $75 = traverse_8(fork4);
                    return function($76) {
                      return handleAff($75(reverse($76)));
                    };
                  }())(handlers)();
                  var mmore = read(v2.pendingHandlers)();
                  var $51 = maybe(false)($$null)(mmore);
                  if ($51) {
                    return voidLeft5(write(Nothing.value)(v2.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do2() {
              cleanupSubscriptionsAndForks(st)();
              var f2 = evalM(render10)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f2, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v2) {
                return function __do3() {
                  var dsx = read(v2)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref3) {
            return function(q3) {
              return bind112(liftEffect10(read(disposed)))(function(v2) {
                if (v2) {
                  return pure110(Nothing.value);
                }
                ;
                return evalQ(render10)(ref3)(q3);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do2() {
                var v2 = read(disposed)();
                if (v2) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do3() {
                    var v22 = liftEffect13(read(v1.selfRef))();
                    return for_2(v22.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind112(liftEffect10(newLifecycleHandlers))(function(lchs) {
          return bind112(liftEffect10($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do2() {
              var sio = create();
              var dsx = bindFlipped10(read)(runComponent(lchs)(function() {
                var $77 = notify(sio.listener);
                return function($78) {
                  return liftEffect10($77($78));
                };
              }())(i3)(component11))();
              return unDriverStateX(function(st) {
                return pure21({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map49 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map49(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map49(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy12 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var pure23 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_9 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap9 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not3 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity15 = /* @__PURE__ */ identity(categoryFn);
  var bind113 = /* @__PURE__ */ bind(bindAff);
  var liftEffect11 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map50 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped11 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v1 instanceof Just && v22 instanceof Just) {
          return $$void6(insertBefore(v2)(v1.value0)(v22.value0));
        }
        ;
        if (v1 instanceof Nothing && v22 instanceof Just) {
          return $$void6(appendChild(v2)(v22.value0));
        }
        ;
        return pure23(unit);
      };
    };
  };
  var removeChild3 = function(v2) {
    return function __do2() {
      var npn = parentNode2(v2.node)();
      return traverse_9(function(pn2) {
        return removeChild2(v2.node)(pn2);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document3) {
        var getNode = unRenderStateX(function(v2) {
          return v2.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap9)(spec);
          var $lazy_patch = $runtime_lazy12("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot5) {
              if (st instanceof Just) {
                if (slot5 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot5.value0);
                }
                ;
                if (slot5 instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot5.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot5.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot5);
            };
          });
          var $lazy_render = $runtime_lazy12("render", "Halogen.VDom.Driver", function() {
            return function(slot5) {
              if (slot5 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot5.value0);
              }
              ;
              if (slot5 instanceof ThunkSlot) {
                var step5 = buildThunk2(slot5.value0);
                return mkStep(new Step(extract2(step5), new Just(step5), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot5.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy12("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render10 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render10;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document3
        };
      };
    };
  };
  var renderSpec = function(document3) {
    return function(container) {
      var render10 = function(handler3) {
        return function(child) {
          return function(v2) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do2() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document3);
                  var machine = buildVDom(spec)(v2);
                  var node = extract2(machine);
                  $$void6(appendChild(node)(toNode2(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do2() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v2);
                  var newNode = extract2(machine$prime);
                  when3(not3(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render10,
        renderChild: identity15,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component11) {
    return function(i3) {
      return function(element3) {
        return bind113(liftEffect11(map50(toDocument)(bindFlipped11(document2)(windowImpl))))(function(document3) {
          return runUI(renderSpec(document3)(element3))(component11)(i3);
        });
      };
    };
  };

  // output/Data.String.NonEmpty.CodeUnits/index.js
  var toNonEmptyString = NonEmptyString;
  var singleton11 = function($23) {
    return toNonEmptyString(singleton4($23));
  };

  // output/URI.Common/index.js
  var bind25 = /* @__PURE__ */ bind(bindParserT);
  var throwError4 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var pure24 = /* @__PURE__ */ pure(applicativeParserT);
  var map51 = /* @__PURE__ */ map(functorParserT);
  var unsafeFromString2 = /* @__PURE__ */ unsafeFromString();
  var bindFlipped12 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applyFirst3 = /* @__PURE__ */ applyFirst(applyParserT);
  var joinWith3 = /* @__PURE__ */ joinWith2(foldableList);
  var manyRec3 = /* @__PURE__ */ manyRec(monadRecParserT)(alternativeParserT);
  var alt10 = /* @__PURE__ */ alt(altParserT);
  var identity16 = /* @__PURE__ */ identity(categoryFn);
  var append15 = /* @__PURE__ */ append(semigroupNonEmptyString);
  var wrapParser = function(dictMonad) {
    return function(parseA) {
      return function(p3) {
        return bind25(getParserT)(function(v2) {
          return bind25(p3)(function(a3) {
            var v1 = parseA(a3);
            if (v1 instanceof Left) {
              return throwError4(new ParseError(v1.value0, v2.value1));
            }
            ;
            if (v1 instanceof Right) {
              return pure24(v1.value0);
            }
            ;
            throw new Error("Failed pattern match at URI.Common (line 58, column 3 - line 60, column 22): " + [v1.constructor.name]);
          });
        });
      };
    };
  };
  var subDelims = /* @__PURE__ */ oneOf3(["!", "$", "&", "'", "(", ")", "*", "+", ";", "=", ","]);
  var printEncoded = function(p3) {
    return function(s2) {
      var simpleChar = map51(singleton11)(p3);
      var handleURIEncodingResult = function(v2) {
        if (v2 instanceof Nothing) {
          return throwError4(new ParseError("Could not URI encode", initialPos));
        }
        ;
        if (v2 instanceof Just) {
          return pure24(unsafeFromString2(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at URI.Common (line 105, column 3 - line 105, column 74): " + [v2.constructor.name]);
      };
      var encodedChar = bindFlipped12(handleURIEncodingResult)(map51(function($42) {
        return $$encodeURIComponent(singleton4($42));
      })(anyChar2));
      var parse12 = applyFirst3(map51(joinWith3(""))(manyRec3(alt10(simpleChar)(encodedChar))))(eof2);
      return either($$const(s2))(identity16)(runParser2(s2)(parse12));
    };
  };
  var pctEncoded = /* @__PURE__ */ bind25(/* @__PURE__ */ $$char2("%"))(function(d0) {
    return bind25(hexDigit)(function(d1) {
      return bind25(hexDigit)(function(d2) {
        return pure24(append15(singleton11(d0))(append15(singleton11(d1))(singleton11(d2))));
      });
    });
  });
  var genericURIPartParseError = {
    to: function(x2) {
      return x2;
    },
    from: function(x2) {
      return x2;
    }
  };
  var showURIPartParseError = {
    show: /* @__PURE__ */ genericShow(genericURIPartParseError)(/* @__PURE__ */ genericShowConstructor(/* @__PURE__ */ genericShowArgsArgument(showString))({
      reflectSymbol: function() {
        return "URIPartParseError";
      }
    }))
  };
  var alpha = /* @__PURE__ */ satisfy2(function(c2) {
    return c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z";
  });
  var alphaNum = /* @__PURE__ */ alt10(alpha)(digit);
  var unreserved = /* @__PURE__ */ alt10(alphaNum)(/* @__PURE__ */ alt10(/* @__PURE__ */ $$char2("-"))(/* @__PURE__ */ alt10(/* @__PURE__ */ $$char2("."))(/* @__PURE__ */ alt10(/* @__PURE__ */ $$char2("_"))(/* @__PURE__ */ $$char2("~")))));

  // output/URI.Query/index.js
  var alt11 = /* @__PURE__ */ alt(altParserT);
  var Query3 = function(x2) {
    return x2;
  };
  var unsafeToString = function(v2) {
    return v2;
  };
  var queryChar = /* @__PURE__ */ alt11(unreserved)(/* @__PURE__ */ alt11(subDelims)(/* @__PURE__ */ alt11(/* @__PURE__ */ $$char2(":"))(/* @__PURE__ */ alt11(/* @__PURE__ */ $$char2("@"))(/* @__PURE__ */ alt11(/* @__PURE__ */ $$char2("/"))(/* @__PURE__ */ $$char2("?"))))));
  var fromString4 = /* @__PURE__ */ function() {
    var $20 = printEncoded(queryChar);
    return function($21) {
      return Query3($20($21));
    };
  }();

  // output/URI.Extra.QueryPairs/index.js
  var fromJust12 = /* @__PURE__ */ fromJust();
  var alt12 = /* @__PURE__ */ alt(altParserT);
  var bind26 = /* @__PURE__ */ bind(bindParserT);
  var wrapParser2 = /* @__PURE__ */ wrapParser(monadIdentity);
  var map117 = /* @__PURE__ */ map(functorParserT);
  var joinWith4 = /* @__PURE__ */ joinWith2(foldableList);
  var someRec2 = /* @__PURE__ */ someRec(monadRecParserT)(alternativeParserT);
  var traverse3 = /* @__PURE__ */ traverse(traversableMaybe)(applicativeEither);
  var manyRec4 = /* @__PURE__ */ manyRec(monadRecParserT)(alternativeParserT);
  var pure25 = /* @__PURE__ */ pure(applicativeParserT);
  var bimap6 = /* @__PURE__ */ bimap(bifunctorEither);
  var fromFoldable1 = /* @__PURE__ */ fromFoldable2(foldableList);
  var Value = function(x2) {
    return x2;
  };
  var QueryPairs = function(x2) {
    return x2;
  };
  var Key = function(x2) {
    return x2;
  };
  var valueToString = function(v2) {
    return fromJust12($$decodeURIComponent(v2));
  };
  var keyToString = function(v2) {
    return fromJust12($$decodeURIComponent(v2));
  };
  var keyPartChar = /* @__PURE__ */ alt12(unreserved)(/* @__PURE__ */ oneOf3(["!", "$", "'", "(", ")", "*", "+", ",", ":", "@", "/", "?"]));
  var valuePartChar = /* @__PURE__ */ alt12(keyPartChar)(/* @__PURE__ */ $$char2("="));
  var parsePart = function(parseK) {
    return function(parseV) {
      return bind26(wrapParser2(function($77) {
        return parseK(Key($77));
      })(map117(joinWith4(""))(someRec2(alt12(map117(singleton11)(keyPartChar))(pctEncoded)))))(function(key2) {
        return bind26(wrapParser2(traverse3(function($78) {
          return parseV(Value($78));
        }))(optionMaybe(bind26($$char2("="))(function() {
          return map117(joinWith4(""))(manyRec4(alt12(map117(singleton11)(valuePartChar))(pctEncoded)));
        }))))(function(value17) {
          return pure25(new Tuple(key2, value17));
        });
      });
    };
  };
  var parse11 = function(parseK) {
    return function(parseV) {
      var $79 = bimap6(function(v2) {
        return v2.value0;
      })(QueryPairs);
      var $80 = flip(runParser2)(map117(fromFoldable1)(sepBy(parsePart(parseK)(parseV))($$char2("&"))));
      return function($81) {
        return $79($80(unsafeToString($81)));
      };
    };
  };

  // purescript:/Users/vadymvadymov/projects/purescript-messenger/frontend/src/Main.purs
  var bind27 = /* @__PURE__ */ bind(bindEffect);
  var pure26 = /* @__PURE__ */ pure(applicativeEither);
  var mempty4 = /* @__PURE__ */ mempty(monoidArray);
  var map52 = /* @__PURE__ */ map(functorMaybe);
  var bind114 = /* @__PURE__ */ bind(bindAff);
  var discard11 = /* @__PURE__ */ discard(discardUnit)(bindAff);
  var for_3 = /* @__PURE__ */ for_(applicativeAff)(foldableMaybe);
  var applyFirst4 = /* @__PURE__ */ applyFirst(applyMaybe);
  var warnShow3 = /* @__PURE__ */ warnShow2(monadEffectAff)(showString);
  var when4 = /* @__PURE__ */ when(applicativeAff);
  var $$void7 = /* @__PURE__ */ $$void(functorAff);
  var handleRedirectCallback2 = /* @__PURE__ */ handleRedirectCallback(monadAffAff);
  var liftEffect14 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var matchesWith2 = /* @__PURE__ */ matchesWith(foldableEither);
  var when1 = /* @__PURE__ */ when(applicativeEffect);
  var notEq3 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqRoute));
  var map118 = /* @__PURE__ */ map(functorAff);
  var resetQueryString = /* @__PURE__ */ function() {
    var state3 = unsafeToForeign({});
    return function __do2() {
      var w2 = windowImpl();
      var t2 = bind27(document2(w2))(title5)();
      return bind27(history(w2))(replaceState(state3)(t2)("/"))();
    };
  }();
  var queryParams = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var Bind1 = Monad0.Bind1();
    var voidLeft6 = voidLeft(Bind1.Apply0().Functor0());
    var warnShow1 = warnShow2(dictMonadEffect)(showURIPartParseError);
    var pure111 = pure(Monad0.Applicative0());
    return bind(Bind1)(liftEffect(dictMonadEffect)(bind27(bind27(windowImpl)(location))(search)))(function(qry) {
      var v2 = parse11(pure26)(pure26)(fromString4(drop4(1)(qry)));
      if (v2 instanceof Left) {
        return voidLeft6(warnShow1(v2.value0))(mempty4);
      }
      ;
      if (v2 instanceof Right) {
        return pure111(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Main (line 71, column 3 - line 73, column 39): " + [v2.constructor.name]);
    });
  };
  var queryParams1 = /* @__PURE__ */ queryParams(monadEffectAff);
  var paramValue = function(key2) {
    return function(params) {
      var v2 = find2(function(v1) {
        return keyToString(v1.value0) === key2;
      })(params);
      if (v2 instanceof Nothing) {
        return Nothing.value;
      }
      ;
      if (v2 instanceof Just && v2.value0.value1 instanceof Nothing) {
        return Nothing.value;
      }
      ;
      if (v2 instanceof Just) {
        return map52(valueToString)(v2.value0.value1);
      }
      ;
      throw new Error("Failed pattern match at Main (line 77, column 3 - line 80, column 46): " + [v2.constructor.name]);
    };
  };
  var paramExists = function(key2) {
    var $59 = maybe(false)($$const(true));
    var $60 = find2(function(v2) {
      return keyToString(v2.value0) === key2;
    });
    return function($61) {
      return $59($60($61));
    };
  };
  var main2 = /* @__PURE__ */ function() {
    return runHalogenAff(bind114(bindFlipped(bindAff)(newClient)(clientConfig("https://puremess:8081/auth_config.json")))(function(auth0Client) {
      return bind114(queryParams1)(function(params) {
        return discard11(for_3(applyFirst4(paramValue("error")(params))(paramValue("state")(params)))(warnShow3))(function() {
          return discard11(when4(paramExists("code")(params) && paramExists("state")(params))(discard11($$void7(handleRedirectCallback2(auth0Client)))(function() {
            return liftEffect14(resetQueryString);
          })))(function() {
            return bind114(liftEffect14(bind27(windowImpl)(localStorage2)))(function(storage) {
              return bind114(liftEffect14(create))(function(notifications) {
                var auth0Config = {
                  client: auth0Client,
                  redirectUri: "https://puremess:8000/"
                };
                var appConfig = {
                  notifications,
                  backendApiUrl: "https://puremess:8081",
                  storage,
                  auth0Config
                };
                return bind114(bind114(awaitBody)(runUI2(component10)(appConfig)))(function(router) {
                  return $$void7(liftEffect14(matchesWith2(parse9(codec))(function(old) {
                    return function($$new2) {
                      return when1(notEq3(old)(new Just($$new2)))(launchAff_(map118(fromMaybe(unit))(router.query(mkTell(Navigate.create($$new2))))));
                    };
                  })));
                });
              });
            });
          });
        });
      });
    }));
  }();

  // build/index.js
  console.log("Loaded PureScript code \u{1F680}");
  main2();
})();
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=index.js.map
