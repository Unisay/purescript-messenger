import pkg from 'md5';
const { md5 } = pkg;

export function unusedHash(s) {
  return md5(s);
}
