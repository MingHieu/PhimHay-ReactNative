import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BannerItem from './BannerItem';

const Banner = ({data}) => {
  const bannerList = [...data.recommendContentVOList];

  return (
    <View style={styles.container}>
      <FlatList
        data={bannerList}
        renderItem={({item, index}) => <BannerItem {...item} />}
        keyExtractor={(item, index) => `${index}`}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(Banner);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
