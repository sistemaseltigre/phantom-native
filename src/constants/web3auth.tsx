import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import {ethers} from 'ethers';

export const scheme = 'locketourglass';

export const resolvedRedirectUrl = `${scheme}://openlogin`;

export const clientId =
  'BOlxPsBPDyYBzbd-q6j2JKoC73vYwEURQdATs-DUPr_p5tKuvfQ89JxkwR7HKmcA-JDu8uR7OOlc8U6vOXpScn0';

export const googleClientId =
  '248828223479-49gfpf241ds7qc5no89fs17adut65gcp.apps.googleusercontent.com';

export const maticRpcTarget = __DEV__
  ? 'https://rpc.ankr.com/polygon_mumbai'
  : 'https://rpc.ankr.com/polygon';

export const ethRpcTarget = __DEV__
  ? 'https://rpc.ankr.com/eth_goerli'
  : 'https://rpc.ankr.com/eth';

export const maticEthersProvider = ethers.getDefaultProvider({
  chainId: __DEV__ ? 80001 : 137,
  _defaultProvider: providers => new providers.JsonRpcProvider(maticRpcTarget),
  name: 'matic',
});

export const ethEthersProvider = ethers.getDefaultProvider({
  chainId: __DEV__ ? 5 : 1,
  _defaultProvider: providers => new providers.JsonRpcProvider(ethRpcTarget),
  name: 'eth',
});

export const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: __DEV__ ? OPENLOGIN_NETWORK.TESTNET : OPENLOGIN_NETWORK.MAINNET,
  loginConfig: {
    google: {
      verifier: 'google-locket',
      typeOfLogin: LOGIN_PROVIDER.GOOGLE,
      clientId: googleClientId,
    },
  },
});
