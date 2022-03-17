import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingModal from './SettingModal';

const SettingControl = props => {
  const {fullScreen, setIsModal} = props;

  const settingModalHandle = () => {
    setIsModal(true);
  };

  return (
    <View style={[styles.container, fullScreen && styles.fullScreenContainer]}>
      <TouchableWithoutFeedback onPress={settingModalHandle}>
        <Ionicons name="settings-sharp" size={26} color={'#FFF'} />
      </TouchableWithoutFeedback>
      <SettingModal {...props} />
    </View>
  );
};

export default SettingControl;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row-reverse',
  },
  fullScreenContainer: {
    right: 20,
    top: 20,
  },
  optionContainer: {
    flexGrow: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,.6)',
    marginRight: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
});
