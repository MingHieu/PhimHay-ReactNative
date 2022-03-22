import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';

const getGlobalStyles = props => {
  const {colors} = props;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  });
};

const useGlobalStyle = () => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  return styles;
};

export default useGlobalStyle;
