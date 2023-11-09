import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import returnFormatedWallets from '../../helpers/formatWallets';
import Spinner from '../../components/common/spinner';
import * as ROUTES from '../../constants/routes';
import Model from '../../hooks/Model';

const IntroScreen = ({navigation}) => {
  const getIds = async () => {
    try {
      let allWalets: Array<any> = [];
      const web3authLocalStorage = await AsyncStorage.getItem(
        '@user_ids_tokens',
      );
      const phantomLocalStorage = await AsyncStorage.getItem(
        '@user_phantom_sessions',
      );
      const userDefaultWallet = await AsyncStorage.getItem(
        '@user_default_wallet',
      );
      let web3authSessions: string[] = [];
      let phantomSessions: string[] = [];

      if (web3authLocalStorage) {
        // Save in Global store Web3Auth values
        web3authSessions = web3authLocalStorage.split(',') || [];
        Model.setStore('idTokens', web3authSessions);
        allWalets = [...allWalets, ...web3authSessions];
      }

      if (phantomLocalStorage) {
        // Save in Global store Web3Auth values
        phantomSessions = (phantomLocalStorage.split(';') || []).map(data =>
          JSON.parse(data),
        );
        Model.setStore('phantomSessions', phantomSessions);
        allWalets = [...allWalets, ...phantomSessions];
      }

      allWalets = returnFormatedWallets(allWalets);

      if (allWalets.length > 0) {
        // Verify if userDefaultWallet exists, choose other one or redirect user to login
        if (
          allWalets.findIndex(
            session => session?.address === userDefaultWallet,
          ) > -1
        ) {
          Model.setStore('selectedWallet', userDefaultWallet);
        } else {
          Model.setStore('selectedWallet', allWalets[0].address);
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTES.HOME}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTES.AUTH}],
          }),
        );
      }
    } catch (e) {
      console.log('Get id tokens error: ', e);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ROUTES.AUTH}],
        }),
      );
    }
  };

  React.useEffect(() => {
    Model.setStore('opacity', 1);
    Model.setStore('loading', true);
    getIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default IntroScreen;
