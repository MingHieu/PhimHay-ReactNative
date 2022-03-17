import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontiso from 'react-native-vector-icons/Fontisto';
import timeNumberToString from '../../../../util/timeNumberToString';

const BottomControl = props => {
  const {
    pause,
    fullScreen,
    current,
    duration,
    playHandle,
    fullScreenHandle,
    seekHandle,
    seekFinishHandle,
    canControl,
  } = props;

  return (
    <View style={[styles.container, fullScreen && styles.fullScreenContainer]}>
      <TouchableWithoutFeedback onPress={playHandle}>
        {pause ? (
          <View style={styles.controlBtn}>
            <IconAntDesign name="caretright" size={25} color={'#FFF'} />
          </View>
        ) : (
          <View style={styles.controlBtn}>
            <IconFontiso name="pause" size={23} color={'#FFF'} />
          </View>
        )}
      </TouchableWithoutFeedback>

      <View style={styles.timeControl}>
        <Text style={styles.current}>{timeNumberToString(current)}</Text>
        <Slider
          style={{flex: 1}}
          minimumValue={0}
          maximumValue={duration}
          value={current}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="rgba(259,259,259,.6)"
          thumbTintColor="#FFFFFF"
          tapToSeek={canControl}
          onValueChange={seekHandle}
          onSlidingComplete={seekFinishHandle}
        />
        <Text style={styles.duration}>{timeNumberToString(duration)}</Text>
      </View>

      <TouchableWithoutFeedback onPress={fullScreenHandle}>
        {fullScreen ? (
          <View style={styles.controlBtn}>
            <IconEntypo name="resize-100" size={25} color={'#FFF'} />
          </View>
        ) : (
          <View style={styles.controlBtn}>
            <IconEntypo name="resize-full-screen" size={25} color={'#FFF'} />
          </View>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BottomControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  fullScreenContainer: {
    padding: 20,
  },
  controlBtn: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  current: {
    width: 65,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  duration: {
    width: 65,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
});
