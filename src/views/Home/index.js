import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Title from '../../components/Title';
import {HomeApi} from '../../core/api';
import globalStyles from '../../util/style';
import Banner from './Banner';
import BlockGroup from './BlockGroup';
import SingleAlbum from './SingleAlbum';

const HomeScreen = () => {
  const [page, setPage] = React.useState(0);
  const [recommendItems, setRecommendItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [endOfList, setEndOfList] = React.useState(false);

  React.useEffect(() => {
    HomeApi.getHome(page)
      .then(data => {
        if (page == 0) setPage(prev => prev + 2);
        else setPage(prev => prev + 1);
        setRecommendItems(prev => prev.concat(data.data.recommendItems));
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const getMoreRecommendItems = () => {
    if (loading) return;
    if (endOfList) return;
    setLoading(true);
    HomeApi.getHome(page)
      .then(data => {
        setPage(prev => prev + 1);
        if (!data.data || !data.data.recommendItems.length) {
          setEndOfList(true);
          throw 'ngu';
        }
        setRecommendItems(prev => prev.concat(data.data.recommendItems));
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const renderPage = ({item, index}) => {
    const {
      bannerProportion,
      blockGroupNum,
      coverType,
      homeSectionId,
      homeSectionName,
      homeSectionType,
      recommendContentVOList,
      refId,
      refRedirectUrl,
    } = item;

    if (homeSectionType == 'BANNER') {
      return <Banner data={item} />;
    }
    if (homeSectionType == 'BLOCK_GROUP') {
      // return <BlockGroup data={item} />;
      return null;
    }
    if (homeSectionType == 'SINGLE_ALBUM') {
      return <SingleAlbum data={item} />;
    }
  };

  const renderFooter = () => {
    if (endOfList)
      return (
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: 'grey',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          END
        </Text>
      );
    if (loading) return <ActivityIndicator size="large" color="grey" />;
    return null;
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Title text={'Home'} />
      <View style={styles.container}>
        <FlatList
          data={recommendItems}
          renderItem={renderPage}
          onEndReached={getMoreRecommendItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          refreshing={loading}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
