import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import SearchBar from '../../components/SearchBar';
import Title from '../../components/Title';
import {SearchApi} from '../../core/api';
import globalStyles from '../../util/style';
import SearchContent from './SearchContent';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [movieList, setMovieList] = React.useState([]);
  const [recommendList, setRecommendList] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    SearchApi.searchLeaderBoard()
      .then(data => setRecommendList(data.data.list))
      .catch(e => {
        console.log(e);
      });
  }, []);

  const submitHandle = () => {
    setLoading(true);
    setMovieList([]);
    SearchApi.searchWithKeyWord(searchValue.trim().toLowerCase())
      .then(data => {
        const searchResults = data.data.searchResults;
        if (searchResults.length == 0) setNotFound(true);
        setMovieList(searchResults);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const changeTextHandle = value => {
    setSearchValue(value);
    if (notFound) setNotFound(false);
  };

  const clearTextHandle = () => {
    setSearchValue('');
    if (notFound) setNotFound(false);
  };

  if (!recommendList) return null;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Title text={'Search'} />
      <SearchBar
        submitHandle={submitHandle}
        changeTextHandle={changeTextHandle}
        clearTextHandle={clearTextHandle}
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SearchContent
          movieList={movieList}
          recommendList={recommendList}
          notFound={notFound}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
