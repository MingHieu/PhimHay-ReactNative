import {StyleSheet, Platform, StatusBar} from 'react-native';

export default globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
