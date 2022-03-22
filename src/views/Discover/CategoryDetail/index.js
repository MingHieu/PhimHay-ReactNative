import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {SearchApi} from '../../../core/api';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import Title from '../../../components/Title/index';
import CategoryDetailItem from './CategoryDetailItem';
import BackButton from '../BackButton';
import {STATUS_BAR_HEIGHT} from '../../../shared/theme/size';
import {useGlobalStyle} from '../../../shared/hook';

const CategoryDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name, params, category} = route.params;
  const [movieList, setMovieList] = React.useState([]);
  const {colors} = useTheme();
  const globalStyles = useGlobalStyle();

  React.useEffect(() => {
    setMovieList([]);
    SearchApi.advancedSearch(params, category)
      .then(data => setMovieList(data.data.searchResults))
      .catch(e => {
        console.log(e);
      });
  }, [category, params, name]);

  return (
    <View style={globalStyles.container}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: STATUS_BAR_HEIGHT,
  },
});
