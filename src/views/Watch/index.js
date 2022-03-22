import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import SuggestList from '../../components/SuggestList';
import VideoPlayer from '../../components/VideoPlayer';
import {MovieApi} from '../../core/api';
import {useGlobalStyle} from '../../shared/hook';
import {STATUS_BAR_HEIGHT} from '../../shared/theme/size';
import EpisodeList from './EpisodeList';

const WatchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id, category, movieDetail} = route.params;
  const [movieUri, setMovieUri] = React.useState();
  const [episodeId, setEpisodeId] = React.useState();
  const [episode, setEpisode] = React.useState();
  const [definition, setDefinition] = React.useState();
  const [subtitle, setSubtitle] = React.useState();
  const [initialize, setInitialize] = React.useState(true);
  const [initializeVideo, setInitializeVideo] = React.useState(true); // ngăn không để lặp lại hành động lấy link phim khi lần đầu vào phim
  const [initializeDefinition, setInitializeDefinition] = React.useState(true); // ngăn không để seek về 0 khi đổi quality
  const globalStyles = useGlobalStyle();
  const {colors} = useTheme();

  // Lấy thông tin phim
  React.useEffect(() => {
    setMovieUri(null);
    setInitialize(true);
    setEpisodeId(movieDetail.episodeVo[0].id);
    setEpisode(movieDetail.episodeVo[0].seriesNo);
    setDefinition(movieDetail.episodeVo[0].definitionList[0].code);
    setInitializeDefinition(true);
    setSubtitle('off');
    setInitialize(false);
  }, [id, category, movieDetail]);

  // Lấy link phim
  React.useEffect(() => {
    if (initialize) return;
    const eps = episode - (episode != 0);
    setInitializeVideo(true);
    setInitializeDefinition(true);
    setSubtitle('off');
    setDefinition(movieDetail.episodeVo[eps].definitionList[0].code);
    MovieApi.getMovieMedia(
      category,
      id,
      episodeId,
      movieDetail.episodeVo[eps].definitionList[0].code,
    )
      .then(data => {
        setMovieUri(data.data.mediaUrl);
        setInitializeVideo(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [initialize, episodeId]);

  // Bắt sự kiện mỗi khi đổi quality
  React.useEffect(() => {
    if (initialize) return;
    if (initializeVideo) return;
    MovieApi.getMovieMedia(category, id, episodeId, definition)
      .then(data => {
        setMovieUri(data.data.mediaUrl);
      })
      .catch(e => {
        console.log(e);
      });
  }, [definition]);

  const backHandle = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={backHandle}>
        <IconIonicons name="chevron-back" size={30} color={colors.icon} />
      </TouchableOpacity>
      {movieUri ? (
        <>
          <VideoPlayer
            source={{uri: movieUri}}
            poster={movieDetail.coverHorizontalUrl}
            movieDetail={movieDetail}
            definition={definition}
            setDefinition={setDefinition}
            episode={episode}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            initializeDefinition={initializeDefinition}
            setInitializeDefinition={setInitializeDefinition}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[globalStyles.text, styles.title]}>
              {movieDetail.name}
            </Text>
            <View style={styles.content}>
              <View style={styles.content}>
                <IconAntDesign name="star" size={18} color={'#F5C518'} />
                <Text style={[globalStyles.text, styles.rating]}>
                  {movieDetail.score}
                </Text>
              </View>
              <View style={styles.content}>
                <IconAntDesign name="calendar" size={18} color={'red'} />
                <Text style={[globalStyles.text, styles.rating]}>
                  {movieDetail.year}
                </Text>
              </View>
            </View>
            <EpisodeList
              episodeList={movieDetail.episodeVo}
              episode={episode}
              setEpisode={setEpisode}
              setEpisodeId={setEpisodeId}
            />
            <SuggestList
              refList={movieDetail.refList}
              likeList={movieDetail.likeList}
            />
          </ScrollView>
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default WatchScreen;

const styles = StyleSheet.create({
  backBtn: {
    marginTop: STATUS_BAR_HEIGHT,
    marginLeft: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 10,
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
