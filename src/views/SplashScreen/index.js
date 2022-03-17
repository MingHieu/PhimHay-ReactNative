import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../../util/size';

const SplashScreen = () => {
  const navigation = useNavigation();
  const pos1 = useSharedValue(SCREEN_WIDTH);
  const pos2 = useSharedValue(-SCREEN_WIDTH);

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
      navigation.navigate('HomeTab');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
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
