import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../shared/theme/size';
import QualityOption from './QualityOption';
import SubtitleOption from './SubtitleOption';

const SettingModal = props => {
  const {fullScreen, isModal, setIsModal, onTouchStart, onTouchEnd} = props;
  const [canClose, setCanClose] = React.useState(true);

  const closeModal = () => {
    if (canClose) {
      setIsModal(false);
    }
  };

  const _onTouchStart = () => {
    setCanClose(false);
  };

  const _onTouchEnd = () => {
    setCanClose(true);
  };

  return (
    <Modal
      visible={isModal}
      onShow={onTouchStart}
      onDismiss={() => {
        onTouchStart();
        onTouchEnd();
      }}
      onRequestClose={() => {
        onTouchStart();
        onTouchEnd();
        setIsModal(false);
      }}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.container} onTouchEnd={closeModal}>
        <View
          style={[styles.content, fullScreen && styles.fullScreenContent]}
          onTouchStart={_onTouchStart}
          onTouchEnd={_onTouchEnd}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <QualityOption {...props} />
            <SubtitleOption {...props} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SettingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  content: {
    width: SCREEN_WIDTH - 60,
    height: 300,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  fullScreenContent: {
    height: SCREEN_WIDTH - 50,
  },
});
