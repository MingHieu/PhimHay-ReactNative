import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const SubtitleOption = props => {
  const {subtitle, setSubtitle, movieDetail, episode, loadingSubtitle} = props;

  const turnOffSubtitle = () => {
    setSubtitle('off');
  };

  return (
    <View style={styles.option}>
      <TouchableOpacity onPress={turnOffSubtitle}>
        <Text style={styles.title}>
          Subtitle {subtitle == 'off' && `(${subtitle})`}
        </Text>
      </TouchableOpacity>
      {movieDetail.episodeVo[episode - (episode != 0)].subtitlingList.map(
        (item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSubtitle(item.subtitlingUrl);
              }}
              key={index}
              style={[
                styles.textContainer,
                item.subtitlingUrl == subtitle && styles.textContainerSelected,
              ]}>
              <Text
                style={[
                  styles.text,
                  item.subtitlingUrl == subtitle && styles.textSelected,
                ]}>
                {item.language}
              </Text>
              {item.subtitlingUrl == subtitle && loadingSubtitle && (
                <ActivityIndicator size="small" color="#FFF" />
              )}
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default SubtitleOption;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
