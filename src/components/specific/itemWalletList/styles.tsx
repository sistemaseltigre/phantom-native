import {StyleSheet} from 'react-native';
import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  containerItemWallet: {
    borderWidth: 1,
    borderColor: 'rgba(99, 125, 234, 0.4)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  light: {
    backgroundColor: 'rgba(99, 125, 234, 0.25)',
  },
  dark: {
    backgroundColor: colors.gray,
  },
  logoItemWallet: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  infoItemWallet: {
    flex: 1,
    marginHorizontal: 18,
  },
  labelItemWallet: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  addressItemWallet: {
    color: colors.white,
    fontSize: 10,
    marginTop: 3,
  },
  selectedItemWallet: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dotlight: {
    backgroundColor: colors.purple,
  },
  dotdark: {
    backgroundColor: colors.white,
  },
});

export default styles;
