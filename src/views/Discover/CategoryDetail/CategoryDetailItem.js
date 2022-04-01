import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LazyImage from '../../../components/LazyImage/index';
import {useGlobalStyle} from '../../../shared/hook';
import {SCREEN_WIDTH} from '../../../shared/theme/size';
import { APP_SCREEN_TYPES } from '../../../routes/screenTypes';

const CategoryDetailItem = props => {
  const {coverVerticalUrl, domainType, id, name, sort, navigation} = props;
  const globalStyles = useGlobalStyle();


  const _onPress = () => {
    navigation.navigate(APP_SCREEN_TYPES.MOVIE_DETAIL, {
      id,
      category: domainType,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage source={{uri: coverVerticalUrl}} style={styles.coverImage} />
        <Text style={[globalStyles.text, styles.title]}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryDetailItem;

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
  title: {
    width: SCREEN_WIDTH - 135 - 30,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 10,
  },
});
