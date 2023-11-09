import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {StoreProvider} from '../../../src/hooks/main_store';
import Spinner from '../../../src/components/common/spinner';

storiesOf('Spinner', module)
  .add('Just spin', () => (
    <StoreProvider
      initialState={{
        loading: true,
        opacity: 1,
      }}>
      <Spinner />
    </StoreProvider>
  ))
  .add('Whit opacity', () => (
    <StoreProvider
      initialState={{
        loading: true,
        opacity: 0.3,
      }}>
      <Spinner />
    </StoreProvider>
  ));
