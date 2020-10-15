/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Extension from './dist/Extension';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Extension[0].view);
