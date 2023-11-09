import * as React from 'react';
import {Linking} from 'react-native';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Spinner from './components/common/spinner';
import {scheme} from './constants/web3auth';
import * as ROUTES from './constants/routes';

import AuthScreen from './views/auth';
import IntroScreen from './views/auth/introScreen';
import Dashboard from './views/dashboard';
import Profile from './views/profile';

const Stack = createNativeStackNavigator();

const linking: LinkingOptions<{}> = {
  prefixes: [`${scheme}://`],

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

function Routing() {
  return (
    <NavigationContainer linking={linking} fallback={<Spinner />}>
      <Stack.Navigator initialRouteName="intro">
        <Stack.Screen
          name={ROUTES.INTRO}
          component={IntroScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name={ROUTES.AUTH}
          component={AuthScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name={ROUTES.HOME}
          options={{headerShown: false}}
          component={Dashboard}
        />
        <Stack.Screen
          name={ROUTES.PROFILE}
          options={{headerShown: false}}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routing;
