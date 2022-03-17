import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LazyImage from '../LazyImage';

const SuggestListItem = props => {
  const {
    areaList,
    areaNameList,
    category,
    coverHorizontalUrl,
    coverVerticalUrl,
    drameTypeVo,
    id,
    name,
    score,
    tagList,
    tagNameList,
    upImgUrl,
    upName,
    year,
    navigation,
  } = props;

  const _onPress = () => {
    navigation.push('MovieDetail', {
      id,
      category,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage style={styles.coverImage} source={{uri: coverVerticalUrl}} />
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(SuggestListItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  coverImage: {
    width: 162,
    height: 240,
    borderRadius: 10,
  },
  title: {
    width: 162,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
});
