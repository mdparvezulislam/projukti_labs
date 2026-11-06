export interface HashResult {
  hashHex: string;
  saltHex: string;
}

export async function hashPasswordWebCrypto(
  password: string,
  saltBytes?: Uint8Array
): Promise<HashResult> {
  const enc = new TextEncoder();
  const salt = saltBytes ?? crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  // Copy to a clean standard ArrayBuffer to satisfy BufferSource typing under modern TS/DOM libs
  const saltBuffer = new Uint8Array(salt).buffer as ArrayBuffer;

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashBuffer = new Uint8Array(derivedBits);
  const hashHex = Array.from(hashBuffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { hashHex, saltHex };
}

export async function verifyPasswordWebCrypto(
  password: string,
  storedHashHex: string,
  storedSaltHex: string
): Promise<boolean> {
  const saltBytes = new Uint8Array(
    storedSaltHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
  const { hashHex } = await hashPasswordWebCrypto(password, saltBytes);
  return hashHex === storedHashHex;
}

export async function generateSessionToken(): Promise<{
  rawToken: string;
  tokenHashHex: string;
}> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const rawToken = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(rawToken));
  const hashArr = new Uint8Array(hashBuf);
  const tokenHashHex = Array.from(hashArr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { rawToken, tokenHashHex };
}

export async function sha256(text: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  const hashArr = new Uint8Array(hashBuf);
  return Array.from(hashArr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

