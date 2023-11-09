import React, {Component} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {Store, StoreProvider} from './hooks/main_store';
import Spinner from './components/common/spinner';
import Dialog from './components/common/dialog';
import SignBlockchainModal from './components/specific/signBlockchainModal';
import {StatusBar} from 'react-native';
import Model from './hooks/Model';
import Routing from './routing';
import colors from './themes/colors';

const safeAreaStyles = {flex: 1, backgroundColor: colors.lightgray};

export const InitHooksClasses = () => {
  const {dispatch} = React.useContext<any>(Store);

  React.useEffect(() => {
    Model.set_dispatch(dispatch);
    return () => {};
  }, [dispatch]);
  return <React.Fragment />;
};

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={safeAreaStyles}>
          <StatusBar barStyle="light-content" />
          <StoreProvider>
            <InitHooksClasses />
            <Routing />
            <Dialog />
            <SignBlockchainModal />
            <Spinner />
          </StoreProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
