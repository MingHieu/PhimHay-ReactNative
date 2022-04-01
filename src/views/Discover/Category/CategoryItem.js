import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGlobalStyle} from '../../../shared/hook';
import {SCREEN_WIDTH} from '../../../shared/theme/size';
import { APP_SCREEN_TYPES } from '../../../routes/screenTypes';

const CategoryItem = props => {
  const {name, params, category, screeningType, navigation} = props;
  const globalStyles = useGlobalStyle();

  const _onPress = () => {
    navigation.navigate(APP_SCREEN_TYPES.CATEGORY_DETAIL, {
      name,
      params,
      category,
    });
  };

  if (name == 'other') return null;

  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      <Image
        source={require('../../../assets/image/clapperboard.png')}
        style={styles.image}
      />
      <Text style={[globalStyles.text, styles.title]}>{name}</Text>
      <Entypo name="chevron-right" size={26} color={'#000'} />
    </TouchableOpacity>
  );
};

export default CategoryItem;

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
