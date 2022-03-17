import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Episode = ({data, episode, setEpisode, setEpisodeId}) => {
  const _onPress = () => {
    setEpisode(data.seriesNo);
    setEpisodeId(data.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.episode,
        {
          backgroundColor: episode === data.seriesNo ? 'red' : 'grey',
        },
      ]}
      onPress={_onPress}>
      <Text style={styles.episodeText}>{data.seriesNo}</Text>
    </TouchableOpacity>
  );
};

const EpisodeList = props => {
  const {episodeList, episode, setEpisode, setEpisodeId} = props;

  return (
    <View style={styles.container}>
      {episodeList[0].seriesNo != 0 &&
        episodeList.map((item, index) => (
          <Episode
            data={item}
            episode={episode}
            setEpisode={setEpisode}
            setEpisodeId={setEpisodeId}
            key={index}
          />
        ))}
    </View>
  );
};

export default EpisodeList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  episode: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  episodeText: {
    fontSize: 18,
    color: '#FFF',
  },
});
