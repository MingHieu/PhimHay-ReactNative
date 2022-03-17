import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LazyImage from '../../../components/LazyImage';

const SingleAlbumItem = props => {
  const {
    category,
    contentType,
    id,
    imageUrl,
    jumpAddress,
    jumpType,
    needLogin,
    resourceNum,
    resourceStatus,
    showMark,
    title,
    navigation,
  } = props;

  const _onPress = () => {
    navigation.navigate('MovieDetail', {
      id,
      category,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage source={{uri: imageUrl}} style={styles.poster} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(SingleAlbumItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  poster: {
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
