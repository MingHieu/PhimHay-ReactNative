import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Poster = ({poster}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: poster}} style={styles.content} />
    </View>
  );
};

export default React.memo(Poster);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    flex: 1,
  },
});
