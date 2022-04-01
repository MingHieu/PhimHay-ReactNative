import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import {SCREEN_WIDTH} from '../../shared/theme/size';
import Control from './Control';
import Poster from './Poster';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

const VideoPlayer = props => {
  const {
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
  const videoRef = React.useRef();
  const timeRef = React.useRef();
  const [pause, setPause] = React.useState(true);
  const [resizeMode, setResizeMode] = React.useState('contain');
  const [fullScreen, setFullScreen] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [canControl, setCanControl] = React.useState(true);
  const [firstTouch, setFirstTouch] = React.useState(true);
  const [doubleTap, setDoubleTap] = React.useState(0);
  const [dis, setDis] = React.useState(true);
  const [isModal, setIsModal] = React.useState(false);
  const [reloadSubtitle, setReloadSubtitle] = React.useState(false); // reload subtitle when seek finish
  const [loadingSubtitle, setLoadingSubtitle] = React.useState(false);
  const [loadingVideo, setLoadingVideo] = React.useState(true);
  const [seekTime, setSeekTime] = React.useState();
  const {colors} = useTheme();

  React.useEffect(() => {
    return () => {
      clearTimeout(timeRef);
      timeRef.current = null;
      setDis(true);
      setFirstTouch(true);
    };
  }, [source]);

  React.useEffect(() => {
    const unsubcribe = Orientation.addOrientationListener(orientation => {
      if (orientation == 'LANDSCAPE') {
        setFullScreen(true);
      }
      if (orientation == 'PORTRAIT') {
        setFullScreen(false);
      }
    });
    return unsubcribe;
  }, []);

  const fullScreenHandle = () => {
    if (!canControl) return;
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  const playHandle = () => {
    if (firstTouch) setFirstTouch(false);
    if (!canControl) return;
    if (loadingVideo) setLoadingVideo(false);
    setPause(prev => !prev);
  };

  const seekHandle = time => {
    if (!canControl) return;
    if (firstTouch) setFirstTouch(false);
    videoRef.current.seek(time);
    setSeekTime(time);
    setCurrent(time);
  };

  const seekFinishHandle = time => {
    if (!canControl) return;
    if (firstTouch) setFirstTouch(false);
    videoRef.current.seek(time);
    setSeekTime(time);
    setCurrent(time);
    setReloadSubtitle(prev => !prev);
  };

  const doubleTapControl = () => {
    if (isModal) return;
    if (doubleTap) {
      if (resizeMode == 'cover') {
        setResizeMode('contain');
      } else {
        setResizeMode('cover');
      }
    }
    setDoubleTap(prev => prev + 1);
    setTimeout(() => {
      setDoubleTap(0);
    }, 200);
  };

  const _onTouchStart = () => {
    if (!dis) setDis(true);
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    if (!canControl) {
      setTimeout(() => {
        setCanControl(true);
      }, 200);
    }
  };

  const _onTouchEnd = () => {
    doubleTapControl();
    timeRef.current = setTimeout(() => {
      if (isModal) return; // kiểm tra modal có hiện hay không
      setCanControl(false);
      setDis(false);
    }, 3000);
  };

  const _onLoad = props => {
    const {duration} = props;
    setLoadingVideo(false);
    if (initializeDefinition) {
      setInitializeDefinition(false);
      videoRef.current.seek(0);
      setCurrent(0);
      setDuration(duration);
      setPause(true);
      setFirstTouch(true);
    } else {
      videoRef.current.seek(current);
    }
  };

  const _onBuffer = () => {};

  const _onProgress = props => {
    const {currentTime} = props;

    /* 
    - Nếu tua thì sẽ có seekTime
    - Kiểm tra xem seekTime và currentTime có giống nhau không để 
    biết được video có đang load không
    */
    if (seekTime) {
      const t = Math.abs(Math.ceil(seekTime - currentTime));
      if (t > 1) {
        if (!pause) setLoadingVideo(true);
        return;
      }
      setSeekTime(null);
    }
    /*
    - Khi video đang load thì currentTime sẽ bằng với current
    - Nếu video đang chạy sẽ để Loading Video thành true
    - Nếu video không chạy thì thôi
    */
    if (currentTime == current) {
      if (!pause) setLoadingVideo(true);
      return;
    }
    // Nếu video chạy mượt sẽ chuyển loading về false
    if (loadingVideo) {
      setLoadingVideo(false);
    }
    // Nếu video chạy chuyển first touch về false
    if(firstTouch){
      setFirstTouch(false)
    }
    setCurrent(currentTime);
  };

  const _onEnd = () => {
    setPause(true);
  };

  const _onError = e => {
    // setReload(prev => !prev);
    console.log(e);
  };

  // console.log(movieDetail);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (fullScreen) {
          Orientation.lockToPortrait();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [fullScreen]),
  );

  return (
    <View
      style={[
        fullScreen ? styles.fullScreenContainer : styles.container,
        {
          backgroundColor: 'black',
        },
      ]}>
      <Video
        style={{flex: 1}}
        source={source}
        ref={videoRef}
        resizeMode={resizeMode}
        paused={pause}
        onLoad={_onLoad}
        onBuffer={_onBuffer}
        onProgress={_onProgress}
        onEnd={_onEnd}
        onError={_onError}
      />

      {firstTouch && <Poster poster={poster} />}

      {loadingVideo && (
        <ActivityIndicator size="large" color="#FFF" style={styles.loading} />
      )}

      <Control
        pause={pause}
        setPause={setPause}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        current={current}
        setCurrent={setCurrent}
        duration={duration}
        setDuration={setDuration}
        playHandle={playHandle}
        fullScreenHandle={fullScreenHandle}
        seekHandle={seekHandle}
        seekFinishHandle={seekFinishHandle}
        onTouchStart={_onTouchStart}
        onTouchEnd={_onTouchEnd}
        canControl={canControl}
        reloadSubtitle={reloadSubtitle}
        dis={dis}
        isModal={isModal}
        setIsModal={setIsModal}
        loadingSubtitle={loadingSubtitle}
        setLoadingSubtitle={setLoadingSubtitle}
        loadingVideo={loadingVideo}
        setLoadingVideo={setLoadingVideo}
        {...props}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 9) / 16,
    justifyContent: 'center',
  },
  fullScreenContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    zIndex: 999,
  },
  loading: {
    ...StyleSheet.absoluteFill,
  },
});
