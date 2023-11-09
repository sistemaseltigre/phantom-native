// import {action} from '@storybook/addon-actions';
import React from 'react';
import {Text} from 'react-native';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';

import Touch from '../../../src/components/common/touch';
import CenterView from '../CenterView';

storiesOf('Touch', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Text', () => (
    <Touch onPress={() => console.log('clicked-text')}>
      <Text>{text('Button text', 'Hello Button')}</Text>
    </Touch>
  ))
  .add('Some emoji', () => (
    <Touch onPress={() => console.log('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Touch>
  ));
