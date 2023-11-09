import React from 'react';
import {View, Text, Image} from 'react-native';
import {LOGIN_PROVIDER} from '@web3auth/react-native-sdk';

import {resolvedRedirectUrl, web3auth} from '../../../constants/web3auth';
import {Store, initialStateProps} from '../../../hooks/main_store';
import {storeIds} from '../../../helpers/formatWallets';
import Model from '../../../hooks/Model';
import Touch from '../../common/touch';

import PhantomAuthProvider from './phantomProvider';
import styles from './styles';

interface AuthModalProps {
  open: boolean;
  onClose?: Function;
  method: string;
}

const AuthModal = ({
  open = false,
  onClose = () => {},
  method = 'create',
}: AuthModalProps) => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);

  const pressClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const openWeb3Auth = async (provider: string) => {
    try {
      Model.setStore('dialog', {open: false});

      let arrayIds: Array<any> = [];

      if (provider === LOGIN_PROVIDER.GOOGLE) {
        const web3authResponse = await web3auth.login({
          redirectUrl: resolvedRedirectUrl,
          mfaLevel: 'none',
          loginProvider: provider,
        });

        if (web3authResponse?.userInfo?.oAuthIdToken) {
          arrayIds = [
            ...(state?.idTokens || []),
            web3authResponse?.userInfo?.oAuthIdToken,
          ];
          arrayIds = arrayIds.filter(
            (idToken, index) => arrayIds.indexOf(idToken) === index,
          );
          await storeIds(arrayIds);
          Model.setStore('idTokens', arrayIds);

          pressClose();
        } else {
          throw 'Does not have token';
        }
      }
    } catch (e) {
      console.log('Error openWeb3Auth: ', e);
    }
  };

  const renderSocialProviders = () => {
    const providers = [
      {
        label: LOGIN_PROVIDER.GOOGLE,
        image: require('../../../assets/images/logos/google.png'),
      },
      {
        label: LOGIN_PROVIDER.FACEBOOK,
        image: require('../../../assets/images/logos/facebook.png'),
      },
      {
        label: LOGIN_PROVIDER.TWITTER,
        image: require('../../../assets/images/logos/twitter.png'),
      },
    ];

    return providers.map(provier => (
      <Touch
        key={provier.label}
        style={styles.ctaSocial}
        onPress={() => openWeb3Auth(provier.label)}>
        <Image source={provier.image} style={styles.logoSocial} />
      </Touch>
    ));
  };

  return open ? (
    <>
      <View style={styles.container}>
        <Touch style={styles.backdropButton} onPress={pressClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.logo} />
            <View style={styles.containerTextHeader}>
              <Text style={styles.titleHeader}>
                {method === 'create' ? 'Create Wallet' : 'Log in'}
              </Text>
              <Text style={styles.textHeader}>
                Select one of the following to continue
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.labelBody}>CONTINUE WITH</Text>
            <View style={styles.rowCtasSocial}>{renderSocialProviders()}</View>
            <View style={styles.separatorBody} />
            <Text style={styles.labelBody}>EXTERNAL WALLET</Text>
            <View style={styles.rowCtasSocial}>
              <PhantomAuthProvider onClompete={pressClose} />
            </View>
            {/* <Touch style={styles.buttonBody}>
              <Text style={styles.labelButtonBody}>
                Wallet Connect (Coming soon)
              </Text>
            </Touch> */}
          </View>
          <View style={styles.footer}>
            <View style={styles.rowTerms}>
              <Touch>
                <Text style={styles.textCtaTerm}>Terms of use</Text>
              </Touch>
              <Text style={styles.textCtaTerm}>{' | '}</Text>
              <Touch>
                <Text style={styles.textCtaTerm}>Privacy policy</Text>
              </Touch>
            </View>
            <View style={styles.rowSecure}>
              <Text style={styles.labelSecure}>Secured by</Text>
              <View style={styles.imagesRowSecure}>
                <Image
                  source={require('../../../assets/images/logos/w3a.png')}
                  style={styles.imageSecure}
                />
                {/* <Image
                  source={require('../../../assets/images/logos/wc.png')}
                  style={styles.imageSecure}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  ) : null;
};

export default AuthModal;
