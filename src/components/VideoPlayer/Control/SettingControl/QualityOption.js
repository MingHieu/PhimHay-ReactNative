import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';


const SettingOption = props => {
  const {definition, setDefinition, movieDetail, episode,setLoadingVideo} = props;

  return (
    <View style={styles.option}>
      <Text style={styles.title}>Quality</Text>
      {movieDetail.episodeVo[episode - (episode != 0)].definitionList.map(
        (item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDefinition(item.code);
                setLoadingVideo(true)
              }}
              key={index}
              style={[
                styles.textContainer,
                item.code == definition && styles.textContainerSelected,
              ]}>
              <Text
                style={[
                  styles.text,
                  item.code == definition && styles.textSelected,
                ]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  option: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  textContainerSelected: {
    backgroundColor: 'red',
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
  },
  textSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
});
