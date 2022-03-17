import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {SearchApi} from '../../../core/api';
import {useNavigation, useRoute} from '@react-navigation/native';
import Title from '../../../components/Title/index';
import CategoryDetailItem from './CategoryDetailItem';
import BackButton from '../BackButton';
import {STATUS_BAR_HEIGHT} from '../../../util/size';

const CategoryDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name, params, category} = route.params;
  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    setMovieList([]);
    SearchApi.advancedSearch(params, category)
      .then(data => setMovieList(data.data.searchResults))
      .catch(e => {
        console.log(e);
      });
  }, [category, params, name]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Title text={name} style={styles.title} />
      </View>

      <FlatList
        data={movieList}
        renderItem={({item, index}) => {
          return (
            <CategoryDetailItem
              coverVerticalUrl={item.coverVerticalUrl}
              domainType={item.domainType}
              id={item.id}
              name={item.name}
              sort={item.sort}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: STATUS_BAR_HEIGHT,
  },
});
