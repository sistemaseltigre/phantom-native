import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../themes/colors';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});

export default styles;
