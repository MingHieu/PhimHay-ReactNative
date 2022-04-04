import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomControl from './BottomControl';
import SettingControl from './SettingControl';
import Subtitle from './Subtitle';

const Control = props => {
  const {
    pause,
    setPause,
    fullScreen,
    setFullScreen,
    current,
    setCurrent,
    duration,
    setDuration,
    playHandle,
    fullScreenHandle,
    seekHandle,
    seekFinishHandle,
    onTouchStart,
    onTouchEnd,
    canControl,
    reloadSubtitle,
    dis,
    isModal,
    setIsModal,
    loadingSubtitle,
    setLoadingSubtitle,
    loadingVideo,
    setLoadingVideo,
    source,
    poster,
    movieDetail,
    definition,
    setDefinition,
    episode,
    subtitle,
    setSubtitle,
    initializeDefinition,
    setInitializeDefinition,
  } = props;

  return (
    <View
      style={[styles.control, dis && styles.disControl]}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}>
      {subtitle != 'off' && <Subtitle {...props} />}
      {dis && <BottomControl {...props} />}
      {dis && <SettingControl {...props} />}
    </View>
  );
};

export default Control;

const styles = StyleSheet.create({
  control: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  disControl: {
    backgroundColor: 'rgba(0,0,0,.2)',
  },
});
