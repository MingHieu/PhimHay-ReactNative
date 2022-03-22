import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useGlobalStyle} from '../../../shared/hook';
import formatTitleListName from '../../../shared/util/formatTitleListName';
import SingleAlbumItem from './SingleAlbumItem';

const SingleAlbum = ({data}) => {
  const navigation = useNavigation();
  const title = data.homeSectionName;
  const SingleAlbumList = data.recommendContentVOList;
  const globalStyles = useGlobalStyle();

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text, styles.title]}>
        {formatTitleListName(title)}
      </Text>
      <FlatList
        data={SingleAlbumList}
        renderItem={({item, index}) => (
          <SingleAlbumItem
            category={item.category}
            contentType={item.contentType}
            id={item.id}
            imageUrl={item.imageUrl}
            jumpAddress={item.jumpAddress}
            jumpType={item.jumpType}
            needLogin={item.needLogin}
            resourceNum={item.resourceNum}
            resourceStatus={item.resourceStatus}
            showMark={item.showMark}
            title={item.title}
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

export default React.memo(SingleAlbum);

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
