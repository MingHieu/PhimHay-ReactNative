import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecommendListItem from './RecommendListItem';

const RecommendList = props => {
  const {recommendList, navigation} = props;

  
  return (
    <FlatList
      data={recommendList}
      renderItem={({item, index}) => (
        <RecommendListItem
          id={item.id}
          title={item.title}
          domainType={item.domainType}
          cover={item.cover}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

export default React.memo(RecommendList);

const styles = StyleSheet.create({});
