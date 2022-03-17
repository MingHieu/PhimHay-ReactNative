import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../util/size';
import PF_SRT from '../../../../util/srtToObject';

const Subtitle = props => {
  const {
    fullScreen,
    subtitle,
    current,
    pause,
    reloadSubtitle,
    setLoadingSubtitle,
    loadingVideo,
  } = props;
  const [subtitleTxt, setSubitleTxt] = React.useState();
  const [subtitleTxtList, setSubtitleTxtList] = React.useState();
  const [line, setLine] = React.useState(0);
  const startTimeRef = React.useRef();
  const endTimeRef = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(startTimeRef.current);
      clearTimeout(endTimeRef.current);
      startTimeRef.current = null;
      endTimeRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    setSubtitleTxtList(null);
    setLoadingSubtitle(true);
    axios.get(subtitle).then(data => {
      const arr = PF_SRT(data.data);
      setSubtitleTxtList(arr);
      setLoadingSubtitle(false);
      const li = findLine(arr, current);
      setLine(li);
    });
  }, [subtitle]);

  React.useEffect(() => {
    if (!subtitleTxtList) return;
    const li = findLine(subtitleTxtList, current);
    setLine(li);
    if (startTimeRef.current) clearTimeout(startTimeRef.current);
    if (endTimeRef.current) clearTimeout(endTimeRef.current);
    if (!pause) setSubitleTxt(null);
  }, [reloadSubtitle, pause]);

  React.useEffect(() => {
    if (!subtitleTxtList || pause || loadingVideo) {
      if (startTimeRef.current) clearTimeout(startTimeRef.current);
      if (endTimeRef.current) clearTimeout(endTimeRef.current);
      return;
    }

    if (current != 0 && line == 0) {
      setSubitleTxt(null);
      return;
    }

    const startAfter = subtitleTxtList[line].startTime - current;
    const endAfter = subtitleTxtList[line].endTime - current;
    const txt = subtitleTxtList[line].text;

    startTimeRef.current = setTimeout(() => {
      setSubitleTxt(txt);
    }, startAfter * 1000);
    endTimeRef.current = setTimeout(() => {
      setSubitleTxt(null);
      setLine(prev => parseInt(prev) + 1);
    }, endAfter * 1000);
  }, [line, subtitleTxtList, pause, loadingVideo]);

  const findLine = (arr, current) => {
    for (let i in arr) {
      if (current < arr[i].endTime) return i;
    }
    return 0;
  };

  return (
    <View style={[styles.container, fullScreen && styles.fullScreenContainer]}>
      {!!subtitleTxt && subtitle != 'off' && (
        <Text
          style={[
            styles.subtitleTxt,
            fullScreen && styles.fullScreenSubtitleTxt,
          ]}>
          {subtitleTxt}
        </Text>
      )}
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  fullScreenContainer: {
    marginBottom: 30,
  },
  subtitleTxt: {
    maxWidth: SCREEN_WIDTH - 50,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  fullScreenSubtitleTxt: {
    maxWidth: SCREEN_HEIGHT - 200,
  },
});
