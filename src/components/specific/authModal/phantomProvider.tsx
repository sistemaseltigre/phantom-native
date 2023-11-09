import React from 'react';
import {Linking, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  scheme,
  buildUrl,
  app_url,
  cluster,
  dapp_encryption_public_key,
  dappKeyPair,
  saveLocalSessions,
} from '../../../constants/phantom';
import {Store, initialStateProps} from '../../../hooks/main_store';
import Model from '../../../hooks/Model';
import Touch from '../../common/touch';

import styles from './styles';

interface PhantomAuthProviderProps {
  onClompete?: Function;
}

const PhantomAuthProvider = ({
  onClompete = () => {},
}: PhantomAuthProviderProps) => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);
  const route: any = useRoute();

  const openPhantomWallet = () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key,
      cluster,
      app_url,
      redirect_link: `${scheme}://${route.name}`,
    });

    const url = buildUrl('connect', params);

    Model.setStore('dialog', {open: false});
    console.log(url);
    Linking.openURL(url);
    if (typeof onClompete === 'function') {
      onClompete();
    }
  };

  const onNewRoute = () => {
    if (
      route.params?.data &&
      route.params?.nonce &&
      route.params?.phantom_encryption_public_key
    ) {
      const newSessions = [
        ...state.phantomSessions,
        {
          data: route.params?.data,
          nonce: route.params?.nonce,
          phantom_encryption_public_key:
            route.params?.phantom_encryption_public_key,
          dappKeyPair: {
            publicKey: String(dappKeyPair.publicKey),
            secretKey: String(dappKeyPair.secretKey),
          },
        },
      ];

      // console.log('newSessions: ', newSessions);

      saveLocalSessions(newSessions.map(data => JSON.stringify(data)));
      Model.setStore('phantomSessions', newSessions);
    }
  };

  const openAlert = () => {
    Model.setStore('dialog', {
      open: true,
      onClose: () => {},
      title: 'Phantom wallet',
      description:
        'This option only works with Solana, are you sure to continue?',
      call2actions: [
        {
          label: 'No',
          onPress: () => Model.setStore('dialog', {open: false}),
          style: 'done',
        },
        {
          label: 'Yes',
          onPress: openPhantomWallet,
          style: 'cancel',
        },
      ],
    });
  };

  React.useEffect(() => {
    onNewRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return (
    <Touch style={styles.ctaSocial} onPress={openAlert}>
      <Image
        source={require('../../../assets/images/logos/phantom.png')}
        style={styles.logoSocial}
      />
    </Touch>
  );
};

export default PhantomAuthProvider;
