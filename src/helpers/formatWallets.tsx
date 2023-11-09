import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {connectData, sharedSecretDapp} from '../constants/phantom';

const returnFormatedWallets = (wallets: any[]) => {
  let formatedWallets: any[] = [];

  if (wallets?.forEach) {
    wallets.forEach(wallet => {
      if (wallet.acknowledged) {
        // Wallet Connect
        formatedWallets.push({
          label: wallet?.topic,
          address: wallet?.peer?.publicKey,
          image: require('../assets/images/logos/wc.png'),
          provider: 'wc',
        });
      } else if (wallet.phantom_encryption_public_key) {
        // Phantom
        formatedWallets.push({
          label: 'Phantom wallet',
          address: connectData(
            wallet.data,
            wallet.nonce,
            sharedSecretDapp(
              wallet.phantom_encryption_public_key,
              wallet.dappKeyPair.secretKey.split(','),
            ),
          ).session,
          image: require('../assets/images/logos/phantom.png'),
          provider: 'phantom',
        });
      } else {
        // Web3Auth
        const decodedValue: any = jwt_decode(wallet);

        if (
          decodedValue?.verifier === 'torus' ||
          decodedValue?.verifier === 'google-locket'
        ) {
          formatedWallets.push({
            label: decodedValue?.email,
            address: decodedValue?.wallets?.[0]?.public_key,
            provider: 'web3auth',
            idToken: wallet,
            image:
              {uri: decodedValue?.profileImage} ||
              require('../assets/images/logos/w3a.png'),
          });
        } else if (decodedValue?.sub) {
          formatedWallets.push({
            label: decodedValue?.email,
            address: decodedValue?.sub,
            provider: 'web3auth',
            idToken: wallet,
            image:
              {uri: decodedValue?.picture} ||
              require('../assets/images/logos/w3a.png'),
          });
        }
      }
    });
  }

  return formatedWallets;
};

export const storeIds = async (values: Array<string>) => {
  try {
    const stringValue = values.toString();
    await AsyncStorage.setItem('@user_ids_tokens', stringValue);
  } catch (e) {
    console.log('Error saving id tokens: ', e);
  }
};

export const returnWallets = (
  option: 'single' | 'multiple',
  state: any,
  selectedWallet: string,
) => {
  let allWallets: any[] = [];
  let auxWallets: any[] = [];

  if (state.idTokens.length > 0) {
    allWallets = state.idTokens;
  }

  if (state.phantomSessions.length > 0) {
    allWallets = [...allWallets, ...state.phantomSessions];
  }

  if (option === 'single') {
    auxWallets = returnFormatedWallets(allWallets);

    return allWallets[
      auxWallets.findIndex(wallet => wallet?.address === selectedWallet)
    ];
  }

  return returnFormatedWallets(allWallets);
};

export default returnFormatedWallets;
