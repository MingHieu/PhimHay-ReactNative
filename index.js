import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// ignore react-native-gesture-handler warning
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
