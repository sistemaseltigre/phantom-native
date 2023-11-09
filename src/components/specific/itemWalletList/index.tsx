import React from 'react';
import {View, Text, Image} from 'react-native';

import {Store, initialStateProps} from '../../../hooks/main_store';
import Touch from '../../common/touch';

import styles from './styles';

interface ItemWalletListProps {
  onPress: Function;
  wallet: any;
  style?: any;
  noSelected?: boolean;
  variant?: 'light' | 'dark';
  selectedWallet?: any;
}

const ItemWalletList = ({
  onPress,
  wallet,
  style,
  noSelected,
  variant = 'light',
  selectedWallet,
}: ItemWalletListProps) => {
  const {state}: {state: initialStateProps} = React.useContext<any>(Store);
  const currentSelectedWallet = selectedWallet || state.selectedWallet;

  return (
    <Touch
      key={wallet.address}
      style={[styles.containerItemWallet, styles[variant], style]}
      onPress={onPress}>
      <Image style={styles.logoItemWallet} source={wallet.image} />
      <View style={styles.infoItemWallet}>
        <Text style={styles.labelItemWallet} numberOfLines={1}>
          {wallet.label}
        </Text>
        <Text style={styles.addressItemWallet} numberOfLines={1}>
          {wallet.address.slice(0, 8)}...
          {wallet.address.slice(wallet.address.length - 8)}
        </Text>
      </View>
      {currentSelectedWallet === wallet.address && !noSelected ? (
        <View style={[styles.selectedItemWallet, styles[`dot${variant}`]]} />
      ) : null}
    </Touch>
  );
};

export default ItemWalletList;
