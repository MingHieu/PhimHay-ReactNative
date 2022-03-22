import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGlobalStyle} from '../../shared/hook';

const Title = ({text, style}) => {
  const globalStyles = useGlobalStyle();
  return <Text style={[styles.title, globalStyles.text, style]}>{text}</Text>;
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
