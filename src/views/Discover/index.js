import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Title from '../../components/Title';
import {SearchApi} from '../../core/api';
import globalStyles from '../../util/style';
import ConfigItem from './ConfigItem';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [configList, setConfigList] = React.useState([]);

  React.useEffect(() => {
    SearchApi.searchConfig()
      .then(data => setConfigList(data.data))
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        <Title text={'Discover'} />
        <FlatList
          data={configList}
          renderItem={({item, index}) => (
            <ConfigItem
              id={item.id}
              name={item.name}
              params={item.params}
              screeningItems={item.screeningItems}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
