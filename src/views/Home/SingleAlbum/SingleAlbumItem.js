import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LazyImage from '../../../components/LazyImage';
import {useGlobalStyle} from '../../../shared/hook';
import { APP_SCREEN_TYPES } from '../../../routes/screenTypes';

const SingleAlbumItem = props => {
  const globalStyles = useGlobalStyle();

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
    navigation.navigate(APP_SCREEN_TYPES.MOVIE_DETAIL, {
      id,
      category,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage source={{uri: imageUrl}} style={styles.poster} />
        <Text style={[globalStyles.text, styles.title]}>{title}</Text>
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
