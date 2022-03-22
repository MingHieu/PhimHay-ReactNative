import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SCREEN_WIDTH} from '../../shared/theme/size';
import LazyImage from '../../components/LazyImage/index';
import {useGlobalStyle} from '../../shared/hook';

const RecommendListItem = props => {
  const {cover, domainType, id, title, navigation} = props;
  const globalStyles = useGlobalStyle();

  const _onPress = () => {
    navigation.navigate('MovieDetail', {
      id,
      category: domainType,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        <LazyImage source={{uri: cover}} style={styles.coverImage} />
        <Text style={[globalStyles.text, styles.title]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(RecommendListItem);

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
