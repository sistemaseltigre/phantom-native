/**
 * @format
 */

import './src/constants/global';
import 'ethers/dist/shims';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import StorybookUIRoot from './storybook';
import App from './src/App';

const useStorybook = false; // Change this to use storybook or not
let app2import;

if (useStorybook) {
  AppRegistry.registerComponent(appName, () => StorybookUIRoot);
  app2import = StorybookUIRoot;
} else {
  AppRegistry.registerComponent(appName, () => App);
  app2import = App;
}

export {app2import as default};
