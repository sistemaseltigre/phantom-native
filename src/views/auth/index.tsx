import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {Store, initialStateProps} from '../../hooks/main_store';
import AuthModal from '../../components/specific/authModal';
import Touch from '../../components/common/touch';
import * as Routes from '../../constants/routes';
import Model from '../../hooks/Model';

import styles from './styles';

function AuthScreen({navigation}) {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);

  const [methodAuth, setMethodAuth] = React.useState<string>('');

  React.useEffect(() => {
    Model.setStore('loading', false);

    if (state.idTokens?.length > 0 || state.phantomSessions?.length > 0) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.INTRO}],
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.idTokens, state.phantomSessions]);

  return (
    <View style={styles.content}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/intro.png')}
        />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.description}>
          Create a Wallet, send, receive, have your own unique QR code and
          manage your finances.
        </Text>
        <Touch onPress={() => setMethodAuth('create')} style={styles.button}>
          <Text style={styles.labelButton}>Create Wallet</Text>
        </Touch>
        <Touch
          onPress={() => setMethodAuth('connect')}
          style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.labelButton, styles.secondaryLabel]}>
            I already have a wallet
          </Text>
        </Touch>
      </ScrollView>

      <AuthModal
        open={!!methodAuth}
        method={methodAuth}
        onClose={() => setMethodAuth('')}
      />
    </View>
  );
}

export default AuthScreen;
