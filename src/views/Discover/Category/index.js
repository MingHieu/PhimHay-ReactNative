import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackButton from '../BackButton';
import { useGlobalStyle } from '../../../shared/hook';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params, screeningItems} = route.params;
const globalStyles = useGlobalStyle()
  
  return (
    <View style={globalStyles.container}>
      <BackButton />
      <FlatList
        data={screeningItems[1].items}
        renderItem={({item, index}) => (
          <CategoryItem
            name={item.name}
            params={params}
            category={item.params}
            screeningType={item.screeningType}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryScreen;

