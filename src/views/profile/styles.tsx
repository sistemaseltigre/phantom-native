import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    flex: 1,
  },
  header: {
    height: 116,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerBg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  headerButton: {
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  textHeaderButton: {
    color: colors.white,
  },
  containerImageProfile: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
    alignSelf: 'center',
    zIndex: 1,
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FED8A9',
    overflow: 'hidden',
  },
  infoContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(31, 31, 31, 0.75)',
    alignItems: 'center',
    marginTop: -35,
    paddingTop: 50,
  },
  nameAccount: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  addressAccount: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 12,
    marginTop: 6,
  },
  connectButton: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: colors.purple,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  saveButton: {
    backgroundColor: 'transparent',
  },
  addWalletButton: {
    marginBottom: 18,
    backgroundColor: colors.purple,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  textConnectButton: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  labelList: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
    margin: 20,
  },
  scrollList: {
    marginHorizontal: 20,
  },
});

export default styles;
