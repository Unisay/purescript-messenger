import pkg from 'md5';
const { md5 } = pkg;

export function hash(s) {
  return md5(s);
}
