import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import LazyImage from '../../components/LazyImage';
import SuggestList from '../../components/SuggestList';
import {MovieApi} from '../../core/api';
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from '../../util/size';
import MovieTagList from './MovieTagList';

const MovieDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, category} = route.params;
  const [movieDetail, setMovieDetail] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    MovieApi.getMovieDetail(id, category)
      .then(data => {
        setMovieDetail(data.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const backHandle = () => {
    navigation.navigate('HomeTab');
  };

  const watchHandle = () => {
    navigation.navigate('WatchScreen', {
      id,
      category,
      movieDetail,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={backHandle}>
        <IconIonicons name="chevron-back" size={30} color={'#FFF'} />
      </TouchableOpacity>
      {!loading ? (
        <ImageBackground
          style={styles.background}
          source={{uri: movieDetail.coverVerticalUrl}}>
          <View style={styles.content}>
            <View style={styles.header}>
              <LazyImage
                style={styles.poster}
                source={{uri: movieDetail.coverVerticalUrl}}
              />
              <View style={styles.headerRight}>
                <View style={styles.headerTopRight}>
                  <IconAntDesign name="star" size={18} color={'#F5C518'} />
                  <Text style={styles.rating}>{movieDetail.score}</Text>
                </View>
                <MovieTagList tagNameList={movieDetail.tagNameList} />
              </View>
            </View>

            <ScrollView
              style={styles.body}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>{movieDetail.name}</Text>
              <Text style={styles.description}>{movieDetail.introduction}</Text>
              <TouchableOpacity style={styles.watchBtn} onPress={watchHandle}>
                <Text style={styles.watchBtnText}>Watch now</Text>
              </TouchableOpacity>
              <SuggestList
                refList={movieDetail.refList}
                likeList={movieDetail.likeList}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      )}
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 40) / 27,
    justifyContent: 'flex-end',
  },
  content: {
    width: SCREEN_WIDTH,
    height:
      SCREEN_HEIGHT -
      (SCREEN_WIDTH * 40) / (27 * 2.5) -
      StatusBar.currentHeight,
    backgroundColor: '#FFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 130,
  },
  backBtn: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 10,
    zIndex: 999,
  },
  header: {
    width: SCREEN_WIDTH - 20,
    position: 'absolute',
    top: -80,
    left: 20,
    flexDirection: 'row',
  },
  poster: {
    width: 135,
    height: 200,
    borderRadius: 10,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  body: {},
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  watchBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  watchBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
