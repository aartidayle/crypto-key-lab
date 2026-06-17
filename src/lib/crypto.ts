// CryptoVault — core cryptography helpers
// Uses crypto-js for AES encryption/decryption and hash generation.
// NOTE: This is for educational purposes. Real-world apps should derive keys
// with a strong KDF (PBKDF2/Argon2) and handle IVs explicitly.
import CryptoJS from "crypto-js";

export type AesAlgorithm = "AES-128" | "AES-256";

/**
 * Derive a fixed-length key from a user password using PBKDF2.
 * AES-128 -> 128-bit key, AES-256 -> 256-bit key.
 */
function deriveKey(password: string, salt: CryptoJS.lib.WordArray, algo: AesAlgorithm) {
  const keySize = algo === "AES-256" ? 256 / 32 : 128 / 32;
  return CryptoJS.PBKDF2(password, salt, {
    keySize,
    iterations: 10_000,
    hasher: CryptoJS.algo.SHA256,
  });
}

/**
 * Encrypt plaintext with AES-CBC. Output bundles salt+iv+ciphertext
 * as a single base64 string so decryption only needs the password.
 */
export function encryptText(plaintext: string, password: string, algo: AesAlgorithm): string {
  const salt = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);
  const key = deriveKey(password, salt, algo);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Bundle: salt | iv | ciphertext, encoded as base64
  const combined = salt.concat(iv).concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
}

/**
 * Decrypt a bundle previously produced by encryptText.
 * Throws a human-friendly Error on failure.
 */
export function decryptText(ciphertextB64: string, password: string, algo: AesAlgorithm): string {
  let combined: CryptoJS.lib.WordArray;
  try {
    combined = CryptoJS.enc.Base64.parse(ciphertextB64.trim());
  } catch {
    throw new Error("Invalid encrypted text format.");
  }

  if (combined.sigBytes < 32) {
    throw new Error("Invalid encrypted text: too short to contain salt + IV.");
  }

  const words = combined.words;
  const salt = CryptoJS.lib.WordArray.create(words.slice(0, 4), 16);
  const iv = CryptoJS.lib.WordArray.create(words.slice(4, 8), 16);
  const ctWords = words.slice(8);
  const ciphertext = CryptoJS.lib.WordArray.create(ctWords, combined.sigBytes - 32);

  const key = deriveKey(password, salt, algo);

  try {
    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext }),
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    const text = decrypted.toString(CryptoJS.enc.Utf8);
    if (!text) throw new Error("empty");
    return text;
  } catch {
    throw new Error("Decryption failed. Check your password or algorithm.");
  }
}

export interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

/** Generate the common cryptographic hashes for a string. */
export function generateHashes(input: string): HashResult {
  return {
    md5: CryptoJS.MD5(input).toString(),
    sha1: CryptoJS.SHA1(input).toString(),
    sha256: CryptoJS.SHA256(input).toString(),
    sha512: CryptoJS.SHA512(input).toString(),
  };
}
