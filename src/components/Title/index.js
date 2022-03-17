import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Title = ({text, style}) => {
  return <Text style={[styles.title, style]}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 10,
  },
});
