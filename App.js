import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppSource from './src/routes';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppSource />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
