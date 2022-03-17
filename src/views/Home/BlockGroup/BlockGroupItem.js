import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LazyImage from '../../../components/LazyImage';

const BlockGroupItem = props => {
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

  return (
    <View style={styles.container}>
      <LazyImage source={{uri: imageUrl}} style={styles.avatar} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default React.memo(BlockGroupItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    width: 162,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
});
