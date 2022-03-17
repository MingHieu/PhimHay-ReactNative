import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MovieTag = ({tagName}) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{tagName}</Text>
    </View>
  );
};

const MovieTagList = props => {
  const {tagNameList} = props;

  return (
    <View style={styles.container}>
      {tagNameList.map((tagName, index) => (
        <MovieTag tagName={tagName} key={index} />
      ))}
    </View>
  );
};

export default MovieTagList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'red',
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 20,
  },
  text: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 14,
  },
});
