import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Title from '../../components/Title';
import {SearchApi} from '../../core/api';
import {useGlobalStyle} from '../../shared/hook/';
import ConfigItem from './ConfigItem';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [configList, setConfigList] = React.useState([]);
  const globalStyles = useGlobalStyle();

  React.useEffect(() => {
    SearchApi.searchConfig()
      .then(data => setConfigList(data.data))
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
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
