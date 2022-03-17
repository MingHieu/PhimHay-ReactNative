import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import LazyImage from '../../components/LazyImage';
import {SCREEN_WIDTH} from '../../util/size';

const MovieListItem = props => {
  const {
    areas,
    categoryTag,
    coverHorizontalUrl,
    coverVerticalUrl,
    dramaType,
    duration,
    id,
    name,
    releaseTime,
    sort,
    upInfo,
    navigation,
  } = props;

  const _onPress = () => {
    if (releaseTime == '') {
      Alert.alert('Error', 'Movie is not available');
      return;
    }
    navigation.navigate('MovieDetail', {
      id: id,
      category: dramaType.code == 'MOVIE' ? 0 : 1,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage source={{uri: coverVerticalUrl}} style={styles.coverImage} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.releaseTime}>{releaseTime}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  coverImage: {
    width: 135,
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  title: {
    width: SCREEN_WIDTH - 135 - 30,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  releaseTime: {
    fontSize: 14,
    fontWeight: '400',
  },
});
