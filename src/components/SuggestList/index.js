import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SuggestListItem from './SuggestListItem';

const SuggestList = props => {
  const {refList, likeList} = props;
  const navigation = useNavigation();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const list = refList.length ? refList : likeList;
    setData(list);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Like This</Text>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <SuggestListItem
            areaList={item.areaList}
            areaNameList={item.areaNameList}
            category={item.category}
            coverHorizontalUrl={item.coverHorizontalUrl}
            coverVerticalUrl={item.coverVerticalUrl}
            drameTypeVo={item.drameTypeVo}
            id={item.id}
            name={item.name}
            score={item.score}
            tagList={item.tagList}
            tagNameList={item.tagNameList}
            upImgUrl={item.upImgUrl}
            upName={item.upName}
            year={item.year}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(SuggestList);

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
