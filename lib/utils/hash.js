import cryptojs from "crypto-js";

const Hash = {};
Hash.secretKey = "0AZ34-30(e)obzLZC7|^$~\\E}CL1730ASO@-=_\-HLLT--=AEOuB{}_NXa39,W3";
Hash.encrypt = function(string) {
  if (typeof string !== "string") throw new Error("encrypt needs a string arg");
  return cryptojs.AES.encrypt(string, this.secretKey).toString();
};
Hash.decrypt = function(cipher) {
  if (typeof cipher !== "string") throw new Error("decrypt needs a string arg");
  return cryptojs.AES.decrypt(cipher, this.secretKey).toString(cryptojs.enc.Utf8);
};

export {Hash};
