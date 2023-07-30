import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
import { env } from "~/env.mjs";
import { readKey, createMessage, encrypt, Key, armor } from "openpgp";

export const circle = new Circle(env.CIRCLE_KEY, CircleEnvironments.sandbox);

interface IEncryptCardOptions {
  number: string;
  cvv: string;
}

export async function encryptCard(cardData: IEncryptCardOptions) {
  const { publicKey } = (await circle.encryption.getPublicKey()).data.data!;
  const armoredKey = Buffer.from(publicKey, "base64").toString();

  const decodedPublicKey = await readKey({ armoredKey });
  const message = await createMessage({ text: JSON.stringify(cardData) });

  const cipherText = await encrypt({
    message,
    encryptionKeys: decodedPublicKey,
  });

  // @ts-expect-error cipherText typings mismatch
  const encryptedMessage = Buffer.from(cipherText).toString("base64");

  return encryptedMessage;
}
