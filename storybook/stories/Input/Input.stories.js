// import {action} from '@storybook/addon-actions';
import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Input from '../../../src/components/common/input';
import CenterView from '../CenterView';

const styles = {
  borderWidth: 1,
  width: '90%',
  padding: 12,
  borderRadius: 12,
  fontSize: 14,
  backgroundColor: 'white',
};

storiesOf('Input', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Without limit', () => (
    <Input
      style={styles}
      placeholder="I am an example of input, type here ..."
    />
  ))
  .add('Max length 10', () => (
    <Input
      style={styles}
      placeholder="Just type 10 characteres"
      maxLength={10}
    />
  ));
