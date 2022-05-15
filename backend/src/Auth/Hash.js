import { argon2i } from "argon2-ffi";

export function _hashPassword(password) {
    return async function (salt) {
        return await argon2i.hash(password, Buffer.from(salt));
    };
};
