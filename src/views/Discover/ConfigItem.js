import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../util/size';
import Entypo from 'react-native-vector-icons/Entypo';

const ConfigItem = props => {
  const {id, name, params, screeningItems, navigation} = props;

  const _onPress = () => {
    navigation.navigate('Category', {
      params,
      screeningItems,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      <Image
        source={require('../../assets/image/clapperboard.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{name}</Text>
      <Entypo name="chevron-right" size={26} color={'#000'} />
    </TouchableOpacity>
  );
};

export default ConfigItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    width: SCREEN_WIDTH - 180,
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 20,
  },
});
