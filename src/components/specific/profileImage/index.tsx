import React from 'react';
import {Image, View} from 'react-native';

import {Store, initialStateProps} from '../../../hooks/main_store';
import returnFormatedWallets from '../../../helpers/formatWallets';
import styles from './styles';

interface ProfileImageProps {
  customStyles?: any;
}

const ProfileImage = ({customStyles}: ProfileImageProps) => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);
  const [imageProfile, setImageProfile] = React.useState<any>('');

  React.useEffect(() => {
    let allWallets: any[] = [];
    let defaultWallet: number = -1;

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

    if (allWallets?.[defaultWallet]?.image) {
      setImageProfile(allWallets[defaultWallet].image);
    } else {
      setImageProfile('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedWallet]);

  return (
    <View style={[styles.container, customStyles]}>
      {imageProfile ? (
        <Image style={styles.image} source={imageProfile} />
      ) : null}
    </View>
  );
};

export default ProfileImage;
