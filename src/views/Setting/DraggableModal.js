import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../shared/theme/size';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const ModalContent = gestureHandlerRootHOC(({setVisible}) => {
  const startPos = SCREEN_HEIGHT * 0.5;
  const press = useSharedValue(false);
  const y = useSharedValue(startPos);
  const opa = useSharedValue(1);
  const [isTap, setIsTap] = React.useState(false);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = y.value;
      press.value = true;
    },
    onActive: (event, ctx) => {
      if (event.absoluteY < (SCREEN_HEIGHT * 1) / 4) {
        y.value = withSpring(startPos);
        return;
      }
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      press.value = false;
      if (event.absoluteY > (SCREEN_HEIGHT * 2) / 3) {
        closeModal();
        return;
      }
      y.value = withSpring(startPos);
    },
  });

  const closeModal = () => {
    if (isTap) return;
    if (press.value) return;
    y.value = withTiming(SCREEN_HEIGHT, {
      duration: 300,
    });
    opa.value = withTiming(0, {
      duration: 300,
    });
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  });

  const _container = useAnimatedStyle(() => {
    return {
      opacity: opa.value,
    };
  });

  const _onTouchStart = () => {
    setIsTap(true);
  };

  const _onTouchEnd = () => {
    setIsTap(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <Animated.View style={[styles.container, _container]}>
        {/* <PanGestureHandler onGestureEvent={eventHandler}> */}
        <Animated.View
          style={[styles.content, uas]}
          onTouchStart={_onTouchStart}
          onTouchEnd={_onTouchEnd}>
          <View style={styles.line}></View>
          {/* <View style={styles.bankAccount}>
            <Image
              source={require('../../assets/image/mb-bank.png')}
              style={styles.bankLogo}
            />
            <Text style={styles.bankNumber}>0963499308</Text>
          </View> */}
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>
            Coming soon
          </Text>
        </Animated.View>
        {/* </PanGestureHandler> */}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const DraggableModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
  }));

  return (
    <Modal transparent statusBarTranslucent={true} visible={visible}>
      <ModalContent setVisible={setVisible} />
    </Modal>
  );
});

export default DraggableModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
  },
  line: {
    width: 50,
    height: 8,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  bankAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  bankLogo: {
    width: 100,
    height: 50,
  },
  bankNumber: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '600',
  },
});
