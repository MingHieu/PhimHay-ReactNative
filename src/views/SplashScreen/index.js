import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {APP_SCREEN_TYPES} from '../../routes/screenTypes';
import {SCREEN_WIDTH} from '../../shared/theme/size';

const SplashScreen = () => {
  const navigation = useNavigation();
  const pos1 = useSharedValue(SCREEN_WIDTH);
  const pos2 = useSharedValue(-SCREEN_WIDTH);
  const {colors} = useTheme();

  const trans1 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: pos1.value}],
    };
  });
  const trans2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: pos2.value}],
    };
  });

  React.useEffect(() => {
    pos1.value = withSpring(0, {
      damping: 12,
    });
    pos2.value = withSpring(0, {
      damping: 12,
    });
    setTimeout(() => {
      navigation.navigate(APP_SCREEN_TYPES.HOME_TAB);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={colors.statusBar}
      />
      <Animated.Image
        source={require('../../assets/image/clapperboard.png')}
        style={[styles.logo, trans2]}
      />
      <Animated.Text style={[styles.title, trans1]}>PhimHay</Animated.Text>
      {/* <Text style={styles.description}>Fast - F</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
