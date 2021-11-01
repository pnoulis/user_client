import cryptojs from "crypto-js";

const secret = "0AZ34-30(e)obzLZC7|^$~E}CL1730ASO@-=_-HLLT--=AEOuB{}_NXa39,W3";
const Hash = {};
Hash.encrypt = (string, secretKey = secret) => cryptojs.AES.encrypt(string, secretKey).toString();
Hash.decrypt = (cipher, secretKey = secret) => cryptojs.AES.decrypt(cipher, secretKey).toString(cryptojs.enc.Utf8);

export {Hash};

