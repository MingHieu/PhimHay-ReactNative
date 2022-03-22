import {Dimensions, Platform, StatusBar} from 'react-native';

let STATUS_BAR_HEIGHT = 0;
if (Platform.OS === 'ios') {
  STATUS_BAR_HEIGHT = 50;
} else {
  STATUS_BAR_HEIGHT = StatusBar.currentHeight;
}
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export {SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT};
