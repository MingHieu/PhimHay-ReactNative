import {StyleSheet, Text, View, Switch, Platform} from 'react-native';
import React from 'react';

const Toggle = ({value, onValueChange}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{true: 'red'}}
      thumbColor={'#fff'}
      style={
        Platform.OS == 'android' && {transform: [{scaleX: 1.3}, {scaleY: 1.3}]}
      }
    />
  );
};

export default Toggle;

