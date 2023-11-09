import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {StoreProvider} from '../../../src/hooks/main_store';
import Dialog from '../../../src/components/common/dialog';

storiesOf('Dialog', module)
  .add('One button', () => (
    <StoreProvider
      initialState={{
        dialog: {
          open: true,
          onClose: () => {},
          title: 'Hey you!',
          description: 'This is an example of Dialog',
          call2actions: [
            {
              label: 'Okay',
              style: 'done',
              onPress: () => console.log('Pressed'),
            },
          ],
        },
      }}>
      <Dialog />
    </StoreProvider>
  ))
  .add('Multiple buttons', () => (
    <StoreProvider
      initialState={{
        dialog: {
          open: true,
          onClose: () => {},
          title: 'Hey you!',
          description: "It's me again! But with more buttons",
          call2actions: [
            {
              label: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Pressed cancel'),
            },
            {
              label: 'Okay',
              style: 'done',
              onPress: () => console.log('Pressed okay'),
            },
          ],
        },
      }}>
      <Dialog />
    </StoreProvider>
  ));
