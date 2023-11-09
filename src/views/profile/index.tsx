import React from 'react';
import {Text, View, Image, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import ItemWalletList from '../../components/specific/itemWalletList';
import ProfileImage from '../../components/specific/profileImage';
import {Store, initialStateProps} from '../../hooks/main_store';
import returnFormatedWallets from '../../helpers/formatWallets';
import AuthModal from '../../components/specific/authModal';
import Touch from '../../components/common/touch';
import * as Routes from '../../constants/routes';
import Model from '../../hooks/Model';

import styles from './styles';

const Profile = ({navigation}) => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);

  const [userWallets, setUserWallets] = React.useState<Array<any>>([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [methodAuth, setMethodAuth] = React.useState<string>('');
  const [indexDefaultWallet, setIndexDefaultWallet] =
    React.useState<number>(-1);

  const getAllInfoWallets = () => {
    try {
      let allWallets: any[] = [];
      let defaultWallet: number = -1;

      if (state.loading) {
        return null; // Abort
      }

      if (state.idTokens.length > 0) {
        allWallets = state.idTokens;
      }

      if (state.phantomSessions.length > 0) {
        allWallets = [...allWallets, ...state.phantomSessions];
      }

      allWallets = returnFormatedWallets(allWallets);

      defaultWallet = allWallets.findIndex(
        ({address}) => address === state.selectedWallet,
      );

      setIndexDefaultWallet(defaultWallet);
      setUserWallets(allWallets);

      if (allWallets.length < 1) {
        throw 'No linked wallets';
      }
    } catch (e) {
      console.log('Get wallets error: ', e);
      navigation.goBack();
    }
  };

  const logOut = async () => {
    try {
      Model.setStore('opacity', 1);
      Model.setStore('loading', true);

      await AsyncStorage.removeItem('@user_ids_tokens');
      await AsyncStorage.removeItem('@user_default_wallet');
      await AsyncStorage.removeItem('@user_phantom_sessions');
      Model.resetAll();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.AUTH}],
        }),
      );
    } catch (e) {
      console.log('Log out error: ', e);
    } finally {
      Model.setStore('loading', false);
    }
  };

  const openAuth = () => {
    Model.setStore('dialog', {
      open: true,
      onClose: () => {},
      title: 'Log out',
      description: 'Are you sure close your session?',
      call2actions: [
        {
          label: 'No',
          onPress: () => Model.setStore('dialog', {open: false}),
          style: 'done',
        },
        {
          label: 'Yes',
          onPress: logOut,
          style: 'cancel',
        },
      ],
    });
  };

  const changeDefaultWallet = async ({address}: any) => {
    try {
      Model.setStore('selectedWallet', address);
      await AsyncStorage.setItem('@user_default_wallet', address);
    } catch (e) {
      Alert.alert('Error', `We can't change your default wallet: ${e}`);
    } finally {
      setOpenEdit(false);
    }
  };

  const renderWallets = () =>
    userWallets.map(wallet => (
      <ItemWalletList
        key={wallet.address}
        onPress={() =>
          state.selectedWallet === wallet.address
            ? null
            : changeDefaultWallet(wallet)
        }
        wallet={wallet}
      />
    ));

  React.useEffect(() => {
    getAllInfoWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.idTokens,
    state.phantomSessions,
    state.selectedWallet,
    state.loading,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/profile-bg.png')}
          style={styles.headerBg}
        />
        <Touch style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.textHeaderButton}>Back</Text>
        </Touch>
        <Touch style={styles.headerButton}>
          <Text style={styles.textHeaderButton} onPress={openAuth}>
            Log out
          </Text>
        </Touch>
      </View>
      <View style={styles.containerImageProfile}>
        <View style={styles.imageProfile}>
          <ProfileImage />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameAccount} numberOfLines={1}>
          {userWallets[indexDefaultWallet]?.label}
        </Text>
        <Text style={styles.addressAccount}>
          {userWallets[indexDefaultWallet]?.address.slice(0, 4)}...
          {userWallets[indexDefaultWallet]?.address.slice(
            userWallets[indexDefaultWallet]?.address.length - 5,
          )}
        </Text>
        <Touch
          style={[styles.connectButton, openEdit ? styles.saveButton : {}]}
          onPress={() => setOpenEdit(ov => !ov)}>
          <Text style={styles.textConnectButton}>
            {openEdit ? 'Close edit' : 'Edit profile'}
          </Text>
        </Touch>
      </View>
      {openEdit ? (
        <>
          <Text style={styles.labelList}>Select default wallet</Text>
          <ScrollView style={styles.scrollList}>
            <Touch
              style={styles.addWalletButton}
              onPress={() => setMethodAuth('connect')}>
              <Text style={styles.textConnectButton}>Add new wallet</Text>
            </Touch>
            {renderWallets()}
          </ScrollView>
        </>
      ) : null}

      <AuthModal
        open={!!methodAuth}
        method={methodAuth}
        onClose={() => setMethodAuth('')}
      />
    </View>
  );
};

export default Profile;
