import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../themes/colors';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
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
  separatorBody: {
    backgroundColor: colors.gray,
    height: 1,
    width: '100%',
    marginTop: 18,
    marginBottom: 6,
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
    backgroundColor: '#F8F8FB',
    maxHeight: height * 0.5,
  },
  labelBody: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 12,
  },
  listInfoBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderColor: colors.gray,
    marginBottom: 12,
  },
  rowInfoBody: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 6,
  },
  bold: {
    fontWeight: '600',
    fontSize: 14,
    marginRight: 12,
  },
  infoBody: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  textRed: {
    fontWeight: '600',
    color: colors.red,
  },
  textGreen: {
    fontWeight: '600',
    color: colors.green,
  },
  errorLabelBody: {
    color: colors.red,
    fontSize: 12,
    marginTop: 18,
    marginBottom: 6,
  },
  rowCtasBlockchains: {
    marginTop: 6,
    marginBottom: 6,
  },
  ctaProvider: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    minWidth: 60,
    opacity: 0.25,
  },
  opacity: {
    opacity: 1,
  },
  logoProvider: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  labelProvider: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 6,
  },
  buttonBody: {
    backgroundColor: colors.purple,
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 12,
  },
  labelButtonBody: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 12,
  },
  cancelButtonBody: {
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  labelCancelButtonBody: {
    color: colors.purple,
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
  emptyWallet: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 12,
  },
  rowAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemAccount: {
    flex: 1,
    marginBottom: 0,
  },
  buttonChange: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  changeIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    opacity: 0.5,
  },
});

export default styles;
