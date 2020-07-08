import secp256k1 from "secp256k1";
import { Reader, normalizers } from "ckb-js-toolkit";
import { Hasher } from "ckb-js-toolkit-contrib/src/hasher";
import * as blockchain from "ckb-js-toolkit-contrib/src/blockchain.js";

export function ckbHash(buffer) {
  const h = new Hasher();
  h.update(buffer);
  return h.digest();
}

export function ckbHashString(buffer) {
  const hash = ckbHash(buffer);
  return new Reader(hash.toArrayBuffer()).serializeJson();
}

export function publicKeyHash(privateKey) {
  const publicKey = secp256k1.publicKeyCreate(
    new Uint8Array(new Reader(privateKey).toArrayBuffer())
  );
  const h = ckbHash(publicKey.buffer);
  return new Reader(h.toArrayBuffer().slice(0, 20)).serializeJson();
}

export function secpSign(privateKey, message) {
  const { signature, recid } = secp256k1.ecdsaSign(
    new Uint8Array(new Reader(message).toArrayBuffer()),
    new Uint8Array(new Reader(privateKey).toArrayBuffer())
  );
  const array = new Uint8Array(65);
  array.set(signature, 0);
  array.set([recid], 64);
  return new Reader(array.buffer);
}

const byteToHex = [];

for (let n = 0; n <= 0xff; ++n) {
  const hexOctet = n.toString(16).padStart(2, "0");
  byteToHex.push(hexOctet);
}

export function arrayBufferToHex(arrayBuffer) {
  const buff = new Uint8Array(arrayBuffer);
  const hexOctets = []; // new Array(buff.length) is even faster (preallocates necessary array size), then use hexOctets[i] instead of .push()

  for (let i = 0; i < buff.length; ++i) hexOctets.push(byteToHex[buff[i]]);

  return "0x" + hexOctets.join("");
}

export function scriptToHash(script) {
  return arrayBufferToHex(
    ckbHash(blockchain.SerializeScript(normalizers.NormalizeScript(script)))
      .view.buffer
  );
}

export function str2ab(text) {
  return new TextEncoder().encode(text);
}
