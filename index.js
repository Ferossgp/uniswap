/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Extension from './Extension';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Extension[0].view);
