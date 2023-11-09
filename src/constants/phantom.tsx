import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {Buffer} from 'buffer';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const scheme = 'locketourglass';
export const app_url = 'https://phantom.app';
export const cluster = __DEV__ ? 'devnet' : 'mainnet-beta';
export const NETWORK = clusterApiUrl(cluster);
export const connection = new Connection(NETWORK);
export const dappKeyPair = nacl.box.keyPair();
export const dapp_encryption_public_key = bs58.encode(dappKeyPair.publicKey);
export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;
export interface PhantomSessionprops {
  data: string;
  nonce: string;
  phantom_encryption_public_key: string;
  dappKeyPair: {
    publicKey: string;
    secretKey: string;
  };
}
export const saveLocalSessions = async (values: Array<string>) => {
  try {
    let stringValue = '';

    values.forEach(
      (value, index) => (stringValue += (index > 0 ? ';' : '') + value),
    );
    await AsyncStorage.setItem('@user_phantom_sessions', stringValue);
  } catch (e) {
    console.log('Error saving phantom sessions: ', e);
  }
};
export const decryptPayload = (
  data: string,
  nonce: string,
  sharedSecret?: Uint8Array,
) => {
  if (!sharedSecret) {
    throw new Error('missing shared secret');
  }

  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret,
  );
  if (!decryptedData) {
    throw new Error('Unable to decrypt data');
  }
  return JSON.parse(Buffer.from(decryptedData).toString('utf8'));
};

export const sharedSecretDapp = (publicKey, secretKey) =>
  nacl.box.before(bs58.decode(publicKey), new Uint8Array(secretKey));

export const connectData = (data, nonce, shared) =>
  decryptPayload(data, nonce, shared);

export const createTransferTransaction = async (fromPublicKey,toPublicKey,lamports) => {
    //... TODO para crear la TX con buffer, tweetnacl, bs58 ...
    //new PublicKey(connectData.public_key)
    //const decryptedData = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);
    //JSON.parse(Buffer.from(decryptedData).toString("utf8"));
    if (!fromPublicKey) throw new Error("missing public key from user");
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: toPublicKey,
        lamports: lamports,
      })
    );
    transaction.feePayer = fromPublicKey;
    const anyTransaction: any = transaction;
    anyTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    return transaction;
}
