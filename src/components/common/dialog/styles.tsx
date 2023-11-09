import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../themes/colors';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.blurBlackBg,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    maxWidth: '80%',
  },
  title: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 12,
    marginTop: 12,
  },
  rowCtas: {
    marginTop: 24,
    flexDirection: 'row',
  },
  containerCta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 12,
    marginHorizontal: 12,
  },
  containerBgCta: {
    backgroundColor: colors.purple,
  },
  textCta: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 12,
  },
  textWhite: {
    color: colors.white,
  },
});

export default styles;
