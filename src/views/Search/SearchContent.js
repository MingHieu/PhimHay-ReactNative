import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MovieListItem from './MovieListItem';
import RecommendList from './RecommendList';

const SearchContent = props => {
  const {movieList, recommendList, notFound} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        renderItem={({item, index}) => (
          <MovieListItem
            areas={item.areas}
            categoryTag={item.areas}
            coverHorizontalUrl={item.coverHorizontalUrl}
            coverVerticalUrl={item.coverVerticalUrl}
            dramaType={item.dramaType}
            duration={item.duration}
            id={item.id}
            name={item.name}
            releaseTime={item.releaseTime}
            sort={item.sort}
            upInfo={item.upInfo}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={() => {
          return notFound ? (
            <View style={styles.emptyList}>
              <Text>Movie not found</Text>
            </View>
          ) : (
            <RecommendList
              recommendList={recommendList}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

export default React.memo(SearchContent);

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
});
