import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {STATUS_BAR_HEIGHT} from '../../util/size';

const BackButton = () => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.backBtn} onPress={_onPress}>
      <IconIonicons name="chevron-back" size={30} color={'#000'} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtn: {
    marginTop: STATUS_BAR_HEIGHT,
    marginLeft: 10,
  },
});
