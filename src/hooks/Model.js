import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

import {
  clientId,
  resolvedRedirectUrl,
  googleClientId,
} from '../constants/web3auth';
import {storeIds} from '../helpers/formatWallets';

class model_class {
  /*
   * Set / get dispatch needs init in app root
   */
  dispatch = null;
  get_dispatch = () => {
    return this.dispatch == null ? false : this.dispatch;
  };
  set_dispatch = n_dispatch => {
    this.dispatch = n_dispatch;
  };
  /* End dispatch set */

  /*---- UPDATE LOCAL INFO ----*/
  resetAll = () => {
    this.dispatch({
      type: 'RESET_DATA',
    });
  };

  setStore = (label, data) => {
    this.dispatch({
      type: 'SET_STORE',
      payload: data,
      label,
    });
  };

  returnWeb3AuthSession = async (session, state) => {
    try {
      const infoToken = jwt_decode(session);
      let extraLoginOptions = {};
      let loginConfig = {};
      let arrayIds = [];
      let web3auth = {};

      if (infoToken?.exp && infoToken.exp > moment().format('X')) {
        loginConfig = {
          jwt: {
            verifier: 'google-locket',
            typeOfLogin: LOGIN_PROVIDER.GOOGLE,
            clientId: googleClientId,
          },
        };
        extraLoginOptions = {
          id_token_hint: session,
          prompt: 'none',
        };
      } else {
        loginConfig = {
          google: {
            verifier: 'google-locket',
            typeOfLogin: LOGIN_PROVIDER.GOOGLE,
            clientId: googleClientId,
          },
        };
        extraLoginOptions = {
          login_hint: infoToken?.email,
        };
      }

      web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: __DEV__
          ? OPENLOGIN_NETWORK.TESTNET
          : OPENLOGIN_NETWORK.MAINNET,
        loginConfig: loginConfig,
      });

      const web3authProvider = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.JWT,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'none',
        extraLoginOptions: extraLoginOptions,
      });

      if (web3authProvider?.userInfo?.oAuthIdToken) {
        arrayIds = [...(state?.idTokens || [])];
        arrayIds[arrayIds.indexOf(session)] =
          web3authProvider.userInfo.oAuthIdToken;
      }

      this.dispatch({
        type: 'SET_STORE',
        payload: arrayIds,
        label: 'idTokens',
      });

      storeIds(arrayIds);

      return web3authProvider;
    } catch (e) {
      throw e;
    }
  };
}

export default new model_class();
