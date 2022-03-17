import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import formatTitleListName from '../../../util/formatTitleListName';
import BlockGroupItem from './BlockGroupItem';

const BlockGroup = ({data}) => {
  const title = data.homeSectionName;
  const blockGroupList = data.recommendContentVOList;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formatTitleListName(title)}</Text>
      <FlatList
        data={blockGroupList}
        renderItem={({item, index}) => <BlockGroupItem {...item} />}
        keyExtractor={(item, index) => `${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(BlockGroup);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 10,
  },
});
