import {StyleSheet} from 'react-native';
import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.blurBlackBg,
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
    width: '80%',
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: colors.gray,
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 12,
  },
  containerTextHeader: {
    flex: 1,
    marginRight: 12,
  },
  titleHeader: {
    color: colors.gray,
    fontSize: 18,
    fontWeight: '700',
  },
  textHeader: {
    color: colors.black,
    fontSize: 12,
    marginTop: 3,
  },
  body: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: '#F8F8FB',
  },
  labelBody: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  rowCtasSocial: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
  },
  ctaSocial: {
    backgroundColor: colors.white,
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
  },
  logoSocial: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  separatorBody: {
    backgroundColor: colors.black,
    height: 1,
    width: '100%',
    marginVertical: 24,
  },
  buttonBody: {
    backgroundColor: colors.purple,
    borderRadius: 12,
    paddingVertical: 12,
  },
  labelButtonBody: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowTerms: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textCtaTerm: {
    fontSize: 10,
    color: colors.gray,
  },
  rowSecure: {
    alignItems: 'flex-end',
  },
  labelSecure: {
    fontSize: 10,
    color: colors.gray,
  },
  imagesRowSecure: {
    flexDirection: 'row',
    marginTop: 3,
  },
  imageSecure: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 6,
    tintColor: 'gray',
  },
});

export default styles;
