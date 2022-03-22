import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LazyImage from '../../../components/LazyImage';
import {SCREEN_WIDTH} from '../../../shared/theme/size';
const width = SCREEN_WIDTH - 20;

const BannerItem = props => {
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
  } = props;

  if (!title) return null;

  return (
    <View style={styles.container}>
      <LazyImage source={{uri: imageUrl}} style={styles.banner} />
    </View>
  );
};

export default React.memo(BannerItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  banner: {
    width: width,
    height: (width * 9) / 16,
    borderRadius: 10,
  },
});
